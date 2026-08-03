import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield, Heart, Users, CheckCircle, ArrowRight, Phone, Award, Stethoscope } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const medicareOptions = [
  {
    icon: Heart,
    title: 'Medicare Advantage (Part C)',
    description: "An 'all-in-one' alternative to Original Medicare, offered by private companies. These plans bundle Part A, Part B, and often Part D into one plan. Many include extra benefits like dental, vision, and hearing.",
    features: ['Bundles Part A, B, and D', 'Often includes dental, vision, hearing', 'Out-of-pocket maximum protection', 'Can have low or $0 premium'],
    plans: ['HMO', 'PPO', 'PFFS', 'SNP']
  },
  {
    icon: Shield,
    title: 'Medicare Supplement (Medigap)',
    description: 'Medigap plans work alongside your Original Medicare to help pay for out-of-pocket costs like deductibles, copayments, and coinsurance. Standardized plans offer predictability and peace of mind.',
    features: ['Covers Original Medicare out-of-pocket costs', 'Standardized plans (Plan G, Plan N)', 'No network restrictions', 'Guaranteed renewable coverage'],
    plans: ['Plan G', 'Plan F', 'Plan N', 'Plan A']
  },
  {
    icon: Stethoscope,
    title: 'Prescription Drug Plans (Part D)',
    description: "A standalone plan that adds prescription drug coverage to Original Medicare. Each plan has its own formulary, so it's important to find one that covers your specific medications.",
    features: ['Covers prescription drug costs', 'Can be standalone or bundled', 'Formularies vary by plan', 'Protects against high drug costs']
  }
];

const keyBenefits = [
  'Help pay for costs Original Medicare doesn\'t cover',
  'Protection from high out-of-pocket expenses',
  'Access to additional benefits like dental and vision',
  'Prescription drug coverage options',
  'Network of quality healthcare providers',
  'Predictable monthly costs'
];

const faqs = [
  { question: "What's the difference between Medicare Supplement and Medicare Advantage?", answer: "Medicare Supplement works alongside Original Medicare to help pay costs like deductibles and coinsurance. Medicare Advantage replaces Original Medicare and often includes extra benefits like dental, vision, and prescription drugs." },
  { question: 'When can I enroll in Medicare plans?', answer: 'You can enroll during your Initial Enrollment Period (3 months before to 3 months after turning 65), Annual Open Enrollment (October 15 - December 7), or during Special Enrollment Periods for qualifying life events.' },
  { question: 'Do I need prescription drug coverage?', answer: "If you don't have creditable prescription drug coverage, you may face late enrollment penalties. Part D plans or Medicare Advantage with drug coverage can help reduce medication costs." },
  { question: 'Are dental, vision, and hearing covered by Original Medicare?', answer: 'Original Medicare provides limited coverage for these services. Standalone plans or Medicare Advantage plans with these benefits can provide more comprehensive coverage.' }
];

export default function MedicarePage() {
  const [zipCode, setZipCode] = useState('');

  const handleGetStarted = () => {
    window.location.href = `${createPageUrl('Calculator')}?zip=${zipCode}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Most People Pick the Wrong Medicare Plan — <span className="text-blue-300">And Pay for It for Years</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Turning 65 is a one-time window. Pick the wrong plan and you could be locked into higher costs, restricted doctors, and gaps in coverage. We compare every option for free — so you get it right the first time.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Get Your Free Medicare Review</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP and a Medicare specialist will walk you through every option available in your area.</p>
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
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3"><Award className="w-8 h-8 text-blue-600" /></div>
              <h3 className="font-semibold text-slate-900">Medicare Specialists</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><Users className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-semibold text-slate-900">Objective Guidance</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><Shield className="w-8 h-8 text-purple-600" /></div>
              <h3 className="font-semibold text-slate-900">Free Consultations</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Medicare Options */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Your Three Medicare Choices — Explained Simply</h2>
            <p className="text-lg text-slate-600">We'll show you exactly what each covers, what it costs, and which one fits your doctors, drugs, and budget.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {medicareOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#1A3586' }} />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{option.description}</p>
                    <h4 className="font-semibold text-sm mb-2 text-slate-800">Key Features:</h4>
                    <ul className="space-y-1 mb-4">
                      {option.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {option.plans && (
                      <div className="flex flex-wrap gap-2">
                        {option.plans.map((plan, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">{plan}</span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What Original Medicare Leaves Uncovered (And Why It Matters)</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Medicare Questions & Answers</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-slate-600 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Your Turning-65 Window Is Opening — Don't Miss It</h2>
          <p className="text-xl text-slate-200 mb-8">You have a short enrollment window when you turn 65. Miss it and you could face permanent premium penalties. Our Medicare specialists will make sure you enroll in the right plan at the right time — for free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold text-lg px-8" style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}>
              <Link to={createPageUrl('Book')}>
                Book My Medicare Review <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold border-2" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              <a href="tel:9545430853"><Phone className="w-5 h-5 mr-2" /> Call Now</a>
            </Button>
          </div>
          <p className="text-slate-300 mt-6">Free consultation &nbsp;•&nbsp; Medicare specialists &nbsp;•&nbsp; Objective guidance</p>
        </div>
      </section>
    </div>
  );
}