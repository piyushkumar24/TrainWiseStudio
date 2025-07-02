import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Save, Trash } from "lucide-react";

export default function EditMentalExercisePage({ params }: { params: { mentalId: string } }) {
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
        <Link href={`/coach/knowledgeHub/mental/${mentalId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Exercise
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Edit Mental Health Exercise</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exercise Title</Label>
                <Input id="title" defaultValue={exerciseData.title} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={exerciseData.description}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="meditation"
                  >
                    <option value="">Select category</option>
                    <option value="meditation">Meditation</option>
                    <option value="breathing">Breathing Exercise</option>
                    <option value="journaling">Journaling</option>
                    <option value="mindfulness">Mindfulness</option>
                    <option value="stress">Stress Management</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select 
                    id="difficulty" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="beginner"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" defaultValue={exerciseData.duration} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exerciseData.instructions.map((instruction, index) => (
                <div key={index} className="space-y-2">
                  <Label>Step {index + 1}</Label>
                  <div className="flex gap-2">
                    <Textarea defaultValue={instruction} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Step
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exerciseData.benefits.map((benefit, index) => (
                <div key={index} className="space-y-2">
                  <Label>Benefit {index + 1}</Label>
                  <div className="flex gap-2">
                    <Input defaultValue={benefit} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Benefit
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tips for Practice</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {exerciseData.tips.map((tip, index) => (
                <div key={index} className="space-y-2">
                  <Label>Tip {index + 1}</Label>
                  <div className="flex gap-2">
                    <Input defaultValue={tip} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Tip
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Supporting Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="audioUrl">Audio URL (optional)</Label>
                <Input id="audioUrl" placeholder="Enter audio file URL" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL (optional)</Label>
                <Input id="videoUrl" placeholder="Enter YouTube or Vimeo URL" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="downloadableResource">Downloadable Resource</Label>
                <div className="mb-2 bg-gray-100 rounded-md p-2 text-sm">Current: No file uploaded</div>
                <Input id="downloadableResource" type="file" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Exercise Image</Label>
                <div className="mb-2 bg-gray-100 rounded-md p-2 text-sm">Current: mindfulness-meditation.jpg</div>
                <Input id="image" type="file" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 