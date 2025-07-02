import React from 'react';
import { Eye, Mail, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Client } from '@/types/client';

interface ClientCardProps {
  client: Client;
}

export const ClientCard = ({ client }: ClientCardProps) => {
  const navigate = useNavigate();

  const handleClientClick = () => {
    navigate(`/coach/clients/${client.id}`);
  };

  const handleEyeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/coach/clients/${client.id}`);
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Prevent navigation when clicking action buttons
  };

  const getStatusBackgroundColor = (status: string) => {
    const colorMap = {
      'missing-program': 'bg-red-50 border-l-red-400',
      'needs-follow-up': 'bg-red-50 border-l-red-400',
      'program-expired': 'bg-red-50 border-l-red-400',
      'waiting-feedback': 'bg-orange-50 border-l-orange-400',
      'off-track': 'bg-orange-50 border-l-orange-400',
      'on-track': 'bg-green-50 border-l-green-400',
      'new-comer': 'bg-green-50 border-l-green-400',
      'leaver': 'bg-gray-50 border-l-gray-400',
      'non-active': 'bg-gray-50 border-l-gray-400'
    };
    return colorMap[status as keyof typeof colorMap] || 'bg-white border-l-gray-300';
  };

  const getPlanTypeIcons = (planTypes: string[] = []) => {
    const iconMap = {
      fitness: '🏋️',
      nutrition: '🥗',
      'mental-health': '🧘'
    };
    
    return planTypes.map(type => iconMap[type as keyof typeof iconMap]).filter(Boolean);
  };

  const formatGoals = (goals: string[] = []) => {
    const goalLabels: { [key: string]: string } = {
      'get-fit': 'Get Fit',
      'build-muscle': 'Build Muscle',
      'get-stronger': 'Get Stronger',
      'burn-fat': 'Burn Fat',
      'get-toned': 'Get Toned',
      'eat-healthier': 'Eat Healthier',
      'weight-loss': 'Weight Loss',
      'improve-habits': 'Improve Habits',
      'more-energy': 'More Energy',
      'reduce-cravings': 'Reduce Cravings',
      'reduce-stress': 'Reduce Stress',
      'improve-sleep': 'Improve Sleep',
      'build-mindfulness': 'Build Mindfulness',
      'emotional-balance': 'Emotional Balance',
      'boost-focus': 'Boost Focus'
    };
    
    return goals.map(goal => goalLabels[goal] || goal).join(', ');
  };

  return (
    <div 
      className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl shadow-sm border-l-4 w-full ${getStatusBackgroundColor(client.status)} hover:shadow-md transition-shadow md:grid md:grid-cols-12 md:gap-4 cursor-pointer`}
      onClick={handleClientClick}
    >
      {/* Client Name - Fixed width on desktop */}
      <div className="mb-3 md:mb-0 md:col-span-2">
        <div className="font-semibold text-gray-900 text-base">{client.name}</div>
        <div className="text-sm text-gray-500 md:hidden">{client.email}</div>
      </div>

      {/* Plan Type Icons and Goals - Grouped together */}
      <div className="mb-3 md:mb-0 md:col-span-5">
        <div className="flex items-center gap-3">
          <div className="text-xl flex gap-1">
            {getPlanTypeIcons(client.plan_types).map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="text-sm text-gray-600 truncate flex-1 cursor-help">
                {formatGoals(client.goals)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{formatGoals(client.goals)}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Progress - Aligned column */}
      <div className="mb-3 md:mb-0 md:col-span-2">
        <div className="text-sm text-gray-600">
          Progress: {client.progress_percentage || 0}%
        </div>
        <div className="text-xs text-gray-500 md:hidden">
          Last activity: {client.last_activity}
        </div>
      </div>

      {/* Actions - Aligned column */}
      <div className="flex gap-4 mt-3 md:mt-0 text-gray-600 text-xl md:col-span-3 md:justify-end">
        <button 
          title="Open Client"
          className="hover:text-orange-500 transition-colors"
          onClick={handleEyeClick}
        >
          <Eye className="h-5 w-5" />
        </button>
        <button 
          title="Message"
          className="hover:text-orange-500 transition-colors"
          onClick={handleActionClick}
        >
          <Mail className="h-5 w-5" />
        </button>
        <button 
          title="More Options"
          className="hover:text-orange-500 transition-colors"
          onClick={handleActionClick}
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
