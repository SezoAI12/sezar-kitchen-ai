
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Clock, ChevronLeft, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RecipeCard, { Recipe } from '../components/RecipeCard';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const History = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewHistory, setViewHistory] = useState<(Recipe & { viewedAt: string })[]>([]);
  const [filteredHistory, setFilteredHistory] = useState<(Recipe & { viewedAt: string })[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data loading for history
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockHistory: (Recipe & { viewedAt: string })[] = [
        {
          id: '5',
          title: 'Traditional Italian Carbonara',
          image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
          time: '25 mins',
          difficulty: 'medium',
          cuisine: 'italian',
          servings: 2,
          usageCount: 418,
          viewedAt: '2025-05-08T14:30:00'
        },
        {
          id: '6',
          title: 'Authentic Mexican Tacos',
          image: 'https://images.unsplash.com/photo-1613514785940-daed77081595?auto=format&fit=crop&w=800&q=80',
          time: '40 mins',
          difficulty: 'easy',
          cuisine: 'mexican',
          servings: 4,
          usageCount: 356,
          viewedAt: '2025-05-07T18:15:00'
        },
        {
          id: '7',
          title: 'Japanese Miso Ramen',
          image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
          time: '50 mins',
          difficulty: 'medium',
          cuisine: 'japanese',
          servings: 3,
          usageCount: 289,
          viewedAt: '2025-05-06T12:45:00'
        }
      ];
      
      setViewHistory(mockHistory);
      setFilteredHistory(mockHistory);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredHistory(viewHistory);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = viewHistory.filter((item) => 
        item.title.toLowerCase().includes(query) || 
        item.cuisine.toLowerCase().includes(query)
      );
      setFilteredHistory(filtered);
    }
  }, [searchQuery, viewHistory]);

  // Handle clearing history
  const handleClearHistory = () => {
    setViewHistory([]);
    setFilteredHistory([]);
    
    toast({
      title: "History cleared",
      description: "Your viewing history has been cleared."
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Header with back button */}
        <div className="bg-white p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate(-1)} 
              className="mr-2"
            >
              <ChevronLeft size={24} />
            </Button>
            <h1 className="text-2xl font-bold font-montserrat text-chef-primary">History</h1>
          </div>
          
          {viewHistory.length > 0 && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleClearHistory}
              className="text-chef-medium-gray"
            >
              <Trash2 size={18} />
            </Button>
          )}
        </div>
        
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
            <Input 
              placeholder="Search history..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white"
            />
          </div>
        </div>
        
        {/* History List */}
        <div className="px-4 py-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <p>Loading your history...</p>
            </div>
          ) : filteredHistory.length > 0 ? (
            <div className="space-y-6">
              {filteredHistory.map(item => (
                <div key={item.id}>
                  <div className="flex items-center mb-2">
                    <Clock size={14} className="text-chef-medium-gray mr-2" />
                    <span className="text-xs text-chef-medium-gray">
                      Viewed on {formatDate(item.viewedAt)}
                    </span>
                  </div>
                  <RecipeCard recipe={item} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock size={48} className="mx-auto mb-4 text-chef-medium-gray" />
              <h3 className="text-xl font-semibold mb-2">No viewing history</h3>
              <p className="text-chef-medium-gray mb-6">
                Recipes you view will appear here
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

export default History;
