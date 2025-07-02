"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { CheckIcon, UserIcon } from "lucide-react";

interface Request {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface NewClientRequestsProps {
  requests: Request[];
}

export function NewClientRequests({ requests }: NewClientRequestsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  const handleMarkAsSeen = async (requestId: string) => {
    setLoading((prev) => ({ ...prev, [requestId]: true }));
    
    try {
      const response = await fetch(`/api/coach/requests/${requestId}/seen`, {
        method: "POST",
      });
      
      if (response.ok) {
        router.refresh();
      } else {
        console.error("Failed to mark request as seen");
      }
    } catch (error) {
      console.error("Error marking request as seen:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [requestId]: false }));
    }
  };

  const handleViewClient = (clientId: string) => {
    router.push(`/coach/clients/${clientId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Client Requests</CardTitle>
        <CardDescription>
          Clients who have recently signed up and need program assignment
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between space-x-4 rounded-md border p-4"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={request.user.image || ""} alt={request.user.name} />
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">{request.user.name}</p>
                    <p className="text-sm text-muted-foreground">{request.user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {formatDistanceToNow(new Date(request.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewClient(request.user.id)}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleMarkAsSeen(request.id)}
                    disabled={loading[request.id]}
                  >
                    {loading[request.id] ? (
                      "Processing..."
                    ) : (
                      <>
                        <CheckIcon className="mr-1 h-4 w-4" /> Mark as Seen
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No new client requests at the moment
          </p>
        )}
      </CardContent>
    </Card>
  );
}
