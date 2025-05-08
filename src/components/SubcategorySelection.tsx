
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from './CategorySelection';

type Subcategory = {
  id: string;
  name: string;
  icon: string;
};

type SubcategorySelectionProps = {
  category: Category;
  onSubcategorySelect: (subcategoryId: string) => void;
  selectedSubcategory: string | null;
};

const SubcategorySelection = ({ 
  category, 
  onSubcategorySelect, 
  selectedSubcategory 
}: SubcategorySelectionProps) => {
  
  const subcategories: Record<Category, Subcategory[]> = {
    food: [
      { id: 'main-dishes', name: 'Main Dishes', icon: '🥘' },
      { id: 'appetizers', name: 'Appetizers', icon: '🍱' },
      { id: 'pickles', name: 'Pickles', icon: '🥒' },
      { id: 'sauces', name: 'Sauces', icon: '🍯' }
    ],
    desserts: [
      { id: 'traditional', name: 'Traditional', icon: '🥮' },
      { id: 'western', name: 'Western', icon: '🍪' },
      { id: 'pastries', name: 'Pastries', icon: '🥐' },
      { id: 'ice-cream', name: 'Ice Cream', icon: '🍦' }
    ],
    drinks: [
      { id: 'detox', name: 'Detox', icon: '🥤' },
      { id: 'cocktails', name: 'Cocktails', icon: '🍸' },
      { id: 'alcoholic', name: 'Alcoholic', icon: '🍷' },
      { id: 'hot-drinks', name: 'Hot Drinks', icon: '☕' }
    ]
  };

  const handleSubcategoryClick = (subcategoryId: string) => {
    onSubcategorySelect(subcategoryId);
  };

  return (
    <div className="px-4 py-3 bg-white">
      <h3 className="text-sm text-chef-medium-gray mb-2">Select a subcategory</h3>
      
      <div className="flex gap-3 pb-1 overflow-x-auto hide-scrollbar">
        {subcategories[category].map((subcategory) => (
          <motion.button
            key={subcategory.id}
            className={`subcategory-chip whitespace-nowrap ${
              selectedSubcategory === subcategory.id ? 'active' : ''
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSubcategoryClick(subcategory.id)}
          >
            <span className="text-xl">{subcategory.icon}</span>
            <span>{subcategory.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SubcategorySelection;
