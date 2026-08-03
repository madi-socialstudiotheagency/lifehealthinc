import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertCircle, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(45);
  const [retirementAge, setRetirementAge] = useState(67);
  const [annualIncome, setAnnualIncome] = useState(50000);
  const [percentToSave, setPercentToSave] = useState(8);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [expectedIncomeIncrease, setExpectedIncomeIncrease] = useState(2);
  const [preRetirementIncomeDesired, setPreRetirementIncomeDesired] = useState(90);
  const [yearsOfRetirement, setYearsOfRetirement] = useState(35);

  // Investment returns and inflation (fixed for now)
  const preRetirementReturn = 0.07;
  const inRetirementReturn = 0.04;
  const inflationRate = 0.03;

  const [results, setResults] = useState({
    savingsAtRetirement: 0,
    annualRetirementNeed: 0,
    savingsLastUntilAge: 0,
    totalContributions: 0,
    chartData: []
  });

  useEffect(() => {
    calculateRetirement();
  }, [currentAge, retirementAge, annualIncome, percentToSave, currentSavings, expectedIncomeIncrease, preRetirementIncomeDesired, yearsOfRetirement]);

  const calculateRetirement = () => {
    const yearsUntilRetirement = retirementAge - currentAge;
    let balance = currentSavings;
    let income = annualIncome;
    let totalContributions = 0;
    const chartData = [];

    // Pre-retirement accumulation
    for (let age = currentAge; age < retirementAge; age++) {
      const contribution = income * (percentToSave / 100);
      totalContributions += contribution;
      balance = balance * (1 + preRetirementReturn) + contribution;
      income = income * (1 + expectedIncomeIncrease / 100);
      
      chartData.push({
        age: age,
        balance: Math.round(balance),
        phase: 'accumulation'
      });
    }

    const savingsAtRetirement = balance;
    const lastYearIncome = income / (1 + expectedIncomeIncrease / 100);
    const annualRetirementNeed = lastYearIncome * (preRetirementIncomeDesired / 100);

    // Post-retirement drawdown
    let savingsLastUntilAge = retirementAge;
    for (let age = retirementAge; age < retirementAge + yearsOfRetirement; age++) {
      const withdrawal = annualRetirementNeed * Math.pow(1 + inflationRate, age - retirementAge);
      balance = balance * (1 + inRetirementReturn) - withdrawal;
      
      chartData.push({
        age: age,
        balance: Math.round(Math.max(0, balance)),
        phase: 'retirement'
      });

      if (balance <= 0 && savingsLastUntilAge === retirementAge) {
        savingsLastUntilAge = age;
      }
    }

    if (savingsLastUntilAge === retirementAge && balance > 0) {
      savingsLastUntilAge = retirementAge + yearsOfRetirement;
    }

    setResults({
      savingsAtRetirement: Math.round(savingsAtRetirement),
      annualRetirementNeed: Math.round(annualRetirementNeed),
      savingsLastUntilAge,
      totalContributions: Math.round(totalContributions),
      chartData
    });
  };

  const handleReset = () => {
    setCurrentAge(45);
    setRetirementAge(67);
    setAnnualIncome(50000);
    setPercentToSave(8);
    setCurrentSavings(100000);
    setExpectedIncomeIncrease(2);
    setPreRetirementIncomeDesired(90);
    setYearsOfRetirement(35);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatShortCurrency = (value) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };

  const savingsStatus = results.savingsLastUntilAge < (retirementAge + yearsOfRetirement) ? 'warning' : 'success';

  return (
    <div className="min-h-screen py-12 px-4" style={{ background: 'linear-gradient(to bottom, #1C1B30 0%, #2C2B50 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#D4AF37' }}>Retirement Calculator</h1>
          <p className="text-slate-300 text-lg">
            Do you know what it takes to work towards a secure retirement? Use this calculator to help you create your retirement plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Inputs */}
          <div className="lg:col-span-1">
            <Card className="bg-white/10 border-white/20 text-white">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle style={{ color: '#D4AF37' }}>Retirement Plan Inputs</CardTitle>
                  <Button onClick={handleReset} variant="outline" size="sm" style={{ borderColor: '#D4AF37', color: '#D4AF37' }}>
                    Reset
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Age */}
                <div className="space-y-2">
                  <Label className="text-white">Current Age</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{currentAge}</div>
                  <Slider
                    value={[currentAge]}
                    onValueChange={(val) => setCurrentAge(val[0])}
                    min={14}
                    max={90}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>14</span>
                    <span>90</span>
                  </div>
                </div>

                {/* Age at Retirement */}
                <div className="space-y-2">
                  <Label className="text-white">Age at Retirement</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{retirementAge}</div>
                  <Slider
                    value={[retirementAge]}
                    onValueChange={(val) => setRetirementAge(val[0])}
                    min={Math.max(currentAge + 1, 46)}
                    max={90}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{Math.max(currentAge + 1, 46)}</span>
                    <span>90</span>
                  </div>
                </div>

                {/* Annual Household Income */}
                <div className="space-y-2">
                  <Label className="text-white">Annual Household Income</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{formatCurrency(annualIncome)}</div>
                  <Slider
                    value={[annualIncome]}
                    onValueChange={(val) => setAnnualIncome(val[0])}
                    min={0}
                    max={500000}
                    step={5000}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$0</span>
                    <span>$500K+</span>
                  </div>
                </div>

                {/* Percent of Income to Save */}
                <div className="space-y-2">
                  <Label className="text-white">Percent of Income to Save</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{percentToSave}%</div>
                  <Slider
                    value={[percentToSave]}
                    onValueChange={(val) => setPercentToSave(val[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Current Retirement Savings */}
                <div className="space-y-2">
                  <Label className="text-white">Current Retirement Savings</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{formatCurrency(currentSavings)}</div>
                  <Slider
                    value={[currentSavings]}
                    onValueChange={(val) => setCurrentSavings(val[0])}
                    min={0}
                    max={1000000}
                    step={10000}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>$0</span>
                    <span>$1M+</span>
                  </div>
                </div>

                {/* Expected Income Increase */}
                <div className="space-y-2">
                  <Label className="text-white">Expected Income Increase</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{expectedIncomeIncrease}%</div>
                  <Slider
                    value={[expectedIncomeIncrease]}
                    onValueChange={(val) => setExpectedIncomeIncrease(val[0])}
                    min={0}
                    max={20}
                    step={0.5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0%</span>
                    <span>20%</span>
                  </div>
                </div>

                {/* Pre-retirement Income Desired */}
                <div className="space-y-2">
                  <Label className="text-white">Pre-retirement Income Desired</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{preRetirementIncomeDesired}%</div>
                  <Slider
                    value={[preRetirementIncomeDesired]}
                    onValueChange={(val) => setPreRetirementIncomeDesired(val[0])}
                    min={40}
                    max={160}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>40%</span>
                    <span>160%</span>
                  </div>
                </div>

                {/* Years of Retirement Income */}
                <div className="space-y-2">
                  <Label className="text-white">Years of Retirement Income</Label>
                  <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{yearsOfRetirement}</div>
                  <Slider
                    value={[yearsOfRetirement]}
                    onValueChange={(val) => setYearsOfRetirement(val[0])}
                    min={1}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1</span>
                    <span>50</span>
                  </div>
                </div>

                {/* Investment Returns Info */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-sm text-slate-400">
                    <strong>Investment Returns, Inflation & Social Security</strong><br />
                    7% pre-retirement, 4% in retirement, 3% inflation, Social Security: No
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Alert */}
            {savingsStatus === 'warning' && (
              <Alert className="bg-red-500/20 border-red-500/50">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <AlertDescription className="text-white">
                  <strong>Savings may run out at age {results.savingsLastUntilAge}</strong>
                  <br />
                  Your plan provides {formatCurrency(results.savingsAtRetirement)} when you retire. 
                  This assumes annual retirement expenses of {formatCurrency(results.annualRetirementNeed)}.
                </AlertDescription>
              </Alert>
            )}

            {savingsStatus === 'success' && (
              <Alert className="bg-green-500/20 border-green-500/50">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-white">
                  <strong>Your savings should last through retirement!</strong>
                  <br />
                  Your plan provides {formatCurrency(results.savingsAtRetirement)} when you retire.
                </AlertDescription>
              </Alert>
            )}

            {/* Results Cards */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Savings at Retirement</p>
                      <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{formatCurrency(results.savingsAtRetirement)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Annual Retirement Need</p>
                      <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{formatCurrency(results.annualRetirementNeed)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Savings Last Until Age</p>
                      <p className="text-3xl font-bold" style={{ color: savingsStatus === 'warning' ? '#ef4444' : '#10b981' }}>
                        {results.savingsLastUntilAge}
                      </p>
                    </div>
                    <Calendar className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm mb-1">Total Contributions</p>
                      <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{formatCurrency(results.totalContributions)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-amber-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chart */}
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle style={{ color: '#D4AF37' }}>Projected Savings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis 
                      dataKey="age" 
                      stroke="#888"
                      tick={{ fill: '#888' }}
                    />
                    <YAxis 
                      stroke="#888"
                      tick={{ fill: '#888' }}
                      tickFormatter={formatShortCurrency}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1C1B30', border: '1px solid #D4AF37' }}
                      labelStyle={{ color: '#D4AF37' }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <ReferenceLine 
                      x={retirementAge} 
                      stroke="#D4AF37" 
                      strokeDasharray="3 3"
                      label={{ value: 'Retirement', position: 'top', fill: '#D4AF37' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#D4AF37" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-4">
                <p className="text-sm text-slate-400">
                  This calculator provides estimates based on assumed rates of return and inflation. Actual results will vary. 
                  This is not financial advice. Consult a financial professional for personalized guidance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}