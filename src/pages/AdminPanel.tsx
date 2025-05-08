
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Users, FileText, ShoppingBasket, Settings, Activity, User, Search, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data
  const stats = {
    users: 1423,
    recipes: 354,
    subscriptions: 87,
    activeUsers: 218
  };
  
  const latestUsers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', joined: '2023-04-28' },
    { id: '2', name: 'Sarah Smith', email: 'sarah.s@example.com', joined: '2023-04-27' },
    { id: '3', name: 'Mike Johnson', email: 'mike.j@example.com', joined: '2023-04-25' },
  ];
  
  const latestRecipes = [
    { id: '1', title: 'Creamy Pasta', author: 'Jane Doe', submitted: '2023-04-28', status: 'pending' },
    { id: '2', title: 'Chocolate Cake', author: 'Mike Johnson', submitted: '2023-04-26', status: 'approved' },
    { id: '3', title: 'Vegetable Stir Fry', author: 'Sarah Smith', submitted: '2023-04-25', status: 'approved' },
  ];
  
  const handleApproveRecipe = (recipeId: string) => {
    toast({
      title: "Recipe approved",
      description: "The recipe has been approved and published."
    });
  };
  
  const handleRejectRecipe = (recipeId: string) => {
    toast({
      title: "Recipe rejected",
      description: "The recipe has been rejected and the author notified."
    });
  };
  
  const handleViewUser = (userId: string) => {
    toast({
      title: "View user details",
      description: `Viewing details for user ID: ${userId}`
    });
  };

  return (
    <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center">
          <button onClick={() => navigate('/')} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
      </div>
      
      <div className="bg-white mt-2 p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="recipes">Recipes</TabsTrigger>
          </TabsList>
          
          {/* Dashboard */}
          <TabsContent value="dashboard" className="py-4">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-chef-light-gray rounded-lg p-4 flex flex-col items-center">
                <Users className="text-chef-primary mb-2" size={32} />
                <h3 className="font-semibold">Users</h3>
                <p className="text-2xl font-bold">{stats.users}</p>
              </div>
              
              <div className="bg-chef-light-gray rounded-lg p-4 flex flex-col items-center">
                <FileText className="text-chef-accent mb-2" size={32} />
                <h3 className="font-semibold">Recipes</h3>
                <p className="text-2xl font-bold">{stats.recipes}</p>
              </div>
              
              <div className="bg-chef-light-gray rounded-lg p-4 flex flex-col items-center">
                <ShoppingBasket className="text-green-500 mb-2" size={32} />
                <h3 className="font-semibold">Subscriptions</h3>
                <p className="text-2xl font-bold">{stats.subscriptions}</p>
              </div>
              
              <div className="bg-chef-light-gray rounded-lg p-4 flex flex-col items-center">
                <Activity className="text-blue-500 mb-2" size={32} />
                <h3 className="font-semibold">Active Users</h3>
                <p className="text-2xl font-bold">{stats.activeUsers}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-3">Latest Users</h3>
              <div className="bg-chef-light-gray rounded-lg p-4">
                <ul className="divide-y">
                  {latestUsers.map(user => (
                    <li key={user.id} className="py-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-chef-medium-gray">{user.email}</p>
                        </div>
                        <p className="text-xs text-chef-medium-gray">
                          Joined: {new Date(user.joined).toLocaleDateString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-2" onClick={() => setActiveTab('users')}>
                  View All Users
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Pending Approvals</h3>
              <div className="bg-chef-light-gray rounded-lg p-4">
                <ul className="divide-y">
                  {latestRecipes.filter(r => r.status === 'pending').map(recipe => (
                    <li key={recipe.id} className="py-2">
                      <div className="mb-1">
                        <p className="font-medium">{recipe.title}</p>
                        <p className="text-sm text-chef-medium-gray">
                          By: {recipe.author} • {new Date(recipe.submitted).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleApproveRecipe(recipe.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-red-500" onClick={() => handleRejectRecipe(recipe.id)}>
                          Reject
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-2" onClick={() => setActiveTab('recipes')}>
                  View All Recipes
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Users */}
          <TabsContent value="users" className="py-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-3 border-b font-medium text-sm">
                <span>Name</span>
                <span>Actions</span>
              </div>
              
              <ul className="divide-y">
                {latestUsers.map(user => (
                  <li key={user.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-chef-medium-gray">{user.email}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleViewUser(user.id)}>
                        <User size={16} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
          
          {/* Recipes */}
          <TabsContent value="recipes" className="py-4">
            <div className="mb-4 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search recipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter size={18} />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-3 border-b font-medium text-sm">
                <span>Recipe</span>
                <span>Status</span>
              </div>
              
              <ul className="divide-y">
                {latestRecipes.map(recipe => (
                  <li key={recipe.id} className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{recipe.title}</p>
                        <p className="text-sm text-chef-medium-gray">
                          By: {recipe.author} • {new Date(recipe.submitted).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        recipe.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        recipe.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {recipe.status.charAt(0).toUpperCase() + recipe.status.slice(1)}
                      </span>
                    </div>
                    
                    {recipe.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" className="flex-1" onClick={() => handleApproveRecipe(recipe.id)}>
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-red-500" onClick={() => handleRejectRecipe(recipe.id)}>
                          Reject
                        </Button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Bottom Actions */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-white to-transparent max-w-md mx-auto">
        <Button
          className="w-full bg-chef-primary hover:bg-chef-primary/90"
          onClick={() => {
            toast({
              title: "Settings updated",
              description: "App settings have been saved"
            });
          }}
        >
          <Settings size={18} className="mr-2" />
          <span>App Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default AdminPanel;
