import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { handleLeadSubmission, submitLeadToGHL } from '../components/lead-submission-handler';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';


export default function PartnerFormPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    profession: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
    transactionalSmsConsent: false,
    marketingSmsConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.profession) newErrors.profession = "Profession is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "A valid email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.consent) newErrors.consent = "You must agree to be contacted";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const values = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        companyName: formData.companyName.trim(),
        profession: formData.profession,
        message: formData.message.trim(),
        interest: 'Partnership Application',
        type: "partnerForm",
        primaryInterest: 'Partnership Application',
        productType: 'partnership',
        consent: formData.consent,
        transactionalSmsConsent: formData.transactionalSmsConsent,
        marketingSmsConsent: formData.marketingSmsConsent,
        consentText: 'User agreed to be contacted by LifeHealthInc via phone and email regarding partnership opportunities. Consent is not a condition of partnership.'
          + (formData.transactionalSmsConsent ? ' | Transactional SMS: appointment reminders, account notifications, service updates.' : '')
          + (formData.marketingSmsConsent ? ' | Marketing SMS: offers, follow-ups, promotional communications.' : ''),
        consentAt: new Date().toISOString(),
        submissionDate: new Date().toISOString(),
        status: 'new'
      };

      // 1) Save to Base44 and sync to GHL via backend function
      const leadSubmissionResult = await handleLeadSubmission(values);
      
      if (!leadSubmissionResult.success) {
        console.error("Lead entity save failed", leadSubmissionResult.error);
        throw new Error(leadSubmissionResult.error || 'Failed to submit application');
      }

      // 2) Also send direct webhook as backup
      await submitLeadToGHL(values);

      // 3) Success - show animation and redirect
      setDone(true);
      
      // Small delay to show success animation
      setTimeout(() => {
        const qp = new URLSearchParams(window.location.search).toString();
        window.location.href = `/thank-you?type=partnerForm${qp ? '&' + qp : ''}`;
      }, 1500);

    } catch (error) {
      console.error('Partner form submission error:', error);
      setErrors({ 
        submit: 'Failed to submit application. Please try again or call us at (954) 543-0853.' 
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        .success-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 50;
          animation: fadeIn 0.3s ease-in;
        }
        .checkmark-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #34D399;
          margin-bottom: 1rem;
          animation: scaleIn 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
      `}</style>

      <div className="min-h-screen py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <User className="w-12 h-12 mx-auto mb-4" style={{color: '#1C1B30'}} />
            <h1 className="text-4xl font-bold mb-4" style={{color: '#1C1B30'}}>
              Partnership Application
            </h1>
            <p className="text-lg text-slate-600">
              Let's build a successful partnership together. Tell us a bit about your practice.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input 
                      id="firstName" 
                      value={formData.firstName} 
                      onChange={(e) => handleChange('firstName', e.target.value)} 
                      className={errors.firstName ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input 
                      id="lastName" 
                      value={formData.lastName} 
                      onChange={(e) => handleChange('lastName', e.target.value)} 
                      className={errors.lastName ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name (Optional)</Label>
                    <Input 
                      id="companyName" 
                      value={formData.companyName} 
                      onChange={(e) => handleChange('companyName', e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profession">Profession *</Label>
                    <Select 
                      onValueChange={(value) => handleChange('profession', value)} 
                      value={formData.profession}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className={errors.profession ? "border-red-500" : ""}>
                        <SelectValue placeholder="Select your profession" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CPA / Accountant">CPA / Accountant</SelectItem>
                        <SelectItem value="Financial Advisor">Financial Advisor</SelectItem>
                        <SelectItem value="Estate Planning Attorney">Estate Planning Attorney</SelectItem>
                        <SelectItem value="Mortgage Broker">Mortgage Broker</SelectItem>
                        <SelectItem value="Realtor">Realtor</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.profession && <p className="text-sm text-red-600">{errors.profession}</p>}
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={(e) => handleChange('email', e.target.value)} 
                      className={errors.email ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone} 
                      onChange={(e) => handleChange('phone', e.target.value)} 
                      className={errors.phone ? "border-red-500" : ""}
                      disabled={isSubmitting}
                    />
                    {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message} 
                    onChange={(e) => handleChange('message', e.target.value)} 
                    placeholder="Tell us about your practice or any specific questions you have..."
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-3 border-t pt-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleChange('consent', checked)}
                      disabled={isSubmitting}
                      className={errors.consent ? "border-red-500" : ""}
                    />
                    <Label 
                      htmlFor="consent" 
                      className="text-sm leading-relaxed cursor-pointer"
                    >
                      I agree to be contacted by LifeHealthInc regarding partnership opportunities via phone and email. Consent is not a condition of partnership. See our{' '}
                      <Link to={createPageUrl("Privacy")} className="underline hover:opacity-80" style={{ color: '#60A5FA' }}>
                        Privacy Policy
                      </Link>
                      {' '}and{' '}
                      <Link to={createPageUrl("Terms")} className="underline hover:opacity-80" style={{ color: '#60A5FA' }}>
                        Terms & Conditions
                      </Link>
                      . *
                    </Label>
                  </div>
                  {errors.consent && <p className="text-sm text-red-600 ml-8">{errors.consent}</p>}
                  
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="transactionalSmsConsent"
                      checked={formData.transactionalSmsConsent}
                      onCheckedChange={(checked) => handleChange('transactionalSmsConsent', checked)}
                      disabled={isSubmitting}
                    />
                    <Label 
                      htmlFor="transactionalSmsConsent" 
                      className="text-xs leading-relaxed cursor-pointer"
                    >
                      I agree to receive <strong>transactional SMS messages</strong> from <strong>First Class</strong> at the phone number provided. These messages may include appointment reminders, account notifications, and service related updates. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out.
                    </Label>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="marketingSmsConsent"
                      checked={formData.marketingSmsConsent}
                      onCheckedChange={(checked) => handleChange('marketingSmsConsent', checked)}
                      disabled={isSubmitting}
                    />
                    <Label 
                      htmlFor="marketingSmsConsent" 
                      className="text-xs leading-relaxed cursor-pointer"
                    >
                      I agree to receive <strong>marketing and promotional SMS messages</strong> from <strong>First Class</strong> at the phone number provided. These messages may include offers, follow ups, and promotional communications. Message frequency may vary. Message and data rates may apply. Reply <strong>HELP</strong> for help or <strong>STOP</strong> to opt out. <Link to={createPageUrl("Privacy")} className="underline" style={{ color: '#60A5FA' }}>Privacy Policy</Link>, <Link to={createPageUrl("Terms")} className="underline" style={{ color: '#60A5FA' }}>Terms & Conditions</Link>
                    </Label>
                  </div>
                </div>

                {errors.submit && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={isSubmitting || !formData.consent} 
                  className="w-full" 
                  size="lg" 
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> 
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {done && (
          <div className="success-overlay">
            <div className="checkmark-large">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <p className="text-white text-lg font-semibold">Application submitted successfully!</p>
            <p className="text-white text-sm mt-2">Redirecting...</p>
          </div>
        )}
      </div>
    </>
  );
}