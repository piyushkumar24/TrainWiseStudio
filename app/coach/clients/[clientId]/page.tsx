import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientDetailPage({ params }: { params: { clientId: string } }) {
  const clientId = params.clientId;
  
  // In a real app, you would fetch client data based on the ID
  const clientData = {
    id: clientId,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    goal: "Weight loss and muscle toning",
    program: "Premium Fitness Plan",
    startDate: "January 15, 2023",
    notes: "John is making good progress with his weight loss goals. He's been consistent with workouts 3x per week and has improved his nutrition habits.",
    progress: [
      { date: "Jan 2023", weight: 210, bodyFat: 28 },
      { date: "Feb 2023", weight: 205, bodyFat: 26 },
      { date: "Mar 2023", weight: 198, bodyFat: 24 },
    ]
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">{clientData.name}</h1>
          <p className="text-gray-500">Client ID: {clientData.id}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Message</Button>
          <Button>Edit Profile</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd>{clientData.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd>{clientData.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Goal</dt>
                <dd>{clientData.goal}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Current Program</dt>
                <dd>{clientData.program}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Member Since</dt>
                <dd>{clientData.startDate}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="progress">
            <TabsList className="mb-4">
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Date</th>
                          <th className="text-left py-2">Weight (lbs)</th>
                          <th className="text-left py-2">Body Fat (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientData.progress.map((entry, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{entry.date}</td>
                            <td className="py-2">{entry.weight}</td>
                            <td className="py-2">{entry.bodyFat}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button className="mt-4" variant="outline">Add New Entry</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="programs">
              <Card>
                <CardHeader>
                  <CardTitle>Assigned Programs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="border-b pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Premium Fitness Plan</h3>
                          <p className="text-sm text-gray-500">Assigned: Jan 15, 2023</p>
                          <p className="text-sm text-gray-500">Status: In Progress (Week 8/12)</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </li>
                    <li className="pb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">Nutrition Basics</h3>
                          <p className="text-sm text-gray-500">Assigned: Feb 1, 2023</p>
                          <p className="text-sm text-gray-500">Status: Completed</p>
                        </div>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </li>
                  </ul>
                  <Button className="mt-4">Assign New Program</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Coach Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{clientData.notes}</p>
                  <Button>Add Note</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 