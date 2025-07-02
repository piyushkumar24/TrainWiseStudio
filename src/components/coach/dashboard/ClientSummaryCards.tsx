
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const clients = {
  active: [
    {
      id: 1,
      name: 'John Smith',
      plan: 'Strength Building Pro',
      lastActivity: '2 hours ago',
      avatar: 'JS',
      status: 'active'
    },
    {
      id: 2,
      name: 'Lisa Davis',
      plan: 'Cardio Fitness',
      lastActivity: '1 day ago',
      avatar: 'LD',
      status: 'active'
    }
  ],
  trial: [
    {
      id: 3,
      name: 'Tom Wilson',
      plan: 'Trial Program',
      lastActivity: '3 hours ago',
      avatar: 'TW',
      status: 'trial'
    }
  ],
  inactive: [
    {
      id: 4,
      name: 'Jane Brown',
      plan: 'Yoga Flow',
      lastActivity: '1 week ago',
      avatar: 'JB',
      status: 'inactive'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'trial': return 'bg-yellow-100 text-yellow-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const ClientSummaryCards = () => {
  const [activeTab, setActiveTab] = useState('active');

  const renderClientCard = (client: any, index: number) => (
    <Card 
      key={client.id} 
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4 mb-3"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FF6B2C] text-white flex items-center justify-center font-semibold">
              {client.avatar}
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{client.name}</h4>
              <p className="text-sm text-gray-600">{client.plan}</p>
            </div>
          </div>
          <Badge className={getStatusColor(client.status)}>
            {client.status}
          </Badge>
        </div>
        
        <div className="mb-4">
          <span className="text-sm text-gray-500">Last login: {client.lastActivity}</span>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 hover:scale-[1.02] transition-transform">
            See Program
          </Button>
          <Button size="sm" variant="outline" className="flex-1 hover:scale-[1.02] transition-transform">
            View Profile
          </Button>
          <Button size="sm" className="bg-[#FF6B2C] hover:bg-[#e85b22] flex-1 hover:scale-[1.02] transition-transform">
            Give Feedback
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-900">
      <h2 className="text-xl font-semibold mb-3 text-gray-900">Client Overview</h2>
      <p className="text-sm text-gray-500 mb-6">Manage your active, trial, and inactive clients</p>

      <Card className="bg-white rounded-xl shadow-sm">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="active">Active ({clients.active.length})</TabsTrigger>
              <TabsTrigger value="trial">Trial ({clients.trial.length})</TabsTrigger>
              <TabsTrigger value="inactive">Inactive ({clients.inactive.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="max-h-96 overflow-y-auto">
              <div className="space-y-0">
                {clients.active.map((client, index) => renderClientCard(client, index))}
              </div>
            </TabsContent>
            
            <TabsContent value="trial" className="max-h-96 overflow-y-auto">
              <div className="space-y-0">
                {clients.trial.map((client, index) => renderClientCard(client, index))}
              </div>
            </TabsContent>
            
            <TabsContent value="inactive" className="max-h-96 overflow-y-auto">
              <div className="space-y-0">
                {clients.inactive.map((client, index) => renderClientCard(client, index))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
