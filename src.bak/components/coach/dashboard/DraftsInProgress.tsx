"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { EditIcon } from "lucide-react";

interface Program {
  id: string;
  title: string;
  type: "FITNESS" | "NUTRITION" | "MENTAL";
  updatedAt: Date;
}

interface DraftsInProgressProps {
  drafts: Program[];
}

export function DraftsInProgress({ drafts }: DraftsInProgressProps) {
  const router = useRouter();

  const handleEditDraft = (programId: string, programType: string) => {
    switch (programType) {
      case "FITNESS":
        router.push(`/coach/programBuilder/edit/${programId}`);
        break;
      case "NUTRITION":
        router.push(`/coach/knowledgeHub/nutrition/edit/${programId}`);
        break;
      case "MENTAL":
        router.push(`/coach/knowledgeHub/mental/edit/${programId}`);
        break;
      default:
        router.push(`/coach/programBuilder/edit/${programId}`);
    }
  };

  const getProgramTypeBadge = (type: string) => {
    switch (type) {
      case "FITNESS":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Fitness</Badge>;
      case "NUTRITION":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Nutrition</Badge>;
      case "MENTAL":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">Mental</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drafts in Progress</CardTitle>
        <CardDescription>
          Continue working on your unfinished programs
        </CardDescription>
      </CardHeader>
      <CardContent>
        {drafts.length > 0 ? (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="flex items-center justify-between space-x-4 rounded-md border p-4"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium leading-none">{draft.title}</p>
                    {getProgramTypeBadge(draft.type)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last edited {formatDistanceToNow(new Date(draft.updatedAt), { addSuffix: true })}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleEditDraft(draft.id, draft.type)}
                >
                  <EditIcon className="mr-1 h-4 w-4" /> Continue
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground py-4 text-center">
            No drafts in progress
          </p>
        )}
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push("/coach/programBuilder")}
          >
            Create New Program
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
