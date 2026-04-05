import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', content: "Hi Alex! I'm your FitLife AI assistant. Ask me anything about diet or workouts." }
  ]);

  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Simulated API call structure ready for real backend integration
  const fetchAIResponse = async (userText) => {
    return new Promise((resolve) => {
      // Mock network latency between 600ms and 1500ms
      setTimeout(() => {
        const txt = userText.toLowerCase();
        if (txt.includes('diet') || txt.includes('meal') || txt.includes('food') || txt.includes('eat')) {
          resolve("For your diet, maintaining a high-protein intake is crucial. Try incorporating grilled chicken breast, quinoa mixed with beans, or a Greek yogurt smoothie into your meals today.");
        } else if (txt.includes('workout') || txt.includes('exercise') || txt.includes('train')) {
          resolve("For your workouts, I highly recommend mixing cardiovascular exercise with resistance training. A 30-minute HIIT session or some foundational compound lifts (like squats) are excellent choices.");
        } else {
          resolve("I'm your personal fitness AI! Feel free to ask me for specific diet plans or workout suggestions.");
        }
      }, Math.random() * 800 + 600);
    });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // 1. Add User Message
    const userMsg = inputMessage.trim();
    const newUserEntry = { id: Date.now(), role: 'user', content: userMsg };
    setMessages(prev => [...prev, newUserEntry]);
    setInputMessage('');
    setIsTyping(true);

    // 2. Fetch Bot Response (Simulating API)
    try {
      const responseText = await fetchAIResponse(userMsg);
      const newBotEntry = { id: Date.now() + 1, role: 'bot', content: responseText };
      setMessages(prev => [...prev, newBotEntry]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window Panel */}
      <div 
        className={`bg-white w-[340px] sm:w-[380px] rounded-3xl shadow-[0_10px_40px_-5px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right mb-4 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute bottom-16'
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="text-white font-bold tracking-tight text-sm">FitLife AI</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-slate-400 text-xs font-medium">Online</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-[380px] overflow-y-auto px-5 py-6 bg-slate-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'user' ? 'bg-primary text-white shadow-soft font-bold text-xs' : 'bg-slate-900 text-blue-400 shadow-soft'
              }`}>
                {msg.role === 'user' ? 'AJ' : <Bot size={14} />}
              </div>
              <div className={`p-3.5 rounded-2xl text-[14px] leading-relaxed relative ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-sm shadow-soft' 
                  : 'bg-white text-slate-700 border border-slate-200/60 rounded-tl-sm shadow-sm'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[85%] self-start">
              <div className="w-7 h-7 rounded-full bg-slate-900 text-blue-400 shadow-soft flex items-center justify-center shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-white border border-slate-200/60 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={endOfMessagesRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center gap-2">
          <input 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about diet or workouts..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
          />
          <button 
            type="submit"
            disabled={!inputMessage.trim() || isTyping}
            className="p-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 active:scale-95"
          >
            <Send size={18} className="translate-x-0.5" />
          </button>
        </form>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-float hover:scale-105 transition-all duration-300 relative ${
          isOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
        }`}
      >
        <MessageCircle size={24} />
        {/* Unread indicator blip */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-primary border-2 border-slate-900 rounded-full"></span>
      </button>

    </div>
  );
}
