
import { 
  Home, 
  ClipboardList, 
  BookOpen, 
  TrendingUp, 
  Newspaper, 
  CreditCard,
  Users,
  Mail,
  Puzzle,
  FolderOpen,
  ShoppingBag,
  CheckSquare
} from 'lucide-react';

export interface NavigationItem {
  icon: any;
  label: string;
  path: string;
  description?: string;
}

export interface NavigationConfig {
  customer: NavigationItem[];
  coach: NavigationItem[];
}

export const navigationConfig: NavigationConfig = {
  customer: [
    { icon: Home, label: 'Home', path: '/dashboard', description: 'Dashboard overview' },
    { icon: ClipboardList, label: 'My Programs', path: '/dashboard/programs', description: 'Your training programs' },
    { icon: BookOpen, label: 'Library', path: '/dashboard/library', description: 'Exercise library' },
    { icon: TrendingUp, label: 'Progress', path: '/dashboard/progress', description: 'Track your progress' },
    { icon: CheckSquare, label: 'Check-In', path: '/dashboard/check-in', description: 'Daily check-ins' },
    { icon: Newspaper, label: 'Blog', path: '/dashboard/blog', description: 'Latest articles' },
    { icon: CreditCard, label: 'Plan & Payments', path: '/dashboard/plan', description: 'Manage subscription' },
    { icon: ShoppingBag, label: 'Shop', path: '/dashboard/shop', description: 'Browse products' },
  ],
  coach: [
    { icon: Home, label: 'Dashboard', path: '/coach', description: 'Coach overview' },
    { icon: Users, label: 'Clients', path: '/coach/clients', description: 'Manage your clients' },
    { icon: Mail, label: 'Requests', path: '/coach/requests', description: 'Client requests' },
    { icon: Puzzle, label: 'Program Builder', path: '/coach/programBuilder', description: 'Create programs' },
    { icon: ShoppingBag, label: 'Shop', path: '/coach/shop', description: 'Browse products' },
    { icon: Newspaper, label: 'Blog', path: '/coach/blog', description: 'Manage blog posts' },
    { icon: BookOpen, label: 'Knowledge Hub', path: '/coach/knowledgeHub', description: 'Exercise library' },
    { icon: FolderOpen, label: 'Files', path: '/coach/files', description: 'Manage files' },
  ]
};

export const getNavigationItems = (userRole: 'customer' | 'coach'): NavigationItem[] => {
  return navigationConfig[userRole] || [];
};

export const getDashboardTitle = (userRole: 'customer' | 'coach'): string => {
  return userRole === 'customer' ? 'Dashboard' : 'Coach Dashboard';
};
