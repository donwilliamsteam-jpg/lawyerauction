'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/admin-layout';
import {
  FileText,
  Users,
  DollarSign,
  Wallet,
  MessageSquare,
  GitBranch,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { getKPIs, mockSubmissions, mockInteractions, mockLeads } from '@/lib/mock-data';

export default function AdminDashboard() {
  const kpis = getKPIs();

  const recentSubmissions = mockSubmissions.slice(0, 5);
  const recentInteractions = mockInteractions.slice(0, 5);
  const leadQueue = mockLeads.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of platform activity and metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">New Submissions</p>
            <p className="text-3xl font-bold text-slate-900">{kpis.newSubmissions}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Active Attorneys</p>
            <p className="text-3xl font-bold text-slate-900">{kpis.activeAttorneys}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Monthly Ad Commitments</p>
            <p className="text-3xl font-bold text-slate-900">${kpis.monthlyAdCommitments.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Lead Budget Available</p>
            <p className="text-3xl font-bold text-slate-900">${kpis.leadBudgetAvailable.toLocaleString()}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-pink-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Interactions Today</p>
            <p className="text-3xl font-bold text-slate-900">{kpis.interactionsToday}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <GitBranch className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Leads Awaiting Routing</p>
            <p className="text-3xl font-bold text-slate-900">{kpis.leadsAwaitingRouting}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-cyan-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Interaction Revenue</p>
            <p className="text-3xl font-bold text-slate-900">${kpis.interactionRevenue}</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Auction Lead Revenue</p>
            <p className="text-3xl font-bold text-slate-900">${kpis.auctionLeadRevenue}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Submissions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-semibold text-slate-700">Firm</th>
                    <th className="pb-3 text-sm font-semibold text-slate-700">Package</th>
                    <th className="pb-3 text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSubmissions.map((submission) => (
                    <tr key={submission.id} className="border-b hover:bg-slate-50">
                      <td className="py-3">
                        <p className="font-medium text-slate-900 text-sm">{submission.firmName}</p>
                        <p className="text-xs text-slate-500">{submission.email}</p>
                      </td>
                      <td className="py-3 text-sm text-slate-700">
                        {submission.packageType === '6-month' ? '6-Month' : '12-Month'}
                      </td>
                      <td className="py-3">
                        <Badge variant={submission.status === 'new' ? 'default' : 'secondary'}>
                          {submission.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Interactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-3 text-sm font-semibold text-slate-700">Attorney</th>
                    <th className="pb-3 text-sm font-semibold text-slate-700">Type</th>
                    <th className="pb-3 text-sm font-semibold text-slate-700">Charge</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInteractions.map((interaction) => (
                    <tr key={interaction.id} className="border-b hover:bg-slate-50">
                      <td className="py-3">
                        <p className="font-medium text-slate-900 text-sm">{interaction.attorney}</p>
                        <p className="text-xs text-slate-500">{interaction.practiceArea}</p>
                      </td>
                      <td className="py-3 text-sm text-slate-700 capitalize">{interaction.type}</td>
                      <td className="py-3 text-sm font-semibold text-slate-900">${interaction.charge}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Lead Queue Snapshot</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 text-sm font-semibold text-slate-700">Lead ID</th>
                  <th className="pb-3 text-sm font-semibold text-slate-700">Practice Area</th>
                  <th className="pb-3 text-sm font-semibold text-slate-700">Geography</th>
                  <th className="pb-3 text-sm font-semibold text-slate-700">Highest Bid</th>
                  <th className="pb-3 text-sm font-semibold text-slate-700">Eligible Attorneys</th>
                  <th className="pb-3 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {leadQueue.map((lead) => (
                  <tr key={lead.id} className="border-b hover:bg-slate-50">
                    <td className="py-3 text-sm font-mono text-slate-700">{lead.id}</td>
                    <td className="py-3 text-sm text-slate-900">{lead.practiceArea}</td>
                    <td className="py-3 text-sm text-slate-600">{lead.geography}</td>
                    <td className="py-3 text-sm font-semibold text-slate-900">
                      {lead.highestBid > 0 ? `$${lead.highestBid}` : '-'}
                    </td>
                    <td className="py-3 text-sm text-slate-700">{lead.eligibleAttorneys}</td>
                    <td className="py-3">
                      <Badge
                        variant={
                          lead.status === 'awarded' ? 'default' : lead.status === 'awaiting-auction' ? 'secondary' : 'outline'
                        }
                      >
                        {lead.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
