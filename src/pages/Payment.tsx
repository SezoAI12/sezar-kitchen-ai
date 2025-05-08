
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ChevronLeft, CreditCard, Camera, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Terms required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment successful!",
        description: "Your subscription has been activated"
      });
      navigate('/profile');
    }, 2000);
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format card number with spaces every 4 digits
    let value = e.target.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');
    
    if (value.length > 16) {
      value = value.slice(0, 16);
    }
    
    // Add spaces every 4 digits
    const parts = [];
    for (let i = 0; i < value.length; i += 4) {
      parts.push(value.slice(i, i + 4));
    }
    
    setCardDetails({
      ...cardDetails,
      number: parts.join(' ')
    });
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Format expiry date as MM/YY
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    
    setCardDetails({
      ...cardDetails,
      expiry: value
    });
  };
  
  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    
    setCardDetails({
      ...cardDetails,
      cvc: value
    });
  };
  
  const handleScanCard = () => {
    toast({
      title: "Camera access required",
      description: "This would open your camera to scan a card"
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-20">
        <div className="bg-white p-4 shadow-sm">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Payment Information</h1>
          </div>
        </div>
        
        <div className="bg-white mt-2 p-4">
          <div className="mb-6">
            <h2 className="font-semibold mb-2">Select Payment Method</h2>
            <div className="flex gap-3">
              <button
                className={`flex-1 border rounded-md py-3 flex items-center justify-center gap-2 ${
                  paymentMethod === 'card' 
                    ? 'bg-chef-primary/10 border-chef-primary text-chef-primary' 
                    : 'text-chef-medium-gray'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <CreditCard size={20} />
                <span>Card</span>
              </button>
              <button
                className={`flex-1 border rounded-md py-3 flex items-center justify-center gap-2 ${
                  paymentMethod === 'paypal' 
                    ? 'bg-chef-primary/10 border-chef-primary text-chef-primary' 
                    : 'text-chef-medium-gray'
                }`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.93,4.24C9.93,4.24,9.93,4.24,9.93,4.24c-0.01-0.01-0.02-0.01-0.04-0.02C9.92,4.23,9.93,4.24,9.93,4.24z M19.06,7.73c-0.28,1.31-1.2,3.93-4,3.93h-1l-0.48,3.02c-0.07,0.46-0.48,0.83-0.95,0.83H9.43c-0.56,0-0.96-0.51-0.85-1.07 C8.58,14.17,9.81,5.5,9.81,5.5c0.15-1.06,0.89-1.73,1.94-1.73h5.08C18.67,3.77,19.43,5.15,19.06,7.73z M19.89,17.73 c-0.36,2.26-1.79,3.66-3.94,3.66h-3.07l-0.78,4.93c-0.04,0.22-0.22,0.37-0.42,0.37H8.63c-0.24,0-0.41-0.25-0.37-0.5l1.21-7.66 c0.07-0.42,0.43-0.74,0.85-0.74h3.96c1.75,0,3.2-0.85,3.65-2.9c0.21-0.97,0.11-1.8-0.26-2.48c1.04,0.09,2.01,0.62,2.45,1.84 C20.61,15.37,20.26,16.57,19.89,17.73z"/>
                </svg>
                <span>PayPal</span>
              </button>
            </div>
          </div>
          
          {paymentMethod === 'card' && (
            <form onSubmit={handlePayment} className="space-y-4">
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on Card</label>
                <Input
                  id="cardName"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card Number</label>
                <div className="relative">
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={handleCardNumberChange}
                    required
                    maxLength={19}
                    className="pr-10"
                  />
                  <button 
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-chef-medium-gray"
                    onClick={handleScanCard}
                  >
                    <Camera size={18} />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry Date</label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={handleExpiryChange}
                    required
                    maxLength={5}
                  />
                </div>
                
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                  <Input
                    id="cvc"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={handleCvcChange}
                    required
                    maxLength={3}
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Billing Address</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="street" className="block text-sm font-medium mb-1">Street Address</label>
                    <Input
                      id="street"
                      placeholder="1234 Main St"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
                      <Input
                        id="city"
                        placeholder="New York"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                      <Input
                        id="state"
                        placeholder="NY"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium mb-1">ZIP Code</label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      value={address.zip}
                      onChange={(e) => setAddress({ ...address, zip: e.target.value.replace(/\D/g, '') })}
                      required
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-6">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the <a href="#" className="text-chef-primary hover:underline">Terms and Conditions</a>
                </label>
              </div>
              
              <div className="flex items-center justify-center text-chef-medium-gray text-sm gap-2 my-2">
                <Lock size={16} />
                <span>Secure payment processed by Stripe</span>
              </div>
              
              <Button
                type="submit"
                className="w-full py-6 bg-chef-primary hover:bg-chef-primary/90"
                disabled={!agreedToTerms || isProcessing}
              >
                {isProcessing ? "Processing..." : "Pay $7.99"}
              </Button>
            </form>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="text-center py-10">
              <p className="mb-4 text-chef-medium-gray">
                You'll be redirected to PayPal to complete your payment
              </p>
              <Button
                className="w-full py-6 bg-[#0070BA] hover:bg-[#003087]"
                onClick={() => {
                  toast({
                    title: "Redirecting to PayPal",
                    description: "You'll be redirected to complete payment"
                  });
                }}
              >
                Continue with PayPal
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Payment;
