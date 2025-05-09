
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock, Star } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PremiumFeatureGuardProps {
  children: React.ReactNode;
  featureName: string;
}

const PremiumFeatureGuard = ({ children, featureName }: PremiumFeatureGuardProps) => {
  const [isPremium, setIsPremium] = useState(() => {
    // Check if user has premium status from localStorage
    return localStorage.getItem('premiumStatus') === 'active';
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Update premium status if it changes
    const checkPremiumStatus = () => {
      setIsPremium(localStorage.getItem('premiumStatus') === 'active');
    };
    
    window.addEventListener('storage', checkPremiumStatus);
    
    return () => {
      window.removeEventListener('storage', checkPremiumStatus);
    };
  }, []);

  const handleActivatePremium = () => {
    localStorage.setItem('premiumStatus', 'active');
    setIsPremium(true);
    
    toast({
      title: "Premium Activated",
      description: "You now have access to all premium features!",
    });
  };

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-chef-light-gray flex flex-col items-center justify-center p-6 dark:bg-gray-900">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center dark:bg-gray-800 dark:text-white">
        <div className="mb-6 bg-amber-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto dark:bg-amber-900/30">
          <Lock size={32} className="text-amber-600 dark:text-amber-400" />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Premium Feature</h2>
        <p className="text-gray-600 mb-6 dark:text-gray-300">
          {featureName} is available exclusively for our premium members.
          Upgrade now to unlock this and many other great features!
        </p>
        
        <div className="bg-gradient-to-r from-amber-100 to-amber-50 p-4 rounded-lg mb-6 dark:from-amber-900/20 dark:to-amber-800/20">
          <div className="flex items-center mb-2">
            <Star size={16} className="text-amber-500 mr-2" />
            <span className="font-medium">Meal Planning</span>
          </div>
          <div className="flex items-center mb-2">
            <Star size={16} className="text-amber-500 mr-2" />
            <span className="font-medium">Shopping List</span>
          </div>
          <div className="flex items-center mb-2">
            <Star size={16} className="text-amber-500 mr-2" />
            <span className="font-medium">Cooking Instructions</span>
          </div>
          <div className="flex items-center">
            <Star size={16} className="text-amber-500 mr-2" />
            <span className="font-medium">Nutrition Analysis</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button 
            className="w-full bg-gradient-to-r from-chef-primary to-chef-primary/90"
            onClick={() => navigate('/subscription')}
          >
            View Subscription Plans
          </Button>
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={handleActivatePremium}
          >
            Activate Premium (Demo)
          </Button>
          
          <Button 
            variant="ghost"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PremiumFeatureGuard;
