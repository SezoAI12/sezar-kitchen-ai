
import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Globe, 
  ShoppingBasket, 
  User 
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [direction, setDirection] = useState('ltr');
  
  useEffect(() => {
    // Get the stored language or default to 'en'
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    const isRtl = preferredLanguage === 'ar';
    setDirection(isRtl ? 'rtl' : 'ltr');
  }, []);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`flex flex-col min-h-screen bg-chef-light-gray ${direction === 'rtl' ? 'rtl' : ''}`}>
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around items-center h-16 px-2 z-10">
        <Link 
          to="/" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/') ? 'text-chef-primary border-t-2 border-chef-primary' : 'text-chef-medium-gray'
          }`}
        >
          <Home size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Home</span>
        </Link>
        
        <Link 
          to="/global" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/global') ? 'text-chef-primary border-t-2 border-chef-primary' : 'text-chef-medium-gray'
          }`}
        >
          <Globe size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Global</span>
        </Link>
        
        <Link 
          to="/pantry" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/pantry') ? 'text-chef-primary border-t-2 border-chef-primary' : 'text-chef-medium-gray'
          }`}
        >
          <ShoppingBasket size={isMobile ? 20 : 24} />
          <span className="text-xs mt-0.5">Pantry</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={`flex flex-col items-center justify-center w-1/4 pt-1 ${
            isActive('/profile') ? 'text-chef-primary border-t-2 border-chef-primary' : 'text-chef-medium-gray'
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
