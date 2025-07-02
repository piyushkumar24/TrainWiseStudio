
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Calendar } from 'lucide-react';
import { FeedbackModal } from './FeedbackModal';

interface Feedback {
  id: string;
  title: string;
  message: string;
  created_at: string;
  coach_name?: string;
}

interface FeedbackSectionProps {
  userId?: string;
}

export const FeedbackSection = ({ userId }: FeedbackSectionProps) => {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchFeedback();
    }
  }, [userId]);

  const fetchFeedback = async () => {
    try {
      // Enhanced mock data for better visualization
      const mockFeedback: Feedback[] = [
        {
          id: '1',
          title: 'Excellent progress on strength training! 💪',
          message: 'I\'ve been tracking your workouts and I\'m really impressed with your consistency. You\'ve increased your bench press by 15% over the past 3 weeks! Try to increase the weight slightly on your next squat session - I think you\'re ready for it. Remember to focus on form over weight. Keep up the excellent work! Your dedication is really showing.',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          coach_name: 'Sarah Johnson'
        },
        {
          id: '2',
          title: 'Nutrition feedback - great meal prep! 🥗',
          message: 'Your meal logging has improved significantly this week. I can see you\'re hitting your protein targets consistently (averaging 1.2g per kg bodyweight). The variety in your vegetable intake is also much better. For next week, try to add more healthy fats - maybe some avocado or nuts with your lunch. Your portion control is spot on!',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          coach_name: 'Sarah Johnson'
        },
        {
          id: '3',
          title: 'Meditation consistency - well done! 🧘‍♀️',
          message: 'I noticed you\'ve completed 12 out of 14 meditation sessions this week. That\'s fantastic! Your average session time has increased from 8 minutes to 12 minutes, which shows great progress in building the habit. Try the new breathing exercise I uploaded to your library - it might help with your focus during longer sessions.',
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          coach_name: 'Sarah Johnson'
        },
        {
          id: '4',
          title: 'Check-in review - let\'s adjust your plan 📋',
          message: 'Based on your recent check-ins, I can see your energy levels have been lower on Mondays and Tuesdays. This could be related to your weekend activities or sleep schedule. Let\'s try moving your most intense workouts to Wednesday-Friday when your energy is typically higher. Also, your mood scores have been consistently positive - that\'s wonderful to see!',
          created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          coach_name: 'Sarah Johnson'
        },
        {
          id: '5',
          title: 'Rest day reminder - recovery is important! 😴',
          message: 'I see you\'ve been very motivated and pushing hard with your workouts, which is great! However, I want to remind you that rest days are just as important as training days. Your body needs time to recover and build strength. Make sure you\'re taking at least 1-2 complete rest days per week. Your sleep quality has been good at 7.5/10 average, so keep that up!',
          created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          coach_name: 'Sarah Johnson'
        }
      ];
      
      setFeedback(mockFeedback);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          💬 Feedback
        </h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
        💬 Feedback
      </h2>
      
      {feedback.length === 0 ? (
        <Card className="p-8 text-center">
          <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
          <p className="text-gray-600">Your coach will provide feedback as you progress through your programs.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {feedback.map((item) => (
            <Card 
              key={item.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedFeedback(item)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {item.message}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.created_at).toLocaleDateString()}
                    {item.coach_name && (
                      <Badge variant="outline" className="text-xs">
                        Coach {item.coach_name}
                      </Badge>
                    )}
                  </div>
                </div>
                <MessageCircle className="h-5 w-5 text-orange-500 flex-shrink-0 ml-3" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {selectedFeedback && (
        <FeedbackModal
          feedback={selectedFeedback}
          open={!!selectedFeedback}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
};
