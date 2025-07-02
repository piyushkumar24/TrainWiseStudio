
import React from 'react';
import { ShopItemCard } from './ShopItemCard';
import { ShopItem } from '@/pages/Shop';
import { Skeleton } from '@/components/ui/skeleton';

interface ShopGridProps {
  items: ShopItem[];
  loading: boolean;
  isCoach: boolean;
  onEditItem: (item: ShopItem) => void;
  onDeleteItem: (itemId: string) => void;
}

export const ShopGrid = ({ 
  items, 
  loading, 
  isCoach, 
  onEditItem, 
  onDeleteItem 
}: ShopGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <Skeleton className="w-full h-48 mb-4 rounded-lg" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-2" />
            <Skeleton className="h-3 w-full mb-3" />
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛍️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
        <p className="text-gray-600">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ShopItemCard
          key={item.id}
          item={item}
          isCoach={isCoach}
          onEdit={() => onEditItem(item)}
          onDelete={() => onDeleteItem(item.id)}
        />
      ))}
    </div>
  );
};
