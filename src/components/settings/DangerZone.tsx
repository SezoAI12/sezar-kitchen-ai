
import { UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const DangerZone = () => {
  const { toast } = useToast();
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "This is a demo feature. In a real app, this would delete your account after confirmation."
    });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
      <div className="space-y-4">
        <Button 
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          onClick={handleDeleteAccount}
        >
          <UserX size={18} />
          <span>Delete My Account</span>
        </Button>
      </div>
    </div>
  );
};

export default DangerZone;
