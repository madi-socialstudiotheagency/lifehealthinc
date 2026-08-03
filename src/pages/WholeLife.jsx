import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle2, ArrowRight, Shield, TrendingUp, DollarSign, Users, Clock, Award } from 'lucide-react';
import WholeLifeCashValueEstimator from '../components/WholeLifeCashValueEstimator';

export default function WholeLifePage() {
  const [zipCode, setZipCode] = useState('');

  const handleGetStarted = () => {
    window.location.href = `${createPageUrl("Calculator")}?zip=${zipCode}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden" style={{
        background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)'
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Life Insurance That <span className="text-blue-300">Pays You Back While You're Alive</span>
            </h1>
            <p className="text-xl text-slate-200 mb-8">
              Whole life insurance is the only policy that covers you forever AND builds a tax-free savings account you can borrow against — for retirement, emergencies, or anything else.
            </p>

            {/* ZIP Code Form */}
            <Card className="bg-white/95 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-slate-900">
                  See Your Rate — Takes 60 Seconds
                </h3>
                <p className="text-slate-600 mb-4">
                  Enter your ZIP and a licensed broker will show you exactly what coverage looks like at your age. No pressure, no obligation.
                </p>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="flex-1"
                    maxLength={5}
                  />
                  <Button
                    onClick={handleGetStarted}
                    size="lg"
                    className="font-semibold"
                    style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}
                  >
                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4 text-center">
                  Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#1A3586' }}>
                    (954) 543-0853
                  </a> for a quote
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
              <h3 className="font-semibold text-slate-900">Licensed Professionals</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Policyholder-Focused</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900">Secure Financial Strength</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Protection That Lasts. Value That Grows. No Expiration Date.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                What Makes Whole Life Different?
              </h3>
              <p className="text-slate-700 mb-4">
                Unlike term insurance that expires and leaves your family unprotected, whole life insurance never goes away — as long as you pay the premium, you're covered for life. And every dollar you put in builds guaranteed cash value you can actually use.
              </p>
              <p className="text-slate-700">
                Think of it as a permanent safety net that doubles as a private savings account — growing at 3-4% guaranteed, tax-deferred, year after year.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Whole Life might be exactly what you need if:
              </h3>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  You want coverage that can <strong>never be taken away</strong> — a death benefit your family can always count on, no matter when you pass.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  You want a <strong>savings account built inside your policy</strong> — one that grows 3-4% guaranteed, that you can borrow against tax-free for retirement or emergencies.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-slate-700">
                  You want to <strong>pass wealth to your heirs tax-free</strong> — the death benefit passes outside of probate, directly to your beneficiaries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Whole Life Insurance */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Choose How You Pay — Coverage Is Always the Same
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Every whole life policy gives you lifetime protection and guaranteed cash value. The only difference is how and when you pay for it. We'll help you find the structure that fits your budget and goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Level Payment
                </h3>
                <p className="text-slate-600">
                  Premiums remain unchanged throughout the duration of the policy. This is the most common type of payment plan.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Single Premium
                </h3>
                <p className="text-slate-600">
                  Ideal for those who prefer a one-time payment, this option fully funds your policy for life with immediate cash value growth.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Limited Payment
                </h3>
                <p className="text-slate-600">
                  Pay premiums for a set number of years. While premiums are higher, the payment period is shorter, with guaranteed 3-4% cash value growth.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Modified Whole Life
                </h3>
                <p className="text-slate-600">
                  Starting with lower premiums that increase in later years, this option initially eases the financial burden while building cash value.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features with Cash Value Illustration */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1554224311-beee4ece8db2?w=800"
                alt="Family Financial Planning"
                className="rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Key Features of Whole Life Insurance
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Simplified underwriting, typically <strong>no medical exam</strong>
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Cash value builds over time at <strong>3-4% guaranteed annual growth</strong> and premiums are fixed
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    <strong>Children's whole life</strong> available: Issue age as early as 14 days
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Policy is <strong>guaranteed to age 100</strong> as long as premium is paid
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-slate-700">
                    Tax-advantaged cash value growth that you can borrow against
                  </p>
                </div>
              </div>

              {/* Cash Value Growth Illustration */}
              <Card className="mt-6 border-2" style={{ borderColor: '#1A3586' }}>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    Sample Cash Value Growth (3-4% annually)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Year 10:</span>
                      <span className="font-semibold text-slate-900">$15,000 - $18,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Year 20:</span>
                      <span className="font-semibold text-slate-900">$35,000 - $45,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Year 30:</span>
                      <span className="font-semibold text-slate-900">$65,000 - $85,000</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-4">
                    *Illustration based on a $50,000 policy with level premiums. Actual values may vary based on policy type and carrier.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why LifeHealthInc?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Personalized Guidance
              </h3>
              <p className="text-slate-600">
                Our team of professionals is dedicated to helping you navigate your options, offering the guidance you need for an informed decision.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Comprehensive Coverage
              </h3>
              <p className="text-slate-600">
                Designed to provide enduring protection for your family, our policies cover end-of-life expenses and offer emergency cash value access.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Simplified Process
              </h3>
              <p className="text-slate-600">
                We make exploring options and applying for a plan easy, with an expert team always ready to assist.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                A Trusted Partner
              </h3>
              <p className="text-slate-600">
                With licensed professionals and a commitment to your financial security, LifeHealthInc is a name you can trust.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cash Value Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Interactive Cash Value Calculator
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              See how your whole life insurance policy can build cash value over time with guaranteed 3-4% growth rates
            </p>
          </div>
          
          <WholeLifeCashValueEstimator />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How much life insurance do I need?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Your life insurance policy depends on factors such as your family circumstances, your financial health, and your age. As a basic rule of thumb, if your loved ones are more financially dependent on you, you will need more coverage. Complete your quote request or call to speak to an agent for help determining your needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How does cash value growth work?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                Whole life insurance policies build cash value over time at a guaranteed rate of 3-4% annually. This cash value grows tax-deferred and can be accessed through policy loans or withdrawals. The longer you hold the policy, the more substantial your cash value becomes, providing a financial resource for emergencies or retirement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How affordable is whole life insurance?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                When choosing life insurance, take into account factors such as short-term and long-term cost, coverage, and cash value. While whole life premiums are higher than term life, they remain level for life and build guaranteed cash value. A LifeHealthInc agent can work with you to determine a policy that will both meet your family's coverage needs and be affordable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                How do I apply for life insurance?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                You can get started by entering your zip code above or calling us directly. Our agents are standing by to discuss and build a policy tailored to your unique situation. You can request a quote online or speak to an agent to start on your life insurance journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white border rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                Is a medical exam required?
              </AccordionTrigger>
              <AccordionContent className="text-slate-600">
                We offer both traditional life insurance products requiring a medical exam as well as simplified underwriting products that offer the convenience of no medical exam. The simplified products are ideal for those seeking quick approval and coverage.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20" style={{
        background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Lock In Your Rate Before Your Next Birthday
          </h2>
          <p className="text-xl text-slate-200 mb-8">
            Whole life premiums are based on your age and health at the time you apply. The longer you wait, the more it costs — and a health change can price you out entirely. Get your free quote today.
          </p>
          <Button
            asChild
            size="lg"
            className="font-bold text-lg px-8"
            style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}
          >
            <Link to={createPageUrl("Calculator")}>
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <p className="text-slate-300 mt-6">
            Or call <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#FFFFFF' }}>
              (954) 543-0853
            </a> to speak with a licensed agent
          </p>
        </div>
      </section>
    </div>
  );
}