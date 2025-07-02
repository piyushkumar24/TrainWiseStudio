
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useEnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';
import { AssignProgramModal } from '@/components/coach/program-builder/AssignProgramModal';
import { ClientHeader } from '@/components/coach/client-detail/ClientHeader';
import { ClientInfoTab } from '@/components/coach/client-detail/ClientInfoTab';
import { CurrentProgramTab } from '@/components/coach/client-detail/CurrentProgramTab';
import { ProgressTab } from '@/components/coach/client-detail/ProgressTab';
import { CoachActionsTab } from '@/components/coach/client-detail/CoachActionsTab';
import { HistoryTab } from '@/components/coach/client-detail/HistoryTab';

const ClientDetail = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { client, loading, error, refetch, sendFeedback, scheduleFollowUp } = useEnhancedClientDetail(clientId);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAssignProgram = async (programId: string, clientId: string, personalMessage?: string) => {
    console.log('Assigning program:', { programId, clientId, personalMessage });
    setShowAssignModal(false);
    await refetch();
  };

  if (loading) {
    return (
      <DashboardLayout userRole="coach">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Card className="p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500 mr-3" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Loading client details...</h2>
                <p className="text-sm text-gray-600 mt-1">Please wait while we fetch the client information.</p>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !client) {
    return (
      <DashboardLayout userRole="coach">
        <div className="px-4 sm:px-6 md:px-8 py-6">
          <Button 
            onClick={handleBack}
            variant="ghost" 
            className="mb-4 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <Card className="p-8">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {error ? 'Error Loading Client' : 'Client Not Found'}
              </h2>
              <p className="text-gray-600 mb-4 max-w-md mx-auto">
                {error || "The client you're looking for doesn't exist or you don't have access to view them."}
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={handleBack} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button onClick={() => refetch()} variant="default">
                  Try Again
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="coach">
      <div className="px-4 sm:px-6 md:px-8 py-6">
        {/* Back Button */}
        <Button 
          onClick={handleBack}
          variant="ghost" 
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {/* Client Header */}
        <ClientHeader client={client} />

        {/* Main Content Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6">
            <TabsTrigger value="info" className="text-xs sm:text-sm">
              Client Info
            </TabsTrigger>
            <TabsTrigger value="program" className="text-xs sm:text-sm">
              Program
            </TabsTrigger>
            <TabsTrigger value="progress" className="text-xs sm:text-sm">
              Progress
            </TabsTrigger>
            <TabsTrigger value="actions" className="text-xs sm:text-sm">
              Actions
            </TabsTrigger>
            <TabsTrigger value="history" className="text-xs sm:text-sm">
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <ClientInfoTab client={client} />
          </TabsContent>

          <TabsContent value="program">
            <CurrentProgramTab 
              client={client} 
              onAssignProgram={() => setShowAssignModal(true)}
            />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTab client={client} />
          </TabsContent>

          <TabsContent value="actions">
            <CoachActionsTab 
              client={client}
              onSendFeedback={sendFeedback}
              onScheduleFollowUp={scheduleFollowUp}
              onAssignProgram={() => setShowAssignModal(true)}
            />
          </TabsContent>

          <TabsContent value="history">
            <HistoryTab client={client} />
          </TabsContent>
        </Tabs>

        {/* Assign Program Modal */}
        <AssignProgramModal
          open={showAssignModal}
          onOpenChange={setShowAssignModal}
          program={null}
          onAssign={handleAssignProgram}
        />
      </div>
    </DashboardLayout>
  );
};

export default ClientDetail;
