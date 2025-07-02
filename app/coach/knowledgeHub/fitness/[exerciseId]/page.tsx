import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function FitnessExerciseViewerPage({ params }: { params: { exerciseId: string } }) {
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
        <Link href="/coach/knowledgeHub">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
          </Button>
        </Link>
        <Link href={`/coach/knowledgeHub/fitness/edit/${exerciseId}`}>
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
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {exerciseData.category}
                </span>
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {exerciseData.difficulty}
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
              
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {exerciseData.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Variations</h3>
              <ul className="list-disc pl-5 space-y-2">
                {exerciseData.variations.map((variation, index) => (
                  <li key={index}>{variation}</li>
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
                  <dt className="text-sm font-medium text-gray-500">Target Muscles</dt>
                  <dd className="mt-1">
                    {exerciseData.targetMuscles.map((muscle, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {muscle}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Equipment Needed</dt>
                  <dd className="mt-1">
                    {exerciseData.equipment.map((item, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {item}
                      </span>
                    ))}
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
                    12-Week Strength Builder
                  </Link>
                </li>
                <li className="text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">
                    Lower Body Focus
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