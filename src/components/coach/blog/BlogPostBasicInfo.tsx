import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image, X } from 'lucide-react';
import { TagsInput } from '@/components/coach/fitness-program-builder/TagsInput';

interface BlogPostBasicInfoProps {
  title: string;
  setTitle: (title: string) => void;
  category: string;
  setCategory: (category: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  featuredImage: string | null;
  setFeaturedImage: (image: string | null) => void;
  excerpt: string;
  setExcerpt: (excerpt: string) => void;
}

export const BlogPostBasicInfo = ({
  title,
  setTitle,
  category,
  setCategory,
  tags,
  setTags,
  featuredImage,
  setFeaturedImage,
  excerpt,
  setExcerpt
}: BlogPostBasicInfoProps) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    console.log('Title changed to:', `"${newTitle}"`);
    setTitle(newTitle);
  };

  const handleCategoryChange = (value: string) => {
    console.log('Category changed to:', `"${value}"`);
    setCategory(value);
  };

  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newExcerpt = e.target.value;
    console.log('Excerpt changed to:', `"${newExcerpt}"`);
    setExcerpt(newExcerpt);
  };

  const handleFeaturedImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFeaturedImage(url);
    }
  };

  const removeFeaturedImage = () => {
    setFeaturedImage(null);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Post Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter post title..."
            className="text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
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

          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput
              tags={tags}
              onTagsChange={setTags}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="featured-image">Featured Image</Label>
          {featuredImage ? (
            <div className="space-y-3">
              <div className="relative">
                <img 
                  src={featuredImage} 
                  alt="Featured image" 
                  className="w-full h-48 object-cover rounded-lg" 
                />
                <Button
                  onClick={removeFeaturedImage}
                  size="sm"
                  variant="destructive"
                  className="absolute top-2 right-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                  className="hidden"
                  id="replace-featured-image"
                />
                <label
                  htmlFor="replace-featured-image"
                  className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline"
                >
                  Replace featured image
                </label>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-300 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageChange}
                className="hidden"
                id="featured-image-upload"
              />
              <label
                htmlFor="featured-image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Image className="h-8 w-8 text-gray-400" />
                <p className="text-gray-600 font-medium">Click to upload featured image</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={handleExcerptChange}
            placeholder="Brief summary of your post..."
            maxLength={200}
            className="resize-none"
            rows={3}
          />
          <div className="text-xs text-gray-500 text-right mt-1">
            {excerpt.length}/200
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
