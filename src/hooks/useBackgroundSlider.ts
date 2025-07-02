
import { useState, useEffect, useMemo } from 'react';

export const useBackgroundSlider = (images: readonly string[], intervalMs: number = 5000) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const memoizedImages = useMemo(() => images, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % memoizedImages.length);
        setIsAnimating(false);
      }, 200);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [memoizedImages.length, intervalMs]);

  return { currentImageIndex, isAnimating, images: memoizedImages };
};
