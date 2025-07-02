
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { AutoSendFilesSection } from '@/components/coach/files/AutoSendFilesSection';
import { MotivationalCardsSection } from '@/components/coach/files/MotivationalCardsSection';
import { DeliveryOverviewSection } from '@/components/coach/files/DeliveryOverviewSection';

const CoachFiles = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/coach');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="File Management"
        description="Manage auto-send files, motivational cards, and delivery logs"
        showBackButton={true}
        backButtonText="Back to Dashboard"
        onBack={handleBack}
      />

      {/* Auto-Send Files Section */}
      <AutoSendFilesSection />

      {/* Motivational Cards Section */}
      <MotivationalCardsSection />

      {/* Delivery Overview Section */}
      <DeliveryOverviewSection />
    </div>
  );
};

export default CoachFiles;
