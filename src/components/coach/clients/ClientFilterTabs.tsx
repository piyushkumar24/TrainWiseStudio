
import React from 'react';
import { FilterOption } from '@/types/client';

interface ClientFilterTabsProps {
  filterOptions: FilterOption[];
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export const ClientFilterTabs = ({ filterOptions, statusFilter, setStatusFilter }: ClientFilterTabsProps) => {
  // Group filter options by color/category
  const groupedOptions = {
    all: filterOptions.filter(option => option.key === 'all'),
    red: filterOptions.filter(option => 
      ['missing-program', 'needs-follow-up', 'program-expired'].includes(option.key)
    ),
    orange: filterOptions.filter(option => 
      ['waiting-feedback', 'off-track'].includes(option.key)
    ),
    green: filterOptions.filter(option => 
      ['on-track', 'new-comer'].includes(option.key)
    ),
    grey: filterOptions.filter(option => 
      ['leaver', 'non-active'].includes(option.key)
    )
  };

  const renderPillGroup = (options: FilterOption[], groupColor?: string) => {
    if (options.length === 0) return null;
    
    return (
      <div className={`flex gap-2 ${groupColor ? `p-2 rounded-lg bg-${groupColor}-25` : ''}`}>
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = statusFilter === option.key;
          
          return (
            <button
              key={option.key}
              onClick={() => setStatusFilter(option.key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium whitespace-nowrap transition-all duration-200 min-w-fit snap-start shadow-sm
                ${isActive 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-gray-50'
                }
              `}
            >
              <Icon className={`h-4 w-4 ${isActive ? 'text-white' : option.color}`} />
              <span>{option.label}</span>
              <span className={`
                text-xs px-2 py-0.5 rounded-full 
                ${isActive 
                  ? 'bg-white/20 text-white' 
                  : 'bg-gray-100 text-gray-600'
                }
              `}>
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex overflow-x-auto gap-4 px-1 py-2 mb-6 scrollbar-hide snap-x snap-mandatory">
      {/* All Clients - Special case */}
      {renderPillGroup(groupedOptions.all)}
      
      {/* Red Pills - Urgent */}
      <div className="flex flex-col">
        <div className="text-xs font-medium text-red-600 mb-1 px-2">🔴 Urgent</div>
        {renderPillGroup(groupedOptions.red)}
      </div>
      
      {/* Orange Pills - Check In */}
      <div className="flex flex-col">
        <div className="text-xs font-medium text-orange-600 mb-1 px-2">🟠 Check In</div>
        {renderPillGroup(groupedOptions.orange)}
      </div>
      
      {/* Green Pills - Active */}
      <div className="flex flex-col">
        <div className="text-xs font-medium text-green-600 mb-1 px-2">🟢 Active</div>
        {renderPillGroup(groupedOptions.green)}
      </div>
      
      {/* Grey Pills - Inactive */}
      <div className="flex flex-col">
        <div className="text-xs font-medium text-gray-600 mb-1 px-2">⚪ Inactive</div>
        {renderPillGroup(groupedOptions.grey)}
      </div>
    </div>
  );
};
