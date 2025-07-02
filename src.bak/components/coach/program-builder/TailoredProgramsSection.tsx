
import React, { useState } from 'react';
import { Eye, Edit, RotateCcw, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProgramCategory } from '@/pages/coach/ProgramBuilder';

interface TailoredProgramsSectionProps {
  selectedCategory: ProgramCategory;
}

// Mock data
const mockTailoredPrograms = [
  {
    id: 1,
    name: 'Sarah\'s Strength Journey',
    type: 'fitness',
    icon: '🏋️',
    clientName: 'Sarah Johnson',
    progress: 65,
    hasExpiryAlert: true,
  },
  {
    id: 2,
    name: 'Mike\'s Mediterranean Plan',
    type: 'nutrition',
    icon: '🥗',
    clientName: 'Mike Chen',
    progress: 40,
    hasExpiryAlert: false,
  },
  {
    id: 3,
    name: 'Emma\'s Mindfulness Path',
    type: 'mental',
    icon: '🧘',
    clientName: 'Emma Davis',
    progress: 80,
    hasExpiryAlert: false,
  },
];

export const TailoredProgramsSection = ({ selectedCategory }: TailoredProgramsSectionProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredPrograms = mockTailoredPrograms.filter(program => 
    selectedCategory === 'all' || program.type === selectedCategory
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div 
        className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              👥 Tailored Programs (Assigned to Clients)
              {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </h2>
            <p className="text-gray-600 mt-1">Client-assigned personalized programs.</p>
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
              No tailored programs found for the selected category.
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Program</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Assigned To</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPrograms.map((program) => (
                        <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {program.hasExpiryAlert && (
                                <span className="text-orange-500 text-sm">⚠️</span>
                              )}
                              <span className="font-medium text-gray-900">{program.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-2xl">{program.icon}</span>
                          </td>
                          <td className="py-4 px-4 text-gray-700">{program.clientName}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-orange-500 h-2 rounded-full transition-all"
                                  style={{ width: `${program.progress}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-gray-700">{program.progress}%</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Stacked Cards */}
              <div className="md:hidden space-y-4">
                {filteredPrograms.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{program.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                            {program.name}
                            {program.hasExpiryAlert && <span className="text-orange-500 text-sm">⚠️</span>}
                          </h3>
                          <p className="text-sm text-gray-600">{program.clientName}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-700">{program.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all"
                          style={{ width: `${program.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
