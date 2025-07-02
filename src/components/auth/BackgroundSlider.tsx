
import React from 'react';
import { useBackgroundSlider } from '@/hooks/useBackgroundSlider';
import type { BackgroundSliderProps } from '@/types/auth';

const BackgroundSlider: React.FC<BackgroundSliderProps> = ({ images }) => {
  const { currentImageIndex, isAnimating } = useBackgroundSlider(images);

  return (
    <div className="absolute inset-0">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          } ${isAnimating ? 'opacity-50' : ''}`}
        >
          <img
            src={image}
            alt={`Background ${index + 1}`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/40"></div>
    </div>
  );
};

export default BackgroundSlider;
