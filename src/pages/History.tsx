
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, Clock, Calendar, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '../components/Layout';
import { useUsageTracker, RecipeUsage } from '@/services/UsageTracker';
import { useToast } from '@/components/ui/use-toast';

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const usageTracker = useUsageTracker();
  const [searchTerm, setSearchTerm] = useState('');
  const [recipeHistory, setRecipeHistory] = useState<RecipeUsage[]>([]);
  
  useEffect(() => {
    // Get recipe history from usage tracker
    const history = usageTracker.getHistory();
    setRecipeHistory(history);
  }, [usageTracker]);
  
  const filteredHistory = recipeHistory.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  const handleViewRecipe = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };
  
  const handleClearHistory = () => {
    // In a real app, you'd implement this functionality
    toast({
      title: "Feature coming soon",
      description: "History clearing will be available in a future update."
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={() => navigate(-1)} className="mr-2">
                <ChevronLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold">Recipe History</h1>
            </div>
            
            {recipeHistory.length > 0 && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleClearHistory}
                className="text-chef-medium-gray"
              >
                <Trash2 size={20} />
              </Button>
            )}
          </div>
        </div>
        
        {/* Search Section */}
        {recipeHistory.length > 0 && (
          <div className="p-4 bg-white mt-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}
        
        {/* History List */}
        <section className="px-4 py-6">
          {filteredHistory.length > 0 ? (
            <div className="space-y-4">
              {filteredHistory.map((recipe) => (
                <div
                  key={recipe.recipeId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden card-hover"
                  onClick={() => handleViewRecipe(recipe.recipeId)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{recipe.title}</h3>
                      <div className="text-xs text-chef-medium-gray flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>
                          {recipe.viewCount} {recipe.viewCount === 1 ? 'view' : 'views'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-chef-medium-gray">
                      <Calendar size={14} className="mr-1" />
                      <span>Last viewed: {formatDate(recipe.lastViewed)}</span>
                    </div>
                    
                    {recipe.cooked && (
                      <div className="mt-2 inline-flex items-center px-2 py-1 bg-chef-secondary/10 text-chef-secondary text-xs rounded-full">
                        <span>Cooked {recipe.cookCount} {recipe.cookCount === 1 ? 'time' : 'times'}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-chef-light-gray rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-chef-medium-gray" />
              </div>
              <h3 className="font-semibold text-lg">No history yet</h3>
              <p className="text-chef-medium-gray mt-2 mb-6">
                Your recently viewed recipes will appear here.
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

export default History;
