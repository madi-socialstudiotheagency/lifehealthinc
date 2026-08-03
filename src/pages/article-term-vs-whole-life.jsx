import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArticleTermVsWholeLifePage() {
  const termBenefits = [
    'Lowest initial cost for maximum coverage',
    'Perfect for temporary protection needs',
    'Simple, straightforward policies',
    'Excellent for young families',
    'No cash value complications'
  ];

  const wholeBenefits = [
    'Lifetime coverage (never expires)',
    'Guaranteed death benefit',
    'Cash value accumulation for retirement',
    'Tax-deferred growth',
    'Loan and withdrawal flexibility',
    'Estate planning tool'
  ];

  const comparisonData = [
    { aspect: 'Coverage Duration', term: '10-30 years', whole: 'Lifetime' },
    { aspect: 'Monthly Cost', term: '$30-$80 (age 35, $500K)', whole: '$300-$600 (age 35, $500K)' },
    { aspect: 'Death Benefit Guaranteed', term: 'If in force', whole: 'Yes, always' },
    { aspect: 'Cash Value', term: 'None', whole: 'Yes, grows tax-deferred' },
    { aspect: 'Renewability', term: 'Limited', whole: 'Guaranteed' },
    { aspect: 'Best For', term: 'Temporary needs', whole: 'Permanent protection' }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#f8f7f4' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link to={createPageUrl("Resources")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>December 15, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>5 min read</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--brand-primary)'}}>
            Term vs. Whole Life Insurance: Which Is Right for You?
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Understanding the key differences between term and whole life insurance can help you make the best decision for your family's financial security.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>The Great Life Insurance Question</h2>
            <p className="text-slate-700 leading-relaxed">
              When it comes to protecting your family's financial future, life insurance is a critical tool. But which type is right for you? The choice between term and whole life insurance is one of the most common questions we hear from clients.
            </p>
            <p className="text-slate-700 leading-relaxed">
              The truth is: there's no one-size-fits-all answer. Your best choice depends on your age, financial goals, timeline, and risk tolerance. Let's break down both options so you can make an informed decision.
            </p>
          </section>

          {/* Term Life Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Term Life Insurance Explained</h2>
            <p className="text-slate-700 leading-relaxed">
              Term life insurance is the simplest and most affordable type of life insurance. You choose a "term"—typically 10, 15, 20, or 30 years—and pay a fixed monthly premium. If you pass away during that term, your beneficiaries receive the full death benefit. When the term expires, coverage ends.
            </p>
            <div className="mt-4 p-4 bg-blue-50 border-l-4" style={{borderColor: '#1A3586'}}>
              <p className="text-slate-700"><strong>Key Takeaway:</strong> Term life is pure protection—you're paying for death benefit only, with no cash value component.</p>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {termBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#1A3586'}} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Whole Life Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Whole Life Insurance Explained</h2>
            <p className="text-slate-700 leading-relaxed">
              Whole life insurance is permanent protection that lasts your entire lifetime, no matter how long you live. Beyond the death benefit, whole life policies accumulate cash value—a savings component that grows tax-deferred.
            </p>
            <p className="text-slate-700 leading-relaxed">
              With whole life, your premium remains fixed for life. A portion of each premium builds cash value that you can borrow against or withdraw from. This makes whole life a powerful tool for both protection and retirement planning.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {wholeBenefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#1A3586'}} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Side-by-Side Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr style={{background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)', color: 'white'}}>
                    <th className="p-4 text-left font-semibold">Feature</th>
                    <th className="p-4 text-left font-semibold">Term Life</th>
                    <th className="p-4 text-left font-semibold">Whole Life</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="p-4 font-semibold text-slate-900 border border-slate-200">{row.aspect}</td>
                      <td className="p-4 text-slate-700 border border-slate-200">{row.term}</td>
                      <td className="p-4 text-slate-700 border border-slate-200">{row.whole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Cost Comparison */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Understanding the Cost Difference</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              The biggest difference between term and whole life is price. A 35-year-old in excellent health might pay:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-6 rounded-lg border-2" style={{borderColor: '#1A3586'}}>
                <DollarSign className="w-8 h-8 mb-3" style={{color: '#1A3586'}} />
                <h3 className="font-bold text-slate-900 mb-2">$500K Term (30-year)</h3>
                <p className="text-2xl font-bold" style={{color: '#1A3586'}}>$35-50/month</p>
              </div>
              <div className="bg-white p-6 rounded-lg border-2" style={{borderColor: '#1A3586'}}>
                <TrendingUp className="w-8 h-8 mb-3" style={{color: '#1A3586'}} />
                <h3 className="font-bold text-slate-900 mb-2">$500K Whole Life</h3>
                <p className="text-2xl font-bold" style={{color: '#1A3586'}}>$350-450/month</p>
              </div>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Why the difference? With term, you're paying only for death benefit. With whole life, you're building an asset—the cash value component requires higher premiums but provides flexibility and long-term value.
            </p>
          </section>

          {/* Life Stages */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Which Type Fits Your Life Stage?</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Young Families (Age 25-40)</h3>
                <p className="text-slate-700">
                  <strong>Often best:</strong> Term Life. Young families need maximum coverage at minimum cost. A 20 or 30-year term will cover you through your highest-risk years while you build wealth.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Mid-Career Professionals (Age 40-55)</h3>
                <p className="text-slate-700">
                  <strong>Often best:</strong> Combination approach. Maintain term coverage for income replacement while adding whole life for retirement income and estate planning.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-2">Pre-Retirees & Retirees (Age 55+)</h3>
                <p className="text-slate-700">
                  <strong>Often best:</strong> Whole Life or Universal Life. Focus shifts to permanent protection, legacy planning, and creating tax-advantaged income sources.
                </p>
              </div>
            </div>
          </section>

          {/* Real Scenarios */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Real-World Scenarios</h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">Sarah, Age 32, New Parent</h3>
                <p className="text-slate-700 mb-2">
                  Sarah buys $1M of 30-year term life for $45/month. If she passes away, her family is protected until age 62. By then, her kids are independent and she'll have built wealth. This is the perfect fit.
                </p>
              </div>
              <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg">
                <h3 className="font-bold text-slate-900 mb-2">Michael, Age 48, High Income</h3>
                <p className="text-slate-700 mb-2">
                  Michael carries $500K of term for income replacement plus $250K of whole life. The whole life builds tax-free cash value for retirement access and leaves a legacy. Perfect dual strategy.
                </p>
              </div>
            </div>
          </section>

          {/* The Bottom Line */}
          <section className="bg-white p-8 rounded-lg border-l-4" style={{borderColor: '#1A3586'}}>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>The Bottom Line</h2>
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Choose Term Life if:</strong> You need affordable protection for a specific period, you're young and building wealth, or you prefer simplicity.
            </p>
            <p className="text-slate-700 leading-relaxed">
              <strong>Choose Whole Life if:</strong> You need permanent protection, want to accumulate tax-deferred cash value, plan to leave a legacy, or are in a high tax bracket.
            </p>
            <p className="text-slate-700 leading-relaxed mt-4">
              The best approach for many clients is a combination of both—term for broad income protection and whole life for long-term planning flexibility.
            </p>
          </section>

          {/* CTA */}
          <section className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <h3 className="text-xl font-bold mb-3" style={{color: '#081730'}}>Ready to Get Covered?</h3>
            <p className="text-slate-600 mb-6">
              Our licensed insurance professionals can help you compare quotes, understand your options, and design a strategy that fits your family's unique needs.
            </p>
            <Button 
              asChild 
              size="lg"
              style={{background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF'}}
            >
              <Link to={createPageUrl("Calculator")}>
                Get Your Free Comparison
              </Link>
            </Button>
          </section>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="mt-16" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-white">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-3">Already a Client?</h2>
            <p className="text-slate-200 mb-6 max-w-2xl mx-auto">
              Access your policy, update beneficiaries, or manage your coverage through your carrier's portal.
            </p>
            <Button 
              asChild 
              size="lg"
              style={{backgroundColor: '#FFFFFF', color: '#1A3586'}}
              className="font-bold"
            >
              <Link to={createPageUrl("Clients")}>
                Access My Carrier Portal
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}