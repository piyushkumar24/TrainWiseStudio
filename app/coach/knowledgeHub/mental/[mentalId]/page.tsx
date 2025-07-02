import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function MentalExerciseViewerPage({ params }: { params: { mentalId: string } }) {
  const mentalId = params.mentalId;
  
  // In a real app, you would fetch mental exercise data based on the ID
  const exerciseData = {
    id: mentalId,
    title: "5-Minute Mindfulness Meditation",
    category: "Meditation",
    difficulty: "Beginner",
    duration: "5 minutes",
    description: "A quick mindfulness practice designed to reduce stress and improve focus. This exercise can be done anywhere and is perfect for beginners or those with limited time.",
    instructions: [
      "Find a comfortable seated position, either on a chair or cushion.",
      "Close your eyes or maintain a soft gaze a few feet in front of you.",
      "Take three deep breaths, inhaling through your nose and exhaling through your mouth.",
      "Allow your breath to return to its natural rhythm, not forcing or controlling it.",
      "Bring your attention to the sensation of breathing - the rise and fall of your chest or the feeling of air entering and leaving your nostrils.",
      "When your mind wanders (which is natural), gently notice this and bring your attention back to your breath.",
      "Continue this practice for 5 minutes.",
      "To finish, take three deep breaths and slowly open your eyes if they were closed."
    ],
    benefits: [
      "Reduces stress and anxiety",
      "Improves focus and concentration",
      "Enhances self-awareness",
      "Promotes emotional well-being",
      "Can be practiced anywhere"
    ],
    tips: [
      "Consistency is more important than duration - even 5 minutes daily is beneficial.",
      "There's no 'right way' to meditate - don't judge yourself if your mind wanders.",
      "Try practicing at the same time each day to build a habit.",
      "If sitting is uncomfortable, you can also practice while lying down or walking.",
      "Use a timer with a gentle sound to mark the end of your session."
    ],
    image: "https://example.com/mindfulness-meditation.jpg"
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/coach/knowledgeHub">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
          </Button>
        </Link>
        <Link href={`/coach/knowledgeHub/mental/edit/${mentalId}`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> Edit Exercise
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{exerciseData.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {exerciseData.category}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {exerciseData.difficulty}
                </span>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {exerciseData.duration}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{exerciseData.description}</p>
              
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="list-decimal pl-5 mb-6 space-y-2">
                {exerciseData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              
              <h3 className="text-lg font-semibold mb-3">Benefits</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {exerciseData.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                {exerciseData.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                      {exerciseData.category}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                  <dd className="mt-1">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {exerciseData.difficulty}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Duration</dt>
                  <dd className="mt-1">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {exerciseData.duration}
                    </span>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                This exercise is used in the following programs:
              </p>
              <ul className="space-y-2">
                <li className="text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">
                    Stress Management Basics
                  </Link>
                </li>
                <li className="text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">
                    Mental Wellness Starter
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 