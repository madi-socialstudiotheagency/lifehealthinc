import { useState, useEffect } from 'react';
import { Post } from '@/entities/Post';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

export default function FAQPage() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const results = await Post.filter({ category: 'faq', status: 'published' }, '-publish_date');
                setFaqs(results);
            } catch (error) {
                console.error("Error fetching FAQs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const generateFaqSchema = () => {
        if (!faqs || faqs.length === 0) return null;
        try {
            const schema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                    "@type": "Question",
                    "name": faq.title,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.content
                            .replace(/(\*\*|__)/g, '') // Remove bold markdown
                            .replace(/(\*|_)/g, '') // Remove italic/list markdown
                            .replace(/(\r\n|\n|\r)/gm, " ") // Replace newlines with spaces
                            .replace(/"/g, "'") // Replace double quotes
                    }
                }))
            };
            return JSON.stringify(schema, null, 2);
        } catch (error) {
            console.error("Error generating FAQ schema:", error);
            return null;
        }
    };

    const faqSchema = generateFaqSchema();

    return (
        <div className="py-12">
            {faqSchema && (
                <script type="application/ld+json">
                    {faqSchema}
                </script>
            )}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4" style={{color: '#1C1B30'}} />
                    <h1 className="text-4xl font-bold mb-4" style={{color: '#1C1B30'}}>
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-slate-600">
                        Find answers to common questions about life insurance and our process.
                    </p>
                </div>
                
                {/* Disclaimer */}
                <Alert variant="default" className="mb-8 bg-amber-50 border-amber-200">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800 font-semibold">General Info Only — Not Legal or Tax Advice</AlertTitle>
                    <AlertDescription className="text-amber-700">
                        The information provided below is for general informational purposes only and does not constitute legal, tax, or financial advice. Please consult with a qualified professional for advice tailored to your specific situation.
                    </AlertDescription>
                </Alert>

                {/* Accordion */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-8 h-8 animate-spin text-slate-500" />
                    </div>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((item) => (
                            <AccordionItem key={item.id} value={`item-${item.id}`}>
                                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                                    {item.title}
                                </AccordionTrigger>
                                <AccordionContent className="prose max-w-none text-base text-slate-700 leading-relaxed">
                                    <ReactMarkdown
                                        components={{
                                            p: ({node, ...props}) => <p className="mb-4" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
                                            strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                                        }}
                                    >
                                        {item.content}
                                    </ReactMarkdown>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}

                 {/* CTA Section */}
                <div className="text-center mt-16">
                    <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                    <p className="text-slate-600 mb-6">Connect with a licensed broker to get clear answers.</p>
                    <Button asChild size="lg" style={{background: 'linear-gradient(135deg, #1A3586, #3D6B9E)', color: '#FFFFFF'}}>
                        <Link to={createPageUrl("Book")}>
                            Speak With a Broker
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}