"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface MotivationCardProps {
  title: string;
  imageUrl: string;
}

export function MotivationCard({ title, imageUrl }: MotivationCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarIcon className="mr-1 h-4 w-4" />
            <span>{format(new Date(), "MMM d, yyyy")}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[300px] w-full">
          <Image
            src={imageUrl}
            alt="Daily motivation"
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
    </Card>
  );
}
