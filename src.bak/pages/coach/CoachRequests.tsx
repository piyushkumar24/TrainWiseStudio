
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, User, Target, Eye, Edit, Check, Filter, AlertTriangle, CheckCircle } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useClientRequests } from '@/hooks/useClientRequests';

const CoachRequests = () => {
  const navigate = useNavigate();
  const { groupedRequests, isLoading, markAsSeen, assignClientRequest, declineClientRequest } = useClientRequests();

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
      case 'premium': return 'Premium Sub';
      case 'standard': return 'Standard Sub';
      case 'otp': return 'OTP';
      case 'trial': return 'Trial';
      default: return planType;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800';
      case 'seen': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertTriangle className="h-3 w-3" />;
      case 'seen': return <Eye className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      default: return null;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const requestDate = new Date(dateString);
    const diffInMs = now.getTime() - requestDate.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays}d ago`;
  };

  const handleCreateProgram = (clientId: string) => {
    navigate(`/coach/programBuilder/create?clientId=${clientId}`);
  };

  const handleViewClientDetails = (clientId: string) => {
    navigate(`/coach/clients/${clientId}`);
  };

  const handleMarkAsSeen = async (requestId: string) => {
    await markAsSeen(requestId);
  };

  const RequestCard = ({ request }: { request: any }) => (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={request.client_avatar} alt={request.client_name} />
                <AvatarFallback>{request.client_name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{request.client_name}</h3>
                <p className="text-xs text-gray-500">{request.client_email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getPlanBadgeColor(request.plan_type)}>
                {getPlanLabel(request.plan_type)}
              </Badge>
              <Badge className={getStatusBadgeColor(request.status)}>
                {getStatusIcon(request.status)}
                <span className="ml-1 capitalize">{request.status}</span>
              </Badge>
            </div>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Requested {formatTimeAgo(request.created_at)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 sm:flex-none"
              onClick={() => handleViewClientDetails(request.user_id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            
            {request.status === 'new' && (
              <Button 
                onClick={() => handleMarkAsSeen(request.id)}
                variant="outline"
                size="sm"
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                Mark as Seen
              </Button>
            )}
            
            {(request.status === 'new' || request.status === 'seen') && (
              <Button 
                onClick={() => handleCreateProgram(request.user_id)}
                className="bg-[#FF6B2C] hover:bg-[#e55b22] text-white flex-1 sm:flex-none"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Create Program
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleBack = () => {
    navigate('/coach');
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <PageHeader
          title="Client Requests"
          description="Manage incoming client program requests"
          showBackButton={true}
          backButtonText="Back to Dashboard"
          onBack={handleBack}
        />

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const totalRequests = groupedRequests.new.length + groupedRequests.seen.length + groupedRequests.completed.length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Client Requests"
        description="Manage incoming client program requests"
        showBackButton={true}
        backButtonText="Back to Dashboard"
        onBack={handleBack}
        actions={
          totalRequests > 0 ? (
            <Badge variant="secondary" className="text-sm">
              {totalRequests} request{totalRequests !== 1 ? 's' : ''}
            </Badge>
          ) : null
        }
      />

      {totalRequests === 0 ? (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="text-6xl animate-bounce">💤</div>
            <h2 className="text-xl font-semibold text-gray-900">No client requests at the moment</h2>
            <p className="text-gray-600 max-w-md mx-auto">
              New clients appear here after completing onboarding and selecting a plan.
            </p>
          </div>
        </Card>
      ) : (
        <Tabs defaultValue="new" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="new" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              New ({groupedRequests.new.length})
            </TabsTrigger>
            <TabsTrigger value="seen" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Seen ({groupedRequests.seen.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Completed ({groupedRequests.completed.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="new" className="space-y-4">
            {groupedRequests.new.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <AlertTriangle className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium text-gray-900">No new requests</h3>
                  <p className="text-gray-600">All caught up! New requests will appear here.</p>
                </div>
              </Card>
            ) : (
              groupedRequests.new.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>

          <TabsContent value="seen" className="space-y-4">
            {groupedRequests.seen.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <Eye className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium text-gray-900">No seen requests</h3>
                  <p className="text-gray-600">Requests you've marked as seen will appear here.</p>
                </div>
              </Card>
            ) : (
              groupedRequests.seen.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {groupedRequests.completed.length === 0 ? (
              <Card className="p-8 text-center">
                <div className="space-y-4">
                  <CheckCircle className="h-12 w-12 text-gray-300 mx-auto" />
                  <h3 className="text-lg font-medium text-gray-900">No completed requests</h3>
                  <p className="text-gray-600">Completed requests will appear here.</p>
                </div>
              </Card>
            ) : (
              groupedRequests.completed.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default CoachRequests;
