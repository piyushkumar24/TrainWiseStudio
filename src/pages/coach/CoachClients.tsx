
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Users, AlertTriangle, CheckCircle, Clock, UserX, UserPlus, Target, Calendar } from 'lucide-react';
import { ClientSummaryCards } from '@/components/coach/clients/ClientSummaryCards';
import { ClientFilterTabs } from '@/components/coach/clients/ClientFilterTabs';
import { ClientList } from '@/components/coach/clients/ClientList';
import { LoadingState } from '@/components/coach/clients/LoadingState';
import { useClientData } from '@/hooks/useClientData';
import { Client, FilterOption } from '@/types/client';

const CoachClients = () => {
  const { clients, isLoading } = useClientData();
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    let filtered = clients;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      if (statusFilter === 'urgent') {
        filtered = filtered.filter(client => 
          ['missing-program', 'needs-follow-up', 'program-expired'].includes(client.status)
        );
      } else if (statusFilter === 'active') {
        filtered = filtered.filter(client => 
          ['on-track', 'new-comer'].includes(client.status)
        );
      } else if (statusFilter === 'check-in') {
        filtered = filtered.filter(client => 
          ['waiting-feedback', 'off-track'].includes(client.status)
        );
      } else if (statusFilter === 'inactive') {
        filtered = filtered.filter(client => 
          ['leaver', 'non-active'].includes(client.status)
        );
      } else {
        filtered = filtered.filter(client => client.status === statusFilter);
      }
    }

    setFilteredClients(filtered);
  }, [clients, searchTerm, statusFilter]);

  const getSummaryStats = () => {
    const urgentClients = clients.filter(c => 
      ['missing-program', 'needs-follow-up', 'program-expired'].includes(c.status)
    );
    
    const checkInClients = clients.filter(c => 
      ['waiting-feedback', 'off-track'].includes(c.status)
    );
    
    const activeClients = clients.filter(c => 
      ['on-track', 'new-comer'].includes(c.status)
    );

    return {
      urgent: urgentClients.length,
      active: activeClients.length,
      total: clients.length,
      checkIn: checkInClients.length
    };
  };

  const stats = getSummaryStats();

  const filterOptions: FilterOption[] = [
    { 
      key: 'all', 
      label: 'All Clients', 
      icon: Users, 
      count: clients.length,
      color: 'text-gray-600'
    },
    { 
      key: 'missing-program', 
      label: 'Missing Program', 
      icon: AlertTriangle, 
      count: clients.filter(c => c.status === 'missing-program').length,
      color: 'text-red-600'
    },
    { 
      key: 'on-track', 
      label: 'On Track', 
      icon: CheckCircle, 
      count: clients.filter(c => c.status === 'on-track').length,
      color: 'text-green-600'
    },
    { 
      key: 'waiting-feedback', 
      label: 'Waiting Feedback', 
      icon: Clock, 
      count: clients.filter(c => c.status === 'waiting-feedback').length,
      color: 'text-orange-600'
    },
    { 
      key: 'off-track', 
      label: 'Off Track', 
      icon: Target, 
      count: clients.filter(c => c.status === 'off-track').length,
      color: 'text-orange-600'
    },
    { 
      key: 'new-comer', 
      label: 'New Comer', 
      icon: UserPlus, 
      count: clients.filter(c => c.status === 'new-comer').length,
      color: 'text-green-600'
    },
    { 
      key: 'program-expired', 
      label: 'Program Expired', 
      icon: Calendar, 
      count: clients.filter(c => c.status === 'program-expired').length,
      color: 'text-red-600'
    },
    { 
      key: 'leaver', 
      label: 'Leaver', 
      icon: UserX, 
      count: clients.filter(c => c.status === 'leaver').length,
      color: 'text-gray-600'
    },
    { 
      key: 'non-active', 
      label: 'Non Active', 
      icon: UserX, 
      count: clients.filter(c => c.status === 'non-active').length,
      color: 'text-gray-600'
    }
  ];

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Clients</h1>

      <ClientSummaryCards 
        urgent={stats.urgent}
        active={stats.active}
        total={stats.total}
        checkIn={stats.checkIn}
        setStatusFilter={setStatusFilter}
      />

      <div className="mb-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          <Input
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm focus:ring-2"
          />
        </div>
      </div>

      <ClientFilterTabs 
        filterOptions={filterOptions}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ClientList 
        clients={filteredClients}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default CoachClients;
