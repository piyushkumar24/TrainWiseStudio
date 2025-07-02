
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CheckIn {
  id: string;
  date: string;
  weight?: number;
  mood?: number;
  sleep?: number;
  energy?: number;
  notes?: string;
}

interface CheckInHistoryProps {
  userId?: string;
}

export const CheckInHistory = ({ userId }: CheckInHistoryProps) => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCheckIns();
  }, [userId]);

  const fetchCheckIns = async () => {
    try {
      // Enhanced mock data with realistic check-in entries
      const mockCheckIns: CheckIn[] = [
        {
          id: '1',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 76.8,
          mood: 8,
          sleep: 7,
          energy: 9,
          notes: 'Feeling great after yesterday\'s leg workout! Energy is through the roof today.'
        },
        {
          id: '2',
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.1,
          mood: 6,
          sleep: 5,
          energy: 6,
          notes: 'Didn\'t sleep well last night - neighbors were loud. Skipped morning workout.'
        },
        {
          id: '3',
          date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.0,
          mood: 9,
          sleep: 8,
          energy: 8,
          notes: 'Perfect day! Hit all my nutrition goals and had an amazing workout session.'
        },
        {
          id: '4',
          date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.3,
          mood: 7,
          sleep: 7,
          energy: 7,
          notes: 'Solid day overall. Tried the new protein recipe - really tasty!'
        },
        {
          id: '5',
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          mood: 5,
          sleep: 4,
          energy: 4,
          notes: 'Feeling a bit under the weather. Took a rest day and focused on hydration.'
        },
        {
          id: '6',
          date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.6,
          mood: 8,
          sleep: 8,
          energy: 9,
          notes: 'Weekend warrior mode! Great hiking session with friends. Feel refreshed.'
        },
        {
          id: '7',
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.8,
          mood: 7,
          sleep: 6,
          energy: 7,
          notes: 'Friday night social dinner - enjoyed myself but stayed mindful of portions.'
        },
        {
          id: '8',
          date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 77.9,
          mood: 9,
          sleep: 9,
          energy: 10,
          notes: 'Best workout week so far! PR on bench press - 85kg x 5 reps. So pumped!'
        },
        {
          id: '9',
          date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 78.0,
          mood: 8,
          sleep: 7,
          energy: 8,
          notes: 'Meal prep Sunday completed. Ready for a productive week ahead.'
        },
        {
          id: '10',
          date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
          weight: 78.2,
          mood: 6,
          sleep: 6,
          energy: 6,
          notes: 'Busy work day but managed to squeeze in a quick 20-minute HIIT session.'
        }
      ];
      
      setCheckIns(mockCheckIns);
    } catch (error) {
      console.error('Error fetching check-ins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (value: number, type: 'mood' | 'sleep' | 'energy') => {
    const threshold = type === 'mood' ? 7 : type === 'sleep' ? 6 : 7;
    
    if (value >= threshold) {
      return <TrendingUp className="h-4 w-4 text-green-500" />;
    } else if (value >= threshold - 2) {
      return <Minus className="h-4 w-4 text-yellow-500" />;
    } else {
      return <TrendingDown className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = (value: number, type: 'mood' | 'sleep' | 'energy') => {
    const threshold = type === 'mood' ? 7 : type === 'sleep' ? 6 : 7;
    
    if (value >= threshold) {
      return 'bg-green-50 text-green-700 border-green-200';
    } else if (value >= threshold - 2) {
      return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    } else {
      return 'bg-red-50 text-red-700 border-red-200';
    }
  };

  const filteredCheckIns = checkIns.filter(checkIn =>
    checkIn.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    new Date(checkIn.date).toLocaleDateString().includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">📘 Daily Check-Ins</h2>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-4 animate-pulse">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="flex gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-6 bg-gray-200 rounded w-16"></div>
                  ))}
                </div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-900">📘 Daily Check-Ins</h2>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search check-ins..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredCheckIns.length === 0 ? (
        <Card className="p-8 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No matching check-ins' : 'No check-ins yet'}
          </h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start logging your daily progress to see insights here.'
            }
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredCheckIns.map((checkIn) => (
            <Card key={checkIn.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {new Date(checkIn.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                  {checkIn.weight && (
                    <Badge variant="outline">
                      {checkIn.weight} kg
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {checkIn.mood && (
                    <Badge className={`border ${getStatusColor(checkIn.mood, 'mood')}`}>
                      {getStatusIcon(checkIn.mood, 'mood')}
                      <span className="ml-1">Mood {checkIn.mood}/10</span>
                    </Badge>
                  )}
                  {checkIn.sleep && (
                    <Badge className={`border ${getStatusColor(checkIn.sleep, 'sleep')}`}>
                      {getStatusIcon(checkIn.sleep, 'sleep')}
                      <span className="ml-1">Sleep {checkIn.sleep}/10</span>
                    </Badge>
                  )}
                  {checkIn.energy && (
                    <Badge className={`border ${getStatusColor(checkIn.energy, 'energy')}`}>
                      {getStatusIcon(checkIn.energy, 'energy')}
                      <span className="ml-1">Energy {checkIn.energy}/10</span>
                    </Badge>
                  )}
                </div>

                {checkIn.notes && (
                  <p className="text-sm text-gray-600 italic">"{checkIn.notes}"</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
