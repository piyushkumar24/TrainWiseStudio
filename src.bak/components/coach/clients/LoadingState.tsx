
import React from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';

export const LoadingState = () => {
  return (
    <DashboardLayout userRole="coach">
      <div className="px-4 sm:px-6 md:px-8 py-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    </DashboardLayout>
  );
};
