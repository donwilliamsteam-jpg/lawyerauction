'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Search, Filter } from 'lucide-react';
import { mockSubmissions } from '@/lib/mock-data';

export default function AdminSubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch =
      submission.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.attorneyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-600';
      case 'under-review': return 'bg-yellow-600';
      case 'approved': return 'bg-green-600';
      case 'pending-payment': return 'bg-orange-600';
      case 'activated': return 'bg-emerald-600';
      case 'rejected': return 'bg-red-600';
      default: return 'bg-slate-600';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Submissions Management</h1>
          <p className="text-slate-600 mt-1">Review and manage attorney onboarding submissions</p>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search by firm name, attorney, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md px-4 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="under-review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="pending-payment">Pending Payment</option>
                <option value="activated">Activated</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Submission ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Firm Name</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Contact</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Package</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Practice Areas</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Monthly Cost</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Geography</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="border-b hover:bg-slate-50">
                    <td className="py-4 px-4">
                      <span className="font-mono text-xs text-slate-600">{submission.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-900">{submission.firmName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-slate-900">{submission.attorneyName}</p>
                      <p className="text-xs text-slate-500">{submission.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-slate-900">
                        {submission.packageType === '6-month' ? '6-Month' : '12-Month'}
                      </p>
                      <p className="text-xs text-slate-500">${submission.leadBudget.toLocaleString()} budget</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {submission.practiceAreas.slice(0, 2).map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {submission.practiceAreas.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{submission.practiceAreas.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm font-semibold text-slate-900">${submission.monthlyAdCost}/mo</p>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">
                      {submission.geographyType === 'top10' ? 'Top 10 Market' : 'Other Market'}
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(submission.status)}>
                        {submission.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <Button size="sm" variant="outline">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Total Submissions</p>
            <p className="text-2xl font-bold text-slate-900">{mockSubmissions.length}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">New Submissions</p>
            <p className="text-2xl font-bold text-slate-900">
              {mockSubmissions.filter(s => s.status === 'new').length}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-slate-600 mb-1">Activated</p>
            <p className="text-2xl font-bold text-slate-900">
              {mockSubmissions.filter(s => s.status === 'activated').length}
            </p>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
