
import { useState } from 'react';
import Layout from '../components/Layout';
import { 
  Settings, 
  ChevronRight, 
  Heart, 
  Clock, 
  Star,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header Section */}
        <header className="bg-white p-4 flex justify-between items-center shadow-sm">
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Profile</h1>
          <Button variant="ghost" size="icon">
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
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
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
            >
              Upgrade
            </Button>
          </div>
          
          <p className="text-sm mt-2 opacity-90">
            Unlock premium features like detailed nutrition analysis, meal planning, and more!
          </p>
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
        
        {/* Account Settings */}
        <div className="mt-4 px-4 py-3 bg-white">
          <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
          
          <div className="divide-y">
            <div className="py-3 flex items-center justify-between">
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
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <span>Language</span>
              </div>
              <div className="flex items-center">
                <span className="text-chef-medium-gray mr-2">English</span>
                <ChevronRight size={20} className="text-chef-medium-gray" />
              </div>
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <span>About Chef Sezar</span>
              </div>
              <ChevronRight size={20} className="text-chef-medium-gray" />
            </div>
            
            <div className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <span>Privacy Policy</span>
              </div>
              <ChevronRight size={20} className="text-chef-medium-gray" />
            </div>
          </div>
        </div>
        
        {/* Log Out */}
        <div className="mt-4 px-4">
          <Button 
            variant="destructive" 
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
