
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { Program } from '@/hooks/useProgramList';

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface AssignProgramModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  program: Program | null;
  onAssign: (programId: string, clientId: string, personalMessage?: string) => Promise<void>;
}

export const AssignProgramModal = ({ open, onOpenChange, program, onAssign }: AssignProgramModalProps) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState('');
  const [personalMessage, setPersonalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchClients();
    }
  }, [open]);

  const fetchClients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get client IDs from requests that have been assigned programs by this coach
      const { data: assignments, error: assignmentsError } = await supabase
        .from('program_assignments')
        .select('client_id')
        .eq('assigned_by', user.id);

      if (assignmentsError) throw assignmentsError;

      if (!assignments || assignments.length === 0) {
        setClients([]);
        return;
      }

      // Get client profiles for the assigned clients
      const clientIds = [...new Set(assignments.map(assignment => assignment.client_id))];
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email')
        .in('id', clientIds);

      if (profilesError) throw profilesError;

      const clientsData = profiles.map(profile => ({
        id: profile.id,
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        email: profile.email,
      }));

      setClients(clientsData);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setClients([]);
    }
  };

  const handleAssign = async () => {
    if (!program || !selectedClientId) return;

    setIsLoading(true);
    try {
      await onAssign(program.id, selectedClientId, personalMessage || undefined);
      onOpenChange(false);
      setSelectedClientId('');
      setPersonalMessage('');
    } catch (error) {
      console.error('Error assigning program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    setSelectedClientId('');
    setPersonalMessage('');
  };

  if (!program) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Program to Client</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900">{program.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{program.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Select Client</Label>
            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a client..." />
              </SelectTrigger>
              <SelectContent>
                {clients.length === 0 ? (
                  <div className="p-2 text-sm text-gray-500">No clients available</div>
                ) : (
                  clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.first_name} {client.last_name} ({client.email})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message for your client..."
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              rows={3}
            />
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
              onClick={handleAssign}
              disabled={!selectedClientId || isLoading}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isLoading ? 'Assigning...' : 'Assign Program'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
