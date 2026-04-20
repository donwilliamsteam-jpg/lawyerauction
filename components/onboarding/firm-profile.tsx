'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FirmProfile } from '@/lib/types';
import { useOnboarding } from '@/lib/onboarding-context';

export function FirmProfileForm() {
  const { state, setFirmProfile, setStep } = useOnboarding();
  const [profile, setProfile] = useState<FirmProfile>(
    state.firmProfile || {
      firmName: '',
      attorneyName: '',
      email: '',
      phone: '',
      website: '',
      firmAddress: '',
      numberOfAttorneys: 1,
      intakeContact: '',
      description: ''
    }
  );

  const handleChange = (field: keyof FirmProfile, value: string | number) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleContinue = () => {
    setFirmProfile(profile);
    setStep(5);
  };

  const isValid = () => {
    return (
      profile.firmName &&
      profile.attorneyName &&
      profile.email &&
      profile.phone &&
      profile.firmAddress &&
      profile.numberOfAttorneys > 0 &&
      profile.intakeContact &&
      profile.description
    );
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Firm Profile
        </h2>
        <p className="text-lg text-slate-600">
          Tell us about your firm to complete your profile
        </p>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firmName" className="text-base mb-2 block">
                Firm Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firmName"
                value={profile.firmName}
                onChange={(e) => handleChange('firmName', e.target.value)}
                placeholder="Smith & Associates"
              />
            </div>

            <div>
              <Label htmlFor="attorneyName" className="text-base mb-2 block">
                Primary Attorney Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="attorneyName"
                value={profile.attorneyName}
                onChange={(e) => handleChange('attorneyName', e.target.value)}
                placeholder="John Smith"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email" className="text-base mb-2 block">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@smithlaw.com"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base mb-2 block">
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="website" className="text-base mb-2 block">
              Website
            </Label>
            <Input
              id="website"
              type="url"
              value={profile.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://www.smithlaw.com"
            />
          </div>

          <div>
            <Label htmlFor="firmAddress" className="text-base mb-2 block">
              Firm Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="firmAddress"
              value={profile.firmAddress}
              onChange={(e) => handleChange('firmAddress', e.target.value)}
              placeholder="123 Main Street, Suite 100, City, State 12345"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="numberOfAttorneys" className="text-base mb-2 block">
                Number of Attorneys <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numberOfAttorneys"
                type="number"
                min="1"
                value={profile.numberOfAttorneys}
                onChange={(e) => handleChange('numberOfAttorneys', parseInt(e.target.value) || 1)}
              />
            </div>

            <div>
              <Label htmlFor="intakeContact" className="text-base mb-2 block">
                Intake Contact <span className="text-red-500">*</span>
              </Label>
              <Input
                id="intakeContact"
                value={profile.intakeContact}
                onChange={(e) => handleChange('intakeContact', e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="logoUrl" className="text-base mb-2 block">
              Logo URL
            </Label>
            <Input
              id="logoUrl"
              type="url"
              value={profile.logoUrl || ''}
              onChange={(e) => handleChange('logoUrl', e.target.value)}
              placeholder="https://example.com/logo.png"
            />
            <p className="text-sm text-slate-500 mt-1">
              Optional: Provide a URL to your firm logo
            </p>
          </div>

          <div>
            <Label htmlFor="description" className="text-base mb-2 block">
              Firm Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={profile.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Briefly describe your firm, experience, and what sets you apart..."
              rows={4}
            />
            <p className="text-sm text-slate-500 mt-1">
              This will be shown to potential clients
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep(3)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!isValid()}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Continue to Payment
          </Button>
        </div>
      </Card>
    </div>
  );
}
