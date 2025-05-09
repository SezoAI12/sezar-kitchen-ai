
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Globe, 
  ShoppingBasket, 
  User,
  Moon,
  Sun
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useDarkMode } from '@/hooks/use-dark-mode';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [direction, setDirection] = useState('ltr');
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Get the stored language or default to 'en'
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const isRtl = preferredLanguage === 'ar';
    setDirection(isRtl ? 'rtl' : 'ltr');
    
    // Apply RTL to the document
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    // Load appropriate font for Arabic
    if (isRtl) {
      document.documentElement.classList.add('font-arabic');
    } else {
      document.documentElement.classList.remove('font-arabic');
    }
  }, []);

  const handleToggleDarkMode = () => {
    toggleDarkMode();
    
    toast({
      title: darkMode ? "Light mode enabled" : "Dark mode enabled",
      description: darkMode ? "The app is now in light mode" : "The app is now in dark mode",
    });
  };
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`flex flex-col min-h-screen ${direction === 'rtl' ? 'rtl' : ''} ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-chef-light-gray'}`}>
      {/* Dark mode toggle */}
      <div className="fixed top-4 right-4 z-20">
        <Button 
          size="icon" 
          variant="outline" 
          onClick={handleToggleDarkMode}
          className={`rounded-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
      </div>
      
      <main className={`flex-1 pb-16 ${darkMode ? 'bg-gray-900 text-white' : ''}`}>
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.3)]' : 'bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]'} flex justify-around items-center h-16 px-2 z-10`}>
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/') 
              ? darkMode 
                ? 'text-chef-primary border-t-2 border-chef-primary' 
                : 'text-chef-primary border-t-2 border-chef-primary' 
              : darkMode 
                ? 'text-gray-400' 
                : 'text-chef-medium-gray'
          }`}
        >
          <Home size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Home</span>
        </Link>
        
        <Link 
          to="/global" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/global') 
              ? darkMode 
                ? 'text-chef-primary border-t-2 border-chef-primary' 
                : 'text-chef-primary border-t-2 border-chef-primary' 
              : darkMode 
                ? 'text-gray-400' 
                : 'text-chef-medium-gray'
          }`}
        >
          <Globe size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Global</span>
        </Link>
        
        <Link 
          to="/pantry" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/pantry') 
              ? darkMode 
                ? 'text-chef-primary border-t-2 border-chef-primary' 
                : 'text-chef-primary border-t-2 border-chef-primary' 
              : darkMode 
                ? 'text-gray-400' 
                : 'text-chef-medium-gray'
          }`}
        >
          <ShoppingBasket size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Pantry</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/profile') 
              ? darkMode 
                ? 'text-chef-primary border-t-2 border-chef-primary' 
                : 'text-chef-primary border-t-2 border-chef-primary' 
              : darkMode 
                ? 'text-gray-400' 
                : 'text-chef-medium-gray'
          }`}
        >
          <User size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Profile</span>
        </Link>
      </nav>
    </div>
  );
};

export default Layout;
