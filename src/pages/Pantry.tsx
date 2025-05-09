
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, ChevronDown, ChevronUp, Trash2, Plus, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import PantryAddForm, { PantryItem } from '../components/PantryAddForm';
import FindRecipesButton from '../components/FindRecipesButton';

const Pantry = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(() => {
    // Initialize with some mock data
    const initialData: PantryItem[] = [
      {
        id: '1',
        name: 'Eggs',
        quantity: '6',
        unit: 'pcs',
        image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=100&h=100&q=80',
        expiryDate: '2025-08-20',
        expiryStatus: 'good'
      },
      {
        id: '2',
        name: 'Milk',
        quantity: '0.5',
        unit: 'L',
        image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&h=100&q=80',
        expiryDate: '2025-05-15',
        expiryStatus: 'warning'
      },
      {
        id: '3',
        name: 'Tomatoes',
        quantity: '4',
        unit: 'pcs',
        image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=100&h=100&q=80',
        expiryDate: '2025-05-10',
        expiryStatus: 'warning'
      },
      {
        id: '4',
        name: 'Chicken Breast',
        quantity: '500',
        unit: 'g',
        image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=100&h=100&q=80',
        expiryDate: '2025-05-08',
        expiryStatus: 'expired'
      },
    ];
    
    return initialData;
  });
  
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'expiring-soon': true,
    'good': true,
    'expired': false
  });
  
  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category]
    });
  };
  
  const handleAddItem = (item: PantryItem) => {
    setPantryItems([...pantryItems, item]);
    
    toast({
      title: "Item added",
      description: `${item.name} has been added to your pantry.`
    });
  };
  
  const handleRemoveItem = (id: string) => {
    setPantryItems(pantryItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your pantry."
    });
  };
  
  const handleFindQuickRecipes = () => {
    setIsRecipeLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsRecipeLoading(false);
      
      toast({
        title: "Recipes found",
        description: "We've found several recipes based on your pantry ingredients"
      });
      
      navigate('/global');
    }, 1500);
  };
  
  const filteredItems = pantryItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const expiringItems = filteredItems.filter(item => item.expiryStatus === 'warning');
  const goodItems = filteredItems.filter(item => item.expiryStatus === 'good');
  const expiredItems = filteredItems.filter(item => item.expiryStatus === 'expired');
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm dark:bg-gray-800">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary dark:text-chef-primary/90">Smart Pantry</h1>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <PlusCircle size={20} />
          </Button>
        </header>
        
        {/* Search Section */}
        <div className="p-4">
          <div className="relative">
            <Input
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
        
        {/* Summary Section */}
        <div className="px-4 mb-2">
          <div className="bg-white p-4 rounded-lg shadow-sm dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-2">Pantry Summary</h3>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="font-bold text-xl">{pantryItems.length}</p>
                <p className="text-sm text-chef-medium-gray dark:text-gray-400">Total Items</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-amber-500">{expiringItems.length}</p>
                <p className="text-sm text-chef-medium-gray dark:text-gray-400">Expiring Soon</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-xl text-red-500">{expiredItems.length}</p>
                <p className="text-sm text-chef-medium-gray dark:text-gray-400">Expired</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Find Quick Recipe Button */}
        <div className="px-4 py-2">
          <FindRecipesButton 
            onClick={handleFindQuickRecipes} 
            isLoading={isRecipeLoading}
            text="Find Quick Recipe from Pantry"
          />
        </div>

        {/* Pantry Items List */}
        <ScrollArea className="flex-1">
          {expiringItems.length > 0 && (
            <div className="px-4 py-2">
              <div 
                className="flex justify-between items-center py-2 border-b dark:border-gray-700" 
                onClick={() => toggleCategory('expiring-soon')}
              >
                <h3 className="text-amber-500 font-semibold">Expiring Soon</h3>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {expandedCategories['expiring-soon'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </div>
              {expandedCategories['expiring-soon'] && (
                <div className="py-2 space-y-3">
                  {expiringItems.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-lg p-3 flex items-center shadow-sm dark:bg-gray-800"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-900/30 dark:border-amber-700">
                            Expires soon
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-chef-medium-gray dark:text-gray-400">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {goodItems.length > 0 && (
            <div className="px-4 py-2">
              <div 
                className="flex justify-between items-center py-2 border-b dark:border-gray-700" 
                onClick={() => toggleCategory('good')}
              >
                <h3 className="text-green-600 font-semibold">Good</h3>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {expandedCategories['good'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </div>
              {expandedCategories['good'] && (
                <div className="py-2 space-y-3">
                  {goodItems.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-lg p-3 flex items-center shadow-sm dark:bg-gray-800"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-chef-medium-gray dark:text-gray-400">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {expiredItems.length > 0 && (
            <div className="px-4 py-2">
              <div 
                className="flex justify-between items-center py-2 border-b dark:border-gray-700" 
                onClick={() => toggleCategory('expired')}
              >
                <h3 className="text-red-500 font-semibold">Expired</h3>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  {expandedCategories['expired'] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </Button>
              </div>
              {expandedCategories['expired'] && (
                <div className="py-2 space-y-3">
                  {expiredItems.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-white rounded-lg p-3 flex items-center shadow-sm dark:bg-gray-800"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{item.name}</h4>
                          <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 dark:bg-red-900/30 dark:border-red-700">
                            Expired
                          </Badge>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-chef-medium-gray dark:text-gray-400">
                            {item.quantity} {item.unit}
                          </span>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {filteredItems.length === 0 && (
            <div className="px-4 py-12 text-center">
              <p className="text-chef-medium-gray dark:text-gray-400 mb-4">Your pantry is empty. Add some ingredients!</p>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus size={16} />
                <span>Add Ingredient</span>
              </Button>
            </div>
          )}
        </ScrollArea>
        
        {/* Add Item Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <PantryAddForm onAddItem={handleAddItem} onClose={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Pantry;
