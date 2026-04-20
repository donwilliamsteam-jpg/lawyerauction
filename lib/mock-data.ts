export interface Attorney {
  id: string;
  firmName: string;
  attorneyName: string;
  email: string;
  phone: string;
  packageType: '6-month' | '12-month';
  packagePrice: number;
  status: 'active' | 'pending' | 'paused' | 'expired';
  monthlyAdCost: number;
  leadBudgetRemaining: number;
  leadBudgetTotal: number;
  interactionBalance: number;
  practiceAreas: string[];
  geography: any;
  startDate: string;
  endDate: string;
  lastActivity: string;
  onboardingRep: string;
}

export interface Submission {
  id: string;
  firmName: string;
  attorneyName: string;
  email: string;
  packageType: '6-month' | '12-month';
  practiceAreasCount: number;
  monthlyAdCost: number;
  geographyType: 'top10' | 'other';
  leadBudget: number;
  submittedDate: string;
  status: 'new' | 'under-review' | 'approved' | 'pending-payment' | 'activated' | 'rejected';
  practiceAreas: string[];
  geography: any;
}

export interface Interaction {
  id: string;
  timestamp: string;
  consumerId: string;
  attorney: string;
  practiceArea: string;
  geography: string;
  type: 'text' | 'chat' | 'call' | 'transfer';
  charge: number;
  status: 'completed' | 'failed' | 'duplicate' | 'refunded' | 'pending';
  result: string;
}

export interface Lead {
  id: string;
  timestamp: string;
  practiceArea: string;
  geography: string;
  intentLevel: 'low' | 'medium' | 'high';
  eligibleAttorneys: number;
  highestBid: number;
  winningAttorney: string | null;
  leadPrice: number;
  status: 'awaiting-auction' | 'awarded' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'disputed';
  bids?: Array<{ attorney: string; amount: number }>;
}

export interface BillingTransaction {
  id: string;
  date: string;
  attorney: string;
  revenueType: 'ad-debit' | 'interaction' | 'auction-lead' | 'refund' | 'adjustment';
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

export const mockAttorneys: Attorney[] = [
  {
    id: 'atty-001',
    firmName: 'Smith & Associates',
    attorneyName: 'John Smith',
    email: 'john@smithlaw.com',
    phone: '(555) 123-4567',
    packageType: '12-month',
    packagePrice: 10000,
    status: 'active',
    monthlyAdCost: 750,
    leadBudgetRemaining: 4250,
    leadBudgetTotal: 5000,
    interactionBalance: 8500,
    practiceAreas: ['Personal Injury', 'Family Law', 'Estate Planning'],
    geography: { type: 'top10', market: 'New York', zipCodes: ['10001', '10002'] },
    startDate: '2026-01-15',
    endDate: '2027-01-15',
    lastActivity: '2026-03-20T14:30:00',
    onboardingRep: 'Sarah Johnson'
  },
  {
    id: 'atty-002',
    firmName: 'Williams Legal Group',
    attorneyName: 'Maria Williams',
    email: 'maria@williamslaw.com',
    phone: '(555) 234-5678',
    packageType: '6-month',
    packagePrice: 6000,
    status: 'active',
    monthlyAdCost: 500,
    leadBudgetRemaining: 2100,
    leadBudgetTotal: 3000,
    interactionBalance: 5200,
    practiceAreas: ['Criminal Defense'],
    geography: { type: 'top10', market: 'Los Angeles', zipCodes: ['90001', '90002', '90003'] },
    startDate: '2026-02-01',
    endDate: '2026-08-01',
    lastActivity: '2026-03-20T16:45:00',
    onboardingRep: 'Mike Chen'
  },
  {
    id: 'atty-003',
    firmName: 'Johnson & Partners',
    attorneyName: 'Robert Johnson',
    email: 'rob@johnsonpartners.com',
    phone: '(555) 345-6789',
    packageType: '12-month',
    packagePrice: 10000,
    status: 'active',
    monthlyAdCost: 875,
    leadBudgetRemaining: 3800,
    leadBudgetTotal: 5000,
    interactionBalance: 6750,
    practiceAreas: ['Employment Law', 'Business Law', 'Contract Law', 'Civil Litigation'],
    geography: { type: 'other', cities: ['Austin', 'San Antonio'], states: [] },
    startDate: '2026-01-20',
    endDate: '2027-01-20',
    lastActivity: '2026-03-20T09:15:00',
    onboardingRep: 'Sarah Johnson'
  }
];

export const mockSubmissions: Submission[] = [
  {
    id: 'sub-001',
    firmName: 'Davis Law Firm',
    attorneyName: 'Jennifer Davis',
    email: 'jen@davislawfirm.com',
    packageType: '12-month',
    practiceAreasCount: 2,
    monthlyAdCost: 750,
    geographyType: 'top10',
    leadBudget: 5000,
    submittedDate: '2026-03-20T10:30:00',
    status: 'new',
    practiceAreas: ['Immigration Law', 'Family Law'],
    geography: { type: 'top10', market: 'Miami', zipCodes: ['33101', '33102'] }
  },
  {
    id: 'sub-002',
    firmName: 'Thompson Legal',
    attorneyName: 'David Thompson',
    email: 'david@thompsonlegal.com',
    packageType: '6-month',
    practiceAreasCount: 1,
    monthlyAdCost: 500,
    geographyType: 'other',
    leadBudget: 3000,
    submittedDate: '2026-03-19T15:20:00',
    status: 'under-review',
    practiceAreas: ['Real Estate Law'],
    geography: { type: 'other', cities: ['Denver'], states: ['Colorado'] }
  },
  {
    id: 'sub-003',
    firmName: 'Martinez & Associates',
    attorneyName: 'Carlos Martinez',
    email: 'carlos@martinezlaw.com',
    packageType: '12-month',
    practiceAreasCount: 3,
    monthlyAdCost: 875,
    geographyType: 'top10',
    leadBudget: 5000,
    submittedDate: '2026-03-18T11:45:00',
    status: 'approved',
    practiceAreas: ['Personal Injury', 'Medical Malpractice', 'Workers Compensation'],
    geography: { type: 'top10', market: 'Chicago', zipCodes: ['60601', '60602', '60603'] }
  }
];

export const mockInteractions: Interaction[] = [
  {
    id: 'int-001',
    timestamp: '2026-03-20T14:30:00',
    consumerId: 'cons-1234',
    attorney: 'Smith & Associates',
    practiceArea: 'Personal Injury',
    geography: 'New York, NY',
    type: 'call',
    charge: 38,
    status: 'completed',
    result: 'Consumer connected successfully'
  },
  {
    id: 'int-002',
    timestamp: '2026-03-20T14:15:00',
    consumerId: 'cons-1235',
    attorney: 'Williams Legal Group',
    practiceArea: 'Criminal Defense',
    geography: 'Los Angeles, CA',
    type: 'transfer',
    charge: 100,
    status: 'completed',
    result: 'AI qualified and transferred'
  },
  {
    id: 'int-003',
    timestamp: '2026-03-20T13:45:00',
    consumerId: 'cons-1236',
    attorney: 'Johnson & Partners',
    practiceArea: 'Employment Law',
    geography: 'Austin, TX',
    type: 'chat',
    charge: 22,
    status: 'completed',
    result: 'Chat session completed'
  },
  {
    id: 'int-004',
    timestamp: '2026-03-20T13:30:00',
    consumerId: 'cons-1237',
    attorney: 'Smith & Associates',
    practiceArea: 'Family Law',
    geography: 'New York, NY',
    type: 'text',
    charge: 18,
    status: 'completed',
    result: 'Text inquiry sent'
  }
];

export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    timestamp: '2026-03-20T15:00:00',
    practiceArea: 'Personal Injury',
    geography: 'New York, NY',
    intentLevel: 'high',
    eligibleAttorneys: 5,
    highestBid: 110,
    winningAttorney: 'Smith & Associates',
    leadPrice: 110,
    status: 'awarded',
    bids: [
      { attorney: 'Smith & Associates', amount: 110 },
      { attorney: 'Brown Law', amount: 95 },
      { attorney: 'Miller Legal', amount: 85 }
    ]
  },
  {
    id: 'lead-002',
    timestamp: '2026-03-20T14:45:00',
    practiceArea: 'Criminal Defense',
    geography: 'Los Angeles, CA',
    intentLevel: 'high',
    eligibleAttorneys: 3,
    highestBid: 125,
    winningAttorney: 'Williams Legal Group',
    leadPrice: 125,
    status: 'sent',
    bids: [
      { attorney: 'Williams Legal Group', amount: 125 },
      { attorney: 'Garcia Law', amount: 100 },
      { attorney: 'Lopez Legal', amount: 90 }
    ]
  },
  {
    id: 'lead-003',
    timestamp: '2026-03-20T14:30:00',
    practiceArea: 'Employment Law',
    geography: 'Austin, TX',
    intentLevel: 'medium',
    eligibleAttorneys: 4,
    highestBid: 75,
    winningAttorney: null,
    leadPrice: 0,
    status: 'awaiting-auction',
    bids: []
  }
];

export const mockTransactions: BillingTransaction[] = [
  {
    id: 'txn-001',
    date: '2026-03-20T14:30:00',
    attorney: 'Smith & Associates',
    revenueType: 'interaction',
    description: 'Click-to-Call - Personal Injury',
    amount: 38,
    status: 'completed'
  },
  {
    id: 'txn-002',
    date: '2026-03-20T14:15:00',
    attorney: 'Williams Legal Group',
    revenueType: 'interaction',
    description: 'AI Qualified Transfer - Criminal Defense',
    amount: 100,
    status: 'completed'
  },
  {
    id: 'txn-003',
    date: '2026-03-20T13:00:00',
    attorney: 'Johnson & Partners',
    revenueType: 'auction-lead',
    description: 'Lead Auction Win - Employment Law',
    amount: 85,
    status: 'completed'
  },
  {
    id: 'txn-004',
    date: '2026-03-15T00:00:00',
    attorney: 'Smith & Associates',
    revenueType: 'ad-debit',
    description: 'Monthly Ad Commitment',
    amount: 750,
    status: 'completed'
  }
];

export function getKPIs() {
  return {
    newSubmissions: mockSubmissions.filter(s => s.status === 'new').length,
    activeAttorneys: mockAttorneys.filter(a => a.status === 'active').length,
    monthlyAdCommitments: mockAttorneys.reduce((sum, a) => sum + a.monthlyAdCost, 0),
    leadBudgetAvailable: mockAttorneys.reduce((sum, a) => sum + a.leadBudgetRemaining, 0),
    interactionsToday: mockInteractions.length,
    leadsAwaitingRouting: mockLeads.filter(l => l.status === 'awaiting-auction').length,
    interactionRevenue: mockInteractions.reduce((sum, i) => sum + i.charge, 0),
    auctionLeadRevenue: mockLeads.filter(l => l.status !== 'awaiting-auction').reduce((sum, l) => sum + l.leadPrice, 0)
  };
}
