import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Calendar, Clock, ArrowRight, TrendingUp } from 'lucide-react';

const blogPosts = [
  {
    id: 'blog-how-much-life-insurance-do-i-need',
    title: 'How Much Life Insurance Do I Need? Complete 2025 Calculator Guide',
    excerpt: 'Calculate exactly how much life insurance coverage you need in 2025. Complete guide with DIME method, real examples, and cost breakdowns for every life stage.',
    category: 'Life Insurance',
    readTime: '18 min',
    publishDate: '2025-01-05',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    featured: true
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

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1C1B30' }}>
            Insurance Insights & Education
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Expert advice, guides, and tips to help you make informed insurance decisions
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden bg-gradient-to-br from-white to-slate-50 border-2 border-blue-200 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-blue-600 text-white font-semibold">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Featured
                  </Badge>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <Badge className={`${categoryColors[featuredPost.category]} w-fit mb-4`}>
                  {featuredPost.category}
                </Badge>
                <h2 className="text-3xl font-bold mb-4" style={{ color: '#1C1B30' }}>
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button 
                  asChild 
                  size="lg"
                  className="w-fit"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
                >
                  <Link to={createPageUrl(featuredPost.id)}>
                    Read Full Article
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Regular Posts Grid */}
        {regularPosts.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1C1B30' }}>
              Latest Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <Badge className={`${categoryColors[post.category]} w-fit mb-2`}>
                      {post.category}
                    </Badge>
                    <CardTitle className="text-xl" style={{ color: '#1C1B30' }}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.publishDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="outline"
                      className="w-full border-2"
                      style={{ borderColor: '#1A3586', color: '#1A3586' }}
                    >
                      <Link to={createPageUrl(post.id)}>
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Categories Section */}
        <div className="mt-16 p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #081730 0%, #1A3586 100%)' }}>
          <h2 className="text-2xl font-bold text-center mb-8 text-white">
            Browse by Topic
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(categoryColors).map((category) => (
              <Badge 
                key={category} 
                className={`${categoryColors[category]} text-base px-4 py-2 cursor-pointer hover:opacity-80 transition-opacity`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-slate-800 to-slate-900 text-white border-0">
            <CardContent className="p-10">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Get Personalized Coverage?
              </h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Get a free quote from 50+ top-rated carriers and speak with a licensed professional
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="text-lg px-8 py-6"
                  style={{ background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF' }}
                >
                  <Link to={createPageUrl("Calculator")}>
                    Get Free Quote
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 bg-transparent hover:bg-white/10"
                  style={{ borderColor: '#FFFFFF', color: '#FFFFFF' }}
                >
                  <Link to={createPageUrl("Book")}>
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}