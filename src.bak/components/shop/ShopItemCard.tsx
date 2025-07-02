
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreVertical, Eye, Edit, Trash2, ShoppingCart } from 'lucide-react';
import { ShopItem } from '@/pages/Shop';
import { ItemDetailModal } from './ItemDetailModal';

interface ShopItemCardProps {
  item: ShopItem;
  isCoach: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export const ShopItemCard = ({ item, isCoach, onEdit, onDelete }: ShopItemCardProps) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const navigate = useNavigate();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Fitness': return 'bg-blue-100 text-blue-800';
      case 'Nutrition': return 'bg-green-100 text-green-800';
      case 'Mental Health': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePurchase = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Card className="group hover:shadow-lg transition-shadow duration-200">
        <CardContent className="p-0">
          {/* Image */}
          <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden relative">
            {item.image_urls && item.image_urls.length > 0 ? (
              <img 
                src={item.image_urls[0]} 
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <ShoppingCart className="h-12 w-12" />
              </div>
            )}
            
            {/* Coach Actions Only */}
            {isCoach && (
              <div className="absolute top-2 right-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={onDelete}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
                {item.title}
              </h3>
              <Badge className={getCategoryColor(item.category)}>
                {item.category}
              </Badge>
            </div>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {item.description || 'No description available'}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#FF6B2C]">
                  {formatPrice(item.price)}
                </span>
                {isCoach && (
                  <span className="text-xs text-gray-500">
                    {item.purchase_count} purchases
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsDetailModalOpen(true)}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                
                {/* Customer Purchase Button */}
                {!isCoach && (
                  <Button 
                    onClick={handlePurchase}
                    className="bg-[#FF6B2C] hover:bg-[#e55b22]"
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy
                  </Button>
                )}
              </div>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{item.tags.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <ItemDetailModal
        item={item}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        isCoach={isCoach}
      />
    </>
  );
};
