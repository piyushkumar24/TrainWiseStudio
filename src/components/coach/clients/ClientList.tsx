
import React from 'react';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ClientCard } from './ClientCard';
import { Client } from '@/types/client';

interface ClientListProps {
  clients: Client[];
  searchTerm: string;
  statusFilter: string;
}

export const ClientList = ({ clients, searchTerm, statusFilter }: ClientListProps) => {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {/* Empty State */}
      {clients.length === 0 && (
        <Card className="p-8 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No clients found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters.' 
                : 'Your clients will appear here once they sign up.'}
            </p>
          </div>
        </Card>
      )}
    </TooltipProvider>
  );
};
