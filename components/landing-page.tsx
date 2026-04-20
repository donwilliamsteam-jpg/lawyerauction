'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, CircleCheck as CheckCircle2, Users, Gavel, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Connect with Legal Consumers<br />
              <span className="text-blue-600">Actively Seeking Help</span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Choose your markets. Select your practice areas. Fund your account.<br />
              Start receiving legal opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/onboarding?package=6-month">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto shadow-lg">
                  Start 6-Month Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/onboarding?package=12-month">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg h-auto">
                  Start 12-Month Plan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-16">
              <Link href="/admin">
                <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  Demo: Admin Dashboard →
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  Demo: Attorney Dashboard →
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Qualified Visibility
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Your firm appears to consumers actively searching for legal help in your chosen practice areas and markets.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Gavel className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Direct Interaction
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Engage with potential clients through text, chat, or phone. Every interaction is tracked and billed transparently.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Competitive Bidding
              </h3>
              <p className="text-slate-600 leading-relaxed">
                When consumers formally request help, compete for high-intent leads through real-time auction bidding.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-12 rounded-xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Choose Your Package</h4>
                    <p className="text-slate-300 text-sm">Select 6 or 12-month commitment with included lead budget</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Select Practice Areas</h4>
                    <p className="text-slate-300 text-sm">Pick your specialties with transparent monthly pricing</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Define Your Geography</h4>
                    <p className="text-slate-300 text-sm">Choose major markets or specific cities, MSAs, or states</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Complete Your Profile</h4>
                    <p className="text-slate-300 text-sm">Add firm details and branding to stand out</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Fund Your Account</h4>
                    <p className="text-slate-300 text-sm">Secure payment processing with full transparency</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-blue-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">Start Receiving Leads</h4>
                    <p className="text-slate-300 text-sm">Go live and connect with clients seeking your expertise</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-500 text-sm mb-4">
              Trusted by forward-thinking law firms nationwide
            </p>
            <div className="flex justify-center items-center gap-8 text-slate-400">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">10,000+</div>
                <div className="text-sm">Legal Consumers</div>
              </div>
              <div className="w-px h-12 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">500+</div>
                <div className="text-sm">Attorney Partners</div>
              </div>
              <div className="w-px h-12 bg-slate-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">20+</div>
                <div className="text-sm">Practice Areas</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
