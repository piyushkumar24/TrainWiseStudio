import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { ChevronDown, StickyNote, Star, Calendar, Save } from 'lucide-react';
import { Client } from '@/types/client';
import { useToast } from '@/hooks/use-toast';

interface CoachNotesProps {
  client: Client;
}

export const CoachNotes = ({ client }: CoachNotesProps) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const [notes, setNotes] = useState('');
  const [followUpDays, setFollowUpDays] = useState('7');
  const [markForAttention, setMarkForAttention] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    // Here you would save to the database
    console.log('Saving notes:', {
      clientId: client.id,
      notes,
      followUpDays,
      markForAttention
    });
    
    toast({
      title: "Notes saved",
      description: "Your coach notes have been saved successfully.",
    });
  };

  const calculateFollowUpDate = () => {
    const days = parseInt(followUpDays) || 7;
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-white rounded-xl shadow-md">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-3">
            <StickyNote className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-900">💬 Coach Notes & Follow-up</h3>
            <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
              Internal Only
            </div>
          </div>
          <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        
        <CollapsibleContent className="overflow-hidden transition-all duration-200">
          <div className="px-6 pb-6 space-y-4">
            {/* Notes Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <Textarea
                placeholder="Add your private notes about this client..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Follow-up Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up reminder
                </label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="7"
                    value={followUpDays}
                    onChange={(e) => setFollowUpDays(e.target.value)}
                    className="w-20"
                    min="1"
                    max="365"
                  />
                  <span className="text-sm text-gray-600">days</span>
                </div>
                {followUpDays && (
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Follow up on {calculateFollowUpDate()}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={markForAttention}
                    onCheckedChange={setMarkForAttention}
                  />
                  <div className="flex items-center gap-2">
                    <Star className={`h-4 w-4 ${markForAttention ? 'text-yellow-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-gray-700">Mark for attention</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4 border-t border-gray-200">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Notes
              </Button>
            </div>

            {/* Existing Notes Preview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Notes</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="border-l-4 border-orange-200 pl-3">
                  <p className="font-medium">Jan 15, 2024</p>
                  <p>Client showing excellent progress. Increased weights in compound movements.</p>
                </div>
                <div className="border-l-4 border-blue-200 pl-3">
                  <p className="font-medium">Jan 8, 2024</p>
                  <p>Discussed nutrition goals. Client interested in meal prep guidance.</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};
