import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { DollarSign, TrendingUp, Calendar, Calculator } from 'lucide-react';

export default function WholeLifeCashValueEstimator() {
  const [faceAmount, setFaceAmount] = useState(100000);
  const [monthlyPremium, setMonthlyPremium] = useState(150);
  const [currentAge, setCurrentAge] = useState(35);
  const [yearsToProject, setYearsToProject] = useState(30);

  // Calculate cash value growth at 3% and 4% annually
  const projectionData = useMemo(() => {
    const data = [];
    const annualPremium = monthlyPremium * 12;
    
    // Simplified whole life cash value model
    // Assumes 50% of premiums go to cash value in early years, increasing over time
    for (let year = 0; year <= yearsToProject; year++) {
      const totalPremiumsPaid = annualPremium * year;
      
      // Cash value accumulation factor (increases over time as policy matures)
      const accumulationFactor = Math.min(0.5 + (year * 0.015), 0.85);
      
      // Base cash value (portion of premiums)
      const baseCashValue = totalPremiumsPaid * accumulationFactor;
      
      // Calculate compound growth on accumulated cash value
      let cashValue3 = 0;
      let cashValue4 = 0;
      
      for (let i = 1; i <= year; i++) {
        const yearPremium = annualPremium * (0.5 + (i * 0.015));
        cashValue3 += yearPremium * Math.pow(1.03, year - i);
        cashValue4 += yearPremium * Math.pow(1.04, year - i);
      }
      
      data.push({
        year,
        age: currentAge + year,
        premiumsPaid: totalPremiumsPaid,
        cashValue3: Math.round(cashValue3),
        cashValue4: Math.round(cashValue4),
        deathBenefit: faceAmount
      });
    }
    
    return data;
  }, [faceAmount, monthlyPremium, currentAge, yearsToProject]);

  const finalValues3 = projectionData[projectionData.length - 1];
  const finalValues4 = projectionData[projectionData.length - 1];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-semibold text-slate-900 mb-2">Year {label}</p>
          <p className="text-sm text-slate-600 mb-1">
            Age: {currentAge + label}
          </p>
          <p className="text-sm text-blue-600 font-semibold">
            3% Growth: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-sm text-green-600 font-semibold">
            4% Growth: {formatCurrency(payload[1].value)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Premiums Paid: {formatCurrency(payload[0].payload.premiumsPaid)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Input Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" style={{ color: '#D4AF37' }} />
            Cash Value Projection Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="faceAmount">Death Benefit / Face Amount</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="faceAmount"
                  type="number"
                  value={faceAmount}
                  onChange={(e) => setFaceAmount(Number(e.target.value))}
                  className="pl-9"
                  step={10000}
                />
              </div>
              <Slider
                value={[faceAmount]}
                onValueChange={(values) => setFaceAmount(values[0])}
                min={25000}
                max={500000}
                step={25000}
                className="mt-2"
              />
              <p className="text-xs text-slate-500">
                {formatCurrency(faceAmount)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyPremium">Monthly Premium</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="monthlyPremium"
                  type="number"
                  value={monthlyPremium}
                  onChange={(e) => setMonthlyPremium(Number(e.target.value))}
                  className="pl-9"
                  step={10}
                />
              </div>
              <Slider
                value={[monthlyPremium]}
                onValueChange={(values) => setMonthlyPremium(values[0])}
                min={50}
                max={1000}
                step={10}
                className="mt-2"
              />
              <p className="text-xs text-slate-500">
                {formatCurrency(monthlyPremium)}/month = {formatCurrency(monthlyPremium * 12)}/year
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAge">Current Age</Label>
              <Input
                id="currentAge"
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                min={18}
                max={75}
              />
              <Slider
                value={[currentAge]}
                onValueChange={(values) => setCurrentAge(values[0])}
                min={18}
                max={75}
                step={1}
                className="mt-2"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearsToProject">Years to Project</Label>
              <Input
                id="yearsToProject"
                type="number"
                value={yearsToProject}
                onChange={(e) => setYearsToProject(Number(e.target.value))}
                min={10}
                max={50}
              />
              <Slider
                value={[yearsToProject]}
                onValueChange={(values) => setYearsToProject(values[0])}
                min={10}
                max={50}
                step={5}
                className="mt-2"
              />
              <p className="text-xs text-slate-500">
                Projecting to age {currentAge + yearsToProject}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">3% Growth Rate</h3>
            </div>
            <p className="text-3xl font-bold text-blue-900 mb-1">
              {formatCurrency(finalValues3.cashValue3)}
            </p>
            <p className="text-sm text-blue-700">
              Cash Value after {yearsToProject} years
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">4% Growth Rate</h3>
            </div>
            <p className="text-3xl font-bold text-green-900 mb-1">
              {formatCurrency(finalValues4.cashValue4)}
            </p>
            <p className="text-sm text-green-700">
              Cash Value after {yearsToProject} years
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-slate-600" />
              <h3 className="font-semibold text-slate-900">Total Invested</h3>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {formatCurrency(finalValues3.premiumsPaid)}
            </p>
            <p className="text-sm text-slate-700">
              Premiums paid over {yearsToProject} years
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Value Growth Projection</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="area" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
              <TabsTrigger value="area">Area Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
            </TabsList>

            <TabsContent value="area">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={projectionData}>
                  <defs>
                    <linearGradient id="color3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="color4" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Cash Value', angle: -90, position: 'insideLeft' }}
                    stroke="#64748b"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="cashValue3"
                    name="3% Growth"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fill="url(#color3)"
                  />
                  <Area
                    type="monotone"
                    dataKey="cashValue4"
                    name="4% Growth"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#color4)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>

            <TabsContent value="line">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={projectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                    label={{ value: 'Cash Value', angle: -90, position: 'insideLeft' }}
                    stroke="#64748b"
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="premiumsPaid"
                    name="Total Premiums Paid"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cashValue3"
                    name="3% Growth"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cashValue4"
                    name="4% Growth"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: '#10b981', r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Milestone Table */}
      <Card>
        <CardHeader>
          <CardTitle>Key Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Year</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Age</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Premiums Paid</th>
                  <th className="text-right py-3 px-4 font-semibold text-blue-700">Cash Value (3%)</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-700">Cash Value (4%)</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Death Benefit</th>
                </tr>
              </thead>
              <tbody>
                {projectionData
                  .filter((_, index) => index % 5 === 0 || index === projectionData.length - 1)
                  .map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">{row.year}</td>
                      <td className="py-3 px-4">{row.age}</td>
                      <td className="py-3 px-4 text-right text-slate-600">
                        {formatCurrency(row.premiumsPaid)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-blue-700">
                        {formatCurrency(row.cashValue3)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-green-700">
                        {formatCurrency(row.cashValue4)}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {formatCurrency(row.deathBenefit)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <p className="text-sm text-amber-900">
            <strong>Important Disclosure:</strong> This illustration is for educational purposes only and does not represent an actual insurance policy or guarantee of returns. Actual cash values may vary based on the specific policy, carrier, dividends (if applicable), policy loans, withdrawals, and other factors. Consult with a licensed insurance agent for personalized quotes and illustrations. Assumes level premiums paid consistently with no loans or withdrawals.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}