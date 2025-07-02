import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProgramInfoStep } from '@/components/coach/program-builder/ProgramInfoStep';
import { CalendarBuilderStep } from '@/components/coach/program-builder/CalendarBuilderStep';
import { OptionalInfoStep } from '@/components/coach/program-builder/OptionalInfoStep';
import { StateAwareFinalizeStep } from '@/components/coach/program-builder/StateAwareFinalizeStep';
import { SuccessStep } from '@/components/coach/program-builder/SuccessStep';
import { NavigationBar } from '@/components/coach/program-builder/NavigationBar';
import { PageHeader } from '@/components/shared/PageHeader';
import { useProgramBuilder, WeekContent, DayContent, ContentBlock } from '@/hooks/useProgramBuilder';
import { useProgramViewer } from '@/hooks/useProgramViewer';
import { useToast } from '@/hooks/use-toast';

export type ProgramCategory = 'fitness' | 'nutrition' | 'mental';
export type ProgramStep = 'info' | 'calendar' | 'optional' | 'finalize' | 'success';

const EditProgram = () => {
  const navigate = useNavigate();
  const { programId } = useParams<{ programId: string }>();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<ProgramStep>('info');
  const [programCategory, setProgramCategory] = useState<ProgramCategory>('fitness');
  const [isLoadingProgram, setIsLoadingProgram] = useState(true);
  
  // Load existing program data
  const { program, isLoading: isProgramLoading, error } = useProgramViewer(programId || '');
  
  const {
    programData,
    setProgramData,
    saveDraft,
    saveProgram: saveOrUpdateProgram,
    saveToLibrary,
    assignToClient,
    publishToShop,
    isLoading
  } = useProgramBuilder(programCategory);

  useEffect(() => {
    if (!programId) {
      navigate('/coach/programBuilder');
      return;
    }
  }, [programId, navigate]);

  useEffect(() => {
    if (program && !isProgramLoading && !error) {
      // Convert program viewer data to program builder format
      const convertedWeeks: WeekContent[] = program.weeks.map(week => ({
        id: week.id,
        weekNumber: week.week_number,
        title: week.title,
        days: week.days.map(day => ({
          id: day.id,
          dayName: day.day_name,
          dayNumber: day.day_number,
          blocks: day.blocks.map(block => ({
            id: block.id,
            type: block.block_type as 'exercise' | 'recipe' | 'mental' | 'text' | 'image' | 'video' | 'url' | 'pro_tip' | 'avoidance',
            data: block.block_data || {},
            order: block.block_order,
            contentId: block.content?.id
          } as ContentBlock))
        } as DayContent))
      }));

      const convertedProgramData = {
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
      
      setProgramData(convertedProgramData);
      setProgramCategory(program.category as ProgramCategory);
      setIsLoadingProgram(false);
    } else if (error) {
      toast({
        title: "Error",
        description: "Failed to load program for editing",
        variant: "destructive",
      });
      navigate('/coach/programBuilder');
    }
  }, [program, isProgramLoading, error, setProgramData, navigate, toast]);

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
      await saveDraft(programData);
    }
  };

  const handleSaveProgram = async () => {
    if (programData) {
      await saveToLibrary(programData);
      setCurrentStep('success');
    }
  };

  const handleAssignToClient = async (clientId: string, personalMessage?: string) => {
    if (programData) {
      await assignToClient(programData, clientId, personalMessage);
      setCurrentStep('success');
    }
  };

  const handlePublishToShop = async (price: number) => {
    if (programData) {
      await publishToShop(programData, price);
      setCurrentStep('success');
    }
  };

  const handleComplete = () => {
    navigate('/coach/programBuilder');
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
          <StateAwareFinalizeStep
            programData={programData}
            onSaveProgram={handleSaveProgram}
            onAssignToClient={handleAssignToClient}
            onPublishToShop={handlePublishToShop}
            onComplete={handleComplete}
          />
        );
      case 'success':
        return (
          <SuccessStep
            programCategory={programCategory}
            onCreateAnother={() => navigate('/coach/create-program?category=' + programCategory)}
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

  if (isProgramLoading || isLoadingProgram) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading program...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Program not found'}</p>
          <button 
            onClick={() => navigate('/coach/programBuilder')}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Back to Programs
          </button>
        </div>
      </div>
    );
  }

  const stepIndex = ['info', 'calendar', 'optional', 'finalize'].indexOf(currentStep);
  const stepDisplay = stepIndex >= 0 ? `Step ${stepIndex + 1} of 4` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <PageHeader
        title={`${getCategoryEmoji()} Edit ${getCategoryTitle()} Program`}
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

export default EditProgram;
