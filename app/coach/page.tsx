import { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireCoach } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ClientSummaryCards } from "@/src/components/coach/dashboard/ClientSummaryCards";
import { NewClientRequests } from "@/src/components/coach/dashboard/NewClientRequests";
import { DraftsInProgress } from "@/src/components/coach/dashboard/DraftsInProgress";

export const metadata: Metadata = {
  title: "Coach Dashboard | TrainWise Studio",
  description: "Manage your clients and programs",
};

export default async function CoachDashboardPage() {
  const user = await requireCoach();

  // Get client statistics
  const totalClients = await prisma.user.count({
    where: {
      role: "CUSTOMER",
    },
  });

  const activeSubscriptions = await prisma.subscription.count({
    where: {
      status: "ACTIVE",
    },
  });

  const expiringSubscriptions = await prisma.subscription.count({
    where: {
      status: "ACTIVE",
      endDate: {
        lte: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      },
    },
  });

  // Get new client requests
  const newRequests = await prisma.request.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  // Get draft programs
  const draftPrograms = await prisma.program.findMany({
    where: {
      status: "DRAFT",
      createdById: user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Coach Dashboard</h1>
      
      <ClientSummaryCards 
        totalClients={totalClients}
        activeSubscriptions={activeSubscriptions}
        expiringSubscriptions={expiringSubscriptions}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewClientRequests requests={newRequests} />
        
        <DraftsInProgress drafts={draftPrograms} />
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold">Create New Program</h3>
            <p className="text-sm text-gray-500">Start building a new fitness, nutrition, or mental program</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold">Write Blog Post</h3>
            <p className="text-sm text-gray-500">Share your knowledge with your clients</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <h3 className="font-semibold">Upload Motivational Card</h3>
            <p className="text-sm text-gray-500">Create daily motivation for your clients</p>
          </div>
        </div>
      </div>
    </div>
  );
} 