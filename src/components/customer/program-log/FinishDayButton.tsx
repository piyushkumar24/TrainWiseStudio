
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar } from 'lucide-react';

interface FinishDayButtonProps {
  onFinish: () => void;
  completed: boolean;
  disabled: boolean;
}

export const FinishDayButton = ({ onFinish, completed, disabled }: FinishDayButtonProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 safe-area-bottom">
      <Button
        onClick={onFinish}
        disabled={disabled}
        className={`w-full h-12 text-base font-semibold ${
          completed 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-orange-500 hover:bg-orange-600 text-white'
        }`}
      >
        {completed ? (
          <>
            <CheckCircle className="h-5 w-5 mr-2" />
            Day Completed!
          </>
        ) : (
          <>
            <Calendar className="h-5 w-5 mr-2" />
            Finish Day
          </>
        )}
      </Button>
    </div>
  );
};
