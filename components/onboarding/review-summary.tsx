'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard as Edit, CircleCheck as CheckCircle2 } from 'lucide-react';
import { useOnboarding } from '@/lib/onboarding-context';
import { saveSubmission } from '@/lib/supabase';

export function ReviewSummary() {
  const { state, setStep, setSubmissionId } = useOnboarding();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (step: number) => {
    setStep(step);
  };

  const handleSubmit = async () => {
    if (!state.selectedPackage || !state.geography || !state.firmProfile || !state.paymentInfo) {
      return;
    }

    setIsSubmitting(true);

    try {
      const submission = await saveSubmission({
        status: 'completed',
        package_type: state.selectedPackage.id,
        package_price: state.selectedPackage.price,
        lead_budget: state.selectedPackage.leadBudget,
        specialties: state.specialties,
        monthly_ad_cost: state.monthlyAdCost,
        geography_type: state.geography.type,
        geography_data: state.geography,
        firm_name: state.firmProfile.firmName,
        attorney_name: state.firmProfile.attorneyName,
        email: state.firmProfile.email,
        phone: state.firmProfile.phone,
        website: state.firmProfile.website,
        firm_address: state.firmProfile.firmAddress,
        number_of_attorneys: state.firmProfile.numberOfAttorneys,
        intake_contact: state.firmProfile.intakeContact,
        logo_url: state.firmProfile.logoUrl,
        description: state.firmProfile.description,
        payment_method: state.paymentInfo.method,
        payment_status: 'completed'
      });

      if (submission?.id) {
        setSubmissionId(submission.id);
      }

      setStep(7);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!state.selectedPackage || !state.geography || !state.firmProfile) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Review Your Order
        </h2>
        <p className="text-lg text-slate-600">
          Please review all details before completing your purchase
        </p>
      </div>

      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Package Selection</h3>
              <p className="text-slate-600">{state.selectedPackage.name}</p>
              <p className="text-2xl font-bold text-blue-600 mt-2">
                ${state.selectedPackage.price.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                Includes ${state.selectedPackage.leadBudget.toLocaleString()} lead budget
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit(1)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Practice Areas</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {state.specialties.map((specialty) => (
                  <Badge key={specialty.id} variant="secondary" className="bg-blue-100 text-blue-700">
                    {specialty.name}
                  </Badge>
                ))}
              </div>
              <p className="text-lg font-semibold text-slate-900">
                Monthly Ad Commitment: <span className="text-blue-600">${state.monthlyAdCost}/month</span>
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit(2)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Geography</h3>
              {state.geography.type === 'top10' && (
                <div>
                  <p className="text-slate-600 mb-2">
                    <strong>Market:</strong> {state.geography.top10Market}
                  </p>
                  {state.geography.zipCodes && state.geography.zipCodes.length > 0 && (
                    <div>
                      <p className="text-slate-600 mb-2"><strong>ZIP Codes:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {state.geography.zipCodes.map((zip) => (
                          <Badge key={zip} variant="outline">{zip}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {state.geography.type === 'other' && (
                <div className="space-y-2">
                  {state.geography.cities && state.geography.cities.length > 0 && (
                    <div>
                      <p className="text-slate-600 mb-1"><strong>Cities:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {state.geography.cities.map((city) => (
                          <Badge key={city} variant="outline">{city}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {state.geography.msas && state.geography.msas.length > 0 && (
                    <div>
                      <p className="text-slate-600 mb-1"><strong>MSAs:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {state.geography.msas.map((msa) => (
                          <Badge key={msa} variant="outline">{msa}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {state.geography.states && state.geography.states.length > 0 && (
                    <div>
                      <p className="text-slate-600 mb-1"><strong>States:</strong></p>
                      <div className="flex flex-wrap gap-2">
                        {state.geography.states.map((state) => (
                          <Badge key={state} variant="outline">{state}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit(3)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Firm Profile</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Firm Name</p>
                  <p className="font-semibold">{state.firmProfile.firmName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Attorney Name</p>
                  <p className="font-semibold">{state.firmProfile.attorneyName}</p>
                </div>
                <div>
                  <p className="text-slate-500">Email</p>
                  <p className="font-semibold">{state.firmProfile.email}</p>
                </div>
                <div>
                  <p className="text-slate-500">Phone</p>
                  <p className="font-semibold">{state.firmProfile.phone}</p>
                </div>
                <div>
                  <p className="text-slate-500">Number of Attorneys</p>
                  <p className="font-semibold">{state.firmProfile.numberOfAttorneys}</p>
                </div>
                <div>
                  <p className="text-slate-500">Intake Contact</p>
                  <p className="font-semibold">{state.firmProfile.intakeContact}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-500">Address</p>
                  <p className="font-semibold">{state.firmProfile.firmAddress}</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => handleEdit(4)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </Card>

        <Card className="p-6 bg-slate-900 text-white">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">Total Investment</h3>
            <span className="text-4xl font-bold text-blue-400">
              ${state.selectedPackage.price.toLocaleString()}
            </span>
          </div>
          <div className="text-slate-300 text-sm">
            <CheckCircle2 className="inline h-4 w-4 mr-2" />
            Payment method confirmed
          </div>
        </Card>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep(5)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Complete Purchase'}
          </Button>
        </div>
      </div>
    </div>
  );
}
