'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Search } from 'lucide-react';
import { mockAttorneys } from '@/lib/mock-data';

export default function AdminAttorneysPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAttorney, setSelectedAttorney] = useState<string | null>(null);

  const filteredAttorneys = mockAttorneys.filter(attorney =>
    attorney.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attorney.attorneyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attorney.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const attorney = selectedAttorney ? mockAttorneys.find(a => a.id === selectedAttorney) : null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Attorney Management</h1>
          <p className="text-slate-600 mt-1">Manage active attorney accounts and configurations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    type="search"
                    placeholder="Search attorneys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Firm</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Package</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttorneys.map((atty) => (
                      <tr
                        key={atty.id}
                        className={`border-b hover:bg-slate-50 cursor-pointer ${
                          selectedAttorney === atty.id ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedAttorney(atty.id)}
                      >
                        <td className="py-4 px-4">
                          <p className="font-medium text-slate-900">{atty.firmName}</p>
                          <p className="text-xs text-slate-500">{atty.attorneyName}</p>
                        </td>
                        <td className="py-4 px-4 text-sm text-slate-700">
                          {atty.packageType === '6-month' ? '6-Month' : '12-Month'}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={atty.status === 'active' ? 'default' : 'secondary'}>
                            {atty.status}
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
            {attorney ? (
              <div className="space-y-4 sticky top-24">
                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Account Overview</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Firm Name</p>
                      <p className="font-medium text-slate-900">{attorney.firmName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Attorney</p>
                      <p className="font-medium text-slate-900">{attorney.attorneyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-900">{attorney.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Package</p>
                      <p className="font-medium text-slate-900">
                        {attorney.packageType === '6-month' ? '6-Month Early Adopter' : '12-Month Growth Plan'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Status</p>
                      <Badge variant={attorney.status === 'active' ? 'default' : 'secondary'}>
                        {attorney.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Onboarding Rep</p>
                      <p className="font-medium text-slate-900">{attorney.onboardingRep}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Commercial Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Practice Areas</p>
                      <div className="space-y-1">
                        {attorney.practiceAreas.map((area, index) => (
                          <div key={area} className="flex justify-between items-center text-sm">
                            <span className="text-slate-700">{area}</span>
                            <span className="font-semibold text-slate-900">
                              ${index === 0 ? '500' : index === 1 ? '250' : '125'}/mo
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-900">Total Monthly Ad Cost</span>
                          <span className="text-lg font-bold text-blue-600">${attorney.monthlyAdCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Balance Section</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Lead Budget Remaining</span>
                      <span className="font-semibold text-green-600">${attorney.leadBudgetRemaining.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Lead Budget Total</span>
                      <span className="font-semibold text-slate-900">${attorney.leadBudgetTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Interaction Balance</span>
                      <span className="font-semibold text-slate-900">${attorney.interactionBalance.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(attorney.leadBudgetRemaining / attorney.leadBudgetTotal) * 100}%` }}
                      />
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Controls</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Edit Specialties
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Edit Geography
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Adjust Balances
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700">
                      Pause Account
                    </Button>
                  </div>
                </Card>
              </div>
            ) : (
              <Card className="p-6">
                <p className="text-center text-slate-500">Select an attorney to view details</p>
              </Card>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Attorneys</p>
            <p className="text-2xl font-bold text-slate-900">{mockAttorneys.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Active Accounts</p>
            <p className="text-2xl font-bold text-slate-900">
              {mockAttorneys.filter(a => a.status === 'active').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Lead Budget</p>
            <p className="text-2xl font-bold text-slate-900">
              ${mockAttorneys.reduce((sum, a) => sum + a.leadBudgetRemaining, 0).toLocaleString()}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Monthly Ad</p>
            <p className="text-2xl font-bold text-slate-900">
              ${mockAttorneys.reduce((sum, a) => sum + a.monthlyAdCost, 0).toLocaleString()}
            </p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
