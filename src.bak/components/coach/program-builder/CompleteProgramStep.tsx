
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { ProgramData } from '@/hooks/useProgramBuilder';

interface CompleteProgramStepProps {
  programData: ProgramData;
  onComplete?: () => void;
}

export const CompleteProgramStep = ({ programData, onComplete }: CompleteProgramStepProps) => {
  const getStateMessage = () => {
    if (programData.state === 'assigned') {
      return {
        title: '✅ Program is Assigned',
        description: 'This program is currently assigned to a client. Your changes have been saved and will be reflected in the client\'s program.',
        emoji: '👤'
      };
    } else if (programData.state === 'in_shop') {
      return {
        title: '🛒 Program is in Shop',
        description: 'This program is currently available in your shop. Your changes have been saved and will be reflected for future purchases.',
        emoji: '🛒'
      };
    }
    return {
      title: 'Program Updated',
      description: 'Your changes have been saved.',
      emoji: '✅'
    };
  };

  const { title, description, emoji } = getStateMessage();

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {emoji} {title}
        </h2>
        <p className="text-gray-600">
          {description}
        </p>
      </div>

      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-3 text-lg text-green-800">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Changes Saved Successfully
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-700 mb-4">
            All your edits to "{programData.title}" have been saved. The updated program content is now active.
          </p>
          <Button 
            onClick={onComplete}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          >
            Return to Program Library
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
