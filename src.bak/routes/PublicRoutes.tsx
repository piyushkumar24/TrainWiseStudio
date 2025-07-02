
import React from 'react';
import { Route } from 'react-router-dom';
import Index from '@/pages/Index';
import GetStarted from '@/pages/GetStarted';
import Login from '@/pages/Login';
import Onboarding from '@/pages/Onboarding';
import ResetPassword from '@/pages/ResetPassword';
import CreateTestUsers from '@/pages/CreateTestUsers';
import NotFound from '@/pages/NotFound';

export const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/create-test-users" element={<CreateTestUsers />} />
      <Route path="*" element={<NotFound />} />
    </>
  );
};
