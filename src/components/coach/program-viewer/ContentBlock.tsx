import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Target, Lightbulb, AlertTriangle, Play, ExternalLink, Image } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

interface ContentBlockProps {
  block: {
    id: string;
    block_type: string;
    block_data: any;
    content?: any;
  };
  category: 'fitness' | 'nutrition' | 'mental';
  weekNumber?: number;
  dayName?: string;
}

export const ContentBlock: React.FC<ContentBlockProps> = ({ block, category, weekNumber, dayName }) => {
  const navigate = useNavigate();
  const { programId } = useParams();
  const data = block.block_data;
  const content = block.content;

  // Updated isClickable logic to handle blocks with data but no content_id
  const hasExerciseData = block.block_type === 'exercise' && (content?.id || data?.exerciseName || data?.name);
  const hasRecipeData = block.block_type === 'recipe' && (content?.id || data?.recipeName || data?.name);
  const hasMentalData = block.block_type === 'mental' && (content?.id || data?.name);
  
  const isClickable = hasExerciseData || hasRecipeData || hasMentalData;

  const handleContentClick = () => {
    // If we have knowledge hub content, navigate to detail page
    if (content?.id) {
      const returnTo = `/coach/programBuilder/view/${programId}${weekNumber && dayName ? `#week-${weekNumber}-day-${dayName}` : ''}`;
      
      let detailPath = '';
      if (block.block_type === 'exercise') {
        detailPath = `/coach/knowledgeHub/fitness/${content.id}`;
      } else if (block.block_type === 'recipe') {
        detailPath = `/coach/knowledgeHub/nutrition/${content.id}`;
      } else if (block.block_type === 'mental') {
        detailPath = `/coach/knowledgeHub/mental/${content.id}`;
      }

      if (detailPath) {
        navigate(`${detailPath}?programId=${programId}&week=${weekNumber}&day=${dayName}&returnTo=${encodeURIComponent(returnTo)}`);
      }
    } else {
      // For blocks without knowledge hub content, show a simple alert with available data
      const blockName = data?.exerciseName || data?.recipeName || data?.name || 'Content';
      alert(`${blockName} - This content is not linked to the knowledge hub yet.`);
    }
  };

  // Exercise block rendering
  if (block.block_type === 'exercise') {
    const exerciseName = content?.name || data?.exerciseName || data?.name || 'Exercise';
    const sets = data?.sets;
    const reps = data?.reps;
    const weight = data?.weight || data?.kg;
    
    // Handle sets array format
    let setsDisplay = '';
    let repsDisplay = '';
    
    if (Array.isArray(sets)) {
      setsDisplay = sets.length.toString();
      // Get reps from first set or use reps field
      const firstSet = sets[0];
      if (firstSet) {
        if (firstSet.useRange && firstSet.repRange) {
          repsDisplay = `${firstSet.repRange.min}-${firstSet.repRange.max}`;
        } else {
          repsDisplay = firstSet.reps?.toString() || reps?.toString() || '0';
        }
      }
    } else {
      setsDisplay = sets?.toString() || '1';
      repsDisplay = reps?.toString() || '0';
    }

    return (
      <div 
        className={`p-3 bg-blue-50 rounded-lg border border-blue-200 ${isClickable ? 'cursor-pointer hover:bg-blue-100 transition-colors' : ''}`}
        onClick={isClickable ? handleContentClick : undefined}
      >
        <div className="flex items-start gap-3">
          {content?.header_image && (
            <img 
              src={content.header_image} 
              alt={exerciseName}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-blue-900">{exerciseName}</h4>
            </div>
            
            <div className="text-sm text-blue-700">
              <span className="font-medium">{setsDisplay}×{repsDisplay}</span>
              {weight && <span className="ml-2">@ {weight}kg</span>}
            </div>
            
            {content?.muscle_group_main && (
              <div className="text-xs text-blue-600 mt-1">
                Target: {content.muscle_group_main}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Recipe block rendering
  if (block.block_type === 'recipe') {
    const recipeName = content?.name || data?.recipeName || data?.name || 'Recipe';
    const portions = data?.portions || data?.portionMin || 1;
    const cookingTime = data?.cookingTime || content?.cooking_time;

    return (
      <div 
        className={`p-3 bg-green-50 rounded-lg border border-green-200 ${isClickable ? 'cursor-pointer hover:bg-green-100 transition-colors' : ''}`}
        onClick={isClickable ? handleContentClick : undefined}
      >
        <div className="flex items-start gap-3">
          {content?.header_image && (
            <img 
              src={content.header_image} 
              alt={recipeName}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🥗</span>
              <h4 className="font-semibold text-green-900">{recipeName}</h4>
            </div>
            
            <div className="flex flex-wrap gap-2 text-sm text-green-700">
              {portions && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{portions} portions</span>
                </div>
              )}
              {cookingTime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{cookingTime} min</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mental exercise block rendering
  if (block.block_type === 'mental') {
    const exerciseName = content?.name || data?.name || 'Mental Exercise';
    const duration = data?.duration || content?.duration;
    const exerciseType = content?.exercise_type || data?.exerciseType;

    return (
      <div 
        className={`p-3 bg-purple-50 rounded-lg border border-purple-200 ${isClickable ? 'cursor-pointer hover:bg-purple-100 transition-colors' : ''}`}
        onClick={isClickable ? handleContentClick : undefined}
      >
        <div className="flex items-start gap-3">
          {content?.header_image && (
            <img 
              src={content.header_image} 
              alt={exerciseName}
              className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🧘‍♀️</span>
              <h4 className="font-semibold text-purple-900">{exerciseName}</h4>
            </div>
            
            {duration && (
              <div className="flex items-center gap-1 text-sm text-purple-700 mb-1">
                <Clock className="h-3 w-3" />
                <span>{duration} minutes</span>
              </div>
            )}
            
            {exerciseType && (
              <Badge variant="outline" className="text-xs">
                {exerciseType.replace('_', ' ')}
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Text block rendering
  if (block.block_type === 'text') {
    const textContent = data?.content || data?.text || '';
    
    return (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-2">
          <span className="text-sm">📝</span>
          <p className="text-sm text-gray-700 flex-1">{textContent}</p>
        </div>
      </div>
    );
  }

  // Pro tip block rendering
  if (block.block_type === 'pro_tip') {
    const tipContent = data?.content || data?.tip || data?.text || '';
    
    return (
      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start gap-2">
          <span className="text-sm">💡</span>
          <div className="flex-1">
            <p className="text-sm text-amber-700 font-medium italic">{tipContent}</p>
          </div>
        </div>
      </div>
    );
  }

  // Caution/avoidance block rendering
  if (block.block_type === 'avoidance') {
    const cautionContent = data?.content || data?.warning || data?.text || '';
    
    return (
      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
        <div className="flex items-start gap-2">
          <span className="text-sm">⚠️</span>
          <div className="flex-1">
            <p className="text-sm text-red-700 font-bold">{cautionContent}</p>
          </div>
        </div>
      </div>
    );
  }

  // Image block rendering
  if (block.block_type === 'image') {
    const imageUrl = data?.imageUrl || data?.url;
    const caption = data?.caption || data?.alt || data?.content;
    
    return (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        {imageUrl ? (
          <div>
            <img 
              src={imageUrl} 
              alt={caption || 'Content image'}
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            {caption && (
              <p className="text-xs text-gray-600">{caption}</p>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-gray-500">
            <Image className="h-4 w-4" />
            <span className="text-sm">{caption || 'Image content'}</span>
          </div>
        )}
      </div>
    );
  }

  // Video block rendering
  if (block.block_type === 'video') {
    const videoUrl = data?.videoUrl || data?.url;
    const videoTitle = data?.title || data?.name || 'Video';
    const description = data?.description || data?.content;
    
    return (
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-2">
          <span className="text-sm">🎥</span>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 mb-1">{videoTitle}</h4>
            {description && (
              <p className="text-sm text-gray-600 mb-2">{description}</p>
            )}
            {videoUrl && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Play className="h-3 w-3" />
                <span>Watch video</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // URL/Link block rendering
  if (block.block_type === 'url') {
    const url = data?.url;
    const linkTitle = data?.title || data?.name || 'Link';
    const description = data?.description || data?.content;
    
    return (
      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-2">
          <ExternalLink className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-blue-900 mb-1">{linkTitle}</h4>
            {description && (
              <p className="text-sm text-blue-700 mb-1">{description}</p>
            )}
            {url && (
              <p className="text-xs text-blue-600 truncate">{url}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unknown block types
  return (
    <div className="p-3 bg-gray-100 rounded-lg border border-gray-300">
      <p className="text-sm text-gray-600">
        Unknown content type: {block.block_type}
      </p>
      {data?.content && (
        <p className="text-xs text-gray-500 mt-1">{data.content}</p>
      )}
    </div>
  );
};
