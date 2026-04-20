'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/admin-layout';
import { DollarSign, TrendingUp, CreditCard, CircleAlert as AlertCircle } from 'lucide-react';
import { mockAttorneys, mockTransactions, mockInteractions, mockLeads } from '@/lib/mock-data';

export default function AdminBillingPage() {
  const monthlyAdRevenue = mockAttorneys.reduce((sum, a) => sum + a.monthlyAdCost, 0);
  const interactionRevenue = mockInteractions.reduce((sum, i) => sum + i.charge, 0);
  const auctionLeadRevenue = mockLeads.reduce((sum, l) => sum + l.leadPrice, 0);
  const totalRevenue = monthlyAdRevenue + interactionRevenue + auctionLeadRevenue;

  const getRevenueTypeColor = (type: string) => {
    switch (type) {
      case 'ad-debit': return 'bg-blue-600';
      case 'interaction': return 'bg-purple-600';
      case 'auction-lead': return 'bg-green-600';
      case 'refund': return 'bg-red-600';
      case 'adjustment': return 'bg-orange-600';
      default: return 'bg-slate-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Billing & Revenue</h1>
          <p className="text-slate-600 mt-1">Track platform revenue across all monetization channels</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Monthly Ad Revenue</p>
            <p className="text-3xl font-bold text-slate-900">${monthlyAdRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">Recurring commitment</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Interaction Revenue MTD</p>
            <p className="text-3xl font-bold text-slate-900">${interactionRevenue}</p>
            <p className="text-xs text-slate-500 mt-1">From consumer actions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Auction Lead Revenue MTD</p>
            <p className="text-3xl font-bold text-slate-900">${auctionLeadRevenue}</p>
            <p className="text-xs text-slate-500 mt-1">From lead auctions</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Platform Revenue</p>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">All revenue streams</p>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Attorney Billing Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Firm</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Package</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Monthly Ad</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Lead Budget</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Interaction Charges</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Total Debits</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAttorneys.map((attorney) => {
                  const interactionCharges = mockInteractions
                    .filter(i => i.attorney === attorney.firmName)
                    .reduce((sum, i) => sum + i.charge, 0);
                  const leadCharges = mockLeads
                    .filter(l => l.winningAttorney === attorney.firmName)
                    .reduce((sum, l) => sum + l.leadPrice, 0);
                  const totalDebits = attorney.monthlyAdCost + interactionCharges + leadCharges;

                  return (
                    <tr key={attorney.id} className="border-b hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <p className="font-medium text-slate-900">{attorney.firmName}</p>
                        <p className="text-xs text-slate-500">{attorney.attorneyName}</p>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-700">
                        {attorney.packageType === '6-month' ? '6-Month' : '12-Month'}
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-900">
                        ${attorney.monthlyAdCost}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm font-semibold text-green-600">
                          ${attorney.leadBudgetRemaining.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">
                          of ${attorney.leadBudgetTotal.toLocaleString()}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-900">
                        ${interactionCharges}
                      </td>
                      <td className="py-4 px-4 text-sm font-bold text-slate-900">
                        ${totalDebits.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant={attorney.status === 'active' ? 'default' : 'secondary'} className="bg-green-600">
                          Current
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Transaction Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Attorney</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Revenue Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Description</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Amount</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-slate-50">
                    <td className="py-4 px-4 text-sm text-slate-700">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-slate-900">
                      {transaction.attorney}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getRevenueTypeColor(transaction.revenueType)}>
                        {transaction.revenueType}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-700">
                      {transaction.description}
                    </td>
                    <td className="py-4 px-4 text-sm font-bold text-slate-900">
                      ${transaction.amount}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                        className={transaction.status === 'completed' ? 'bg-green-600' : ''}
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
              <p className="text-sm text-slate-600">Revenue Growth MTD</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">+24.5%</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-orange-600 mr-2" />
              <p className="text-sm text-slate-600">Outstanding Balances</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">$0</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center mb-2">
              <CreditCard className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-slate-600">Refunded Charges</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">$0</p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
