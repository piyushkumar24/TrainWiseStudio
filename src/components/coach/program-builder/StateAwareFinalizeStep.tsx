
import React from 'react';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { FinalizeOptionsStep } from './FinalizeOptionsStep';
import { CompleteProgramStep } from './CompleteProgramStep';
import { SaveProgramStep } from './SaveProgramStep';

interface StateAwareFinalizeStepProps {
  programData: ProgramData | null;
  onSaveProgram?: () => void;
  onAssignToClient?: (clientId: string, personalMessage?: string) => void;
  onPublishToShop?: (price: number) => void;
  onComplete?: () => void;
}

export const StateAwareFinalizeStep = ({ 
  programData, 
  onSaveProgram,
  onAssignToClient,
  onPublishToShop,
  onComplete
}: StateAwareFinalizeStepProps) => {
  if (!programData) return null;

  // For assigned or in_shop programs - just show complete button
  if (programData.state === 'assigned' || programData.state === 'in_shop') {
    return (
      <CompleteProgramStep 
        programData={programData}
        onComplete={onComplete}
      />
    );
  }

  // For draft programs - only show save option
  if (programData.state === 'draft') {
    return (
      <SaveProgramStep 
        programData={programData}
        onSaveProgram={onSaveProgram}
      />
    );
  }

  // For saved programs - show all options
  return (
    <FinalizeOptionsStep
      programData={programData}
      onFinalize={(data) => {
        if (data.type === 'save' && onSaveProgram) {
          onSaveProgram();
        } else if (data.type === 'client' && onAssignToClient) {
          onAssignToClient(data.clientId, data.personalMessage);
        } else if (data.type === 'shop' && onPublishToShop) {
          onPublishToShop(data.price);
        }
      }}
    />
  );
};
