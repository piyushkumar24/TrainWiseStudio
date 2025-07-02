
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Activity, Calendar, BarChart3 } from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface ProgressTabProps {
  client: EnhancedClientDetail;
}

export const ProgressTab = ({ client }: ProgressTabProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getMetricIcon = (metricType: string) => {
    switch (metricType.toLowerCase()) {
      case 'weight':
        return '⚖️';
      case 'body_fat':
        return '📊';
      case 'measurements':
        return '📏';
      default:
        return '📈';
    }
  };

  const getCheckInIcon = (checkInType: string) => {
    switch (checkInType.toLowerCase()) {
      case 'fitness':
        return '💪';
      case 'nutrition':
        return '🥗';
      case 'mental':
        return '🧠';
      default:
        return '✅';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Metrics</p>
                <p className="text-2xl font-bold text-gray-900">
                  {client.progressionData.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-ins</p>
                <p className="text-2xl font-bold text-gray-900">
                  {client.recentCheckIns.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Activity</p>
                <p className="text-sm font-medium text-gray-900">
                  {client.recentCheckIns.length > 0 
                    ? formatDate(client.recentCheckIns[0].created_at)
                    : 'No activity'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Progression Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Recent Progression Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.progressionData.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No progression data yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Data will appear here as the client tracks their metrics
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.progressionData.slice(0, 5).map((metric) => (
                <div key={metric.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getMetricIcon(metric.metric_type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {metric.metric_type.replace('_', ' ')}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(metric.recorded_at)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {metric.value} {metric.unit}
                    </p>
                    {metric.notes && (
                      <p className="text-xs text-gray-500 max-w-32 truncate">
                        {metric.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Recent Check-ins
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.recentCheckIns.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No check-ins yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Check-ins will appear here as the client logs their activities
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.recentCheckIns.slice(0, 5).map((checkIn) => (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getCheckInIcon(checkIn.check_in_type)}</span>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {checkIn.check_in_type} Check-in
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatDate(checkIn.created_at)}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    View Details
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
