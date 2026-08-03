import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ReactMarkdown from 'react-markdown';

export default function FaqAccordion({ faqs }) {
    if (!faqs || faqs.length === 0) {
        return <p className="text-slate-500 text-center">No frequently asked questions available at the moment.</p>;
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                        {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-slate-700 leading-relaxed">
                        <ReactMarkdown>{faq.content}</ReactMarkdown>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}