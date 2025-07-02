
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface EmptyCartStateProps {
  onBrowseShop: () => void;
  onViewPlans: () => void;
}

export const EmptyCartState = ({ onBrowseShop, onViewPlans }: EmptyCartStateProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started with your wellness journey.</p>
          <div className="space-y-3">
            <Button 
              onClick={onBrowseShop} 
              className="w-full bg-[#FF6B2C] hover:bg-[#e55b22]"
            >
              Browse Shop
            </Button>
            <Button 
              onClick={onViewPlans} 
              variant="outline"
              className="w-full"
            >
              View Plans
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
