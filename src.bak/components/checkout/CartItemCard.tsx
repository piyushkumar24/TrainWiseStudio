
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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

export const CartItemCard = ({ item, onUpdateQuantity, onRemoveItem, formatPrice }: CartItemCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        {item.type === 'plan' ? (
          // Plan Card
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {item.emoji && (
                  <div className="text-3xl">{item.emoji}</div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    {item.popular && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.price)}{item.duration && ` ${item.duration}`}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Remove
              </Button>
            </div>
            
            {item.features && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900 mb-2">Includes:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  {item.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                  {item.features.length > 3 && (
                    <li className="text-xs text-gray-500">
                      +{item.features.length - 3} more features
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          // Shop Item/Program Card
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.title}</h3>
              {item.category && (
                <p className="text-sm text-gray-600">{item.category}</p>
              )}
              <p className="text-lg font-bold text-[#FF6B2C] mt-1">
                {formatPrice(item.price)}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) - 1)}
                  className="h-8 w-8 p-0"
                  disabled={(item.quantity || 1) <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center text-sm font-medium">
                  {item.quantity || 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
              >
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
