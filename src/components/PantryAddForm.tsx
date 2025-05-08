
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from 'lucide-react';

export type PantryItem = {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  image: string;
  expiryDate: string; 
  expiryStatus: 'good' | 'warning' | 'expired';
};

type PantryAddFormProps = {
  onAddItem: (item: PantryItem) => void;
  onClose: () => void;
};

const PantryAddForm = ({ onAddItem, onClose }: PantryAddFormProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  
  const unitOptions = [
    'cups', 'tbsp', 'tsp', 'g', 'kg', 'oz', 'lbs', 'ml', 'L', 
    'pcs', 'slices', 'pinch', 'whole', 'package', 'can', 'bottle'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim() && quantity.trim() && unit) {
      const today = new Date();
      const expiry = expiryDate ? new Date(expiryDate) : new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // Default 30 days
      
      const diffDays = Math.round((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));
      let expiryStatus: 'good' | 'warning' | 'expired' = 'good';
      
      if (diffDays < 0) {
        expiryStatus = 'expired';
      } else if (diffDays < 5) {
        expiryStatus = 'warning';
      }
      
      const newItem: PantryItem = {
        id: Date.now().toString(),
        name: name.trim(),
        quantity: quantity.trim(),
        unit,
        expiryDate: expiry.toISOString().split('T')[0],
        expiryStatus,
        image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=100&h=100&q=80'
      };
      
      onAddItem(newItem);
      
      // Reset form
      setName('');
      setQuantity('');
      setUnit('');
      setExpiryDate('');
      
      // Close form
      onClose();
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-lg">Add Ingredient</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={18} />
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium mb-1 block">Name</label>
          <Input 
            id="name" 
            placeholder="e.g., Sugar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="text-sm font-medium mb-1 block">Quantity</label>
            <Input 
              id="quantity" 
              type="number" 
              placeholder="e.g., 2"
              min="0.01"
              step="0.01"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="unit" className="text-sm font-medium mb-1 block">Unit</label>
            <Select value={unit} onValueChange={setUnit} required>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent position="popper">
                {unitOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label htmlFor="expiry" className="text-sm font-medium mb-1 block">Expiry Date (Optional)</label>
          <Input 
            id="expiry" 
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        
        <Button type="submit" className="w-full bg-chef-primary hover:bg-chef-primary/90">
          Add to Pantry
        </Button>
      </form>
    </div>
  );
};

export default PantryAddForm;
