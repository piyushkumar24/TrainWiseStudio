
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramData } from '@/hooks/useProgramBuilder';

interface OptionalInfoStepProps {
  programData: ProgramData | null;
  setProgramData: (data: ProgramData) => void;
}

export const OptionalInfoStep = ({ programData, setProgramData }: OptionalInfoStepProps) => {
  const handleChange = (field: string, value: string) => {
    setProgramData({
      ...programData!,
      [field]: value,
    });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📝 Additional Information
        </h2>
        <p className="text-gray-600">
          Add optional guidance and tips for your program (you can skip this step)
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-gray-900">
              📋 General Guidance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add general guidance for following this program..."
              value={programData?.guidance || ''}
              onChange={(e) => handleChange('guidance', e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-lg text-green-800 flex items-center gap-2">
              💡 Pro Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add helpful tips for success..."
              value={programData?.proTips || ''}
              onChange={(e) => handleChange('proTips', e.target.value)}
              className="min-h-[100px] bg-white border-green-200 focus:border-green-400"
            />
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-lg text-red-800 flex items-center gap-2">
              ⚠️ What to Avoid
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add important warnings or things to avoid..."
              value={programData?.warnings || ''}
              onChange={(e) => handleChange('warnings', e.target.value)}
              className="min-h-[100px] bg-white border-red-200 focus:border-red-400"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
