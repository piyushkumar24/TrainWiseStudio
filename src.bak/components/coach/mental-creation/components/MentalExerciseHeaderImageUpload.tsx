
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Image, X } from 'lucide-react';
import { toast } from 'sonner';

interface MentalExerciseHeaderImageUploadProps {
  headerImageUrl?: string;
  onImageUpload: (imageUrl: string) => void;
  onImageRemove: () => void;
}

export const MentalExerciseHeaderImageUpload = ({
  headerImageUrl,
  onImageUpload,
  onImageRemove
}: MentalExerciseHeaderImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onImageRemove();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">📷 Header Image (Optional)</Label>
      <p className="text-sm text-gray-500">Add a banner image that will appear at the top of your exercise</p>
      
      {!headerImageUrl ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <div className="text-center">
            <Image className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="hover:bg-gray-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              JPG, PNG, or WebP up to 5MB
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative">
          <img
            src={headerImageUrl}
            alt="Header preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
