
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgramData } from '@/hooks/useFitnessProgramBuilder';

interface ProgramOverviewProps {
  programData: ProgramData | null;
  setProgramData: (data: ProgramData) => void;
  onSubmit: () => void;
}

export const ProgramOverview = ({ programData, setProgramData, onSubmit }: ProgramOverviewProps) => {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          👀 Program Overview
        </h2>
        <p className="text-gray-600">
          Review your program before finalizing
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">Program Details</h3>
          <div className="space-y-2 text-sm">
            <p><strong>Title:</strong> {programData?.title || 'Untitled'}</p>
            <p><strong>Description:</strong> {programData?.description || 'No description'}</p>
            <p><strong>Type:</strong> {programData?.programType}</p>
            {programData?.tags && programData.tags.length > 0 && (
              <p><strong>Tags:</strong> {programData.tags.join(', ')}</p>
            )}
          </div>
        </div>

        <div className="border-t pt-6">
          <div className="text-center">
            <Button
              onClick={onSubmit}
              className="bg-orange-500 hover:bg-orange-600"
              size="lg"
            >
              Create Program 🎉
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
