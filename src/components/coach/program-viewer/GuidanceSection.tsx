
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, AlertTriangle, BookOpen } from 'lucide-react';
import { ProgramViewerData } from '@/hooks/useProgramViewer';

interface GuidanceSectionProps {
  program: ProgramViewerData;
}

export const GuidanceSection: React.FC<GuidanceSectionProps> = ({ program }) => {
  if (!program.guidance_text && !program.pro_tip && !program.avoidance_text) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Program Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {program.guidance_text && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">General Guidance</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{program.guidance_text}</p>
          </div>
        )}
        
        {program.pro_tip && (
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-900 mb-1">Pro Tips</h4>
                <p className="text-amber-700 text-sm leading-relaxed">{program.pro_tip}</p>
              </div>
            </div>
          </div>
        )}
        
        {program.avoidance_text && (
          <div className="p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-red-900 mb-1">Important Notes</h4>
                <p className="text-red-700 text-sm leading-relaxed">{program.avoidance_text}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
