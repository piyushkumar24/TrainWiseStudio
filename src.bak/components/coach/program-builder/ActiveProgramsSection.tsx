
import React, { useState } from 'react';
import { Eye, User, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface ActiveProgramsSectionProps {
  selectedCategory: ProgramCategory;
}

// Mock data
const mockActivePrograms = [
  {
    id: 1,
    name: 'Strength Foundation',
    type: 'fitness',
    icon: '🏋️',
    clientName: 'Sarah Johnson',
    assignedDate: '2024-06-01',
    completionPercentage: 65,
    renewalDate: '2024-07-01',
    isNearingRenewal: true,
    hasNextProgram: false,
  },
  {
    id: 2,
    name: 'Mediterranean Meal Plan',
    type: 'nutrition',
    icon: '🥗',
    clientName: 'Mike Chen',
    assignedDate: '2024-06-10',
    completionPercentage: 40,
    renewalDate: '2024-07-15',
    isNearingRenewal: false,
    hasNextProgram: true,
  },
  {
    id: 3,
    name: 'Mindfulness Journey',
    type: 'mental',
    icon: '🧘',
    clientName: 'Emma Davis',
    assignedDate: '2024-06-15',
    completionPercentage: 80,
    renewalDate: '2024-07-20',
    isNearingRenewal: false,
    hasNextProgram: true,
  },
];

export const ActiveProgramsSection = ({ selectedCategory }: ActiveProgramsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredPrograms = mockActivePrograms.filter(program => 
    selectedCategory === 'all' || program.type === selectedCategory
  );

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div 
        className="p-6 border-b border-gray-200 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              📦 Active Programs
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </h2>
            <p className="text-gray-600 mt-1">Programs currently assigned to clients</p>
          </div>
          <div className="text-sm text-gray-500">
            {filteredPrograms.length} programs
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 overflow-hidden ${
        isCollapsed ? 'max-h-0' : 'max-h-[2000px]'
      }`}>
        <div className="p-6">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No active programs found for the selected category.
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredPrograms.map((program) => (
                <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{program.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{program.name}</h3>
                        <p className="text-sm text-gray-600">Client: {program.clientName}</p>
                      </div>
                    </div>
                    {program.isNearingRenewal && !program.hasNextProgram && (
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                        ⚠️ Renewal Due
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{program.completionPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${program.completionPercentage}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Assigned: {new Date(program.assignedDate).toLocaleDateString()}</span>
                      <span>Renews: {new Date(program.renewalDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-4 w-4 mr-1" />
                      View Program
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <User className="h-4 w-4 mr-1" />
                      View Client
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
