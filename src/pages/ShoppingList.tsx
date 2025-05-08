
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronLeft, Plus, Share2, Trash2, Download, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type GroceryItem = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
};

type GroceryCategory = {
  name: string;
  items: GroceryItem[];
};

const ShoppingList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock grocery data organized by category
  const [categories, setCategories] = useState<GroceryCategory[]>([
    {
      name: 'Dairy',
      items: [
        { id: 'd1', name: 'Eggs', quantity: '12', checked: false, category: 'Dairy' },
        { id: 'd2', name: 'Milk', quantity: '1 gallon', checked: false, category: 'Dairy' },
      ]
    },
    {
      name: 'Meat',
      items: [
        { id: 'm1', name: 'Chicken Breast', quantity: '2 lbs', checked: false, category: 'Meat' },
      ]
    },
    {
      name: 'Produce',
      items: [
        { id: 'p1', name: 'Onion', quantity: '3', checked: false, category: 'Produce' },
        { id: 'p2', name: 'Garlic', quantity: '1 bulb', checked: false, category: 'Produce' },
      ]
    },
    {
      name: 'Pantry',
      items: [
        { id: 'pa1', name: 'Olive Oil', quantity: '1 bottle', checked: false, category: 'Pantry' },
        { id: 'pa2', name: 'Rice', quantity: '2 lbs', checked: false, category: 'Pantry' },
      ]
    },
    {
      name: 'Other',
      items: [
        { id: 'o1', name: 'Aluminum Foil', quantity: '1 roll', checked: false, category: 'Other' },
      ]
    }
  ]);
  
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', category: 'Produce' });
  
  const totalItems = categories.reduce((total, category) => total + category.items.length, 0);
  const checkedItems = categories.reduce((total, category) => 
    total + category.items.filter(item => item.checked).length, 0);
  
  const toggleItemCheck = (categoryIndex: number, itemId: string) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[categoryIndex];
    const itemIndex = category.items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      category.items[itemIndex].checked = !category.items[itemIndex].checked;
      setCategories(updatedCategories);
    }
  };
  
  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      const categoryIndex = categories.findIndex(c => c.name === newItem.category);
      
      if (categoryIndex !== -1) {
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].items.push({
          id: `new-${Date.now()}`,
          name: newItem.name,
          quantity: newItem.quantity,
          checked: false,
          category: newItem.category
        });
        
        setCategories(updatedCategories);
        setNewItem({ name: '', quantity: '', category: 'Produce' });
        setShowAddItem(false);
        
        toast({
          title: "Item added",
          description: `${newItem.name} added to shopping list`
        });
      }
    }
  };
  
  const removeCheckedItems = () => {
    const updatedCategories = categories.map(category => ({
      ...category,
      items: category.items.filter(item => !item.checked)
    })).filter(category => category.items.length > 0);
    
    setCategories(updatedCategories);
    
    toast({
      title: "Items removed",
      description: "Checked items removed from shopping list"
    });
  };
  
  const handleShare = () => {
    toast({
      title: "List shared",
      description: "Shopping list shared successfully"
    });
  };
  
  const handleDownload = () => {
    toast({
      title: "List downloaded",
      description: "Shopping list downloaded as PDF"
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Shopping List</h1>
              <p className="text-chef-medium-gray text-sm">
                {checkedItems}/{totalItems} items checked
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white mt-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowAddItem(!showAddItem)}
            >
              <Plus size={18} />
              <span>Add Item</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="text-chef-medium-gray"
              >
                <Share2 size={18} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                className="text-chef-medium-gray"
              >
                <Download size={18} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={removeCheckedItems}
                className="text-chef-medium-gray"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          </div>
          
          {/* Add Item Form */}
          {showAddItem && (
            <div className="mb-4 p-3 border rounded-md">
              <h3 className="font-medium mb-2">Add New Item</h3>
              <div className="space-y-3">
                <div>
                  <label htmlFor="name" className="text-sm font-medium">Item Name</label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="e.g., Apples"
                  />
                </div>
                
                <div>
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                  <Input
                    id="quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    placeholder="e.g., 5, 2 lbs, 1 bag"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="text-sm font-medium">Category</label>
                  <select
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  >
                    <option value="Produce">Produce</option>
                    <option value="Dairy">Dairy</option>
                    <option value="Meat">Meat</option>
                    <option value="Pantry">Pantry</option>
                    <option value="Bakery">Bakery</option>
                    <option value="Frozen">Frozen</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    className="mr-2"
                    onClick={() => setShowAddItem(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>Add Item</Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Shopping List */}
          <div className="space-y-6">
            {categories.map((category, categoryIndex) => (
              <div key={category.name}>
                <h3 className="font-semibold border-b pb-1 mb-2">{category.name}</h3>
                <ul className="space-y-2">
                  {category.items.map(item => (
                    <li 
                      key={item.id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <button 
                          className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                            item.checked ? 'bg-chef-primary border-chef-primary' : 'border-gray-300'
                          }`}
                          onClick={() => toggleItemCheck(categoryIndex, item.id)}
                        >
                          {item.checked && <Check size={16} className="text-white" />}
                        </button>
                        <span className={item.checked ? 'line-through text-chef-medium-gray' : ''}>
                          {item.name}
                        </span>
                      </div>
                      <span className="text-chef-medium-gray">{item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {categories.length === 0 && (
              <div className="text-center py-8">
                <p className="text-chef-medium-gray mb-2">Your shopping list is empty</p>
                <Button 
                  onClick={() => setShowAddItem(true)} 
                  className="flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>Add Items</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShoppingList;
