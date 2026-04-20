'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { GeographySelection, GeographyType, TOP_10_MARKETS } from '@/lib/types';
import { useOnboarding } from '@/lib/onboarding-context';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function GeographySelectionComponent() {
  const { state, setGeography, setStep } = useOnboarding();
  const [geoType, setGeoType] = useState<GeographyType>(state.geography?.type || 'top10');
  const [selectedTop10, setSelectedTop10] = useState<string>(state.geography?.top10Market || '');
  const [zipCodes, setZipCodes] = useState<string[]>(state.geography?.zipCodes || []);
  const [zipInput, setZipInput] = useState('');
  const [cities, setCities] = useState<string[]>(state.geography?.cities || []);
  const [cityInput, setCityInput] = useState('');
  const [msas, setMsas] = useState<string[]>(state.geography?.msas || []);
  const [msaInput, setMsaInput] = useState('');
  const [states, setStates] = useState<string[]>(state.geography?.states || []);
  const [stateInput, setStateInput] = useState('');

  const handleAddZip = () => {
    if (zipInput.trim() && !zipCodes.includes(zipInput.trim())) {
      setZipCodes([...zipCodes, zipInput.trim()]);
      setZipInput('');
    }
  };

  const handleAddCity = () => {
    if (cityInput.trim() && !cities.includes(cityInput.trim())) {
      setCities([...cities, cityInput.trim()]);
      setCityInput('');
    }
  };

  const handleAddMsa = () => {
    if (msaInput.trim() && !msas.includes(msaInput.trim())) {
      setMsas([...msas, msaInput.trim()]);
      setMsaInput('');
    }
  };

  const handleAddState = () => {
    if (stateInput.trim() && !states.includes(stateInput.trim())) {
      setStates([...states, stateInput.trim()]);
      setStateInput('');
    }
  };

  const handleContinue = () => {
    const geography: GeographySelection = {
      type: geoType,
      ...(geoType === 'top10' && { top10Market: selectedTop10, zipCodes }),
      ...(geoType === 'other' && { cities, msas, states })
    };
    setGeography(geography);
    setStep(4);
  };

  const isValid = () => {
    if (geoType === 'top10') {
      return selectedTop10 && zipCodes.length > 0;
    }
    return cities.length > 0 || msas.length > 0 || states.length > 0;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">
          Define Your Geography
        </h2>
        <p className="text-lg text-slate-600">
          Choose where you want to receive legal opportunities
        </p>
      </div>

      <Card className="p-8">
        <RadioGroup value={geoType} onValueChange={(value) => setGeoType(value as GeographyType)} className="mb-8">
          <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-slate-50" onClick={() => setGeoType('top10')}>
            <RadioGroupItem value="top10" id="top10" />
            <Label htmlFor="top10" className="text-lg font-semibold cursor-pointer flex-1">
              Top 10 Major Market
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-slate-50" onClick={() => setGeoType('other')}>
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="text-lg font-semibold cursor-pointer flex-1">
              Other Market
            </Label>
          </div>
        </RadioGroup>

        {geoType === 'top10' && (
          <div className="space-y-6">
            <div>
              <Label className="text-base mb-2 block">Select Major Market</Label>
              <Select value={selectedTop10} onValueChange={setSelectedTop10}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a market..." />
                </SelectTrigger>
                <SelectContent>
                  {TOP_10_MARKETS.map((market) => (
                    <SelectItem key={market} value={market}>
                      {market}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedTop10 && (
              <div>
                <Label className="text-base mb-2 block">Add ZIP Codes</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter ZIP code"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddZip()}
                  />
                  <Button onClick={handleAddZip} type="button">Add</Button>
                </div>
                {zipCodes.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {zipCodes.map((zip) => (
                      <Badge key={zip} variant="secondary" className="px-3 py-1">
                        {zip}
                        <button onClick={() => setZipCodes(zipCodes.filter(z => z !== zip))} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {geoType === 'other' && (
          <Tabs defaultValue="city" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="city">City</TabsTrigger>
              <TabsTrigger value="msa">MSA</TabsTrigger>
              <TabsTrigger value="state">State</TabsTrigger>
            </TabsList>

            <TabsContent value="city" className="space-y-4">
              <div>
                <Label className="text-base mb-2 block">Add Cities</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter city name"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
                  />
                  <Button onClick={handleAddCity} type="button">Add</Button>
                </div>
                {cities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {cities.map((city) => (
                      <Badge key={city} variant="secondary" className="px-3 py-1">
                        {city}
                        <button onClick={() => setCities(cities.filter(c => c !== city))} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="msa" className="space-y-4">
              <div>
                <Label className="text-base mb-2 block">Add Metropolitan Statistical Areas</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter MSA name"
                    value={msaInput}
                    onChange={(e) => setMsaInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddMsa()}
                  />
                  <Button onClick={handleAddMsa} type="button">Add</Button>
                </div>
                {msas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {msas.map((msa) => (
                      <Badge key={msa} variant="secondary" className="px-3 py-1">
                        {msa}
                        <button onClick={() => setMsas(msas.filter(m => m !== msa))} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="state" className="space-y-4">
              <div>
                <Label className="text-base mb-2 block">Add States</Label>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Enter state name"
                    value={stateInput}
                    onChange={(e) => setStateInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddState()}
                  />
                  <Button onClick={handleAddState} type="button">Add</Button>
                </div>
                {states.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {states.map((state) => (
                      <Badge key={state} variant="secondary" className="px-3 py-1">
                        {state}
                        <button onClick={() => setStates(states.filter(s => s !== state))} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}

        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep(2)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!isValid()}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Continue to Firm Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}
