
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type FindRecipesButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
  text?: string;
};

const FindRecipesButton = ({ onClick, isLoading = false, text = "Find a Recipe Using AI" }: FindRecipesButtonProps) => {
  return (
    <div className="py-3">
      <Button
        className="w-full py-6 bg-gradient-to-r from-chef-primary to-chef-primary/80 hover:opacity-95 flex items-center justify-center gap-3 text-lg shadow-md"
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <ChefHat size={24} />
            </motion.div>
            <span>Finding Recipes...</span>
          </>
        ) : (
          <>
            <ChefHat size={24} className="transition-transform group-hover:animate-spin-slow" />
            <span>{text}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default FindRecipesButton;
