
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ArrowRight, Calendar, Clock, User, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const articles = [
  {
    id: 'term-vs-whole-life',
    title: 'Term vs. Whole Life Insurance: Which Is Right for You?',
    category: 'Life Insurance',
    summary: 'Understanding the key differences between term and whole life insurance can help you make the best decision for your family\'s financial security. We break down costs, benefits, and when each type makes sense.',
    readTime: '5 min read',
    publishDate: 'December 15, 2024',
    featured: true
  },
  {
    id: 'mortgage-protection-guide',
    title: 'The Complete Guide to Mortgage Protection Insurance',
    category: 'Mortgage Protection',
    summary: 'Learn how mortgage protection insurance works, why it might be important for homeowners, and how it differs from traditional life insurance. Discover if it\'s the right choice for your family.',
    readTime: '7 min read',
    publishDate: 'December 10, 2024',
    featured: false
  },
  {
    id: 'retirement-income-planning',
    title: 'Using Life Insurance for Retirement Income Planning',
    category: 'Retirement Planning',
    summary: 'Explore how permanent life insurance can play a role in your retirement strategy. Learn about cash value accumulation, tax advantages, and how to integrate life insurance with your overall retirement plan.',
    readTime: '6 min read',
    publishDate: 'December 5, 2024',
    featured: false
  }
];

const blogPosts = [
  {
    id: 'understanding-underwriting',
    title: 'Understanding Life Insurance Underwriting: What to Expect',
    category: 'Insurance Basics',
    summary: 'Demystify the life insurance underwriting process. Learn what insurers look for, how to prepare for your application, and tips to get the best rates.',
    readTime: '4 min read',
    publishDate: 'December 12, 2024',
    author: 'Matthew Anderson'
  },
  {
    id: 'common-life-insurance-mistakes',
    title: '7 Common Life Insurance Mistakes That Could Cost You',
    category: 'Tips & Advice',
    summary: 'Avoid these costly mistakes when buying life insurance. From underinsuring to waiting too long, here\'s what you need to know.',
    readTime: '6 min read',
    publishDate: 'December 8, 2024',
    author: 'Payton Ferguson'
  },
  {
    id: 'life-insurance-for-new-parents',
    title: 'Life Insurance for New Parents: A Step-by-Step Guide',
    category: 'Family Planning',
    summary: 'Becoming a parent changes everything, including your insurance needs. Here\'s how to calculate coverage and find affordable protection for your growing family.',
    readTime: '5 min read',
    publishDate: 'December 3, 2024',
    author: 'Matthew Anderson'
  },
  {
    id: 'medicare-supplement-vs-advantage',
    title: 'Medicare Supplement vs. Medicare Advantage: Which is Better?',
    category: 'Medicare',
    summary: 'Compare the two main ways to enhance your Medicare coverage. We break down costs, benefits, and help you decide which option fits your needs.',
    readTime: '8 min read',
    publishDate: 'November 28, 2024',
    author: 'Payton Ferguson'
  },
  {
    id: 'annuities-explained-simply',
    title: 'Annuities Explained Simply: Your Guide to Guaranteed Income',
    category: 'Retirement Planning',
    summary: 'Cut through the complexity of annuities. Learn about different types, fees to watch for, and whether an annuity belongs in your retirement plan.',
    readTime: '7 min read',
    publishDate: 'November 25, 2024',
    author: 'Matthew Anderson'
  },
  {
    id: 'health-insurance-open-enrollment',
    title: 'Health Insurance Open Enrollment: Your Complete Checklist',
    category: 'Health Insurance',
    summary: 'Make the most of open enrollment season. Our checklist covers everything from comparing plans to understanding subsidies and deadlines.',
    readTime: '6 min read',
    publishDate: 'November 20, 2024',
    author: 'Payton Ferguson'
  }
];

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

export default function ResourcesPage() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <BookOpen className="w-12 h-12 mx-auto mb-4" style={{color: 'var(--brand-primary)'}} />
          <h1 className="text-4xl font-bold mb-4" style={{color: 'var(--brand-primary)'}}>
            Insurance Education Hub
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Educational articles, guides, and expert insights to help you make informed decisions about 
            life insurance, health coverage, and financial planning.
          </p>
        </div>

        {/* Featured Article */}
        {articles.filter(article => article.featured).map((article) => (
          <Card key={article.id} className="mb-12 border-l-4" style={{borderLeftColor: 'var(--brand-accent)'}}>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={categoryColors[article.category]}>
                  Featured
                </Badge>
                <Badge variant="outline" className={categoryColors[article.category]}>
                  {article.category}
                </Badge>
              </div>
              <CardTitle className="text-2xl mb-3">{article.title}</CardTitle>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.publishDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                {article.summary}
              </p>
              <Button 
                asChild
                style={{backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)'}}
              >
                <Link to={createPageUrl(`article-${article.id}`)}>
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Blog Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold" style={{color: 'var(--brand-primary)'}}>
              Latest Articles
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <TrendingUp className="w-4 h-4" />
              <span>Updated weekly</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={categoryColors[post.category]}>
                      {post.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-2">{post.title}</CardTitle>
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow mb-4">
                    {post.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{post.publishDate}</span>
                    <Button 
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      style={{color: 'var(--brand-secondary)'}}
                    >
                      <Link to={createPageUrl(`blog-${post.id}`)}>
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Other Guides */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8" style={{color: 'var(--brand-primary)'}}>
            In-Depth Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {articles.filter(article => !article.featured).map((article) => (
              <Card key={article.id} className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={categoryColors[article.category]}>
                      {article.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl mb-3">{article.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{article.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
                    {article.summary}
                  </p>
                  <Button 
                    asChild
                    variant="outline"
                    className="w-full"
                    style={{borderColor: 'var(--brand-secondary)', color: 'var(--brand-secondary)'}}
                  >
                    <Link to={createPageUrl(`article-${article.id}`)}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white mb-12">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Informed</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Get the latest insurance tips, market updates, and educational content delivered to your inbox. 
              No spam, just valuable insights from licensed professionals.
            </p>
            <Button 
              asChild
              size="lg"
              style={{backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)'}}
            >
              <Link to={createPageUrl("Contact")}>
                Subscribe to Updates
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-6">
            Speak with a licensed insurance professional to get personalized advice.
          </p>
          <Button asChild size="lg" style={{backgroundColor: 'var(--brand-accent)', color: 'var(--brand-primary)'}}>
            <Link to={createPageUrl("Book")}>
              Book a Free Consultation
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
