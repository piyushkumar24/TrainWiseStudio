import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Users, ShoppingCart, Save } from 'lucide-react';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { ClientSelector } from '@/components/coach/program-builder/ClientSelector';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface FinalizeOptionsStepProps {
  programData: ProgramData | null;
  onFinalize: (data: any) => void;
}

export const FinalizeOptionsStep = ({ programData, onFinalize }: FinalizeOptionsStepProps) => {
  const isMobile = useIsMobile();
  const [selectedOption, setSelectedOption] = useState<'client' | 'shop' | 'save' | null>(null);
  const [showClientSelector, setShowClientSelector] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [price, setPrice] = useState('');

  const handleOptionSelect = (option: 'client' | 'shop' | 'save') => {
    setSelectedOption(option);
    if (option === 'client') {
      setShowClientSelector(true);
    }
  };

  const handleClientAssign = () => {
    onFinalize({
      type: 'client',
      clientId: selectedClient,
      personalMessage,
    });
  };

  const handleShopPublish = () => {
    onFinalize({
      type: 'shop',
      price: parseFloat(price),
    });
  };

  const handleSave = () => {
    onFinalize({
      type: 'save',
    });
  };

  const ClientSelectorComponent = () => (
    <>
      <div className="space-y-4">
        <ClientSelector
          selectedClient={selectedClient}
          onClientSelect={setSelectedClient}
        />
        
        <div>
          <Label htmlFor="message" className="text-sm font-medium">
            Personal Message (Optional)
          </Label>
          <Textarea
            id="message"
            placeholder="Add a personal message for your client..."
            value={personalMessage}
            onChange={(e) => setPersonalMessage(e.target.value)}
            className="mt-2"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setShowClientSelector(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleClientAssign}
            disabled={!selectedClient}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            Assign to Client
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎯 Finalize Your Program
        </h2>
        <p className="text-gray-600">
          Choose what you'd like to do with your program
        </p>
      </div>

      <div className="grid gap-4">
        {/* Assign to Client */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              Assign to Client
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Assign this program directly to one of your clients
            </p>
            <Button 
              onClick={() => handleOptionSelect('client')}
              className="w-full bg-blue-500 hover:bg-blue-600"
            >
              Select Client
            </Button>
          </CardContent>
        </Card>

        {/* Add to Shop */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 text-green-600" />
              </div>
              Add to Shop
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Make this program available for purchase in your shop
            </p>
            {selectedOption === 'shop' ? (
              <div className="space-y-3">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price ($)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="29.99"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedOption(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleShopPublish}
                    disabled={!price}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    Publish to Shop
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={() => handleOptionSelect('shop')}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Set Price & Publish
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Just Save */}
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-orange-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Save className="h-5 w-5 text-gray-600" />
              </div>
              Save to Library
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Save this program to your library as a complete program (not a draft)
            </p>
            <Button 
              onClick={handleSave}
              className="w-full bg-orange-500 hover:bg-orange-600"
            >
              Save Program
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Client Selector Modal/Drawer */}
      {isMobile ? (
        <Sheet open={showClientSelector} onOpenChange={setShowClientSelector}>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Select Client</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <ClientSelectorComponent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Dialog open={showClientSelector} onOpenChange={setShowClientSelector}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Select Client</DialogTitle>
            </DialogHeader>
            <ClientSelectorComponent />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
