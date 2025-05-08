
import { useState } from 'react';
import { Heart, Clock, Globe } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const QuickAccessBar = () => {
  const [activeTab, setActiveTab] = useState<string>('history');
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'global') {
      navigate('/global');
    }
  };
  
  return (
    <div className="px-4 py-3">
      <Tabs 
        defaultValue="history" 
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="saved" className="flex items-center gap-2">
            <Heart size={18} />
            <span>Saved</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock size={18} />
            <span>History</span>
          </TabsTrigger>
          <TabsTrigger value="global" className="flex items-center gap-2">
            <Globe size={18} />
            <span>Global</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default QuickAccessBar;
