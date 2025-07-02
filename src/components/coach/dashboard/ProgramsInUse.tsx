
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, AlertCircle } from 'lucide-react';

const programs = [
  {
    id: 1,
    name: 'Strength Building Pro',
    clientCount: 12,
    status: 'Active',
    lastUpdated: '1 week ago',
    type: 'Strength Training'
  },
  {
    id: 2,
    name: 'Cardio Blast Challenge',
    clientCount: 8,
    status: 'Active',
    lastUpdated: '3 days ago',
    type: 'Cardio'
  },
  {
    id: 3,
    name: 'Beginner Yoga Flow',
    clientCount: 15,
    status: 'Needs Update',
    lastUpdated: '2 weeks ago',
    type: 'Flexibility'
  },
  {
    id: 4,
    name: 'HIIT Intensive',
    clientCount: 6,
    status: 'Scheduled',
    lastUpdated: '5 days ago',
    type: 'HIIT'
  },
  {
    id: 5,
    name: 'Marathon Prep',
    clientCount: 4,
    status: 'Active',
    lastUpdated: '2 days ago',
    type: 'Endurance'
  },
  {
    id: 6,
    name: 'Core Strengthening',
    clientCount: 10,
    status: 'Active',
    lastUpdated: '1 week ago',
    type: 'Core'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Scheduled': return 'bg-blue-100 text-blue-800';
    case 'Needs Update': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Needs Update': return <AlertCircle className="h-4 w-4" />;
    case 'Scheduled': return <Calendar className="h-4 w-4" />;
    default: return null;
  }
};

export const ProgramsInUse = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1100">
      <h2 className="text-xl font-semibold mb-3 text-gray-900">Programs In Use</h2>
      <p className="text-sm text-gray-500 mb-6">Active programs assigned to your clients</p>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {programs.map((program, index) => (
          <Card 
            key={program.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {program.name}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Badge className={getStatusColor(program.status)} variant="secondary">
                        {getStatusIcon(program.status)}
                        <span className="ml-1">{program.status}</span>
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{program.type}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{program.clientCount} clients</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Updated {program.lastUpdated}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" className="text-xs hover:scale-[1.02] transition-transform">
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs hover:scale-[1.02] transition-transform">
                    Edit
                  </Button>
                  <Button size="sm" className="bg-[#FF6B2C] hover:bg-[#e85b22] text-xs hover:scale-[1.02] transition-transform">
                    Duplicate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
