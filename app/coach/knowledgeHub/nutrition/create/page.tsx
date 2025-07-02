import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft, Plus, Save } from "lucide-react";

export default function CreateNutritionRecipePage() {
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <Link href="/coach/knowledgeHub">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Knowledge Hub
          </Button>
        </Link>
        <Button>
          <Save className="mr-2 h-4 w-4" /> Save Recipe
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Create Nutrition Recipe</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Recipe Title</Label>
                <Input id="title" placeholder="Enter recipe title" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the recipe"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category" 
                    className="w-full p-2 border rounded-md"
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
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input id="prepTime" type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input id="cookTime" type="number" placeholder="20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" type="number" placeholder="4" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ingredient 1</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter ingredient with quantity" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Ingredient
              </Button>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Step 1</Label>
                <div className="flex gap-2">
                  <Textarea placeholder="Enter instruction step" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tip 1</Label>
                <div className="flex gap-2">
                  <Input placeholder="Enter tip" />
                  <Button variant="outline" size="icon" className="flex-shrink-0">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add Tip
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Nutrition Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="calories">Calories (per serving)</Label>
                <Input id="calories" type="number" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input id="protein" type="number" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input id="carbs" type="number" placeholder="0" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input id="fat" type="number" placeholder="0" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="allergens">Allergens</Label>
                <Input id="allergens" placeholder="E.g., Dairy, Nuts, Gluten" />
                <p className="text-xs text-gray-500">Separate multiple allergens with commas</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input id="tags" placeholder="E.g., High-protein, Low-carb" />
                <p className="text-xs text-gray-500">Separate multiple tags with commas</p>
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
                <Input id="image" type="file" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 