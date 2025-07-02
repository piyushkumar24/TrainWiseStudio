
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Send, FileText, Heart, Filter } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface DeliveryLog {
  id: string;
  clientName: string;
  clientEmail: string;
  fileTitle: string;
  type: 'file' | 'card';
  triggeredBy: string;
  sentDate: string;
  status: 'sent' | 'failed' | 'pending';
}

// Mock data for demonstration
const mockDeliveryLogs: DeliveryLog[] = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah@example.com',
    fileTitle: 'Welcome Package',
    type: 'file',
    triggeredBy: 'Onboarding Completed',
    sentDate: '2024-01-15 09:30',
    status: 'sent'
  },
  {
    id: '2',
    clientName: 'Mike Chen',
    clientEmail: 'mike@example.com',
    fileTitle: 'You are stronger than you think!',
    type: 'card',
    triggeredBy: 'Daily Motivation',
    sentDate: '2024-01-15 08:00',
    status: 'sent'
  },
  {
    id: '3',
    clientName: 'Emma Davis',
    clientEmail: 'emma@example.com',
    fileTitle: 'First Program Guide',
    type: 'file',
    triggeredBy: 'First Program Assigned',
    sentDate: '2024-01-14 14:22',
    status: 'sent'
  },
  {
    id: '4',
    clientName: 'Alex Rodriguez',
    clientEmail: 'alex@example.com',
    fileTitle: 'Reactivation Offer',
    type: 'file',
    triggeredBy: 'Subscription Ended',
    sentDate: '2024-01-14 10:15',
    status: 'failed'
  }
];

export const DeliveryOverviewSection = () => {
  const [logs, setLogs] = useState<DeliveryLog[]>(mockDeliveryLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'file' | 'card'>('all');
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.fileTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleSendAgain = (logId: string) => {
    const log = logs.find(l => l.id === logId);
    if (log) {
      toast({
        title: "Resending...",
        description: `Sending "${log.fileTitle}" to ${log.clientName} again.`,
      });
      
      // Update status to pending
      setLogs(prev => prev.map(l => 
        l.id === logId ? { ...l, status: 'pending' as const } : l
      ));
      
      // Simulate sending
      setTimeout(() => {
        setLogs(prev => prev.map(l => 
          l.id === logId ? { ...l, status: 'sent' as const, sentDate: new Date().toLocaleString() } : l
        ));
        toast({
          title: "Sent successfully",
          description: `"${log.fileTitle}" has been sent to ${log.clientName}.`,
        });
      }, 2000);
    }
  };

  const getStatusBadge = (status: DeliveryLog['status']) => {
    const variants = {
      sent: { variant: 'default' as const, className: 'bg-green-100 text-green-800', text: 'Sent' },
      failed: { variant: 'destructive' as const, className: 'bg-red-100 text-red-800', text: 'Failed' },
      pending: { variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800', text: 'Pending' }
    };
    const config = variants[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.text}
      </Badge>
    );
  };

  const getTypeIcon = (type: DeliveryLog['type']) => {
    return type === 'file' ? <FileText className="h-4 w-4" /> : <Heart className="h-4 w-4" />;
  };

  if (isMobile) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Sent File Logs
          </CardTitle>
          
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients or files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
                className="flex-1"
              >
                All
              </Button>
              <Button
                variant={typeFilter === 'file' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('file')}
                className="flex-1"
              >
                <FileText className="h-3 w-3 mr-1" />
                Files
              </Button>
              <Button
                variant={typeFilter === 'card' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('card')}
                className="flex-1"
              >
                <Heart className="h-3 w-3 mr-1" />
                Cards
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No delivery logs found.</p>
                <p className="text-sm">Files and cards sent to clients will appear here.</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <Card key={log.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getTypeIcon(log.type)}
                            <span className="font-medium text-sm">{log.fileTitle}</span>
                          </div>
                          <p className="text-sm text-gray-600">{log.clientName}</p>
                          <p className="text-xs text-gray-500">{log.clientEmail}</p>
                        </div>
                        {getStatusBadge(log.status)}
                      </div>
                      
                      <div className="text-xs text-gray-500 space-y-1">
                        <div>Triggered by: {log.triggeredBy}</div>
                        <div>Sent: {log.sentDate}</div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleSendAgain(log.id)}
                        className="w-full"
                        disabled={log.status === 'pending'}
                      >
                        <Send className="h-3 w-3 mr-2" />
                        {log.status === 'pending' ? 'Sending...' : 'Send Again'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            📊 Sent File Logs
          </span>
        </CardTitle>
        
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients or files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={typeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('all')}
            >
              All
            </Button>
            <Button
              variant={typeFilter === 'file' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('file')}
            >
              <FileText className="h-3 w-3 mr-1" />
              Files
            </Button>
            <Button
              variant={typeFilter === 'card' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTypeFilter('card')}
            >
              <Heart className="h-3 w-3 mr-1" />
              Cards
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No delivery logs found.</p>
            <p className="text-sm">Files and cards sent to clients will appear here.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>File/Card</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Triggered By</TableHead>
                <TableHead>Sent Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{log.clientName}</div>
                      <div className="text-sm text-gray-500">{log.clientEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <span className="text-sm">{log.fileTitle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{log.triggeredBy}</TableCell>
                  <TableCell className="text-sm">{log.sentDate}</TableCell>
                  <TableCell>{getStatusBadge(log.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSendAgain(log.id)}
                      disabled={log.status === 'pending'}
                    >
                      <Send className="h-3 w-3 mr-1" />
                      {log.status === 'pending' ? 'Sending...' : 'Send Again'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
