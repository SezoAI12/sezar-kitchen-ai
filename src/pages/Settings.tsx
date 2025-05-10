
import { useState } from 'react';
import Layout from '../components/Layout';
import { useDarkMode } from '@/hooks/use-dark-mode';
import SettingsHeader from '@/components/settings/SettingsHeader';
import AccountSettings from '@/components/settings/AccountSettings';
import DietaryPreferences from '@/components/settings/DietaryPreferences';
import AppInformation from '@/components/settings/AppInformation';
import DangerZone from '@/components/settings/DangerZone';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  // Diet Type state
  const [dietType, setDietType] = useState('omnivore');
  
  // Food allergies state
  const [foodAllergies, setFoodAllergies] = useState<string[]>([]);
  
  // Religious dietary restrictions state
  const [religiousRestrictions, setReligiousRestrictions] = useState<string>('');
  
  // Health goals state
  const [healthGoals, setHealthGoals] = useState<string[]>([]);
  
  const toggleFoodAllergy = (allergy: string) => {
    if (foodAllergies.includes(allergy)) {
      setFoodAllergies(foodAllergies.filter(item => item !== allergy));
    } else {
      setFoodAllergies([...foodAllergies, allergy]);
    }
  };
  
  const toggleHealthGoal = (goal: string) => {
    if (healthGoals.includes(goal)) {
      setHealthGoals(healthGoals.filter(item => item !== goal));
    } else {
      setHealthGoals([...healthGoals, goal]);
    }
  };
  
  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        <SettingsHeader />
        
        <div className="p-4">
          <AccountSettings />
          
          <DietaryPreferences 
            dietType={dietType}
            setDietType={setDietType}
            foodAllergies={foodAllergies}
            toggleFoodAllergy={toggleFoodAllergy}
            religiousRestrictions={religiousRestrictions}
            setReligiousRestrictions={setReligiousRestrictions}
            healthGoals={healthGoals}
            toggleHealthGoal={toggleHealthGoal}
          />
          
          <AppInformation />
          
          <DangerZone />
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
