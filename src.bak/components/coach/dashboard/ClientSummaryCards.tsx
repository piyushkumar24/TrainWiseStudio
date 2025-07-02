"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, CalendarIcon, AlertCircleIcon } from "lucide-react";

interface ClientSummaryCardsProps {
  totalClients: number;
  activeSubscriptions: number;
  expiringSubscriptions: number;
}

export function ClientSummaryCards({
  totalClients,
  activeSubscriptions,
  expiringSubscriptions,
}: ClientSummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          <UsersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalClients}</div>
          <p className="text-xs text-muted-foreground">
            Registered customers
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeSubscriptions}</div>
          <p className="text-xs text-muted-foreground">
            Currently active plans
          </p>
        </CardContent>
      </Card>
      
      <Card className={expiringSubscriptions > 0 ? "border-amber-200 bg-amber-50" : ""}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
          <AlertCircleIcon className={`h-4 w-4 ${expiringSubscriptions > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expiringSubscriptions}</div>
          <p className="text-xs text-muted-foreground">
            Plans expiring in 5 days
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
