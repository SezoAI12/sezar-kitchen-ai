
import { useState } from 'react';
import Layout from '../components/Layout';
import CategorySelection, { Category } from '../components/CategorySelection';
import SubcategorySelection from '../components/SubcategorySelection';
import IngredientSelector from '../components/IngredientSelector';
import FilterSystem, { FilterOptions } from '../components/FilterSystem';
import QuickAccessBar from '../components/QuickAccessBar';
import RecipeCard from '../components/RecipeCard';
import FindRecipesButton from '../components/FindRecipesButton';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Ingredient = {
  id: string;
  name: string;
  image: string;
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateRecipe = () => {
    navigate('/recipe/submit');
  };

  const handleFindRecipes = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  // Sample recipe data for demonstration
  const recipes = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=400&q=80',
      time: '35 min',
      difficulty: 'medium' as const,
      cuisine: 'italian',
      servings: 4,
    },
    {
      id: '2',
      title: 'Chicken Stir-Fry',
      image: 'https://images.unsplash.com/photo-1546793665-490e79690e32?auto=format&fit=crop&w=400&q=80',
      time: '35 min',
      difficulty: 'easy' as const,
      cuisine: 'chinese',
      servings: 3,
    },
    {
      id: '3',
      title: 'Mushroom Risotto',
      image: 'https://images.unsplash.com/photo-1518675215778-45c40942617a?auto=format&fit=crop&w=400&q=80',
      time: '50 min',
      difficulty: 'medium' as const,
      cuisine: 'italian',
      servings: 4,
    },
    {
      id: '4',
      title: 'Vegan Chili',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2e3bb?auto=format&fit=crop&w=400&q=80',
      time: '55 min',
      difficulty: 'easy' as const,
      cuisine: 'american',
      servings: 6,
    },
  ];

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
        
        {/* Find Recipes Button */}
        <FindRecipesButton 
          onClick={handleFindRecipes}
          isLoading={isLoading}
        />
        
        {/* Share Recipe Button - Moved below Find Recipes button */}
        <div className="px-4 py-3 bg-white border-b">
          <Button 
            onClick={handleCreateRecipe}
            className="w-full flex items-center justify-center gap-2 bg-chef-secondary hover:bg-chef-secondary/90"
          >
            <FileText size={18} />
            <span>Share Your Culinary Creation</span>
          </Button>
        </div>

        {/* Quick Access Bar - Moved below Share Recipe button */}
        <QuickAccessBar />
        
        {/* Recipe Results */}
        <section className="px-4 py-6">
          <h2 className="text-xl font-bold mb-4">Recipes For You</h2>
          <div className="grid grid-cols-2 gap-4">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
