
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProgramDetailView } from '@/components/customer/programs/ProgramDetailView';

const CustomerProgramDetail = () => {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [program, setProgram] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [programId]);

  const fetchProgram = async () => {
    try {
      // Mock data for now - replace with actual Supabase query
      const mockProgram = {
        id: programId,
        title: 'Full Body Strength Training',
        type: 'fitness' as const,
        progress: 65,
        expiresIn: 12,
        hasFeedback: true,
        description: 'A comprehensive strength training program designed to build muscle and improve overall fitness.',
        weeks: 8,
        currentWeek: 3,
        status: 'active' as const,
        startDate: '2024-01-15'
      };
      
      setProgram(mockProgram);
    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard/programs');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Program Not Found</h2>
        <p className="text-gray-600 mb-6">The program you're looking for doesn't exist.</p>
        <button 
          onClick={handleBack}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Programs
        </button>
      </div>
    );
  }

  return <ProgramDetailView program={program} onBack={handleBack} />;
};

export default CustomerProgramDetail;
