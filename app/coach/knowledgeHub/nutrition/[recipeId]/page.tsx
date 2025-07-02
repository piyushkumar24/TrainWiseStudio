import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Edit, Clock, Users } from "lucide-react";

export default function RecipeViewerPage({ params }: { params: { recipeId: string } }) {
  const recipeId = params.recipeId;
  
  // In a real app, you would fetch recipe data based on the ID
  const recipeData = {
    id: recipeId,
    title: "High-Protein Breakfast Bowl",
    category: "Breakfast",
    difficulty: "Easy",
    prepTime: "10 minutes",
    cookTime: "5 minutes",
    servings: 1,
    calories: 450,
    protein: 30,
    carbs: 40,
    fat: 15,
    description: "A quick and nutritious breakfast bowl with 30g of protein to start the day right. Perfect for busy mornings or post-workout refueling.",
    ingredients: [
      "1 cup Greek yogurt (plain, non-fat)",
      "1 scoop protein powder (vanilla or flavor of choice)",
      "1/2 cup berries (mixed or single type)",
      "1 tablespoon chia seeds",
      "1 tablespoon honey or maple syrup",
      "1/4 cup granola (low sugar)",
      "1 tablespoon nut butter (almond or peanut)"
    ],
    instructions: [
      "In a bowl, mix Greek yogurt with protein powder until well combined.",
      "Top with berries, granola, and chia seeds.",
      "Drizzle with honey or maple syrup and nut butter.",
      "Serve immediately or refrigerate for up to 24 hours."
    ],
    tips: [
      "For meal prep, store granola separately to maintain crunch.",
      "Substitute Greek yogurt with dairy-free alternatives if needed.",
      "Add a banana for extra carbohydrates before workouts.",
      "Use chocolate protein powder for a dessert-like variation."
    ],
    allergens: ["Dairy", "Nuts"],
    image: "https://example.com/protein-breakfast-bowl.jpg"
  };

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/coach/knowledgeHub">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
          </Button>
        </Link>
        <Link href={`/coach/knowledgeHub/nutrition/edit/${recipeId}`}>
          <Button>
            <Edit className="mr-2 h-4 w-4" /> Edit Recipe
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">{recipeData.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {recipeData.category}
                </span>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {recipeData.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{recipeData.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">Prep: {recipeData.prepTime}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">Cook: {recipeData.cookTime}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1 text-gray-500" />
                  <span className="text-sm">Servings: {recipeData.servings}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-lg font-bold">{recipeData.calories}</div>
                  <div className="text-xs text-gray-500">calories</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-lg font-bold">{recipeData.protein}g</div>
                  <div className="text-xs text-gray-500">protein</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-lg font-bold">{recipeData.carbs}g</div>
                  <div className="text-xs text-gray-500">carbs</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md text-center">
                  <div className="text-lg font-bold">{recipeData.fat}g</div>
                  <div className="text-xs text-gray-500">fat</div>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                {recipeData.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              
              <h3 className="text-lg font-semibold mb-3">Instructions</h3>
              <ol className="list-decimal pl-5 mb-6 space-y-2">
                {recipeData.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
              
              <h3 className="text-lg font-semibold mb-3">Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                {recipeData.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Allergens</dt>
                  <dd className="mt-1">
                    {recipeData.allergens.map((allergen, index) => (
                      <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {allergen}
                      </span>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Meal Type</dt>
                  <dd className="mt-1">
                    <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      {recipeData.category}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Difficulty</dt>
                  <dd className="mt-1">
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {recipeData.difficulty}
                    </span>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                This recipe is used in the following programs:
              </p>
              <ul className="space-y-2">
                <li className="text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">
                    Muscle Building Meal Plan
                  </Link>
                </li>
                <li className="text-sm">
                  <Link href="#" className="text-blue-600 hover:underline">
                    Weight Loss Nutrition
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 