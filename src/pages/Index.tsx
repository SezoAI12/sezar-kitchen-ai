
import { useState } from 'react';
import Layout from '../components/Layout';
import CategorySelection, { Category } from '../components/CategorySelection';
import SubcategorySelection from '../components/SubcategorySelection';
import IngredientSelector from '../components/IngredientSelector';
import FilterSystem, { FilterOptions } from '../components/FilterSystem';
import QuickAccessBar from '../components/QuickAccessBar';
import { Button } from '@/components/ui/button';
import { FileText, BookmarkPlus, Clock, Globe, ChefHat } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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
        description: "Check your favorites for personalized recipe recommendations"
      });
      navigate('/global');
    }, 1500);
  };
  
  const handleNavigateTo = (path: string) => {
    navigate(path);
  };

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
        <div className="px-4 py-3 flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={() => handleNavigateTo('/favorites')}
          >
            <BookmarkPlus size={16} />
            <span>Saved</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={() => handleNavigateTo('/history')}
          >
            <Clock size={16} />
            <span>History</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 flex items-center justify-center gap-1"
            onClick={() => handleNavigateTo('/global')}
          >
            <Globe size={16} />
            <span>Global</span>
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
        
        {/* Ingredient Selector */}
        <IngredientSelector 
          selectedIngredients={selectedIngredients}
          onIngredientsChange={handleIngredientsChange}
        />
        
        {/* Filter System */}
        <FilterSystem 
          onFilterChange={handleFilterChange}
          currentFilters={filterOptions}
        />
        
        {/* Action Buttons Section */}
        <div className="px-4 py-3 space-y-4">
          {/* Find Recipes Button with updated text */}
          <Button
            className="w-full py-6 bg-gradient-to-r from-chef-primary to-chef-primary/80 hover:opacity-95 flex items-center justify-center gap-3 text-lg shadow-md"
            onClick={handleFindRecipes}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin">
                  <ChefHat size={24} />
                </div>
                <span>Finding Recipes...</span>
              </>
            ) : (
              <>
                <ChefHat size={24} className="transition-transform group-hover:animate-spin-slow" />
                <span>Find a Recipe Using AI</span>
              </>
            )}
          </Button>
          
          {/* Share Recipe Button */}
          <Button 
            onClick={handleCreateRecipe}
            className="w-full flex items-center justify-center gap-2 bg-chef-secondary hover:bg-chef-secondary/90 py-4 shadow-md"
          >
            <FileText size={18} />
            <span>Share Your Culinary Creation</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
