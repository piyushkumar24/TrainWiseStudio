
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar 
} from '@/components/ui/sidebar';
import { Brand } from '@/components/shared/Brand';
import { getNavigationItems } from '@/config/navigation';

interface AppSidebarProps {
  userRole: 'customer' | 'coach';
  onLogout: () => void;
}

export const AppSidebar = ({ userRole, onLogout }: AppSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, toggleSidebar, isMobile, openMobile } = useSidebar();

  const navItems = getNavigationItems(userRole);
  const isCollapsed = state === 'collapsed';

  const handleNavigation = (path: string) => {
    navigate(path);
    // Close mobile sidebar after navigation
    if (isMobile && openMobile) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isMobile && openMobile && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <Sidebar className="bg-white border-r border-gray-200 shadow-sm">
        <SidebarHeader className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <Brand size={isCollapsed ? 'sm' : 'md'} showText={!isCollapsed || isMobile} />
          
          {/* Mobile close button */}
          {isMobile && openMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          )}
        </SidebarHeader>

        <SidebarContent className="p-4 bg-white">
          <SidebarMenu className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                             (item.path === '/dashboard/programs' && location.pathname.startsWith('/dashboard/programs'));
              
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    onClick={() => handleNavigation(item.path)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 justify-start bg-white group relative overflow-hidden",
                      isActive
                        ? "bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 font-semibold shadow-sm border border-orange-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm",
                      !isMobile && isCollapsed && "justify-center px-3"
                    )}
                    title={(!isMobile && isCollapsed) ? item.label : undefined}
                  >
                    <Icon className={cn(
                      "h-5 w-5 flex-shrink-0 transition-colors",
                      isActive ? "text-orange-600" : "text-current"
                    )} />
                    
                    {(isMobile || !isCollapsed) && (
                      <span className="truncate text-current font-medium">
                        {item.label}
                      </span>
                    )}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute right-2 w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
};
