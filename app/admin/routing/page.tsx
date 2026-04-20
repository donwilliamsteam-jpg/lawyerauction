'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from '@/components/admin/admin-layout';
import { CircleCheck as CheckCircle, Circle as XCircle, DollarSign, Users, MapPin, Briefcase } from 'lucide-react';
import { mockLeads } from '@/lib/mock-data';

export default function AdminRoutingPage() {
  const pendingLeads = mockLeads.filter(l => l.status === 'awaiting-auction');
  const awardedLeads = mockLeads.filter(l => l.status === 'awarded' || l.status === 'sent');

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Lead Routing Control Center</h1>
          <p className="text-slate-600 mt-1">Monitor and manage lead routing through the auction system</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Routing Queue</h2>
            <p className="text-sm text-slate-600 mb-4">Leads pending attorney matching and auction</p>
            {pendingLeads.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No pending leads</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingLeads.map((lead) => (
                  <div key={lead.id} className="p-4 border rounded-lg hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-mono text-xs text-slate-600">{lead.id}</p>
                        <p className="font-semibold text-slate-900">{lead.practiceArea}</p>
                      </div>
                      <Badge variant="secondary">{lead.intentLevel} intent</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {lead.geography}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {lead.eligibleAttorneys} eligible
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Awards</h2>
            <p className="text-sm text-slate-600 mb-4">Recently awarded leads</p>
            {awardedLeads.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <p>No awarded leads</p>
              </div>
            ) : (
              <div className="space-y-3">
                {awardedLeads.map((lead) => (
                  <div key={lead.id} className="p-4 border rounded-lg hover:bg-slate-50">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-mono text-xs text-slate-600">{lead.id}</p>
                        <p className="font-semibold text-slate-900">{lead.practiceArea}</p>
                      </div>
                      <Badge className="bg-green-600">${lead.leadPrice}</Badge>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-600 mb-1">Winner: <span className="font-medium text-slate-900">{lead.winningAttorney}</span></p>
                      <p className="text-xs text-slate-500">{lead.geography}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Eligibility Engine</h2>
          <p className="text-sm text-slate-600 mb-4">How leads are matched to eligible attorneys</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Practice Area Match</h4>
                  <p className="text-sm text-slate-600">
                    Attorney must have selected the practice area of the lead
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Geography Match</h4>
                  <p className="text-sm text-slate-600">
                    Lead location must fall within attorney selected markets or regions
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Account Active</h4>
                  <p className="text-sm text-slate-600">
                    Attorney account must be in active status
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Funded Balance</h4>
                  <p className="text-sm text-slate-600">
                    Attorney must have sufficient lead budget remaining
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Bidding Enabled</h4>
                  <p className="text-sm text-slate-600">
                    Attorney must have bidding enabled in their settings
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                  <XCircle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">No Conflicts</h4>
                  <p className="text-sm text-slate-600">
                    Attorney must not have existing conflicts for this case type
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Bid Comparison Example</h2>
          <p className="text-sm text-slate-600 mb-4">How winning bids are determined</p>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-900">Attorney A</p>
                  <p className="text-xs text-slate-600">Smith & Associates</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">$65</p>
              <Badge variant="secondary" className="text-xs">3rd Place</Badge>
            </div>

            <div className="p-4 border-2 border-slate-200 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-900">Attorney B</p>
                  <p className="text-xs text-slate-600">Williams Legal</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-2">$85</p>
              <Badge variant="secondary" className="text-xs">2nd Place</Badge>
            </div>

            <div className="p-4 border-2 border-green-600 rounded-lg bg-green-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-slate-900">Attorney C</p>
                  <p className="text-xs text-slate-600">Johnson & Partners</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-green-700 mb-2">$110</p>
              <Badge className="bg-green-600 text-xs">Winner</Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Routing Decision Log</h2>
          <div className="space-y-4">
            {mockLeads.slice(0, 2).map((lead) => (
              <div key={lead.id} className="border-l-4 border-blue-600 pl-4 py-2">
                <p className="font-mono text-xs text-slate-600 mb-2">{lead.id}</p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-slate-700">Lead entered - {lead.practiceArea}</span>
                    <span className="ml-auto text-slate-500">
                      {new Date(lead.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-slate-700">{lead.eligibleAttorneys} attorneys matched</span>
                  </div>
                  {lead.bids && lead.bids.length > 0 && (
                    <>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-slate-700">Bids evaluated - highest: ${lead.highestBid}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-slate-700">Winner selected: {lead.winningAttorney}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-slate-700">Lead sent to attorney</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
