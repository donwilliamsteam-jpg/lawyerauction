'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircleCheck as CheckCircle2 } from 'lucide-react';
import { Package, PACKAGES } from '@/lib/types';
import { useOnboarding } from '@/lib/onboarding-context';

export function PackageSelection() {
  const { state, setPackage, setStep } = useOnboarding();

  const handleSelect = (pkg: Package) => {
    setPackage(pkg);
    setStep(2);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Choose Your Package
        </h2>
        <p className="text-lg text-slate-600">
          Select the plan that fits your growth strategy
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {PACKAGES.map((pkg) => (
          <Card
            key={pkg.id}
            className={`p-8 cursor-pointer transition-all hover:shadow-xl border-2 ${
              state.selectedPackage?.id === pkg.id
                ? 'border-blue-600 shadow-lg'
                : 'border-slate-200 hover:border-blue-300'
            }`}
            onClick={() => handleSelect(pkg)}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {pkg.name}
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-slate-900">
                  ${pkg.price.toLocaleString()}
                </span>
                <span className="text-slate-600 ml-2">one-time</span>
              </div>
              <p className="text-slate-600">{pkg.duration} commitment</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  Premium ad placement in your selected markets
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  ${pkg.leadBudget.toLocaleString()} lead bidding budget included
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  Unlimited practice area selections
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  Real-time lead notifications
                </span>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">
                  Dedicated onboarding support
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(pkg);
              }}
            >
              Select {pkg.name}
            </Button>
          </Card>
        ))}
      </div>

      <div className="text-center text-sm text-slate-500">
        All packages include monthly ad placement fees based on your practice area selections
      </div>
    </div>
  );
}
