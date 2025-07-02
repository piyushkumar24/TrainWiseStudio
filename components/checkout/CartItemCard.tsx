import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Minus, Plus, Star } from 'lucide-react';

interface CartItem {
  id: string;
  type: 'shop-item' | 'program' | 'plan';
  title: string;
  price: number;  
  image?: string;
  category?: string;
  quantity?: number;
  duration?: string;
  features?: string[];
  popular?: boolean;
  emoji?: string;
}

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  formatPrice: (price: number) => string;
}

export function CartItemCard({ item, onUpdateQuantity, onRemoveItem, formatPrice }: CartItemCardProps) {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            {item.category && (
              <p className="text-sm text-gray-500">{item.category}</p>
            )}
          </div>
          <div className="text-right">
            <p className="font-bold">${formatPrice(item.price)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => onRemoveItem(item.id)}>
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
