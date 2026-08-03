
import { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { base44 } from '@/api/base44Client';

const SYSTEM_CONTEXT = `You are a helpful AI assistant for LifeHealthInc, a licensed independent insurance brokerage. You help people understand insurance products and guide them to get coverage.

ABOUT LIFEHEALTHINC:
- Licensed independent insurance brokers (Matthew Anderson NPN: 20770864, Payton Ferguson NPN: 21405656)
- Licensed nationwide in all 50 states
- Multi-carrier brokerage representing 25+ top-rated carriers
- Specialties: Life Insurance, Mortgage Protection, Final Expense, Medicare, Annuities, Health Insurance, IUL Structuring, Business Planning

PRODUCTS WE OFFER:

1. LIFE INSURANCE
   - Term Life: Affordable coverage for a specific period (10, 20, 30 years)
   - Whole Life: Permanent coverage with cash value that builds over time
   - Universal Life: Flexible premiums with cash value growth
   - Indexed Universal Life (IUL): Cash value linked to market index with downside protection (0% floor, cap around 10%)

2. MORTGAGE PROTECTION
   - Covers mortgage payments if you pass away or become disabled
   - Options: 12-18 months payment coverage or full balance payoff
   - Ensures family can keep the home

3. FINAL EXPENSE
   - Simple, permanent coverage for funeral and end-of-life costs
   - Typically $5,000-$50,000 coverage
   - No medical exam for most applicants
   - Fixed premiums for life

4. MEDICARE
   - Medicare Advantage vs Medicare Supplement (Medigap)
   - Part D prescription drug coverage
   - Enrollment periods and eligibility guidance

5. ANNUITIES
   - Fixed, indexed, and variable annuities
   - Retirement income planning
   - Protection against outliving your savings
   - Tax-deferred growth

6. HEALTH INSURANCE
   - ACA marketplace plans
   - Private health insurance
   - Supplemental coverage

YOUR ROLE:
- Answer questions about insurance products in simple, clear language
- Explain policy terms and concepts without jargon
- Help users understand what coverage they might need
- Guide them to book a free consultation to get personalized quotes
- IMPORTANT: Mention the "Get Quote" button in the top-right corner when appropriate - it's a quick way to start their coverage journey
- Never provide specific premium quotes (those require underwriting)
- Always encourage them to speak with a licensed broker for personalized advice

NEXT STEPS FOR USERS:
- Click the "Get Quote" button in the top-right corner for fastest service
- Book a free consultation: Use the buttons below or visit our booking page
- Call: (954) 543-0853
- Email: info@lifehealthinc.org

CONVERSATION TIPS:
- When users are ready to move forward, say things like: "Ready to get started? Click the gold 'Get Quote' button in the top-right corner to begin your personalized quote in under 2 minutes!"
- If they ask how to proceed: "The easiest way is to click the 'Get Quote' button at the top-right of your screen - it'll guide you through a quick questionnaire."
- After explaining coverage: "Want to see what this would cost for you? Just click the 'Get Quote' button in the top-right corner!"

Be friendly, helpful, and educational. If you don't know something specific, be honest and encourage them to speak with a licensed broker. Always end responses with a helpful next step or offer to answer more questions.`;

const SUGGESTED_QUESTIONS = [
  "What's the difference between term and whole life insurance?",
  "How does mortgage protection insurance work?",
  "What is an Indexed Universal Life (IUL) policy?",
  "Do I need a medical exam for life insurance?",
  "How much life insurance coverage do I need?",
  "What's the difference between Medicare Advantage and Medigap?"
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your LifeHealthInc insurance assistant. I can help you understand different insurance types, explain policy terms, and guide you on getting coverage. What would you like to know?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const conversationHistory = newMessages
        .slice(-6) // Keep last 6 messages for context
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n');

      const prompt = `${SYSTEM_CONTEXT}

CONVERSATION HISTORY:
${conversationHistory}

Provide a helpful, clear response. Be concise but informative. If appropriate, suggest booking a consultation or speaking with a licensed broker for personalized advice.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        add_context_from_internet: false
      });

      // Add assistant response
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: response 
      }]);

    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble responding right now. Please try again or contact us directly at (954) 543-0853 or info@lifehealthinc.org for immediate assistance." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="fixed bottom-28 left-6 text-white rounded-full p-4 shadow-2xl focus:outline-none focus:ring-4 focus:ring-yellow-500/50 transition-all hover:scale-110 z-50 w-16 h-16 flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F2C94C 100%)' }}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
      >
        {isOpen ? <X className="w-6 h-6" style={{ color: '#1C1B30' }} /> : <Bot className="w-6 h-6" style={{ color: '#1C1B30' }} />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-48 left-6 w-[calc(100%-3rem)] sm:w-96 h-[80vh] max-h-[600px] rounded-xl shadow-2xl z-50 border flex flex-col overflow-hidden"
          style={{ backgroundColor: '#1C1B30', borderColor: '#2C2B50' }}
        >
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b" style={{ backgroundColor: '#2C2B50', borderColor: '#3C3B60' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D4AF37' }}>
                <Bot className="w-5 h-5" style={{ color: '#1C1B30' }} />
              </div>
              <div>
                <h3 className="font-bold text-white">Insurance Assistant</h3>
                <p className="text-xs text-slate-400">Powered by AI</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-slate-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto p-4 space-y-4"
            style={{ backgroundColor: '#1C1B30' }}
          >
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                    <Bot className="w-4 h-4" style={{ color: '#1C1B30' }} />
                  </div>
                )}
                <div 
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user' 
                      ? 'text-white' 
                      : 'text-white'
                  }`}
                  style={{ 
                    backgroundColor: message.role === 'user' ? '#D4AF37' : '#2C2B50',
                    color: message.role === 'user' ? '#1C1B30' : '#F4F6FA'
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#2C2B50' }}>
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#D4AF37' }}>
                  <Bot className="w-4 h-4" style={{ color: '#1C1B30' }} />
                </div>
                <div className="rounded-lg p-3" style={{ backgroundColor: '#2C2B50' }}>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
              </div>
            )}
            
            {/* Suggested Questions - Show only at start */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 text-center mb-3">Suggested questions:</p>
                <div className="space-y-2">
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left text-xs p-2 rounded border transition-colors hover:bg-white/10"
                      style={{ borderColor: '#3C3B60', color: '#F4F6FA' }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          <div className="border-t px-4 py-2 flex gap-2" style={{ backgroundColor: '#2C2B50', borderColor: '#3C3B60' }}>
            <Button
              size="sm"
              className="text-xs"
              style={{ backgroundColor: '#D4AF37', color: '#1C1B30' }}
              onClick={() => window.open('https://calendly.com/lifehealthinc/lifehealthinc', '_blank')}
            >
              Book Consultation
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              style={{ borderColor: '#D4AF37', color: '#D4AF37' }}
              onClick={() => window.location.href = 'tel:9545430853'}
            >
              Call Now
            </Button>
          </div>

          {/* Input Area */}
          <div className="border-t p-4" style={{ backgroundColor: '#2C2B50', borderColor: '#3C3B60' }}>
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about insurance..."
                disabled={isLoading}
                className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                size="icon"
                style={{ backgroundColor: '#D4AF37' }}
              >
                <Send className="w-4 h-4" style={{ color: '#1C1B30' }} />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              AI responses are educational. Speak with a licensed broker for personalized advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
