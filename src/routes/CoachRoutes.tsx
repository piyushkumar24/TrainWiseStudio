
import React from 'react';
import { Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import CoachDashboard from '@/pages/coach/CoachDashboard';
import CoachClients from '@/pages/coach/CoachClients';
import ClientDetail from '@/pages/coach/ClientDetail';
import CoachRequests from '@/pages/coach/CoachRequests';
import CoachFiles from '@/pages/coach/CoachFiles';
import CoachBlog from '@/pages/coach/CoachBlog';
import ProgramBuilder from '@/pages/coach/ProgramBuilder';
import CreateProgram from '@/pages/coach/CreateProgram';
import CreateFitnessProgram from '@/pages/coach/CreateFitnessProgram';
import KnowledgeHub from '@/pages/coach/KnowledgeHub';
import CreateFitnessExercise from '@/pages/coach/CreateFitnessExercise';
import CreateNutritionRecipe from '@/pages/coach/CreateNutritionRecipe';
import CreateMentalExercise from '@/pages/coach/CreateMentalExercise';
import FitnessExerciseViewer from '@/pages/coach/FitnessExerciseViewer';
import RecipeViewer from '@/pages/coach/RecipeViewer';
import MentalExerciseViewer from '@/pages/coach/MentalExerciseViewer';
import UniversalContentViewer from '@/components/coach/knowledge-hub/UniversalContentViewer';
import ProgramViewer from '@/pages/coach/ProgramViewer';
import EditProgram from '@/pages/coach/EditProgram';
import Shop from '@/pages/Shop';

export const CoachRoutes = () => {
  return (
    <>
      
      <Route path="/coach" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/clients" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachClients />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/clients/:clientId" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <ClientDetail />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/requests" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachRequests />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/files" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachFiles />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/blog" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachBlog />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/programBuilder" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <ProgramBuilder />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/programBuilder/view/:programId" element={
        <ProtectedRoute requiredRole="coach">
          <ProgramViewer />
        </ProtectedRoute>
      } />
      <Route path="/coach/programBuilder/edit/:programId" element={
        <ProtectedRoute requiredRole="coach">
          <EditProgram />
        </ProtectedRoute>
      } />
      <Route path="/coach/create-program" element={
        <ProtectedRoute requiredRole="coach">
          <CreateProgram />
        </ProtectedRoute>
      } />
      <Route path="/coach/programBuilder/create" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CreateFitnessProgram />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <KnowledgeHub />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      
      <Route path="/coach/knowledgeHub/fitness/create" element={
        <ProtectedRoute requiredRole="coach">
          <CreateFitnessExercise />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/fitness/edit/:exerciseId" element={
        <ProtectedRoute requiredRole="coach">
          <CreateFitnessExercise />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/recipes/create" element={
        <ProtectedRoute requiredRole="coach">
          <CreateNutritionRecipe />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/nutrition/edit/:recipeId" element={
        <ProtectedRoute requiredRole="coach">
          <CreateNutritionRecipe />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/mental/create" element={
        <ProtectedRoute requiredRole="coach">
          <CreateMentalExercise />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/mental/edit/:mentalId" element={
        <ProtectedRoute requiredRole="coach">
          <CreateMentalExercise />
        </ProtectedRoute>
      } />
      
      <Route path="/coach/knowledgeHub/view/:id" element={
        <ProtectedRoute requiredRole="coach">
          <UniversalContentViewer />
        </ProtectedRoute>
      } />
      
      <Route path="/coach/knowledgeHub/fitness/:exerciseId" element={
        <ProtectedRoute requiredRole="coach">
          <FitnessExerciseViewer />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/nutrition/:recipeId" element={
        <ProtectedRoute requiredRole="coach">
          <RecipeViewer />
        </ProtectedRoute>
      } />
      <Route path="/coach/knowledgeHub/mental/:mentalId" element={
        <ProtectedRoute requiredRole="coach">
          <MentalExerciseViewer />
        </ProtectedRoute>
      } />
      
      <Route path="/coach/knowledge" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <CoachDashboard />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/profile" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <Profile />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      <Route path="/coach/settings" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <Settings />
          </DashboardLayout>
        </ProtectedRoute>
      } />
      
      <Route path="/coach/shop" element={
        <ProtectedRoute requiredRole="coach">
          <DashboardLayout userRole="coach">
            <Shop />
          </DashboardLayout>
        </ProtectedRoute>
      } />
    </>
  );
};
