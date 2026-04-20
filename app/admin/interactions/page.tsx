'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Search, MessageSquare, Phone, Mail, TrendingUp } from 'lucide-react';
import { mockInteractions } from '@/lib/mock-data';

const INTERACTION_TYPES = {
  text: { label: 'Text Inquiry', charge: 18, icon: Mail },
  chat: { label: 'Chat Inquiry', charge: 22, icon: MessageSquare },
  call: { label: 'Click-to-Call', charge: 38, icon: Phone },
  transfer: { label: 'AI Qualified Transfer', charge: 100, icon: TrendingUp }
};

export default function AdminInteractionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredInteractions = mockInteractions.filter(interaction => {
    const matchesSearch =
      interaction.attorney.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interaction.practiceArea.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || interaction.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const textCount = mockInteractions.filter(i => i.type === 'text').length;
  const chatCount = mockInteractions.filter(i => i.type === 'chat').length;
  const callCount = mockInteractions.filter(i => i.type === 'call').length;
  const transferCount = mockInteractions.filter(i => i.type === 'transfer').length;
  const totalRevenue = mockInteractions.reduce((sum, i) => sum + i.charge, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Interactions Dashboard</h1>
          <p className="text-slate-600 mt-1">Track and manage attorney-consumer interactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Text Interactions</p>
            <p className="text-3xl font-bold text-slate-900">{textCount}</p>
            <p className="text-xs text-slate-500 mt-1">${textCount * 18} revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Chat Interactions</p>
            <p className="text-3xl font-bold text-slate-900">{chatCount}</p>
            <p className="text-xs text-slate-500 mt-1">${chatCount * 22} revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Phone className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Call Clicks</p>
            <p className="text-3xl font-bold text-slate-900">{callCount}</p>
            <p className="text-xs text-slate-500 mt-1">${callCount * 38} revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">AI Transfers</p>
            <p className="text-3xl font-bold text-slate-900">{transferCount}</p>
            <p className="text-xs text-slate-500 mt-1">${transferCount * 100} revenue</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-slate-900">${totalRevenue}</p>
            <p className="text-xs text-slate-500 mt-1">Today</p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="search"
                placeholder="Search by attorney or practice area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border rounded-md px-4 py-2 text-sm"
              >
                <option value="all">All Types</option>
                <option value="text">Text</option>
                <option value="chat">Chat</option>
                <option value="call">Call</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Timestamp</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Consumer ID</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Attorney</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Practice Area</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Geography</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Charge</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-slate-700">Result</th>
                </tr>
              </thead>
              <tbody>
                {filteredInteractions.map((interaction) => {
                  const typeInfo = INTERACTION_TYPES[interaction.type];
                  const Icon = typeInfo.icon;
                  return (
                    <tr key={interaction.id} className="border-b hover:bg-slate-50">
                      <td className="py-4 px-4 text-sm text-slate-700">
                        {new Date(interaction.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-mono text-xs text-slate-600">{interaction.consumerId}</span>
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-900">
                        {interaction.attorney}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-700">{interaction.practiceArea}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{interaction.geography}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-slate-600" />
                          <span className="text-sm text-slate-700 capitalize">{interaction.type}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm font-semibold text-slate-900">${interaction.charge}</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={interaction.status === 'completed' ? 'default' : 'secondary'}
                          className={interaction.status === 'completed' ? 'bg-green-600' : ''}
                        >
                          {interaction.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate">
                        {interaction.result}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Interaction Pricing Reference</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(INTERACTION_TYPES).map(([key, type]) => {
              const Icon = type.icon;
              return (
                <div key={key} className="flex items-center p-4 bg-slate-50 rounded-lg">
                  <Icon className="h-8 w-8 text-slate-600 mr-3" />
                  <div>
                    <p className="text-sm text-slate-700">{type.label}</p>
                    <p className="text-lg font-bold text-slate-900">${type.charge}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
