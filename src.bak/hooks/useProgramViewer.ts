
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProgramViewerData {
  id: string;
  title: string;
  description?: string;
  category: 'fitness' | 'nutrition' | 'mental';
  state: 'draft' | 'saved' | 'assigned' | 'in_shop';
  tags: string[];
  header_image?: string;
  guidance_text?: string;
  pro_tip?: string;
  avoidance_text?: string;
  created_at: string;
  client_name?: string;
  assigned_at?: string;
  in_shop_price?: number;
  weeks: {
    id: string;
    week_number: number;
    title?: string;
    days: {
      id: string;
      day_number: number;
      day_name: string;
      blocks: {
        id: string;
        block_type: string;
        block_order: number;
        block_data: any;
        content?: any;
      }[];
    }[];
  }[];
}

interface UseProgramViewerReturn {
  program: ProgramViewerData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useProgramViewer = (programId: string): UseProgramViewerReturn => {
  const [program, setProgram] = useState<ProgramViewerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProgram = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch program with all related data
      const { data: programData, error: programError } = await supabase
        .from('programs')
        .select(`
          *,
          program_weeks (
            *,
            program_days (
              *,
              program_blocks (*)
            )
          )
        `)
        .eq('id', programId)
        .single();

      if (programError) throw programError;
      if (!programData) throw new Error('Program not found');

      // Get client name if assigned
      let clientName: string | undefined;
      if (programData.client_id) {
        const { data: clientProfile } = await supabase
          .from('profiles')
          .select('first_name, last_name')
          .eq('id', programData.client_id)
          .single();

        if (clientProfile) {
          clientName = `${clientProfile.first_name || ''} ${clientProfile.last_name || ''}`.trim();
        }
      }

      // Process weeks and days
      const weeks = await Promise.all(
        (programData.program_weeks || [])
          .sort((a, b) => a.week_number - b.week_number)
          .map(async (week) => {
            const days = await Promise.all(
              (week.program_days || [])
                .sort((a, b) => a.day_number - b.day_number)
                .map(async (day) => {
                  const blocks = await Promise.all(
                    (day.program_blocks || [])
                      .sort((a, b) => a.block_order - b.block_order)
                      .map(async (block) => {
                        let content = null;

                        // ✅ Fetch referenced content based on block type and content_id
                        if (block.content_id) {
                          try {
                            // Use explicit table queries instead of dynamic table names
                            if (block.block_type === 'exercise') {
                              const { data } = await supabase
                                .from('fitness_exercises')
                                .select('*')
                                .eq('id', block.content_id)
                                .single();
                              content = data;
                            } else if (block.block_type === 'recipe') {
                              const { data } = await supabase
                                .from('recipes')
                                .select('*')
                                .eq('id', block.content_id)
                                .single();
                              content = data;
                            } else if (block.block_type === 'mental') {
                              const { data } = await supabase
                                .from('mental_health_exercises')
                                .select('*')
                                .eq('id', block.content_id)
                                .single();
                              content = data;
                            }
                          } catch (err) {
                            console.warn(`Failed to fetch content for block ${block.id}:`, err);
                          }
                        }

                        return {
                          id: block.id,
                          block_type: block.block_type,
                          block_order: block.block_order,
                          block_data: block.block_data || {},
                          content
                        };
                      })
                  );

                  return {
                    id: day.id,
                    day_number: day.day_number,
                    day_name: day.day_name,
                    blocks
                  };
                })
            );

            return {
              id: week.id,
              week_number: week.week_number,
              title: week.title,
              days
            };
          })
      );

      const processedProgram: ProgramViewerData = {
        id: programData.id,
        title: programData.title,
        description: programData.description,
        category: programData.category as 'fitness' | 'nutrition' | 'mental',
        state: programData.state as 'draft' | 'saved' | 'assigned' | 'in_shop',
        tags: programData.tags || [],
        header_image: programData.header_image,
        guidance_text: programData.guidance_text,
        pro_tip: programData.pro_tip,
        avoidance_text: programData.avoidance_text,
        created_at: programData.created_at,
        client_name: clientName,
        assigned_at: programData.assigned_at,
        in_shop_price: programData.in_shop_price,
        weeks
      };

      setProgram(processedProgram);
    } catch (err) {
      console.error('Error fetching program:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch program';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (programId) {
      fetchProgram();
    }
  }, [programId]);

  return {
    program,
    isLoading,
    error,
    refetch: fetchProgram
  };
};
