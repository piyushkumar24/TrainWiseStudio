
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag } from 'lucide-react';
import { ShopItem } from '@/pages/Shop';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface ItemDetailModalProps {
  item: ShopItem;
  isOpen: boolean;
  onClose: () => void;
  isCoach?: boolean;
}

export const ItemDetailModal = ({ item, isOpen, onClose, isCoach = false }: ItemDetailModalProps) => {
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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{item.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images */}
          <div className="space-y-4">
            {item.image_urls && item.image_urls.length > 0 ? (
              item.image_urls.length === 1 ? (
                <img 
                  src={item.image_urls[0]} 
                  alt={item.title}
                  className="w-full rounded-lg object-cover"
                />
              ) : (
                <Carousel className="w-full">
                  <CarouselContent>
                    {item.image_urls.map((url, index) => (
                      <CarouselItem key={index}>
                        <img 
                          src={url} 
                          alt={`${item.title} ${index + 1}`}
                          className="w-full rounded-lg object-cover"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              )
            ) : (
              <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className={getCategoryColor(item.category)}>
                {item.category}
              </Badge>
              <Badge variant="outline">
                {item.type}
              </Badge>
            </div>

            <div className="text-3xl font-bold text-[#FF6B2C]">
              {formatPrice(item.price)}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description || 'No description available'}
              </p>
            </div>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2 flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase Button - Only show for customers */}
            {!isCoach && (
              <div className="pt-4 border-t">
                <Button 
                  onClick={handlePurchase}
                  className="w-full bg-[#FF6B2C] hover:bg-[#e55b22] text-white py-3"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Purchase Now
                </Button>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
