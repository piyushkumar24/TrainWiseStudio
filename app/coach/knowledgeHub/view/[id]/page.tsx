import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function UniversalContentViewerPage({ params }: { params: { id: string } }) {
  const contentId = params.id;
  
  // In a real app, you would fetch content data based on the ID
  // This is a placeholder that could show any type of content (fitness, nutrition, mental)
  const contentData = {
    id: contentId,
    type: "fitness", // Could be "fitness", "nutrition", or "mental"
    title: "Universal Content Viewer",
    description: "This is a placeholder for viewing any type of content from the knowledge hub. In a real application, this would display the appropriate content based on the ID and type.",
    content: "The content would be displayed here based on the type of content being viewed. This could be a fitness exercise, nutrition recipe, or mental health exercise."
  };

  // Determine where to redirect based on content type
  const getBackLink = () => {
    switch (contentData.type) {
      case "fitness":
        return `/coach/knowledgeHub/fitness/${contentId}`;
      case "nutrition":
        return `/coach/knowledgeHub/nutrition/${contentId}`;
      case "mental":
        return `/coach/knowledgeHub/mental/${contentId}`;
      default:
        return "/coach/knowledgeHub";
    }
  };

  // Determine where to edit based on content type
  const getEditLink = () => {
    switch (contentData.type) {
      case "fitness":
        return `/coach/knowledgeHub/fitness/edit/${contentId}`;
      case "nutrition":
        return `/coach/knowledgeHub/nutrition/edit/${contentId}`;
      case "mental":
        return `/coach/knowledgeHub/mental/edit/${contentId}`;
      default:
        return "/coach/knowledgeHub";
    }
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href={getBackLink()}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link>
        <Link href={getEditLink()}>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{contentData.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">{contentData.description}</p>
          <p>{contentData.content}</p>
          
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-yellow-800">
              Note: This is a placeholder page. In a real application, this would display the appropriate content 
              based on the ID and type of content being viewed.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 