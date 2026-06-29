"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "concierge";
  timestamp: Date;
}

const quickReplies = [
  { id: "consultation", label: "📅 Explore Consultation Availability", action: "consultation" },
  { id: "insurance", label: "💳 Check My Insurance Network", action: "insurance" },
  { id: "cases", label: "✨ View Cosmetic Case Studies", action: "cases" },
];

export default function T1ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to our sanctuary. I'm Elena, your care guide. How may I assist you in creating your most confident smile today?",
      sender: "concierge",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate concierge response
    setTimeout(() => {
      const conciergeMessage: Message = {
        id: `concierge-${Date.now()}`,
        text: "Thank you for reaching out. A member of our care team will respond shortly with personalized guidance.",
        sender: "concierge",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, conciergeMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (action: string) => {
    let responseText = "";
    switch (action) {
      case "consultation":
        responseText = "I'd like to explore consultation availability";
        break;
      case "insurance":
        responseText = "Can you help me check my insurance network?";
        break;
      case "cases":
        responseText = "I'd love to view your cosmetic case studies";
        break;
      default:
        responseText = action;
    }
    handleSendMessage(responseText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/60 shadow-lg flex items-center justify-center text-[#0f5a53] hover:scale-105 transition-transform"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#0f5a53] rounded-full border-2 border-white"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon - Toggle between Chat and Close */}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {isOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Frosted Crystal Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[480px] max-h-[80vh] bg-white/70 backdrop-blur-xl border border-white/60 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Panel - Warm Gradient */}
            <div className="bg-gradient-to-br from-[#0f5a53] via-[#0d4f49] to-[#0b4541] text-white px-6 py-5">
              <div className="flex items-center gap-3.5">
                {/* Avatar */}
                <div className="relative w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center font-serif text-base font-light border-2 border-white/25">
                  <span>E</span>
                  {/* Active Status Indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-300 rounded-full border-2 border-white" />
                </div>

                {/* Concierge Info */}
                <div>
                  <h3 className="font-serif text-base font-normal tracking-wide mb-0.5">Sanctuary Concierge</h3>
                  <p className="text-[11px] text-white/80 font-light">Elena — Care Guide</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[9px] text-white/75 uppercase tracking-wider font-medium">
                      Available Now
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Arena */}
            <div className="flex-1 p-5 overflow-y-auto space-y-3.5 bg-gradient-to-b from-slate-50/30 to-white/40">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] ${
                      message.sender === "user"
                        ? "bg-[#0f5a53]/10 text-slate-800 rounded-[1.25rem] rounded-tr-md border border-[#0f5a53]/15"
                        : "bg-white text-slate-800 rounded-[1.25rem] rounded-tl-md border border-slate-100/80 shadow-sm"
                    } px-4 py-3`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span className="text-[10px] mt-1.5 block text-slate-400">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-slate-800 rounded-[1.25rem] rounded-tl-md border border-slate-100/80 shadow-sm px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-2 h-2 bg-slate-300 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-300 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-300 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Organic Quick Reply Pills */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-5 py-4 border-t border-slate-100/60 bg-white/40"
              >
                <p className="text-[9px] uppercase tracking-[0.1em] text-slate-500 font-medium mb-2.5">How may we guide you?</p>
                <div className="flex flex-col gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.action)}
                      className="text-xs font-medium text-slate-700 bg-white/80 border border-slate-200 rounded-full px-4 py-2.5 hover:bg-[#0f5a53] hover:text-white transition-all duration-300 shadow-sm text-left"
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {reply.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-5 border-t border-slate-100/60 bg-white/50">
              <div className="flex items-center gap-2.5">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Share your thoughts with us..."
                  className="flex-1 px-4 py-3 bg-white/90 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f5a53]/20 focus:border-[#0f5a53]/40 transition-all shadow-sm"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-[#0f5a53] text-white rounded-full flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all"
                  whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
