import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Calendar,
  Home,
  Phone,
  MessageCircle,
  Mail,
  Heart,
  Shield,
  Users,
  ExternalLink
} from 'lucide-react';

const formTypeConfig = {
  homepage_widget: {
    title: "Thanks for Your Interest!",
    subtitle: "We've received your request for a personalized insurance quote.",
    icon: Shield,
    iconColor: "#10B981",
    nextSteps: [
      "A licensed broker will review your information within 2 hours",
      "We'll prepare personalized quotes from top-rated carriers",
      "You'll receive a call to discuss your options at no cost"
    ],
    primaryCTA: {
      text: "Schedule Your Call Now",
      href: "https://api.leadconnectorhq.com/widget/booking/zAy1c6lp4SLPJspafNxY",
      external: true
    },
    secondaryCTA: {
      text: "Call Us Directly",
      href: "tel:9545430853"
    }
  },
  contactForm: {
    title: "Message Received!",
    subtitle: "Thank you for contacting LifeHealthInc. We'll respond promptly.",
    icon: MessageCircle,
    iconColor: "#3B82F6",
    nextSteps: [
      "A team member will review your message within 4 business hours",
      "We'll respond via your preferred contact method",
      "If urgent, feel free to call us directly"
    ],
    primaryCTA: {
      text: "Call Us Now",
      href: "tel:9545430853"
    },
    secondaryCTA: {
      text: "Back to Home",
      href: "/"
    }
  },
  partnerForm: {
    title: "Partnership Application Submitted!",
    subtitle: "We're excited about the potential to work together.",
    icon: Users,
    iconColor: "#8B5CF6",
    nextSteps: [
      "Our partnership team will review your application within 1 business day",
      "We'll schedule a discovery call to discuss collaboration opportunities",
      "You'll receive partnership materials and commission structures"
    ],
    primaryCTA: {
      text: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/matthew-anderson-797939296/",
      external: true
    },
    secondaryCTA: {
      text: "Learn More About Us",
      href: "/About"
    }
  },
  liveChat: {
    title: "Chat Message Sent!",
    subtitle: "Thanks for reaching out through our live chat.",
    icon: MessageCircle,
    iconColor: "#06B6D4",
    nextSteps: [
      "A licensed professional will respond within 30 minutes during business hours",
      "After hours? We'll get back to you first thing the next business day",
      "For immediate assistance, call us directly"
    ],
    primaryCTA: {
      text: "Call for Immediate Help",
      href: "tel:9545430853"
    },
    secondaryCTA: {
      text: "Browse Our Services",
      href: "/"
    }
  },
  newsletter: {
    title: "Welcome to Our Newsletter!",
    subtitle: "You're now subscribed to weekly financial insights from LifeHealthInc.",
    icon: Mail,
    iconColor: "#F59E0B",
    nextSteps: [
      "Check your email for a confirmation message",
      "You'll receive your first newsletter within a week",
      "Unsubscribe anytime with the link in any email"
    ],
    primaryCTA: {
      text: "Get a Free Quote",
      href: "/"
    },
    secondaryCTA: {
      text: "Follow Us on Social",
      href: "https://www.instagram.com/lifehealthinc",
      external: true
    }
  }
};

// Default fallback config
const defaultConfig = {
  title: "Thank You!",
  subtitle: "We've received your submission and will be in touch soon.",
  icon: CheckCircle,
  iconColor: "#10B981",
  nextSteps: [
    "A licensed professional will contact you shortly",
    "We'll provide personalized recommendations at no cost",
    "Feel free to call us if you have immediate questions"
  ],
  primaryCTA: {
    text: "Book a Call",
    href: "https://api.leadconnectorhq.com/widget/booking/zAy1c6lp4SLPJspafNxY",
    external: true
  },
  secondaryCTA: {
    text: "Call Us Now",
    href: "tel:9545430853"
  }
};

export default function ThankYouPage() {
  const [config, setConfig] = useState(defaultConfig);
  const [animationPhase, setAnimationPhase] = useState('initial');

  useEffect(() => {
    // Analytics tracking on page load
    try {
      if (typeof window !== 'undefined') {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead');
        }
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead');
        }
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }

    // Determine form type from URL params or referrer
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('type') || urlParams.get('formType');
    const referrer = document.referrer;

    // Determine config based on form type or referrer path
    let selectedConfig = defaultConfig;

    if (formType && formTypeConfig[formType]) {
      selectedConfig = formTypeConfig[formType];
    } else if (referrer) {
      // Fallback: detect from referrer URL
      if (referrer.includes('/Contact')) {
        selectedConfig = formTypeConfig.contactForm;
      } else if (referrer.includes('/PartnerForm') || referrer.includes('/Partners')) {
        selectedConfig = formTypeConfig.partnerForm;
      }
    }

    setConfig(selectedConfig);

    // Animation sequence
    setTimeout(() => setAnimationPhase('fadeIn'), 100);
    setTimeout(() => setAnimationPhase('complete'), 800);

  }, []);

  const IconComponent = config.icon;

  return (
    <>
      <title>Thank You!</title>
      <style>{`
        @keyframes checkmark-draw {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        }
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .thank-you-container {
          animation: slide-up 0.6s ease-out;
        }
        .success-icon {
          animation: pulse-glow 2s infinite;
        }
        .checkmark-svg {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: checkmark-draw 0.8s ease-out 0.3s forwards;
        }
        .fade-in {
          opacity: 0;
          animation: slide-up 0.5s ease-out forwards;
        }
        .fade-in-delay-1 { animation-delay: 0.2s; }
        .fade-in-delay-2 { animation-delay: 0.4s; }
        .fade-in-delay-3 { animation-delay: 0.6s; }
      `}</style>

      <meta name="robots" content="noindex, nofollow" />
      <div
        className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
        style={{ background: 'linear-gradient(to bottom, #081730 0%, #1A3586 100%)' }}
      >
        <div className="thank-you-container w-full max-w-2xl">
          <Card className="bg-white/10 border-white/20 text-white shadow-2xl overflow-hidden">
            <CardHeader className="text-center pb-4">
              {/* Animated Success Icon */}
              <div
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center success-icon"
                style={{ backgroundColor: config.iconColor }}
              >
                <IconComponent className="w-12 h-12 text-white" />
                {config.icon === CheckCircle && (
                  <svg className="absolute w-12 h-12" viewBox="0 0 24 24" fill="none">
                    <path
                      className="checkmark-svg"
                      d="M7.5 12l3 3 7-7"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <CardTitle className="text-3xl sm:text-4xl font-bold mb-4 text-white">
                {config.title}
              </CardTitle>

              <p className="text-lg sm:text-xl text-slate-300 mb-8 fade-in fade-in-delay-1">
                {config.subtitle}
              </p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* What Happens Next Section */}
              <div className="fade-in fade-in-delay-2">
                <h3 className="text-xl font-semibold mb-4 text-center text-white">
                  What Happens Next:
                </h3>
                <ul className="space-y-3">
                  {config.nextSteps.map((step, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-400" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 fade-in fade-in-delay-3">
                {/* Primary CTA */}
                <Button
                  asChild
                  size="lg"
                  className="w-full font-bold text-lg transform hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
                >
                  {config.primaryCTA.external ? (
                    <a
                      href={config.primaryCTA.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {config.primaryCTA.href.includes('calendly') && <Calendar className="w-5 h-5 mr-2" />}
                      {config.primaryCTA.href.includes('tel:') && <Phone className="w-5 h-5 mr-2" />}
                      {config.primaryCTA.href.includes('linkedin') && <ExternalLink className="w-5 h-5 mr-2" />}
                      {!config.primaryCTA.href.includes('calendly') && !config.primaryCTA.href.includes('tel:') && !config.primaryCTA.href.includes('linkedin') && <ExternalLink className="w-5 h-5 mr-2" />}
                      {config.primaryCTA.text}
                    </a>
                  ) : (
                    <Link to={config.primaryCTA.href}>
                      <Heart className="w-5 h-5 mr-2" />
                      {config.primaryCTA.text}
                    </Link>
                  )}
                </Button>

                {/* Secondary CTA */}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full font-semibold border-2 bg-transparent hover:bg-white/10 transition-all duration-300"
                  style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
                >
                  {config.secondaryCTA.href.startsWith('http') || config.secondaryCTA.href.startsWith('tel:') ? (
                    <a
                      href={config.secondaryCTA.href}
                      target={config.secondaryCTA.href.startsWith('http') ? "_blank" : undefined}
                      rel={config.secondaryCTA.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {config.secondaryCTA.href.includes('tel:') ? <Phone className="w-5 h-5 mr-2" /> : <Home className="w-5 h-5 mr-2" />}
                      {config.secondaryCTA.text}
                    </a>
                  ) : (
                    <Link to={config.secondaryCTA.href}>
                      <Home className="w-5 h-5 mr-2" />
                      {config.secondaryCTA.text}
                    </Link>
                  )}
                </Button>
              </div>

              {/* Contact Information */}
              <div className="text-center pt-6 border-t border-white/20 fade-in fade-in-delay-3">
                <p className="text-sm text-slate-400 mb-4">
                  Need immediate assistance? We're here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <a
                    href="tel:9545430853"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                    style={{ color: '#60A5FA' }}
                  >
                    <Phone className="w-4 h-4" />
                    (954) 543-0853
                  </a>
                  <span className="hidden sm:inline text-slate-500">•</span>
                  <a
                    href="mailto:info@lifehealthinc.org"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                    style={{ color: '#60A5FA' }}
                  >
                    <Mail className="w-4 h-4" />
                    info@lifehealthinc.org
                  </a>
                </div>
              </div>

              {/* Small Confirmation Line */}
              <div className="text-center">
                <p className="text-xs text-slate-500">
                  Your information is secure and will never be shared. Licensed professionals only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}