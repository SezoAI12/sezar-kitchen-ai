
import { useState } from 'react';
import Layout from '../components/Layout';
import CategorySelection, { Category } from '../components/CategorySelection';
import SubcategorySelection from '../components/SubcategorySelection';
import IngredientSelector from '../components/IngredientSelector';
import FilterSystem, { FilterOptions } from '../components/FilterSystem';
import FindRecipesButton from '../components/FindRecipesButton';
import { Button } from '@/components/ui/button';
import {
  BookmarkPlus,
  Clock,
  Globe,
  ShoppingBag,
  Utensils
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Ingredient = {
  id: string;
  name: string;
  image: string;
};

// Define the Recipe type to match what RecipeCard expects
type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  servings: number;
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [selectedDiet, setSelectedDiet] = useState<string>('');
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleIngredientsChange = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
  };

  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };

  const handleCreateRecipe = () => {
    navigate('/recipe/submit');
  };

  const handleFindRecipes = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Recipes found",
        description: "Check your results for personalized recipe recommendations"
      });
      navigate('/global');
    }, 1500);
  };
  
  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

  // Countries list for dropdown
  const countries = [
    { value: 'international', label: 'International' },
    { value: 'syrian', label: 'Syrian' },
    { value: 'moroccan', label: 'Moroccan' },
    { value: 'turkish', label: 'Turkish' },
    { value: 'iraqi', label: 'Iraqi' },
    { value: 'gulf', label: 'Gulf' },
    { value: 'yemeni', label: 'Yemeni' },
    { value: 'egyptian', label: 'Egyptian' },
    { value: 'iranian', label: 'Iranian' },
    { value: 'indian', label: 'Indian' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'italian', label: 'Italian' },
    { value: 'greek', label: 'Greek' },
    { value: 'thai', label: 'Thai' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'european', label: 'European' },
    { value: 'american', label: 'American' },
    { value: 'levant', label: 'Levant' },
    { value: 'maghreb', label: 'Maghreb' }
  ];

  // Meal types list for dropdown
  const mealTypes = [
    { value: 'any', label: 'Any Meal' },
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  // Diet preferences list for dropdown
  const dietaryPreferences = [
    { value: 'normal', label: 'Normal' },
    { value: 'healthy', label: 'Healthy' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'gluten-free', label: 'Gluten Free' },
    { value: 'dairy-free', label: 'Dairy Free' },
    { value: 'keto', label: 'Keto' },
    { value: 'low-carb', label: 'Low Carb' }
  ];

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Chef Sezar</h1>
        </header>
        
        {/* AI Explanation Banner */}
        <div className="bg-gradient-to-r from-chef-primary/10 to-chef-secondary/10 p-4 mb-2">
          <p className="text-center text-sm">
            This page uses AI to find perfect recipes for you. Select categories, ingredients, and filters, then click "Find a Recipe Using AI" to discover AI-curated dishes.
          </p>
        </div>
        
        {/* Quick Access Buttons */}
        <div className="px-4 py-3 grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
            onClick={() => handleNavigateTo('/favorites')}
          >
            <BookmarkPlus size={20} />
            <span className="text-xs">Saved Recipes</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
            onClick={() => handleNavigateTo('/pantry')}
          >
            <ShoppingBag size={20} />
            <span className="text-xs">Smart Pantry</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex flex-col items-center justify-center gap-1 py-3"
            onClick={() => handleNavigateTo('/global')}
          >
            <Globe size={20} />
            <span className="text-xs">Global Recipes</span>
          </Button>
        </div>
        
        {/* Category Selection */}
        <CategorySelection 
          onCategorySelect={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
        
        {/* Subcategory Selection (conditionally rendered) */}
        {selectedCategory && (
          <SubcategorySelection 
            category={selectedCategory}
            onSubcategorySelect={handleSubcategorySelect}
            selectedSubcategory={selectedSubcategory}
          />
        )}

        {/* Additional Category Dropdowns */}
        <div className="px-4 py-4 bg-white mt-2">
          <h3 className="text-lg font-semibold mb-3">Criteria Selection</h3>
          
          <div className="space-y-3">
            {/* Country Selection */}
            <div>
              <label htmlFor="country" className="text-sm font-medium mb-1 block">Cuisine/Country</label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger id="country" className="w-full">
                  <SelectValue placeholder="Select cuisine or country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Meal Type Selection */}
            <div>
              <label htmlFor="mealType" className="text-sm font-medium mb-1 block">Meal Type</label>
              <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                <SelectTrigger id="mealType" className="w-full">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {mealTypes.map((meal) => (
                      <SelectItem key={meal.value} value={meal.value}>
                        {meal.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            {/* Dietary Preferences Selection */}
            <div>
              <label htmlFor="dietaryPreferences" className="text-sm font-medium mb-1 block">Dietary Preferences</label>
              <Select value={selectedDiet} onValueChange={setSelectedDiet}>
                <SelectTrigger id="dietaryPreferences" className="w-full">
                  <SelectValue placeholder="Select dietary preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dietaryPreferences.map((diet) => (
                      <SelectItem key={diet.value} value={diet.value}>
                        {diet.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Ingredient Selector */}
        <IngredientSelector 
          selectedIngredients={selectedIngredients}
          onIngredientsChange={handleIngredientsChange}
        />
        
        {/* Action Buttons Section */}
        <div className="px-4 py-3 space-y-4">
          {/* Find Recipes Button using the custom component */}
          <FindRecipesButton 
            onClick={handleFindRecipes} 
            isLoading={isLoading}
            text="Find Recipe Using Artificial Intelligence"
          />
          
          {/* Share Recipe Button */}
          <Button 
            onClick={handleCreateRecipe}
            className="w-full flex items-center justify-center gap-2 bg-chef-secondary hover:bg-chef-secondary/90 py-4 shadow-md"
          >
            <Utensils size={18} />
            <span>Share Your Culinary Creation</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
