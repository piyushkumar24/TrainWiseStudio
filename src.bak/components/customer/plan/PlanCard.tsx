
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  emoji: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular: boolean;
}

interface PlanCardProps {
  plan: Plan;
  onSelect: () => void;
  isSelected: boolean;
}

export const PlanCard = ({ plan, onSelect, isSelected }: PlanCardProps) => {
  return (
    <Card className={`relative transition-all duration-200 hover:shadow-lg ${
      plan.popular 
        ? 'border-orange-300 bg-gradient-to-b from-orange-50 to-white shadow-md' 
        : 'border-gray-200 hover:border-orange-200'
    } ${
      isSelected ? 'ring-2 ring-orange-500 border-orange-300' : ''
    }`}>
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-orange-500 text-white px-3 py-1 flex items-center gap-1">
            <Star className="h-3 w-3 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="text-4xl mb-2">{plan.emoji}</div>
        <CardTitle className="text-xl font-bold text-gray-900 mb-1">
          {plan.name}
        </CardTitle>
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {plan.price}
          </div>
          <div className="text-sm text-gray-600">
            {plan.duration}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {plan.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={onSelect}
          className={`w-full transition-colors ${
            plan.popular
              ? 'bg-orange-500 hover:bg-orange-600 text-white'
              : 'bg-gray-900 hover:bg-gray-800 text-white'
          } ${
            isSelected ? 'bg-orange-600' : ''
          }`}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
        
        {plan.id === 'otp' && (
          <p className="text-xs text-gray-500 text-center">
            * Choose your category after payment
          </p>
        )}
      </CardContent>
    </Card>
  );
};
