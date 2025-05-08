
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight, Plus, ShoppingCart } from 'lucide-react';

type Meal = {
  id: string;
  title: string;
  recipeId: string;
  image: string;
};

type MealPlan = {
  breakfast: Meal | null;
  lunch: Meal | null;
  dinner: Meal | null;
};

type MealPlans = {
  [date: string]: MealPlan;
};

const MealPlanning = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlans>({});
  
  const formattedDate = date.toISOString().split('T')[0];
  
  // Initialize today's plan if it doesn't exist
  if (!mealPlans[formattedDate]) {
    setMealPlans({
      ...mealPlans,
      [formattedDate]: {
        breakfast: null,
        lunch: null,
        dinner: null
      }
    });
  }
  
  const currentPlan = mealPlans[formattedDate] || {
    breakfast: null,
    lunch: null,
    dinner: null
  };
  
  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    // In a real app, this would open a meal selector
    // For now, let's add a mock meal
    const mockMeals = {
      breakfast: {
        id: 'b1',
        title: 'Avocado Toast with Eggs',
        recipeId: 'recipe-1',
        image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
      },
      lunch: {
        id: 'l1',
        title: 'Quinoa Salad Bowl',
        recipeId: 'recipe-2',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
      },
      dinner: {
        id: 'd1',
        title: 'Baked Salmon with Vegetables',
        recipeId: 'recipe-3',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80'
      }
    };
    
    setMealPlans({
      ...mealPlans,
      [formattedDate]: {
        ...currentPlan,
        [mealType]: mockMeals[mealType]
      }
    });
  };
  
  const handleRemoveMeal = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setMealPlans({
      ...mealPlans,
      [formattedDate]: {
        ...currentPlan,
        [mealType]: null
      }
    });
  };
  
  const handleViewShoppingList = () => {
    navigate('/shopping-list');
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold text-center mb-1">Meal Planning</h1>
          <p className="text-chef-medium-gray text-center text-sm">Plan your meals for the week</p>
        </div>
        
        <div className="bg-white mt-2 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Calendar</h2>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(new Date(date.getTime() - 86400000))}
              >
                <ChevronLeft size={20} />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(new Date())}
              >
                Today
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDate(new Date(date.getTime() + 86400000))}
              >
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
          
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border"
          />
        </div>
        
        <div className="bg-white mt-2 p-4">
          <h3 className="text-lg font-semibold mb-2">
            Meals for {formatDate(date)}
          </h3>
          
          {/* Breakfast */}
          <div className="mb-4 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Breakfast</h4>
              {currentPlan.breakfast ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleRemoveMeal('breakfast')}
                >
                  Remove
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddMeal('breakfast')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </Button>
              )}
            </div>
            
            {currentPlan.breakfast ? (
              <div className="flex items-center">
                <img 
                  src={currentPlan.breakfast.image} 
                  alt={currentPlan.breakfast.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3">
                  <p className="font-medium">{currentPlan.breakfast.title}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-chef-primary"
                    onClick={() => navigate(`/recipe/${currentPlan.breakfast?.recipeId}`)}
                  >
                    View Recipe
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-chef-medium-gray">No breakfast planned</div>
            )}
          </div>
          
          {/* Lunch */}
          <div className="mb-4 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Lunch</h4>
              {currentPlan.lunch ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleRemoveMeal('lunch')}
                >
                  Remove
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddMeal('lunch')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </Button>
              )}
            </div>
            
            {currentPlan.lunch ? (
              <div className="flex items-center">
                <img 
                  src={currentPlan.lunch.image} 
                  alt={currentPlan.lunch.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3">
                  <p className="font-medium">{currentPlan.lunch.title}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-chef-primary"
                    onClick={() => navigate(`/recipe/${currentPlan.lunch?.recipeId}`)}
                  >
                    View Recipe
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-chef-medium-gray">No lunch planned</div>
            )}
          </div>
          
          {/* Dinner */}
          <div className="mb-4 border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">Dinner</h4>
              {currentPlan.dinner ? (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleRemoveMeal('dinner')}
                >
                  Remove
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddMeal('dinner')}
                  className="flex items-center gap-1"
                >
                  <Plus size={16} />
                  <span>Add</span>
                </Button>
              )}
            </div>
            
            {currentPlan.dinner ? (
              <div className="flex items-center">
                <img 
                  src={currentPlan.dinner.image} 
                  alt={currentPlan.dinner.title} 
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="ml-3">
                  <p className="font-medium">{currentPlan.dinner.title}</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-chef-primary"
                    onClick={() => navigate(`/recipe/${currentPlan.dinner?.recipeId}`)}
                  >
                    View Recipe
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-chef-medium-gray">No dinner planned</div>
            )}
          </div>
        </div>
        
        {/* Shopping List Button */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-white to-transparent max-w-md mx-auto">
          <Button
            className="w-full py-6 bg-chef-primary hover:bg-chef-primary/90 flex items-center justify-center gap-3"
            onClick={handleViewShoppingList}
          >
            <ShoppingCart size={20} />
            <span>View Shopping List</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MealPlanning;
