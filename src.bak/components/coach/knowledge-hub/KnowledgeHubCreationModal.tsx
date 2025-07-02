
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface KnowledgeHubCreationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const KnowledgeHubCreationModal = ({ open, onOpenChange }: KnowledgeHubCreationModalProps) => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'fitness',
      title: 'Fitness Exercise',
      description: 'Create workout routines and exercise instructions',
      emoji: '🏋️',
      path: '/coach/knowledgeHub/fitness/create',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700',
    },
    {
      id: 'nutrition',
      title: 'Nutrition Recipe',
      description: 'Create healthy recipes and meal plans',
      emoji: '🥗',
      path: '/coach/knowledgeHub/recipes/create',
      gradient: 'from-green-500 to-green-600',
      hoverGradient: 'hover:from-green-600 hover:to-green-700',
    },
    {
      id: 'mental',
      title: 'Mental Health',
      description: 'Create mindfulness and wellness exercises',
      emoji: '🧘',
      path: '/coach/knowledgeHub/mental/create',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-700',
    },
  ];

  const handleCategorySelect = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Create New Content</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.path)}
              className={`w-full p-4 rounded-lg bg-gradient-to-r ${category.gradient} ${category.hoverGradient} text-white transition-all duration-200 hover:scale-105 hover:shadow-lg group`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{category.emoji}</div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg">{category.title}</h3>
                  <p className="text-white/80 text-sm">{category.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
