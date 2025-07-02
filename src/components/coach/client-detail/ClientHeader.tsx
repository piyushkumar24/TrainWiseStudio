
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, Mail, User } from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface ClientHeaderProps {
  client: EnhancedClientDetail;
}

export const ClientHeader = ({ client }: ClientHeaderProps) => {
  const getPlanBadgeColor = (planType: string) => {
    switch (planType) {
      case 'premium': return 'bg-[#FF6B2C] text-white';
      case 'standard': return 'bg-blue-500 text-white';
      case 'otp': return 'bg-green-500 text-white';
      case 'trial': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800';
      case 'new-comer': return 'bg-blue-100 text-blue-800';
      case 'off-track': return 'bg-yellow-100 text-yellow-800';
      case 'needs-follow-up': return 'bg-orange-100 text-orange-800';
      case 'waiting-feedback': return 'bg-purple-100 text-purple-800';
      case 'missing-program': return 'bg-red-100 text-red-800';
      case 'program-expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Avatar and Name */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={client.avatar_url} alt={client.name} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-lg font-semibold">
                {client.first_name?.[0] || client.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
            </div>
          </div>

          {/* Badges and Info */}
          <div className="flex flex-col sm:ml-auto gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge className={getPlanBadgeColor(client.plan_type)}>
                {getPlanLabel(client.plan_type)} Plan
              </Badge>
              <Badge className={getStatusBadgeColor(client.status)}>
                {formatStatus(client.status)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Joined {formatDate(client.created_at)}</span>
              </div>
              {!client.onboarding_completed && (
                <Badge variant="outline" className="text-xs">
                  Onboarding Incomplete
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
