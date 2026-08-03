import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { DollarSign, Shield, Heart, TrendingUp, CheckCircle, ArrowRight, Phone, Award, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const finalExpenseTypes = [
  { title: 'Simplified Issue', description: 'The most affordable option — just a few health questions, no exam. Approved in days. Your premiums are locked in for life the moment you sign.', features: ['Approved in days — no medical exam', 'Premiums locked in forever — never go up', 'Builds cash value you can borrow against', 'Full death benefit from day one'], icon: Shield },
  { title: 'Guaranteed Issue', description: 'Can\'t be turned down. Period. If you\'ve been declined elsewhere due to health — this is your answer. No questions, no exam, no rejection.', features: ['100% guaranteed acceptance', 'No medical exam, no health questions', 'Graded benefit the first 2 years', 'Ensures funeral costs won\'t fall on family'], icon: Heart },
  { title: 'Graded Benefit Plans', description: 'A middle-ground option with lower premiums than Guaranteed Issue and easier qualification than Simplified. Full accidental death coverage from day one.', features: ['Easier health qualifications', 'Lower premiums than guaranteed issue', 'Full accidental death from day one', 'Permanent lifelong protection'], icon: TrendingUp }
];

const keyBenefits = [
  'Cover funeral, burial, and final medical bills',
  'Premiums that are designed to never increase',
  'Benefits that are designed to never decrease',
  'No medical exam required for most plans',
  'Leave a small cash legacy for loved ones',
  'Protect your family from unexpected debt'
];

const faqs = [
  { question: 'What is the average cost of a funeral?', answer: "The National Funeral Directors Association reports the median cost of a funeral with viewing and burial is over $8,000, and a funeral with cremation is nearly $7,000. These costs often don't include cemetery plots, headstones, or other final expenses." },
  { question: 'Can I qualify if I have health problems?', answer: 'Yes. Final expense insurance is specifically designed for seniors, and many plans are available for individuals with common health conditions. Guaranteed issue policies have no health questions at all.' },
  { question: 'Will my premium or benefits change over time?', answer: 'No. Most final expense policies are a type of whole life insurance, meaning your monthly premium is locked in for life, and your death benefit is guaranteed not to decrease as long as premiums are paid.' },
  { question: "What's the difference between final expense and term life insurance?", answer: "Final expense insurance is permanent whole life coverage with a smaller death benefit (typically $2,000 - $50,000) designed to cover end-of-life costs. Term life insurance provides a larger death benefit for a specific period and is designed to replace income during your working years." }
];

export default function FinalExpensePage() {
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
              The Average Funeral Costs <span className="text-blue-300">$8,000+. Who Pays If You Can't?</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Without a final expense policy, that bill falls directly on your family — during the worst week of their lives. For as little as $40/month, you can make sure they never have to worry about it.
            </p>
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">Get Your Rate — No Medical Exam Required</h3>
                <p className="text-slate-600 mb-4">Enter your ZIP to see plans available to you. Most people qualify regardless of health history.</p>
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
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3"><Users className="w-8 h-8 text-green-600" /></div>
              <h3 className="font-semibold text-slate-900">No Medical Exam Options</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3"><Shield className="w-8 h-8 text-purple-600" /></div>
              <h3 className="font-semibold text-slate-900">Fixed Premiums For Life</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Everyone Qualifies — Here's How</h2>
            <p className="text-lg text-slate-600">No matter your age or health history, there's a plan for you. We'll find it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {finalExpenseTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(26,53,134,0.12)' }}>
                      <Icon className="w-8 h-8" style={{ color: '#1A3586' }} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{type.title}</h3>
                    <p className="text-slate-600 mb-4">{type.description}</p>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">What This Policy Does for the People You Love</h2>
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
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Common Questions About Final Expense</h2>
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
          <h2 className="text-4xl font-bold text-white mb-4">Give Your Family One Less Thing to Worry About</h2>
          <p className="text-xl text-slate-200 mb-8">A final expense policy is one of the most loving things you can do for the people you leave behind. Get your free quote today — no medical exam, no pressure.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold text-lg px-8" style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}>
              <Link to={createPageUrl('Calculator')}>
                Get My Free Quote <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold border-2" style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              <a href="tel:9545430853">
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </a>
            </Button>
          </div>
          <p className="text-slate-300 mt-6">✓ No Medical Exam Options &nbsp;✓ Fixed Premiums &nbsp;✓ Lifelong Coverage</p>
        </div>
      </section>
    </div>
  );
}