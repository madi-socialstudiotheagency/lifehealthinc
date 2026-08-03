import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Calendar,
  Phone,
  Mail,
  Clock,
  Shield
} from 'lucide-react';

export default function QuoteCompletePage() {
  const navigate = useNavigate();
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    // Get lead data from URL params or session storage
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('leadId');
    const productType = urlParams.get('productType');
    const firstName = urlParams.get('firstName');

    if (firstName || productType) {
      setLeadData({
        leadId,
        productType: productType || 'insurance',
        firstName: firstName || 'there'
      });
    }
  }, []);

  const getProductName = (type) => {
    const productMap = {
      'life_insurance': 'Life Insurance (IUL)',
      'term_life': 'Term Life Insurance',
      'mortgage_protection': 'Mortgage Protection',
      'health_insurance': 'Health Insurance',
      'medicare': 'Medicare',
      'annuities': 'Annuities',
      'dental': 'Dental Insurance',
      'vision': 'Vision Insurance'
    };
    return productMap[type] || 'Insurance Coverage';
  };

  const handleScheduleCall = () => {
    if (leadData?.leadId) {
      navigate(createPageUrl("Book") + `?leadId=${leadData.leadId}`);
    } else {
      navigate(createPageUrl("Book"));
    }
  };

  return (
    <>
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
        .completion-container {
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

      <div
        className="min-h-screen flex items-center justify-center py-12 px-4"
        style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}
      >
        <div className="completion-container w-full max-w-3xl">
          <Card className="bg-white/10 border-white/20 text-white shadow-2xl">
            <CardHeader className="text-center pb-6">
              {/* Success Icon */}
              <div
                className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center success-icon relative"
                style={{ backgroundColor: '#10B981' }}
              >
                <CheckCircle className="w-16 h-16 text-white" />
                <svg className="absolute w-16 h-16" viewBox="0 0 24 24" fill="none">
                  <path
                    className="checkmark-svg"
                    d="M7.5 12l3 3 7-7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <CardTitle className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
                Quote Request Received!
              </CardTitle>

              <p className="text-xl text-slate-300 mb-2">
                Thank you{leadData?.firstName ? `, ${leadData.firstName}` : ''}!
              </p>
              
              {leadData?.productType && (
                <p className="text-lg text-slate-400">
                  Your {getProductName(leadData.productType)} request is being processed
                </p>
              )}
            </CardHeader>

            <CardContent className="space-y-8">
              {/* What Happens Next */}
              <div className="fade-in fade-in-delay-1">
                <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: '#FFFFFF' }}>
                  What Happens Next:
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-white">
                        We Review Your Information
                      </h4>
                      <p className="text-slate-300 text-sm">
                        A licensed broker will review your request and prepare personalized quotes from top-rated carriers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-white">
                        We'll Contact You Soon
                      </h4>
                      <p className="text-slate-300 text-sm">
                        Expect a call or email within 2-4 business hours to discuss your personalized options
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}>
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1 text-white">
                        Get Your Custom Quotes
                      </h4>
                      <p className="text-slate-300 text-sm">
                        We'll present accurate quotes from multiple carriers and help you choose the best coverage
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Priority CTA Section */}
              <div className="fade-in fade-in-delay-2 p-6 rounded-lg border-2" style={{ borderColor: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.08)' }}>
                <h3 className="text-xl font-semibold mb-3 text-center text-white">
                  Want to Speak with a Broker Right Now?
                </h3>
                <p className="text-center text-slate-300 mb-6">
                  Don't wait! Schedule your free consultation now and get your quotes faster
                </p>
                
                <div className="space-y-3">
                  <Button
                    onClick={handleScheduleCall}
                    size="lg"
                    className="w-full font-bold text-lg"
                    style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule My Call Now
                  </Button>

                  <p className="text-xs text-center text-slate-400">
                    Or we'll contact you within 2-4 hours
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="fade-in fade-in-delay-3 pt-6 border-t border-white/20">
                <p className="text-sm text-slate-400 mb-4 text-center">
                  Need immediate assistance? Contact us directly:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                  <a
                    href="tel:9545430853"
                    className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (954) 543-0853
                  </a>
                  <span className="hidden sm:inline text-slate-500">•</span>
                  <a
                    href="mailto:info@lifehealthinc.org"
                    className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    info@lifehealthinc.org
                  </a>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="text-center pt-4">
                <div className="flex justify-center items-center gap-6 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>100% Free Service</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>Licensed in 50 States</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>No Obligation</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}