
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Star } from 'lucide-react';
import { Client } from '@/types/client';

interface ClientSnapshotProps {
  client: Client;
}

export const ClientSnapshot = ({ client }: ClientSnapshotProps) => {
  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'standard': return 'bg-blue-100 text-blue-800';
      case 'basic': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const hasExpiringProgram = client.status === 'program-expired';
  const needsFollowUp = client.status === 'needs-follow-up';
  const isActiveSubscription = ['standard', 'premium'].includes(client.program_type.toLowerCase());

  return (
    <Card className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col space-y-4">
        {/* Header with name and badges */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{client.name}</h2>
            <p className="text-gray-600 text-sm">{client.email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className={getPlanColor(client.program_type)}>
              {client.program_type}
            </Badge>
            {needsFollowUp && (
              <Badge className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
                <Star className="h-3 w-3" />
                Follow-up
              </Badge>
            )}
          </div>
        </div>

        {/* Last active */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Last active:</span> {client.last_activity}
        </div>

        {/* Alerts */}
        {hasExpiringProgram && isActiveSubscription && (
          <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-orange-800">Program Expiring Soon</p>
              <p className="text-xs text-orange-700">
                This client's program is about to expire and no new program is scheduled.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
