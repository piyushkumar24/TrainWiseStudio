
import React from 'react';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';
import { WeekDayBuilderView } from './WeekDayBuilderView';
import { BlockSelector } from './BlockSelector';
import { useWeekDayBuilderLogic } from './WeekDayBuilderLogic';
import { useIsMobile } from '@/hooks/use-mobile';

interface WeekDayBuilderProps {
  programData: ProgramData | null;
  setProgramData: (data: ProgramData) => void;
  programCategory: ProgramCategory;
}

export const WeekDayBuilder = ({ programData, setProgramData, programCategory }: WeekDayBuilderProps) => {
  const isMobile = useIsMobile();
  const {
    selectedWeek,
    selectedDay,
    editingBlock,
    showBlockSelector,
    addWeek,
    removeWeek,
    addDay,
    removeDay,
    duplicateWeek,
    addBlock,
    editBlock,
    handleAddBlock,
    handleEditBlock,
    handleDeleteBlock,
    handleRemoveDay,
    handleRemoveWeek,
    getCurrentBlock,
    setShowBlockSelector,
    setSelectedWeek,
    setSelectedDay,
    setEditingBlock
  } = useWeekDayBuilderLogic(programData, setProgramData, programCategory);

  const handleBlockSelectorClose = () => {
    setShowBlockSelector(false);
    setSelectedWeek(null);
    setSelectedDay(null);
    setEditingBlock(null);
  };

  const handleBlockSelect = (block: any) => {
    if (selectedWeek && selectedDay) {
      if (editingBlock) {
        editBlock(selectedWeek, selectedDay, editingBlock, block);
      } else {
        addBlock(selectedWeek, selectedDay, block);
      }
    }
  };

  return (
    <>
      <WeekDayBuilderView
        programData={programData}
        programCategory={programCategory}
        onAddWeek={addWeek}
        onAddDay={addDay}
        onDuplicateWeek={duplicateWeek}
        onRemoveWeek={handleRemoveWeek}
        onAddBlock={handleAddBlock}
        onEditBlock={handleEditBlock}
        onDeleteBlock={handleDeleteBlock}
        onRemoveDay={handleRemoveDay}
      />

      <BlockSelector
        isOpen={showBlockSelector}
        onClose={handleBlockSelectorClose}
        onSelectBlock={handleBlockSelect}
        programCategory={programCategory}
        isMobile={isMobile}
        editingBlock={getCurrentBlock()}
      />
    </>
  );
};
