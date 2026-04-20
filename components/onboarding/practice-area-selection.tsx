'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Specialty, PRACTICE_AREAS } from '@/lib/types';
import { useOnboarding } from '@/lib/onboarding-context';

export function PracticeAreaSelection() {
  const { state, setSpecialties, setStep } = useOnboarding();
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<Specialty[]>(state.specialties);

  const filteredAreas = PRACTICE_AREAS.filter(area =>
    area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (area: string) => {
    const exists = selected.find(s => s.id === area);
    if (exists) {
      setSelected(selected.filter(s => s.id !== area));
    } else {
      setSelected([...selected, { id: area, name: area }]);
    }
  };

  const handleContinue = () => {
    setSpecialties(selected);
    setStep(3);
  };

  const calculateCost = () => {
    if (selected.length === 0) return 500;
    if (selected.length === 1) return 500;
    if (selected.length === 2) return 750;
    return 750 + (selected.length - 2) * 125;
  };

  const getItemizedCosts = () => {
    if (selected.length === 0) return [];
    if (selected.length === 1) return [{ name: selected[0].name, cost: 500 }];
    if (selected.length === 2) return [
      { name: selected[0].name, cost: 500 },
      { name: selected[1].name, cost: 250 }
    ];
    return [
      { name: selected[0].name, cost: 500 },
      { name: selected[1].name, cost: 250 },
      ...selected.slice(2).map(s => ({ name: s.name, cost: 125 }))
    ];
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Select Practice Areas
        </h2>
        <p className="text-lg text-slate-600">
          Choose the legal specialties you want to be visible for
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search practice areas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          {selected.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {selected.map((specialty) => (
                <Badge
                  key={specialty.id}
                  variant="secondary"
                  className="px-3 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  {specialty.name}
                  <button
                    onClick={() => handleToggle(specialty.id)}
                    className="ml-2 hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {filteredAreas.map((area) => {
              const isSelected = selected.some(s => s.id === area);
              return (
                <Card
                  key={area}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 border-2'
                      : 'hover:bg-slate-50 border-slate-200'
                  }`}
                  onClick={() => handleToggle(area)}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>
                      {area}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6 bg-slate-900 text-white">
            <h3 className="text-xl font-bold mb-6">
              Monthly Ad Commitment
            </h3>

            <div className="space-y-4 mb-6">
              {getItemizedCosts().map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.name}</span>
                  <span className="font-semibold">${item.cost}/mo</span>
                </div>
              ))}
              {selected.length === 0 && (
                <div className="text-slate-400 text-sm">
                  Select practice areas to see pricing
                </div>
              )}
            </div>

            <div className="border-t border-slate-700 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Monthly</span>
                <span className="text-3xl font-bold text-blue-400">
                  ${calculateCost()}
                </span>
              </div>
            </div>

            <div className="bg-slate-800 p-4 rounded-lg mb-6 text-sm">
              <p className="text-slate-300 mb-2">
                <strong className="text-white">Pricing Structure:</strong>
              </p>
              <ul className="space-y-1 text-slate-400">
                <li>• First specialty: $500/month</li>
                <li>• Second specialty: $250/month</li>
                <li>• Each additional: $125/month</li>
              </ul>
            </div>

            <div className="bg-blue-900/50 p-4 rounded-lg mb-6 text-sm text-blue-100">
              Minimum monthly commitment: <strong>$500</strong>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
              onClick={handleContinue}
              disabled={selected.length === 0}
            >
              Continue to Geography
            </Button>

            <Button
              variant="ghost"
              className="w-full mt-2 text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
