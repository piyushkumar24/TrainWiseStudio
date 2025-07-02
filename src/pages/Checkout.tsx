
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CartItemCard } from '@/components/checkout/CartItemCard';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { EmptyCartState } from '@/components/checkout/EmptyCartState';

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

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [discount] = useState(50); // Dummy discount
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock cart data - in real app this would come from context/state
  useEffect(() => {
    // Simulate different cart scenarios
    const mockCartItems: CartItem[] = [
      {
        id: '1',
        type: 'shop-item',
        title: 'Premium Resistance Band',
        price: 299,
        image: '/placeholder.svg',
        category: 'Fitness Equipment',
        quantity: 1,
      },
      {
        id: '2',
        type: 'program',
        title: 'Full Body Fat Burn Program',
        price: 399,
        image: '/placeholder.svg',
        category: 'Fitness Program',
        quantity: 1,
      }
    ];

    // Uncomment one of these to test different scenarios:
    setCartItems(mockCartItems);
    
    // Test with plan:
    // setCartItems([{
    //   id: 'premium-plan',
    //   type: 'plan',
    //   title: 'Premium Subscription',
    //   price: 299,
    //   duration: 'per month',
    //   emoji: '👑',
    //   popular: true,
    //   features: [
    //     'All 3 programs per month',
    //     'Fitness + Nutrition + Mental Health',
    //     'Full platform access',
    //     'Personal coach feedback',
    //     'Priority support'
    //   ]
    // }]);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('no-NO', {
      style: 'currency',
      currency: 'NOK',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const total = subtotal - discount;

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const handleConfirmPayment = async () => {
    setIsLoading(true);
    try {
      // Placeholder for Stripe checkout integration
      toast({
        title: "Redirecting to Payment",
        description: "You'll be redirected to secure checkout...",
      });
      
      // TODO: Integrate with Stripe checkout
      console.log('Proceeding to payment with items:', cartItems);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to proceed to payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    const hasPlans = cartItems.some(item => item.type === 'plan');
    if (hasPlans) {
      navigate('/dashboard/plan');
    } else {
      navigate('/dashboard/shop');
    }
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <EmptyCartState
        onBrowseShop={() => navigate('/dashboard/shop')}
        onViewPlans={() => navigate('/dashboard/plan')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleGoBack}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-600">Review your order</p>
            </div>
          </div>
          <Badge variant="outline" className="hidden sm:flex">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-32 md:pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                formatPrice={formatPrice}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              formatPrice={formatPrice}
              onConfirmPayment={handleConfirmPayment}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-20">
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold text-[#FF6B2C]">{formatPrice(total)}</span>
        </div>
        <Button 
          onClick={handleConfirmPayment}
          disabled={isLoading}
          className="w-full bg-[#FF6B2C] hover:bg-[#e55b22] py-3 font-semibold"
          size="lg"
        >
          {isLoading ? 'Processing...' : 'Confirm & Pay'}
        </Button>
      </div>

      {/* Desktop Confirm Button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-20">
        <Button 
          onClick={handleConfirmPayment}
          disabled={isLoading}
          className="bg-[#FF6B2C] hover:bg-[#e55b22] px-8 py-3 font-semibold shadow-lg"
          size="lg"
        >
          {isLoading ? 'Processing...' : 'Confirm & Pay'}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
