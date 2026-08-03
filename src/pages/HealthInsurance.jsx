import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Shield, Heart, CheckCircle, ArrowRight, Phone, Award, Users, Eye, Volume2, Plus, Layers } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const healthInsuranceTypes = [
  { icon: Layers, title: 'ACA Marketplace Plans', description: 'Affordable Care Act plans offer comprehensive coverage that includes essential health benefits. Subsidies may be available to help lower your monthly premiums based on your income and family size.', features: ['Subsidies to lower costs', 'Essential Health Benefits', 'No denial for pre-existing conditions', 'Preventive care included'] },
  { icon: Shield, title: 'Private Health Plans', description: 'Private health insurance plans are purchased directly from an insurance company, outside of the government marketplace. These plans can offer more flexibility and a wider network of doctors and hospitals.', features: ['Broader network options', 'Customizable plans', 'Choice of doctors and hospitals', 'Direct purchase flexibility'] },
  { icon: Heart, title: 'Supplemental Insurance', description: 'Enhance your primary health plan with supplemental coverage for dental, vision, critical illness, or accidents, providing an extra layer of financial protection.', features: ['Covers out-of-pocket costs', 'Adds critical illness protection', 'Accident & disability options', 'Financial security'] },
  { icon: Plus, title: 'Dental Insurance', description: 'Dental insurance helps cover the costs of routine check-ups, cleanings, and more extensive procedures like fillings, crowns, and orthodontics.', features: ['Routine cleanings & exams', 'Fillings & extractions', 'Crowns, bridges, dentures', 'Orthodontics for some plans'] },
  { icon: Eye, title: 'Vision Insurance', description: 'Vision insurance plans provide coverage for eye exams, prescription glasses, and contact lenses, ensuring your eye health is well-maintained.', features: ['Annual eye exams', 'Allowance for glasses frames', 'Coverage for prescription lenses', 'Discounts on contacts'] },
  { icon: Volume2, title: 'Hearing Services', description: 'Hearing services plans assist with the cost of hearing tests, hearing aids, and related services, crucial for maintaining your auditory health and quality of life.', features: ['Hearing tests & evaluations', 'Coverage for hearing aids', 'Repair and maintenance services', 'Professional audiologist network'] }
];

const keyBenefits = [
  'Access to preventive care at no cost',
  'Protection from high medical bills',
  'Coverage for pre-existing conditions',
  'Essential health benefits guaranteed',
  'Network of quality healthcare providers',
  'Prescription drug coverage options'
];

const faqs = [
  { question: "What's the difference between HMO and PPO plans?", answer: "HMO plans typically require referrals to see specialists and have lower costs, while PPO plans offer more flexibility to see any doctor but may have higher premiums and deductibles." },
  { question: 'Can I get coverage if I have pre-existing conditions?', answer: 'Yes! ACA marketplace plans cannot deny coverage or charge more due to pre-existing conditions. All essential health benefits must be covered.' },
  { question: 'When can I enroll in health insurance?', answer: 'Open Enrollment is typically November 1 - January 15. You may qualify for Special Enrollment due to life changes like marriage, job loss, or moving.' },
  { question: 'Do dental and vision plans cover everything?', answer: 'Coverage varies by plan. Most dental plans cover preventive care at 100%, basic procedures at 70-80%, and major work at 50%. Vision plans typically cover annual exams and provide allowances for frames and lenses.' }
];

export default function HealthInsurancePage() {
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
              One Surprise Medical Bill <span className="text-blue-300">Could Wipe Out Your Savings</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              The average ER visit costs $2,200 — without insurance. We'll find you a plan that covers medical, dental, vision, and hearing, and we'll do it for free.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Find Your Lowest Rate</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP and a licensed specialist will compare every plan available in your area.</p>
                <div className="flex gap-3">
                  <Input type="text" placeholder="ZIP Code" value={zipCode} onChange={e => setZipCode(e.target.value)} className="flex-1" maxLength={5} />
                  <Button onClick={handleGetStarted} size="lg" className="font-semibold" style={{ backgroundColor: '#1A3586', color: '#FFFFFF' }}>
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#1A3586' }}>(954) 543-0853</a> for a quote
                </p>
                <div className="mt-4 flex justify-center">
                  <a href="https://shop.uhone.com/en/quote/census?brokerid=AA5595037" target="_blank" rel="noopener noreferrer">
                    <img src="https://www.uhone.com/ContentManagement/FileAttachment.ashx?FilePath=/allPlans_btn.jpg" alt="Get a UHOne Quote" className="hover:opacity-90 transition-opacity" />
                  </a>
                </div>
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
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><Users className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-semibold text-slate-900">All Coverage Types</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><Shield className="w-8 h-8 text-purple-600" /></div>
              <h3 className="font-semibold text-slate-900">No-Cost Consultations</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Options */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Full Coverage, Not Just Medical</h2>
            <p className="text-lg text-slate-600">Most people forget about dental, vision, and hearing — until they need it and don't have it.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {healthInsuranceTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#1A3586' }} />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{type.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{type.description}</p>
                    <ul className="space-y-2">
                      {type.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What You're Actually Protecting Yourself From</h2>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions</h2>
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
          <h2 className="text-4xl font-bold text-white mb-4">Stop Gambling With Your Health</h2>
          <p className="text-xl text-slate-200 mb-8">One unexpected diagnosis shouldn't mean choosing between your health and your savings. Let us find a plan that covers you completely — at a price you can actually afford.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold text-lg px-8" style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}>
              <Link to={createPageUrl('Book')}>
                Book Your Consultation <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold border-2" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              <a href="tel:9545430853"><Phone className="w-5 h-5 mr-2" /> Call Now</a>
            </Button>
          </div>
          <p className="text-slate-300 mt-6">Free consultation &nbsp;•&nbsp; Licensed professionals &nbsp;•&nbsp; No obligation</p>
        </div>
      </section>
    </div>
  );
}