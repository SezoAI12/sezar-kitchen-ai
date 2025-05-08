
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  Bookmark, 
  Share2, 
  ChevronLeft, 
  Clock,
  Users,
  ChefHat,
  Star
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Recipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [servings, setServings] = useState(4);
  
  // Mock recipe data
  const recipe = {
    id: id || '1',
    title: 'Homemade Pasta with Fresh Tomato Sauce',
    images: [
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498579485796-98be3abc076e?auto=format&fit=crop&w=800&q=80',
    ],
    time: '35 mins',
    difficulty: 'easy',
    cuisine: 'italian',
    servings: 4,
    usageCount: 245,
    description: 'A classic Italian pasta dish with a rich and flavorful tomato sauce. Simple ingredients come together to create a delicious meal that\'s perfect for any occasion.',
    ingredients: [
      { name: 'All-purpose flour', quantity: '2', unit: 'cups' },
      { name: 'Eggs', quantity: '3', unit: 'large' },
      { name: 'Salt', quantity: '1/2', unit: 'tsp' },
      { name: 'Olive oil', quantity: '1', unit: 'tbsp' },
      { name: 'Fresh tomatoes', quantity: '6', unit: 'medium' },
      { name: 'Garlic cloves', quantity: '3', unit: 'cloves' },
      { name: 'Basil leaves', quantity: '1', unit: 'handful' },
      { name: 'Parmesan cheese', quantity: '1/4', unit: 'cup' },
    ],
    instructions: [
      'In a large bowl, mix flour and salt. Make a well in the center and add eggs.',
      'Gradually mix together until a dough forms. Knead for 10 minutes until smooth.',
      'Wrap in plastic and let rest for 30 minutes at room temperature.',
      'Roll out the dough into thin sheets and cut into your desired pasta shape.',
      'Bring a large pot of salted water to a boil.',
      'Meanwhile, heat olive oil in a pan over medium heat. Add minced garlic and cook until fragrant.',
      'Add diced tomatoes and cook for 15-20 minutes until sauce thickens.',
      'Season with salt, pepper, and torn basil leaves.',
      'Cook pasta in boiling water for 2-3 minutes until al dente.',
      'Drain pasta and toss with sauce. Serve with grated Parmesan cheese.',
    ],
    nutrition: {
      calories: 320,
      protein: '12g',
      carbs: '54g',
      fat: '8g',
      isPremium: true,
    }
  };
  
  const handleSave = () => {
    setIsSaved(!isSaved);
  };
  
  const handleShare = () => {
    // Implement share functionality
    alert('Share functionality would open native share dialog');
  };
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const adjustServings = (increment: number) => {
    const newServings = servings + increment;
    if (newServings >= 1) {
      setServings(newServings);
    }
  };
  
  const calculateAdjustedQuantity = (quantity: string, originalServings: number) => {
    const numericQuantity = parseFloat(quantity);
    if (isNaN(numericQuantity)) return quantity;
    
    const ratio = servings / originalServings;
    const adjusted = (numericQuantity * ratio).toFixed(1).replace(/\.0$/, '');
    return adjusted;
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        {/* Recipe Image Section */}
        <div className="relative h-64">
          <img 
            src={recipe.images[0]} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
            <button 
              onClick={handleBack}
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              <button 
                onClick={handleSave}
                className="bg-white/80 backdrop-blur-sm p-2 rounded-full"
              >
                <Bookmark 
                  size={24} 
                  className={isSaved ? "fill-chef-primary text-chef-primary" : ""}
                />
              </button>
              
              <button 
                onClick={handleShare}
                className="bg-white/80 backdrop-blur-sm p-2 rounded-full"
              >
                <Share2 size={24} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Recipe Info Section */}
        <div className="bg-white p-4 shadow-sm">
          <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>
          
          <div className="flex flex-wrap gap-3 mb-3">
            <div className="flex items-center gap-1 text-chef-medium-gray">
              <Clock size={16} />
              <span>{recipe.time}</span>
            </div>
            
            <div className="flex items-center gap-1 text-chef-medium-gray">
              <span className={`difficulty-dot difficulty-easy`}></span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            
            <div className="flex items-center gap-1 text-chef-medium-gray">
              <ChefHat size={16} />
              <span className="capitalize">{recipe.cuisine}</span>
            </div>
          </div>
          
          <p className="text-chef-dark-gray mb-4">{recipe.description}</p>
          
          {/* Servings Adjuster */}
          <div className="flex items-center justify-between bg-chef-light-gray rounded-lg p-3 mb-2">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>Servings</span>
            </div>
            
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => adjustServings(-1)}
                disabled={servings <= 1}
              >
                -
              </Button>
              <span className="mx-3 font-semibold">{servings}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 rounded-full"
                onClick={() => adjustServings(1)}
              >
                +
              </Button>
            </div>
          </div>
        </div>
        
        {/* Recipe Content Tabs */}
        <div className="bg-white mt-2 pb-4">
          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ingredients" className="p-4">
              <ul className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex justify-between items-center pb-2 border-b">
                    <span>{ingredient.name}</span>
                    <span className="font-medium">
                      {calculateAdjustedQuantity(ingredient.quantity, recipe.servings)} {ingredient.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="instructions" className="p-4">
              <ol className="space-y-4 list-decimal list-outside ml-5">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="pl-2">
                    {step}
                  </li>
                ))}
              </ol>
            </TabsContent>
            
            <TabsContent value="nutrition" className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Basic Nutrition Facts</h3>
                <Badge className="bg-chef-primary">Per Serving</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-chef-light-gray rounded-lg p-3 text-center">
                  <p className="text-sm text-chef-medium-gray">Calories</p>
                  <p className="text-xl font-semibold">{recipe.nutrition.calories}</p>
                </div>
                <div className="bg-chef-light-gray rounded-lg p-3 text-center">
                  <p className="text-sm text-chef-medium-gray">Protein</p>
                  <p className="text-xl font-semibold">{recipe.nutrition.protein}</p>
                </div>
                <div className="bg-chef-light-gray rounded-lg p-3 text-center">
                  <p className="text-sm text-chef-medium-gray">Carbs</p>
                  <p className="text-xl font-semibold">{recipe.nutrition.carbs}</p>
                </div>
                <div className="bg-chef-light-gray rounded-lg p-3 text-center">
                  <p className="text-sm text-chef-medium-gray">Fat</p>
                  <p className="text-xl font-semibold">{recipe.nutrition.fat}</p>
                </div>
              </div>
              
              {recipe.nutrition.isPremium && (
                <div className="mt-6 border border-dashed border-chef-primary rounded-lg p-4 flex items-center gap-3">
                  <Star className="text-chef-primary fill-chef-primary" />
                  <div>
                    <h4 className="font-semibold">Detailed Nutrition Analysis</h4>
                    <p className="text-sm text-chef-medium-gray">Upgrade to premium for complete nutritional breakdown</p>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Cook Now Button */}
        <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-gradient-to-t from-white to-transparent">
          <Button
            className="w-full py-6 bg-chef-secondary hover:bg-chef-secondary/90 flex items-center justify-center gap-3 text-lg"
          >
            <ChefHat size={24} />
            <span>Cook Now</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Recipe;
