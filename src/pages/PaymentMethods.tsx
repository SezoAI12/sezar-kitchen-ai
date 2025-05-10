
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronLeft, CreditCard, Plus, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PaymentCard {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  lastFour: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

const PaymentMethods = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '25',
      isDefault: true
    }
  ]);
  
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    isDefault: false
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };
  
  const handleAddCard = () => {
    // Validate form inputs
    if (!newCard.cardNumber || !newCard.cardholderName || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv) {
      toast({
        title: 'Error',
        description: 'Please fill in all card information fields',
        variant: 'destructive'
      });
      return;
    }
    
    // Determine card type based on first digit
    let cardType: 'visa' | 'mastercard' | 'amex' = 'visa';
    if (newCard.cardNumber.startsWith('4')) {
      cardType = 'visa';
    } else if (newCard.cardNumber.startsWith('5')) {
      cardType = 'mastercard';
    } else if (newCard.cardNumber.startsWith('3')) {
      cardType = 'amex';
    }
    
    // Format card info
    const lastFour = newCard.cardNumber.slice(-4);
    
    // Create new card object
    const card: PaymentCard = {
      id: Date.now().toString(),
      type: cardType,
      lastFour,
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: newCard.isDefault || cards.length === 0 // First card is default
    };
    
    // Update state
    if (card.isDefault) {
      // Make other cards not default
      setCards(cards.map(c => ({ ...c, isDefault: false })).concat(card));
    } else {
      setCards([...cards, card]);
    }
    
    // Reset form and close dialog
    setNewCard({
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      isDefault: false
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: 'Success',
      description: 'Payment method added successfully'
    });
  };
  
  const handleRemoveCard = (id: string) => {
    const cardToRemove = cards.find(card => card.id === id);
    
    if (cardToRemove?.isDefault && cards.length > 1) {
      toast({
        title: 'Error',
        description: 'You cannot remove your default payment method. Please set another card as default first.',
        variant: 'destructive'
      });
      return;
    }
    
    setCards(cards.filter(card => card.id !== id));
    toast({
      title: 'Success',
      description: 'Payment method removed successfully'
    });
  };
  
  const setDefaultCard = (id: string) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === id
    })));
    toast({
      title: 'Success',
      description: 'Default payment method updated'
    });
  };
  
  const getCardIcon = (type: string) => {
    return <CreditCard className={`h-5 w-5 ${
      type === 'visa' ? 'text-blue-600' : 
      type === 'mastercard' ? 'text-red-500' : 
      'text-green-600'
    }`} />;
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto bg-chef-light-gray min-h-screen pb-24 dark:bg-gray-900 dark:text-white">
        {/* Header */}
        <header className="bg-white p-4 flex items-center shadow-sm dark:bg-gray-800">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ChevronLeft size={24} className="text-chef-primary" />
          </button>
          <h1 className="text-2xl font-bold font-montserrat text-chef-primary">Payment Methods</h1>
        </header>
        
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Payment Methods</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus size={16} />
                    <span>Add New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                    <DialogDescription>
                      Enter your card details below to add a new payment method.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input 
                        id="cardNumber" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={newCard.cardNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input 
                        id="cardholderName" 
                        name="cardholderName" 
                        placeholder="John Doe" 
                        value={newCard.cardholderName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryMonth">Month</Label>
                        <Input 
                          id="expiryMonth" 
                          name="expiryMonth" 
                          placeholder="MM" 
                          maxLength={2}
                          value={newCard.expiryMonth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryYear">Year</Label>
                        <Input 
                          id="expiryYear" 
                          name="expiryYear" 
                          placeholder="YY" 
                          maxLength={2}
                          value={newCard.expiryYear}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          name="cvv" 
                          placeholder="123" 
                          maxLength={4}
                          value={newCard.cvv}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={newCard.isDefault}
                        onChange={(e) => setNewCard({ ...newCard, isDefault: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="isDefault">Set as default payment method</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddCard}>Add Card</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {cards.length > 0 ? (
              <div className="space-y-3">
                {cards.map(card => (
                  <Card key={card.id} className={`${card.isDefault ? 'border-chef-primary' : ''}`}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center">
                        {getCardIcon(card.type)}
                        <div className="ml-3">
                          <p className="font-medium">{card.type.charAt(0).toUpperCase() + card.type.slice(1)} •••• {card.lastFour}</p>
                          <p className="text-sm text-chef-medium-gray">Expires {card.expiryMonth}/{card.expiryYear}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!card.isDefault && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => setDefaultCard(card.id)}
                            >
                              Set Default
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleRemoveCard(card.id)}
                            >
                              <Trash size={16} className="text-red-500" />
                            </Button>
                          </>
                        )}
                        {card.isDefault && (
                          <span className="text-xs bg-chef-primary/10 text-chef-primary py-1 px-2 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-chef-medium-gray mb-2">No payment methods added yet</p>
                <Button onClick={() => setIsDialogOpen(true)}>Add Your First Card</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethods;
