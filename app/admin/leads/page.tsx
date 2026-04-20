'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Search, TrendingUp, CircleAlert as AlertCircle } from 'lucide-react';
import { mockLeads } from '@/lib/mock-data';

export default function AdminLeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch =
      lead.practiceArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.geography.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const lead = selectedLead ? mockLeads.find(l => l.id === selectedLead) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awaiting-auction': return 'bg-yellow-600';
      case 'awarded': return 'bg-blue-600';
      case 'sent': return 'bg-purple-600';
      case 'accepted': return 'bg-green-600';
      case 'rejected': return 'bg-red-600';
      case 'expired': return 'bg-slate-600';
      case 'disputed': return 'bg-orange-600';
      default: return 'bg-slate-600';
    }
  };

  const getIntentBadge = (level: string) => {
    const colors = {
      low: 'bg-slate-100 text-slate-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-green-100 text-green-700'
    };
    return colors[level as keyof typeof colors] || colors.low;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Leads Management</h1>
          <p className="text-slate-600 mt-1">Track and manage form leads through the auction system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Awaiting Auction</p>
            <p className="text-3xl font-bold text-slate-900">
              {mockLeads.filter(l => l.status === 'awaiting-auction').length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Awarded Today</p>
            <p className="text-3xl font-bold text-slate-900">
              {mockLeads.filter(l => l.status === 'awarded' || l.status === 'sent').length}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">
              ${mockLeads.reduce((sum, l) => sum + l.leadPrice, 0)}
            </p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Avg Lead Price</p>
            <p className="text-3xl font-bold text-slate-900">
              ${Math.round(mockLeads.reduce((sum, l) => sum + l.leadPrice, 0) / mockLeads.filter(l => l.leadPrice > 0).length)}
            </p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border rounded-md px-4 py-2 text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="awaiting-auction">Awaiting Auction</option>
                    <option value="awarded">Awarded</option>
                    <option value="sent">Sent</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                    <option value="expired">Expired</option>
                    <option value="disputed">Disputed</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Lead ID</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Practice Area</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Geography</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Intent</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((leadItem) => (
                      <tr
                        key={leadItem.id}
                        className={`border-b hover:bg-slate-50 cursor-pointer ${
                          selectedLead === leadItem.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedLead(leadItem.id)}
                      >
                        <td className="py-4 px-4">
                          <span className="font-mono text-xs text-slate-600">{leadItem.id}</span>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-slate-900">
                          {leadItem.practiceArea}
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-600">{leadItem.geography}</td>
                        <td className="py-4 px-4">
                          <Badge className={getIntentBadge(leadItem.intentLevel)}>
                            {leadItem.intentLevel}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge className={getStatusColor(leadItem.status)}>
                            {leadItem.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Button size="sm" variant="outline">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            {lead ? (
              <div className="space-y-4 sticky top-24">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Lead Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Lead ID</p>
                      <p className="font-mono text-sm text-slate-900">{lead.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Practice Area</p>
                      <p className="font-medium text-slate-900">{lead.practiceArea}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Geography</p>
                      <p className="font-medium text-slate-900">{lead.geography}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Intent Level</p>
                      <Badge className={getIntentBadge(lead.intentLevel)}>
                        {lead.intentLevel}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Timestamp</p>
                      <p className="text-sm text-slate-900">
                        {new Date(lead.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>

                {lead.bids && lead.bids.length > 0 && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Auction Bids</h3>
                    <div className="space-y-3">
                      {lead.bids.map((bid, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{bid.attorney}</p>
                            {index === 0 && (
                              <Badge className="bg-green-600 text-xs mt-1">Winner</Badge>
                            )}
                          </div>
                          <span className="text-lg font-bold text-slate-900">${bid.amount}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {lead.winningAttorney && (
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Winning Attorney</span>
                        <span className="font-medium text-slate-900">{lead.winningAttorney}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Lead Price</span>
                        <span className="text-lg font-bold text-green-600">${lead.leadPrice}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Status</span>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Re-route Lead
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-orange-600">
                      Mark Disputed
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      Refund
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-6">
                <p className="text-center text-slate-500">Select a lead to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
