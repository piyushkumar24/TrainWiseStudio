
import React from 'react';

interface FitnessHeroImageProps {
  headerImage: string;
  exerciseName: string;
}

export const FitnessHeroImage = ({ headerImage, exerciseName }: FitnessHeroImageProps) => {
  if (!headerImage) return null;

  return (
    <div className="animate-fade-in">
      <div className="rounded-xl overflow-hidden shadow-lg">
        <img
          src={headerImage}
          alt={exerciseName}
          className="w-full h-64 md:h-80 object-cover"
          onError={(e) => {
            console.error('Failed to load header image:', headerImage);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            console.log('Header image loaded successfully');
          }}
        />
      </div>
    </div>
  );
};
