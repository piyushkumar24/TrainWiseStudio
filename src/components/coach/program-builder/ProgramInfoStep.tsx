
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { TagsInput } from '@/components/coach/fitness-program-builder/TagsInput';
import { HeaderImageUpload } from '@/components/coach/fitness-program-builder/HeaderImageUpload';
import { ProgramData } from '@/hooks/useProgramBuilder';
import { ProgramCategory } from '@/pages/coach/CreateProgram';

interface ProgramInfoStepProps {
  programData: ProgramData | null;
  setProgramData: (data: ProgramData) => void;
  programCategory: ProgramCategory;
}

export const ProgramInfoStep = ({ programData, setProgramData, programCategory }: ProgramInfoStepProps) => {
  const isEditMode = !!programData?.id;

  const handleChange = (field: keyof ProgramData, value: any) => {
    const currentData = programData || {
      title: '',
      description: '',
      tags: [],
      category: programCategory,
      state: 'draft' as const,
      weeks: []
    };

    setProgramData({
      ...currentData,
      [field]: value,
    } as ProgramData);
  };

  const getCategoryEmoji = () => {
    switch (programCategory) {
      case 'fitness': return '🏋️';
      case 'nutrition': return '🥗';
      case 'mental': return '🧘‍♀️';
      default: return '📋';
    }
  };

  const getCategoryTitle = () => {
    switch (programCategory) {
      case 'fitness': return 'Fitness';
      case 'nutrition': return 'Nutrition';
      case 'mental': return 'Mental Health';
      default: return 'Program';
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {getCategoryEmoji()} {isEditMode ? 'Edit' : 'Create'} {getCategoryTitle()} Program
        </h2>
        <p className="text-gray-600">
          {isEditMode ? 'Update the details for your' : 'Set up the basic details for your'} {getCategoryTitle().toLowerCase()} program
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title" className="text-base font-medium">
            Program Title *
          </Label>
          <Input
            id="title"
            placeholder="Enter program title..."
            value={programData?.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-base font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Describe your program..."
            value={programData?.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div>
          <Label className="text-base font-medium">
            Tags
          </Label>
          <TagsInput
            tags={programData?.tags || []}
            onTagsChange={(tags) => handleChange('tags', tags)}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-base font-medium">
            Header Image
          </Label>
          <HeaderImageUpload
            imageUrl={programData?.headerImage}
            onImageChange={(url) => handleChange('headerImage', url)}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};
