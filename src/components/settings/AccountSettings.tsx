
import { useNavigate } from 'react-router-dom';
import { User, CreditCard } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';

const AccountSettings = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Account</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => navigate('/profile')}>
          <div className="flex items-center">
            <User size={20} className="mr-3 text-chef-primary" />
            <span>Edit Profile</span>
          </div>
          <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
        </div>
        
        <div className="flex items-center justify-between p-2 cursor-pointer" onClick={() => navigate('/payment-methods')}>
          <div className="flex items-center">
            <CreditCard size={20} className="mr-3 text-chef-primary" />
            <span>Payment Methods</span>
          </div>
          <ChevronLeft size={20} className="rotate-180 text-chef-medium-gray" />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
