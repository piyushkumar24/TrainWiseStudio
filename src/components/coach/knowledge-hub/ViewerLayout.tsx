
import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface ViewerLayoutProps {
  children: React.ReactNode;
  title: string;
  category: string;
  isLoading?: boolean;
}

export const ViewerLayout = ({ children, title, category, isLoading }: ViewerLayoutProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [programTitle, setProgramTitle] = useState<string>('');
  
  const returnTo = searchParams.get('returnTo');
  const programId = searchParams.get('programId');
  const week = searchParams.get('week');
  const day = searchParams.get('day');

  // Fetch program title if coming from program view
  useEffect(() => {
    if (programId) {
      // For simplicity, we'll show a generic title. In a real app, you'd fetch the actual program title
      setProgramTitle('Program');
    }
  }, [programId]);

  const handleBack = () => {
    if (returnTo) {
      navigate(returnTo);
      // Scroll to anchor after navigation
      setTimeout(() => {
        if (week && day) {
          const element = document.getElementById(`week-${week}-day-${day}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 100);
    } else {
      navigate('/coach/knowledgeHub');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout userRole="coach">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="coach">
      <div className="min-h-screen bg-gray-50">
        {/* Sticky Header - Positioned below dashboard header */}
        <div className="sticky top-[73px] z-30 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">
                  {programId && week && day ? `Back to Week ${week} / ${day}` : 'Back to Knowledge Hub'}
                </span>
                <span className="sm:hidden">Back</span>
              </Button>
              
              <div className="flex-1 min-w-0">
                <Breadcrumb>
                  <BreadcrumbList>
                    {programId && week && day ? (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-orange-600">
                            Week {week} / {day} in {programTitle}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="capitalize truncate">{category}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden sm:inline" />
                        <BreadcrumbItem className="hidden sm:block">
                          <BreadcrumbPage className="max-w-xs truncate">{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink 
                            onClick={() => navigate('/coach/knowledgeHub')}
                            className="cursor-pointer"
                          >
                            <span className="hidden sm:inline">Knowledge Hub</span>
                            <span className="sm:hidden">Hub</span>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="capitalize truncate">{category}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden sm:inline" />
                        <BreadcrumbItem className="hidden sm:block">
                          <BreadcrumbPage className="max-w-xs truncate">{title}</BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>

        {/* Content - Enhanced mobile responsiveness with proper top padding */}
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-8 pt-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-fade-in break-words overflow-wrap-anywhere">
              {children}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
