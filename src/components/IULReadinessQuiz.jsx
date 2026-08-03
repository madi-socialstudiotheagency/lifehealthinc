import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, ArrowLeft, Target, TrendingUp, DollarSign, Shield, Sparkles, Calendar, RotateCcw } from 'lucide-react';

const questions = [
  {
    id: 'goal',
    icon: Target,
    question: "What's your primary financial goal?",
    subtitle: "Choose the one that resonates most",
    options: [
      { value: 'retirement', label: 'Retirement Income', desc: 'Build a tax-free income stream for retirement', points: 3 },
      { value: 'college', label: 'College Funding', desc: 'Save for children\'s education tax-efficiently', points: 3 },
      { value: 'tax_wealth', label: 'Tax-Free Wealth', desc: 'Grow assets outside of traditional tax accounts', points: 3 },
      { value: 'legacy', label: 'Legacy & Estate', desc: 'Pass wealth to heirs efficiently', points: 2 },
    ]
  },
  {
    id: 'risk',
    icon: TrendingUp,
    question: "How do you feel about market risk?",
    subtitle: "Be honest — there's no wrong answer",
    options: [
      { value: 'avoid', label: 'I hate losing money', desc: 'Protecting what I have is top priority', points: 3 },
      { value: 'moderate', label: 'Some volatility is okay', desc: 'I can handle small dips for better returns', points: 3 },
      { value: 'growth', label: 'I\'m growth-focused', desc: 'I want maximum returns even with swings', points: 1 },
      { value: 'unsure', label: 'I\'m not sure', desc: 'I\'d like to learn more first', points: 2 },
    ]
  },
  {
    id: 'savings',
    icon: DollarSign,
    question: "Where are you with your current savings?",
    subtitle: "This helps us understand your situation",
    options: [
      { value: 'maxed', label: 'Maxed out 401(k) & IRA', desc: 'Looking for additional tax-advantaged options', points: 3 },
      { value: 'contributing', label: 'Contributing but not maxed', desc: 'Have some extra funds to allocate', points: 2 },
      { value: 'starting', label: 'Just getting started', desc: 'Building my financial foundation', points: 2 },
      { value: 'no_plan', label: 'No current retirement plan', desc: 'Want to start something now', points: 3 },
    ]
  },
  {
    id: 'budget',
    icon: DollarSign,
    question: "What monthly budget feels comfortable?",
    subtitle: "IUL policies are highly flexible on premium amounts",
    options: [
      { value: 'low', label: '$100 – $300/mo', desc: 'Starting small and building over time', points: 2 },
      { value: 'mid', label: '$300 – $700/mo', desc: 'Ready to commit to a solid policy', points: 3 },
      { value: 'high', label: '$700 – $1,500/mo', desc: 'Serious about wealth accumulation', points: 3 },
      { value: 'premium', label: '$1,500+/mo', desc: 'Maximum funding for maximum growth', points: 3 },
    ]
  },
  {
    id: 'age',
    icon: Calendar,
    question: "What's your age range?",
    subtitle: "Age affects premiums and growth timelines",
    options: [
      { value: '25_35', label: '25 – 35', desc: 'Early start, maximum compounding time', points: 3 },
      { value: '35_45', label: '35 – 45', desc: 'Prime earning years, strong position', points: 3 },
      { value: '45_55', label: '45 – 55', desc: 'Still time to build meaningful value', points: 2 },
      { value: '55_plus', label: '55+', desc: 'Focused on legacy and protection', points: 2 },
    ]
  }
];

const getResult = (score, answers) => {
  const maxScore = questions.length * 3;
  const pct = score / maxScore;

  if (pct >= 0.8) {
    return {
      level: 'Strong Candidate',
      color: '#22c55e',
      borderColor: 'border-green-500/40',
      bgColor: 'rgba(34,197,94,0.08)',
      emoji: '🏆',
      headline: 'You Look Like a Strong IUL Candidate',
      summary: 'Based on your goals and profile, an IUL policy could be a powerful fit. You have the right combination of savings goals, risk mindset, and budget to make this work.',
      path: 'Request a full carrier illustration so you can see exact numbers for your age, health, and contribution level.',
      cta: 'Get My Carrier Illustration'
    };
  } else if (pct >= 0.6) {
    return {
      level: 'Good Fit',
      color: '#FFFFFF',
      borderColor: 'border-white/40',
      bgColor: 'rgba(255,255,255,0.08)',
      emoji: '⭐',
      headline: 'IUL Could Be a Great Addition to Your Plan',
      summary: 'Your profile shows solid alignment with IUL\'s strengths. A conversation with one of our agents would help clarify whether now is the right time to start.',
      path: 'Book a 20-minute strategy call. We\'ll walk through your numbers and answer every question.',
      cta: 'Book a Free Strategy Call'
    };
  } else {
    return {
      level: 'Learn First',
      color: '#60a5fa',
      borderColor: 'border-blue-500/40',
      bgColor: 'rgba(96,165,250,0.08)',
      emoji: '📚',
      headline: 'Let\'s Build Your Foundation First',
      summary: 'IUL can be part of your future, but let\'s make sure you have the full picture. A quick consultation will help you see where it fits in your overall financial plan.',
      path: 'Start with a no-pressure consultation. Our agents will educate you first — zero sales pitch.',
      cta: 'Schedule a Free Consultation'
    };
  }
};

export default function IULReadinessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[currentStep];
  const isLast = currentStep === questions.length - 1;
  const progress = ((currentStep) / questions.length) * 100;

  const handleSelect = (option) => setSelectedOption(option);

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = { ...answers, [q.id]: selectedOption };
    const newScore = score + selectedOption.points;
    setAnswers(newAnswers);
    setScore(newScore);
    setSelectedOption(null);

    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    const prevQ = questions[currentStep - 1];
    const prevAnswer = answers[prevQ.id];
    setScore(score - (prevAnswer?.points || 0));
    const newAnswers = { ...answers };
    delete newAnswers[prevQ.id];
    setAnswers(newAnswers);
    setCurrentStep(currentStep - 1);
    setSelectedOption(null);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  if (showResult) {
    const result = getResult(score, answers);
    return (
      <ResultView result={result} score={score} maxScore={questions.length * 3} onReset={handleReset} />
    );
  }

  const Icon = q.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3 text-sm">
          <span className="text-slate-400">Question {currentStep + 1} of {questions.length}</span>
          <span className="font-semibold text-white">{Math.round((currentStep / questions.length) * 100)}% complete</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #FFFFFF, #cbd5e1)' }} />
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)' }}>
          <Icon className="w-7 h-7 text-[#1C1B30]" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{q.question}</h3>
        <p className="text-slate-400">{q.subtitle}</p>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {q.options.map((option) => {
          const isSelected = selectedOption?.value === option.value;
          return (
            <button key={option.value} onClick={() => handleSelect(option)}
              className={`text-left rounded-xl p-5 border-2 transition-all duration-200 hover:-translate-y-0.5 ${
                isSelected ? 'border-white scale-[1.02]' : 'border-white/10 hover:border-white/25'
              }`}
              style={{
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05))'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))'
              }}>
              <div className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  isSelected ? 'border-white' : 'border-white/30'
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1 text-white">{option.label}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{option.desc}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Nav */}
      <div className="flex gap-3">
        {currentStep > 0 && (
          <Button onClick={handleBack} variant="ghost"
            className="flex-1 border border-white/15 text-slate-300 hover:bg-white/10 hover:text-white rounded-xl py-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        )}
        <Button onClick={handleNext} disabled={!selectedOption}
          className={`font-bold rounded-xl py-6 transition-all duration-300 ${currentStep > 0 ? 'flex-1' : 'w-full'} ${selectedOption ? 'hover:scale-105' : 'opacity-40 cursor-not-allowed'}`}
          style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
          {isLast ? 'See My Results' : 'Next'} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

function ResultView({ result, score, maxScore, onReset }) {
  const pct = Math.round((score / maxScore) * 100);

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Score ring */}
      <div className="mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
            <circle cx="60" cy="60" r="50" fill="none" stroke={result.color} strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 50}`}
              strokeDashoffset={`${2 * Math.PI * 50 * (1 - pct / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-white">{pct}%</span>
            <span className="text-xs text-slate-400">match</span>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-3"
          style={{ color: result.color, borderColor: result.borderColor.replace('border-', '').replace('/40', ''), background: result.bgColor }}>
          <Sparkles className="w-4 h-4" />
          <span className="font-bold text-sm">{result.level}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {result.emoji} {result.headline}
        </h3>
        <p className="text-slate-400 leading-relaxed max-w-lg mx-auto mb-6">
          {result.summary}
        </p>

        <div className={`rounded-2xl p-5 border mb-8 text-left ${result.borderColor}`} style={{ background: result.bgColor }}>
          <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" style={{ color: result.color }} /> Your Recommended Path
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">{result.path}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild size="lg" className="flex-1 font-bold rounded-xl py-6 hover:scale-105 transition-all duration-300"
          style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
          <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
            {result.cta} <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button onClick={onReset} variant="ghost"
          className="border border-white/15 text-slate-400 hover:bg-white/10 hover:text-white rounded-xl py-6 px-6">
          <RotateCcw className="w-4 h-4 mr-2" /> Retake
        </Button>
      </div>
    </div>
  );
}