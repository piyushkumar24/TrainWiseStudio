import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface EnhancedClientDetail {
  id: string;
  name: string;
  email: string;
  first_name: string;
  last_name: string;
  plan_type: string;
  status: string;
  avatar_url?: string;
  created_at: string;
  onboarding_completed: boolean;
  
  // Current program
  currentProgram?: {
    id: string;
    title: string;
    expires_at?: string;
    assigned_at: string;
    status: string;
  };
  
  // Recent feedback
  recentFeedback: Array<{
    id: string;
    message: string;
    feedback_type: string;
    created_at: string;
    coach_name?: string;
  }>;
  
  // Check-ins
  recentCheckIns: Array<{
    id: string;
    check_in_type: string;
    data: any;
    created_at: string;
  }>;
  
  // Progression data
  progressionData: Array<{
    id: string;
    metric_type: string;
    value: number;
    unit: string;
    recorded_at: string;
    notes?: string;
  }>;
  
  // Follow-ups
  followUps: Array<{
    id: string;
    title: string;
    notes?: string;
    due_date: string;
    status: string;
    created_at: string;
  }>;
  
  // Past programs
  pastPrograms: Array<{
    id: string;
    title: string;
    assigned_at: string;
    expires_at?: string;
    status: string;
  }>;
}

export const useEnhancedClientDetail = (clientId?: string) => {
  const [client, setClient] = useState<EnhancedClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!clientId) {
      setError('No client ID provided');
      setLoading(false);
      return;
    }

    fetchEnhancedClientDetail();
  }, [clientId]);

  const fetchEnhancedClientDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching client detail for ID:', clientId);

      // Fetch basic profile info with better error handling
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', clientId)
        .single();

      if (profileError) {
        console.error('Profile fetch error:', profileError);
        throw new Error(`Failed to fetch client profile: ${profileError.message}`);
      }
      
      if (!profile) {
        console.error('No profile found for client ID:', clientId);
        throw new Error('Client profile not found');
      }

      console.log('Found profile:', profile);

      // Build client name with fallbacks
      const firstName = profile.first_name?.trim() || '';
      const lastName = profile.last_name?.trim() || '';
      let clientName = 'Unknown Client';
      
      if (firstName && lastName) {
        clientName = `${firstName} ${lastName}`;
      } else if (firstName) {
        clientName = firstName;
      } else if (lastName) {
        clientName = lastName;
      } else if (profile.email) {
        clientName = profile.email.split('@')[0];
      }

      // Fetch current program assignment
      const { data: currentAssignment, error: currentError } = await supabase
        .from('program_assignments')
        .select(`
          *,
          programs (
            id,
            title
          )
        `)
        .eq('client_id', clientId)
        .eq('status', 'active')
        .order('assigned_at', { ascending: false })
        .limit(1);

      if (currentError && currentError.code !== 'PGRST116') {
        console.warn('Current program error:', currentError);
      }

      // Fetch recent feedback with coach names
      const { data: feedback, error: feedbackError } = await supabase
        .from('feedback')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (feedbackError && feedbackError.code !== 'PGRST116') {
        console.warn('Feedback error:', feedbackError);
      }

      // Fetch coach names for feedback separately
      let feedbackWithCoaches: any[] = [];
      if (feedback && feedback.length > 0) {
        const coachIds = [...new Set(feedback.map(f => f.coach_id))];
        const { data: coaches } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .in('id', coachIds);

        feedbackWithCoaches = feedback.map(f => {
          const coach = coaches?.find(c => c.id === f.coach_id);
          return {
            ...f,
            coach_name: coach ? `${coach.first_name || ''} ${coach.last_name || ''}`.trim() : undefined
          };
        });
      }

      // Fetch recent check-ins
      const { data: checkIns, error: checkInsError } = await supabase
        .from('check_ins')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (checkInsError && checkInsError.code !== 'PGRST116') {
        console.warn('Check-ins error:', checkInsError);
      }

      // Fetch progression data
      const { data: progression, error: progressionError } = await supabase
        .from('progression')
        .select('*')
        .eq('client_id', clientId)
        .order('recorded_at', { ascending: false })
        .limit(20);

      if (progressionError && progressionError.code !== 'PGRST116') {
        console.warn('Progression error:', progressionError);
      }

      // Fetch follow-ups
      const { data: followUps, error: followUpsError } = await supabase
        .from('follow_ups')
        .select('*')
        .eq('client_id', clientId)
        .order('due_date', { ascending: true });

      if (followUpsError && followUpsError.code !== 'PGRST116') {
        console.warn('Follow-ups error:', followUpsError);
      }

      // Fetch past programs
      const { data: pastAssignments, error: pastError } = await supabase
        .from('program_assignments')
        .select(`
          *,
          programs (
            id,
            title
          )
        `)
        .eq('client_id', clientId)
        .neq('status', 'active')
        .order('assigned_at', { ascending: false });

      if (pastError && pastError.code !== 'PGRST116') {
        console.warn('Past programs error:', pastError);
      }

      // Calculate status
      const status = calculateClientStatus({
        currentProgram: currentAssignment?.[0],
        recentCheckIns: checkIns || [],
        profile
      });

      // Build enhanced client detail object
      const enhancedClient: EnhancedClientDetail = {
        id: profile.id,
        name: clientName,
        email: profile.email,
        first_name: firstName,
        last_name: lastName,
        plan_type: profile.plan_type || 'trial',
        status,
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(clientName)}&background=FF6B2C&color=fff`,
        created_at: profile.created_at || new Date().toISOString(),
        onboarding_completed: profile.onboarding_completed || false,
        
        currentProgram: currentAssignment?.[0] ? {
          id: currentAssignment[0].programs?.id || '',
          title: currentAssignment[0].programs?.title || 'Untitled Program',
          expires_at: currentAssignment[0].expires_at,
          assigned_at: currentAssignment[0].assigned_at,
          status: currentAssignment[0].status
        } : undefined,
        
        recentFeedback: feedbackWithCoaches.map(f => ({
          id: f.id,
          message: f.message,
          feedback_type: f.feedback_type || 'general',
          created_at: f.created_at,
          coach_name: f.coach_name
        })),
        
        recentCheckIns: (checkIns || []).map(c => ({
          id: c.id,
          check_in_type: c.check_in_type,
          data: c.data,
          created_at: c.created_at
        })),
        
        progressionData: (progression || []).map(p => ({
          id: p.id,
          metric_type: p.metric_type,
          value: p.value,
          unit: p.unit,
          recorded_at: p.recorded_at,
          notes: p.notes
        })),
        
        followUps: (followUps || []).map(f => ({
          id: f.id,
          title: f.title,
          notes: f.notes,
          due_date: f.due_date,
          status: f.status || 'pending',
          created_at: f.created_at
        })),
        
        pastPrograms: (pastAssignments || []).map(p => ({
          id: p.programs?.id || '',
          title: p.programs?.title || 'Untitled Program',
          assigned_at: p.assigned_at,
          expires_at: p.expires_at,
          status: p.status
        }))
      };

      console.log('Enhanced client detail:', enhancedClient);
      setClient(enhancedClient);
    } catch (err) {
      console.error('Error fetching enhanced client detail:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch client details';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const sendFeedback = async (message: string, feedbackType: string = 'general') => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !clientId) return;

      const { error } = await supabase
        .from('feedback')
        .insert({
          coach_id: user.id,
          client_id: clientId,
          message,
          feedback_type: feedbackType
        });

      if (error) throw error;

      toast({
        title: "Feedback sent! 💬",
        description: "Your feedback has been sent to the client.",
      });

      // Refresh client data
      await fetchEnhancedClientDetail();
    } catch (error) {
      console.error('Error sending feedback:', error);
      toast({
        title: "Error",
        description: "Failed to send feedback",
        variant: "destructive",
      });
    }
  };

  const scheduleFollowUp = async (title: string, dueDate: string, notes?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !clientId) return;

      const { error } = await supabase
        .from('follow_ups')
        .insert({
          coach_id: user.id,
          client_id: clientId,
          title,
          due_date: dueDate,
          notes
        });

      if (error) throw error;

      toast({
        title: "Follow-up scheduled! 📅",
        description: "Your follow-up has been scheduled.",
      });

      // Refresh client data
      await fetchEnhancedClientDetail();
    } catch (error) {
      console.error('Error scheduling follow-up:', error);
      toast({
        title: "Error",
        description: "Failed to schedule follow-up",
        variant: "destructive",
      });
    }
  };

  return { 
    client, 
    loading, 
    error, 
    refetch: fetchEnhancedClientDetail,
    sendFeedback,
    scheduleFollowUp
  };
};

// Helper function to calculate client status
function calculateClientStatus({ currentProgram, recentCheckIns, profile }: {
  currentProgram?: any;
  recentCheckIns: any[];
  profile: any;
}): string {
  const now = new Date();
  
  // Check if client has no active program
  if (!currentProgram) {
    return 'missing-program';
  }

  // Check if program is expired
  if (currentProgram.expires_at && new Date(currentProgram.expires_at) < now) {
    return 'program-expired';
  }

  // Check for recent activity
  const lastCheckIn = recentCheckIns[0];
  const daysSinceActivity = lastCheckIn 
    ? Math.floor((now.getTime() - new Date(lastCheckIn.created_at).getTime()) / (1000 * 60 * 60 * 24))
    : 999;

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

  // New comer if recently onboarded
  const daysSinceCreated = Math.floor((now.getTime() - new Date(profile.created_at || now).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceCreated < 14 && daysSinceActivity < 7) {
    return 'new-comer';
  }

  // Default to on-track
  return 'on-track';
}
