
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const drafts = [
  {
    id: 1,
    title: 'HIIT Cardio Blast',
    type: 'Template',
    lastUpdated: '2 days ago',
    emoji: '🧩'
  },
  {
    id: 2,
    title: 'Nutrition Myths Debunked',
    type: 'Blog Post',
    lastUpdated: '1 week ago',
    emoji: '📝'
  },
  {
    id: 3,
    title: 'Proper Squat Form',
    type: 'Exercise',
    lastUpdated: '3 days ago',
    emoji: '🏋️'
  },
  {
    id: 4,
    title: 'Beginner Strength Training',
    type: 'Template',
    lastUpdated: '5 days ago',
    emoji: '🧩'
  },
  {
    id: 5,
    title: 'Mindful Eating Guide',
    type: 'Blog Post',
    lastUpdated: '1 day ago',
    emoji: '📝'
  }
];

export const DraftsInProgress = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1100">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Drafts / In Progress 📝</h2>
      
      <div className="flex overflow-x-auto gap-3 pb-4">
        {drafts.map((draft, index) => (
          <Card 
            key={draft.id}
            className="w-[260px] shrink-0 rounded-lg bg-white shadow-md hover:shadow-lg transition-all cursor-pointer animate-in fade-in slide-in-from-bottom-4 hover:scale-[1.02]"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">
                  {draft.emoji}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm mb-2">
                    {draft.title}
                  </h4>
                  <div className="flex gap-2 mb-2">
                    <Badge className="bg-[#FF6B2C] text-white text-xs" variant="secondary">
                      {draft.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    Updated {draft.lastUpdated}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 text-xs hover:scale-[1.02] transition-transform">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-xs hover:scale-[1.02] transition-transform">
                  Delete
                </Button>
                <Button size="sm" className="bg-[#FF6B2C] hover:bg-[#e85b22] flex-1 text-xs hover:scale-[1.02] transition-transform">
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
