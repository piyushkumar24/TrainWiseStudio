import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CreateProgramPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Program</h1>
      
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Basic Info</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="publish">Publish</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Program Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" placeholder="Enter program title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your program"
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
                    <option value="fitness">Fitness</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="mental">Mental Health</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (weeks)</Label>
                  <Input id="duration" type="number" min="1" placeholder="4" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input id="coverImage" type="file" />
              </div>
              
              <div className="flex justify-end">
                <Button>Save & Continue</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Program Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">
                Add exercises, nutrition plans, or mental health activities to your program.
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Week 1</h3>
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium">Day 1: Full Body Workout</h4>
                        <p className="text-sm text-gray-500">5 exercises</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
                      <div>
                        <h4 className="font-medium">Day 2: Rest & Recovery</h4>
                        <p className="text-sm text-gray-500">Stretching routine</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">+ Add Day</Button>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">+ Add Week</Button>
                
                <div className="flex justify-end">
                  <Button>Save & Continue</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Program Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">
                Set the schedule for your program.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input id="startDate" type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Days Per Week</Label>
                  <div className="flex gap-2">
                    {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        className="w-10 h-10 p-0"
                      >
                        {day}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save & Continue</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>Publish Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mb-6">
                Review your program and publish it.
              </p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Program Summary</h3>
                  <ul className="space-y-2">
                    <li><strong>Title:</strong> 12-Week Strength Builder</li>
                    <li><strong>Category:</strong> Fitness</li>
                    <li><strong>Duration:</strong> 12 weeks</li>
                    <li><strong>Workouts:</strong> 36 (3 per week)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <Label>
                    <input type="checkbox" className="mr-2" />
                    I have reviewed all content and confirm it's ready for clients
                  </Label>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Save as Draft</Button>
                  <Button>Publish Program</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 