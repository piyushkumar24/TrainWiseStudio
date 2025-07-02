
import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';
import { ProfileHeader } from './ProfileHeader';
import { getDashboardTitle } from '@/config/navigation';
import { User } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: User;
  userRole: 'customer' | 'coach';
  onLogout: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const DashboardHeader = ({ 
  user, 
  userRole, 
  onLogout, 
  title,
  children 
}: DashboardHeaderProps) => {
  const { toggleSidebar, openMobile, isMobile } = useSidebar();
  
  const displayTitle = title || getDashboardTitle(userRole);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button - visible on all screen sizes */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={openMobile ? "Close menu" : "Open menu"}
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
        
        <div className="flex items-center gap-4">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
            {displayTitle}
          </h1>
          {children}
        </div>
      </div>

      <ProfileHeader 
        user={user} 
        userRole={userRole}
        onLogout={onLogout} 
        isMobile={isMobile} 
      />
    </header>
  );
};
