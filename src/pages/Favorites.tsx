
import { useState } from 'react';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { ChevronLeft, Search, BookmarkPlus, FolderPlus, Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the Recipe type
type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  servings: number;
  collection?: string;
};

const Favorites = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCollection, setActiveCollection] = useState<string>('all');
  
  // Mock collections
  const collections = [
    { id: 'all', name: 'All Saved', count: 15 },
    { id: 'weeknight', name: 'Weeknight Dinners', count: 6 },
    { id: 'weekend', name: 'Weekend Cooking', count: 5 },
    { id: 'desserts', name: 'Sweet Treats', count: 4 }
  ];
  
  // Mock favorite recipes data
  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Homemade Pasta with Fresh Tomato Sauce',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
      time: '35 mins',
      difficulty: 'easy',
      cuisine: 'italian',
      servings: 4,
      collection: 'weeknight'
    },
    {
      id: '2',
      title: 'Crispy Chicken Salad with Honey Mustard Dressing',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      time: '20 mins',
      difficulty: 'easy',
      cuisine: 'american',
      servings: 2,
      collection: 'weeknight'
    },
    {
      id: '3',
      title: 'Authentic Mexican Tacos',
      image: 'https://images.unsplash.com/photo-1613514785940-daed77081595?auto=format&fit=crop&w=800&q=80',
      time: '40 mins',
      difficulty: 'medium',
      cuisine: 'mexican',
      servings: 4,
      collection: 'weekend'
    },
    {
      id: '4',
      title: 'Japanese Miso Ramen',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      time: '50 mins',
      difficulty: 'medium',
      cuisine: 'japanese',
      servings: 3,
      collection: 'weekend'
    },
    {
      id: '5',
      title: 'Chocolate Lava Cake',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
      time: '25 mins',
      difficulty: 'medium',
      cuisine: 'dessert',
      servings: 2,
      collection: 'desserts'
    },
    {
      id: '6',
      title: 'Classic New York Cheesecake',
      image: 'https://images.unsplash.com/photo-1533134242443-d4fd258294f1?auto=format&fit=crop&w=800&q=80',
      time: '80 mins',
      difficulty: 'hard',
      cuisine: 'dessert',
      servings: 8,
      collection: 'desserts'
    }
  ];
  
  // Filter recipes based on search query and active collection
  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
    (activeCollection === 'all' || recipe.collection === activeCollection)
  );
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCollectionSelect = (collectionId: string) => {
    setActiveCollection(collectionId);
  };
  
  const handleAddCollection = () => {
    // Implement add collection logic here
    console.log('Add new collection');
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="bg-white p-4 flex items-center justify-between shadow-sm dark:bg-gray-800">
          <div className="flex items-center">
            <button 
              onClick={handleBack}
              className="mr-4"
            >
              <ChevronLeft size={24} className="text-chef-primary" />
            </button>
            <h1 className="text-2xl font-bold font-montserrat text-chef-primary">My Favorites</h1>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Filter size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Alphabetical (A-Z)</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Filter by Cuisine</DropdownMenuItem>
              <DropdownMenuItem>Filter by Difficulty</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder="Search in favorites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Collections Tabs */}
        <div className="px-4 mb-4">
          <ScrollArea className="whitespace-nowrap pb-2">
            <div className="flex space-x-2">
              {collections.map(collection => (
                <Button 
                  key={collection.id}
                  variant={activeCollection === collection.id ? "default" : "outline"}
                  className={`rounded-full ${activeCollection === collection.id ? 'bg-chef-primary' : ''}`}
                  onClick={() => handleCollectionSelect(collection.id)}
                >
                  {collection.name} ({collection.count})
                </Button>
              ))}
              <Button 
                variant="outline" 
                className="rounded-full flex items-center gap-1"
                onClick={handleAddCollection}
              >
                <FolderPlus size={16} />
                <span>New</span>
              </Button>
            </div>
          </ScrollArea>
        </div>
        
        {/* Recipes Grid */}
        <div className="px-4">
          <div className="grid grid-cols-1 gap-4 mb-4">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <div className="p-12 text-center">
                <Heart size={48} className="mx-auto mb-4 text-chef-medium-gray opacity-50 dark:text-gray-500" />
                <h3 className="text-lg font-semibold mb-2">No Favorites Found</h3>
                <p className="text-chef-medium-gray dark:text-gray-400">
                  {searchQuery ? 
                    `No recipes matching "${searchQuery}" in your favorites` : 
                    "You haven't saved any recipes yet"
                  }
                </p>
                
                <Button 
                  onClick={() => navigate('/')}
                  className="mt-6 bg-chef-primary hover:bg-chef-primary/90"
                >
                  Discover Recipes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Favorites;
