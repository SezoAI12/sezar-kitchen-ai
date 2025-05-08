
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', rtl: true },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Get the stored language or default to 'en'
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  useEffect(() => {
    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', selectedLanguage);
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    // Find the selected language object
    const language = languages.find(lang => lang.code === selectedLanguage);
    
    toast({
      title: "Language selected",
      description: `Language set to ${language?.name}`
    });
    
    // Check if we're coming from a login flow or just changing language
    const referrer = document.referrer;
    if (referrer.includes('/login') || referrer.includes('/register')) {
      navigate('/login');
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-chef-light-gray flex flex-col">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">Choose Your Language</h1>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-chef-medium-gray">Select your preferred language</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="space-y-2">
              {languages.map((language) => (
                <motion.div
                  key={language.code}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                    selectedLanguage === language.code
                      ? 'bg-chef-primary/10 border border-chef-primary'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                  onClick={() => handleLanguageSelect(language.code)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{language.flag}</span>
                    <span className={`${language.rtl ? 'font-arabic' : ''}`}>{language.name}</span>
                  </div>
                  {selectedLanguage === language.code && (
                    <Check size={20} className="text-chef-primary" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
          
          <Button
            onClick={handleContinue}
            className="w-full mt-6 bg-chef-primary hover:bg-chef-primary/90 py-6"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
