
import { useState } from 'react';
import Layout from '../components/Layout';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PantryAddForm, { PantryItem } from '../components/PantryAddForm';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const pantryCategories = [
  { id: 'all', name: 'All' },
  { id: 'produce', name: 'Produce' },
  { id: 'dairy', name: 'Dairy' },
  { id: 'protein', name: 'Protein' },
  { id: 'grains', name: 'Grains' },
  { id: 'spices', name: 'Spices' },
  { id: 'other', name: 'Other' },
];

const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=100&h=100&q=80',
    quantity: '5',
    unit: 'medium',
    expiryStatus: 'good',
    expiryDate: '2025-05-15'
  },
  {
    id: '2',
    name: 'Milk',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=100&h=100&q=80',
    quantity: '1',
    unit: 'liter',
    expiryStatus: 'warning',
    expiryDate: '2025-05-10'
  },
  {
    id: '3',
    name: 'Eggs',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=100&h=100&q=80',
    quantity: '12',
    unit: 'large',
    expiryStatus: 'good',
    expiryDate: '2025-05-20'
  },
  {
    id: '4',
    name: 'Chicken Breast',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=100&h=100&q=80',
    quantity: '500',
    unit: 'g',
    expiryStatus: 'expired',
    expiryDate: '2025-05-07'
  },
  {
    id: '5',
    name: 'Rice',
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=100&h=100&q=80',
    quantity: '2',
    unit: 'kg',
    expiryStatus: 'good',
    expiryDate: '2025-12-31'
  },
];

const getExpiryStatusColor = (status: string) => {
  switch (status) {
    case 'good':
      return 'bg-chef-secondary';
    case 'warning':
      return 'bg-yellow-500';
    case 'expired':
      return 'bg-red-500';
    default:
      return 'bg-chef-secondary';
  }
};

const Pantry = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pantryItems, setPantryItems] = useState<PantryItem[]>(mockPantryItems);
  const [showAddItemDialog, setShowAddItemDialog] = useState(false);
  
  const filteredItems = pantryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleFindRecipes = () => {
    navigate('/');
    // In a real app, this would pass the pantry ingredients to the recipe search
  };

  const handleAddItem = (newItem: PantryItem) => {
    setPantryItems(prev => [newItem, ...prev]);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Smart Pantry</h1>
        </header>
        
        {/* Search Bar and Add Button */}
        <div className="p-4 bg-white flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <Input
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            className="h-10 bg-chef-primary hover:bg-chef-primary/90"
            size="icon"
            onClick={() => setShowAddItemDialog(true)}
          >
            <Plus size={20} />
          </Button>
        </div>
        
        {/* Add Item Dialog */}
        <Dialog open={showAddItemDialog} onOpenChange={setShowAddItemDialog}>
          <DialogContent>
            <PantryAddForm 
              onAddItem={handleAddItem} 
              onClose={() => setShowAddItemDialog(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Category Tabs */}
        <div className="px-4 py-3 bg-white border-t">
          <Tabs 
            value={activeCategory} 
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="w-full overflow-x-auto flex h-12">
              {pantryCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex-1 whitespace-nowrap"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        
        {/* Pantry Items List */}
        <div className="p-4">
          {filteredItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow divide-y">
              {filteredItems.map((item) => (
                <motion.div 
                  key={item.id} 
                  className="flex items-center p-3"
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div 
                      className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${getExpiryStatusColor(item.expiryStatus)}`}
                    ></div>
                  </div>
                  
                  <div className="ml-3 flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-chef-medium-gray">
                      {item.quantity} {item.unit}
                    </p>
                    <p className="text-xs text-chef-medium-gray">
                      {item.expiryStatus === 'expired' ? (
                        <span className="text-red-500">Expired</span>
                      ) : (
                        `Expires: ${new Date(item.expiryDate).toLocaleDateString()}`
                      )}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-chef-medium-gray">
                {searchTerm ? 'No matching ingredients found' : 'Your pantry is empty'}
              </p>
            </div>
          )}
        </div>
        
        {/* Find Recipes from Pantry Button */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-white to-transparent">
          <Button
            className="w-full py-6 bg-chef-secondary hover:bg-chef-secondary/90 flex items-center justify-center gap-3 text-lg"
            onClick={handleFindRecipes}
          >
            <span>Find Recipes from Pantry</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pantry;
