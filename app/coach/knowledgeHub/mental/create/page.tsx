import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Plus, Save } from "lucide-react";

export default function CreateMentalExercisePage() {
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
      
      <h1 className="text-3xl font-bold mb-8">Create Mental Health Exercise</h1>
      
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
                  placeholder="Describe the mental health exercise"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
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
                  >
                    <option value="">Select difficulty</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="E.g., 5 minutes" />
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
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Benefit 1</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter benefit" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Benefit
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
                <Input id="image" type="file" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 