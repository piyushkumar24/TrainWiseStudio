import React, { useState } from 'react';
import { Search, Plus, Eye, Edit, Calendar, Trash2, Copy } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useProgramList, Program } from '@/hooks/useProgramList';
import { AssignProgramModal } from './AssignProgramModal';
import { ShopProgramModal } from './ShopProgramModal';
import { SmartProgramActions } from './SmartProgramActions';

interface ProgramListViewProps {
  onCreateProgram: () => void;
  onViewProgram: (program: Program) => void;
  onEditProgram: (program: Program) => void;
  onScheduleProgram: (program: Program) => void;
  onRemoveProgram: (program: Program) => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'fitness': return '🏋️';
    case 'nutrition': return '🥗';
    case 'mental': return '🧘';
    default: return '📋';
  }
};

const getStateBadge = (program: Program) => {
  switch (program.state) {
    case 'draft':
      return <Badge variant="outline" className="bg-gray-100 text-gray-700">📝 Draft</Badge>;
    case 'saved':
      return <Badge variant="outline" className="bg-green-100 text-green-700">✅ Saved</Badge>;
    case 'assigned':
      return <Badge variant="outline" className="bg-orange-100 text-orange-700">👤 Assigned</Badge>;
    case 'in_shop':
      return <Badge variant="outline" className="bg-blue-100 text-blue-700">🛒 In Shop</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export const ProgramListView = ({
  onCreateProgram,
  onViewProgram,
  onEditProgram,
  onScheduleProgram,
  onRemoveProgram
}: ProgramListViewProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stateFilter, setStateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated_at');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const { 
    programs, 
    isLoading, 
    error, 
    deleteProgram, 
    assignToClient, 
    publishToShop, 
    duplicateProgram,
    updateProgramState
  } = useProgramList();

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesState = stateFilter === 'all' || program.state === stateFilter;
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    
    return matchesSearch && matchesState && matchesCategory;
  });

  const sortedPrograms = [...filteredPrograms].sort((a, b) => {
    switch (sortBy) {
      case 'created_at':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'assigned_at':
        if (!a.assigned_at && !b.assigned_at) return 0;
        if (!a.assigned_at) return 1;
        if (!b.assigned_at) return -1;
        return new Date(b.assigned_at).getTime() - new Date(a.assigned_at).getTime();
      case 'in_shop_at':
        if (!a.in_shop_at && !b.in_shop_at) return 0;
        if (!a.in_shop_at) return 1;
        if (!b.in_shop_at) return -1;
        return new Date(b.in_shop_at).getTime() - new Date(a.in_shop_at).getTime();
      default:
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    }
  });

  const handleAssignProgram = (program: Program) => {
    if (program.state !== 'saved') return;
    setSelectedProgram(program);
    setAssignModalOpen(true);
  };

  const handlePublishToShop = (program: Program) => {
    if (program.state !== 'saved') return;
    setSelectedProgram(program);
    setShopModalOpen(true);
  };

  const handleRemoveFromShop = async (programId: string) => {
    await updateProgramState(programId, 'saved');
  };

  const handleUnassignProgram = async (programId: string) => {
    // TODO: Add expiration check logic here
    await updateProgramState(programId, 'saved');
  };

  const handleDeleteProgram = async (program: Program) => {
    if (program.state === 'assigned' || program.state === 'in_shop') {
      alert('Cannot delete an active program');
      return;
    }
    if (confirm(`Are you sure you want to delete "${program.title}"?`)) {
      await deleteProgram(program.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Error loading programs: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Program Builder</h1>
          <p className="text-gray-600 mt-1">Manage your fitness, nutrition, and mental health programs.</p>
        </div>
        
        {/* Desktop Create Button */}
        <div className="hidden lg:block">
          <Button 
            onClick={onCreateProgram}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Program
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              <SelectItem value="draft">Drafts</SelectItem>
              <SelectItem value="saved">Saved</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_shop">In Shop</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fitness">🏋️ Fitness</SelectItem>
              <SelectItem value="nutrition">🥗 Nutrition</SelectItem>
              <SelectItem value="mental">🧘 Mental Health</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated_at">Updated</SelectItem>
              <SelectItem value="created_at">Created</SelectItem>
              <SelectItem value="assigned_at">Assigned</SelectItem>
              <SelectItem value="in_shop_at">Shop Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Programs List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {sortedPrograms.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {programs.length === 0 ? (
              <div>
                <div className="text-6xl mb-4">🏋️</div>
                <p className="mb-4">No programs yet. Create your first program to get started!</p>
                <Button onClick={onCreateProgram} className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Program
                </Button>
              </div>
            ) : (
              'No programs found matching your criteria.'
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Program</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">State</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Details</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPrograms.map((program) => (
                    <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <h3 className="font-medium text-gray-900">{program.title}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {program.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-2xl">{getCategoryIcon(program.category)}</span>
                      </td>
                      <td className="py-4 px-4">
                        {getStateBadge(program)}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">
                        {program.state === 'assigned' && (
                          <div>
                            <div>Assigned to: {program.client_name || 'Unknown'}</div>
                            <div>Date: {program.assigned_at ? new Date(program.assigned_at).toLocaleDateString() : 'Unknown'}</div>
                          </div>
                        )}
                        {program.state === 'in_shop' && (
                          <div>
                            <div>${program.in_shop_price || 0}</div>
                            <div>Listed: {program.in_shop_at ? new Date(program.in_shop_at).toLocaleDateString() : 'Unknown'}</div>
                          </div>
                        )}
                        {(program.state === 'draft' || program.state === 'saved') && (
                          <div className="text-gray-500">
                            {program.weeks_count || 0} weeks • Created: {new Date(program.created_at).toLocaleDateString()}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onViewProgram(program)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => onEditProgram(program)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <SmartProgramActions
                            program={program}
                            onView={onViewProgram}
                            onEdit={onEditProgram}
                            onDuplicate={duplicateProgram}
                            onAssign={handleAssignProgram}
                            onPublishToShop={handlePublishToShop}
                            onRemoveFromShop={handleRemoveFromShop}
                            onUnassign={handleUnassignProgram}
                            onDelete={handleDeleteProgram}
                            onScheduleReplacement={onScheduleProgram}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {sortedPrograms.map((program) => (
                <div key={program.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(program.category)}</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{program.title}</h3>
                        {getStateBadge(program)}
                      </div>
                    </div>
                    <SmartProgramActions
                      program={program}
                      onView={onViewProgram}
                      onEdit={onEditProgram}
                      onDuplicate={duplicateProgram}
                      onAssign={handleAssignProgram}
                      onPublishToShop={handlePublishToShop}
                      onRemoveFromShop={handleRemoveFromShop}
                      onUnassign={handleUnassignProgram}
                      onDelete={handleDeleteProgram}
                      onScheduleReplacement={onScheduleProgram}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {program.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600">
                    {program.state === 'assigned' && (
                      <div>
                        <div>Assigned to: {program.client_name || 'Unknown'}</div>
                        <div>Date: {program.assigned_at ? new Date(program.assigned_at).toLocaleDateString() : 'Unknown'}</div>
                      </div>
                    )}
                    {program.state === 'in_shop' && (
                      <div>
                        <div>${program.in_shop_price || 0}</div>
                        <div>Listed: {program.in_shop_at ? new Date(program.in_shop_at).toLocaleDateString() : 'Unknown'}</div>
                      </div>
                    )}
                    {(program.state === 'draft' || program.state === 'saved') && (
                      <div className="text-gray-500">
                        {program.weeks_count || 0} weeks • Created: {new Date(program.created_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile FAB */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Button 
          onClick={onCreateProgram}
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg h-14 w-14"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      {/* Modals */}
      <AssignProgramModal
        open={assignModalOpen}
        onOpenChange={setAssignModalOpen}
        program={selectedProgram}
        onAssign={assignToClient}
      />

      <ShopProgramModal
        open={shopModalOpen}
        onOpenChange={setShopModalOpen}
        program={selectedProgram}
        onPublish={publishToShop}
      />
    </div>
  );
};
