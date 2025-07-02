
import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

interface ProgramTypeSelectorProps {
  onSelect: (category: ProgramCategory) => void;
}

const programTypes = [
  {
    id: 'fitness' as ProgramCategory,
    emoji: '🏋️',
    title: 'Fitness Program',
    description: 'Create workout routines and exercise programs',
    color: 'bg-blue-50 hover:bg-blue-100 border-blue-200',
  },
  {
    id: 'nutrition' as ProgramCategory,
    emoji: '🥗',
    title: 'Nutrition Program',
    description: 'Design meal plans and nutrition guidance',
    color: 'bg-green-50 hover:bg-green-100 border-green-200',
  },
  {
    id: 'mental' as ProgramCategory,
    emoji: '🧘‍♀️',
    title: 'Mental Health Program',
    description: 'Build mindfulness and mental wellness routines',
    color: 'bg-purple-50 hover:bg-purple-100 border-purple-200',
  },
];

export const ProgramTypeSelector = ({ onSelect }: ProgramTypeSelectorProps) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose Program Category
        </h2>
        <p className="text-gray-600">
          Select the type of program you'd like to create
        </p>
      </div>

      <div className="space-y-4">
        {programTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={`w-full p-6 rounded-lg border-2 text-left transition-all duration-200 ${type.color} hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{type.emoji}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {type.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {type.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
