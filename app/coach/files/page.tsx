import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Upload, FileText, Users, Clock } from "lucide-react";

export default function CoachFilesPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Files Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Files</h2>
          <p className="text-gray-500">Manage and share files with your clients</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" /> Upload New File
        </Button>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search files..." className="pl-10" />
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="shared">Shared Files</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <FileText className="h-8 w-8 text-blue-500" />
                  <Button variant="ghost" size="sm">...</Button>
                </div>
                <CardTitle className="mt-2">Welcome Guide.pdf</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Introduction guide for new clients
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Shared with 12 clients</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated 2 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <FileText className="h-8 w-8 text-green-500" />
                  <Button variant="ghost" size="sm">...</Button>
                </div>
                <CardTitle className="mt-2">Nutrition Plan Template.xlsx</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Customizable nutrition planning spreadsheet
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Shared with 8 clients</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated 1 week ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <FileText className="h-8 w-8 text-purple-500" />
                  <Button variant="ghost" size="sm">...</Button>
                </div>
                <CardTitle className="mt-2">Workout Tracking Sheet.xlsx</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  Progress tracking template for clients
                </p>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    <span>Shared with 15 clients</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Updated 3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="shared">
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No shared files yet</h3>
            <p className="text-gray-500 mb-4">
              When you share files with clients, they will appear here.
            </p>
            <Button>Share a File</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates yet</h3>
            <p className="text-gray-500 mb-4">
              Create templates to quickly share with multiple clients.
            </p>
            <Button>Create Template</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 