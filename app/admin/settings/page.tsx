'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdminLayout } from '@/components/admin/admin-layout';
import { Save, DollarSign, Package, MapPin, TrendingUp } from 'lucide-react';

export default function AdminSettingsPage() {
  const [pricing, setPricing] = useState({
    firstSpecialty: 500,
    secondSpecialty: 250,
    additionalSpecialty: 125,
    textInteraction: 18,
    chatInteraction: 22,
    clickToCall: 38,
    aiTransfer: 100
  });

  const [packages, setPackages] = useState({
    sixMonth: { price: 6000, leadBudget: 3000 },
    twelveMonth: { price: 10000, leadBudget: 5000 }
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Platform Settings</h1>
          <p className="text-slate-600 mt-1">Configure pricing, packages, and platform rules</p>
        </div>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Pricing Configuration</h2>
              <p className="text-sm text-slate-600">Set pricing for practice areas and interactions</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Practice Area Ad Pricing</h3>
              <div>
                <Label htmlFor="firstSpecialty">First Specialty ($/month)</Label>
                <Input
                  id="firstSpecialty"
                  type="number"
                  value={pricing.firstSpecialty}
                  onChange={(e) => setPricing({ ...pricing, firstSpecialty: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="secondSpecialty">Second Specialty ($/month)</Label>
                <Input
                  id="secondSpecialty"
                  type="number"
                  value={pricing.secondSpecialty}
                  onChange={(e) => setPricing({ ...pricing, secondSpecialty: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="additionalSpecialty">Additional Specialty ($/month)</Label>
                <Input
                  id="additionalSpecialty"
                  type="number"
                  value={pricing.additionalSpecialty}
                  onChange={(e) => setPricing({ ...pricing, additionalSpecialty: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Interaction Pricing</h3>
              <div>
                <Label htmlFor="textInteraction">Text Inquiry ($)</Label>
                <Input
                  id="textInteraction"
                  type="number"
                  value={pricing.textInteraction}
                  onChange={(e) => setPricing({ ...pricing, textInteraction: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="chatInteraction">Chat Inquiry ($)</Label>
                <Input
                  id="chatInteraction"
                  type="number"
                  value={pricing.chatInteraction}
                  onChange={(e) => setPricing({ ...pricing, chatInteraction: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="clickToCall">Click-to-Call ($)</Label>
                <Input
                  id="clickToCall"
                  type="number"
                  value={pricing.clickToCall}
                  onChange={(e) => setPricing({ ...pricing, clickToCall: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="aiTransfer">AI Qualified Transfer ($)</Label>
                <Input
                  id="aiTransfer"
                  type="number"
                  value={pricing.aiTransfer}
                  onChange={(e) => setPricing({ ...pricing, aiTransfer: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Pricing Configuration
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Package className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Package Configuration</h2>
              <p className="text-sm text-slate-600">Configure attorney package offerings</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-4">6-Month Early Adopter</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="sixMonthPrice">Package Price ($)</Label>
                  <Input
                    id="sixMonthPrice"
                    type="number"
                    value={packages.sixMonth.price}
                    onChange={(e) => setPackages({
                      ...packages,
                      sixMonth: { ...packages.sixMonth, price: parseInt(e.target.value) }
                    })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="sixMonthBudget">Included Lead Budget ($)</Label>
                  <Input
                    id="sixMonthBudget"
                    type="number"
                    value={packages.sixMonth.leadBudget}
                    onChange={(e) => setPackages({
                      ...packages,
                      sixMonth: { ...packages.sixMonth, leadBudget: parseInt(e.target.value) }
                    })}
                    className="mt-1"
                  />
                </div>
                <div className="pt-2 text-sm text-slate-600">
                  <p>• 6-month commitment period</p>
                  <p>• Premium ad placement included</p>
                  <p>• Monthly ad pricing applies</p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-slate-50">
              <h3 className="font-semibold text-slate-900 mb-4">12-Month Growth Plan</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="twelveMonthPrice">Package Price ($)</Label>
                  <Input
                    id="twelveMonthPrice"
                    type="number"
                    value={packages.twelveMonth.price}
                    onChange={(e) => setPackages({
                      ...packages,
                      twelveMonth: { ...packages.twelveMonth, price: parseInt(e.target.value) }
                    })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="twelveMonthBudget">Included Lead Budget ($)</Label>
                  <Input
                    id="twelveMonthBudget"
                    type="number"
                    value={packages.twelveMonth.leadBudget}
                    onChange={(e) => setPackages({
                      ...packages,
                      twelveMonth: { ...packages.twelveMonth, leadBudget: parseInt(e.target.value) }
                    })}
                    className="mt-1"
                  />
                </div>
                <div className="pt-2 text-sm text-slate-600">
                  <p>• 12-month commitment period</p>
                  <p>• Premium ad placement included</p>
                  <p>• Monthly ad pricing applies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Package Configuration
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <MapPin className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Geography Rules</h2>
              <p className="text-sm text-slate-600">Configure geographic targeting rules</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Top 10 Major Markets</h3>
              <p className="text-sm text-slate-700 mb-3">
                For the top 10 MSAs, attorneys must select specific ZIP codes for precise targeting.
              </p>
              <div className="text-sm text-slate-600">
                <p className="font-medium mb-1">Markets:</p>
                <div className="grid grid-cols-2 gap-2">
                  <p>• New York</p>
                  <p>• Los Angeles</p>
                  <p>• Chicago</p>
                  <p>• Dallas–Fort Worth</p>
                  <p>• Houston</p>
                  <p>• Washington DC</p>
                  <p>• Miami</p>
                  <p>• Philadelphia</p>
                  <p>• Atlanta</p>
                  <p>• Phoenix</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Other Markets</h3>
              <p className="text-sm text-slate-700 mb-3">
                For all other markets, attorneys can target by city, MSA, or state level.
              </p>
              <div className="text-sm text-slate-600">
                <p>• City-level targeting</p>
                <p>• Metropolitan Statistical Area (MSA) targeting</p>
                <p>• State-level targeting</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Lead Auction Settings</h2>
              <p className="text-sm text-slate-600">Configure lead bidding and routing rules</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bidFloor">Minimum Bid Floor ($)</Label>
                <Input
                  id="bidFloor"
                  type="number"
                  defaultValue={25}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Minimum acceptable bid amount</p>
              </div>
              <div>
                <Label htmlFor="auctionDuration">Auction Duration (seconds)</Label>
                <Input
                  id="auctionDuration"
                  type="number"
                  defaultValue={60}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Time window for bid collection</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="disputeWindow">Dispute Window (hours)</Label>
                <Input
                  id="disputeWindow"
                  type="number"
                  defaultValue={24}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Time to file disputes</p>
              </div>
              <div>
                <Label htmlFor="minEligible">Minimum Eligible Attorneys</Label>
                <Input
                  id="minEligible"
                  type="number"
                  defaultValue={2}
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">Required for auction start</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Auction Settings
            </Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
