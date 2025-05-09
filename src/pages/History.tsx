
import { useState } from 'react';
import Layout from '../components/Layout';
import RecipeCard from '../components/RecipeCard';
import { ChevronLeft, Clock, Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define the Recipe type with usage count
type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  servings: number;
  usageCount?: number;
  dateViewed?: string;
};

const History = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock history data
  const todayRecipes: Recipe[] = [
    {
      id: '1',
      title: 'Homemade Pasta with Fresh Tomato Sauce',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
      time: '35 mins',
      difficulty: 'easy',
      cuisine: 'italian',
      servings: 4,
      dateViewed: 'Today at 10:30 AM'
    },
    {
      id: '2',
      title: 'Crispy Chicken Salad with Honey Mustard Dressing',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      time: '20 mins',
      difficulty: 'easy',
      cuisine: 'american',
      servings: 2,
      dateViewed: 'Today at 9:15 AM'
    }
  ];

  const yesterdayRecipes: Recipe[] = [
    {
      id: '3',
      title: 'Authentic Mexican Tacos',
      image: 'https://images.unsplash.com/photo-1613514785940-daed77081595?auto=format&fit=crop&w=800&q=80',
      time: '40 mins',
      difficulty: 'medium',
      cuisine: 'mexican',
      servings: 4,
      dateViewed: 'Yesterday at 7:45 PM'
    }
  ];

  const olderRecipes: Recipe[] = [
    {
      id: '4',
      title: 'Japanese Miso Ramen',
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      time: '50 mins',
      difficulty: 'medium',
      cuisine: 'japanese',
      servings: 3,
      dateViewed: 'May 1, 2023'
    },
    {
      id: '5',
      title: 'Mediterranean Greek Salad',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
      time: '15 mins',
      difficulty: 'easy',
      cuisine: 'greek',
      servings: 2,
      dateViewed: 'April 28, 2023'
    },
    {
      id: '6',
      title: 'Classic French Onion Soup',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
      time: '60 mins',
      difficulty: 'hard',
      cuisine: 'french',
      servings: 4,
      dateViewed: 'April 25, 2023'
    }
  ];
  
  // Filter recipes based on search query
  const filteredTodayRecipes = todayRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredYesterdayRecipes = yesterdayRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredOlderRecipes = olderRecipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="bg-white p-4 flex items-center shadow-sm dark:bg-gray-800">
          <button 
            onClick={handleBack}
            className="mr-4"
          >
            <ChevronLeft size={24} className="text-chef-primary" />
          </button>
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Cooking History</h1>
        </header>
        
        {/* Search Bar */}
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder="Search in history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Tabs for different views */}
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Clock size={16} />
              <span>Recent</span>
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Calendar</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent">
            <ScrollArea className="flex-1">
              {/* Today's History */}
              {filteredTodayRecipes.length > 0 && (
                <div className="px-4 mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Clock size={18} className="mr-2 text-chef-primary" />
                    Today
                  </h3>
                  <div className="space-y-4">
                    {filteredTodayRecipes.map(recipe => (
                      <div key={recipe.id} className="recipe-item">
                        <div className="text-xs text-chef-medium-gray mb-1 dark:text-gray-400">
                          {recipe.dateViewed}
                        </div>
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Yesterday's History */}
              {filteredYesterdayRecipes.length > 0 && (
                <div className="px-4 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Yesterday</h3>
                  <div className="space-y-4">
                    {filteredYesterdayRecipes.map(recipe => (
                      <div key={recipe.id} className="recipe-item">
                        <div className="text-xs text-chef-medium-gray mb-1 dark:text-gray-400">
                          {recipe.dateViewed}
                        </div>
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Older History */}
              {filteredOlderRecipes.length > 0 && (
                <div className="px-4 mb-6">
                  <h3 className="text-lg font-semibold mb-3">Earlier</h3>
                  <div className="space-y-4">
                    {filteredOlderRecipes.map(recipe => (
                      <div key={recipe.id} className="recipe-item">
                        <div className="text-xs text-chef-medium-gray mb-1 dark:text-gray-400">
                          {recipe.dateViewed}
                        </div>
                        <RecipeCard recipe={recipe} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* No results message */}
              {filteredTodayRecipes.length === 0 && filteredYesterdayRecipes.length === 0 && filteredOlderRecipes.length === 0 && (
                <div className="p-12 text-center">
                  <Clock size={48} className="mx-auto mb-4 text-chef-medium-gray opacity-50 dark:text-gray-500" />
                  <h3 className="text-lg font-semibold mb-2">No History Found</h3>
                  <p className="text-chef-medium-gray dark:text-gray-400">
                    {searchQuery ? 
                      `No recipes matching "${searchQuery}" in your history` : 
                      "You haven't viewed any recipes yet"
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
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="calendar">
            <div className="p-12 text-center">
              <Calendar size={48} className="mx-auto mb-4 text-chef-medium-gray opacity-50 dark:text-gray-500" />
              <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
              <p className="text-chef-medium-gray dark:text-gray-400">
                Calendar view will be available in the next update
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Clear History Button */}
        {(filteredTodayRecipes.length > 0 || filteredYesterdayRecipes.length > 0 || filteredOlderRecipes.length > 0) && (
          <div className="px-4 pt-2">
            <Button 
              variant="outline" 
              className="w-full border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear Browsing History
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;
