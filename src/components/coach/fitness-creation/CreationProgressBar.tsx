
import React from 'react';
import { Check } from 'lucide-react';

interface CreationProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export const CreationProgressBar = ({ currentStep, totalSteps }: CreationProgressBarProps) => {
  const steps = [
    { label: 'Basic Info', icon: '📝' },
    { label: 'Instructions', icon: '🔧' },
    { label: 'Preview', icon: '👁️' },
    { label: 'Complete', icon: '🎉' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all
                ${isCompleted 
                  ? 'bg-green-500 text-white' 
                  : isCurrent 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }
              `}>
                {isCompleted ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <div className="ml-2 hidden sm:block">
                <p className={`text-xs font-medium ${
                  isCurrent ? 'text-orange-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                }`}>
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 mx-4 transition-all
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
