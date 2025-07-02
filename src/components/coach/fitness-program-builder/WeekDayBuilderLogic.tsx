
import { useState } from 'react';
import { ProgramData, WeekContent, DayContent, ContentBlock } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

export const useWeekDayBuilderLogic = (
  programData: ProgramData | null,
  setProgramData: (data: ProgramData) => void,
  programCategory: ProgramCategory
) => {
  const [selectedWeek, setSelectedWeek] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<string | null>(null);
  const [showBlockSelector, setShowBlockSelector] = useState(false);

  const addWeek = () => {
    const newWeek: WeekContent = {
      id: `week_${Date.now()}`,
      weekNumber: (programData?.weeks.length || 0) + 1,
      days: []
    };

    setProgramData({
      ...programData!,
      weeks: [...(programData?.weeks || []), newWeek]
    });
  };

  const removeWeek = (weekId: string) => {
    setProgramData({
      ...programData!,
      weeks: programData!.weeks.filter(week => week.id !== weekId).map((week, index) => ({
        ...week,
        weekNumber: index + 1 // Reorder week numbers
      }))
    });
  };

  const addDay = (weekId: string) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const week = programData?.weeks.find(w => w.id === weekId);
    const nextDayName = dayNames[week?.days.length || 0] || `Day ${(week?.days.length || 0) + 1}`;

    const newDay: DayContent = {
      id: `day_${Date.now()}`,
      dayName: nextDayName,
      dayNumber: (week?.days.length || 0) + 1,
      blocks: []
    };

    setProgramData({
      ...programData!,
      weeks: programData!.weeks.map(week => 
        week.id === weekId 
          ? { ...week, days: [...week.days, newDay] }
          : week
      )
    });
  };

  const removeDay = (weekId: string, dayId: string) => {
    setProgramData({
      ...programData!,
      weeks: programData!.weeks.map(week => 
        week.id === weekId 
          ? { ...week, days: week.days.filter(day => day.id !== dayId) }
          : week
      )
    });
  };

  const duplicateWeek = (weekId: string) => {
    const weekToDuplicate = programData?.weeks.find(w => w.id === weekId);
    if (!weekToDuplicate) return;

    const newWeek: WeekContent = {
      ...weekToDuplicate,
      id: `week_${Date.now()}`,
      weekNumber: (programData?.weeks.length || 0) + 1,
      days: weekToDuplicate.days.map(day => ({
        ...day,
        id: `day_${Date.now()}_${Math.random()}`,
        blocks: day.blocks.map(block => ({
          ...block,
          id: `block_${Date.now()}_${Math.random()}`
        }))
      }))
    };

    setProgramData({
      ...programData!,
      weeks: [...(programData?.weeks || []), newWeek]
    });
  };

  const addBlock = (weekId: string, dayId: string, block: ContentBlock) => {
    console.log('WeekDayBuilderLogic addBlock - Adding new block:', block);
    setProgramData({
      ...programData!,
      weeks: programData!.weeks.map(week => 
        week.id === weekId 
          ? {
              ...week,
              days: week.days.map(day => 
                day.id === dayId 
                  ? { ...day, blocks: [...day.blocks, block] }
                  : day
              )
            }
          : week
      )
    });
    setShowBlockSelector(false);
    setSelectedWeek(null);
    setSelectedDay(null);
    setEditingBlock(null);
  };

  const editBlock = (weekId: string, dayId: string, blockId: string, updatedBlock: ContentBlock) => {
    console.log('WeekDayBuilderLogic editBlock - Editing block:', {
      weekId,
      dayId,
      blockId,
      updatedBlock
    });
    
    setProgramData({
      ...programData!,
      weeks: programData!.weeks.map(week => 
        week.id === weekId 
          ? {
              ...week,
              days: week.days.map(day => 
                day.id === dayId 
                  ? { 
                      ...day, 
                      blocks: day.blocks.map(block => {
                        if (block.id === blockId) {
                          console.log('WeekDayBuilderLogic editBlock - Replacing block:', block.id, 'with:', updatedBlock);
                          return updatedBlock;
                        }
                        return block;
                      })
                    }
                  : day
              )
            }
          : week
      )
    });
    setShowBlockSelector(false);
    setSelectedWeek(null);
    setSelectedDay(null);
    setEditingBlock(null);
  };

  const deleteBlock = (weekId: string, dayId: string, blockId: string) => {
    setProgramData({
      ...programData!,
      weeks: programData!.weeks.map(week => 
        week.id === weekId 
          ? {
              ...week,
              days: week.days.map(day => 
                day.id === dayId 
                  ? { 
                      ...day, 
                      blocks: day.blocks.filter(block => block.id !== blockId)
                    }
                  : day
              )
            }
          : week
      )
    });
  };

  const handleAddBlock = (weekId: string, dayId: string) => {
    setSelectedWeek(weekId);
    setSelectedDay(dayId);
    setEditingBlock(null);
    setShowBlockSelector(true);
  };

  const handleEditBlock = (weekId: string, dayId: string, blockId: string) => {
    console.log('WeekDayBuilderLogic handleEditBlock - Starting edit for:', {
      weekId,
      dayId,
      blockId
    });
    setSelectedWeek(weekId);
    setSelectedDay(dayId);
    setEditingBlock(blockId);
    setShowBlockSelector(true);
  };

  const handleDeleteBlock = (weekId: string, dayId: string, blockId: string) => {
    if (confirm('Are you sure you want to delete this block?')) {
      deleteBlock(weekId, dayId, blockId);
    }
  };

  const handleRemoveDay = (weekId: string, dayId: string) => {
    if (confirm('Are you sure you want to remove this day?')) {
      removeDay(weekId, dayId);
    }
  };

  const handleRemoveWeek = (weekId: string) => {
    if (confirm('Are you sure you want to remove this week? All days and content will be lost.')) {
      removeWeek(weekId);
    }
  };

  const getCurrentBlock = () => {
    if (!editingBlock || !selectedWeek || !selectedDay) return null;
    
    const week = programData?.weeks.find(w => w.id === selectedWeek);
    const day = week?.days.find(d => d.id === selectedDay);
    const currentBlock = day?.blocks.find(b => b.id === editingBlock) || null;
    
    console.log('WeekDayBuilderLogic getCurrentBlock - Found block:', currentBlock);
    return currentBlock;
  };

  return {
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
    deleteBlock,
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
  };
};
