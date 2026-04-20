'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CircleCheck as CheckCircle2, Calendar, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { useOnboarding } from '@/lib/onboarding-context';

export function Confirmation() {
  const { state, resetState } = useOnboarding();

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Welcome to Vikk AI!
        </h2>
        <p className="text-xl text-slate-600">
          Your account has been successfully created
        </p>
      </div>

      <Card className="p-8 mb-8 text-left">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          What Happens Next
        </h3>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-900 mb-1">
                Account Setup (1-2 business days)
              </h4>
              <p className="text-slate-600">
                Our team will configure your account settings, set up your practice areas, and ensure your geography targeting is optimized.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">2</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-900 mb-1">
                Onboarding Call
              </h4>
              <p className="text-slate-600">
                Schedule a call with your dedicated success manager to walk through the platform, bidding strategies, and best practices.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">3</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-900 mb-1">
                Go Live
              </h4>
              <p className="text-slate-600">
                Your firm will go live on the platform and start appearing to qualified consumers in your selected markets and practice areas.
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-xl font-bold text-blue-600">4</span>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-slate-900 mb-1">
                Start Receiving Leads
              </h4>
              <p className="text-slate-600">
                Begin receiving notifications for consumer interactions and participate in lead auctions for high-intent opportunities.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/dashboard">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <LayoutDashboard className="h-5 w-5 mr-2" />
            Go to Dashboard
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="border-2">
          <Calendar className="h-5 w-5 mr-2" />
          Book Onboarding Call
        </Button>
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-lg">
        <p className="text-slate-600 mb-2">
          <strong>Need help?</strong>
        </p>
        <p className="text-slate-600">
          Contact our support team at{' '}
          <a href="mailto:support@vikkai.com" className="text-blue-600 hover:underline">
            support@vikkai.com
          </a>{' '}
          or call{' '}
          <a href="tel:+18005551234" className="text-blue-600 hover:underline">
            (800) 555-1234
          </a>
        </p>
      </div>
    </div>
  );
}
