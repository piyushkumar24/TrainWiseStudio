import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ExerciseData } from '@/pages/coach/CreateFitnessExercise';
import { useNavigate } from 'react-router-dom';
import { useBasicInfoValidation } from './hooks/useBasicInfoValidation';
import { useHeaderImage } from './hooks/useHeaderImage';
import { MuscleGroupSelector } from './components/MuscleGroupSelector';
import { TagsManager } from './components/TagsManager';
import { HeaderImageUpload } from './components/HeaderImageUpload';
import { BasicInfoNavigation } from './components/BasicInfoNavigation';

interface BasicInfoStepProps {
  data: ExerciseData;
  onUpdate: (updates: Partial<ExerciseData>) => void;
  onNext: () => void;
  onBack: () => void;
  onSaveDraft: () => void;
  onPrevious?: () => void;
}

export const BasicInfoStep = ({ data, onUpdate, onNext, onBack, onSaveDraft, onPrevious }: BasicInfoStepProps) => {
  const navigate = useNavigate();
  const { errors, validateAndNext } = useBasicInfoValidation();
  const { headerImagePreview, fileInputRef, handleImageUpload, removeHeaderImage } = useHeaderImage(data, onUpdate);

  const handleNextClick = () => {
    console.log('🚀 Next button clicked');
    console.log('📊 Current exercise data:', data);
    validateAndNext(data, onNext);
  };

  const handleBackClick = () => {
    console.log('Back button clicked - navigating to knowledge hub');
    navigate('/coach/knowledgeHub');
  };

  const handleSaveDraftClick = () => {
    console.log('💾 Save draft button clicked');
    onSaveDraft();
  };

  return (
    <div className="space-y-6 pb-28 md:pb-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            📝 Basic Information
          </h2>
          <p className="text-gray-600">
            Let's start with the basics of your fitness exercise
          </p>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Exercise Title *</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            placeholder="e.g., Push-ups with Perfect Form"
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Short Intro */}
        <div className="space-y-2">
          <Label htmlFor="intro">Short Introduction *</Label>
          <Textarea
            id="intro"
            value={data.intro}
            onChange={(e) => onUpdate({ intro: e.target.value })}
            placeholder="Briefly describe what this exercise is good for..."
            rows={3}
            className={errors.intro ? 'border-red-500' : ''}
          />
          {errors.intro && <p className="text-red-500 text-sm">{errors.intro}</p>}
        </div>

        {/* Muscle Group Selection */}
        <MuscleGroupSelector 
          data={data} 
          onUpdate={onUpdate} 
          error={errors.muscleGroup} 
        />

        {/* Tags */}
        <TagsManager 
          data={data} 
          onUpdate={onUpdate} 
          error={errors.tags} 
        />

        {/* Header Image */}
        <HeaderImageUpload
          headerImagePreview={headerImagePreview}
          fileInputRef={fileInputRef}
          handleImageUpload={handleImageUpload}
          removeHeaderImage={removeHeaderImage}
        />
      </div>

      {/* Navigation - Updated to include Previous button functionality */}
      <BasicInfoNavigation
        onBack={handleBackClick}
        onSaveDraft={handleSaveDraftClick}
        onNext={handleNextClick}
        onPrevious={onPrevious}
        showPrevious={true}
        isFirstStep={true}
      />
    </div>
  );
};
