
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, MessageCircle, Camera, Video, FileText, User, Calendar, Dumbbell } from 'lucide-react';
import { ClientDetail } from '@/hooks/useClientDetail';

interface ActivityTimelineProps {
  client: ClientDetail;
}

export const ActivityTimeline = ({ client }: ActivityTimelineProps) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const getEventIcon = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case 'coach_comment':
      case 'coach_feedback':
        return <User className="h-4 w-4 text-orange-600" />;
      case 'workout_completed':
      case 'exercise_completed':
        return <Dumbbell className="h-4 w-4 text-blue-600" />;
      case 'check_in':
      case 'weekly_checkin':
        return <MessageCircle className="h-4 w-4 text-green-600" />;
      case 'progress_photo':
      case 'photo_upload':
        return <Camera className="h-4 w-4 text-purple-600" />;
      case 'video_upload':
        return <Video className="h-4 w-4 text-purple-600" />;
      case 'journal_entry':
        return <FileText className="h-4 w-4 text-blue-600" />;
      case 'program_assigned':
        return <Calendar className="h-4 w-4 text-green-600" />;
      default:
        return <MessageCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getEventColor = (activityType: string) => {
    switch (activityType.toLowerCase()) {
      case 'coach_comment':
      case 'coach_feedback':
        return 'border-orange-200 bg-orange-50';
      case 'workout_completed':
      case 'exercise_completed':
        return 'border-blue-200 bg-blue-50';
      case 'check_in':
      case 'weekly_checkin':
        return 'border-green-200 bg-green-50';
      case 'progress_photo':
      case 'photo_upload':
      case 'video_upload':
        return 'border-purple-200 bg-purple-50';
      case 'journal_entry':
        return 'border-blue-200 bg-blue-50';
      case 'program_assigned':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const formatActivityContent = (activity: any) => {
    const activityData = activity.activity_data || {};
    
    switch (activity.activity_type.toLowerCase()) {
      case 'workout_completed':
        return `Completed workout: ${activityData.workout_name || 'Unknown workout'}`;
      case 'exercise_completed':
        return `Completed exercise: ${activityData.exercise_name || 'Unknown exercise'}`;
      case 'check_in':
      case 'weekly_checkin':
        return `Weekly check-in completed${activityData.mood ? ` - Mood: ${activityData.mood}` : ''}`;
      case 'progress_photo':
      case 'photo_upload':
        return 'Progress photo uploaded';
      case 'video_upload':
        return 'Workout video uploaded';
      case 'journal_entry':
        return `Journal entry: "${activityData.content?.substring(0, 100) || 'Private entry'}${activityData.content?.length > 100 ? '...' : ''}"`;
      case 'program_assigned':
        return `New program assigned: ${activityData.program_name || 'Fitness Program'}`;
      case 'coach_comment':
      case 'coach_feedback':
        return activityData.comment || 'Coach provided feedback';
      default:
        return activityData.description || 'Activity completed';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffInMs = now.getTime() - activityDate.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInDays === 0) {
      if (diffInHours === 0) return 'Just now';
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">🗓️ Activity Timeline</h3>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden transition-all duration-200">
          <div className="px-6 pb-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {client.activities && client.activities.length > 0 ? (
                client.activities.map((activity, index) => (
                  <div key={activity.id} className="flex gap-4">
                    {/* Timeline dot and line */}
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                        {getEventIcon(activity.activity_type)}
                      </div>
                      {index < client.activities!.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                      )}
                    </div>

                    {/* Event content */}
                    <div className={`flex-1 p-4 rounded-lg border ${getEventColor(activity.activity_type)}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-sm font-medium text-gray-900">{client.name}</span>
                        <span className="text-xs text-gray-500">{formatTimeAgo(activity.created_at)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{formatActivityContent(activity)}</p>
                      
                      {activity.activity_type.toLowerCase().includes('coach') && (
                        <div className="mt-2 pt-2 border-t border-orange-200">
                          <span className="text-xs text-orange-600 font-medium">Coach Activity</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h4>
                  <p className="text-gray-600">This client hasn't logged any activities yet.</p>
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
