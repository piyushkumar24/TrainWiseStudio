
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Program {
  id: string;
  title: string;
  category: 'fitness' | 'nutrition' | 'mental';
  tags: string[];
  state: 'draft' | 'saved' | 'assigned' | 'in_shop';
  description?: string;
  header_image?: string;
  client_id?: string;
  assigned_at?: string;
  in_shop_price?: number;
  in_shop_at?: string;
  personal_message?: string;
  guidance_text?: string;
  pro_tip?: string;
  avoidance_text?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  client_name?: string;
  weeks_count?: number;
}

interface UseProgramListReturn {
  programs: Program[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  deleteProgram: (programId: string) => Promise<void>;
  assignToClient: (programId: string, clientId: string, personalMessage?: string) => Promise<void>;
  publishToShop: (programId: string, price: number) => Promise<void>;
  duplicateProgram: (programId: string) => Promise<void>;
  updateProgramState: (programId: string, state: Program['state']) => Promise<void>;
}

export const useProgramList = (): UseProgramListReturn => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPrograms = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('programs')
        .select(`
          *,
          program_weeks(id)
        `)
        .eq('coach_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      // Get client names for assigned programs
      const assignedPrograms = data.filter(program => program.client_id);
      const clientIds = assignedPrograms.map(program => program.client_id);
      
      let clientProfiles: any[] = [];
      if (clientIds.length > 0) {
        const { data: profiles, error: profileError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name')
          .in('id', clientIds);
        
        if (!profileError && profiles) {
          clientProfiles = profiles;
        }
      }

      const formattedPrograms: Program[] = data.map(program => {
        const clientProfile = clientProfiles.find(profile => profile.id === program.client_id);
        
        return {
          ...program,
          category: (program.category || 'fitness') as 'fitness' | 'nutrition' | 'mental',
          state: (program.state || 'draft') as 'draft' | 'saved' | 'assigned' | 'in_shop',
          tags: program.tags || [],
          client_name: clientProfile 
            ? `${clientProfile.first_name || ''} ${clientProfile.last_name || ''}`.trim()
            : undefined,
          weeks_count: program.program_weeks?.length || 0,
        };
      });

      setPrograms(formattedPrograms);
      setError(null);
    } catch (err) {
      console.error('Error fetching programs:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch programs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteProgram = useCallback(async (programId: string) => {
    try {
      const program = programs.find(p => p.id === programId);
      if (program?.state === 'assigned') {
        toast({
          title: "Cannot delete assigned program",
          description: "Programs assigned to clients cannot be deleted.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('programs')
        .delete()
        .eq('id', programId);

      if (error) throw error;

      setPrograms(prev => prev.filter(p => p.id !== programId));
      toast({
        title: "Program deleted",
        description: "The program has been successfully deleted.",
      });
    } catch (err) {
      console.error('Error deleting program:', err);
      toast({
        title: "Error",
        description: "Failed to delete program",
        variant: "destructive",
      });
    }
  }, [programs, toast]);

  const assignToClient = useCallback(async (programId: string, clientId: string, personalMessage?: string) => {
    try {
      const program = programs.find(p => p.id === programId);
      if (program?.state === 'in_shop') {
        toast({
          title: "Cannot assign shop program",
          description: "Programs in shop cannot be assigned to clients.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('programs')
        .update({
          state: 'assigned',
          client_id: clientId,
          assigned_at: new Date().toISOString(),
          personal_message: personalMessage || null,
        })
        .eq('id', programId);

      if (error) throw error;

      // Create program assignment record
      await supabase
        .from('program_assignments')
        .insert({
          program_id: programId,
          client_id: clientId,
          assigned_by: (await supabase.auth.getUser()).data.user?.id,
        });

      await fetchPrograms();
      toast({
        title: "Program assigned! 🎉",
        description: "The program has been successfully assigned to the client.",
      });
    } catch (err) {
      console.error('Error assigning program:', err);
      toast({
        title: "Error",
        description: "Failed to assign program",
        variant: "destructive",
      });
    }
  }, [programs, toast, fetchPrograms]);

  const publishToShop = useCallback(async (programId: string, price: number) => {
    try {
      const program = programs.find(p => p.id === programId);
      if (program?.state === 'assigned') {
        toast({
          title: "Cannot publish assigned program",
          description: "Programs assigned to clients cannot be published to shop.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('programs')
        .update({
          state: 'in_shop',
          in_shop_price: price,
          in_shop_at: new Date().toISOString(),
        })
        .eq('id', programId);

      if (error) throw error;

      await fetchPrograms();
      toast({
        title: "Program published! 🛒",
        description: "The program has been successfully published to your shop.",
      });
    } catch (err) {
      console.error('Error publishing program:', err);
      toast({
        title: "Error",
        description: "Failed to publish program",
        variant: "destructive",
      });
    }
  }, [programs, toast, fetchPrograms]);

  const duplicateProgram = useCallback(async (programId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Get original program
      const { data: originalProgram, error: programError } = await supabase
        .from('programs')
        .select(`
          *,
          program_weeks(
            *,
            program_days(
              *,
              program_blocks(*)
            )
          )
        `)
        .eq('id', programId)
        .single();

      if (programError) throw programError;

      // Create new program
      const { data: newProgram, error: newProgramError } = await supabase
        .from('programs')
        .insert({
          title: `${originalProgram.title} (Copy)`,
          description: originalProgram.description,
          category: originalProgram.category,
          tags: originalProgram.tags,
          header_image: originalProgram.header_image,
          guidance_text: originalProgram.guidance_text,
          pro_tip: originalProgram.pro_tip,
          avoidance_text: originalProgram.avoidance_text,
          state: 'draft',
          coach_id: user.id,
        })
        .select()
        .single();

      if (newProgramError) throw newProgramError;

      // Duplicate weeks, days, and blocks
      for (const week of originalProgram.program_weeks) {
        const { data: newWeek, error: weekError } = await supabase
          .from('program_weeks')
          .insert({
            program_id: newProgram.id,
            week_number: week.week_number,
            title: week.title,
          })
          .select()
          .single();

        if (weekError) throw weekError;

        for (const day of week.program_days) {
          const { data: newDay, error: dayError } = await supabase
            .from('program_days')
            .insert({
              week_id: newWeek.id,
              day_number: day.day_number,
              day_name: day.day_name,
            })
            .select()
            .single();

          if (dayError) throw dayError;

          for (const block of day.program_blocks) {
            await supabase
              .from('program_blocks')
              .insert({
                day_id: newDay.id,
                block_type: block.block_type,
                block_order: block.block_order,
                content_id: block.content_id,
                block_data: block.block_data,
              });
          }
        }
      }

      await fetchPrograms();
      toast({
        title: "Program duplicated! 📋",
        description: "A copy of the program has been created as a draft.",
      });
    } catch (err) {
      console.error('Error duplicating program:', err);
      toast({
        title: "Error",
        description: "Failed to duplicate program",
        variant: "destructive",
      });
    }
  }, [toast, fetchPrograms]);

  const updateProgramState = useCallback(async (programId: string, state: Program['state']) => {
    try {
      const { error } = await supabase
        .from('programs')
        .update({ state })
        .eq('id', programId);

      if (error) throw error;

      await fetchPrograms();
    } catch (err) {
      console.error('Error updating program state:', err);
      toast({
        title: "Error",
        description: "Failed to update program state",
        variant: "destructive",
      });
    }
  }, [toast, fetchPrograms]);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return {
    programs,
    isLoading,
    error,
    refetch: fetchPrograms,
    deleteProgram,
    assignToClient,
    publishToShop,
    duplicateProgram,
    updateProgramState,
  };
};
