'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { OnboardingState, Package, Specialty, GeographySelection, FirmProfile, PaymentInfo } from './types';

interface OnboardingContextType {
  state: OnboardingState;
  setStep: (step: number) => void;
  setPackage: (pkg: Package) => void;
  setSpecialties: (specialties: Specialty[]) => void;
  setGeography: (geography: GeographySelection) => void;
  setFirmProfile: (profile: FirmProfile) => void;
  setPaymentInfo: (payment: PaymentInfo) => void;
  setSubmissionId: (id: string) => void;
  resetState: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  currentStep: 0,
  selectedPackage: null,
  specialties: [],
  monthlyAdCost: 500,
  geography: null,
  firmProfile: null,
  paymentInfo: null,
};

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OnboardingState>(initialState);

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setPackage = (pkg: Package) => {
    setState(prev => ({ ...prev, selectedPackage: pkg }));
  };

  const setSpecialties = (specialties: Specialty[]) => {
    const monthlyAdCost = specialties.length === 0 ? 500 :
                          specialties.length === 1 ? 500 :
                          specialties.length === 2 ? 750 :
                          750 + (specialties.length - 2) * 125;

    setState(prev => ({ ...prev, specialties, monthlyAdCost }));
  };

  const setGeography = (geography: GeographySelection) => {
    setState(prev => ({ ...prev, geography }));
  };

  const setFirmProfile = (profile: FirmProfile) => {
    setState(prev => ({ ...prev, firmProfile: profile }));
  };

  const setPaymentInfo = (payment: PaymentInfo) => {
    setState(prev => ({ ...prev, paymentInfo: payment }));
  };

  const setSubmissionId = (id: string) => {
    setState(prev => ({ ...prev, submissionId: id }));
  };

  const resetState = () => {
    setState(initialState);
  };

  return (
    <OnboardingContext.Provider
      value={{
        state,
        setStep,
        setPackage,
        setSpecialties,
        setGeography,
        setFirmProfile,
        setPaymentInfo,
        setSubmissionId,
        resetState,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
