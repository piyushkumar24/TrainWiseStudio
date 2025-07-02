
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Program } from '@/hooks/useProgramList';

interface ShopProgramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onPublish: (programId: string, price: number) => Promise<void>;
}

export const ShopProgramModal = ({ open, onOpenChange, program, onPublish }: ShopProgramModalProps) => {
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    if (!program || !price) return;

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setIsLoading(true);
    try {
      await onPublish(program.id, priceNumber);
      onOpenChange(false);
      setPrice('');
    } catch (error) {
      console.error('Error publishing program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setPrice('');
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Program to Shop</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">{program.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{program.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-8"
                min="0"
                step="0.01"
              />
            </div>
            <p className="text-xs text-gray-500">
              Set the price for your program. This will be visible to customers in your shop.
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!price || isLoading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isLoading ? 'Publishing...' : 'Publish to Shop'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
