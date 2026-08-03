import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';

export default function HeroSection({ title, highlight, subtitle }) {
  const [zip, setZip] = useState('');

  const handleGetStarted = () => {
    window.location.href = `${createPageUrl('Calculator')}?zip=${zip}`;
  };

  return (
    <section
      className="relative py-20 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}
    >
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1511895426328-dc8714191300?w=1200)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {title}
            {highlight && (
              <> <span className="text-white">{highlight}</span></>
            )}
          </h1>
          {subtitle && (
            <p className="text-xl text-slate-200 mb-8">{subtitle}</p>
          )}

          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Interested in Learning more?
              </h3>
              <p className="text-slate-600 mb-4">
                Enter your Zip to get started and a local agent will contact you soon!
              </p>
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={e => setZip(e.target.value)}
                  maxLength={5}
                  className="flex-1"
                />
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="font-semibold"
                  style={{ backgroundColor: '#FFFFFF', color: '#1A3586' }}
                >
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-slate-500 mt-4 text-center">
                Or call{' '}
                <a href="tel:9545430853" className="font-semibold hover:underline" style={{ color: '#1A3586' }}>
                  (954) 543-0853
                </a>{' '}
                for a quote
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}