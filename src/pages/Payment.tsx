
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Calendar, Lock, Paypal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
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
          
          <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="apple">Apple</TabsTrigger>
              <TabsTrigger value="google">Google</TabsTrigger>
            </TabsList>
            
            <TabsContent value="card" className="mt-4">
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
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="paypal" className="mt-4">
              <div className="text-center p-6 border rounded-md">
                <div className="flex justify-center mb-4">
                  <Paypal size={48} className="text-blue-600" />
                </div>
                <p className="mb-6">Click the button below to pay with PayPal</p>
                <Button 
                  onClick={handleSubmit}
                  className="w-full py-6 bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Pay with PayPal'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="apple" className="mt-4">
              <div className="text-center p-6 border rounded-md">
                <div className="flex justify-center mb-4">
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"/>
                  </svg>
                </div>
                <p className="mb-6">Click the button below to pay with Apple Pay</p>
                <Button 
                  onClick={handleSubmit}
                  className="w-full py-6 bg-black hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Pay with Apple Pay'}
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="google" className="mt-4">
              <div className="text-center p-6 border rounded-md">
                <div className="flex justify-center mb-4">
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                  </svg>
                </div>
                <p className="mb-6">Click the button below to pay with Google Pay</p>
                <Button 
                  onClick={handleSubmit}
                  className="w-full py-6 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Pay with Google Pay'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          
          <p className="text-center mt-4 text-xs text-chef-medium-gray flex items-center justify-center">
            <Lock size={14} className="mr-1" />
            <span>Secure payment processing</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
