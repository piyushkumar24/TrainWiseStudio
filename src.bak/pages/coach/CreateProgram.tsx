
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProgramInfoStep } from '@/components/coach/program-builder/ProgramInfoStep';
import { CalendarBuilderStep } from '@/components/coach/program-builder/CalendarBuilderStep';
import { OptionalInfoStep } from '@/components/coach/program-builder/OptionalInfoStep';
import { FinalizeOptionsStep } from '@/components/coach/program-builder/FinalizeOptionsStep';
import { SuccessStep } from '@/components/coach/program-builder/SuccessStep';
import { NavigationBar } from '@/components/coach/program-builder/NavigationBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { useProgramBuilder, WeekContent, DayContent, ContentBlock } from '@/hooks/useProgramBuilder';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type ProgramCategory = 'fitness' | 'nutrition' | 'mental';
export type ProgramStep = 'info' | 'calendar' | 'optional' | 'finalize' | 'success';

const CreateProgram = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as ProgramCategory;
  const resumeId = searchParams.get('resume');
  const clientId = searchParams.get('clientId');
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<ProgramStep>('info');
  const [programCategory] = useState<ProgramCategory>(categoryParam || 'fitness');
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  
  const {
    programData,
    setProgramData,
    saveDraft,
    saveProgram,
    saveOrUpdateProgram,
    saveToLibrary,
    assignToClient,
    publishToShop,
    isLoading
  } = useProgramBuilder(programCategory);

  useEffect(() => {
    if (!categoryParam) {
      navigate('/coach/programBuilder');
    }
  }, [categoryParam, navigate]);

  // Implement draft loading functionality
  useEffect(() => {
    if (resumeId) {
      const loadDraft = async () => {
        try {
          setIsLoadingDraft(true);
          
          const { data: program, error } = await supabase
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
            .eq('id', resumeId)
            .eq('state', 'draft')
            .single();

          if (error) throw error;

          if (program) {
            // Convert program viewer data to program builder format
            const convertedWeeks: WeekContent[] = program.program_weeks.map(week => ({
              id: week.id,
              weekNumber: week.week_number,
              title: week.title,
              days: week.program_days.map(day => ({
                id: day.id,
                dayName: day.day_name,
                dayNumber: day.day_number,
                blocks: day.program_blocks.map(block => ({
                  id: block.id,
                  type: block.block_type as 'exercise' | 'recipe' | 'mental' | 'text' | 'image' | 'video' | 'url' | 'pro_tip' | 'avoidance',
                  data: block.block_data || {},
                  order: block.block_order,
                  contentId: block.content_id
                } as ContentBlock))
              } as DayContent))
            }));

            const draftData = {
              id: program.id,
              title: program.title,
              description: program.description || '',
              tags: program.tags || [],
              headerImage: program.header_image || undefined,
              category: program.category as ProgramCategory,
              state: program.state as 'draft' | 'saved' | 'assigned' | 'in_shop',
              weeks: convertedWeeks,
              guidance: program.guidance_text || undefined,
              proTips: program.pro_tip || undefined,
              warnings: program.avoidance_text || undefined,
            };
            
            setProgramData(draftData);
          }
        } catch (error) {
          console.error('Error loading draft:', error);
          toast({
            title: "Error",
            description: "Failed to load draft program",
            variant: "destructive",
          });
        } finally {
          setIsLoadingDraft(false);
        }
      };

      loadDraft();
    }
  }, [resumeId, setProgramData, toast]);

  const handleNext = () => {
    const stepOrder: ProgramStep[] = ['info', 'calendar', 'optional', 'finalize', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const stepOrder: ProgramStep[] = ['info', 'calendar', 'optional', 'finalize', 'success'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    } else {
      navigate('/coach/programBuilder');
    }
  };

  const handleSaveDraft = async () => {
    if (programData) {
      await saveOrUpdateProgram(programData);
    }
  };

  const handleSaveProgram = async () => {
    if (programData) {
      await saveToLibrary(programData);
      setCurrentStep('success');
    }
  };

  const handleFinalize = async (finalizeData: any) => {
    if (programData) {
      if (finalizeData.type === 'save') {
        await saveProgram(programData);
      } else if (finalizeData.type === 'client' && finalizeData.clientId) {
        await assignToClient(programData, finalizeData.clientId, finalizeData.personalMessage);
      } else if (finalizeData.type === 'shop' && finalizeData.price) {
        await publishToShop(programData, finalizeData.price);
      }
      setCurrentStep('success');
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'info':
        return (
          <ProgramInfoStep
            programData={programData}
            setProgramData={setProgramData}
            programCategory={programCategory}
          />
        );
      case 'calendar':
        return (
          <CalendarBuilderStep
            programData={programData}
            setProgramData={setProgramData}
            programCategory={programCategory}
          />
        );
      case 'optional':
        return (
          <OptionalInfoStep
            programData={programData}
            setProgramData={setProgramData}
          />
        );
      case 'finalize':
        return (
          <FinalizeOptionsStep
            programData={programData}
            onFinalize={handleFinalize}
          />
        );
      case 'success':
        return (
          <SuccessStep
            programCategory={programCategory}
            onCreateAnother={() => {
              setCurrentStep('info');
              setProgramData(null);
            }}
            onReturnToLibrary={() => navigate('/coach/programBuilder')}
          />
        );
      default:
        return null;
    }
  };

  const getCategoryEmoji = () => {
    switch (programCategory) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getCategoryTitle = () => {
    switch (programCategory) {
      case 'fitness': return 'Fitness';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Health';
      default: return 'Program';
    }
  };

  const handleBack = () => {
    navigate('/coach/programBuilder');
  };

  if (!categoryParam) {
    return null;
  }

  if (isLoadingDraft) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading draft...</p>
        </div>
      </div>
    );
  }

  const stepIndex = ['info', 'calendar', 'optional', 'finalize'].indexOf(currentStep);
  const stepDisplay = stepIndex >= 0 ? `Step ${stepIndex + 1} of 4` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title={`${getCategoryEmoji()} Create ${getCategoryTitle()} Program`}
        description={stepDisplay}
        showBackButton={true}
        onBack={handleBack}
        stickyOffset="top-0"
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {renderCurrentStep()}
      </div>

      {/* Navigation Bar */}
      {currentStep !== 'success' && (
        <NavigationBar
          currentStep={currentStep}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSaveDraft={handleSaveDraft}
          onSaveProgram={handleSaveProgram}
          canProceed={programData !== null}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default CreateProgram;
