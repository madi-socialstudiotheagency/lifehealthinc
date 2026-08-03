import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, XCircle, TrendingUp, Clock, DollarSign, Shield } from 'lucide-react';

export default function TermVsWholeLifeSlider() {
  const [activeTab, setActiveTab] = useState('term');

  const termFeatures = [
    { feature: 'Coverage Duration', value: 'Fixed term (10, 20, 30 years)', icon: Clock, positive: true },
    { feature: 'Monthly Premium', value: 'Lower ($20-$100/month)', icon: DollarSign, positive: true },
    { feature: 'Cash Value Accumulation', value: 'None', icon: TrendingUp, positive: false },
    { feature: 'Coverage After Term', value: 'Expires unless renewed', icon: Shield, positive: false },
    { feature: 'Best For', value: 'Temporary needs, budget-conscious', icon: CheckCircle2, positive: true },
    { feature: 'Premium Changes', value: 'May increase at renewal', icon: DollarSign, positive: false }
  ];

  const wholeLifeFeatures = [
    { feature: 'Coverage Duration', value: 'Lifetime (to age 100+)', icon: Clock, positive: true },
    { feature: 'Monthly Premium', value: 'Higher ($100-$500/month)', icon: DollarSign, positive: false },
    { feature: 'Cash Value Accumulation', value: '3-4% guaranteed growth', icon: TrendingUp, positive: true },
    { feature: 'Coverage After Term', value: 'Permanent, never expires', icon: Shield, positive: true },
    { feature: 'Best For', value: 'Long-term wealth building', icon: CheckCircle2, positive: true },
    { feature: 'Premium Changes', value: 'Fixed for life', icon: DollarSign, positive: true }
  ];

  const FeatureCard = ({ features, type, color }) => (
    <div className="space-y-4">
      <div className={`text-center py-8 rounded-t-2xl`} style={{ 
        background: type === 'term' 
          ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
          : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      }}>
        <h3 className="text-3xl font-bold text-white mb-2">
          {type === 'term' ? 'Term Life Insurance' : 'Whole Life Insurance'}
        </h3>
        <p className="text-white/90">
          {type === 'term' 
            ? 'Affordable protection for a specific period'
            : 'Lifetime coverage with guaranteed cash value'}
        </p>
      </div>
      
      <div className="space-y-3 p-6">
        {features.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                item.positive ? 'text-green-600' : 'text-slate-400'
              }`} />
              <div className="flex-1">
                <p className="font-semibold text-slate-900 text-sm mb-1">
                  {item.feature}
                </p>
                <p className={`text-sm ${
                  item.positive ? 'text-slate-700' : 'text-slate-500'
                }`}>
                  {item.value}
                </p>
              </div>
              {item.positive ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-slate-300 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 h-auto p-1" style={{ backgroundColor: '#f1f5f9' }}>
          <TabsTrigger 
            value="term" 
            className="text-base py-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <Shield className="w-5 h-5 mr-2" />
            Term Life
          </TabsTrigger>
          <TabsTrigger 
            value="whole" 
            className="text-base py-4 data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Whole Life
          </TabsTrigger>
        </TabsList>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Desktop: Always show both */}
          <div className="hidden lg:block">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-blue-200">
              <FeatureCard features={termFeatures} type="term" color="blue" />
            </Card>
          </div>
          
          <div className="hidden lg:block">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-green-200">
              <FeatureCard features={wholeLifeFeatures} type="whole" color="green" />
            </Card>
          </div>

          {/* Mobile: Show based on active tab */}
          <div className="lg:hidden col-span-full">
            <TabsContent value="term" className="mt-0">
              <Card className="overflow-hidden shadow-xl border-2 border-blue-200">
                <FeatureCard features={termFeatures} type="term" color="blue" />
              </Card>
            </TabsContent>

            <TabsContent value="whole" className="mt-0">
              <Card className="overflow-hidden shadow-xl border-2 border-green-200">
                <FeatureCard features={wholeLifeFeatures} type="whole" color="green" />
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>

      {/* Quick Comparison Summary */}
      <Card className="mt-8 border-2" style={{ borderColor: '#D4AF37' }}>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">
            Which One is Right for You?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-700 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Choose Term Life If:
              </h4>
              <ul className="space-y-1 text-sm text-slate-700 pl-7">
                <li>• You need affordable coverage now</li>
                <li>• You have temporary obligations (mortgage, kids)</li>
                <li>• Your budget is limited</li>
                <li>• You want maximum coverage for lowest cost</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Choose Whole Life If:
              </h4>
              <ul className="space-y-1 text-sm text-slate-700 pl-7">
                <li>• You want lifetime guaranteed coverage</li>
                <li>• You're interested in building cash value</li>
                <li>• You can afford higher premiums</li>
                <li>• You want tax-advantaged savings</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}