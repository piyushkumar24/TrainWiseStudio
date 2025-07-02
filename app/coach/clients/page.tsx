import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function CoachClientsPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Client Management</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Clients</h2>
          <p className="text-gray-500">Manage and track your client progress</p>
        </div>
        <Button>Add New Client</Button>
      </div>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input placeholder="Search clients..." className="pl-10" />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>John Smith</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              <strong>Goal:</strong> Weight loss and muscle toning
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Program:</strong> Premium Fitness Plan
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Member since: Jan 2023</span>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sarah Johnson</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              <strong>Goal:</strong> Marathon training
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Program:</strong> Endurance Builder
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Member since: Mar 2023</span>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Michael Brown</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              <strong>Goal:</strong> Strength and muscle gain
            </p>
            <p className="text-gray-500 mb-4">
              <strong>Program:</strong> Strength Builder Pro
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Member since: Feb 2023</span>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 