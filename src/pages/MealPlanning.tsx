
import { useState } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Calendar, Clock, Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type Meal = {
  id: string;
  name: string;
  time: string;
  image: string;
  recipe_id: string;
};

type DayPlan = {
  date: string;
  formatted_date: string;
  day_name: string;
  meals: Meal[];
};

const MealPlanning = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock data for meal plans
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>([
    {
      date: '2023-05-08',
      formatted_date: 'May 8',
      day_name: 'Monday',
      meals: [
        {
          id: 'm1',
          name: 'Avocado Toast',
          time: 'Breakfast',
          image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=200&q=80',
          recipe_id: 'r1'
        },
        {
          id: 'm2',
          name: 'Chicken Salad',
          time: 'Lunch',
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
          recipe_id: 'r2'
        }
      ]
    },
    {
      date: '2023-05-09',
      formatted_date: 'May 9',
      day_name: 'Tuesday',
      meals: [
        {
          id: 'm3',
          name: 'Oatmeal with Berries',
          time: 'Breakfast',
          image: 'https://images.unsplash.com/photo-1517093728432-3c1c481da82d?auto=format&fit=crop&w=200&q=80',
          recipe_id: 'r3'
        }
      ]
    },
    {
      date: '2023-05-10',
      formatted_date: 'May 10',
      day_name: 'Wednesday',
      meals: []
    },
    {
      date: '2023-05-11',
      formatted_date: 'May 11',
      day_name: 'Thursday',
      meals: [
        {
          id: 'm4',
          name: 'Pasta Carbonara',
          time: 'Dinner',
          image: 'https://images.unsplash.com/photo-1588486589329-a8c854e7a1ba?auto=format&fit=crop&w=200&q=80',
          recipe_id: 'r4'
        }
      ]
    },
    {
      date: '2023-05-12',
      formatted_date: 'May 12',
      day_name: 'Friday',
      meals: []
    },
    {
      date: '2023-05-13',
      formatted_date: 'May 13',
      day_name: 'Saturday',
      meals: []
    },
    {
      date: '2023-05-14',
      formatted_date: 'May 14',
      day_name: 'Sunday',
      meals: []
    }
  ]);

  const handleAddMeal = (date: string) => {
    toast({
      title: "Feature coming soon",
      description: "This feature will be available in the next update"
    });
  };
  
  const handleEditMeal = (mealId: string) => {
    toast({
      title: "Edit meal",
      description: `Editing meal ${mealId}`
    });
  };
  
  const handleDeleteMeal = (mealId: string, date: string) => {
    // Find the day in the week plan
    const updatedWeekPlan = weekPlan.map(day => {
      if (day.date === date) {
        return {
          ...day,
          meals: day.meals.filter(meal => meal.id !== mealId)
        };
      }
      return day;
    });
    
    setWeekPlan(updatedWeekPlan);
    
    toast({
      title: "Meal removed",
      description: "Meal has been removed from your plan"
    });
  };

  const handleViewRecipe = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Meal Planning</h1>
              <p className="text-chef-medium-gray text-sm">Plan your meals for the week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white mt-2 p-4">
          <h2 className="text-lg font-semibold mb-4">This Week's Plan</h2>
          
          <div className="space-y-6">
            {weekPlan.map((day) => (
              <div key={day.date} className="border rounded-lg overflow-hidden">
                <div className="bg-chef-light-gray p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-chef-medium-gray" />
                    <span><strong>{day.day_name}</strong> - {day.formatted_date}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleAddMeal(day.date)}
                  >
                    <Plus size={16} />
                    <span className="text-xs">Add</span>
                  </Button>
                </div>
                
                <div>
                  {day.meals.length > 0 ? (
                    day.meals.map((meal) => (
                      <div 
                        key={meal.id}
                        className="flex items-center p-3 border-t"
                      >
                        <div
                          className="w-16 h-16 rounded-md bg-cover bg-center flex-shrink-0 cursor-pointer"
                          style={{ backgroundImage: `url(${meal.image})` }}
                          onClick={() => handleViewRecipe(meal.recipe_id)}
                        ></div>
                        
                        <div className="ml-3 flex-grow" onClick={() => handleViewRecipe(meal.recipe_id)}>
                          <h3 className="font-medium">{meal.name}</h3>
                          <div className="flex items-center text-chef-medium-gray text-sm">
                            <Clock size={14} className="mr-1" />
                            <span>{meal.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-chef-medium-gray"
                            onClick={() => handleEditMeal(meal.id)}
                          >
                            <Edit size={18} />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-chef-medium-gray"
                            onClick={() => handleDeleteMeal(meal.id, day.date)}
                          >
                            <Trash2 size={18} />
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-chef-medium-gray">
                      <p>No meals planned</p>
                      <Button 
                        variant="link" 
                        className="text-chef-primary p-0 h-auto text-sm"
                        onClick={() => handleAddMeal(day.date)}
                      >
                        Add meal
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => navigate('/shopping-list')}
            >
              <span>Generate Shopping List</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MealPlanning;
