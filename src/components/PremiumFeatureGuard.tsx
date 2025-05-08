import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockIcon, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type PremiumFeatureGuardProps = {
  children: ReactNode;
  featureName: string;
  requireAuth?: boolean;
};

const PremiumFeatureGuard = ({ 
  children, 
  featureName, 
  requireAuth = true 
}: PremiumFeatureGuardProps) => {
  const navigate = useNavigate();
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  
  // Mock user state - in a real app, this would come from authentication context
  const isAuthenticated = true; // This would be the actual auth state
  const isPremiumUser = false; // This would be the actual premium subscription state
  
  const handleFeatureAccess = () => {
    if (!isAuthenticated && requireAuth) {
      navigate('/login');
      return;
    }
    
    if (!isPremiumUser) {
      setShowPremiumDialog(true);
      return;
    }
    
    // If user is authenticated and has premium access, render the children
  };
  
  const handleNavigateToSubscription = () => {
    setShowPremiumDialog(false);
    navigate('/subscription');
  };
  
  // If user has premium access, render the children directly
  if (isPremiumUser) {
    return <>{children}</>;
  }

  // Otherwise, show premium prompt when trying to access the feature
  return (
    <>
      <div className="relative" onClick={handleFeatureAccess}>
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-md z-10">
          <div className="bg-white p-2 rounded-full">
            <LockIcon className="text-chef-primary" size={24} />
          </div>
        </div>
        {children}
      </div>

      <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="text-yellow-400 fill-yellow-400" size={20} />
              <span>Premium Feature</span>
            </DialogTitle>
            <DialogDescription>
              {featureName} is a premium feature. Upgrade to Chef Sezar Premium to unlock this and many other exclusive features.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-chef-light-gray p-4 rounded-md my-4">
            <h4 className="font-medium mb-2">Premium Benefits:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-chef-primary rounded-full"></span>
                <span>Meal Planning</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-chef-primary rounded-full"></span>
                <span>Shopping List</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-chef-primary rounded-full"></span>
                <span>Cooking Instructions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-chef-primary rounded-full"></span>
                <span>Nutrition Information</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-chef-primary rounded-full"></span>
                <span>Ad-free experience</span>
              </li>
            </ul>
          </div>
          
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button 
              onClick={handleNavigateToSubscription} 
              className="w-full bg-chef-primary hover:bg-chef-primary/90"
            >
              View Premium Plans
            </Button>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">Maybe Later</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumFeatureGuard;
