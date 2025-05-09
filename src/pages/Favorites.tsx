
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { useUsageTracker } from '@/services/UsageTracker';
import { useToast } from '@/components/ui/use-toast';

type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  servings: number;
};

const Favorites = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const usageTracker = useUsageTracker();
  const [searchTerm, setSearchTerm] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  
  // Sample recipe data that would be populated from favorites
  const allRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Spaghetti Carbonara',
      image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=400&q=80',
      time: '35 min',
      difficulty: 'medium',
      cuisine: 'italian',
      servings: 4,
    },
    {
      id: '2',
      title: 'Chicken Stir-Fry',
      image: 'https://images.unsplash.com/photo-1546793665-490e79690e32?auto=format&fit=crop&w=400&q=80',
      time: '35 min',
      difficulty: 'easy',
      cuisine: 'chinese',
      servings: 3,
    },
    {
      id: '3',
      title: 'Mushroom Risotto',
      image: 'https://images.unsplash.com/photo-1518675215778-45c40942617a?auto=format&fit=crop&w=400&q=80',
      time: '50 min',
      difficulty: 'medium',
      cuisine: 'italian',
      servings: 4,
    },
    {
      id: '4',
      title: 'Vegan Chili',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2e3bb?auto=format&fit=crop&w=400&q=80',
      time: '55 min',
      difficulty: 'easy',
      cuisine: 'american',
      servings: 6,
    },
  ];
  
  useEffect(() => {
    // Get favorite recipes from usage tracker
    const favorites = usageTracker.getFavorites();
    
    // In a real app, you'd fetch the full recipe details from an API
    // For now, we'll simulate by matching with our sample recipes
    const favoriteRecipeDetails = allRecipes.filter(recipe => 
      favorites.some(fav => fav.recipeId === recipe.id)
    );
    
    setFavoriteRecipes(favoriteRecipeDetails);
  }, [usageTracker]);
  
  const removeFromFavorites = (recipeId: string) => {
    // Toggle favorite status (will remove since it's already favorite)
    usageTracker.toggleFavorite(recipeId);
    
    // Update displayed favorites
    setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
    
    toast({
      title: "Removed from favorites",
      description: "Recipe removed from your favorites"
    });
  };
  
  const filteredRecipes = favoriteRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">My Favorites</h1>
          </div>
        </div>
        
        {/* Search Section */}
        <div className="p-4 bg-white mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Favorites List */}
        <section className="px-4 py-6">
          {filteredRecipes.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mb-4">
                Your Favorite Recipes
                <span className="text-chef-primary ml-2">({filteredRecipes.length})</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="relative">
                    <RecipeCard recipe={recipe} />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-chef-primary rounded-full shadow-sm"
                      onClick={() => removeFromFavorites(recipe.id)}
                    >
                      <Heart size={16} fill="#FF6B35" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-chef-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} className="text-chef-medium-gray" />
              </div>
              <h3 className="font-semibold text-lg">No favorites yet</h3>
              <p className="text-chef-medium-gray mt-2 mb-6">
                Start adding your favorite recipes by tapping the heart icon on recipes you love.
              </p>
              <Button
                onClick={() => navigate('/global')}
                className="bg-chef-primary hover:bg-chef-primary/90"
              >
                Discover Recipes
              </Button>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Favorites;
