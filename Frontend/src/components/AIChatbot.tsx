import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { toggleChatbot, closeChatbot, addMessage } from '@/store/slice/chatbotSlice';
import { Bot, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const botResponses = [
  "I can help you with your study plan! What subject are you struggling with?",
  "Based on your performance, I recommend focusing on Linear Algebra this week.",
  "Your attendance rate is 83%. Try to maintain at least 85% for best results.",
  "Would you like me to generate a personalized quiz for practice?",
  "Great question! Let me check your academic records for more details.",
];

const suggestions = ['My study plan', 'Check attendance', 'Upcoming exams', 'Help with ML'];

const AIChatbot = () => {
  const { isOpen, messages } = useAppSelector(s => s.chatbot);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');

  const handleSend = (text?: string) => {
    const msg = text || input;
    if (!msg.trim()) return;
    dispatch(addMessage({ text: msg, sender: 'user' }));
    setInput('');
    setTimeout(() => {
      dispatch(addMessage({ text: botResponses[Math.floor(Math.random() * botResponses.length)], sender: 'bot' }));
    }, 800);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => dispatch(toggleChatbot())}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-primary-foreground z-50 neon-glow"
        style={{ background: 'var(--gradient-primary)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] glass-card flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between" style={{ background: 'var(--gradient-primary)' }}>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary-foreground" />
                <span className="font-display font-semibold text-sm text-primary-foreground">EduAI Assistant</span>
              </div>
              <button onClick={() => dispatch(closeChatbot())} className="text-primary-foreground/70 hover:text-primary-foreground">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                    m.sender === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-sm'
                      : 'bg-muted text-foreground rounded-bl-sm'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-border/30">
              {suggestions.map(s => (
                <button key={s} onClick={() => handleSend(s)} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 whitespace-nowrap hover:bg-primary/20 transition-colors">
                  {s}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border/50 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted/50 border border-border text-sm focus:outline-none focus:border-primary"
              />
              <button onClick={() => handleSend()} className="w-9 h-9 rounded-lg flex items-center justify-center text-primary-foreground shrink-0" style={{ background: 'var(--gradient-primary)' }}>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
