
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';

export const useHeaderImage = (data: ExerciseData, onUpdate: (updates: Partial<ExerciseData>) => void) => {
  const [headerImagePreview, setHeaderImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize header image preview when component mounts or data changes
  useEffect(() => {
    if (data.headerImageUrl) {
      setHeaderImagePreview(data.headerImageUrl);
    }
  }, [data.headerImageUrl]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('Image size must be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a JPG, PNG, or WebP image');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setHeaderImagePreview(imageUrl);
        onUpdate({ headerImageUrl: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeHeaderImage = () => {
    setHeaderImagePreview(null);
    onUpdate({ headerImageUrl: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    headerImagePreview,
    fileInputRef,
    handleImageUpload,
    removeHeaderImage,
  };
};
