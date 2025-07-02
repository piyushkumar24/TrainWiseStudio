"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon, InfoIcon, AlertCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AlertSectionProps {
  subscription: any;
  assignedPrograms: any[];
}

export function AlertSection({ subscription, assignedPrograms }: AlertSectionProps) {
  // Calculate days remaining in subscription
  const daysRemaining = subscription
    ? Math.ceil((new Date(subscription.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;

  // Determine if subscription is expiring soon (within 5 days)
  const isExpiringSoon = daysRemaining > 0 && daysRemaining <= 5;
  
  // Determine if user has no active program
  const hasNoProgram = assignedPrograms.length === 0;

  return (
    <div className="space-y-4">
      {isExpiringSoon && (
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertCircleIcon className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Subscription Expiring Soon</AlertTitle>
          <AlertDescription className="text-amber-700">
            Your {subscription.planType.toLowerCase()} plan expires in {daysRemaining} days. 
            Consider renewing to maintain access to your programs.
          </AlertDescription>
        </Alert>
      )}

      {hasNoProgram && (
        <Alert variant="default" className="bg-blue-50 border-blue-200">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertTitle className="text-blue-800">Program Assignment</AlertTitle>
          <AlertDescription className="text-blue-700">
            Your coach has been notified and will assign a program to you soon.
          </AlertDescription>
        </Alert>
      )}

      {assignedPrograms.length > 0 && (
        <Alert variant="default" className="bg-green-50 border-green-200">
          <CalendarIcon className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Active Program</AlertTitle>
          <AlertDescription className="text-green-700">
            You have {assignedPrograms.length} active program{assignedPrograms.length > 1 ? 's' : ''}. 
            Your current program was updated {formatDistanceToNow(new Date(assignedPrograms[0].updatedAt), { addSuffix: true })}.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
