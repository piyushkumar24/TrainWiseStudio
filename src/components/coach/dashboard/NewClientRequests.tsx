
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, Loader2 } from 'lucide-react';
import { useClientRequests } from '@/hooks/useClientRequests';

const getPlanBadgeColor = (planType: string) => {
  switch (planType) {
    case 'premium': return 'bg-[#FF6B2C] text-white';
    case 'standard': return 'bg-blue-500 text-white';
    case 'otp': return 'bg-green-500 text-white';
    case 'trial': return 'bg-gray-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getPlanLabel = (planType: string) => {
  switch (planType) {
    case 'premium': return 'Premium';
    case 'standard': return 'Standard';
    case 'otp': return 'OTP';
    case 'trial': return 'Trial';
    default: return planType;
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

export const NewClientRequests = () => {
  const navigate = useNavigate();
  const { requests, isLoading } = useClientRequests();

  const handleCreateProgram = (clientId: string) => {
    navigate(`/coach/programBuilder/create?clientId=${clientId}`);
  };

  const handleViewAllRequests = () => {
    navigate('/coach/requests');
  };

  if (isLoading) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-xl font-semibold mb-3 text-gray-900">New Requests</h2>
        <p className="text-sm text-gray-500 mb-6">Loading client requests...</p>
        <Card className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-orange-500 mr-2" />
            <span className="text-gray-600">Loading requests...</span>
          </div>
        </Card>
      </div>
    );
  }

  const displayedRequests = requests.filter(r => r.status === 'new').slice(0, 3);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900">New Requests</h2>
        {requests.length > 3 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleViewAllRequests}
            className="text-[#FF6B2C] hover:text-[#e85b22] p-0 h-auto"
          >
            View all ({requests.length})
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-6">Clients awaiting program assignment</p>

      {displayedRequests.length === 0 ? (
        <Card className="p-6 text-center">
          <div className="text-4xl mb-2">📭</div>
          <p className="text-gray-600 text-sm">No pending requests</p>
        </Card>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {displayedRequests.map((request, index) => (
            <Card 
              key={request.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-right-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center font-semibold text-sm">
                      {request.client_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{request.client_name}</h4>
                        <Badge className={getPlanBadgeColor(request.plan_type)}>
                          {getPlanLabel(request.plan_type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{request.client_email}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleCreateProgram(request.user_id)}
                    className="bg-[#FF6B2C] hover:bg-[#e85b22] text-white rounded-lg px-4 py-2 text-sm hover:scale-[1.02] transition-transform"
                  >
                    Create Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {requests.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="outline"
            onClick={handleViewAllRequests}
            className="text-sm"
          >
            View All Requests ({requests.length})
          </Button>
        </div>
      )}
    </div>
  );
};
