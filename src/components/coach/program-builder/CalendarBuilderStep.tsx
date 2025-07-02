
import React from 'react';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';
import { WeekDayBuilder } from '@/components/coach/fitness-program-builder/WeekDayBuilder';

interface CalendarBuilderStepProps {
  programData: ProgramData | null;
  setProgramData: (data: ProgramData) => void;
  programCategory: ProgramCategory;
}

export const CalendarBuilderStep = ({ programData, setProgramData, programCategory }: CalendarBuilderStepProps) => {
  return (
    <WeekDayBuilder
      programData={programData}
      setProgramData={setProgramData}
      programCategory={programCategory}
    />
  );
};
