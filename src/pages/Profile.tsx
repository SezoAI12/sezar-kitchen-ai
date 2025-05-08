
import { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Settings, 
  ChevronRight, 
  Heart, 
  Clock, 
  Star,
  LogOut,
  Calendar,
  ShoppingBasket,
  FileText,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const handleLogout = () => {
    // Here you would handle the actual logout logic
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
    navigate('/login');
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Profile</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
            <Settings size={20} />
          </Button>
        </header>
        
        {/* Profile Info */}
        <div className="bg-white p-6 flex items-center">
          <Avatar className="h-20 w-20 border-2 border-chef-primary">
            <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          
          <div className="ml-4 flex-1">
            <h2 className="text-xl font-semibold">Jane Doe</h2>
            <p className="text-chef-medium-gray">jane.doe@example.com</p>
            
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/settings')}
                className="flex items-center gap-1"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subscription Card */}
        <div className="mt-4 mx-4 p-4 bg-gradient-to-r from-chef-primary to-chef-primary/80 text-white rounded-lg shadow">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Free Plan</h3>
            <Button 
              variant="secondary" 
              size="sm" 
              className="text-chef-primary"
              onClick={() => navigate('/subscription')}
            >
              Upgrade
            </Button>
          </div>
          
          <p className="text-sm mt-2 opacity-90">
            Unlock premium features like detailed nutrition analysis, meal planning, and more!
          </p>
        </div>
        
        {/* Premium Features */}
        <div className="mt-4 px-4 py-3 bg-white">
          <h3 className="text-lg font-semibold mb-3">Premium Features</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center"
              onClick={() => navigate('/meal-planning')}
            >
              <Calendar size={24} className="mb-2 text-chef-primary" />
              <span>Meal Planning</span>
            </Button>
            
            <Button 
              variant="outline"
              className="h-auto py-4 flex flex-col items-center"
              onClick={() => navigate('/shopping-list')}
            >
              <ShoppingBasket size={24} className="mb-2 text-chef-accent" />
              <span>Shopping List</span>
            </Button>
          </div>
        </div>
        
        {/* My Collections */}
        <div className="mt-4 px-4 py-3 bg-white">
          <h3 className="text-lg font-semibold mb-3">My Collections</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-chef-light-gray p-4 rounded-lg flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-2 text-chef-primary">
                <Heart size={24} />
              </div>
              <h4 className="font-medium">Favorites</h4>
              <p className="text-sm text-chef-medium-gray">15 recipes</p>
            </div>
            
            <div className="bg-chef-light-gray p-4 rounded-lg flex flex-col items-center">
              <div className="bg-white p-3 rounded-full mb-2 text-chef-accent">
                <Clock size={24} />
              </div>
              <h4 className="font-medium">History</h4>
              <p className="text-sm text-chef-medium-gray">8 recipes</p>
            </div>
          </div>
        </div>
        
        {/* Create Recipe */}
        <div className="mt-4 px-4">
          <Button 
            variant="default" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => navigate('/recipe/submit')}
          >
            <FileText size={18} />
            <span>Create New Recipe</span>
          </Button>
        </div>
        
        {/* Account Settings */}
        <div className="mt-4 px-4 py-3 bg-white">
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          
          <div className="divide-y">
            <div className="py-3 flex items-center justify-between" onClick={() => navigate('/settings')}>
              <div className="flex items-center">
                <span>Dietary Preferences</span>
              </div>
              <ChevronRight size={20} className="text-chef-medium-gray" />
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <span>Notifications</span>
              </div>
              <Switch />
            </div>
            
            <div className="py-3 flex items-center justify-between" onClick={() => navigate('/language')}>
              <div className="flex items-center">
                <span>Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-chef-medium-gray mr-2">English</span>
                <ChevronRight size={20} className="text-chef-medium-gray" />
              </div>
            </div>
            
            {/* Logout Button */}
            <div className="py-3 flex items-center justify-between" onClick={handleLogout}>
              <div className="flex items-center">
                <LogOut size={20} className="mr-2 text-red-500" />
                <span className="text-red-500">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
