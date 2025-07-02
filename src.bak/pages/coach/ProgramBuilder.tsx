
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProgramListView } from '@/components/coach/program-builder/ProgramListView';
import { NewProgramModal } from '@/components/coach/program-builder/NewProgramModal';
import { Program } from '@/hooks/useProgramList';

export type ProgramCategory = 'all' | 'fitness' | 'nutrition' | 'mental';

const ProgramBuilder = () => {
  const navigate = useNavigate();
  const [isNewProgramModalOpen, setIsNewProgramModalOpen] = useState(false);

  const handleViewProgram = (program: Program) => {
    navigate(`/coach/programBuilder/view/${program.id}`);
  };

  const handleEditProgram = (program: Program) => {
    if (program.state === 'draft') {
      navigate(`/coach/create-program?category=${program.category}&resume=${program.id}`);
    } else {
      navigate(`/coach/programBuilder/edit/${program.id}`);
    }
  };

  const handleScheduleProgram = (program: Program) => {
    // This could open a scheduling modal or navigate to a scheduling page
    console.log('Schedule program:', program);
  };

  const handleRemoveProgram = (program: Program) => {
    // This is handled in the ProgramListView component
    console.log('Remove program:', program);
  };

  return (
    <div className="space-y-6">
      <ProgramListView
        onCreateProgram={() => setIsNewProgramModalOpen(true)}
        onViewProgram={handleViewProgram}
        onEditProgram={handleEditProgram}
        onScheduleProgram={handleScheduleProgram}
        onRemoveProgram={handleRemoveProgram}
      />

      <NewProgramModal 
        isOpen={isNewProgramModalOpen}
        onClose={() => setIsNewProgramModalOpen(false)}
      />
    </div>
  );
};

export default ProgramBuilder;
