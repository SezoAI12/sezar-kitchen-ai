
import { useState } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";

type Ingredient = {
  id: string;
  name: string;
  image: string;
};

const popularIngredients: Ingredient[] = [
  { id: 'chicken', name: 'Chicken', image: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'rice', name: 'Rice', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'tomato', name: 'Tomato', image: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'onion', name: 'Onion', image: 'https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'garlic', name: 'Garlic', image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'pasta', name: 'Pasta', image: 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'potato', name: 'Potato', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=100&h=100&q=80' },
  { id: 'eggs', name: 'Eggs', image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?auto=format&fit=crop&w=100&h=100&q=80' },
];

type IngredientSelectorProps = {
  selectedIngredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
};

const IngredientSelector = ({ 
  selectedIngredients, 
  onIngredientsChange 
}: IngredientSelectorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [customIngredient, setCustomIngredient] = useState('');
  
  const handleAddIngredient = (ingredient: Ingredient) => {
    if (!selectedIngredients.some(item => item.id === ingredient.id)) {
      onIngredientsChange([...selectedIngredients, ingredient]);
    }
  };
  
  const handleRemoveIngredient = (ingredientId: string) => {
    onIngredientsChange(selectedIngredients.filter(item => item.id !== ingredientId));
  };
  
  const handleAddCustomIngredient = () => {
    if (customIngredient.trim()) {
      const newIngredient: Ingredient = {
        id: `custom-${Date.now()}`,
        name: customIngredient.trim(),
        image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=100&h=100&q=80'
      };
      handleAddIngredient(newIngredient);
      setCustomIngredient('');
    }
  };
  
  const filteredIngredients = popularIngredients.filter(ingredient => 
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">My Ingredients</h3>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Plus size={16} />
              <span>Add Ingredients</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Select Ingredients</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <div className="relative mb-4">
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {filteredIngredients.map((ingredient) => {
                  const isSelected = selectedIngredients.some(item => item.id === ingredient.id);
                  return (
                    <div
                      key={ingredient.id}
                      className={`border rounded-lg p-2 cursor-pointer transition-all ${
                        isSelected ? 'border-chef-primary bg-chef-primary/10' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => isSelected ? handleRemoveIngredient(ingredient.id) : handleAddIngredient(ingredient)}
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={ingredient.image} 
                          alt={ingredient.name} 
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span>{ingredient.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Add custom ingredient..." 
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleAddCustomIngredient} disabled={!customIngredient.trim()}>
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {selectedIngredients.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((ingredient) => (
            <Badge 
              key={ingredient.id}
              variant="secondary" 
              className="px-3 py-1 flex items-center gap-2"
            >
              <img 
                src={ingredient.image} 
                alt={ingredient.name} 
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{ingredient.name}</span>
              <X 
                size={14} 
                className="cursor-pointer" 
                onClick={() => handleRemoveIngredient(ingredient.id)} 
              />
            </Badge>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-chef-medium-gray">
            No ingredients selected yet.
            <br />Add ingredients to find matching recipes!
          </p>
        </div>
      )}
    </div>
  );
};

export default IngredientSelector;
