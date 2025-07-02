
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Target } from 'lucide-react';
import { ClientDetail } from '@/hooks/useClientDetail';

interface GoalsBackgroundProps {
  client: ClientDetail;
}

export const GoalsBackground = ({ client }: GoalsBackgroundProps) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);

  const formatGoals = (goals: string[]) => {
    const goalMap: { [key: string]: string } = {
      'get-fit': 'Get Fit',
      'burn-fat': 'Burn Fat',
      'build-muscle': 'Build Muscle',
      'get-stronger': 'Get Stronger',
      'eat-healthier': 'Eat Healthier',
      'reduce-stress': 'Reduce Stress',
      'build-mindfulness': 'Build Mindfulness',
      'improve-habits': 'Improve Habits',
      'boost-focus': 'Boost Focus',
      'weight-loss': 'Weight Loss',
      'get-toned': 'Get Toned',
      'more-energy': 'More Energy',
      'reduce-cravings': 'Reduce Cravings',
      'improve-sleep': 'Improve Sleep',
      'emotional-balance': 'Emotional Balance'
    };
    return goals.map(goal => goalMap[goal] || goal).join(', ');
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">🎯 Goals & Background</h3>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden transition-all duration-200">
          <div className="px-6 pb-6 space-y-4">
            {/* Main Goals */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Main Goals</h4>
              <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                {client.goals && client.goals.length > 0 ? formatGoals(client.goals) : 'No goals specified'}
              </p>
            </div>

            {/* Client Demographics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Demographics</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {client.age && <p>Age: {client.age} years</p>}
                  {client.gender && <p>Gender: {client.gender}</p>}
                  {client.country && <p>Country: {client.country}</p>}
                </div>
                {!client.age && !client.gender && !client.country && (
                  <p className="text-gray-600 text-sm">Not specified</p>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Physical Stats</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  {client.height_cm && <p>Height: {client.height_cm} cm</p>}
                  {client.weight_kg && <p>Weight: {client.weight_kg} kg</p>}
                </div>
                {!client.height_cm && !client.weight_kg && (
                  <p className="text-gray-600 text-sm">Not specified</p>
                )}
              </div>
            </div>

            {/* Allergies */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Allergies</h4>
              <p className="text-gray-600 text-sm">
                {client.allergies && client.allergies.length > 0 
                  ? client.allergies.join(', ')
                  : 'None specified'
                }
              </p>
            </div>

            {/* Injuries/Limitations */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Injuries / Limitations</h4>
              <p className="text-gray-600 text-sm">
                {client.injuries && client.injuries.length > 0 
                  ? client.injuries.join(', ')
                  : 'None specified'
                }
              </p>
            </div>

            {/* Preferences */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Training Preferences</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Available days: {client.trainingPreferences?.availableDays?.join(', ') || 'Not specified'}</p>
                <p>Equipment preferences: {client.trainingPreferences?.equipment?.join(', ') || 'Not specified'}</p>
                <p>Time preference: {client.trainingPreferences?.timePreference || 'Not specified'}</p>
              </div>
            </div>

            {/* Nutrition Preferences */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Nutrition Preferences</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Dietary preferences: {client.nutritionPreferences?.dietary?.join(', ') || 'Not specified'}</p>
                <p>Food dislikes: {client.nutritionPreferences?.dislikes?.join(', ') || 'Not specified'}</p>
                <p>Food allergies: {client.nutritionPreferences?.allergies?.join(', ') || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
