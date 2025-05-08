
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  ChevronLeft, 
  ChevronRight,
  Globe, 
  Bell, 
  Shield, 
  Info,
  UserCog,
  Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [notifications, setNotifications] = useState({
    recipes: true,
    reminders: true,
    news: false,
    offers: false
  });
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully"
    });
    navigate('/login');
  };
  
  const showDeleteConfirmation = () => {
    toast({
      title: "Delete Account",
      description: "This action would show a confirmation dialog"
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
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
        </div>
        
        <div className="bg-white mt-2">
          {/* Account Section */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-2">Account</h2>
            
            <div className="space-y-2">
              <button 
                className="w-full flex items-center justify-between py-2 px-1"
                onClick={() => navigate('/profile/edit')}
              >
                <div className="flex items-center">
                  <UserCog size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Edit Profile</span>
                </div>
                <ChevronRight size={18} className="text-chef-medium-gray" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between py-2 px-1"
                onClick={() => navigate('/language')}
              >
                <div className="flex items-center">
                  <Globe size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Language</span>
                </div>
                <div className="flex items-center">
                  <span className="text-chef-medium-gray mr-2">English</span>
                  <ChevronRight size={18} className="text-chef-medium-gray" />
                </div>
              </button>
            </div>
          </div>
          
          {/* Notifications Section */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-2">Notifications</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Recipe Recommendations</span>
                </div>
                <Switch 
                  checked={notifications.recipes} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, recipes: checked })} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Cooking Reminders</span>
                </div>
                <Switch 
                  checked={notifications.reminders} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, reminders: checked })} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-3 text-chef-medium-gray" />
                  <span>News & Updates</span>
                </div>
                <Switch 
                  checked={notifications.news} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, news: checked })} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Special Offers</span>
                </div>
                <Switch 
                  checked={notifications.offers} 
                  onCheckedChange={(checked) => setNotifications({ ...notifications, offers: checked })} 
                />
              </div>
            </div>
          </div>
          
          {/* Information Section */}
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-2">Information</h2>
            
            <div className="space-y-2">
              <button 
                className="w-full flex items-center justify-between py-2 px-1"
                onClick={() => navigate('/about')}
              >
                <div className="flex items-center">
                  <Info size={18} className="mr-3 text-chef-medium-gray" />
                  <span>About Chef Sezar</span>
                </div>
                <ChevronRight size={18} className="text-chef-medium-gray" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between py-2 px-1"
                onClick={() => navigate('/privacy-policy')}
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronRight size={18} className="text-chef-medium-gray" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between py-2 px-1"
                onClick={() => navigate('/terms')}
              >
                <div className="flex items-center">
                  <Shield size={18} className="mr-3 text-chef-medium-gray" />
                  <span>Terms of Service</span>
                </div>
                <ChevronRight size={18} className="text-chef-medium-gray" />
              </button>
            </div>
          </div>
          
          {/* Danger Zone */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2 text-red-500">Danger Zone</h2>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600"
                onClick={showDeleteConfirmation}
              >
                <Trash2 size={18} className="mr-2" />
                Delete Account
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
