
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { ShopItem } from '@/pages/Shop';
import { TagsInput } from '@/components/coach/fitness-program-builder/TagsInput';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (itemData: Partial<ShopItem>) => void;
  editingItem: ShopItem | null;
}

interface FormData {
  title: string;
  description: string;
  type: 'Program' | 'Product' | '';
  category: 'Fitness' | 'Nutrition' | 'Mental Health' | '';
  price: number;
  tags: string[];
  image_urls: string[];
}

export const AddItemModal = ({ isOpen, onClose, onSave, editingItem }: AddItemModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    type: '',
    category: '',
    price: 0,
    tags: [],
    image_urls: []
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description || '',
        type: editingItem.type,
        category: editingItem.category,
        price: editingItem.price,
        tags: editingItem.tags || [],
        image_urls: editingItem.image_urls || []
      });
    } else {
      setFormData({
        title: '',
        description: '',
        type: '',
        category: '',
        price: 0,
        tags: [],
        image_urls: []
      });
    }
  }, [editingItem, isOpen]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImageUrls: string[] = [];
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file);
        newImageUrls.push(url);
      });
      setFormData(prev => ({
        ...prev,
        image_urls: [...prev.image_urls, ...newImageUrls]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only send data with properly typed values
    const saveData: Partial<ShopItem> = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      tags: formData.tags,
      image_urls: formData.image_urls
    };

    // Add type and category only if they're properly selected
    if (formData.type && (formData.type === 'Program' || formData.type === 'Product')) {
      saveData.type = formData.type;
    }
    
    if (formData.category && ['Fitness', 'Nutrition', 'Mental Health'].includes(formData.category)) {
      saveData.category = formData.category as 'Fitness' | 'Nutrition' | 'Mental Health';
    }

    onSave(saveData);
  };

  const canSubmit = formData.title && formData.type && formData.category;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter item title..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your item..."
              rows={4}
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(value: 'Program' | 'Product') => setFormData(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Program">Program</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value: 'Fitness' | 'Nutrition' | 'Mental Health') => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fitness">Fitness</SelectItem>
                  <SelectItem value="Nutrition">Nutrition</SelectItem>
                  <SelectItem value="Mental Health">Mental Health</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price (NOK)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
              placeholder="0.00"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <TagsInput
              tags={formData.tags}
              onTagsChange={(tags) => setFormData(prev => ({ ...prev, tags }))}
            />
          </div>

          {/* Images */}
          <div>
            <Label>Images</Label>
            <div className="space-y-4">
              {/* Image Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-400" />
                  <p className="text-gray-600 font-medium">Click to upload images</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </label>
              </div>

              {/* Image Preview */}
              {formData.image_urls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.image_urls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={url} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        onClick={() => removeImage(index)}
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-[#FF6B2C] hover:bg-[#e55b22]"
              disabled={!canSubmit}
            >
              {editingItem ? 'Update Item' : 'Save Item'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
