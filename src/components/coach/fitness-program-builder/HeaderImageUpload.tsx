
import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, Link, X, Loader2 } from 'lucide-react';
import { useFileUpload } from '@/hooks/useFileUpload';

interface HeaderImageUploadProps {
  imageUrl?: string;
  onImageChange: (url: string | undefined) => void;
  className?: string;
}

export const HeaderImageUpload = ({ imageUrl, onImageChange, className }: HeaderImageUploadProps) => {
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadFile, isUploading } = useFileUpload();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const uploadedUrl = await uploadFile(file, 'program-headers');
      if (uploadedUrl) {
        onImageChange(uploadedUrl);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageChange(urlInput.trim());
      setUrlInput('');
      setIsUrlMode(false);
    }
  };

  const clearImage = () => {
    onImageChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileUpload}
        className="hidden"
        disabled={isUploading}
      />
      
      {imageUrl ? (
        <div className="relative">
          <img
            src={imageUrl}
            alt="Header preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={clearImage}
            className="absolute top-2 right-2"
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Upload an image or add a URL
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsUrlMode(!isUrlMode)}
                className="flex items-center gap-2"
                disabled={isUploading}
              >
                <Link className="h-4 w-4" />
                Add Image URL
              </Button>
            </div>
          </div>

          {isUrlMode && (
            <div className="flex gap-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image URL..."
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                disabled={isUploading}
              />
              <Button onClick={handleUrlSubmit} disabled={isUploading}>
                Add
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
