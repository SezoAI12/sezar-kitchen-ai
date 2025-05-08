
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

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
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    // In a real app, you would set the language in the app state
    // For now, we just navigate to login
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-chef-light-gray flex flex-col">
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-chef-primary mb-2">Choose Your Language</h1>
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
