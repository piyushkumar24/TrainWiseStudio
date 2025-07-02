
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Clock } from 'lucide-react';
import { useClientRequests } from '@/hooks/useClientRequests';

interface ClientSelectorProps {
  selectedClient?: string;
  onClientSelect: (clientId: string) => void;
}

export const ClientSelector = ({ selectedClient, onClientSelect }: ClientSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { requests, isLoading } = useClientRequests();

  const filteredRequests = requests.filter(request =>
    request.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.client_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (request.goals || []).some(goal => goal.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getPlanBadgeColor = (planType: string) => {
    switch (planType) {
      case 'premium': return 'bg-[#FF6B2C] text-white';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'otp': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatGoals = (goals: string[]) => {
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
    
    return goals.map(goal => goalLabels[goal] || goal);
  };

  if (isLoading) {
    return (
      <div className="p-4 max-w-2xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📋 Select Client Request
        </h2>
        <p className="text-gray-600">
          Choose a client who has requested a tailored program
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search client requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredRequests.map((request) => (
            <button
              key={request.id}
              onClick={() => onClientSelect(request.user_id)}
              className={`w-full p-4 rounded-lg border text-left transition-all duration-200 hover:bg-gray-50 ${
                selectedClient === request.user_id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{request.client_name}</h3>
                    <Badge className={getPlanBadgeColor(request.plan_type)}>
                      {request.plan_type.charAt(0).toUpperCase() + request.plan_type.slice(1)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{request.client_email}</p>
                  
                  {(request.goals || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {formatGoals(request.goals || []).slice(0, 3).map((goal, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          {goal}
                        </span>
                      ))}
                      {(request.goals || []).length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{(request.goals || []).length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    Requested {new Date(request.created_at).toLocaleDateString()}
                  </div>
                </div>
                
                {selectedClient === request.user_id && (
                  <div className="text-orange-500 ml-3">
                    ✓
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 && !isLoading && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">📭</div>
            <h3 className="font-medium mb-1">No client requests found</h3>
            <p className="text-sm">
              {searchTerm ? 'Try adjusting your search terms.' : 'Client requests will appear here when users complete onboarding.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
