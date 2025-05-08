
import { ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type FindRecipesButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
};

const FindRecipesButton = ({ onClick, isLoading = false }: FindRecipesButtonProps) => {
  return (
    <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-white to-transparent">
      <Button
        className="w-full py-6 bg-gradient-to-r from-chef-primary to-chef-primary/80 hover:opacity-95 flex items-center justify-center gap-3 text-lg"
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
            <span>Find Recipes</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default FindRecipesButton;
