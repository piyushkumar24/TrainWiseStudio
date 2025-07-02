
import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';

export const LoadingSpinner = () => {
  return (
    <DashboardLayout userRole="coach">
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    </DashboardLayout>
  );
};
