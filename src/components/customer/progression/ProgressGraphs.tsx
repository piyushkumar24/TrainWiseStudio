
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, Heart, Utensils } from 'lucide-react';

interface ProgressGraphsProps {
  userId?: string;
}

type TimeFrame = '7d' | '30d' | '90d';
type GraphType = 'weight' | 'checkins' | 'meditation' | 'nutrition';

export const ProgressGraphs = ({ userId }: ProgressGraphsProps) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('30d');
  const [activeGraph, setActiveGraph] = useState<GraphType>('weight');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [timeFrame, activeGraph]);

  // Enhanced mock data with realistic values
  const getMockData = (type: GraphType, timeframe: TimeFrame) => {
    const days = timeframe === '7d' ? 7 : timeframe === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      switch (type) {
        case 'weight':
          // Realistic weight progression with slight downward trend
          const baseWeight = 78.5;
          const trend = (days - i) * -0.02; // Slow weight loss
          const variation = Math.sin(i * 0.2) * 0.3 + (Math.random() - 0.5) * 0.4;
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: Number((baseWeight + trend + variation).toFixed(1))
          });
          break;
        case 'checkins':
          // Check-ins per day (0-3, with some days having 0)
          const checkInProb = Math.random();
          let checkInValue = 0;
          if (checkInProb > 0.7) checkInValue = 3; // Busy day
          else if (checkInProb > 0.4) checkInValue = 2; // Normal day
          else if (checkInProb > 0.2) checkInValue = 1; // Light day
          // else 0 - rest day
          
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: checkInValue
          });
          break;
        case 'meditation':
          // Meditation minutes per day (0-25 minutes)
          const meditationProb = Math.random();
          let meditationValue = 0;
          if (meditationProb > 0.8) meditationValue = Math.floor(Math.random() * 8) + 18; // Long session
          else if (meditationProb > 0.5) meditationValue = Math.floor(Math.random() * 6) + 10; // Medium session
          else if (meditationProb > 0.3) meditationValue = Math.floor(Math.random() * 5) + 5; // Short session
          // else 0 - no meditation
          
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: meditationValue
          });
          break;
        case 'nutrition':
          // Nutrition portions logged per day (0-5)
          const nutritionProb = Math.random();
          let nutritionValue = 0;
          if (nutritionProb > 0.9) nutritionValue = 5; // Perfect day
          else if (nutritionProb > 0.7) nutritionValue = 4; // Good day
          else if (nutritionProb > 0.4) nutritionValue = 3; // Decent day
          else if (nutritionProb > 0.2) nutritionValue = 2; // Light tracking
          else if (nutritionProb > 0.1) nutritionValue = 1; // Minimal tracking
          // else 0 - no tracking
          
          data.push({
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: nutritionValue
          });
          break;
      }
    }
    
    return data;
  };

  const graphs = [
    { id: 'weight' as GraphType, label: 'Weight', icon: TrendingUp, color: '#3B82F6', unit: 'kg' },
    { id: 'checkins' as GraphType, label: 'Check-ins', icon: Activity, color: '#10B981', unit: 'per day' },
    { id: 'meditation' as GraphType, label: 'Meditation', icon: Heart, color: '#8B5CF6', unit: 'minutes' },
    { id: 'nutrition' as GraphType, label: 'Nutrition', icon: Utensils, color: '#F59E0B', unit: 'portions' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">📊 Progress Over Time</h2>
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">📊 Progress Over Time</h2>
        <Select value={timeFrame} onValueChange={(value: TimeFrame) => setTimeFrame(value)}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7d</SelectItem>
            <SelectItem value="30d">30d</SelectItem>
            <SelectItem value="90d">90d</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="p-6">
        <Tabs value={activeGraph} onValueChange={(value: GraphType) => setActiveGraph(value)}>
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-6">
            {graphs.map((graph) => {
              const Icon = graph.icon;
              return (
                <TabsTrigger key={graph.id} value={graph.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{graph.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {graphs.map((graph) => (
            <TabsContent key={graph.id} value={graph.id}>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <graph.icon className="h-4 w-4" style={{ color: graph.color }} />
                  <span>{graph.label} ({graph.unit})</span>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {graph.id === 'weight' ? (
                      <LineChart data={getMockData(graph.id, timeFrame)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          stroke="#6b7280"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#6b7280"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={graph.color}
                          strokeWidth={2}
                          dot={{ fill: graph.color, strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, stroke: graph.color, strokeWidth: 2 }}
                        />
                      </LineChart>
                    ) : (
                      <BarChart data={getMockData(graph.id, timeFrame)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }}
                          stroke="#6b7280"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="#6b7280"
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill={graph.color}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
};
