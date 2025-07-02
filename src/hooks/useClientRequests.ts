import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ClientRequest {
  id: string;
  user_id: string;
  coach_id?: string;
  status: 'new' | 'seen' | 'completed';
  plan_type: string;
  created_at: string;
  updated_at: string;
  client_name: string;
  client_email: string;
  client_avatar?: string;
  goals?: string[];
}

export const useClientRequests = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchClientRequests();
  }, []);

  const fetchClientRequests = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      console.log('Fetching client requests...');

      // Fetch all requests from the requests table
      const { data: requestsData, error: requestsError } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (requestsError) {
        console.error('Error fetching client requests:', requestsError);
        toast({
          title: "Error",
          description: "Failed to load client requests",
          variant: "destructive",
        });
        return;
      }

      if (!requestsData || requestsData.length === 0) {
        console.log('No requests found');
        setRequests([]);
        setIsLoading(false);
        return;
      }

      console.log('Found requests:', requestsData.length);

      // Get client profiles for the requests
      const userIds = requestsData.map(req => req.user_id);
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, plan_type')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching client profiles:', profilesError);
        toast({
          title: "Error",
          description: "Failed to load client profiles",
          variant: "destructive",
        });
        return;
      }

      console.log('Found profiles:', profiles?.length || 0);

      // Transform data to include client names and emails with better fallbacks
      const enrichedRequests: ClientRequest[] = requestsData.map(request => {
        const profile = profiles?.find(p => p.id === request.user_id);
        
        // Better name handling with multiple fallbacks
        let clientName = 'Unknown Client';
        if (profile) {
          const firstName = profile.first_name?.trim() || '';
          const lastName = profile.last_name?.trim() || '';
          
          if (firstName && lastName) {
            clientName = `${firstName} ${lastName}`;
          } else if (firstName) {
            clientName = firstName;
          } else if (lastName) {
            clientName = lastName;
          } else if (profile.email) {
            // Use email username as fallback
            clientName = profile.email.split('@')[0];
          }
        }

        // Use plan_type from profile first, then from request
        const planType = profile?.plan_type || request.plan_type || 'trial';
        
        return {
          id: request.id,
          user_id: request.user_id,
          coach_id: undefined,
          status: request.status as 'new' | 'seen' | 'completed',
          plan_type: planType,
          goals: [],
          created_at: request.created_at,
          updated_at: request.updated_at,
          client_name: clientName,
          client_email: profile?.email || 'No email',
          client_avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(clientName)}&background=FF6B2C&color=fff`,
        };
      });

      console.log('Enriched requests:', enrichedRequests);
      setRequests(enrichedRequests);
    } catch (error) {
      console.error('Error in fetchClientRequests:', error);
      toast({
        title: "Error",
        description: "Failed to load client requests",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const markAsSeen = async (requestId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Update request status to seen
      const { error: updateError } = await supabase
        .from('requests')
        .update({ 
          status: 'seen'
        })
        .eq('id', requestId);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'seen' as const, coach_id: session.user.id }
            : request
        )
      );

      toast({
        title: "Request marked as seen! 👀",
        description: "Client has been notified that their plan is on the way",
      });
    } catch (error) {
      console.error('Error marking request as seen:', error);
      toast({
        title: "Error",
        description: "Failed to mark request as seen",
        variant: "destructive",
      });
    }
  };

  const assignClientRequest = async (requestId: string, programId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const request = requests.find(r => r.id === requestId);
      if (!request) return;

      // Create program assignment
      const { error: assignmentError } = await supabase
        .from('program_assignments')
        .insert({
          client_id: request.user_id,
          program_id: programId,
          assigned_by: session.user.id,
          status: 'active',
        });

      if (assignmentError) {
        throw assignmentError;
      }

      // Update request status to completed
      const { error: updateError } = await supabase
        .from('requests')
        .update({ status: 'completed' })
        .eq('id', requestId);

      if (updateError) {
        throw updateError;
      }

      // Update local state
      setRequests(prev => 
        prev.map(r => 
          r.id === requestId 
            ? { ...r, status: 'completed' as const }
            : r
        )
      );

      toast({
        title: "Success! 🎉",
        description: "Program assigned to client successfully",
      });
    } catch (error) {
      console.error('Error assigning client request:', error);
      toast({
        title: "Error",
        description: "Failed to assign program to client",
        variant: "destructive",
      });
    }
  };

  const declineClientRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: 'completed' })
        .eq('id', requestId);

      if (error) {
        throw error;
      }

      // Update local state
      setRequests(prev => 
        prev.map(request => 
          request.id === requestId 
            ? { ...request, status: 'completed' as const }
            : request
        )
      );

      toast({
        title: "Request completed",
        description: "Client request has been marked as completed",
      });
    } catch (error) {
      console.error('Error completing client request:', error);
      toast({
        title: "Error",
        description: "Failed to complete client request",
        variant: "destructive",
      });
    }
  };

  // Group requests by status
  const groupedRequests = {
    new: requests.filter(r => r.status === 'new'),
    seen: requests.filter(r => r.status === 'seen'),
    completed: requests.filter(r => r.status === 'completed'),
  };

  return {
    requests,
    groupedRequests,
    isLoading,
    fetchClientRequests,
    markAsSeen,
    assignClientRequest,
    declineClientRequest,
  };
};
