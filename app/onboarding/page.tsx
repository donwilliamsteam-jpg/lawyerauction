'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { OnboardingProvider, useOnboarding } from '@/lib/onboarding-context';
import { PackageSelection } from '@/components/onboarding/package-selection';
import { PracticeAreaSelection } from '@/components/onboarding/practice-area-selection';
import { GeographySelectionComponent } from '@/components/onboarding/geography-selection';
import { FirmProfileForm } from '@/components/onboarding/firm-profile';
import { PaymentScreen } from '@/components/onboarding/payment-screen';
import { ReviewSummary } from '@/components/onboarding/review-summary';
import { Confirmation } from '@/components/onboarding/confirmation';
import { PACKAGES } from '@/lib/types';

const STEPS = [
  'Package',
  'Practice Areas',
  'Geography',
  'Firm Profile',
  'Payment',
  'Review',
  'Confirmation'
];

function OnboardingContent() {
  const { state, setPackage, setStep } = useOnboarding();
  const searchParams = useSearchParams();

  useEffect(() => {
    const packageParam = searchParams.get('package');
    if (packageParam && !state.selectedPackage) {
      const pkg = PACKAGES.find(p => p.id === packageParam);
      if (pkg) {
        setPackage(pkg);
        setStep(1);
      }
    }
  }, [searchParams, state.selectedPackage, setPackage, setStep]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {state.currentStep < 7 && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-4">
              {STEPS.map((step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        index < state.currentStep
                          ? 'bg-blue-600 text-white'
                          : index === state.currentStep
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {index < state.currentStep ? '✓' : index + 1}
                    </div>
                    <span
                      className={`text-xs mt-2 text-center hidden md:block ${
                        index <= state.currentStep ? 'text-slate-900 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 transition-all ${
                        index < state.currentStep ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="py-8">
          {state.currentStep === 1 && <PackageSelection />}
          {state.currentStep === 2 && <PracticeAreaSelection />}
          {state.currentStep === 3 && <GeographySelectionComponent />}
          {state.currentStep === 4 && <FirmProfileForm />}
          {state.currentStep === 5 && <PaymentScreen />}
          {state.currentStep === 6 && <ReviewSummary />}
          {state.currentStep === 7 && <Confirmation />}
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  );
}
