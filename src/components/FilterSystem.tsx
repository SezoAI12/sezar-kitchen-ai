
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type FilterOptions = {
  cookingTime?: number | null;
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  dietaryPreferences?: string[];
  allergies?: string[];
  cuisines?: string[];
  calories?: [number, number] | null;
  mealType?: string | null;
};

type FilterSystemProps = {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
  useButtonStyles?: boolean;
};

const FilterSystem = ({ onFilterChange, currentFilters = {}, useButtonStyles = false }: FilterSystemProps) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  
  // Local state to track filter changes before applying
  const [tempFilters, setTempFilters] = useState<FilterOptions>(currentFilters);
  
  // Dietary preferences options
  const dietaryOptions = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'keto', label: 'Keto' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'low-carb', label: 'Low Carb' },
    { id: 'low-fat', label: 'Low Fat' },
    { id: 'high-protein', label: 'High Protein' },
  ];
  
  // Allergy options
  const allergyOptions = [
    { id: 'nuts', label: 'Nuts' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'soy', label: 'Soy' },
    { id: 'seafood', label: 'Seafood' },
    { id: 'wheat', label: 'Wheat' },
  ];
  
  // Cuisine options
  const cuisineOptions = [
    { id: 'italian', label: 'Italian' },
    { id: 'mexican', label: 'Mexican' },
    { id: 'chinese', label: 'Chinese' },
    { id: 'japanese', label: 'Japanese' },
    { id: 'indian', label: 'Indian' },
    { id: 'french', label: 'French' },
    { id: 'thai', label: 'Thai' },
    { id: 'mediterranean', label: 'Mediterranean' },
    { id: 'lebanese', label: 'Lebanese' },
  ];
  
  // Meal type options
  const mealTypeOptions = [
    { id: 'any', label: 'Any Meal' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' },
    { id: 'snack', label: 'Snack' },
    { id: 'dessert', label: 'Dessert' },
  ];
  
  const handleOpenFilterModal = () => {
    setTempFilters({ ...currentFilters });
    setIsFilterModalOpen(true);
  };
  
  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };
  
  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    handleCloseFilterModal();
  };
  
  const handleResetFilters = () => {
    setTempFilters({});
  };
  
  const toggleDietaryPreference = (value: string) => {
    const current = tempFilters.dietaryPreferences || [];
    
    if (current.includes(value)) {
      setTempFilters({
        ...tempFilters,
        dietaryPreferences: current.filter(item => item !== value)
      });
    } else {
      setTempFilters({
        ...tempFilters,
        dietaryPreferences: [...current, value]
      });
    }
  };
  
  const toggleAllergy = (value: string) => {
    const current = tempFilters.allergies || [];
    
    if (current.includes(value)) {
      setTempFilters({
        ...tempFilters,
        allergies: current.filter(item => item !== value)
      });
    } else {
      setTempFilters({
        ...tempFilters,
        allergies: [...current, value]
      });
    }
  };
  
  const toggleCuisine = (value: string) => {
    const current = tempFilters.cuisines || [];
    
    if (current.includes(value)) {
      setTempFilters({
        ...tempFilters,
        cuisines: current.filter(item => item !== value)
      });
    } else {
      setTempFilters({
        ...tempFilters,
        cuisines: [...current, value]
      });
    }
  };
  
  const handleCookingTimeChange = (value: number) => {
    setTempFilters({
      ...tempFilters,
      cookingTime: value
    });
  };
  
  const handleDifficultyChange = (value: 'easy' | 'medium' | 'hard') => {
    setTempFilters({
      ...tempFilters,
      difficulty: value
    });
  };
  
  const handleMealTypeChange = (value: string) => {
    setTempFilters({
      ...tempFilters,
      mealType: value
    });
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (currentFilters.cookingTime) count++;
    if (currentFilters.difficulty) count++;
    if (currentFilters.mealType) count++;
    if (currentFilters.dietaryPreferences?.length) count += 1;
    if (currentFilters.allergies?.length) count += 1;
    if (currentFilters.cuisines?.length) count += 1;
    if (currentFilters.calories) count++;
    
    return count;
  };
  
  const renderFilterSummary = () => {
    const activeFilters = [];
    
    if (currentFilters.cookingTime) {
      activeFilters.push(`Time: <=${currentFilters.cookingTime} min`);
    }
    
    if (currentFilters.difficulty) {
      activeFilters.push(`Difficulty: ${currentFilters.difficulty}`);
    }
    
    if (currentFilters.mealType) {
      activeFilters.push(`Meal: ${currentFilters.mealType}`);
    }
    
    if (currentFilters.dietaryPreferences?.length) {
      activeFilters.push(`Dietary: ${currentFilters.dietaryPreferences.length}`);
    }
    
    if (currentFilters.allergies?.length) {
      activeFilters.push(`Allergies: ${currentFilters.allergies.length}`);
    }
    
    if (currentFilters.cuisines?.length) {
      activeFilters.push(`Cuisines: ${currentFilters.cuisines.length}`);
    }
    
    return activeFilters;
  };

  return (
    <div className="px-4 py-3 bg-white">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Filters</h3>
        
        <Dialog open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen}>
          <DialogTrigger asChild>
            {useButtonStyles ? (
              <div className="flex flex-wrap gap-2">
                {getActiveFilterCount() === 0 ? (
                  <Button variant="outline" className="flex items-center gap-2" onClick={handleOpenFilterModal}>
                    <Filter size={16} />
                    <span>Add Filters</span>
                  </Button>
                ) : (
                  <>
                    {renderFilterSummary().map((filter, index) => (
                      <Badge key={index} variant="secondary" className="px-3 py-1">
                        {filter}
                      </Badge>
                    ))}
                    <Button variant="outline" size="sm" className="rounded-full p-2" onClick={handleOpenFilterModal}>
                      <Filter size={16} />
                    </Button>
                  </>
                )}
              </div>
            ) : (
              <Button variant={getActiveFilterCount() > 0 ? "default" : "outline"} className="flex items-center gap-2" onClick={handleOpenFilterModal}>
                <Filter size={16} />
                <span>
                  {getActiveFilterCount() > 0 ? `${getActiveFilterCount()} Filters` : 'Add Filters'}
                </span>
              </Button>
            )}
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Recipes</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <Accordion type="single" collapsible className="w-full">
                {/* Cooking Time Filter */}
                <AccordionItem value="cooking-time">
                  <AccordionTrigger className="text-left font-medium">
                    Cooking Time
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label className="block mb-2">Maximum cooking time: {tempFilters.cookingTime || 60} minutes</Label>
                        <Slider
                          value={[tempFilters.cookingTime || 60]}
                          min={10}
                          max={120}
                          step={5}
                          onValueChange={(vals) => handleCookingTimeChange(vals[0])}
                          className="my-4"
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Difficulty Filter */}
                <AccordionItem value="difficulty">
                  <AccordionTrigger className="text-left font-medium">
                    Difficulty Level
                  </AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup value={tempFilters.difficulty || ''} onValueChange={(val: any) => handleDifficultyChange(val)}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="easy" id="easy" />
                        <Label htmlFor="easy">Easy</Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium">Medium</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hard" id="hard" />
                        <Label htmlFor="hard">Hard</Label>
                      </div>
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Meal Type Filter */}
                <AccordionItem value="meal-type">
                  <AccordionTrigger className="text-left font-medium">
                    Meal Type
                  </AccordionTrigger>
                  <AccordionContent>
                    <RadioGroup value={tempFilters.mealType || ''} onValueChange={handleMealTypeChange}>
                      {mealTypeOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option.id} id={`meal-${option.id}`} />
                          <Label htmlFor={`meal-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Dietary Preferences Filter */}
                <AccordionItem value="dietary-preferences">
                  <AccordionTrigger className="text-left font-medium">
                    Dietary Preferences
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {dietaryOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`dietary-${option.id}`} 
                            checked={(tempFilters.dietaryPreferences || []).includes(option.id)}
                            onCheckedChange={() => toggleDietaryPreference(option.id)}
                          />
                          <Label htmlFor={`dietary-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Allergies Filter */}
                <AccordionItem value="allergies">
                  <AccordionTrigger className="text-left font-medium">
                    Allergies
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {allergyOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`allergy-${option.id}`} 
                            checked={(tempFilters.allergies || []).includes(option.id)}
                            onCheckedChange={() => toggleAllergy(option.id)}
                          />
                          <Label htmlFor={`allergy-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Cuisines Filter */}
                <AccordionItem value="cuisines">
                  <AccordionTrigger className="text-left font-medium">
                    Cuisines
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {cuisineOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`cuisine-${option.id}`} 
                            checked={(tempFilters.cuisines || []).includes(option.id)}
                            onCheckedChange={() => toggleCuisine(option.id)}
                          />
                          <Label htmlFor={`cuisine-${option.id}`}>{option.label}</Label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleResetFilters} className="w-full sm:w-auto">
                Reset
              </Button>
              <Button variant="outline" onClick={handleCloseFilterModal} className="w-full sm:w-auto">
                Cancel
              </Button>
              <Button onClick={handleApplyFilters} className="w-full sm:w-auto bg-chef-primary hover:bg-chef-primary/90">
                Apply Filters
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Display active filters */}
      {getActiveFilterCount() > 0 && !useButtonStyles && (
        <div className="flex flex-wrap gap-2 mt-2">
          {renderFilterSummary().map((filter, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {filter}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;
