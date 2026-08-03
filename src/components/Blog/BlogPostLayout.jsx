import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const categoryColors = {
  'Life Insurance': 'bg-blue-100 text-blue-800',
  'Mortgage Protection': 'bg-green-100 text-green-800',
  'Retirement Planning': 'bg-purple-100 text-purple-800',
  'Insurance Basics': 'bg-orange-100 text-orange-800',
  'Tips & Advice': 'bg-red-100 text-red-800',
  'Family Planning': 'bg-pink-100 text-pink-800',
  'Medicare': 'bg-indigo-100 text-indigo-800',
  'Health Insurance': 'bg-teal-100 text-teal-800'
};

export default function BlogPostLayout({ title, author, publishDate, readTime, category, children }) {
    return (
        <div className="py-12 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <article>
                    <header className="mb-8 border-b pb-8">
                        <div className="flex items-center gap-4 mb-4">
                            <Badge className={categoryColors[category] || 'bg-gray-100 text-gray-800'}>{category}</Badge>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Calendar className="w-4 h-4" />
                                <span>{publishDate}</span>
                            </div>
                        </div>
                        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--brand-primary)' }}>
                            {title}
                        </h1>
                        <div className="flex items-center gap-4 text-slate-600">
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                <span>By {author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{readTime}</span>
                            </div>
                        </div>
                    </header>

                    <div className="prose prose-lg max-w-none prose-slate prose-headings:text-slate-800 prose-a:text-blue-600 hover:prose-a:text-blue-500">
                        {children}
                    </div>
                </article>

                <Card className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
                    <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Ready to Secure Your Future?</h3>
                            <p className="text-slate-300">Get a free, no-obligation quote from a licensed professional today.</p>
                        </div>
                        <Button asChild size="lg" style={{ backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)' }}>
                            <Link to={createPageUrl("Quote")}>
                                Get My Free Quote
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}