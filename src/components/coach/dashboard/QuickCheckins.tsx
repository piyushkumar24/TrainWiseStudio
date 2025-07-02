
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const recentActivity = [
  {
    id: 1,
    name: 'Sarah Johnson',
    lastActivity: 'Completed strength training session',
    activityTime: '2h ago',
    programType: 'Strength Training',
    currentStatus: 'On Track',
    emoji: '🔥',
    isUrgent: false
  },
  {
    id: 2,
    name: 'Mike Chen',
    lastActivity: 'Feeling motivated and energized today',
    activityTime: '4h ago',
    programType: 'Mindfulness',
    currentStatus: 'Engaged',
    emoji: '✅',
    isUrgent: false
  },
  {
    id: 3,
    name: 'Emma Wilson',
    lastActivity: 'Hit protein goals for 3 days straight',
    activityTime: '6h ago',
    programType: 'Nutrition',
    currentStatus: 'Excellent',
    emoji: '✅',
    isUrgent: false
  },
  {
    id: 4,
    name: 'John Smith',
    lastActivity: 'Completed cardio workout - felt great!',
    activityTime: '8h ago',
    programType: 'Cardio',
    currentStatus: 'Active',
    emoji: '✅',
    isUrgent: false
  },
  {
    id: 5,
    name: 'Lisa Davis',
    lastActivity: 'Meal prep complete for the week',
    activityTime: '10h ago',
    programType: 'Nutrition',
    currentStatus: 'Consistent',
    emoji: '🔥',
    isUrgent: true
  }
];

export const QuickCheckins = () => {
  const handleOpenClient = (clientId: number) => {
    // Placeholder for opening client drawer/modal
    console.log('Opening client:', clientId);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 mx-2 sm:mx-4 md:mx-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Client Check-In</h2>
      
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <div className="w-full table-auto text-sm text-left bg-white shadow-md rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Name</TableHead>
                <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Last Activity</TableHead>
                <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Program Type</TableHead>
                <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Current Status</TableHead>
                <TableHead className="text-gray-600 font-semibold text-xs uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, index) => (
                <TableRow 
                  key={activity.id}
                  className="hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-right-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TableCell className="font-medium text-gray-900">
                    {activity.name}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex flex-col">
                      <span className="text-sm">{activity.lastActivity}</span>
                      <span className="text-xs text-gray-400">{activity.activityTime}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {activity.programType}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.currentStatus === 'Excellent' || activity.currentStatus === 'On Track' 
                        ? 'bg-green-100 text-green-800'
                        : activity.currentStatus === 'Engaged' || activity.currentStatus === 'Active'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {activity.currentStatus}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleOpenClient(activity.id)}
                      className="text-[#FF6B2C] font-semibold text-sm hover:underline"
                    >
                      Open
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden flex flex-col gap-3">
        {recentActivity.map((activity, index) => (
          <Card 
            key={activity.id}
            className="bg-white rounded-xl shadow p-4 border-l-4 border-orange-500 animate-in fade-in slide-in-from-right-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activity.emoji}</span>
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {activity.name}
                  </h4>
                </div>
                <span className="text-xs text-gray-500">
                  {activity.activityTime}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {activity.lastActivity}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {activity.programType}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.currentStatus === 'Excellent' || activity.currentStatus === 'On Track' 
                      ? 'bg-green-100 text-green-800'
                      : activity.currentStatus === 'Engaged' || activity.currentStatus === 'Active'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {activity.currentStatus}
                  </span>
                </div>
                
                <button
                  onClick={() => handleOpenClient(activity.id)}
                  className="text-[#FF6B2C] font-semibold text-sm hover:underline"
                >
                  Open
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
