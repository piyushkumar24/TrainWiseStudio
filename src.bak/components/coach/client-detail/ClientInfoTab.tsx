
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, User, Target } from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface ClientInfoTabProps {
  client: EnhancedClientDetail;
}

export const ClientInfoTab = ({ client }: ClientInfoTabProps) => {
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-orange-500" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900">{client.name || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <p className="text-gray-900">{client.email}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Plan Type</label>
              <div>
                <Badge className={`${
                  client.plan_type === 'premium' ? 'bg-[#FF6B2C] text-white' :
                  client.plan_type === 'standard' ? 'bg-blue-500 text-white' :
                  client.plan_type === 'otp' ? 'bg-green-500 text-white' :
                  'bg-gray-500 text-white'
                }`}>
                  {client.plan_type?.toUpperCase() || 'TRIAL'}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Member Since</label>
              <p className="text-gray-900">
                {new Date(client.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Goals & Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              Goals and preferences will be displayed here once the client completes their detailed profile.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Status */}
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Profile Completion
            </span>
            <Badge variant={client.onboarding_completed ? "default" : "secondary"}>
              {client.onboarding_completed ? 'Completed' : 'In Progress'}
            </Badge>
          </div>
          {!client.onboarding_completed && (
            <p className="text-sm text-gray-600 mt-2">
              Client needs to complete their onboarding to access full features.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
