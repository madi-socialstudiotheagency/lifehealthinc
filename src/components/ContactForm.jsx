import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Send, CheckCircle, Loader2 } from 'lucide-react';
import { handleLeadSubmission, submitLeadToGHL } from './lead-submission-handler';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function ContactForm({ variant = 'default' }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "A valid email is required";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
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
      // Prepare lead data for unified handler
      const leadData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: `Subject: ${formData.subject.trim()}\n\n${formData.message.trim()}`,
        type: 'contactForm',
        productType: 'general_inquiry',
        consent: formData.consent,
        consentText: 'User agreed to be contacted by LifeHealthInc via phone and email.',
        consentAt: new Date().toISOString(),
        submissionDate: new Date().toISOString(),
        status: 'new'
      };

      // Use unified submission handler (saves to Base44 + syncs to GHL)
      await handleLeadSubmission(leadData);

      // Also send direct webhook as backup
      submitLeadToGHL(leadData);

      // Success!
      setIsSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        consent: false,
      });

      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        window.location.href = '/thank-you?type=contactForm';
      }, 2000);

    } catch (error) {
      console.error('Error submitting contact form:', error);
      setErrors({ submit: 'Failed to submit form. Please try again or call us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className={variant === 'embedded' ? 'bg-white/10 border-white/20' : ''}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: variant === 'embedded' ? '#FFFFFF' : '#1C1B30' }}>
            Message Sent!
          </h3>
          <p style={{ color: variant === 'embedded' ? '#F4F6FA' : '#64748b' }}>
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={variant === 'embedded' ? 'bg-white/10 border-white/20' : ''}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: variant === 'embedded' ? '#FFFFFF' : '#1C1B30' }}>
          <Mail className="w-5 h-5" />
          Send Us a Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}>
                First Name *
              </Label>
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
              <Label htmlFor="lastName" style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}>
                Last Name *
              </Label>
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

          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}>
              Email *
            </Label>
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
            <Label htmlFor="subject" style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}>
              Subject *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="What can we help you with?"
              className={errors.subject ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}>
              Message *
            </Label>
            <Textarea
              id="message"
              rows={6}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Tell us more about your inquiry..."
              className={errors.message ? "border-red-500" : ""}
              disabled={isSubmitting}
            />
            {errors.message && <p className="text-sm text-red-600">{errors.message}</p>}
          </div>

          <div className="space-y-3 bg-gray-50 rounded-lg p-4">
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
                style={{ color: variant === 'embedded' ? '#F4F6FA' : '#334155' }}
              >
                I agree to be contacted by LifeHealthInc regarding my inquiry via phone and email. Consent is not a condition of service. See our{' '}
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
            
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
            size="lg"
            style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>

          {errors.submit && (
            <p className="text-sm text-red-600 text-center">{errors.submit}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}