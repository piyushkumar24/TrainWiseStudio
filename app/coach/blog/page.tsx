import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CoachBlogPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Blog Posts</h2>
          <p className="text-gray-500">Manage and create content for your clients</p>
        </div>
        <Button>Create New Post</Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started with Fitness</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              A beginner's guide to starting a fitness routine that sticks.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Published: June 15, 2023</span>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Nutrition Myths Debunked</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Separating fact from fiction in the world of nutrition and dieting.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Published: July 2, 2023</span>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Mental Health and Exercise</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              How physical activity can improve your mental wellbeing.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Published: August 10, 2023</span>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 