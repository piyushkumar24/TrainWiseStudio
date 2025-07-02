
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, FileText, Plus, AlertTriangle } from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface CurrentProgramTabProps {
  client: EnhancedClientDetail;
  onAssignProgram: () => void;
}

export const CurrentProgramTab = ({ client, onAssignProgram }: CurrentProgramTabProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilExpiry = (expiryDate?: string) => {
    if (!expiryDate) return null;
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (!client.currentProgram) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">No Active Program</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                This client doesn't have an active program assigned yet. 
                Create and assign a program to get them started.
              </p>
              <Button 
                onClick={onAssignProgram}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Assign Program
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daysUntilExpiry = getDaysUntilExpiry(client.currentProgram.expires_at);
  const programExpired = isExpired(client.currentProgram.expires_at);

  return (
    <div className="space-y-6">
      {/* Current Program Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-orange-500" />
              Current Program
            </span>
            <Badge variant={programExpired ? "destructive" : "default"}>
              {programExpired ? 'Expired' : 'Active'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {client.currentProgram.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Assigned:</span>
              <span className="font-medium">
                {formatDate(client.currentProgram.assigned_at)}
              </span>
            </div>
            
            {client.currentProgram.expires_at && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Expires:</span>
                <span className={`font-medium ${programExpired ? 'text-red-600' : ''}`}>
                  {formatDate(client.currentProgram.expires_at)}
                </span>
              </div>
            )}
          </div>

          {/* Expiry Warning */}
          {daysUntilExpiry !== null && (
            <div className={`p-4 rounded-lg flex items-start gap-3 ${
              programExpired 
                ? 'bg-red-50 border border-red-200' 
                : daysUntilExpiry <= 7 
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-green-50 border border-green-200'
            }`}>
              <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                programExpired 
                  ? 'text-red-600' 
                  : daysUntilExpiry <= 7 
                    ? 'text-yellow-600'
                    : 'text-green-600'
              }`} />
              <div>
                <p className={`font-medium ${
                  programExpired 
                    ? 'text-red-800' 
                    : daysUntilExpiry <= 7 
                      ? 'text-yellow-800'
                      : 'text-green-800'
                }`}>
                  {programExpired 
                    ? 'Program Expired' 
                    : daysUntilExpiry <= 7 
                      ? `Program expires in ${daysUntilExpiry} days`
                      : `${daysUntilExpiry} days remaining`
                  }
                </p>
                <p className={`text-sm mt-1 ${
                  programExpired 
                    ? 'text-red-600' 
                    : daysUntilExpiry <= 7 
                      ? 'text-yellow-600'
                      : 'text-green-600'
                }`}>
                  {programExpired 
                    ? 'This client needs a new program assignment.'
                    : daysUntilExpiry <= 7 
                      ? 'Consider preparing the next program.'
                      : 'Program is running smoothly.'
                  }
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" size="sm">
              View Program Details
            </Button>
            <Button 
              onClick={onAssignProgram}
              size="sm"
              className="bg-orange-500 hover:bg-orange-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Assign New Program
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Program History Preview */}
      {client.pastPrograms.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Program History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {client.pastPrograms.slice(0, 3).map((program) => (
                <div key={program.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{program.title}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(program.assigned_at)} - {program.expires_at ? formatDate(program.expires_at) : 'Ongoing'}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {program.status}
                  </Badge>
                </div>
              ))}
              {client.pastPrograms.length > 3 && (
                <p className="text-sm text-gray-600 text-center pt-2">
                  +{client.pastPrograms.length - 3} more programs
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
