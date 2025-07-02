
import React from 'react';
import { Button } from '@/components/ui/button';

interface SubFilterPillsProps {
  options: string[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export const SubFilterPills = ({
  options,
  activeFilter,
  setActiveFilter,
}: SubFilterPillsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
      {options.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={activeFilter === option ? "default" : "outline"}
          onClick={() => setActiveFilter(option)}
          className={`whitespace-nowrap capitalize text-xs transition-all duration-200 ${
            activeFilter === option
              ? 'bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200'
              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200'
          }`}
        >
          {option === 'all' ? 'All' : option}
        </Button>
      ))}
    </div>
  );
};
