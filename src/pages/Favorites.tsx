
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Heart, ChevronLeft, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Favorites = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading for favorite recipes
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockFavorites: Recipe[] = [
        {
          id: '1',
          title: 'Classic Margherita Pizza',
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
          time: '45 mins',
          difficulty: 'medium',
          cuisine: 'italian',
          servings: 4,
          usageCount: 12
        },
        {
          id: '2',
          title: 'Homemade Chocolate Cake',
          image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
          time: '90 mins',
          difficulty: 'hard',
          cuisine: 'dessert',
          servings: 8,
          usageCount: 5
        },
        {
          id: '3',
          title: 'Mediterranean Salad',
          image: 'https://images.unsplash.com/photo-1540420828642-fca2c5c18abe?auto=format&fit=crop&w=800&q=80',
          time: '15 mins',
          difficulty: 'easy',
          cuisine: 'mediterranean',
          servings: 2,
          usageCount: 8
        }
      ];
      
      setFavoriteRecipes(mockFavorites);
      setFilteredRecipes(mockFavorites);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = favoriteRecipes.filter((recipe) => 
        recipe.title.toLowerCase().includes(query) || 
        recipe.cuisine.toLowerCase().includes(query)
      );
      setFilteredRecipes(filtered);
    }
  }, [searchQuery, favoriteRecipes]);

  // Handle removing from favorites
  const handleRemoveFromFavorites = (recipeId: string) => {
    const updatedFavorites = favoriteRecipes.filter(recipe => recipe.id !== recipeId);
    setFavoriteRecipes(updatedFavorites);
    
    toast({
      title: "Removed from favorites",
      description: "Recipe has been removed from your favorites."
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header with back button */}
        <div className="bg-white p-4 flex items-center shadow-sm">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate(-1)} 
            className="mr-2"
          >
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Favorites</h1>
        </div>
        
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
            <Input 
              placeholder="Search favorites..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white"
            />
          </div>
        </div>
        
        {/* Favorites List */}
        <div className="px-4 py-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <p>Loading your favorites...</p>
            </div>
          ) : filteredRecipes.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your Favorite Recipes</h2>
              {filteredRecipes.map(recipe => (
                <div key={recipe.id} className="relative">
                  <RecipeCard recipe={recipe} />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-sm"
                    onClick={() => handleRemoveFromFavorites(recipe.id)}
                  >
                    <Heart size={16} className="fill-chef-primary text-chef-primary" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto mb-4 text-chef-medium-gray" />
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-chef-medium-gray mb-6">
                Start adding your favorite recipes here
              </p>
              <Button onClick={() => navigate('/global')}>
                Browse Recipes
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
