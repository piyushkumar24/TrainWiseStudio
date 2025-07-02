
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save } from 'lucide-react';
import { ProgramData } from '@/hooks/useProgramBuilder';

interface SaveProgramStepProps {
  programData: ProgramData;
  onSaveProgram?: () => void;
}

export const SaveProgramStep = ({ programData, onSaveProgram }: SaveProgramStepProps) => {
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          💾 Save Your Program
        </h2>
        <p className="text-gray-600">
          Ready to save your draft as a complete program?
        </p>
      </div>

      <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Save className="h-5 w-5 text-orange-600" />
            </div>
            Save Program to Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Save "{programData.title}" as a complete program in your library. You can then assign it to clients or add it to your shop later.
          </p>
          <Button 
            onClick={onSaveProgram}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Save Program
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
