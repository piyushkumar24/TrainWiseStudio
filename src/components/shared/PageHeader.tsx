
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  filters?: React.ReactNode;
  progressBar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  stickyOffset?: string;
}

export const PageHeader = ({
  title,
  description,
  showBackButton = false,
  backButtonText,
  onBack,
  actions,
  filters,
  progressBar,
  children,
  className = "",
  stickyOffset = "top-16",
}: PageHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className={`w-full bg-white border-b border-gray-200 sticky ${stickyOffset} z-20 ${className}`}>
      <div className="px-4 sm:px-6 md:px-8 py-4">
        {/* Back Button Row */}
        {showBackButton && (
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {!isMobile && (backButtonText || "Back")}
            </Button>
          </div>
        )}

        {/* Title and Actions Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{title}</h1>
            {description && (
              <p className="text-gray-600 text-sm mt-1">{description}</p>
            )}
          </div>
          
          {actions && (
            <div className="flex-shrink-0">
              {actions}
            </div>
          )}
        </div>

        {/* Filters Row */}
        {filters && (
          <div className="mb-4">
            {filters}
          </div>
        )}

        {/* Progress Bar Row */}
        {progressBar && (
          <div className="mb-4">
            {progressBar}
          </div>
        )}

        {/* Custom Children */}
        {children}
      </div>
    </div>
  );
};
