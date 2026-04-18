import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { GoogleGenAI } from "@google/genai";
import { db } from '../lib/firebase';

let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    // Check multiple possible locations for the key
    const rawKey = import.meta.env.VITE_GEMINI_API_KEY || (typeof window !== 'undefined' ? (window as any)?.__ENV__?.GEMINI_API_KEY : undefined) || "AI Studio Free Tier";
    aiInstance = new GoogleGenAI({ apiKey: rawKey });
  }
  return aiInstance;
};

type Message = {
  role: 'user' | 'model';
  message: string;
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  
  // Lead Collection State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', message: 'Hi there! I am TGC Support. How can I help you regarding The Gym Culture today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, isVerified]);

  const handleStartChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;
    
    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'inquiries'), {
        type: 'ai_chat',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: 'Started an AI Chat session.',
        created_at: new Date().toISOString(),
        chatHistory: messages // Save the initial greeting
      });
      setLeadId(docRef.id);
      setIsVerified(true);
    } catch (error) {
      console.error("Error starting chat session:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', message: userMessage }]);
    setIsLoading(true);

    try {
      if (leadId) {
        await updateDoc(doc(db, 'inquiries', leadId), {
          chatHistory: arrayUnion({ role: 'user', message: userMessage })
        });
      }

      const systemInstruction = `You are "TGC Support", the official virtual assistant for "The Gym Culture". 
Your ONLY purpose is to answer questions about THE GYM Culture using the provided context.
DO NOT provide generic fitness advice not related to the gym or its services.
We have 7 locations: Mira Road, Borivali, Kandivali, Malad East, Orlem, Haridwar, Sundar Nagar.
When a user asks for specific details about a branch (like opening hours, exact address, reviews, photos, contact numbers):
You MUST actively USE the googleMaps tool to look up that specific "Gym Culture" branch on Google Maps. 
Use the result from the tool to answer the user's specific question completely and accurately.
Do NOT just provide the GMB link and ask the user to check it. You MUST read the data from the tool and provide the answer in the chat directly.
You can use these reference links if helpful for the Maps lookup, but prioritize answering with the actual data:
1. Mira Road - https://share.google/Chi1TUk9eb6DjJb25
2. Borivali - https://share.google/5CNEfwZ7oekg6h8ND
3. Kandivali - https://share.google/dUce32b07NEVyBZ1W
4. Malad East - https://share.google/CS2Ljo8AkNPfFzFiJ
5. Orlem - https://share.google/6KElGmqsocQKPoRrG
6. Haridwar - https://share.google/EnU3SQs7zUPe1wNhu
7. Sundar Nagar - https://share.google/fFknzr3sZhUa6oeVd
Locations also have basic plans starting at ₹2,499/month, premium at ₹4,999/month, and Elite at ₹12,999/quarter.
Keep answers helpful, concise, and friendly.`;

      // Build history safely (Gemini requires strict alternating roles starting with 'user')
      const contents: any[] = [];
      for (const msg of messages) {
        // Skip the hardcoded UI welcome message
        if (msg.role === 'model' && msg.message.includes('TGC Support. How can I help')) continue;
        
        const r = msg.role === 'user' ? 'user' : 'model';
        if (contents.length > 0 && contents[contents.length - 1].role === r) {
          contents[contents.length - 1].parts[0].text += `\n\n${msg.message}`;
        } else {
          contents.push({ role: r, parts: [{ text: msg.message }] });
        }
      }

      // Append current message
      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents[contents.length - 1].parts[0].text += `\n\n${userMessage}`;
      } else {
        contents.push({ role: 'user', parts: [{ text: userMessage }] });
      }

      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          tools: [{ googleMaps: {} }]
        }
      });
      
      const reply = response.text || "I'm sorry, I couldn't process that.";

      setMessages(prev => [...prev, { role: 'model', message: reply }]);
      
      if (leadId) {
        await updateDoc(doc(db, 'inquiries', leadId), {
          chatHistory: arrayUnion({ role: 'model', message: reply })
        });
      }
    } catch (error: any) {
      console.error(error);
      const errMsg = error?.message || String(error);
      
      let errorMsg = 'Sorry, I am having trouble connecting right now. Please try again later.';
      if (errMsg.includes('API key') || errMsg.includes('MY_GEMINI_API_KEY') || errMsg.includes('API_KEY_INVALID') || errMsg.includes('400')) {
        errorMsg = "⚠️ **API Key Required for Live Website:** Ye website Google AI Studio ke bahar deployed hai. Chatbot use karne ke liye aapko pehle `aistudio.google.com/app/apikey` se ek free Gemini API Key create karni padegi, aur usko GitHub/Vercel (jaha host hai) ke Environment Variables me `VITE_GEMINI_API_KEY` naam se save karna hoga.";
      } else {
        errorMsg = `⚠️ Debug Error: ${errMsg}. Please take a screenshot of this.`;
      }
        
      setMessages(prev => [...prev, { role: 'model', message: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[calc(100vw-3rem)] sm:w-[400px] h-[500px] max-h-[75vh] flex flex-col glass rounded-[2rem] overflow-hidden border border-brand/20 shadow-2xl shadow-brand/10 mb-4 pointer-events-auto bg-ink/95"
          >
            {/* Header */}
            <div className="bg-brand px-6 py-4 flex items-center justify-between shadow-md z-10">
              <div>
                <h3 className="font-display uppercase tracking-wide text-white text-lg">TGC Support</h3>
                <p className="text-white/70 text-xs font-mono uppercase tracking-widest">{isVerified ? 'Online' : 'Virtual Assistant'}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isVerified ? (
              /* Verification / Lead Collection Form */
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="text-center mb-6 mt-4">
                  <div className="w-16 h-16 bg-brand/20 rounded-full flex items-center justify-center mx-auto mb-4 text-brand">
                    <MessageSquare className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-2xl uppercase tracking-wide text-white">Welcome!</h4>
                  <p className="text-sm text-paper/60 font-light mt-2">Please provide your details below so our AI assistant can help you better.</p>
                </div>
                
                <form onSubmit={handleStartChat} className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-paper/40">Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full glass-dark border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-paper/40">Email</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full glass-dark border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-paper/40">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full glass-dark border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 py-4 font-display text-lg uppercase tracking-wider btn-glow flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Start Chat'} <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            ) : (
              /* Chat Messages Area */
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-4 text-sm font-light leading-relaxed ${msg.role === 'user' ? 'bg-brand text-white rounded-br-sm' : 'glass border-white/10 text-paper rounded-bl-sm'}`}>
                        <div className="markdown-body chat-markdown">
                          <ReactMarkdown>{msg.message}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="glass border-white/10 rounded-2xl rounded-bl-sm p-4 w-16 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-brand animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-ink/80 backdrop-blur-xl border-t border-white/10">
                  <form onSubmit={handleSend} className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about Gym Culture..."
                      className="w-full glass-dark border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-brand transition-colors"
                    />
                    <button 
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                      aria-label="Send Message"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white shadow-2xl transition-shadow hover:shadow-brand/40 pointer-events-auto"
            aria-label="Open Chat"
          >
            <MessageSquare className="w-8 h-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
