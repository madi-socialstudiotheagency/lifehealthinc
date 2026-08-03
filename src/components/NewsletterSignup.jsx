import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { handleLeadSubmission, submitLeadToGHL } from './lead-submission-handler';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function NewsletterSignup({ variant, onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (!formData.consent) {
      setError('You must agree to receive emails');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // 1. Save to Newsletter entity
      const newsletter = await base44.entities.Newsletter.create({
        name: formData.name.trim(),
        email: formData.email.trim(),
        consent: formData.consent,
        consentText: 'User agreed to receive emails from LifeHealthInc.',
        consentAt: new Date().toISOString(),
        source: variant === 'footer' ? 'footer' : variant === 'modal' ? 'hero-modal' : 'mid-page',
        ip: '', // Browser doesn't have direct access to IP
        status: 'subscribed'
      });

      // 2. Also create a Lead entry for GHL sync
      const nameParts = formData.name.trim().split(' ');
      const firstName = nameParts[0] || 'Newsletter';
      const lastName = nameParts.slice(1).join(' ') || 'Subscriber';

      const leadData = {
        firstName: firstName,
        lastName: lastName,
        email: formData.email.trim(),
        type: 'newsletter',
        productType: 'newsletter',
        consent: formData.consent,
        consentText: 'User agreed to receive emails from LifeHealthInc.',
        consentAt: new Date().toISOString(),
        submissionDate: new Date().toISOString(),
        status: 'new',
        notes: `Newsletter subscription from ${variant || 'website'}`
      };

      // 3. Use unified submission handler (saves to Base44 + syncs to GHL)
      await handleLeadSubmission(leadData);

      // 4. Also send direct webhook as backup
      submitLeadToGHL(leadData);

      // Success!
      setIsSuccess(true);
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }

      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        window.location.href = '/thank-you?type=newsletter';
      }, 2000);

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: variant === 'footer' ? '#FFFFFF' : '#1C1B30' }}>
          You're Subscribed!
        </h3>
        <p style={{ color: variant === 'footer' ? '#F4F6FA' : '#64748b' }}>
          Check your email for confirmation. Redirecting...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2" style={{ color: variant === 'footer' ? '#FFFFFF' : '#1C1B30' }}>
          Stay Informed
        </h3>
        <p className="text-sm" style={{ color: variant === 'footer' ? '#F4F6FA' : '#64748b' }}>
          Get weekly insurance insights, tips, and exclusive offers delivered to your inbox.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" style={{ color: variant === 'footer' ? '#F4F6FA' : '#334155' }}>
            Name (Optional)
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="John Smith"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={isSubmitting}
            className={variant === 'footer' ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-400' : ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" style={{ color: variant === 'footer' ? '#F4F6FA' : '#334155' }}>
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={isSubmitting}
            required
            className={variant === 'footer' ? 'bg-white/10 border-white/20 text-white placeholder:text-slate-400' : ''}
          />
        </div>

        <div className="space-y-3 bg-gray-50 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({ ...formData, consent: checked })}
              disabled={isSubmitting}
            />
            <Label
              htmlFor="consent"
              className="text-xs leading-relaxed cursor-pointer"
              style={{ color: variant === 'footer' ? '#F4F6FA' : '#334155' }}
            >
              I agree to receive emails from LifeHealthInc with insurance tips, updates, and exclusive offers. Consent is not a condition of service. See our <a href="/terms" className="text-blue-600 underline hover:text-blue-800">Terms</a>{'  '}and{'  '}<a href="/privacy" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</a>.
            </Label>
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !formData.consent}
          className="w-full"
          style={{ backgroundColor: '#1A3586', color: '#FFFFFF' }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>
      </form>
    </div>
  );
}