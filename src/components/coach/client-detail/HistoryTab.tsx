
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  MessageSquare, 
  Activity, 
  Calendar,
  Eye
} from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface HistoryTabProps {
  client: EnhancedClientDetail;
}

export const HistoryTab = ({ client }: HistoryTabProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Past Programs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />
            Program History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.pastPrograms.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No program history yet</p>
              <p className="text-sm text-gray-500 mt-1">
                Past programs will appear here once completed
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {client.pastPrograms.map((program) => (
                <div key={program.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{program.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(program.assigned_at)} - {program.expires_at ? formatDate(program.expires_at) : 'Ongoing'}
                      </p>
                    </div>
                    <Badge className={getStatusBadgeColor(program.status)}>
                      {program.status}
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Feedback History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            Feedback History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.recentFeedback.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No feedback history</p>
              <p className="text-sm text-gray-500 mt-1">
                Feedback sent to this client will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {client.recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {feedback.feedback_type}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {formatDate(feedback.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-900">{feedback.message}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Check-in History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-orange-500" />
            Check-in History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.recentCheckIns.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No check-in history</p>
              <p className="text-sm text-gray-500 mt-1">
                Client check-ins will appear here as they log activities
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.recentCheckIns.map((checkIn) => (
                <div key={checkIn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {checkIn.check_in_type} Check-in
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(checkIn.created_at)}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Follow-up History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Follow-up History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {client.followUps.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No follow-ups scheduled</p>
              <p className="text-sm text-gray-500 mt-1">
                Scheduled follow-ups will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.followUps.map((followUp) => (
                <div key={followUp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{followUp.title}</p>
                    <p className="text-sm text-gray-600">
                      Due: {formatDate(followUp.due_date)}
                    </p>
                    {followUp.notes && (
                      <p className="text-xs text-gray-500 mt-1">{followUp.notes}</p>
                    )}
                  </div>
                  <Badge className={getStatusBadgeColor(followUp.status)}>
                    {followUp.status}
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
