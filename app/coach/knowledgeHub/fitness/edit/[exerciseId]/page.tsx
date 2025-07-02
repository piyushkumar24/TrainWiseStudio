import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Save, Trash } from "lucide-react";

export default function EditFitnessExercisePage({ params }: { params: { exerciseId: string } }) {
  const exerciseId = params.exerciseId;
  
  // In a real app, you would fetch exercise data based on the ID
  const exerciseData = {
    id: exerciseId,
    title: "Barbell Squat",
    category: "Strength Training",
    difficulty: "Intermediate",
    equipment: ["Barbell", "Squat Rack"],
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Lower Back"],
    description: "The barbell squat is a compound exercise that primarily targets the muscles of the lower body. It's considered one of the most effective exercises for building overall strength and muscle mass.",
    instructions: [
      "Set up a barbell on a squat rack at approximately shoulder height.",
      "Step under the bar and position it across your upper back, resting on your trapezius muscles (not on your neck).",
      "Grip the bar with hands slightly wider than shoulder-width apart.",
      "Lift the bar off the rack by straightening your legs, and take a step back.",
      "Position your feet shoulder-width apart, toes pointed slightly outward.",
      "Take a deep breath, brace your core, and begin the movement by bending at the hips and knees simultaneously.",
      "Lower your body until your thighs are parallel to the ground or slightly below.",
      "Push through your heels to return to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    tips: [
      "Keep your chest up and back straight throughout the movement.",
      "Ensure your knees track in line with your toes, not caving inward.",
      "Maintain a neutral spine position; avoid excessive rounding or arching.",
      "Breathe in as you lower and exhale as you push back up.",
      "Start with lighter weights to perfect your form before progressing."
    ],
    variations: [
      "Front Squat",
      "Goblet Squat",
      "Split Squat",
      "Bulgarian Split Squat"
    ],
    image: "https://example.com/barbell-squat.jpg"
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href={`/coach/knowledgeHub/fitness/${exerciseId}`}>
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
      
      <h1 className="text-3xl font-bold mb-8">Edit Fitness Exercise</h1>
      
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="strength"
                  >
                    <option value="">Select category</option>
                    <option value="strength">Strength Training</option>
                    <option value="cardio">Cardio</option>
                    <option value="flexibility">Flexibility</option>
                    <option value="bodyweight">Bodyweight</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select 
                    id="difficulty" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="intermediate"
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
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
              <CardTitle>Tips</CardTitle>
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
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercise Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="targetMuscles">Target Muscles</Label>
                <Input 
                  id="targetMuscles" 
                  defaultValue={exerciseData.targetMuscles.join(", ")} 
                />
                <p className="text-xs text-gray-500">Separate multiple muscles with commas</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment Needed</Label>
                <Input 
                  id="equipment" 
                  defaultValue={exerciseData.equipment.join(", ")} 
                />
                <p className="text-xs text-gray-500">Separate multiple items with commas</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="variations">Variations</Label>
                <Input 
                  id="variations" 
                  defaultValue={exerciseData.variations.join(", ")} 
                />
                <p className="text-xs text-gray-500">Separate multiple variations with commas</p>
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
                <div className="mb-2 bg-gray-100 rounded-md p-2 text-sm">Current: barbell-squat.jpg</div>
                <Input id="image" type="file" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="video">Video URL (optional)</Label>
                <Input id="video" placeholder="Enter YouTube or Vimeo URL" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
