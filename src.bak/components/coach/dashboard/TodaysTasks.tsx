
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const tasks = [
  {
    id: 1,
    title: '3 plans expire in 3 days',
    count: 3,
    type: 'warning',
    link: '/coach/clients?filter=expiring',
    emoji: '🔥'
  },
  {
    id: 2,
    title: '2 clients await feedback',
    count: 2,
    type: 'urgent',
    link: '/coach/clients?filter=feedback',
    emoji: '💬'
  },
  {
    id: 3,
    title: '4 clients missing program',
    count: 4,
    type: 'action',
    link: '/coach/requests',
    emoji: '⚠️'
  },
  {
    id: 4,
    title: '1 client hasn\'t checked in for 7 days',
    count: 1,
    type: 'follow-up',
    link: '/coach/clients?filter=inactive',
    emoji: '🔄'
  }
];

export const TodaysTasks = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-xl font-semibold mb-3 text-gray-900">Today's Tasks</h2>
      <p className="text-sm text-gray-500 mb-6">Urgent actions that need your attention</p>
      
      <div className="flex overflow-x-auto gap-4 pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {tasks.map((task, index) => (
          <Card 
            key={task.id}
            className="bg-orange-50 border-l-4 border-orange-500 rounded-xl w-[270px] shrink-0 shadow-sm cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 lg:w-auto lg:shrink"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">
                  {task.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                      {task.count}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-gray-900 leading-snug">
                    {task.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
