
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

interface ClientSelectorProps {
  selectedClient: string;
  onClientSelect: (clientId: string) => void;
}

export const ClientSelector = ({ selectedClient, onClientSelect }: ClientSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoading(true);
        
        // First get customer user IDs from user_roles
        const { data: customerRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('user_id')
          .eq('role', 'customer');

        if (rolesError) throw rolesError;

        if (!customerRoles || customerRoles.length === 0) {
          setClients([]);
          return;
        }

        const customerIds = customerRoles.map(role => role.user_id);

        // Then get profiles for those customer IDs
        const { data: customerProfiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', customerIds);

        if (profilesError) throw profilesError;

        setClients(customerProfiles || []);
      } catch (error) {
        console.error('Error fetching clients:', error);
        toast({
          title: "Error",
          description: "Failed to load clients",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClients();
  }, [toast]);

  const filteredClients = clients.filter(client => {
    const fullName = `${client.first_name || ''} ${client.last_name || ''}`.toLowerCase();
    const email = client.email.toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || email.includes(search);
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-2">
          <div className="h-10 bg-gray-200 rounded"></div>
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search clients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {filteredClients.map((client) => {
          const fullName = `${client.first_name || ''} ${client.last_name || ''}`.trim() || 'Unnamed Client';
          
          return (
            <Card 
              key={client.id}
              className={`cursor-pointer transition-colors ${
                selectedClient === client.id 
                  ? 'border-orange-500 bg-orange-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onClientSelect(client.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <User className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{fullName}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </div>
                  {selectedClient === client.id && (
                    <div className="text-orange-500 font-medium">✓</div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredClients.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          No clients found matching your search
        </div>
      )}
    </div>
  );
};
