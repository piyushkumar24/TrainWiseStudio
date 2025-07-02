
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CreateTestUsers = () => {
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();

  const handleCreateUsers = async () => {
    setIsCreating(true);
    try {
      // This functionality is now handled through proper auth flow
      toast({
        title: "Info", 
        description: "Test users should be created through the normal registration flow with proper authentication.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create test users. Check the console for details.",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Create Test Users</h1>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Customer User</h3>
            <p className="text-sm text-gray-600">
              Use the normal registration flow<br />
              Role: Customer (to be assigned)
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Coach User</h3>
            <p className="text-sm text-gray-600">
              Use the normal registration flow<br />
              Role: Coach (to be assigned)
            </p>
          </div>
        </div>

        <Button
          onClick={handleCreateUsers}
          disabled={isCreating}
          className="w-full bg-orange hover:bg-orange-hover"
        >
          {isCreating ? 'Creating Users...' : 'Use Normal Registration'}
        </Button>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> Users should now register through the proper authentication flow 
            and have roles assigned through the database.
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Proper role-based authentication is now implemented.
        </p>
      </div>
    </div>
  );
};

export default CreateTestUsers;
