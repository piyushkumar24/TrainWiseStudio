"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CalendarDaysIcon, 
  ClipboardCheckIcon, 
  BookOpenIcon, 
  ShoppingBagIcon, 
  BarChartIcon 
} from "lucide-react";

interface QuickActionsProps {
  assignedPrograms: any[];
}

export function QuickActions({ assignedPrograms }: QuickActionsProps) {
  const hasActiveProgram = assignedPrograms.length > 0;
  const latestProgram = hasActiveProgram ? assignedPrograms[0] : null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasActiveProgram ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link href={`/dashboard/programs/${latestProgram.programId}`} passHref>
              <Button variant="outline" className="w-full justify-start">
                <CalendarDaysIcon className="mr-2 h-4 w-4" />
                View Today's Program
              </Button>
            </Link>
            
            <Link href={`/dashboard/programs/${latestProgram.programId}/log`} passHref>
              <Button variant="outline" className="w-full justify-start">
                <ClipboardCheckIcon className="mr-2 h-4 w-4" />
                Log Progress
              </Button>
            </Link>
            
            <Link href="/dashboard/check-in" passHref>
              <Button variant="outline" className="w-full justify-start">
                <BarChartIcon className="mr-2 h-4 w-4" />
                Daily Check-in
              </Button>
            </Link>
            
            <Link href="/dashboard/library" passHref>
              <Button variant="outline" className="w-full justify-start">
                <BookOpenIcon className="mr-2 h-4 w-4" />
                Browse Library
              </Button>
            </Link>
            
            <Link href="/dashboard/shop" passHref>
              <Button variant="outline" className="w-full justify-start">
                <ShoppingBagIcon className="mr-2 h-4 w-4" />
                Visit Shop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              You don't have any active programs yet. While you wait for your coach to assign one,
              you can explore these options:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link href="/dashboard/library" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpenIcon className="mr-2 h-4 w-4" />
                  Browse Library
                </Button>
              </Link>
              
              <Link href="/dashboard/shop" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <ShoppingBagIcon className="mr-2 h-4 w-4" />
                  Visit Shop
                </Button>
              </Link>
              
              <Link href="/dashboard/profile" passHref>
                <Button variant="outline" className="w-full justify-start">
                  <CalendarDaysIcon className="mr-2 h-4 w-4" />
                  Update Profile
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
