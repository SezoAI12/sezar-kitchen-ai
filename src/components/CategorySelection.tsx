import { useState } from 'react';
import { motion } from 'framer-motion';

export type Category = 'food' | 'desserts' | 'drinks';

type CategorySelectionProps = {
  onCategorySelect: (category: Category) => void;
  selectedCategory: Category | null;
};

const CategorySelection = ({ onCategorySelect, selectedCategory }: CategorySelectionProps) => {
  const categories = [
    { 
      id: 'food', 
      name: 'Food', 
      emoji: '🍲', 
      backgroundImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
      description: 'Delicious meals for every occasion'
    },
    { 
      id: 'desserts', 
      name: 'Desserts', 
      emoji: '🍰', 
      backgroundImage: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      description: 'Sweet treats to brighten your day'
    },
    { 
      id: 'drinks', 
      name: 'Drinks', 
      emoji: '🍹', 
      backgroundImage: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      description: 'Refreshing beverages for any mood'
    }
  ];

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);
  };

  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">What would you like to make?</h2>
      
      {/* First category in one row */}
      <motion.div
        key={categories[0].id}
        className={`category-card h-40 mb-4 ${selectedCategory === categories[0].id ? 'ring-4 ring-chef-primary' : ''}`}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleCategoryClick(categories[0].id as Category)}
      >
        <img 
          src={categories[0].backgroundImage} 
          alt={categories[0].name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-4 z-10">
          <div className="flex items-center mb-1">
            <span className="text-3xl mr-2">{categories[0].emoji}</span>
            <h3 className="text-xl text-white font-bold">{categories[0].name}</h3>
          </div>
          <p className="text-white text-sm opacity-90">{categories[0].description}</p>
        </div>
      </motion.div>
      
      {/* Other categories in a grid */}
      <div className="grid grid-cols-2 gap-4">
        {categories.slice(1).map((category) => (
          <motion.div
            key={category.id}
            className={`category-card h-40 ${selectedCategory === category.id ? 'ring-4 ring-chef-primary' : ''}`}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCategoryClick(category.id as Category)}
          >
            <img 
              src={category.backgroundImage} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-start justify-end p-4 z-10">
              <div className="flex items-center mb-1">
                <span className="text-3xl mr-2">{category.emoji}</span>
                <h3 className="text-xl text-white font-bold">{category.name}</h3>
              </div>
              <p className="text-white text-sm opacity-90">{category.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategorySelection;
