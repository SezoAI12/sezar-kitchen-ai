
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Layout from '../components/Layout';
import CategorySelection, { Category } from '../components/CategorySelection';
import SubcategorySelection from '../components/SubcategorySelection';
import FilterSystem, { FilterOptions } from '../components/FilterSystem';
import FindRecipesButton from '../components/FindRecipesButton';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import { Globe, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Global = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };
  
  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
  };
  
  const handleFilterChange = (filters: FilterOptions) => {
    setFilterOptions(filters);
  };
  
  // Function to browse global recipes
  const handleFindRecipes = () => {
    if (!selectedCategory) {
      toast({
        title: "No category selected",
        description: "Please select a category to browse recipes.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockRecipes: Recipe[] = [
        {
          id: '5',
          title: 'Traditional Italian Carbonara',
          image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
          time: '25 mins',
          difficulty: 'medium',
          cuisine: 'italian',
          servings: 2,
          usageCount: 418
        },
        {
          id: '6',
          title: 'Authentic Mexican Tacos',
          image: 'https://images.unsplash.com/photo-1613514785940-daed77081595?auto=format&fit=crop&w=800&q=80',
          time: '40 mins',
          difficulty: 'easy',
          cuisine: 'mexican',
          servings: 4,
          usageCount: 356
        },
        {
          id: '7',
          title: 'Japanese Miso Ramen',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
          time: '50 mins',
          difficulty: 'medium',
          cuisine: 'japanese',
          servings: 3,
          usageCount: 289
        },
        {
          id: '8',
          title: 'Lebanese Tabbouleh Salad',
          image: 'https://images.unsplash.com/photo-1645116616283-8fce17cf9e39?auto=format&fit=crop&w=800&q=80',
          time: '20 mins',
          difficulty: 'easy',
          cuisine: 'lebanese',
          servings: 6,
          usageCount: 175
        }
      ];
      
      setRecipes(mockRecipes);
      setIsLoading(false);
      
      toast({
        title: "Recipes Found!",
        description: `Found ${mockRecipes.length} ${selectedCategory} recipes in our global cuisine collection.`,
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Global Cuisine</h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setShowFilters(!showFilters)} 
            className={showFilters ? "bg-chef-primary/10" : ""}
          >
            <Filter size={20} />
          </Button>
        </header>
        
        {/* Global Cuisine Explanation */}
        <div className="bg-gradient-to-r from-chef-primary/10 to-chef-secondary/10 p-4 mb-2">
          <p className="text-sm flex items-center gap-2">
            <Globe className="text-chef-primary" size={18} />
            <span>Browse our global recipe database by country, dish type, and dietary preferences.</span>
          </p>
        </div>
        
        {/* Category Selection */}
        <CategorySelection 
          onCategorySelect={handleCategorySelect} 
          selectedCategory={selectedCategory} 
        />
        
        {/* Subcategory Selection - Show only if a category is selected */}
        {selectedCategory && (
          <SubcategorySelection 
            category={selectedCategory} 
            onSubcategorySelect={handleSubcategorySelect} 
            selectedSubcategory={selectedSubcategory} 
          />
        )}
        
        {/* Filter Section */}
        {showFilters && (
          <FilterSystem 
            onFilterChange={handleFilterChange} 
            currentFilters={filterOptions} 
            useButtonStyles={true}
          />
        )}
        
        {/* Recipe Results - Show only if recipes exist */}
        {recipes.length > 0 && (
          <section className="px-4 py-6">
            <h2 className="text-xl font-bold mb-4">Global Cuisine Collection</h2>
            <div className="grid grid-cols-1 gap-4">
              {recipes.map(recipe => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                />
              ))}
            </div>
          </section>
        )}
        
        {/* Browse Recipes Button */}
        <div className="px-4 py-3">
          <FindRecipesButton 
            onClick={handleFindRecipes} 
            isLoading={isLoading} 
            text="Browse Global Recipes"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Global;
