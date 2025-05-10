
import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DietaryPreferencesProps {
  dietType: string;
  setDietType: (value: string) => void;
  foodAllergies: string[];
  toggleFoodAllergy: (allergy: string) => void;
  religiousRestrictions: string;
  setReligiousRestrictions: (value: string) => void;
  healthGoals: string[];
  toggleHealthGoal: (goal: string) => void;
}

const DietaryPreferences = ({
  dietType,
  setDietType,
  foodAllergies,
  toggleFoodAllergy,
  religiousRestrictions,
  setReligiousRestrictions,
  healthGoals,
  toggleHealthGoal
}: DietaryPreferencesProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Dietary Preferences</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="diet-type">
          <AccordionTrigger>
            <span className="text-left font-medium">Diet Type</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Select value={dietType} onValueChange={setDietType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select diet type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="omnivore">Omnivore (No Restrictions)</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="food-allergies">
          <AccordionTrigger>
            <span className="text-left font-medium">Food Allergies & Intolerances</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dairy" 
                  checked={foodAllergies.includes('dairy')}
                  onCheckedChange={() => toggleFoodAllergy('dairy')}
                />
                <Label htmlFor="dairy">Dairy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gluten" 
                  checked={foodAllergies.includes('gluten')}
                  onCheckedChange={() => toggleFoodAllergy('gluten')}
                />
                <Label htmlFor="gluten">Gluten</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="treenuts" 
                  checked={foodAllergies.includes('treenuts')}
                  onCheckedChange={() => toggleFoodAllergy('treenuts')}
                />
                <Label htmlFor="treenuts">Tree Nuts</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="shellfish" 
                  checked={foodAllergies.includes('shellfish')}
                  onCheckedChange={() => toggleFoodAllergy('shellfish')}
                />
                <Label htmlFor="shellfish">Shellfish</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="soy" 
                  checked={foodAllergies.includes('soy')}
                  onCheckedChange={() => toggleFoodAllergy('soy')}
                />
                <Label htmlFor="soy">Soy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="eggs" 
                  checked={foodAllergies.includes('eggs')}
                  onCheckedChange={() => toggleFoodAllergy('eggs')}
                />
                <Label htmlFor="eggs">Eggs</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="religious-restrictions">
          <AccordionTrigger>
            <span className="text-left font-medium">Religious Dietary Restrictions</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2">
              <Select value={religiousRestrictions} onValueChange={setReligiousRestrictions}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select restriction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="halal">Halal</SelectItem>
                    <SelectItem value="kosher">Kosher</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="health-goals">
          <AccordionTrigger>
            <span className="text-left font-medium">Health Goals</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="low-calorie" 
                  checked={healthGoals.includes('low-calorie')}
                  onCheckedChange={() => toggleHealthGoal('low-calorie')}
                />
                <Label htmlFor="low-calorie">Low Calorie</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="low-carb" 
                  checked={healthGoals.includes('low-carb')}
                  onCheckedChange={() => toggleHealthGoal('low-carb')}
                />
                <Label htmlFor="low-carb">Low Carb</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="high-protein" 
                  checked={healthGoals.includes('high-protein')}
                  onCheckedChange={() => toggleHealthGoal('high-protein')}
                />
                <Label htmlFor="high-protein">High Protein</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="low-fat" 
                  checked={healthGoals.includes('low-fat')}
                  onCheckedChange={() => toggleHealthGoal('low-fat')}
                />
                <Label htmlFor="low-fat">Low Fat</Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DietaryPreferences;
