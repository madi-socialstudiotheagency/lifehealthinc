
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Lead } from "@/entities/Lead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, AlertTriangle, Shield, Home, Heart, Phone, MessageCircle, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResultsPage() {
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(null); // State to handle quote generation errors

  const estimateQuotes = (leadData) => {
    // Calculate BMI and Risk Multiplier
    const { age, smoker, heightIn, weightLb, mortgagePayment, mortgageBalance, budgetTier } = leadData;
    let bmi = 0;
    if (heightIn > 0 && weightLb > 0) {
      bmi = (weightLb / (heightIn * heightIn)) * 703;
    }
    
    const riskMultiplier = (smoker ? 1.8 : 1.0) * 
                           (bmi > 30 ? 1.15 : 1.0) * 
                           (1 + Math.max(0, age - 30) * 0.03);

    const basePricePerThousand = 0.10;

    // Helper function to calculate monthly estimate
    const calculateEstimate = (faceAmount, termYears) => {
      let termFactor;
      if (termYears === 'permanent') {
        termFactor = 3.0;
      } else {
        termFactor = termYears === 30 ? 1.25 : termYears === 20 ? 1.0 : 0.9;
      }

      const estimate = (faceAmount / 1000) * basePricePerThousand * termFactor * riskMultiplier;
      return Math.max(20, Math.round(estimate));
    };

    const quotes = [];

    // 1. Payment Protection (12 or 18 months)
    const paymentMonths = mortgagePayment > 2000 ? 12 : 18; // Use 12 months for higher payments, 18 for lower
    const paymentFaceAmount = Math.max(50000, (mortgagePayment || 2000) * paymentMonths);
    quotes.push({
      type: "Payment Protection",
      provider: "MortgageGuard Life",
      faceAmount: paymentFaceAmount,
      termLength: `${paymentMonths} months coverage`,
      monthlyPremium: calculateEstimate(paymentFaceAmount, Math.ceil(paymentMonths / 12)),
      description: `Covers ${paymentMonths} months of mortgage payments`,
      icon: Shield
    });

    // 2. Equity Protection (pay off mortgage balance)
    const equityFaceAmount = Math.max(100000, mortgageBalance || 300000);
    quotes.push({
      type: "Equity Protection", 
      provider: "HomeSafe Insurance",
      faceAmount: equityFaceAmount,
      termLength: "20 year term",
      monthlyPremium: calculateEstimate(equityFaceAmount, 20),
      description: "Pays off your entire mortgage balance",
      icon: Home
    });

    // 3. Permanent Coverage
    const budgetMap = {
      "under_200": 150, "200_300": 250, "300_400": 350, "400_500": 450, "500_plus": 600
    };
    const budget = budgetMap[budgetTier] || 300;
    
    const maxAffordableFace = (budget * 1000) / (basePricePerThousand * 3.0 * riskMultiplier);
    const faceOptions = [25000, 50000, 75000, 100000, 150000];
    const permanentFaceAmount = faceOptions.reduce((prev, curr) => 
      (Math.abs(curr - maxAffordableFace) < Math.abs(prev - maxAffordableFace) ? curr : prev)
    );

    quotes.push({
      type: "Permanent Coverage",
      provider: "Legacy Life",
      faceAmount: permanentFaceAmount,
      termLength: "Whole life",
      monthlyPremium: calculateEstimate(permanentFaceAmount, 'permanent'),
      description: "Lifetime coverage with cash value",
      note: "Includes living benefits where available",
      icon: Heart
    });

    return quotes;
  };

  const loadLeadAndGenerateQuotes = useCallback(async (leadId) => {
    try {
      const leads = await Lead.list();
      const currentLead = leads.find(l => l.id === leadId);
      
      if (!currentLead) {
        navigate(createPageUrl("Quote")); // Redirect if lead not found
        return;
      }

      setLead(currentLead);
      
      // Only generate quotes if the product type is life insurance or mortgage protection
      if (currentLead.productType === 'life_insurance' || currentLead.productType === 'mortgage_protection') {
        const generatedQuotes = estimateQuotes(currentLead);
        setQuotes(generatedQuotes);
      } else {
        // For other product types (health, medicare, auto, dental, vision), no instant quotes are displayed
        setQuotes([]);
      }

    } catch (error) {
      console.error("Error processing lead or generating quotes:", error);
      // On any error during lead processing or quote generation, set an error message
      setQuoteError("We couldn't generate instant quotes, but a specialist will prepare them for you. Please schedule a call to review your options.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const leadId = urlParams.get('leadId');
    
    if (!leadId) {
      navigate(createPageUrl("Quote"));
      return;
    }

    loadLeadAndGenerateQuotes(leadId);
  }, [loadLeadAndGenerateQuotes, navigate]);

  const handleBookConsultation = () => {
    // All calls to book a consultation now navigate to the "Book" page
    navigate(createPageUrl("Book") + `?leadId=${lead.id}`);
  };

  const handleCallNow = () => {
    // On mobile, this will initiate a phone call. On desktop, it will show the number.
    window.location.href = "tel:9545430853";
  };

  const handleTextNow = () => {
    // Opens SMS app with prefilled message
    const message = encodeURIComponent("Hi, I'd like to get covered now with LifeHealthInc.");
    window.location.href = `sms:9545430853?body=${message}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ background: 'linear-gradient(to bottom, #1C1B30 0%, #2C2B50 100%)', minHeight: '100vh' }}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{color: '#F2C94C'}} />
          <h2 className="text-xl font-semibold mb-2" style={{color: '#F2C94C'}}>Generating Your Personalized Options</h2>
          <p className="text-slate-600" style={{color: '#F4F6FA'}}>This may take a moment...</p>
        </div>
      </div>
    );
  }

  // Conditional rendering for Health, Medicare, Auto Insurance, Dental, and Vision product types
  if (lead && (lead.productType === 'health_insurance' || lead.productType === 'medicare' || lead.productType === 'auto_insurance' || lead.productType === 'dental' || lead.productType === 'vision')) {
    const productName = lead.productType === 'health_insurance' ? 'Health Insurance' 
                       : lead.productType === 'medicare' ? 'Medicare'
                       : lead.productType === 'auto_insurance' ? 'Auto Insurance'
                       : lead.productType === 'dental' ? 'Dental Insurance'
                       : 'Vision Insurance';
    
    return (
      <div className="py-8" style={{ background: 'linear-gradient(to bottom, #1C1B30 0%, #2C2B50 100%)', minHeight: '100vh' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="p-8 bg-white/10 border-white/20">
            <CardHeader>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{backgroundColor: '#F2C94C'}}>
                <CheckCircle className="w-10 h-10" style={{color: '#1C1B30'}} />
              </div>
              <CardTitle className="text-2xl font-bold" style={{color: '#F2C94C'}}>
                Thank You, {lead.firstName}!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6" style={{color: '#F4F6FA'}}>
                Your request for {productName} information has been received. A licensed specialist will contact you shortly to discuss your options.
              </p>
              <p className="mb-8" style={{color: '#F4F6FA'}}>
                To ensure you get help as soon as possible, choose how you'd like to connect:
              </p>
              
              {/* Connect Options */}
              <div className="space-y-4 max-w-md mx-auto">
                <Button 
                  onClick={handleCallNow}
                  size="lg"
                  className="w-full text-lg font-semibold"
                  style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call an Agent Now
                </Button>
                
                <Button 
                  onClick={handleTextNow}
                  size="lg"
                  className="w-full text-lg font-semibold"
                  style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Text an Agent Now
                </Button>
                
                <Button 
                  onClick={handleBookConsultation}
                  size="lg"
                  className="w-full text-lg font-semibold"
                  style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule a Time that Works for Me
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Default rendering for Life Insurance and Mortgage Protection leads
  return (
    <div className="py-8" style={{ background: 'linear-gradient(to bottom, #1C1B30 0%, #2C2B50 100%)', minHeight: '100vh' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CheckCircle className="w-8 h-8" style={{color: '#F2C94C'}} />
            <h1 className="text-3xl font-bold" style={{color: '#F2C94C'}}>
              Your Life Insurance Options
            </h1>
          </div>
          <p className="text-lg" style={{color: '#F4F6FA'}}>
            Hello {lead?.firstName}! Here are your personalized coverage options.
          </p>
        </div>

        {/* Top Disclaimer */}
        <Alert className="mb-8 bg-amber-900/20 border-amber-700">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <AlertDescription className="text-amber-100 font-medium">
            Estimates only • Not an offer of coverage • Subject to underwriting and carrier approval
          </AlertDescription>
        </Alert>
        
        {/* Quote Error Message */}
        {quoteError && (
          <Alert variant="destructive" className="mb-8 bg-red-900/20 border-red-700">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-red-100">{quoteError}</AlertDescription>
          </Alert>
        )}

        {/* Quote Cards - Only display if quotes were successfully generated */}
        {quotes.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {quotes.map((quote, index) => {
              const IconComponent = quote.icon;
              return (
                <Card key={index} className="relative overflow-hidden bg-white/10 border-white/20">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center" style={{backgroundColor: '#F2C94C'}}>
                      <IconComponent className="w-6 h-6" style={{color: '#1C1B30'}} />
                    </div>
                    <CardTitle className="text-xl mb-2" style={{color: '#F2C94C'}}>{quote.type}</CardTitle>
                    <Badge variant="outline" className="text-sm border-white/40 text-white">
                      {quote.provider}
                    </Badge>
                  </CardHeader>
                  
                  <CardContent className="text-center">
                    <div className="mb-6">
                      <div 
                        className="text-3xl font-bold mb-1"
                        style={{color: '#F2C94C'}}
                      >
                        ${quote.monthlyPremium}
                      </div>
                      <div className="text-sm" style={{color: '#F4F6FA'}}>per month estimate</div>
                    </div>

                    <div className="space-y-3 mb-6 text-left">
                      <div className="flex justify-between text-sm">
                        <span style={{color: '#F4F6FA', opacity: 0.8}}>Coverage Amount:</span>
                        <span className="font-medium" style={{color: '#F4F6FA'}}>${quote.faceAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span style={{color: '#F4F6FA', opacity: 0.8}}>Term:</span>
                        <span className="font-medium" style={{color: '#F4F6FA'}}>{quote.termLength}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm" style={{color: '#F4F6FA'}}>{quote.description}</p>
                      {quote.note && (
                        <p className="text-sm mt-2 font-medium" style={{color: '#F2C94C'}}>{quote.note}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Connect Options */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{color: '#F2C94C'}}>Ready to Get Covered?</h2>
          <p className="text-lg mb-8" style={{color: '#F4F6FA'}}>Choose how you'd like to connect with a licensed broker:</p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <Button 
              onClick={handleCallNow}
              size="lg"
              className="w-full text-lg font-semibold"
              style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
            >
              <Phone className="w-5 h-5 mr-3" />
              Call an Agent Now
            </Button>
            
            <Button 
              onClick={handleTextNow}
              size="lg"
              className="w-full text-lg font-semibold"
              style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Text an Agent Now
            </Button>
            
            <Button 
              onClick={handleBookConsultation}
              size="lg"
              className="w-full text-lg font-semibold"
              style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
            >
              <Calendar className="w-5 h-5 mr-3" />
              Schedule a Time that Works for Me
            </Button>
          </div>
        </div>

        {/* Bottom CTA - Always present for life/mortgage protection flows */}
        <Card className="text-white bg-white/10 border-white/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4" style={{color: '#F2C94C'}}>
              Secure Your Family's Future Today
            </h2>
            <p className="mb-6 text-lg" style={{color: '#F4F6FA'}}>
              Our licensed brokers are standing by to help you get the coverage you need 
              at a price that fits your budget.
            </p>
            <p className="text-sm" style={{color: '#F4F6FA', opacity: 0.8}}>
              ✓ 100% Free Service ✓ No Obligation ✓ Licensed Professionals
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
