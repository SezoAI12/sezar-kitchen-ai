
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext } from "react";
import Index from "./pages/Index";
import Global from "./pages/Global";
import Pantry from "./pages/Pantry";
import Profile from "./pages/Profile";
import Recipe from "./pages/Recipe";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LanguageSelection from "./pages/LanguageSelection";
import MealPlanning from "./pages/MealPlanning";
import ShoppingList from "./pages/ShoppingList";
import Subscription from "./pages/Subscription";
import Payment from "./pages/Payment";
import RecipeSubmission from "./pages/RecipeSubmission";
import Settings from "./pages/Settings";
import AdminPanel from "./pages/AdminPanel";
import { useUsageTracker } from "./services/UsageTracker";

// Create a context for the usage tracker
export const UsageTrackerContext = createContext<ReturnType<typeof useUsageTracker> | null>(null);

// Custom hook to use the usage tracker
export const useUsageTrackerContext = () => {
  const context = useContext(UsageTrackerContext);
  if (!context) {
    throw new Error('useUsageTrackerContext must be used within a UsageTrackerProvider');
  }
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  const usageTracker = useUsageTracker();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <UsageTrackerContext.Provider value={usageTracker}>
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/language" element={<LanguageSelection />} />
              
              {/* Main Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/global" element={<Global />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              
              {/* Recipe Routes */}
              <Route path="/recipe/:id" element={<Recipe />} />
              <Route path="/recipe/submit" element={<RecipeSubmission />} />
              
              {/* Premium Features */}
              <Route path="/meal-planning" element={<MealPlanning />} />
              <Route path="/shopping-list" element={<ShoppingList />} />
              
              {/* Subscription and Payment */}
              <Route path="/subscription" element={<Subscription />} />
              <Route path="/payment" element={<Payment />} />
              
              {/* Admin Panel */}
              <Route path="/admin" element={<AdminPanel />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UsageTrackerContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
