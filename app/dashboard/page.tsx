import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AlertSection } from "@/src/components/customer/dashboard/AlertSection";
import { QuickActions } from "@/src/components/customer/dashboard/QuickActions";
import { MotivationCard } from "@/src/components/customer/dashboard/MotivationCard";

export const metadata: Metadata = {
  title: "Dashboard | TrainWise Studio",
  description: "Your fitness journey starts here",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/login");
  }

  // Check if onboarding is complete
  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (!profile?.onboardingComplete) {
    redirect("/onboarding");
  }

  // Get active subscription
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    orderBy: {
      endDate: "desc",
    },
  });

  // Get assigned programs
  const assignedPrograms = await prisma.programAssignment.findMany({
    where: {
      userId: user.id,
      status: "ACTIVE",
    },
    include: {
      program: true,
    },
    take: 3,
  });

  // Get latest motivational card
  const motivationalCard = await prisma.file.findFirst({
    where: {
      type: "MOTIVATIONAL",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
      
      <AlertSection 
        subscription={subscription} 
        assignedPrograms={assignedPrograms} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions assignedPrograms={assignedPrograms} />
        
        {motivationalCard && (
          <MotivationCard 
            title="Daily Motivation" 
            imageUrl={motivationalCard.url} 
          />
        )}
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">
            {assignedPrograms.length > 0 
              ? "Track your progress in your assigned programs" 
              : "No active programs yet. Your coach will assign one soon!"}
          </p>
        </div>
      </div>
    </div>
  );
} 