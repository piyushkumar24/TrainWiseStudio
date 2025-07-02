import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Plus, Save } from "lucide-react";

export default function CreateFitnessExercisePage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/coach/knowledgeHub">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
          </Button>
        </Link>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Exercise
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Create Fitness Exercise</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exercise Title</Label>
                <Input id="title" placeholder="Enter exercise title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the exercise"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
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
              <div className="space-y-2">
                <Label>Step 1</Label>
                <div className="flex gap-2">
                  <Textarea placeholder="Enter instruction step" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tip 1</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter tip" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Tip
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
                <Input id="targetMuscles" placeholder="E.g., Quadriceps, Hamstrings" />
                <p className="text-xs text-gray-500">Separate multiple muscles with commas</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment Needed</Label>
                <Input id="equipment" placeholder="E.g., Barbell, Dumbbells" />
                <p className="text-xs text-gray-500">Separate multiple items with commas</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="variations">Variations</Label>
                <Input id="variations" placeholder="E.g., Front Squat, Goblet Squat" />
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