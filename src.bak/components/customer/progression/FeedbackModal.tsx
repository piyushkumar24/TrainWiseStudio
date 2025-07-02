
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface Feedback {
  id: string;
  title: string;
  message: string;
  created_at: string;
  coach_name?: string;
}

interface FeedbackModalProps {
  feedback: Feedback;
  open: boolean;
  onClose: () => void;
}

export const FeedbackModal = ({ feedback, open, onClose }: FeedbackModalProps) => {
  const [reply, setReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleSubmitReply = async () => {
    if (!reply.trim()) return;

    setIsSubmitting(true);
    try {
      // Mock submission - replace with actual Supabase call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Reply sent",
        description: "Your reply has been sent to your coach.",
      });
      
      setReply('');
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reply. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">
          {feedback.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          {new Date(feedback.created_at).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
          {feedback.coach_name && (
            <Badge variant="outline" className="ml-2">
              Coach {feedback.coach_name}
            </Badge>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Message</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {feedback.message}
          </p>
        </div>
      </div>

      {/* Reply Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-900">Reply to Coach</h3>
        <Textarea
          placeholder="Type your reply here..."
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          rows={4}
          className="resize-none"
        />
        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleSubmitReply}
            disabled={!reply.trim() || isSubmitting}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Sending...' : 'Send Reply'}
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="sr-only">{feedback.title}</SheetTitle>
          </SheetHeader>
          {renderContent()}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{feedback.title}</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
