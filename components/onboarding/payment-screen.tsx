'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Building2 } from 'lucide-react';
import { useOnboarding } from '@/lib/onboarding-context';

export function PaymentScreen() {
  const { state, setPaymentInfo, setStep } = useOnboarding();
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'ach'>('credit-card');
  const [agreed, setAgreed] = useState(false);

  const handleContinue = () => {
    setPaymentInfo({ method: paymentMethod, agreed });
    setStep(6);
  };

  if (!state.selectedPackage) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Account Funding
        </h2>
        <p className="text-lg text-slate-600">
          Complete your payment to activate your account
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card className="p-6 mb-6 bg-slate-900 text-white">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-300">Package:</span>
                <span className="font-semibold">{state.selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Duration:</span>
                <span>{state.selectedPackage.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Lead Budget Included:</span>
                <span>${state.selectedPackage.leadBudget.toLocaleString()}</span>
              </div>
            </div>
            <div className="border-t border-slate-700 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Total Today:</span>
                <span className="text-3xl font-bold text-blue-400">
                  ${state.selectedPackage.price.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-3 text-slate-900">What's Included</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• ${state.selectedPackage.leadBudget.toLocaleString()} in lead bidding budget</li>
              <li>• Premium ad placement in your selected markets</li>
              <li>• Unlimited practice area selections</li>
              <li>• Real-time lead notifications</li>
              <li>• Dedicated onboarding support</li>
              <li>• Full analytics dashboard</li>
            </ul>
          </Card>
        </div>

        <div>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Payment Method</h3>

            <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'credit-card' | 'ach')} className="mb-6">
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-slate-50" onClick={() => setPaymentMethod('credit-card')}>
                <RadioGroupItem value="credit-card" id="credit-card" />
                <CreditCard className="h-5 w-5 text-slate-600" />
                <Label htmlFor="credit-card" className="text-base cursor-pointer flex-1">
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-slate-50" onClick={() => setPaymentMethod('ach')}>
                <RadioGroupItem value="ach" id="ach" />
                <Building2 className="h-5 w-5 text-slate-600" />
                <Label htmlFor="ach" className="text-base cursor-pointer flex-1">
                  ACH Bank Transfer
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === 'credit-card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" type="password" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input id="cardName" placeholder="John Smith" />
                </div>
                <div>
                  <Label htmlFor="billingZip">Billing ZIP Code</Label>
                  <Input id="billingZip" placeholder="12345" />
                </div>
              </div>
            )}

            {paymentMethod === 'ach' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="accountName">Account Holder Name</Label>
                  <Input id="accountName" placeholder="John Smith" />
                </div>
                <div>
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input id="routingNumber" placeholder="123456789" />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" placeholder="9876543210" />
                </div>
                <div>
                  <Label htmlFor="accountType">Account Type</Label>
                  <select id="accountType" className="w-full border rounded-md p-2">
                    <option>Checking</option>
                    <option>Savings</option>
                  </select>
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
                  I agree to the Terms of Service and authorize Vikk AI to charge my payment method for the amount shown.
                  I understand that interaction charges will be deducted from my funded account balance.
                </Label>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setStep(4)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                size="lg"
                onClick={handleContinue}
                disabled={!agreed}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Review Order
              </Button>
            </div>
          </Card>

          <div className="mt-4 text-center text-sm text-slate-500">
            <p>Secure payment processing. Your information is encrypted.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
