
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronLeft, User, Info, Shield, File, UserX, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { useDarkMode } from '@/hooks/use-dark-mode';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  // Diet Type state
  const [dietType, setDietType] = useState('omnivore');
  
  // Food allergies state
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);
  
  // Religious dietary restrictions state
  const [religiousRestrictions, setReligiousRestrictions] = useState<string>('');
  
  // Health goals state
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const toggleFoodAllergy = (allergy: string) => {
    if (foodAllergies.includes(allergy)) {
      setFoodAllergies(foodAllergies.filter(item => item !== allergy));
    } else {
      setFoodAllergies([...foodAllergies, allergy]);
    }
  };
  
  const toggleHealthGoal = (goal: string) => {
    if (healthGoals.includes(goal)) {
      setHealthGoals(healthGoals.filter(item => item !== goal));
    } else {
      setHealthGoals([...healthGoals, goal]);
    }
  };
  
  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "This is a demo feature. In a real app, this would delete your account after confirmation."
    });
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="bg-white p-4 flex items-center shadow-sm dark:bg-gray-800">
          <button 
            onClick={handleBack}
            className="mr-4"
          >
            <ChevronLeft size={24} className="text-chef-primary" />
          </button>
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Settings</h1>
        </header>
        
        {/* Profile Settings */}
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Account</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => navigate('/profile')}>
                <div className="flex items-center">
                  <User size={20} className="mr-3 text-chef-primary" />
                  <span>Edit Profile</span>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
              </div>
              
              <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => navigate('/payment-methods')}>
                <div className="flex items-center">
                  <CreditCard size={20} className="mr-3 text-chef-primary" />
                  <span>Payment Methods</span>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
              </div>
            </div>
          </div>
          
          {/* Dietary Preferences */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">Dietary Preferences</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="diet-type">
                <AccordionTrigger>
                  <span className="text-left font-medium">Diet Type</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-2">
                    <Select value={dietType} onValueChange={setDietType}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select diet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="omnivore">Omnivore (No Restrictions)</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="food-allergies">
                <AccordionTrigger>
                  <span className="text-left font-medium">Food Allergies & Intolerances</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="dairy" 
                        checked={foodAllergies.includes('dairy')}
                        onCheckedChange={() => toggleFoodAllergy('dairy')}
                      />
                      <Label htmlFor="dairy">Dairy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="gluten" 
                        checked={foodAllergies.includes('gluten')}
                        onCheckedChange={() => toggleFoodAllergy('gluten')}
                      />
                      <Label htmlFor="gluten">Gluten</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="treenuts" 
                        checked={foodAllergies.includes('treenuts')}
                        onCheckedChange={() => toggleFoodAllergy('treenuts')}
                      />
                      <Label htmlFor="treenuts">Tree Nuts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="shellfish" 
                        checked={foodAllergies.includes('shellfish')}
                        onCheckedChange={() => toggleFoodAllergy('shellfish')}
                      />
                      <Label htmlFor="shellfish">Shellfish</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="soy" 
                        checked={foodAllergies.includes('soy')}
                        onCheckedChange={() => toggleFoodAllergy('soy')}
                      />
                      <Label htmlFor="soy">Soy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="eggs" 
                        checked={foodAllergies.includes('eggs')}
                        onCheckedChange={() => toggleFoodAllergy('eggs')}
                      />
                      <Label htmlFor="eggs">Eggs</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="religious-restrictions">
                <AccordionTrigger>
                  <span className="text-left font-medium">Religious Dietary Restrictions</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="py-2">
                    <Select value={religiousRestrictions} onValueChange={setReligiousRestrictions}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select restriction" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="halal">Halal</SelectItem>
                          <SelectItem value="kosher">Kosher</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="health-goals">
                <AccordionTrigger>
                  <span className="text-left font-medium">Health Goals</span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="low-calorie" 
                        checked={healthGoals.includes('low-calorie')}
                        onCheckedChange={() => toggleHealthGoal('low-calorie')}
                      />
                      <Label htmlFor="low-calorie">Low Calorie</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="low-carb" 
                        checked={healthGoals.includes('low-carb')}
                        onCheckedChange={() => toggleHealthGoal('low-carb')}
                      />
                      <Label htmlFor="low-carb">Low Carb</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="high-protein" 
                        checked={healthGoals.includes('high-protein')}
                        onCheckedChange={() => toggleHealthGoal('high-protein')}
                      />
                      <Label htmlFor="high-protein">High Protein</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="low-fat" 
                        checked={healthGoals.includes('low-fat')}
                        onCheckedChange={() => toggleHealthGoal('low-fat')}
                      />
                      <Label htmlFor="low-fat">Low Fat</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          {/* App Info */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
            <h2 className="text-lg font-semibold mb-4">App Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <Info size={20} className="mr-3 text-chef-primary" />
                  <span>About</span>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <Shield size={20} className="mr-3 text-chef-primary" />
                  <span>Privacy Policy</span>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <File size={20} className="mr-3 text-chef-primary" />
                  <span>Terms of Service</span>
                </div>
                <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
              </div>
              
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center">
                  <Info size={20} className="mr-3 text-chef-primary" />
                  <span>App Version</span>
                </div>
                <span className="text-chef-medium-gray dark:text-gray-400">1.0.0</span>
              </div>
            </div>
          </div>
          
          {/* Account Actions */}
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
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
