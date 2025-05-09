
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

// Define translations for UI elements
const translations = {
  en: {
    pageTitle: "Choose Your Language",
    selectPrompt: "Select your preferred language",
    continueButton: "Continue",
    languageSelected: "Language set to",
  },
  ar: {
    pageTitle: "اختر لغتك",
    selectPrompt: "اختر لغتك المفضلة",
    continueButton: "استمرار",
    languageSelected: "تم تعيين اللغة إلى",
  },
  es: {
    pageTitle: "Elige tu idioma",
    selectPrompt: "Selecciona tu idioma preferido",
    continueButton: "Continuar",
    languageSelected: "Idioma establecido en",
  },
  fr: {
    pageTitle: "Choisissez votre langue",
    selectPrompt: "Sélectionnez votre langue préférée",
    continueButton: "Continuer",
    languageSelected: "Langue définie sur",
  },
  de: {
    pageTitle: "Wähle deine Sprache",
    selectPrompt: "Wähle deine bevorzugte Sprache",
    continueButton: "Weiter",
    languageSelected: "Sprache eingestellt auf",
  },
};

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', direction: 'ltr' },
  { code: 'es', name: 'Español', flag: '🇪🇸', direction: 'ltr' },
  { code: 'fr', name: 'Français', flag: '🇫🇷', direction: 'ltr' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', direction: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', direction: 'rtl' },
  { code: 'zh', name: '中文', flag: '🇨🇳', direction: 'ltr' },
  { code: 'ja', name: '日本語', flag: '🇯🇵', direction: 'ltr' },
  { code: 'ko', name: '한국어', flag: '🇰🇷', direction: 'ltr' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺', direction: 'ltr' },
  { code: 'pt', name: 'Português', flag: '🇵🇹', direction: 'ltr' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    // Get the stored language or default to 'en'
    return localStorage.getItem('preferredLanguage') || 'en';
  });

  // Add translations object to window for global access
  useEffect(() => {
    window.translations = translations;
  }, []);

  useEffect(() => {
    // Store the selected language in localStorage
    localStorage.setItem('preferredLanguage', selectedLanguage);
    
    // Set the direction attribute on the document
    const selectedLang = languages.find(lang => lang.code === selectedLanguage);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.direction;
      document.documentElement.lang = selectedLang.code;
      
      // Add appropriate font classes for RTL languages
      if (selectedLang.direction === 'rtl') {
        document.documentElement.classList.add('rtl');
        document.body.classList.add('font-arabic');
        
        // Add Arabic font if it's Arabic
        if (selectedLang.code === 'ar') {
          // Add Arabic font link if not already present
          if (!document.getElementById('arabic-font')) {
            const link = document.createElement('link');
            link.id = 'arabic-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
            document.head.appendChild(link);
            
            // Add Arabic font to body
            document.body.style.fontFamily = "'Tajawal', sans-serif";
          }
        }
      } else {
        document.documentElement.classList.remove('rtl');
        document.body.classList.remove('font-arabic');
        document.body.style.fontFamily = '';
      }
      
      // Force event to notify app of language change
      window.dispatchEvent(new Event('languagechange'));
    }
  }, [selectedLanguage]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    // Find the selected language object
    const language = languages.find(lang => lang.code === selectedLanguage);
    
    const currentLang = selectedLanguage as keyof typeof translations;
    
    toast({
      title: translations[currentLang]?.languageSelected || "Language selected",
      description: `${language?.name}`
    });
    
    // Check if we're coming from a login flow or just changing language
    const referrer = document.referrer;
    if (referrer.includes('/login') || referrer.includes('/register')) {
      navigate('/login');
    } else {
      navigate(-1);
    }
  };

  // Get translations based on selected language
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  return (
    <div className={`min-h-screen bg-chef-light-gray flex flex-col ${selectedLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="bg-white p-4 border-b">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold">{t.pageTitle}</h1>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-chef-medium-gray">{t.selectPrompt}</p>
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
                    <span className={language.direction === 'rtl' ? 'font-arabic' : ''}>
                      {language.name}
                    </span>
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
            {t.continueButton}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
