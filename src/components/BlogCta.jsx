import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function BlogCta() {
  return (
    <div className="text-center bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg p-12 mt-12">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Secure Your Future?
      </h2>
      <p className="text-xl text-slate-300 mb-8">
        Get personalized recommendations from a licensed professional.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" style={{backgroundColor: '#D4AF37', color: '#1C1B30'}}>
          <a href="https://calendly.com/lifehealthinc/lifehealthinc" target="_blank" rel="noopener noreferrer">
            <Calendar className="w-5 h-5 mr-2" />
            Book a Free Consultation
          </a>
        </Button>
      </div>
      <p className="text-slate-400 text-sm mt-4">
        ✓ No Obligation ✓ Licensed Professional Guidance
      </p>
    </div>
  );
}