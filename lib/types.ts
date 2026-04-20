export type PackageType = '6-month' | '12-month';

export type GeographyType = 'top10' | 'other';

export interface Package {
  id: PackageType;
  name: string;
  price: number;
  leadBudget: number;
  duration: string;
}

export interface Specialty {
  id: string;
  name: string;
}

export interface GeographySelection {
  type: GeographyType;
  top10Market?: string;
  zipCodes?: string[];
  cities?: string[];
  msas?: string[];
  states?: string[];
}

export interface FirmProfile {
  firmName: string;
  attorneyName: string;
  email: string;
  phone: string;
  website: string;
  firmAddress: string;
  numberOfAttorneys: number;
  intakeContact: string;
  logoUrl?: string;
  description: string;
}

export interface PaymentInfo {
  method: 'credit-card' | 'ach';
  agreed: boolean;
}

export interface OnboardingState {
  currentStep: number;
  selectedPackage: Package | null;
  specialties: Specialty[];
  monthlyAdCost: number;
  geography: GeographySelection | null;
  firmProfile: FirmProfile | null;
  paymentInfo: PaymentInfo | null;
  submissionId?: string;
}

export interface InteractionPricing {
  type: string;
  price: number;
}

export const PACKAGES: Package[] = [
  {
    id: '6-month',
    name: '6-Month Early Adopter',
    price: 6000,
    leadBudget: 3000,
    duration: '6 months'
  },
  {
    id: '12-month',
    name: '12-Month Growth Plan',
    price: 10000,
    leadBudget: 5000,
    duration: '12 months'
  }
];

export const TOP_10_MARKETS = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Dallas–Fort Worth',
  'Houston',
  'Washington DC',
  'Miami',
  'Philadelphia',
  'Atlanta',
  'Phoenix'
];

export const PRACTICE_AREAS = [
  'Personal Injury',
  'Family Law',
  'Criminal Defense',
  'Employment Law',
  'Real Estate Law',
  'Immigration Law',
  'Estate Planning',
  'Business Law',
  'Bankruptcy',
  'Intellectual Property',
  'Tax Law',
  'Civil Litigation',
  'Contract Law',
  'Medical Malpractice',
  'Workers Compensation',
  'DUI/DWI',
  'Traffic Law',
  'Consumer Law',
  'Environmental Law',
  'Healthcare Law'
];

export const INTERACTION_PRICING: InteractionPricing[] = [
  { type: 'Text Inquiry', price: 18 },
  { type: 'Chat Inquiry', price: 22 },
  { type: 'Click-to-Call', price: 38 },
  { type: 'AI Qualified Transfer', price: 100 }
];

export function calculateMonthlyAdCost(specialties: Specialty[]): number {
  if (specialties.length === 0) return 500;
  if (specialties.length === 1) return 500;
  if (specialties.length === 2) return 750;
  return 750 + (specialties.length - 2) * 125;
}
