import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, CheckCircle, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ArticleRetirementIncomePlanningPage() {
  const benefits = [
    'Tax-deferred growth on cash value',
    'Access funds during retirement without penalties',
    'Maintain death benefit for legacy planning',
    'Flexibility in withdrawals and loans',
    'Protection against market volatility'
  ];

  const strategies = [
    { title: 'Whole Life Policies', desc: 'Guaranteed cash value growth and stable premiums for predictable retirement income.' },
    { title: 'Universal Life (UL)', desc: 'Flexible premiums and death benefits with adjustable cash value accumulation.' },
    { title: 'Indexed Universal Life (IUL)', desc: 'Market-indexed growth with downside protection, balancing safety and growth potential.' },
    { title: 'Variable Universal Life (VUL)', desc: 'Subaccount investment options for those comfortable with market exposure.' }
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
              <span>December 5, 2024</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>6 min read</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--brand-primary)'}}>
            Using Life Insurance for Retirement Income Planning
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Explore how permanent life insurance can play a role in your retirement strategy, including cash value accumulation and tax advantages.
          </p>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none space-y-8">
          {/* Introduction Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Why Life Insurance for Retirement?</h2>
            <p className="text-slate-700 leading-relaxed">
              Many people overlook permanent life insurance as a retirement income strategy. While traditionally viewed as death benefit protection, modern permanent life insurance policies like Whole Life, Universal Life, and Indexed Universal Life can accumulate substantial cash values that serve as a supplemental retirement income source.
            </p>
            <p className="text-slate-700 leading-relaxed">
              These policies offer unique advantages: tax-deferred growth, tax-free loans against cash value, and the ability to maintain death benefit protection while accessing your funds. This combination makes them particularly attractive for high-income earners seeking alternative retirement strategies.
            </p>
          </section>

          {/* Key Benefits */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Key Benefits of Life Insurance in Retirement</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{color: '#1A3586'}} />
                  <span className="text-slate-700">{benefit}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Types of Policies */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Types of Permanent Life Insurance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border border-slate-200 hover:shadow-lg transition-shadow">
                  <h3 className="font-semibold mb-2 text-slate-900">{strategy.title}</h3>
                  <p className="text-slate-600 text-sm">{strategy.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Cash Value How It Works */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>How Cash Value Grows</h2>
            <div className="bg-slate-50 p-6 rounded-lg border-l-4" style={{borderColor: '#1A3586'}}>
              <p className="text-slate-700 mb-4">
                In permanent life insurance policies, cash value accumulates on a tax-deferred basis. A portion of your premium goes toward:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li><strong>Death Benefit:</strong> The guaranteed protection for your beneficiaries</li>
                <li><strong>Policy Costs:</strong> Administrative and underwriting expenses</li>
                <li><strong>Cash Value:</strong> The remaining amount that grows annually</li>
              </ul>
              <p className="text-slate-700 mt-4">
                You can borrow against this cash value tax-free during retirement, or in some cases, take withdrawals. This provides flexible access to funds without triggering taxable events.
              </p>
            </div>
          </section>

          {/* Tax Advantages */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Tax Advantages in Retirement</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">Tax-Deferred Growth</h3>
                <p className="text-slate-700 text-sm">Cash value grows without annual tax reporting, allowing compounding to work more effectively over decades.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">Tax-Free Loans</h3>
                <p className="text-slate-700 text-sm">Borrow against cash value without triggering capital gains tax. Loans don't count as income and don't affect Social Security or Medicare calculations.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-slate-900 mb-2">Legacy Wealth Transfer</h3>
                <p className="text-slate-700 text-sm">Death benefits pass tax-free to beneficiaries, potentially providing significant wealth transfer compared to taxable investment accounts.</p>
              </div>
            </div>
          </section>

          {/* Real Example */}
          <section>
            <h2 className="text-2xl font-bold mb-4" style={{color: '#081730'}}>Example Strategy</h2>
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-4">
                <strong>Scenario:</strong> A 45-year-old professional with $200,000 annual income wants to fund a retirement income strategy.
              </p>
              <ul className="space-y-3 text-slate-700">
                <li><strong>Year 1-20:</strong> Fund a $1M Whole Life policy with $500/month premiums while working</li>
                <li><strong>Age 65:</strong> Cash value reaches $250,000+ (conservative estimate)</li>
                <li><strong>Retirement:</strong> Borrow $10,000 annually tax-free to supplement retirement income</li>
                <li><strong>Legacy:</strong> Upon death, $1M passes tax-free to heirs—original investment + growth protected</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-white p-8 rounded-lg border border-slate-200 text-center">
            <h3 className="text-xl font-bold mb-3" style={{color: '#081730'}}>Ready to Explore This Strategy?</h3>
            <p className="text-slate-600 mb-6">
              Life insurance retirement strategies require careful planning and personalized analysis. Our financial professionals can help you determine if this approach aligns with your retirement goals.
            </p>
            <Button 
              asChild 
              size="lg"
              style={{background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF'}}
            >
              <Link to={createPageUrl("Calculator")}>
                Get Your Free Consultation
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