
import { useState, useEffect } from 'react';

export type UsageRecord = {
  id: string;
  timestamp: number;
  type: 'recipe' | 'feature';
  itemId: string;
  itemName: string;
};

const STORAGE_KEY = 'chef_sezar_usage_history';

export const useUsageTracker = () => {
  const [usageHistory, setUsageHistory] = useState<UsageRecord[]>([]);

  // Load usage history from localStorage on mount
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(STORAGE_KEY);
      if (storedHistory) {
        setUsageHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load usage history:', error);
    }
  }, []);

  // Save usage history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usageHistory));
    } catch (error) {
      console.error('Failed to save usage history:', error);
    }
  }, [usageHistory]);

  /**
   * Track recipe view
   */
  const trackRecipeView = (recipeId: string, recipeName: string) => {
    const newRecord: UsageRecord = {
      id: `recipe_view_${Date.now()}`,
      timestamp: Date.now(),
      type: 'recipe',
      itemId: recipeId,
      itemName: recipeName
    };

    setUsageHistory(prev => [newRecord, ...prev]);
  };

  /**
   * Track feature usage
   */
  const trackFeatureUse = (featureId: string, featureName: string) => {
    const newRecord: UsageRecord = {
      id: `feature_use_${Date.now()}`,
      timestamp: Date.now(),
      type: 'feature',
      itemId: featureId,
      itemName: featureName
    };

    setUsageHistory(prev => [newRecord, ...prev]);
  };

  /**
   * Get usage statistics
   */
  const getUsageStats = () => {
    const recipeViews = usageHistory.filter(record => record.type === 'recipe');
    const featureUses = usageHistory.filter(record => record.type === 'feature');

    const uniqueRecipes = new Set(recipeViews.map(record => record.itemId));
    const uniqueFeatures = new Set(featureUses.map(record => record.itemId));

    return {
      totalRecipeViews: recipeViews.length,
      uniqueRecipesViewed: uniqueRecipes.size,
      totalFeatureUses: featureUses.length,
      uniqueFeaturesUsed: uniqueFeatures.size,
      mostViewedRecipes: getMostFrequent(recipeViews, 5),
      mostUsedFeatures: getMostFrequent(featureUses, 5)
    };
  };

  /**
   * Clear usage history
   */
  const clearHistory = () => {
    setUsageHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  /**
   * Helper to get most frequently used items
   */
  const getMostFrequent = (records: UsageRecord[], limit: number) => {
    const counts: Record<string, { id: string; name: string; count: number }> = {};

    records.forEach(record => {
      if (!counts[record.itemId]) {
        counts[record.itemId] = { id: record.itemId, name: record.itemName, count: 0 };
      }
      counts[record.itemId].count++;
    });

    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  };

  return {
    usageHistory,
    trackRecipeView,
    trackFeatureUse,
    getUsageStats,
    clearHistory
  };
};
