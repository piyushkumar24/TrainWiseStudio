
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Client } from '@/types/client';

export const useClientData = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      
      // Get current coach's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setIsLoading(false);
        return;
      }

      // First, get program assignments for this coach
      const { data: assignments, error: assignmentsError } = await supabase
        .from('program_assignments')
        .select(`
          client_id,
          assigned_at,
          status,
          expires_at,
          program_id,
          programs!inner (
            id,
            title,
            category,
            type
          )
        `)
        .eq('assigned_by', session.user.id);

      if (assignmentsError) {
        console.error('Error fetching program assignments:', assignmentsError);
        toast({
          title: "Error",
          description: "Failed to load client assignments",
          variant: "destructive",
        });
        return;
      }

      if (!assignments || assignments.length === 0) {
        setClients([]);
        setIsLoading(false);
        return;
      }

      // Get unique client IDs
      const clientIds = [...new Set(assignments.map(a => a.client_id))];

      // Fetch client profiles (now contains plan_type and other details)
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, created_at, plan_type, onboarding_completed')
        .in('id', clientIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
        toast({
          title: "Error",
          description: "Failed to load client profiles",
          variant: "destructive",
        });
        return;
      }

      // Fetch recent activities for each client
      const { data: recentActivities, error: activitiesError } = await supabase
        .from('client_activities')
        .select('client_id, created_at, activity_type')
        .in('client_id', clientIds)
        .order('created_at', { ascending: false });

      if (activitiesError) {
        console.error('Error fetching activities:', activitiesError);
      }

      // Transform the data into Client format
      const clientData: Client[] = profiles?.map((profile: any) => {
        const clientAssignments = assignments.filter(a => a.client_id === profile.id);
        const clientActivities = recentActivities?.filter(a => a.client_id === profile.id) || [];
        
        const clientName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown';
        
        // Calculate status based on real data
        const status = calculateRealClientStatus({
          assignments: clientAssignments,
          activities: clientActivities,
          profile
        });

        // Get most recent activity
        const lastActivity = clientActivities[0];
        const lastActivityText = lastActivity 
          ? formatLastActivity(lastActivity.created_at)
          : 'No recent activity';

        // Calculate progress
        const progressPercentage = calculateClientProgress(clientAssignments);

        // Get plan types from assignments
        const planTypes = [...new Set(clientAssignments.map(a => a.programs?.category || 'fitness'))];

        return {
          id: profile.id,
          name: clientName,
          email: profile.email || '',
          program_type: profile.plan_type || 'trial',
          last_activity: lastActivityText,
          status,
          urgency: calculateUrgency(status),
          created_at: profile.created_at || new Date().toISOString(),
          progress_percentage: progressPercentage,
          plan_types: planTypes.length > 0 ? planTypes : ['fitness'],
          goals: [], // Goals would need to be stored elsewhere or derived from requests
        };
      }) || [];

      setClients(clientData);
    } catch (error) {
      console.error('Error in fetchClients:', error);
      toast({
        title: "Error",
        description: "Failed to load client data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  const updateClientStatus = async (clientId: string, status: Client['status']) => {
    try {
      // Map client status to assignment status
      let assignmentStatus = 'active';
      if (status === 'leaver' || status === 'non-active') {
        assignmentStatus = 'cancelled';
      }

      // Update the assignment status in the database
      const { error } = await supabase
        .from('program_assignments')
        .update({ status: assignmentStatus })
        .eq('client_id', clientId);

      if (error) {
        throw error;
      }

      // Update local state
      setClients(prev => 
        prev.map(client => 
          client.id === clientId ? { ...client, status } : client
        )
      );

      toast({
        title: "Success",
        description: "Client status updated successfully",
      });
    } catch (error) {
      console.error('Error updating client status:', error);
      toast({
        title: "Error",
        description: "Failed to update client status",
        variant: "destructive",
      });
    }
  };

  return {
    clients,
    isLoading,
    getClientById,
    updateClientStatus,
    refetch: fetchClients,
  };
};

// Helper function to calculate real client status
function calculateRealClientStatus({ assignments, activities, profile }: {
  assignments: any[];
  activities: any[];
  profile: any;
}): Client['status'] {
  const now = new Date();
  const activeAssignments = assignments.filter(a => a.status === 'active');
  
  // No active programs
  if (activeAssignments.length === 0) {
    return 'missing-program';
  }

  // Check for expired programs
  const expiredAssignments = activeAssignments.filter(a => 
    a.expires_at && new Date(a.expires_at) < now
  );
  
  if (expiredAssignments.length > 0) {
    return 'program-expired';
  }

  // Calculate days since last activity
  const lastActivity = activities[0];
  const daysSinceActivity = lastActivity 
    ? Math.floor((now.getTime() - new Date(lastActivity.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  // Check if recently onboarded (new comer)
  const daysSinceCreated = profile.created_at 
    ? Math.floor((now.getTime() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

  if (daysSinceCreated <= 7 && profile.onboarding_completed) {
    return 'new-comer';
  }

  // Premium clients waiting for feedback
  if (profile.plan_type === 'premium' && daysSinceActivity > 7) {
    return 'waiting-feedback';
  }

  // Needs follow-up if no activity for too long
  if (daysSinceActivity > 14) {
    return 'needs-follow-up';
  }

  // Off track if some activity but irregular
  if (daysSinceActivity > 7) {
    return 'off-track';
  }

  // Default to on-track
  return 'on-track';
}

// Helper function to calculate urgency
function calculateUrgency(status: Client['status']): Client['urgency'] {
  const highUrgencyStatuses = ['missing-program', 'needs-follow-up', 'program-expired'];
  const mediumUrgencyStatuses = ['waiting-feedback', 'off-track'];
  
  if (highUrgencyStatuses.includes(status)) return 'high';
  if (mediumUrgencyStatuses.includes(status)) return 'medium';
  return 'low';
}

// Helper function to format last activity
function formatLastActivity(activityDate: string): string {
  const now = new Date();
  const activity = new Date(activityDate);
  const diffInMs = now.getTime() - activity.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInDays === 0) {
    if (diffInHours === 0) return 'Just now';
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays === 1) {
    return 'Yesterday';
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else {
    const months = Math.floor(diffInDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
}

// Helper function to calculate client progress
function calculateClientProgress(assignments: any[]): number {
  if (assignments.length === 0) return 0;
  
  const activeAssignments = assignments.filter(a => a.status === 'active');
  if (activeAssignments.length === 0) return 0;

  // Find the most recent assignment
  const mostRecent = activeAssignments.sort((a, b) => 
    new Date(b.assigned_at).getTime() - new Date(a.assigned_at).getTime()
  )[0];

  if (!mostRecent.expires_at) return 25; // Default progress for assignments without expiry

  const now = new Date();
  const startDate = new Date(mostRecent.assigned_at);
  const endDate = new Date(mostRecent.expires_at);
  
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = Math.max(0, now.getTime() - startDate.getTime());
  
  const percentage = Math.min((elapsed / totalDuration) * 100, 100);
  return Math.round(percentage);
}
