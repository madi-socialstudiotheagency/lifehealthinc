import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Home, Shield, Heart, ArrowRight, CheckCircle, Users, Phone, Award } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const mortgageProtectionTypes = [
  { title: 'Mortgage Term Life', description: 'Level term coverage that pays off your mortgage if you pass away', features: ['Fixed death benefit', 'Level premiums', 'Convertible options', 'Portable coverage'], icon: Shield },
  { title: 'Decreasing Term', description: 'Coverage that decreases to match your declining mortgage balance', features: ['Lower premiums', 'Matches mortgage balance', 'Simple underwriting', 'Cost-effective protection'], icon: Home },
  { title: 'Mortgage Protection with Living Benefits', description: 'Coverage that includes benefits for critical illness or disability', features: ['Living benefit riders', 'Chronic illness coverage', 'Terminal illness acceleration', 'Disability income'], icon: Heart },
  { title: 'Joint Mortgage Protection', description: 'Coverage for both spouses to protect the family home', features: ['Dual coverage', 'Survivorship options', 'Shared premiums', 'Family protection'], icon: Users }
];

const keyBenefits = [
  'Keep your family in their home during difficult times',
  'Protect your home equity investment',
  'Coverage specifically designed for mortgage debt',
  'Options for critical illness and disability',
  'Affordable protection for your largest debt',
  "Peace of mind for your family's security"
];

const faqs = [
  { question: 'How is mortgage protection different from regular life insurance?', answer: 'Mortgage protection is specifically designed to cover your home loan. The coverage amount can be structured to match your mortgage balance, and it often comes with simplified underwriting, making it easier and more affordable than traditional life insurance for this specific purpose.' },
  { question: 'What happens if I refinance or move?', answer: 'Most mortgage protection policies are portable, meaning you can keep the coverage if you move or refinance. The policy stays with you, not the property. Some policies also allow you to adjust the coverage amount to match your new mortgage.' },
  { question: 'Can I get coverage if I have health issues?', answer: 'Many carriers offer simplified underwriting for mortgage protection, with fewer health questions and sometimes no medical exam required. This makes it easier to qualify compared to traditional life insurance, even with some health conditions.' },
  { question: 'Do I need mortgage protection if I already have life insurance?', answer: "It depends on your coverage amount and family situation. Mortgage protection can be a cost-effective way to ensure your home is specifically protected, especially if your current life insurance isn't sufficient to cover all debts, final expenses, and ongoing living costs." },
  { question: 'What are living benefit riders?', answer: "Living benefit riders allow you to access a portion of your death benefit while you're still alive if you're diagnosed with a qualifying critical illness, chronic illness, or terminal condition. This can help with mortgage payments during recovery or treatment." },
  { question: 'How quickly can I get coverage?', answer: 'With simplified underwriting, many mortgage protection policies can be approved within days or weeks. Some carriers offer same-day approvals for qualifying applicants, making it one of the fastest ways to protect your home.' }
];

function MortgageProtectionPage() {
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
              If You're Gone Tomorrow, <span className="text-blue-300">Will Your Family Lose the House?</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              For most families, the mortgage is the biggest financial obligation they have. Mortgage protection ensures that if something happens to you, your family never has to choose between grieving and making a payment.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Protect Your Home — Get a Free Quote</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP and a licensed broker will find the right plan for your mortgage amount.</p>
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
              <h3 className="font-semibold text-slate-900">Licensed Professionals</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><Home className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-semibold text-slate-900">Home-Specific Coverage</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><Shield className="w-8 h-8 text-purple-600" /></div>
              <h3 className="font-semibold text-slate-900">Quick Approval Available</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">4 Ways to Protect Your Home</h2>
            <p className="text-lg text-slate-600">Different families have different situations. We'll find the right fit for yours.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mortgageProtectionTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#1A3586' }} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{type.title}</h3>
                    <p className="text-slate-600 text-sm mb-4">{type.description}</p>
                    <ul className="space-y-2 text-left">
                      {type.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What You're Actually Protecting</h2>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions About Mortgage Protection</h2>
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
          <h2 className="text-4xl font-bold text-white mb-4">Don't Let a Mortgage Be the Reason Your Family Loses Their Home</h2>
          <p className="text-xl text-slate-200 mb-8">Most policies are approved within days — no medical exam required. Get your free quote now and have peace of mind by the end of the week.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold text-lg px-8" style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}>
              <Link to={createPageUrl('Calculator')}>
                Get My Free Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold border-2" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              <a href="tel:9545430853"><Phone className="w-5 h-5 mr-2" /> Call Now</a>
            </Button>
          </div>
          <p className="text-slate-300 mt-6">✓ No Obligation &nbsp;✓ Licensed Professional Guidance &nbsp;✓ Quick Approval Available</p>
        </div>
      </section>
    </div>
  );
}

export default MortgageProtectionPage;