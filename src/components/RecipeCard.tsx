
import { Heart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export type Recipe = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  servings: number;
  usageCount?: number;
  matchPercentage?: number;
};

type RecipeCardProps = {
  recipe: Recipe;
  showMatchPercentage?: boolean;
};

const RecipeCard = ({ recipe, showMatchPercentage = false }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const getDifficultyClass = () => {
    switch (recipe.difficulty) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return 'difficulty-easy';
    }
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <motion.div 
        className="bg-white rounded-lg shadow-md overflow-hidden"
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        <div className="relative h-48">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full"
          >
            <Heart 
              size={20} 
              className={`transition-colors ${
                isFavorite ? 'fill-chef-primary text-chef-primary' : 'text-gray-500'
              }`} 
            />
          </button>
          
          {showMatchPercentage && recipe.matchPercentage && (
            <div className="absolute bottom-2 left-2">
              <Badge 
                className={`${
                  recipe.matchPercentage > 80 
                    ? 'bg-chef-primary' 
                    : 'bg-chef-accent'
                }`}
              >
                {recipe.matchPercentage}% Match
              </Badge>
            </div>
          )}
        </div>
        
        <div className="p-3">
          <h3 className="font-semibold text-lg line-clamp-2 mb-1">{recipe.title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-chef-medium-gray mb-2">
            <span>{recipe.time}</span>
            <span>•</span>
            <div className="flex items-center">
              <span className={`difficulty-dot ${getDifficultyClass()} mr-1`}></span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            <span>•</span>
            <span className="capitalize">{recipe.cuisine}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">{recipe.servings} servings</span>
            {recipe.usageCount && (
              <span className="text-xs text-chef-medium-gray">
                Used {recipe.usageCount} times
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default RecipeCard;
