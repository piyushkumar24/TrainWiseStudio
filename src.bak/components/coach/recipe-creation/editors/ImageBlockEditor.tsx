
import React from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageBlockEditorProps {
  blockId: string;
  imageUrl?: string;
  onImageUpload: (url: string) => void;
  onCancel: () => void;
}

export const ImageBlockEditor = ({ 
  blockId, 
  imageUrl, 
  onImageUpload, 
  onCancel 
}: ImageBlockEditorProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpload(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* Show current image if it exists */}
      {imageUrl && (
        <div className="space-y-3">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt="Current recipe image" 
              className="w-full h-48 object-cover rounded-lg" 
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <p className="text-white text-sm font-medium">Current Image</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">Current image - upload a new one to replace it</p>
        </div>
      )}
      
      {/* Upload new image */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id={`image-upload-${blockId}`}
        />
        <label
          htmlFor={`image-upload-${blockId}`}
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="text-gray-600 font-medium">
            {imageUrl ? 'Upload New Image' : 'Click to upload image'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </label>
      </div>
      
      <Button onClick={onCancel} size="sm" variant="outline" className="w-full">
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
    </div>
  );
};
