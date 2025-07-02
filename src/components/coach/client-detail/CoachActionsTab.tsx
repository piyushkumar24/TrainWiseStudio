
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Calendar, 
  FileText, 
  Send, 
  Clock,
  CheckCircle 
} from 'lucide-react';
import { EnhancedClientDetail } from '@/hooks/useEnhancedClientDetail';

interface CoachActionsTabProps {
  client: EnhancedClientDetail;
  onSendFeedback: (message: string, type: string) => void;
  onScheduleFollowUp: (title: string, dueDate: string, notes?: string) => void;
  onAssignProgram: () => void;
}

export const CoachActionsTab = ({ 
  client, 
  onSendFeedback, 
  onScheduleFollowUp, 
  onAssignProgram 
}: CoachActionsTabProps) => {
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('general');
  const [followUpTitle, setFollowUpTitle] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [isSubmittingFollowUp, setIsSubmittingFollowUp] = useState(false);

  const handleSendFeedback = async () => {
    if (!feedbackMessage.trim()) return;
    
    setIsSubmittingFeedback(true);
    try {
      await onSendFeedback(feedbackMessage, feedbackType);
      setFeedbackMessage('');
      setFeedbackType('general');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const handleScheduleFollowUp = async () => {
    if (!followUpTitle.trim() || !followUpDate) return;
    
    setIsSubmittingFollowUp(true);
    try {
      await onScheduleFollowUp(followUpTitle, followUpDate, followUpNotes);
      setFollowUpTitle('');
      setFollowUpDate('');
      setFollowUpNotes('');
    } finally {
      setIsSubmittingFollowUp(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getFollowUpStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button 
              onClick={onAssignProgram}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Assign Program
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              View Messages
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Session
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Send Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-orange-500" />
            Send Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <select
              id="feedback-type"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="general">General Feedback</option>
              <option value="encouragement">Encouragement</option>
              <option value="correction">Form Correction</option>
              <option value="progress">Progress Update</option>
              <option value="motivation">Motivation</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="feedback-message">Message</Label>
            <Textarea
              id="feedback-message"
              placeholder="Write your feedback message here..."
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              rows={4}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleSendFeedback}
            disabled={!feedbackMessage.trim() || isSubmittingFeedback}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmittingFeedback ? 'Sending...' : 'Send Feedback'}
          </Button>
        </CardContent>
      </Card>

      {/* Schedule Follow-up */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-orange-500" />
            Schedule Follow-up
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="followup-title">Follow-up Title</Label>
            <Input
              id="followup-title"
              placeholder="e.g., Check progress on weight loss goal"
              value={followUpTitle}
              onChange={(e) => setFollowUpTitle(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="followup-date">Due Date</Label>
            <Input
              id="followup-date"
              type="datetime-local"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="followup-notes">Notes (Optional)</Label>
            <Textarea
              id="followup-notes"
              placeholder="Additional notes for this follow-up..."
              value={followUpNotes}
              onChange={(e) => setFollowUpNotes(e.target.value)}
              rows={2}
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={handleScheduleFollowUp}
            disabled={!followUpTitle.trim() || !followUpDate || isSubmittingFollowUp}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {isSubmittingFollowUp ? 'Scheduling...' : 'Schedule Follow-up'}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback Sent</CardTitle>
        </CardHeader>
        <CardContent>
          {client.recentFeedback.length === 0 ? (
            <div className="text-center py-6">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No feedback sent yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.recentFeedback.slice(0, 3).map((feedback) => (
                <div key={feedback.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {feedback.feedback_type}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {formatDate(feedback.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 line-clamp-2">
                    {feedback.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Follow-ups */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Follow-ups</CardTitle>
        </CardHeader>
        <CardContent>
          {client.followUps.length === 0 ? (
            <div className="text-center py-6">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No follow-ups scheduled</p>
            </div>
          ) : (
            <div className="space-y-3">
              {client.followUps.slice(0, 3).map((followUp) => (
                <div key={followUp.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{followUp.title}</p>
                    <p className="text-sm text-gray-600">
                      Due: {formatDate(followUp.due_date)}
                    </p>
                    {followUp.notes && (
                      <p className="text-xs text-gray-500 mt-1">{followUp.notes}</p>
                    )}
                  </div>
                  <Badge className={getFollowUpStatusColor(followUp.status)}>
                    {followUp.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                    {followUp.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
