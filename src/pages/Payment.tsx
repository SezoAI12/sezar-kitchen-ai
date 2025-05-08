
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Calendar, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      setFormData({
        ...formData,
        [name]: formatted
      });
      return;
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Payment successful",
        description: "Your subscription has been activated"
      });
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-chef-light-gray">
      <div className="max-w-md mx-auto bg-white">
        <div className="p-4 border-b">
          <div className="flex items-center">
            <button onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold">Payment</h1>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Premium Plan</h2>
            <span className="text-xl font-bold">$7.99/mo</span>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input
                id="cardName"
                name="cardName"
                placeholder="John Doe"
                value={formData.cardName}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="pl-10"
                  maxLength={19}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="pl-10"
                    maxLength={5}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-chef-medium-gray" size={18} />
                  <Input
                    id="cvv"
                    name="cvv"
                    type="password"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="pl-10"
                    maxLength={3}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-6 bg-chef-primary hover:bg-chef-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Pay Now'}
              </Button>
              
              <p className="text-center mt-4 text-xs text-chef-medium-gray flex items-center justify-center">
                <Lock size={14} className="mr-1" />
                <span>Secure payment processing</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
