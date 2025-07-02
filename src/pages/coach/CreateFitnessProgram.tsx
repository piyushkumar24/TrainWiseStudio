
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const CreateFitnessProgram = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Redirect to the new unified program builder with fitness category
    const clientId = searchParams.get('clientId');
    const resumeId = searchParams.get('resume');
    
    let redirectUrl = '/coach/create-program?category=fitness';
    
    if (clientId) {
      redirectUrl += `&clientId=${clientId}`;
    }
    if (resumeId) {
      redirectUrl += `&resume=${resumeId}`;
    }
    
    navigate(redirectUrl, { replace: true });
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  );
};

export default CreateFitnessProgram;
