import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Save, Trash } from "lucide-react";

export default function EditRecipePage({ params }: { params: { recipeId: string } }) {
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
        <Link href={`/coach/knowledgeHub/nutrition/${recipeId}`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Recipe
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" /> Delete
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Edit Recipe</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input id="title" defaultValue={recipeData.title} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  defaultValue={recipeData.description}
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="breakfast"
                  >
                    <option value="">Select category</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                    <option value="dessert">Dessert</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select 
                    id="difficulty" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="easy"
                  >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prepTime">Prep Time</Label>
                  <Input id="prepTime" defaultValue={recipeData.prepTime} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time</Label>
                  <Input id="cookTime" defaultValue={recipeData.cookTime} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" type="number" defaultValue={recipeData.servings.toString()} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipeData.ingredients.map((ingredient, index) => (
                <div key={index} className="space-y-2">
                  <Label>Ingredient {index + 1}</Label>
                  <div className="flex gap-2">
                    <Input defaultValue={ingredient} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Ingredient
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipeData.instructions.map((instruction, index) => (
                <div key={index} className="space-y-2">
                  <Label>Step {index + 1}</Label>
                  <div className="flex gap-2">
                    <Textarea defaultValue={instruction} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Step
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Nutrition Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories</Label>
                <Input id="calories" type="number" defaultValue={recipeData.calories.toString()} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input id="protein" type="number" defaultValue={recipeData.protein.toString()} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input id="carbs" type="number" defaultValue={recipeData.carbs.toString()} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input id="fat" type="number" defaultValue={recipeData.fat.toString()} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recipeData.tips.map((tip, index) => (
                <div key={index} className="space-y-2">
                  <Label>Tip {index + 1}</Label>
                  <div className="flex gap-2">
                    <Input defaultValue={tip} />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                + Add Tip
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Allergens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens</Label>
                <Input id="allergens" defaultValue={recipeData.allergens.join(", ")} />
                <p className="text-xs text-gray-500">Separate multiple allergens with commas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image">Recipe Image</Label>
                <div className="mb-2 bg-gray-100 rounded-md p-2 text-sm">Current: protein-breakfast-bowl.jpg</div>
                <Input id="image" type="file" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 