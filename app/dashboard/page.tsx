'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Package,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Gavel,
  Settings as SettingsIcon,
  CreditCard,
  FileText
} from 'lucide-react';
import { INTERACTION_PRICING } from '@/lib/types';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockData = {
    package: '12-Month Growth Plan',
    packageExpiry: 'November 15, 2026',
    monthlyAdCost: 750,
    leadBudgetRemaining: 4250,
    leadBudgetTotal: 5000,
    practiceAreas: ['Personal Injury', 'Family Law', 'Estate Planning'],
    geography: {
      type: 'top10',
      market: 'New York',
      zipCodes: ['10001', '10002', '10003']
    },
    recentActivity: [
      { type: 'Text Inquiry', date: '2026-03-20', cost: 18, status: 'responded' },
      { type: 'Click-to-Call', date: '2026-03-19', cost: 38, status: 'completed' },
      { type: 'Chat Inquiry', date: '2026-03-18', cost: 22, status: 'responded' },
      { type: 'AI Qualified Transfer', date: '2026-03-17', cost: 100, status: 'won' },
    ],
    stats: {
      totalInteractions: 47,
      totalSpent: 2340,
      conversionRate: 23,
      avgResponseTime: '8 minutes'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="bg-slate-900 text-white py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Attorney Dashboard</h1>
          <p className="text-slate-300">Manage your account and track performance</p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="practice-areas">Practice Areas</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Current Package</h3>
                <p className="text-2xl font-bold text-slate-900">{mockData.package}</p>
                <p className="text-sm text-slate-500 mt-2">Expires {mockData.packageExpiry}</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Lead Budget</h3>
                <p className="text-2xl font-bold text-slate-900">
                  ${mockData.leadBudgetRemaining.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                  of ${mockData.leadBudgetTotal.toLocaleString()} remaining
                </p>
                <div className="mt-3 w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(mockData.leadBudgetRemaining / mockData.leadBudgetTotal) * 100}%` }}
                  />
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Monthly Ad Cost</h3>
                <p className="text-2xl font-bold text-slate-900">${mockData.monthlyAdCost}/mo</p>
                <p className="text-sm text-slate-500 mt-2">
                  {mockData.practiceAreas.length} practice areas
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Total Interactions</h3>
                <p className="text-2xl font-bold text-slate-900">{mockData.stats.totalInteractions}</p>
                <p className="text-sm text-slate-500 mt-2">
                  {mockData.stats.conversionRate}% conversion rate
                </p>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Interaction Pricing</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Charges are automatically deducted from your funded account balance
                </p>
                <div className="space-y-3">
                  {INTERACTION_PRICING.map((pricing) => (
                    <div key={pricing.type} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                        {pricing.type.includes('Text') && <Mail className="h-5 w-5 text-slate-600 mr-3" />}
                        {pricing.type.includes('Chat') && <MessageSquare className="h-5 w-5 text-slate-600 mr-3" />}
                        {pricing.type.includes('Call') && <Phone className="h-5 w-5 text-slate-600 mr-3" />}
                        {pricing.type.includes('Transfer') && <TrendingUp className="h-5 w-5 text-slate-600 mr-3" />}
                        <span className="font-medium text-slate-900">{pricing.type}</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">${pricing.price}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Auction Lead System</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <p className="text-slate-700 leading-relaxed">
                    When a consumer formally requests legal help, eligible attorneys compete through a real-time bidding system similar to Google Ads.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Consumer Submits Request</p>
                      <p className="text-sm text-slate-600">Detailed legal need with qualifying information</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Eligible Attorneys Notified</p>
                      <p className="text-sm text-slate-600">Based on practice areas and geography</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Real-Time Auction</p>
                      <p className="text-sm text-slate-600">Place competitive bids from your lead budget</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Winner Receives Lead</p>
                      <p className="text-sm text-slate-600">Direct contact information provided</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Cost</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.recentActivity.map((activity, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 text-sm text-slate-900">{activity.type}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{activity.date}</td>
                        <td className="py-3 px-4 text-sm font-semibold text-slate-900">${activity.cost}</td>
                        <td className="py-3 px-4">
                          <Badge variant={activity.status === 'won' ? 'default' : 'secondary'}>
                            {activity.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="practice-areas">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Practice Areas</h3>
              <div className="space-y-4 mb-6">
                {mockData.practiceAreas.map((area, index) => (
                  <div key={area} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center">
                      <Gavel className="h-5 w-5 text-slate-600 mr-3" />
                      <span className="font-medium text-slate-900">{area}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-600">Monthly Cost</p>
                      <p className="font-bold text-slate-900">
                        ${index === 0 ? '500' : index === 1 ? '250' : '125'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Add Practice Area
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="geography">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Geography Settings</h3>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-slate-600 mr-2" />
                    <span className="font-semibold text-slate-900">Market Type</span>
                  </div>
                  <p className="text-slate-700">Top 10 Major Market</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <MapPin className="h-5 w-5 text-slate-600 mr-2" />
                    <span className="font-semibold text-slate-900">Selected Market</span>
                  </div>
                  <p className="text-slate-700">{mockData.geography.market}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center mb-3">
                    <MapPin className="h-5 w-5 text-slate-600 mr-2" />
                    <span className="font-semibold text-slate-900">ZIP Codes</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {mockData.geography.zipCodes.map((zip) => (
                      <Badge key={zip} variant="secondary">{zip}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                Edit Geography
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Billing Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Monthly Ad Cost</span>
                    <span className="font-bold text-slate-900">${mockData.monthlyAdCost}/mo</span>
                  </div>
                  <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-600">Total Spent (Interactions)</span>
                    <span className="font-bold text-slate-900">${mockData.stats.totalSpent}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-medium">Lead Budget Remaining</span>
                    <span className="font-bold text-green-700">${mockData.leadBudgetRemaining}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h3>
                <div className="flex items-center p-4 bg-slate-50 rounded-lg mb-4">
                  <CreditCard className="h-6 w-6 text-slate-600 mr-3" />
                  <div>
                    <p className="font-medium text-slate-900">Card ending in 4242</p>
                    <p className="text-sm text-slate-600">Expires 12/2028</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Update Payment Method
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="leads">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Lead History</h3>
              <p className="text-slate-600 mb-6">
                View all leads you've won through the auction system
              </p>
              <div className="text-center py-12 text-slate-500">
                <FileText className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                <p>No leads to display yet</p>
                <p className="text-sm mt-2">Leads you win will appear here</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Notifications</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-slate-700">Email notifications for new leads</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="mr-3" />
                      <span className="text-slate-700">SMS notifications for high-value leads</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-3" />
                      <span className="text-slate-700">Weekly performance summary</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3">Account Management</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <SettingsIcon className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Update Email
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
