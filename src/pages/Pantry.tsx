
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import Layout from '../components/Layout';
import PantryAddForm from '../components/PantryAddForm';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Plus, ShoppingCart, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type PantryItem = {
  id: string;
  name: string;
  category: string;
  quantity: string;
  expiry?: string;
  isLowStock: boolean;
};

const Pantry = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [pantryItems, setPantryItems] = useState<PantryItem[]>([
    { id: '1', name: 'Chicken Breast', category: 'Protein', quantity: '500g', expiry: '2025-05-15', isLowStock: false },
    { id: '2', name: 'Brown Rice', category: 'Grains', quantity: '2kg', isLowStock: false },
    { id: '3', name: 'Olive Oil', category: 'Oils', quantity: '500ml', isLowStock: false },
    { id: '4', name: 'Garlic', category: 'Produce', quantity: '1 head', expiry: '2025-05-20', isLowStock: false },
    { id: '5', name: 'Tomatoes', category: 'Produce', quantity: '4 pcs', expiry: '2025-05-10', isLowStock: true },
    { id: '6', name: 'Pasta', category: 'Grains', quantity: '1kg', isLowStock: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['All', 'Produce', 'Protein', 'Dairy', 'Grains', 'Spices', 'Oils', 'Baking'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const addItemToPantry = (item: Omit<PantryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
    };
    
    setPantryItems([...pantryItems, newItem]);
    setIsAddingItem(false);
    
    toast({
      title: "Item Added",
      description: `${item.name} has been added to your pantry.`,
    });
  };

  const filteredItems = pantryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleQuickRecipe = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Quick Recipe Found!",
        description: "We've found a recipe based on your pantry ingredients."
      });
      navigate('/global');
    }, 1200);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Smart Pantry</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsAddingItem(true)}
            disabled={isAddingItem}
          >
            <Plus size={20} />
          </Button>
        </header>
        
        {isAddingItem ? (
          <PantryAddForm 
            onSubmit={addItemToPantry} 
            onCancel={() => setIsAddingItem(false)} 
          />
        ) : (
          <>
            {/* Search */}
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
                <Input 
                  placeholder="Search your pantry..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="px-4 overflow-auto">
              <div className="flex space-x-2 pb-2 overflow-x-auto scrollbar-none">
                {categories.map((category) => (
                  <Button 
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Quick Recipe Button */}
            <div className="px-4 py-3">
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:opacity-90 flex items-center justify-center gap-2 py-2"
                onClick={handleQuickRecipe}
                disabled={isLoading}
              >
                <Zap size={18} className={isLoading ? "animate-pulse" : ""} />
                <span>{isLoading ? "Finding Recipe..." : "Find Quick Recipe"}</span>
              </Button>
            </div>
            
            {/* Pantry Items */}
            <div className="px-4">
              <h2 className="text-lg font-semibold mb-3">Your Pantry ({filteredItems.length})</h2>
              
              {filteredItems.length > 0 ? (
                <div className="space-y-2">
                  {filteredItems.map((item) => (
                    <div 
                      key={item.id} 
                      className={`bg-white p-3 rounded-lg flex justify-between items-center ${item.isLowStock ? 'border-l-4 border-yellow-400' : ''}`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Checkbox id={`item-${item.id}`} />
                          <Label htmlFor={`item-${item.id}`} className="text-base font-medium cursor-pointer">{item.name}</Label>
                        </div>
                        <div className="ml-6 text-xs text-chef-medium-gray flex gap-2">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>{item.quantity}</span>
                          {item.expiry && (
                            <>
                              <span>•</span>
                              <span>Exp: {new Date(item.expiry).toLocaleDateString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="icon" className="text-chef-medium-gray">
                        <ShoppingCart size={18} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg text-center">
                  <p className="text-chef-medium-gray">No items found. Add some ingredients to your pantry!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Pantry;
