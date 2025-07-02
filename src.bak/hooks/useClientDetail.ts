
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Client } from '@/types/client';

// Extended client interface for detail view
export interface ClientDetail extends Client {
  allergies?: string[];
  injuries?: string[];
  age?: number;
  gender?: string;
  country?: string;
  weight_kg?: number;
  height_cm?: number;
  trainingPreferences?: {
    availableDays?: string[];
    equipment?: string[];
    timePreference?: string;
  };
  nutritionPreferences?: {
    dietary?: string[];
    dislikes?: string[];
    allergies?: string[];
  };
  activities?: Array<{
    id: string;
    activity_type: string;
    activity_data: any;
    created_at: string;
  }>;
  programAssignments?: Array<{
    id: string;
    program_id: string;
    assigned_at: string;
    expires_at?: string;
    status: string;
  }>;
}

export const useClientDetail = (clientId?: string) => {
  const [client, setClient] = useState<ClientDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!clientId) {
      setError('No client ID provided');
      setLoading(false);
      return;
    }

    fetchClientDetail();
  }, [clientId]);

  const fetchClientDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch basic profile info with created_at (now includes plan_type and other details)
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, created_at, plan_type, onboarding_completed')
        .eq('id', clientId)
        .single();

      if (profileError) throw profileError;
      if (!profile) throw new Error('Client not found');

      // Fetch program assignments
      const { data: assignments, error: assignmentsError } = await supabase
        .from('program_assignments')
        .select('*')
        .eq('client_id', clientId)
        .order('assigned_at', { ascending: false });

      if (assignmentsError) {
        console.warn('Program assignments error:', assignmentsError);
      }

      // Fetch client activities
      const { data: activities, error: activitiesError } = await supabase
        .from('client_activities')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false })
        .limit(20);

      if (activitiesError) {
        console.warn('Activities error:', activitiesError);
      }

      // Calculate status based on real data
      const status = calculateClientStatus({
        assignments: assignments || [],
        activities: activities || [],
        profile
      });

      // Calculate progress percentage based on assignments
      const progressPercentage = calculateProgressPercentage(assignments || []);

      // Build client detail object
      const clientDetail: ClientDetail = {
        id: profile.id,
        name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Unknown',
        email: profile.email,
        program_type: profile.plan_type || 'trial',
        last_activity: activities?.[0]?.created_at || 'Never',
        status,
        urgency: ['missing-program', 'needs-follow-up', 'program-expired'].includes(status) ? 'high' : 'low',
        created_at: profile.created_at || new Date().toISOString(),
        progress_percentage: progressPercentage,
        plan_types: assignments?.length > 0 ? ['fitness'] : [],
        goals: [], // Goals would need to be fetched from requests or stored elsewhere
        activities: activities || [],
        programAssignments: assignments || []
      };

      setClient(clientDetail);
    } catch (err) {
      console.error('Error fetching client detail:', err);
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

  return { client, loading, error, refetch: fetchClientDetail };
};

// Helper function to calculate client status based on real data
function calculateClientStatus({ assignments, activities, profile }: {
  assignments: any[];
  activities: any[];
  profile: any;
}): Client['status'] {
  const now = new Date();
  const activeAssignments = assignments.filter(a => a.status === 'active');
  
  // Check if client has no active programs
  if (activeAssignments.length === 0) {
    return 'missing-program';
  }

  // Check if any programs are expired
  const expiredAssignments = activeAssignments.filter(a => 
    a.expires_at && new Date(a.expires_at) < now
  );
  
  if (expiredAssignments.length > 0) {
    return 'program-expired';
  }

  // Check for recent activity
  const lastActivity = activities[0];
  const daysSinceActivity = lastActivity 
    ? Math.floor((now.getTime() - new Date(lastActivity.created_at).getTime()) / (1000 * 60 * 60 * 24))
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

  // New comer if recently onboarded but minimal activity
  const daysSinceCreated = Math.floor((now.getTime() - new Date(profile.created_at || now).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceCreated < 14 && daysSinceActivity < 7) {
    return 'new-comer';
  }

  // Default to on-track
  return 'on-track';
}

// Helper function to calculate progress percentage
function calculateProgressPercentage(assignments: any[]): number {
  if (assignments.length === 0) return 0;
  
  const activeAssignments = assignments.filter(a => a.status === 'active');
  if (activeAssignments.length === 0) return 0;

  // Simple calculation based on time elapsed vs total duration
  const mostRecentAssignment = activeAssignments[0];
  if (!mostRecentAssignment.expires_at) return 50; // Default if no expiry

  const now = new Date();
  const startDate = new Date(mostRecentAssignment.assigned_at);
  const endDate = new Date(mostRecentAssignment.expires_at);
  
  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();
  
  const percentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  return Math.round(percentage);
}
