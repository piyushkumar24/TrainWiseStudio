
import React from 'react';

interface FitnessFooterProps {
  createdAt: string;
}

export const FitnessFooter = ({ createdAt }: FitnessFooterProps) => {
  return (
    <div className="text-center py-8 border-t border-gray-200 animate-fade-in">
      <p className="text-gray-500 text-sm">
        Created on {new Date(createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
};
