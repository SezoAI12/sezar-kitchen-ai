
import { useState } from 'react';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export type FilterOptions = {
  difficulty?: 'easy' | 'medium' | 'hard';
  dietary?: string;
  cuisine?: string;
  mealType?: string;
};

type FilterSystemProps = {
  onFilterChange: (filters: FilterOptions) => void;
  currentFilters: FilterOptions;
};

const FilterSystem = ({ onFilterChange, currentFilters }: FilterSystemProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(currentFilters);
  
  const difficulties = [
    { value: 'easy', label: 'Easy', dotClass: 'bg-chef-secondary' },
    { value: 'medium', label: 'Medium', dotClass: 'bg-yellow-500' },
    { value: 'hard', label: 'Hard', dotClass: 'bg-red-500' }
  ];
  
  const dietaryOptions = [
    'Normal', 'Healthy', 'Vegetarian', 'Vegan', 'Gluten-Free', 
    'Dairy-Free', 'Keto', 'Low-Carb'
  ];
  
  const cuisines = [
    'Italian', 'Mexican', 'Chinese', 'Indian', 'Japanese', 
    'Thai', 'Turkish', 'Syrian', 'Iraqi', 'Yemeni', 
    'American', 'Moroccan', 'Lebanese', 'German'
  ];
  
  const mealTypes = [
    'Any Meal', 'Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack'
  ];

  const handleApplyFilters = () => {
    onFilterChange(tempFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setTempFilters({});
  };

  const handleRemoveFilter = (key: keyof FilterOptions) => {
    const newFilters = { ...currentFilters };
    delete newFilters[key];
    onFilterChange(newFilters);
  };

  const getActiveFilterCount = () => {
    return Object.keys(currentFilters).length;
  };

  return (
    <div className="px-4 py-3">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Filters</h3>
        
        <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              size="sm"
            >
              <Filter size={16} />
              <span>Filter</span>
              {getActiveFilterCount() > 0 && (
                <Badge className="ml-1 bg-chef-primary h-5 w-5 p-0 flex items-center justify-center">
                  {getActiveFilterCount()}
                </Badge>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Filter Options</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Difficulty Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Difficulty</h4>
                <div className="grid grid-cols-3 gap-2">
                  {difficulties.map((difficulty) => (
                    <Button 
                      key={difficulty.value}
                      variant={tempFilters.difficulty === difficulty.value ? "default" : "outline"}
                      size="sm"
                      className="flex items-center justify-center gap-2"
                      onClick={() => setTempFilters({ 
                        ...tempFilters, 
                        difficulty: tempFilters.difficulty === difficulty.value 
                          ? undefined 
                          : difficulty.value as 'easy' | 'medium' | 'hard'
                      })}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full ${difficulty.dotClass}`}></span>
                      {difficulty.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Dietary Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Dietary Preferences</h4>
                <Select 
                  value={tempFilters.dietary} 
                  onValueChange={(value) => setTempFilters({ ...tempFilters, dietary: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Dietary Options</SelectLabel>
                      {dietaryOptions.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Cuisine Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Cuisine</h4>
                <Select 
                  value={tempFilters.cuisine} 
                  onValueChange={(value) => setTempFilters({ ...tempFilters, cuisine: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cuisine Types</SelectLabel>
                      {cuisines.map((cuisine) => (
                        <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                          {cuisine}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Meal Type Filter */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Meal Type</h4>
                <Select 
                  value={tempFilters.mealType} 
                  onValueChange={(value) => setTempFilters({ ...tempFilters, mealType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Meal Types</SelectLabel>
                      {mealTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={handleClearFilters}>Clear All</Button>
                <Button onClick={handleApplyFilters} className="bg-chef-primary hover:bg-chef-primary/90">Apply Filters</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {Object.entries(currentFilters).map(([key, value]) => (
            value && (
              <Badge 
                key={key}
                variant="secondary" 
                className="flex items-center gap-1 px-3 py-1"
              >
                <span className="capitalize">{key}: {value}</span>
                <X 
                  size={14} 
                  className="cursor-pointer" 
                  onClick={() => handleRemoveFilter(key as keyof FilterOptions)} 
                />
              </Badge>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterSystem;
