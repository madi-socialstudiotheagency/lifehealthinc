import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Send, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendChatTranscript } from '@/api/chatClient';

const NAVY = '#081730';
const BLUE = '#1A3586';

const SYSTEM_CONTEXT = `You are the LifeHealthInc website assistant, representing a licensed independent insurance brokerage. Your job is to help visitors understand their options and move them into an application today, not just answer trivia.

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
   - ACA marketplace plans, private and short-term plans
   - Supplemental coverage
   - For health insurance specifically, the fastest path is our instant online quote tool, which shows real-time carrier rates and lets someone apply directly: lifehealthinc.org/get-started (the "Apply for health insurance now, instant quote" button at the top)

YOUR ROLE:
- Answer questions about insurance products in simple, clear language, no jargon
- Every answer should end by pointing at a next step, not just information
- For health insurance questions, point to the instant quote tool at lifehealthinc.org/get-started
- For term life insurance, mention the instant-decision life application (no medical exam, decision in minutes) on lifehealthinc.org/get-started
- For every other product, point to lifehealthinc.org/get-started to apply online
- Applying online means Matthew prepares the application himself from what they submit, so in most cases they never have to get on a call
- Never provide specific premium quotes yourself (those require underwriting or the instant-quote tool)
- If someone seems price-sensitive or says "cheap" or "affordable," say the instant quote tool shows real carrier rates in minutes, which is the fastest way to see actual pricing

CONVERSATION TIPS:
- When someone is ready to move forward: "You can apply online in a couple minutes at lifehealthinc.org/get-started and Matthew will take it from there, no call required."
- When someone asks about health insurance or price: "The fastest way to see real pricing is the instant quote tool at lifehealthinc.org/get-started, it shows live carrier rates in a couple minutes."
- If they ask how to proceed: "The easiest way is to apply online at lifehealthinc.org/get-started. Matthew reviews it and prepares your application himself."

Be direct, warm, and efficient, like a helpful person texting, not a sales script. If you don't know something specific, say so and point them to a next step anyway. Keep replies short.`;

const SUGGESTED_QUESTIONS = [
  "How much is health insurance going to cost me?",
  "What's the difference between term and whole life insurance?",
  "Do I need a medical exam for life insurance?",
  "How much life insurance coverage do I need?",
  "What's the difference between Medicare Advantage and Medigap?"
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const nowLabel = () =>
  new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

export default function AIAssistant() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm the LifeHealthInc assistant. Tell me what you're looking to cover, life, health, Medicare, or something else, and I'll point you to the fastest way to see real pricing.",
      time: nowLabel()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const transcriptStartedRef = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Best-effort: capture the transcript if the visitor just closes the tab
  // instead of clicking the close button.
  useEffect(() => {
    const handlePageHide = () => {
      if (transcriptStartedRef.current) {
        sendChatTranscript(messages, { beacon: true });
      }
    };
    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const closeChat = () => {
    setIsOpen(false);
    if (transcriptStartedRef.current) {
      sendChatTranscript(messages);
    }
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = messageText || input.trim();
    if (!userMessage || isLoading) return;

    const isFirstRealMessage = !transcriptStartedRef.current;

    const userMsg = { role: 'user', content: userMessage, time: nowLabel(), status: 'Delivered' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = newMessages
        .slice(-6)
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n');

      const prompt = `${SYSTEM_CONTEXT}

CONVERSATION HISTORY:
${conversationHistory}

Reply the way a warm, quick person texting would: one or two SHORT paragraphs separated by a blank line, plain language, no headings or bullet lists.`;

      const request = fetch('/.netlify/functions/chat-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      }).then(async (r) => {
        if (!r.ok) throw new Error('chat-reply ' + r.status);
        const j = await r.json();
        if (!j.reply) throw new Error('empty reply');
        return j.reply;
      });

      await wait(400);
      setMessages(cur => cur.map(m => m === userMsg ? { ...m, status: 'Seen' } : m));

      const response = await request;
      const parts = String(response).split(/\n{2,}/).map(p => p.trim()).filter(Boolean);

      let acc = [...newMessages.map(m => m === userMsg ? { ...m, status: 'Seen' } : m)];
      for (let i = 0; i < parts.length; i++) {
        await wait(Math.min(1400, 400 + parts[i].length * 10));
        acc = [...acc, { role: 'assistant', content: parts[i], time: nowLabel() }];
        setMessages(acc);
        if (i < parts.length - 1) {
          setIsLoading(true);
        }
      }

      if (isFirstRealMessage) {
        transcriptStartedRef.current = true;
        sendChatTranscript(acc, { initial: true });
      }
    } catch (error) {
      console.error('Error getting AI response:', error);
      const fallback = {
        role: 'assistant',
        content: "Thanks, I've passed your message to Matthew, a licensed advisor, and he'll follow up. The fastest way to see real pricing is to apply online at lifehealthinc.org/get-started, it takes a couple of minutes and no call is needed. You can also call or text (954) 543-0853.",
        time: nowLabel()
      };
      const withFallback = [...newMessages.map(m => m === userMsg ? { ...m, status: 'Seen' } : m), fallback];
      setMessages(withFallback);
      // Matthew still gets the visitor's message even when the AI is down.
      transcriptStartedRef.current = true;
      sendChatTranscript(withFallback, { initial: isFirstRealMessage });
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
        className="fixed bottom-24 md:bottom-6 right-4 md:right-6 text-white rounded-full p-4 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/40 transition-all hover:scale-105 z-50 w-14 h-14 flex items-center justify-center"
        style={{ background: NAVY }}
        aria-label={isOpen ? "Close chat" : "Chat with us"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-40 md:bottom-24 right-4 md:right-6 w-[calc(100%-2rem)] sm:w-96 h-[65vh] md:h-[75vh] max-h-[560px] rounded-xl shadow-2xl z-50 border border-slate-200 flex flex-col overflow-hidden bg-white">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BLUE }}>
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: NAVY }}>LifeHealthInc Assistant</h3>
                <p className="text-xs text-slate-400">Usually replies in seconds</p>
              </div>
            </div>
            <button
              onClick={closeChat}
              className="text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-50"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BLUE }}>
                    <MessageCircle className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <div
                  className="max-w-[80%] rounded-lg px-3 py-2"
                  style={{
                    backgroundColor: message.role === 'user' ? BLUE : '#ffffff',
                    color: message.role === 'user' ? '#ffffff' : '#0F172A',
                    border: message.role === 'user' ? 'none' : '1px solid #E2E8F0',
                  }}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  <p className="text-[10px] mt-1 opacity-60 text-right">
                    {message.time}{message.status ? ` · ${message.status}` : ''}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 bg-slate-300">
                    <User className="w-3.5 h-3.5 text-slate-700" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: BLUE }}>
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="rounded-lg px-3 py-2 bg-white border border-slate-200">
                  <div className="flex gap-1 items-center h-4" aria-label="Assistant is typing">
                    {[0, 150, 300].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Suggested Questions - Show only at start */}
            {messages.length === 1 && !isLoading && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-400 text-center mb-1">Common questions</p>
                <div className="space-y-1.5">
                  {SUGGESTED_QUESTIONS.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="w-full text-left text-xs p-2 rounded border border-slate-200 bg-white text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50"
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
          <div className="border-t border-slate-200 px-4 py-2 flex gap-2 bg-white">
            <Button
              size="sm"
              className="text-xs text-white"
              style={{ backgroundColor: BLUE }}
              onClick={() => { setIsOpen(false); navigate('/get-started'); }}
            >
              Apply now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              style={{ borderColor: BLUE, color: BLUE }}
              onClick={() => window.location.href = 'tel:9545430853'}
            >
              Call now
            </Button>
          </div>

          {/* Input Area */}
          <div className="border-t border-slate-200 p-3 bg-white">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about insurance..."
                disabled={isLoading}
                className="flex-grow"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                size="icon"
                style={{ backgroundColor: BLUE }}
              >
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Automated assistant, educational only. Speak with a licensed broker for personalized advice.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
