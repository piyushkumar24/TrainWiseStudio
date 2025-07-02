
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface CoachFeedbackModalProps {
  open: boolean;
  onClose: () => void;
  feedback: string | null;
}

export const CoachFeedbackModal = ({ open, onClose, feedback }: CoachFeedbackModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-600" />
            Coach Feedback
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {feedback ? (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  C
                </div>
                <div className="flex-1">
                  <p className="font-medium text-blue-900">Your Coach</p>
                  <p className="text-blue-800 mt-1">{feedback}</p>
                  <p className="text-xs text-blue-600 mt-2">2 hours ago</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No feedback yet</p>
              <p className="text-sm text-gray-500">
                Your coach will provide feedback as you progress
              </p>
            </div>
          )}
          
          <Button onClick={onClose} className="w-full">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
