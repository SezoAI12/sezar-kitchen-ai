
import { useState } from 'react';
import Layout from '../components/Layout';
import CategorySelection, { Category } from '../components/CategorySelection';
import SubcategorySelection from '../components/SubcategorySelection';
import IngredientSelector from '../components/IngredientSelector';
import FilterSystem, { FilterOptions } from '../components/FilterSystem';
import QuickAccessBar from '../components/QuickAccessBar';
import FindRecipesButton from '../components/FindRecipesButton';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
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
  
  const handleQuickNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Chef Sezar</h1>
        </header>
        
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
          {/* Find Recipes Button */}
          <FindRecipesButton 
            onClick={handleFindRecipes}
            isLoading={isLoading}
          />
          
          {/* Share Recipe Button */}
          <Button 
            onClick={handleCreateRecipe}
            className="w-full flex items-center justify-center gap-2 bg-chef-secondary hover:bg-chef-secondary/90 py-4 shadow-md"
          >
            <FileText size={18} />
            <span>Share Your Culinary Creation</span>
          </Button>
          
          {/* Quick Access Links - Favorites, History, Global */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center p-3 h-auto bg-white hover:bg-gray-50"
              onClick={() => handleQuickNavigation('/profile')}
            >
              <span className="text-lg mb-1">⭐</span>
              <span className="text-xs">Favorites</span>
            </Button>
            
            <Button
              variant="outline" 
              className="flex flex-col items-center justify-center p-3 h-auto bg-white hover:bg-gray-50"
              onClick={() => handleQuickNavigation('/profile')}
            >
              <span className="text-lg mb-1">🕒</span>
              <span className="text-xs">History</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center p-3 h-auto bg-white hover:bg-gray-50"
              onClick={() => handleQuickNavigation('/global')}
            >
              <span className="text-lg mb-1">🌍</span>
              <span className="text-xs">Global</span>
            </Button>
          </div>
        </div>

        {/* Quick Access Bar - moved to bottom */}
        <div className="mt-4">
          <QuickAccessBar />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
