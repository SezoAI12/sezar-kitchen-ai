
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Check, ChevronLeft, Star } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Subscription = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  
  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic features for personal use',
      price: { monthly: 0, annual: 0 },
      features: [
        'Basic recipe search',
        'Save up to 10 favorites',
        'Basic nutrition information',
        'Standard ingredients database'
      ],
      recommended: false
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Advanced features for cooking enthusiasts',
      price: { monthly: 7.99, annual: 79.99 },
      features: [
        'Unlimited recipe search',
        'Unlimited saved favorites',
        'Detailed nutrition analysis',
        'AI cooking assistant',
        'Meal planning',
        'Shopping list generator',
        'Advanced substitution suggestions',
        'Ad-free experience'
      ],
      recommended: true
    },
    {
      id: 'family',
      name: 'Family',
      description: 'Share premium features with family members',
      price: { monthly: 14.99, annual: 149.99 },
      features: [
        'All Premium features',
        'Up to 6 family member accounts',
        'Family meal planning',
        'Shared shopping lists',
        'Dietary preference management for family members',
        'Priority customer support'
      ],
      recommended: false
    }
  ];
  
  const handlePlanSelect = (planId: string) => {
    navigate('/payment');
    // In a real app, you would store the selected plan
  };
  
  const formatPrice = (price: number) => {
    if (price === 0) return 'Free';
    return `$${price.toFixed(2)}`;
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Subscription Plans</h1>
          </div>
        </div>
        
        <div className="bg-white mt-2 p-4">
          <p className="text-chef-medium-gray mb-6">
            Choose a plan that works for you. All plans include access to our core recipe features.
          </p>
          
          <div className="flex items-center justify-center mb-6">
            <span className={`mr-2 ${billingCycle === 'monthly' ? 'font-medium' : 'text-chef-medium-gray'}`}>
              Monthly
            </span>
            <div className="flex items-center">
              <Switch 
                checked={billingCycle === 'annual'} 
                onCheckedChange={(checked) => setBillingCycle(checked ? 'annual' : 'monthly')} 
              />
            </div>
            <span className={`ml-2 ${billingCycle === 'annual' ? 'font-medium' : 'text-chef-medium-gray'}`}>
              Annual <span className="text-xs text-chef-primary">Save 17%</span>
            </span>
          </div>
          
          <div className="space-y-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-4 relative ${
                  plan.recommended ? 'border-chef-primary ring-1 ring-chef-primary' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-chef-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{plan.name}</h3>
                    <p className="text-chef-medium-gray text-sm">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {formatPrice(plan.price[billingCycle])}
                    </div>
                    <div className="text-xs text-chef-medium-gray">
                      {plan.id !== 'free' && (billingCycle === 'monthly' ? 'per month' : 'per year')}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check size={16} className="text-chef-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.id === 'free' ? 'bg-gray-200 hover:bg-gray-300 text-chef-dark-gray' : ''
                  }`}
                  variant={plan.id === 'free' ? 'outline' : 'default'}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {plan.id === 'free' ? 'Current Plan' : 'Select Plan'}
                </Button>
              </div>
            ))}
          </div>
          
          <div className="mt-8 border rounded-lg p-4 bg-chef-light-gray">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-chef-primary fill-chef-primary" />
              <h3 className="font-semibold">Money-Back Guarantee</h3>
            </div>
            <p className="text-sm text-chef-medium-gray">
              All paid plans come with a 14-day money-back guarantee. If you're not satisfied, we'll refund your payment.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Subscription;
