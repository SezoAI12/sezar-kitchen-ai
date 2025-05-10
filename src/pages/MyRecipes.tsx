
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronLeft, Edit, Trash, Eye, Heart, Award } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

// Mock data for user's contributed recipes
interface MyRecipe {
  id: string;
  title: string;
  image: string;
  status: 'approved' | 'pending' | 'rejected';
  usageCount: number;
  favorites: number;
  dateSubmitted: string;
}

const MyRecipes = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock data for the user's recipes
  const [myRecipes, setMyRecipes] = useState<MyRecipe[]>([
    {
      id: '1',
      title: 'Homemade Lasagna',
      image: 'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=300&q=80',
      status: 'approved',
      usageCount: 42,
      favorites: 18,
      dateSubmitted: '2025-04-05'
    },
    {
      id: '2',
      title: 'Lemon Chicken with Roasted Vegetables',
      image: 'https://images.unsplash.com/photo-1518492104633-130d0cc84637?auto=format&fit=crop&w=300&q=80',
      status: 'approved',
      usageCount: 24,
      favorites: 9,
      dateSubmitted: '2025-04-12'
    },
    {
      id: '3',
      title: 'Spicy Tofu Stir Fry',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80',
      status: 'pending',
      usageCount: 0,
      favorites: 0,
      dateSubmitted: '2025-05-01'
    }
  ]);
  
  const handleDelete = (id: string) => {
    setMyRecipes(myRecipes.filter(recipe => recipe.id !== id));
    toast({
      title: "Recipe Deleted",
      description: "Your recipe has been successfully deleted."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-amber-500 border-amber-500">Pending Review</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24">
        {/* Header */}
        <header className="bg-white p-4 flex items-center shadow-sm">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ChevronLeft size={24} className="text-chef-primary" />
          </button>
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">My Recipe Log</h1>
        </header>
        
        <div className="p-4">
          {myRecipes.length > 0 ? (
            <div className="space-y-4">
              {myRecipes.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="flex">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title}
                      className="w-24 h-24 object-cover"
                    />
                    <div className="p-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium line-clamp-1">{recipe.title}</h3>
                          <p className="text-xs text-chef-medium-gray">Submitted: {recipe.dateSubmitted}</p>
                        </div>
                        <div>
                          {getStatusBadge(recipe.status)}
                        </div>
                      </div>
                      
                      <div className="flex gap-4 mt-2 text-sm">
                        <div className="flex items-center">
                          <Award size={16} className="text-chef-primary mr-1" />
                          <span>{recipe.usageCount} uses</span>
                        </div>
                        <div className="flex items-center">
                          <Heart size={16} className="text-chef-accent mr-1" />
                          <span>{recipe.favorites} favorites</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {recipe.status === 'approved' && (
                    <div className="flex border-t divide-x">
                      <Button 
                        variant="ghost" 
                        className="flex-1 rounded-none h-10 text-sm"
                        onClick={() => navigate(`/recipe/${recipe.id}`)}
                      >
                        <Eye size={16} className="mr-1" /> View
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="flex-1 rounded-none h-10 text-sm"
                        onClick={() => navigate(`/recipe/edit/${recipe.id}`)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="flex-1 rounded-none h-10 text-sm text-red-500"
                          >
                            <Trash size={16} className="mr-1" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete your recipe "{recipe.title}" and remove it from any users who have it saved.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(recipe.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                  
                  {recipe.status === 'pending' && (
                    <div className="flex border-t divide-x">
                      <Button 
                        variant="ghost" 
                        className="flex-1 rounded-none h-10 text-sm"
                        onClick={() => navigate(`/recipe/edit/${recipe.id}`)}
                      >
                        <Edit size={16} className="mr-1" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="flex-1 rounded-none h-10 text-sm text-red-500"
                          >
                            <Trash size={16} className="mr-1" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete your recipe "{recipe.title}" and cancel the review process.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(recipe.id)} className="bg-red-500 hover:bg-red-600">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
              <div className="mb-4">
                <Award size={48} className="mx-auto text-chef-medium-gray" />
              </div>
              <h3 className="font-semibold mb-2">No Recipes Yet</h3>
              <p className="text-chef-medium-gray mb-4">
                You haven't shared any recipes yet. Create your first recipe to share with the community!
              </p>
              <Button onClick={() => navigate('/recipe/submit')}>
                Create Recipe
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MyRecipes;
