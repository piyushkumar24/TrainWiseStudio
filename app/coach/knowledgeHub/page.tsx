import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import Link from "next/link";

export default function KnowledgeHubPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Knowledge Hub</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Content Library</h2>
          <p className="text-gray-500">Manage and create content for your programs</p>
        </div>
        <div className="flex gap-2">
          <Link href="/coach/knowledgeHub/fitness/create">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Fitness Exercise
            </Button>
          </Link>
          <Link href="/coach/knowledgeHub/nutrition/create">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Recipe
            </Button>
          </Link>
          <Link href="/coach/knowledgeHub/mental/create">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" /> Mental Exercise
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search content..." className="pl-10" />
      </div>
      
      <Tabs defaultValue="fitness">
        <TabsList className="mb-6">
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
        </TabsList>
        
        <TabsContent value="fitness">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Barbell Squat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Compound lower body exercise targeting quadriceps, hamstrings, and glutes.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Strength Training</span>
                  <Link href="/coach/knowledgeHub/fitness/1">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Push-Up Variations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Multiple push-up variations for different difficulty levels and muscle focus.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Bodyweight</span>
                  <Link href="/coach/knowledgeHub/fitness/2">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Deadlift</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Compound exercise targeting posterior chain, including back, glutes, and hamstrings.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Strength Training</span>
                  <Link href="/coach/knowledgeHub/fitness/3">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="nutrition">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>High-Protein Breakfast Bowl</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Quick and nutritious breakfast with 30g of protein to start the day right.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Breakfast</span>
                  <Link href="/coach/knowledgeHub/nutrition/1">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Post-Workout Smoothie</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Recovery smoothie with optimal protein-to-carb ratio for muscle repair.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Recovery</span>
                  <Link href="/coach/knowledgeHub/nutrition/2">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mental">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>5-Minute Mindfulness Meditation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Quick mindfulness practice to reduce stress and improve focus.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Meditation</span>
                  <Link href="/coach/knowledgeHub/mental/1">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Stress Management Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  Collection of practical techniques to manage stress in daily life.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Stress Management</span>
                  <Link href="/coach/knowledgeHub/mental/2">
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 