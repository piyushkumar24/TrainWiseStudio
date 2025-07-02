
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Heart, Plus, Image, X, Trash2, ChevronDown, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

interface MotivationalCard {
  id: string;
  message: string;
  imageUrl?: string;
  createdAt: string;
}

// Mock data for demonstration
const mockCards: MotivationalCard[] = [
  {
    id: '1',
    message: 'You are stronger than you think! Every workout brings you closer to your goals. 💪',
    imageUrl: '/api/placeholder/300/200',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    message: 'Progress, not perfection. Celebrate small wins and keep moving forward! 🌟',
    createdAt: '2024-01-14'
  }
];

export const MotivationalCardsSection = () => {
  const [cards, setCards] = useState<MotivationalCard[]>(mockCards);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    image: null as File | null
  });
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/')) {
        setFormData(prev => ({ ...prev, image: selectedFile }));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.).",
          variant: "destructive",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a motivational message.",
        variant: "destructive",
      });
      return;
    }

    if (formData.message.length > 160) {
      toast({
        title: "Message too long",
        description: "Please keep your message under 160 characters.",
        variant: "destructive",
      });
      return;
    }

    const newCard: MotivationalCard = {
      id: Date.now().toString(),
      message: formData.message,
      imageUrl: formData.image ? URL.createObjectURL(formData.image) : undefined,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCards(prev => [newCard, ...prev]);
    toast({
      title: "Card created",
      description: "New motivational card has been created successfully.",
    });

    // Reset form
    setFormData({ message: '', image: null });
  };

  const handleDelete = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
    toast({
      title: "Card deleted",
      description: "Motivational card has been deleted.",
    });
  };

  const clearFile = () => setFormData(prev => ({ ...prev, image: null }));

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between cursor-pointer group">
              <CardTitle className="flex items-center gap-2">
                💬 Motivational Cards
              </CardTitle>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent className="animate-accordion-down data-[state=closed]:animate-accordion-up">
          <CardContent className="space-y-6">
            {/* Info Banner */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800 leading-relaxed">
                These cards are sent daily at 5:00 AM in each client's local timezone. 
                They are randomized and never repeated two days in a row.
              </p>
            </div>

            {/* Add Card Form */}
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Motivational Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Write an inspiring message for your clients..."
                      className="resize-none"
                      rows={3}
                      maxLength={160}
                    />
                    <div className="text-xs text-gray-500 text-right">
                      {formData.message.length}/160
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Optional Image</Label>
                    {!formData.image ? (
                      <div className="relative">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <Image className="h-4 w-4 mr-2" />
                          Upload Image
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 p-2 bg-white rounded border">
                        <Image className="h-4 w-4" />
                        <span className="text-sm truncate flex-1">{formData.image.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={clearFile}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF6B2C] hover:bg-[#e55b22]"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Save Card
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Cards List */}
            <div className="space-y-3">
              {cards.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Heart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No motivational cards created yet.</p>
                  <p className="text-sm">Create your first card to inspire your clients!</p>
                </div>
              ) : (
                cards.map((card) => (
                  <Card key={card.id} className="transition-all hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        {card.imageUrl && (
                          <div className="flex-shrink-0">
                            <img 
                              src={card.imageUrl} 
                              alt="Card image" 
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 mb-2 leading-relaxed">
                            {card.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              Created {card.createdAt}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(card.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
