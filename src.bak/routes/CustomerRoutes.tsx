
import React from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Shop from '@/pages/Shop';
import Checkout from '@/pages/Checkout';
import CustomerPrograms from '@/pages/customer/CustomerPrograms';
import CustomerLibrary from '@/pages/customer/CustomerLibrary';
import CustomerProgression from '@/pages/customer/CustomerProgression';
import CustomerProgramDetail from '@/pages/customer/CustomerProgramDetail';
import CustomerProgramLog from '@/pages/customer/CustomerProgramLog';
import CustomerBlog from '@/pages/customer/CustomerBlog';
import CustomerPlan from '@/pages/customer/CustomerPlan';
import CustomerCheckIn from '@/pages/customer/CustomerCheckIn';

export const CustomerRoutes = () => {
  return (
    <>
      <Route path="/dashboard" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <Dashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute requiredRole="customer">
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/shop" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <Shop />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/programs" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerPrograms />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/programs/:programId" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerProgramDetail />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/myPrograms/:programId/log" element={
        <ProtectedRoute requiredRole="customer">
          <CustomerProgramLog />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/library" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerLibrary />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/progress" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerProgression />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/blog" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerBlog />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/plan" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerPlan />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/check-in" element={
        <ProtectedRoute requiredRole="customer">
          <DashboardLayout userRole="customer">
            <CustomerCheckIn />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/profile" element={
        <ProtectedRoute requiredRole="customer">
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/settings" element={
        <ProtectedRoute requiredRole="customer">
          <Settings />
        </ProtectedRoute>
      } />
    </>
  );
};
