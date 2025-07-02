
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { X, Upload, Image } from 'lucide-react';

interface HeaderImageUploadProps {
  headerImagePreview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  removeHeaderImage: () => void;
}

export const HeaderImageUpload = ({ 
  headerImagePreview, 
  fileInputRef, 
  handleImageUpload, 
  removeHeaderImage 
}: HeaderImageUploadProps) => {
  return (
    <div className="space-y-4">
      <Label>📷 Header Image (Optional)</Label>
      <p className="text-sm text-gray-600">Add a banner image that will appear at the top of your exercise</p>
      
      {!headerImagePreview ? (
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
            src={headerImagePreview}
            alt="Header preview"
            className="w-full h-48 object-cover rounded-lg border border-gray-200"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={removeHeaderImage}
            className="absolute top-2 right-2 bg-white hover:bg-gray-50"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
