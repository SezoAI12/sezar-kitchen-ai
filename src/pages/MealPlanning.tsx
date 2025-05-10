
import { useState } from 'react';
import Layout from '../components/Layout';
import PremiumFeatureGuard from '../components/PremiumFeatureGuard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Plus, ShoppingBasket } from 'lucide-react';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

// Types for our meal planning state
interface MealPlan {
  [date: string]: {
    breakfast?: string[];
    lunch?: string[];
    dinner?: string[];
  };
}

// Mock data for recipe selection
const mockRecipes = [
  { id: '1', title: 'Avocado Toast with Poached Eggs' },
  { id: '2', title: 'Greek Yogurt with Honey and Berries' },
  { id: '3', title: 'Quinoa Breakfast Bowl' },
  { id: '4', title: 'Mediterranean Salad with Chickpeas' },
  { id: '5', title: 'Grilled Chicken Caesar Wrap' },
  { id: '6', title: 'Lentil Soup with Crusty Bread' },
  { id: '7', title: 'Salmon with Roasted Vegetables' },
  { id: '8', title: 'Vegetable Stir Fry with Tofu' },
  { id: '9', title: 'Spaghetti Bolognese' },
  { id: '10', title: 'Homemade Pizza' },
];

const MealPlanningContent = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [mealPlan, setMealPlan] = useState<MealPlan>({});
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '';
  const displayDate = selectedDate ? format(selectedDate, 'M/d/yyyy') : '';
  
  // Initialize the meal plan for the selected date if it doesn't exist
  if (selectedDate && !mealPlan[formattedDate]) {
    setMealPlan({ 
      ...mealPlan, 
      [formattedDate]: { 
        breakfast: [],
        lunch: [],
        dinner: []
      } 
    });
  }
  
  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedMealType(mealType);
    setIsDialogOpen(true);
  };
  
  const handleSelectRecipe = (recipeId: string, recipeTitle: string) => {
    if (selectedDate && selectedMealType) {
      const currentDate = format(selectedDate, 'yyyy-MM-dd');
      const currentMeals = mealPlan[currentDate]?.[selectedMealType] || [];
      
      setMealPlan({
        ...mealPlan,
        [currentDate]: {
          ...mealPlan[currentDate],
          [selectedMealType]: [...currentMeals, recipeTitle]
        }
      });
      
      setIsDialogOpen(false);
    }
  };
  
  const removeMeal = (mealType: 'breakfast' | 'lunch' | 'dinner', index: number) => {
    if (selectedDate) {
      const currentDate = format(selectedDate, 'yyyy-MM-dd');
      const updatedMeals = [...(mealPlan[currentDate]?.[mealType] || [])];
      updatedMeals.splice(index, 1);
      
      setMealPlan({
        ...mealPlan,
        [currentDate]: {
          ...mealPlan[currentDate],
          [mealType]: updatedMeals
        }
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">Meal Planning</h1>
        <p className="text-chef-medium-gray mb-4">Plan your meals for the week</p>

        {/* Calendar for date selection */}
        <div className="bg-chef-light-gray p-4 rounded-lg mb-6">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto border rounded-md bg-white p-3 pointer-events-auto"
          />
        </div>

        {/* Meals for selected date */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Meals for {displayDate}</h2>
          
          {/* Breakfast */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Breakfast</h3>
            </div>
            {mealPlan[formattedDate]?.breakfast && mealPlan[formattedDate].breakfast.length > 0 ? (
              <div className="bg-chef-light-gray p-3 rounded-lg">
                {mealPlan[formattedDate].breakfast.map((meal, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span>{meal}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 h-auto py-1"
                      onClick={() => removeMeal('breakfast', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full flex items-center justify-center border border-dashed border-chef-medium-gray/30"
                  onClick={() => handleAddMeal('breakfast')}
                >
                  <Plus size={16} className="mr-1" /> Add Another
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-16 flex items-center justify-center"
                onClick={() => handleAddMeal('breakfast')}
              >
                <Plus size={20} className="mr-2" />
                Add Breakfast
              </Button>
            )}
          </div>
          
          {/* Lunch */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Lunch</h3>
            </div>
            {mealPlan[formattedDate]?.lunch && mealPlan[formattedDate].lunch.length > 0 ? (
              <div className="bg-chef-light-gray p-3 rounded-lg">
                {mealPlan[formattedDate].lunch.map((meal, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span>{meal}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 h-auto py-1"
                      onClick={() => removeMeal('lunch', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full flex items-center justify-center border border-dashed border-chef-medium-gray/30"
                  onClick={() => handleAddMeal('lunch')}
                >
                  <Plus size={16} className="mr-1" /> Add Another
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-16 flex items-center justify-center"
                onClick={() => handleAddMeal('lunch')}
              >
                <Plus size={20} className="mr-2" />
                Add Lunch
              </Button>
            )}
          </div>
          
          {/* Dinner */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">Dinner</h3>
            </div>
            {mealPlan[formattedDate]?.dinner && mealPlan[formattedDate].dinner.length > 0 ? (
              <div className="bg-chef-light-gray p-3 rounded-lg">
                {mealPlan[formattedDate].dinner.map((meal, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <span>{meal}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 h-auto py-1"
                      onClick={() => removeMeal('dinner', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full flex items-center justify-center border border-dashed border-chef-medium-gray/30"
                  onClick={() => handleAddMeal('dinner')}
                >
                  <Plus size={16} className="mr-1" /> Add Another
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full h-16 flex items-center justify-center"
                onClick={() => handleAddMeal('dinner')}
              >
                <Plus size={20} className="mr-2" />
                Add Dinner
              </Button>
            )}
          </div>
        </div>
        
        {/* Shopping List Button */}
        <div className="fixed bottom-20 right-4 md:bottom-8">
          <Button
            className="flex items-center justify-center gap-2 shadow-lg"
            onClick={() => navigate('/shopping-list')}
          >
            <ShoppingBasket size={18} />
            View Shopping List
          </Button>
        </div>
      </div>
      
      {/* Recipe Selection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Select Recipe for {selectedMealType ? selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1) : ''}
            </DialogTitle>
            <DialogDescription>
              Choose from your saved recipes or search for new ones.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-2 p-1">
              {mockRecipes.map(recipe => (
                <div
                  key={recipe.id}
                  className="p-3 rounded-lg border hover:bg-chef-light-gray cursor-pointer"
                  onClick={() => handleSelectRecipe(recipe.id, recipe.title)}
                >
                  <p>{recipe.title}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MealPlanning = () => {
  return (
    <Layout>
      <PremiumFeatureGuard featureName="Meal Planning">
        <MealPlanningContent />
      </PremiumFeatureGuard>
    </Layout>
  );
};

export default MealPlanning;
