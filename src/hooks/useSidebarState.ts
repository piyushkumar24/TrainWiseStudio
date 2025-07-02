
// This file is no longer needed as we're using Shadcn's built-in sidebar state management
// The DashboardLayoutWrapper now directly uses SidebarProvider with defaultOpen
export const useSidebarState = () => {
  console.warn('useSidebarState is deprecated. Use Shadcn SidebarProvider directly.');
  return {
    defaultOpen: true,
    onOpenChange: () => {}
  };
};
