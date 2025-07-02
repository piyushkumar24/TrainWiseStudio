
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { useProgramViewer } from '@/hooks/useProgramViewer';
import { ProgramHeader } from '@/components/coach/program-viewer/ProgramHeader';
import { ContentBlock } from '@/components/coach/program-viewer/ContentBlock';
import { GuidanceSection } from '@/components/coach/program-viewer/GuidanceSection';

const ProgramViewer = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  
  const { program, isLoading, error } = useProgramViewer(programId || '');

  const handleBack = () => {
    navigate('/coach/programBuilder');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading program...</p>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">{error || 'Program not found'}</p>
          <Button onClick={handleBack} variant="outline">
            Back to Programs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="w-full bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="px-4 sm:px-6 md:px-8 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Programs</span>
            <span className="sm:hidden">Back</span>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Program Header */}
        <ProgramHeader program={program} />

        {/* Program Content */}
        <div className="p-4 md:p-6 space-y-6">
          {/* Weekly Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Program Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!program.weeks || program.weeks.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No weeks added to this program yet</p>
                </div>
              ) : (
                <Accordion type="multiple" className="space-y-4">
                  {program.weeks.map((week) => (
                    <AccordionItem key={week.id} value={week.id} id={`week-${week.week_number}`}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">Week {week.week_number}</span>
                          {week.title && (
                            <span className="text-gray-600">- {week.title}</span>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {week.days.length} day{week.days.length !== 1 ? 's' : ''}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-4">
                        <div className="grid gap-4 md:grid-cols-2">
                          {week.days.map((day) => (
                            <Card key={day.id} className="border-l-4 border-l-orange-400" id={`week-${week.week_number}-day-${day.day_name}`}>
                              <CardHeader className="pb-3">
                                <CardTitle className="text-lg flex items-center gap-2">
                                  <Clock className="h-4 w-4" />
                                  {day.day_name}
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                {day.blocks.length === 0 ? (
                                  <p className="text-gray-500 text-sm">No activities planned</p>
                                ) : (
                                  <div className="space-y-3">
                                    {day.blocks.map((block) => (
                                      <ContentBlock 
                                        key={block.id} 
                                        block={block} 
                                        category={program.category}
                                        weekNumber={week.week_number}
                                        dayName={day.day_name}
                                      />
                                    ))}
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </CardContent>
          </Card>

          {/* Guidance Section */}
          <GuidanceSection program={program} />
        </div>
      </div>
    </div>
  );
};

export default ProgramViewer;
