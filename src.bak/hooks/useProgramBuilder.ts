import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export type ContentBlock = {
  id: string;
  type: 'exercise' | 'recipe' | 'mental' | 'text' | 'image' | 'video' | 'url' | 'pro_tip' | 'avoidance';
  data: any;
  order: number;
  contentId?: string; // Reference to knowledge hub content
};

export type DayContent = {
  id: string;
  dayName: string;
  dayNumber?: number;
  blocks: ContentBlock[];
};

export type WeekContent = {
  id: string;
  weekNumber: number;
  title?: string;
  days: DayContent[];
};

export type ProgramData = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  headerImage?: string;
  category: 'fitness' | 'nutrition' | 'mental';
  state: 'draft' | 'saved' | 'assigned' | 'in_shop';
  weeks: WeekContent[];
  guidance?: string;
  proTips?: string;
  warnings?: string;
};

export const useProgramBuilder = (category: string) => {
  const { toast } = useToast();
  const [programData, setProgramData] = useState<ProgramData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const saveOrUpdateProgram = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const isEdit = !!data.id;

      const programPayload = {
        coach_id: user.id,
        title: data.title || 'Untitled Program',
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        updated_at: new Date().toISOString()
      };

      let savedProgram;

      if (!isEdit) {
        // New program → Save to coach's personal library
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert({
            ...programPayload,
            state: 'saved' // Save to library
          })
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;

        toast({
          title: "Program saved to library! 🎉",
          description: "Your program has been saved to your library.",
        });
      } else {
        // Existing program → Update and preserve critical state
        const { data: existingProgram, error: fetchError } = await supabase
          .from('programs')
          .select('state, client_id, assigned_at, in_shop_price, in_shop_at, personal_message')
          .eq('id', data.id)
          .single();

        if (fetchError) throw fetchError;

        if (!existingProgram) {
          throw new Error('Program not found');
        }

        // Update program while preserving critical fields
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update({
            ...programPayload,
            // Preserve existing critical fields
            state: existingProgram.state,
            client_id: existingProgram.client_id,
            assigned_at: existingProgram.assigned_at,
            in_shop_price: existingProgram.in_shop_price,
            in_shop_at: existingProgram.in_shop_at,
            personal_message: existingProgram.personal_message
          })
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;

        toast({
          title: "Program updated! ✨",
          description: "Your program changes have been saved.",
        });
      }

      // Save program structure
      await saveProgramStructure(savedProgram.id, data.weeks);

      setProgramData({ 
        ...data, 
        id: savedProgram.id, 
        state: savedProgram.state as 'draft' | 'saved' | 'assigned' | 'in_shop'
      });

    } catch (error) {
      console.error('Error saving/updating program:', error);
      toast({
        title: "Error",
        description: "Failed to save program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const saveToLibrary = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const isEdit = !!data.id;

      const programPayload = {
        coach_id: user.id,
        title: data.title || 'Untitled Program',
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        updated_at: new Date().toISOString()
      };

      let savedProgram;

      if (!isEdit) {
        // NEW PROGRAM → Save to library
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert({
            ...programPayload,
            state: 'saved'
          })
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;

        toast({
          title: "Program saved to library! 🎉",
          description: "Your program has been saved to your library.",
        });
      } else {
        // EXISTING PROGRAM → Fetch current state first
        const { data: existingProgram, error: fetchError } = await supabase
          .from('programs')
          .select('state, client_id, assigned_at, in_shop_price, in_shop_at, personal_message')
          .eq('id', data.id)
          .single();

        if (fetchError) throw fetchError;

        if (!existingProgram) {
          throw new Error('Program not found');
        }

        // Determine whether to update state to 'saved'
        const shouldUpdateToSaved = !existingProgram.state || existingProgram.state === 'draft';

        // Update program while preserving critical fields
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update({
            ...programPayload,
            // Only set to 'saved' if it's currently draft or null, otherwise preserve existing state
            state: shouldUpdateToSaved ? 'saved' : existingProgram.state,
            // Preserve existing critical fields
            client_id: existingProgram.client_id,
            assigned_at: existingProgram.assigned_at,
            in_shop_price: existingProgram.in_shop_price,
            in_shop_at: existingProgram.in_shop_at,
            personal_message: existingProgram.personal_message
          })
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;

        toast({
          title: "Program saved to library! ✨",
          description: "Your program has been saved to your library.",
        });
      }

      // Save program structure
      await saveProgramStructure(savedProgram.id, data.weeks);

      setProgramData({ 
        ...data, 
        id: savedProgram.id, 
        state: savedProgram.state as 'draft' | 'saved' | 'assigned' | 'in_shop'
      });

    } catch (error) {
      console.error('Error saving program to library:', error);
      toast({
        title: "Error",
        description: "Failed to save program to library. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const saveDraft = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title || 'Untitled Program',
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        state: 'draft'
      };

      let savedProgram;

      if (data.id) {
        // Update existing draft
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;
      } else {
        // Create new draft
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;
      }

      // Save weeks, days, and blocks
      await saveProgramStructure(savedProgram.id, data.weeks);

      setProgramData({ ...data, id: savedProgram.id });

      toast({
        title: "Draft saved! 💾",
        description: "Your program has been saved as a draft.",
      });
    } catch (error) {
      console.error('Error saving draft:', error);
      toast({
        title: "Error",
        description: "Failed to save draft. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const saveProgram = useCallback(async (data: ProgramData) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        state: 'saved',
        updated_at: new Date().toISOString()
      };

      let savedProgram;

      if (data.id) {
        // Update existing program
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;
      } else {
        // Create new program
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;
      }

      // Save program structure
      await saveProgramStructure(savedProgram.id, data.weeks);

      setProgramData({ ...data, id: savedProgram.id, state: 'saved' });

      toast({
        title: "Program saved! 🎉",
        description: "Your program has been saved to your library.",
      });
    } catch (error) {
      console.error('Error saving program:', error);
      toast({
        title: "Error",
        description: "Failed to save program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const assignToClient = useCallback(async (data: ProgramData, clientId: string, personalMessage?: string) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        state: 'assigned',
        client_id: clientId,
        assigned_at: new Date().toISOString(),
        personal_message: personalMessage,
        updated_at: new Date().toISOString()
      };

      let savedProgram;

      if (data.id) {
        // Update existing program
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;
      } else {
        // Create new program
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;
      }

      // Save program structure
      await saveProgramStructure(savedProgram.id, data.weeks);

      // Create program assignment record
      const { error: assignmentError } = await supabase
        .from('program_assignments')
        .insert({
          client_id: clientId,
          program_id: savedProgram.id,
          assigned_by: user.id,
          status: 'active',
        });

      if (assignmentError) {
        console.error('Error creating assignment:', assignmentError);
      }

      toast({
        title: "Program assigned! 🎉",
        description: "Your program has been assigned to the client.",
      });
    } catch (error) {
      console.error('Error assigning program:', error);
      toast({
        title: "Error",
        description: "Failed to assign program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const publishToShop = useCallback(async (data: ProgramData, price: number) => {
    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const programPayload = {
        coach_id: user.id,
        title: data.title,
        description: data.description,
        category: data.category,
        header_image: data.headerImage,
        tags: data.tags,
        guidance_text: data.guidance,
        pro_tip: data.proTips,
        avoidance_text: data.warnings,
        state: 'in_shop',
        in_shop_price: price,
        in_shop_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      let savedProgram;

      if (data.id) {
        // Update existing program
        const { data: updatedProgram, error } = await supabase
          .from('programs')
          .update(programPayload)
          .eq('id', data.id)
          .select()
          .single();

        if (error) throw error;
        savedProgram = updatedProgram;
      } else {
        // Create new program
        const { data: newProgram, error } = await supabase
          .from('programs')
          .insert(programPayload)
          .select()
          .single();

        if (error) throw error;
        savedProgram = newProgram;
      }

      // Save program structure
      await saveProgramStructure(savedProgram.id, data.weeks);

      toast({
        title: "Program published! 🛒",
        description: "Your program has been published to your shop.",
      });
    } catch (error) {
      console.error('Error publishing program:', error);
      toast({
        title: "Error",
        description: "Failed to publish program. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const saveProgramStructure = async (programId: string, weeks: WeekContent[]) => {
    // Delete existing structure
    await supabase.from('program_weeks').delete().eq('program_id', programId);

    // Save weeks
    for (const week of weeks) {
      const { data: savedWeek, error: weekError } = await supabase
        .from('program_weeks')
        .insert({
          program_id: programId,
          week_number: week.weekNumber,
          title: week.title
        })
        .select()
        .single();

      if (weekError) throw weekError;

      // Save days
      for (const day of week.days) {
        const { data: savedDay, error: dayError } = await supabase
          .from('program_days')
          .insert({
            week_id: savedWeek.id,
            day_name: day.dayName,
            day_number: day.dayNumber || 1
          })
          .select()
          .single();

        if (dayError) throw dayError;

        // Save blocks with content_id
        for (const block of day.blocks) {
          const { error: blockError } = await supabase
            .from('program_blocks')
            .insert({
              day_id: savedDay.id,
              block_type: block.type,
              block_data: block.data,
              block_order: block.order,
              content_id: block.contentId // ✅ SAVE CONTENT_ID FOR KNOWLEDGE HUB LINKING
            });

          if (blockError) throw blockError;
        }
      }
    }
  };

  return {
    programData,
    setProgramData,
    saveDraft,
    saveProgram,
    saveOrUpdateProgram,
    saveToLibrary,
    assignToClient,
    publishToShop,
    isLoading,
  };
};
