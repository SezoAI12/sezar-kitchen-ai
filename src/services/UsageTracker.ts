
import { useState, useEffect } from 'react';

export type RecipeUsage = {
  recipeId: string;
  title: string;
  lastViewed: Date;
  viewCount: number;
  favorite: boolean;
  cooked: boolean;
  cookCount: number;
};

export const useUsageTracker = () => {
  const [recipeHistory, setRecipeHistory] = useState<RecipeUsage[]>([]);
  
  useEffect(() => {
    // Load recipe history from localStorage on component mount
    const savedHistory = localStorage.getItem('recipeHistory');
    if (savedHistory) {
      try {
        // Parse dates properly
        const parsed = JSON.parse(savedHistory, (key, value) => {
          if (key === 'lastViewed') return new Date(value);
          return value;
        });
        setRecipeHistory(parsed);
      } catch (error) {
        console.error('Error loading recipe history:', error);
        // Initialize with empty array if parsing fails
        setRecipeHistory([]);
      }
    }
  }, []);
  
  const saveHistory = (updatedHistory: RecipeUsage[]) => {
    setRecipeHistory(updatedHistory);
    localStorage.setItem('recipeHistory', JSON.stringify(updatedHistory));
  };
  
  const trackRecipeView = (recipeId: string, title: string) => {
    const now = new Date();
    const existingIndex = recipeHistory.findIndex(item => item.recipeId === recipeId);
    
    if (existingIndex >= 0) {
      // Update existing recipe
      const updatedHistory = [...recipeHistory];
      updatedHistory[existingIndex] = {
        ...updatedHistory[existingIndex],
        lastViewed: now,
        viewCount: updatedHistory[existingIndex].viewCount + 1
      };
      saveHistory(updatedHistory);
    } else {
      // Add new recipe
      const newHistory = [
        ...recipeHistory,
        {
          recipeId,
          title,
          lastViewed: now,
          viewCount: 1,
          favorite: false,
          cooked: false,
          cookCount: 0
        }
      ];
      saveHistory(newHistory);
    }
  };
  
  const toggleFavorite = (recipeId: string) => {
    const existingIndex = recipeHistory.findIndex(item => item.recipeId === recipeId);
    
    if (existingIndex >= 0) {
      // Update existing recipe
      const updatedHistory = [...recipeHistory];
      updatedHistory[existingIndex] = {
        ...updatedHistory[existingIndex],
        favorite: !updatedHistory[existingIndex].favorite
      };
      saveHistory(updatedHistory);
      return updatedHistory[existingIndex].favorite;
    }
    return false;
  };
  
  const trackRecipeCooked = (recipeId: string, title: string) => {
    const now = new Date();
    const existingIndex = recipeHistory.findIndex(item => item.recipeId === recipeId);
    
    if (existingIndex >= 0) {
      // Update existing recipe
      const updatedHistory = [...recipeHistory];
      updatedHistory[existingIndex] = {
        ...updatedHistory[existingIndex],
        lastViewed: now,
        cooked: true,
        cookCount: updatedHistory[existingIndex].cookCount + 1
      };
      saveHistory(updatedHistory);
    } else {
      // Add new recipe
      const newHistory = [
        ...recipeHistory,
        {
          recipeId,
          title,
          lastViewed: now,
          viewCount: 1,
          favorite: false,
          cooked: true,
          cookCount: 1
        }
      ];
      saveHistory(newHistory);
    }
  };
  
  const getFavorites = () => {
    return recipeHistory.filter(item => item.favorite);
  };
  
  const getHistory = () => {
    // Sort by most recently viewed
    return [...recipeHistory].sort((a, b) => 
      b.lastViewed.getTime() - a.lastViewed.getTime()
    );
  };
  
  const getRecentlyCooked = () => {
    return recipeHistory
      .filter(item => item.cooked)
      .sort((a, b) => b.lastViewed.getTime() - a.lastViewed.getTime());
  };
  
  return {
    trackRecipeView,
    toggleFavorite,
    trackRecipeCooked,
    getFavorites,
    getHistory,
    getRecentlyCooked
  };
};
