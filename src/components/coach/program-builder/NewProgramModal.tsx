import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface NewProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const programTypes = [
  {
    id: 'fitness',
    label: 'Fitness Program',
    icon: '🏋️',
    description: 'Create workout routines and exercise plans',
    color: 'bg-orange-50 hover:bg-orange-100 border-orange-200',
  },
  {
    id: 'nutrition',
    label: 'Nutrition Program',
    icon: '🥗',
    description: 'Build meal plans and dietary guidance',
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
  },
  {
    id: 'mental',
    label: 'Mental Health Program',
    icon: '🧘',
    description: 'Design mindfulness and wellness activities',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
  },
];

export const NewProgramModal = ({ isOpen, onClose }: NewProgramModalProps) => {
  const navigate = useNavigate();

  const handleProgramTypeSelect = (type: string) => {
    navigate(`/coach/create-program?category=${type}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Program Template</DialogTitle>
          <DialogDescription>
            Choose the type of program you'd like to create for your clients.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {programTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleProgramTypeSelect(type.id)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-colors ${type.color}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{type.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.label}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
