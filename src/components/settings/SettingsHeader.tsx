
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const SettingsHeader = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="bg-white p-4 flex items-center shadow-sm dark:bg-gray-800">
      <button 
        onClick={handleBack}
        className="mr-4"
      >
        <ChevronLeft size={24} className="text-chef-primary" />
      </button>
      <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Settings</h1>
    </header>
  );
};

export default SettingsHeader;
