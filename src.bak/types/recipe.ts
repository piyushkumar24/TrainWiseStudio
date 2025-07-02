
export type RecipeData = {
  name: string;
  category: string;
  portionYield: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  contentBlocks: ContentBlock[];
  headerImageUrl?: string;
};

export type ContentBlock = {
  id: string;
  type: 'text' | 'steps' | 'ingredients' | 'image';
  content: string;
  order: number;
  items?: string[];
  imageUrl?: string;
};
