
import React, { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { User as UserIcon, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfileHeaderProps {
  user: User;
  userRole: 'customer' | 'coach';
  onLogout: () => void;
  isMobile: boolean;
}

export const ProfileHeader = ({ user, userRole, onLogout, isMobile }: ProfileHeaderProps) => {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  const getUserName = () => {
    return user.user_metadata?.full_name || user.email || 'User';
  };

  const getProfilePath = () => {
    return userRole === 'customer' ? '/dashboard/profile' : '/coach/profile';
  };

  const getSettingsPath = () => {
    return userRole === 'customer' ? '/dashboard/settings' : '/coach/settings';
  };

  const handleProfileClick = () => {
    navigate(getProfilePath());
    if (isMobile) setIsDrawerOpen(false);
  };

  const handleSettingsClick = () => {
    navigate(getSettingsPath());
    if (isMobile) setIsDrawerOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    if (isMobile) setIsDrawerOpen(false);
  };

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="sm" className="p-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-orange-100 text-orange-600 text-sm">
                {getInitials(user.email!)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="animate-in slide-in-from-right duration-300">
          <DrawerHeader className="text-left">
            <DrawerTitle className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-orange-100 text-orange-600">
                  {getInitials(user.email!)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{getUserName()}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleProfileClick}
            >
              <UserIcon className="h-4 w-4 mr-3" />
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleSettingsClick}
            >
              <Settings className="h-4 w-4 mr-3" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogoutClick}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logout
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-1">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-orange-100 text-orange-600">
              {getInitials(user.email!)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="font-medium">{getUserName()}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfileClick}>
          <UserIcon className="h-4 w-4 mr-2" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSettingsClick}>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick} className="text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
