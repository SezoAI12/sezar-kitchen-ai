import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
  });
  
  const [dietaryPreferences, setDietaryPreferences] = useState({
    vegetarian: false,
    vegan: false,
    pescatarian: false,
    glutenFree: false,
    dairyFree: false,
    nutFree: false,
    lowCarb: false,
    keto: false,
    paleo: false
  });
  
  const [notifications, setNotifications] = useState({
    push: true,
    email: false,
    offers: true,
    updates: false
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
  };
  
  const toggleDietaryPreference = (preference: keyof typeof dietaryPreferences) => {
    setDietaryPreferences({
      ...dietaryPreferences,
      [preference]: !dietaryPreferences[preference]
    });
    
    toast({
      title: "Preference updated",
      description: `${preference} preference has been updated.`
    });
  };
  
  const toggleNotification = (type: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [type]: !notifications[type]
    });
  };

  return (
    <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>
      
      <div className="bg-white mt-2 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="dietary">Dietary</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile" className="py-4">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 border-2 border-chef-primary">
                <AvatarImage src={profile.photo} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              
              <Button variant="ghost" size="sm" className="mt-2">
                Change Photo
              </Button>
            </div>
            
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Save Changes
              </Button>
            </form>
          </TabsContent>
          
          {/* Dietary Preferences */}
          <TabsContent value="dietary" className="py-4">
            <div className="space-y-4">
              <h3 className="font-semibold mb-2">Dietary Preferences</h3>
              <p className="text-chef-medium-gray text-sm mb-4">
                Select your dietary preferences to get personalized recipe recommendations.
              </p>
              
              <div className="space-y-2">
                {Object.entries(dietaryPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-2 border-b">
                    <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <Switch 
                      checked={value} 
                      onCheckedChange={() => toggleDietaryPreference(key as keyof typeof dietaryPreferences)}
                    />
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-4">
                Apply Preferences
              </Button>
            </div>
          </TabsContent>
          
          {/* Other Settings */}
          <TabsContent value="other" className="py-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Push Notifications</span>
                    <Switch 
                      checked={notifications.push} 
                      onCheckedChange={() => toggleNotification('push')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Email Notifications</span>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={() => toggleNotification('email')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>Special Offers</span>
                    <Switch 
                      checked={notifications.offers} 
                      onCheckedChange={() => toggleNotification('offers')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <span>App Updates</span>
                    <Switch 
                      checked={notifications.updates} 
                      onCheckedChange={() => toggleNotification('updates')}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold mb-2">About</h3>
                
                <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/language')}>
                  Language
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  About Chef Sezar
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  Privacy Policy
                </Button>
                
                <Button variant="ghost" className="w-full justify-start">
                  Terms of Service
                </Button>
              </div>
              
              <Button variant="destructive" className="w-full" onClick={() => navigate('/login')}>
                Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
