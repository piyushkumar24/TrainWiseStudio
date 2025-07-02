
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  formatPrice: (price: number) => string;
  onConfirmPayment: () => void;
  isLoading: boolean;
}

export const OrderSummary = ({ 
  subtotal, 
  discount, 
  total, 
  formatPrice, 
  onConfirmPayment, 
  isLoading 
}: OrderSummaryProps) => {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-lg">Order Total</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatPrice(subtotal)}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount</span>
              <span className="font-medium text-green-600">-{formatPrice(discount)}</span>
            </div>
          )}
          
          <Separator />
          
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-[#FF6B2C]">{formatPrice(total)}</span>
          </div>
        </div>

        <div className="pt-4 space-y-3">
          <p className="text-xs text-gray-500 text-center">
            Secure checkout powered by Stripe
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
