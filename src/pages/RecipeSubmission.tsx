
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ImagePlus, Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Ingredient = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
};

type Step = {
  id: string;
  instruction: string;
};

const RecipeSubmission = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [recipeImage, setRecipeImage] = useState<string | null>(null);
  const [recipeDetails, setRecipeDetails] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    cuisine: '',
    difficulty: 'medium',
    prepTime: '',
    cookTime: '',
    servings: '4'
  });
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', quantity: '', unit: 'g' }
  ]);
  
  const [steps, setSteps] = useState<Step[]>([
    { id: '1', instruction: '' }
  ]);
  
  const unitOptions = ['g', 'kg', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'oz', 'lb', 'piece', 'slice', 'clove'];
  const difficultyOptions = ['easy', 'medium', 'hard'];
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // In a real app, you would upload the file to a server
      // Here, we'll just create a preview URL
      const imageUrl = URL.createObjectURL(file);
      setRecipeImage(imageUrl);
    }
  };
  
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: `ing-${Date.now()}`, name: '', quantity: '', unit: 'g' }
    ]);
  };
  
  const removeIngredient = (id: string) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(ing => ing.id !== id));
    }
  };
  
  const updateIngredient = (id: string, field: 'name' | 'quantity' | 'unit', value: string) => {
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing
    ));
  };
  
  const addStep = () => {
    setSteps([
      ...steps,
      { id: `step-${Date.now()}`, instruction: '' }
    ]);
  };
  
  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(step => step.id !== id));
    }
  };
  
  const updateStep = (id: string, instruction: string) => {
    setSteps(steps.map(step => 
      step.id === id ? { ...step, instruction } : step
    ));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!recipeDetails.title) {
      toast({
        title: "Title required",
        description: "Please enter a recipe title",
        variant: "destructive"
      });
      return;
    }
    
    if (!recipeImage) {
      toast({
        title: "Image required",
        description: "Please upload a recipe image",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all ingredients have a name and quantity
    const hasEmptyIngredients = ingredients.some(ing => !ing.name || !ing.quantity);
    if (hasEmptyIngredients) {
      toast({
        title: "Incomplete ingredients",
        description: "Please fill in all ingredient details",
        variant: "destructive"
      });
      return;
    }
    
    // Check if all steps have instructions
    const hasEmptySteps = steps.some(step => !step.instruction);
    if (hasEmptySteps) {
      toast({
        title: "Incomplete steps",
        description: "Please fill in all cooking steps",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the recipe (mock)
    toast({
      title: "Recipe submitted successfully",
      description: "Your recipe will be reviewed by our team"
    });
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Submit Recipe</h1>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white mt-2 p-4">
          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Recipe Image</label>
            <div 
              className={`border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-40 cursor-pointer ${
                recipeImage ? 'border-chef-primary' : 'border-gray-300'
              }`}
              onClick={() => document.getElementById('recipe-image')?.click()}
            >
              {recipeImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={recipeImage} 
                    alt="Recipe Preview" 
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecipeImage(null);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <ImagePlus size={36} className="text-chef-medium-gray mb-2" />
                  <p className="text-sm text-chef-medium-gray">Click to upload a recipe image</p>
                  <p className="text-xs text-chef-medium-gray mt-1">JPG, PNG or WebP, max 5MB</p>
                </>
              )}
              <input
                id="recipe-image"
                type="file"
                accept="image/jpeg, image/png, image/webp"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          
          {/* Basic Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">Recipe Title</label>
              <Input
                id="title"
                placeholder="e.g., Homemade Chocolate Chip Cookies"
                value={recipeDetails.title}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, title: e.target.value })}
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                id="description"
                placeholder="A brief description of your recipe..."
                value={recipeDetails.description}
                onChange={(e) => setRecipeDetails({ ...recipeDetails, description: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                <select
                  id="category"
                  value={recipeDetails.category}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, category: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="" disabled>Select category</option>
                  <option value="food">Food</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="subcategory" className="block text-sm font-medium mb-1">Subcategory</label>
                <select
                  id="subcategory"
                  value={recipeDetails.subcategory}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, subcategory: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="" disabled>Select subcategory</option>
                  {recipeDetails.category === 'food' && (
                    <>
                      <option value="main-dishes">Main Dishes</option>
                      <option value="appetizers">Appetizers</option>
                      <option value="pickles">Pickles</option>
                      <option value="sauces">Sauces</option>
                    </>
                  )}
                  {recipeDetails.category === 'desserts' && (
                    <>
                      <option value="traditional">Traditional</option>
                      <option value="western">Western</option>
                      <option value="pastries">Pastries</option>
                      <option value="ice-cream">Ice Cream</option>
                    </>
                  )}
                  {recipeDetails.category === 'drinks' && (
                    <>
                      <option value="detox">Detox</option>
                      <option value="cocktails">Cocktails</option>
                      <option value="alcoholic">Alcoholic</option>
                      <option value="hot-drinks">Hot Drinks</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cuisine" className="block text-sm font-medium mb-1">Cuisine</label>
                <Input
                  id="cuisine"
                  placeholder="e.g., Italian, Mexican"
                  value={recipeDetails.cuisine}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, cuisine: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium mb-1">Difficulty</label>
                <select
                  id="difficulty"
                  value={recipeDetails.difficulty}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, difficulty: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  {difficultyOptions.map(option => (
                    <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="prepTime" className="block text-sm font-medium mb-1">Prep Time (mins)</label>
                <Input
                  id="prepTime"
                  type="number"
                  min="0"
                  placeholder="15"
                  value={recipeDetails.prepTime}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, prepTime: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="cookTime" className="block text-sm font-medium mb-1">Cook Time (mins)</label>
                <Input
                  id="cookTime"
                  type="number"
                  min="0"
                  placeholder="30"
                  value={recipeDetails.cookTime}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, cookTime: e.target.value })}
                />
              </div>
              
              <div>
                <label htmlFor="servings" className="block text-sm font-medium mb-1">Servings</label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  placeholder="4"
                  value={recipeDetails.servings}
                  onChange={(e) => setRecipeDetails({ ...recipeDetails, servings: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          {/* Ingredients */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Ingredients</h2>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addIngredient}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Add</span>
              </Button>
            </div>
            
            {ingredients.map((ingredient, index) => (
              <div key={ingredient.id} className="flex items-center gap-2 mb-2">
                <div className="flex-grow">
                  <Input
                    placeholder="Ingredient name"
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                  />
                </div>
                <div className="w-20">
                  <Input
                    placeholder="Qty"
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <select
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-chef-medium-gray"
                  onClick={() => removeIngredient(ingredient.id)}
                  disabled={ingredients.length === 1}
                >
                  <X size={18} />
                </Button>
              </div>
            ))}
          </div>
          
          {/* Instructions */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold">Instructions</h2>
              <Button 
                type="button"
                variant="outline" 
                size="sm"
                onClick={addStep}
                className="flex items-center gap-1"
              >
                <Plus size={16} />
                <span>Add</span>
              </Button>
            </div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="mb-2">
                <div className="flex items-start gap-2">
                  <div className="mt-2 bg-chef-primary text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <Textarea
                      placeholder={`Step ${index + 1}: e.g., Preheat the oven to 350°F...`}
                      value={step.instruction}
                      onChange={(e) => updateStep(step.id, e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-chef-medium-gray mt-2"
                    onClick={() => removeStep(step.id)}
                    disabled={steps.length === 1}
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-6 bg-chef-primary hover:bg-chef-primary/90"
          >
            Submit Recipe
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default RecipeSubmission;
