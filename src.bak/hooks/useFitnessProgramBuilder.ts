
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ContentBlock = {
  id: string;
  type: 'exercise' | 'text' | 'image' | 'video' | 'url' | 'pro_tip' | 'avoidance';
  data: any;
  order: number;
};

export type DayContent = {
  id: string;
  dayName: string;
  blocks: ContentBlock[];
};

export type WeekContent = {
  id: string;
  weekNumber: number;
  days: DayContent[];
};

export type ProgramData = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  headerImage?: string;
  programType: 'template' | 'tailored' | 'finalized';
  clientId?: string;
  weeks: WeekContent[];
  isDraft: boolean;
};

export const useFitnessProgramBuilder = () => {
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const saveDraft = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title || 'Untitled Program',
        description: data.description,
        type: 'fitness',
        status: 'draft',
      };

      if (data.id) {
        // Update existing draft
        const { error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id);

        if (error) throw error;
      } else {
        // Create new draft
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        setProgramData({ ...data, id: newProgram.id });
      }

      toast({
        title: "Draft saved! 💾",
        description: "Your program has been saved as a draft.",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const loadDraft = useCallback(async (draftId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('id', draftId)
        .eq('status', 'draft')
        .single();

      if (error) throw error;

      if (data) {
        setProgramData({
          id: data.id,
          title: data.title || '',
          description: data.description || '',
          tags: [],
          programType: 'template', // Default for now
          weeks: [],
          isDraft: true,
        });
      }
    } catch (error) {
      console.error('Error loading draft:', error);
      toast({
        title: "Error",
        description: "Failed to load draft",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const submitProgram = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title,
        description: data.description,
        type: 'fitness',
        status: 'published',
      };

      let programId = data.id;

      if (data.id) {
        // Update existing program
        const { error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id);

        if (error) throw error;
      } else {
        // Create new program
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        programId = newProgram.id;
      }

      // If this is a tailored program with a client, create the assignment and update the request
      if (data.programType === 'tailored' && data.clientId && programId) {
        // Create program assignment
        const { error: assignmentError } = await supabase
          .from('program_assignments')
          .insert({
            client_id: data.clientId,
            program_id: programId,
            assigned_by: user.id,
            status: 'active',
          });

        if (assignmentError) {
          console.error('Error creating assignment:', assignmentError);
          // Continue even if assignment fails - the program is still created
        }

        // Update request status to assigned
        const { error: requestError } = await supabase
          .from('requests')
          .update({
            status: 'assigned',
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', data.clientId)
          .eq('status', 'new');

        if (requestError) {
          console.error('Error updating request:', requestError);
          // Continue even if request update fails
        }
      }

      toast({
        title: "Program created! 🎉",
        description: data.programType === 'tailored' && data.clientId 
          ? "Your fitness program has been created and assigned to the client."
          : "Your fitness program has been successfully created.",
      });
    } catch (error) {
      console.error('Error submitting program:', error);
      toast({
        title: "Error",
        description: "Failed to create program",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    programData,
    setProgramData,
    saveDraft,
    loadDraft,
    submitProgram,
    isLoading,
  };
};
