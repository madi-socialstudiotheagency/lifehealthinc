import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Heart, TrendingUp, DollarSign, CheckCircle, ArrowRight, Users, UserCheck, Info, Award } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createPageUrl } from '@/utils';
import CalendlyModal from '../components/CalendlyModal';

const lifeInsuranceTypes = [
  {
    title: 'Term Life Insurance',
    icon: Shield,
    description: "The most affordable way to put a massive safety net over your family right now — $500,000 in coverage for less than your Netflix bill. Lock in your rate today while you're young and healthy.",
    features: ['Lowest cost per dollar of coverage', 'Premiums locked in — never go up', 'Convertible to permanent if your needs change', 'Your family gets a tax-free lump sum'],
    bestFor: 'Young parents, new homeowners, anyone who wants serious protection on a budget'
  },
  {
    title: 'Whole Life Insurance',
    icon: Heart,
    description: 'Coverage that can never be taken away — combined with a savings account that grows tax-free and you can borrow against. Think of it as protection that pays you back.',
    features: ['Guaranteed cash value that grows every year', 'Premiums fixed for life — no surprises', 'Earn dividends from mutual companies', 'Estate planning tool that passes wealth tax-free'],
    bestFor: 'Conservative planners, parents of young children, those building tax-free wealth'
  },
  {
    title: 'Indexed Universal Life (IUL)',
    icon: TrendingUp,
    description: 'Grow a tax-free retirement account inside a life insurance policy — linked to the stock market\'s gains, but with a 0% floor so you never lose principal to a market crash.',
    features: ['Participate in market upside with zero downside risk', '0% floor: your money never goes backwards', 'Flexible premiums fit your budget', 'Tax-free retirement income via policy loans'],
    bestFor: "High earners who've maxed out their 401(k), retirement planners, business owners"
  }
];

const comparisonData = [
  { feature: 'Coverage Duration', term: '10-30 years', whole: 'Lifetime', iul: 'Lifetime' },
  { feature: 'Premium Cost', term: 'Lowest', whole: 'Moderate-High', iul: 'Moderate' },
  { feature: 'Cash Value', term: 'None', whole: 'Guaranteed Growth', iul: 'Index-Linked Growth' },
  { feature: 'Flexibility', term: 'Limited', whole: 'Fixed Structure', iul: 'High Flexibility' },
  { feature: 'Best For', term: 'Temporary Needs', whole: 'Conservative Growth', iul: 'Growth + Protection' }
];

export default function LifeInsurancePage() {
  const [zipCode, setZipCode] = useState('');
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleGetStarted = () => {
    window.location.href = `${createPageUrl('Calculator')}?zip=${zipCode}`;
  };

  return (
    <div className="min-h-screen">
      <CalendlyModal open={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} url="https://api.leadconnectorhq.com/widget/booking/zAy1c6lp4SLPJspafNxY" />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              If You Died Tomorrow, <span className="text-blue-300">Would Your Family Be Okay?</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Most families are one tragedy away from financial ruin — because they put off life insurance. Takes 60 seconds to see what it costs. It's probably less than you think.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">See Your Rate in 60 Seconds</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP — a licensed broker will reach out with your exact quote. No pressure, no obligation.</p>
                <div className="flex gap-3">
                  <Input type="text" placeholder="ZIP Code" value={zipCode} onChange={e => setZipCode(e.target.value)} className="flex-1" maxLength={5} />
                  <Button onClick={handleGetStarted} size="lg" className="font-semibold" style={{ backgroundColor: '#1A3586', color: '#FFFFFF' }}>
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#1A3586' }}>(954) 543-0853</a> for a quote
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Licensed in All 50 States</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">50+ Carriers Compared</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">No-Cost Consultations</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Life Insurance */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Which Type Is Right for You?</h2>
            <p className="text-lg text-slate-600">Every policy is different. Here's what each one does — and who it's best for.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {lifeInsuranceTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#1A3586' }} />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600">{type.description}</p>
                    <ul className="space-y-1">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-500"><strong>Best For:</strong> {type.bestFor}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Surrogate Ownership Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="surrogate" className="border rounded-xl px-6">
              <AccordionTrigger className="hover:no-underline py-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                     <UserCheck className="w-6 h-6" style={{ color: '#1A3586' }} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-slate-900">Recently Declined? There's Another Way.</h2>
                    <p className="text-sm text-slate-500 font-normal mt-1">Learn about surrogate ownership options</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 space-y-4">
                  <p className="text-slate-700">Can't qualify for your own policy? Take out a <strong>Whole Life or IUL policy</strong> on a family member (child, parent, or spouse) where you are the owner and they are the insured. <strong>You control and access the cash value</strong> for your financial needs.</p>
                  <div className="space-y-3">
                    {['Declined Due to Health? Insure your healthy child, parent, or spouse instead.',
                      'Can\'t Afford Coverage on Yourself? Younger insureds have lower premiums.',
                      'You Own the Cash Value — access tax-free through policy loans.',
                      'Guaranteed Growth (Whole Life) or Market-Linked Growth (IUL).'].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Alert className="border-blue-200 bg-blue-50">
                    <Info className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      <strong>Perfect For:</strong> Parents insuring children, adult children insuring aging parents, or anyone with health issues insuring healthy family members.
                    </AlertDescription>
                  </Alert>
                  <Button onClick={() => setIsCalendlyOpen(true)} size="lg" className="font-semibold" style={{ backgroundColor: '#1A3586', color: '#FFFFFF' }}>
                    Learn About Surrogate Options
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Side-by-Side Comparison</h2>
          </div>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="text-left p-4 font-semibold text-slate-900">Feature</th>
                    <th className="text-center p-4 font-semibold text-slate-900">Term Life</th>
                    <th className="text-center p-4 font-semibold text-slate-900">Whole Life</th>
                    <th className="text-center p-4 font-semibold text-slate-900">IUL</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium text-slate-900">{row.feature}</td>
                      <td className="p-4 text-center text-slate-600">{row.term}</td>
                      <td className="p-4 text-center text-slate-600">{row.whole}</td>
                      <td className="p-4 text-center text-slate-600">{row.iul}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Work With LifeHealthInc?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, color: 'blue', label: 'Independent', desc: 'We compare 50+ carriers to find you the best rate and coverage.' },
              { icon: Users, color: 'green', label: 'Licensed Experts', desc: 'Our team is licensed in all 50 states with decades of combined experience.' },
              { icon: Heart, color: 'purple', label: 'Client-Focused', desc: 'We work for you, not insurance companies. Your best interest is our only goal.' },
              { icon: DollarSign, color: 'amber', label: 'No Extra Cost', desc: 'Our services are free — carriers pay us the same commission regardless.' },
            ].map(({ icon: Icon, color, label, desc }, i) => (
              <div key={i} className="text-center">
                <div className={`w-16 h-16 rounded-full bg-${color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 text-${color}-600`} />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{label}</h3>
                <p className="text-slate-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {[
              { q: 'How much life insurance do I need?', a: 'A common rule is 10-12x your annual income, but it depends on debts, dependents, and goals. Our free consultation helps determine your specific needs.' },
              { q: 'Do I need a medical exam?', a: 'Not always. Many policies now offer accelerated underwriting with no exam required for healthy applicants up to certain coverage amounts.' },
              { q: 'Can I change my coverage later?', a: 'Term policies often have conversion options to permanent coverage. Permanent policies typically allow you to adjust coverage and premiums within limits.' },
              { q: 'What if I have health issues?', a: 'We work with specialized carriers that insure people with various health conditions. Even if declined elsewhere, we may find coverage options for you. Additionally, consider surrogate ownership.' },
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-white border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-slate-600">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Don't Wait Until It's Too Late</h2>
          <p className="text-xl text-slate-200 mb-8">Life insurance gets more expensive every year you wait — and a health change can disqualify you entirely. Lock in your rate today. It's free to check.</p>
          <Button onClick={() => setIsCalendlyOpen(true)} size="lg" className="font-bold text-lg px-8" style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}>
            Get My Free Quote Now <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-slate-300 mt-6">Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#FFFFFF' }}>(954) 543-0853</a> — a licensed broker answers, not a call center</p>
        </div>
      </section>
    </div>
  );
}