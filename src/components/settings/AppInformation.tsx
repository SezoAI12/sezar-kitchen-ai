
import { Info, Shield, File } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const AppInformation = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">App Information</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Info size={20} className="mr-3 text-chef-primary" />
            <span>About</span>
          </div>
          <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
        </div>
        
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Shield size={20} className="mr-3 text-chef-primary" />
            <span>Privacy Policy</span>
          </div>
          <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
        </div>
        
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <File size={20} className="mr-3 text-chef-primary" />
            <span>Terms of Service</span>
          </div>
          <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
        </div>
        
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Info size={20} className="mr-3 text-chef-primary" />
            <span>App Version</span>
          </div>
          <span className="text-chef-medium-gray dark:text-gray-400">1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default AppInformation;
