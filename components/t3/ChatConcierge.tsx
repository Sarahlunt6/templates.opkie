"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "concierge";
  timestamp: Date;
}

const quickActions = [
  { id: "reserve", label: "Reserve Private Suite", action: "reserve", primary: true },
  { id: "network", label: "Verify Provider Network", action: "network", primary: false },
  { id: "directions", label: "Concierge Directions", action: "directions", primary: false },
];

export default function T3ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Welcome to The Sanctuary Club. I'm your dedicated care concierge. How may I guide your wellness journey today?",
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
        text: "Your request has been received. A member of our sanctuary team will provide personalized guidance momentarily.",
        sender: "concierge",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, conciergeMessage]);
      setIsTyping(false);
    }, 1400);
  };

  const handleQuickAction = (action: string) => {
    let responseText = "";
    switch (action) {
      case "reserve":
        responseText = "I'd like to reserve a private consultation suite";
        break;
      case "network":
        responseText = "Please verify my insurance provider network";
        break;
      case "directions":
        responseText = "I need concierge directions to your location";
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
      {/* Floating Trigger Button - Sharp Geometric Box */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 24 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-xl bg-neutral-900 text-white shadow-xl flex items-center justify-center hover:bg-black transition-colors"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* Architectural Status Indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#0f5a53] rounded-sm"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon - Sharp Geometric Toggle */}
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Asymmetric Dock Architecture */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-84 md:w-96 h-[min(520px,70vh)] md:h-[520px] md:max-h-[84vh] bg-white border border-slate-100 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.08)] flex flex-col overflow-hidden p-2"
          >
            {/* Header Panel - Stark Editorial Minimalism */}
            <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {/* Architectural Status Dot */}
                <div className="relative">
                  <div className="w-2 h-2 bg-[#0f5a53] rounded-sm" />
                  <motion.div
                    className="absolute inset-0 w-2 h-2 bg-[#0f5a53] rounded-sm"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                  />
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.18em] font-medium text-neutral-800">
                    THE SANCTUARY CLUB
                  </h3>
                  <p className="text-[9px] tracking-[0.14em] text-neutral-500 uppercase mt-0.5">
                    Concierge Available
                  </p>
                </div>
              </div>

              {/* Minimalist System Indicator */}
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                <span className="text-[8px] tracking-[0.12em] text-emerald-600 uppercase font-medium">
                  LIVE
                </span>
              </div>
            </div>

            {/* Message Gallery Display Board */}
            <div className="flex-1 px-2 py-3 overflow-y-auto space-y-3 bg-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[84%] ${
                      message.sender === "user"
                        ? "bg-neutral-900 text-white rounded-2xl rounded-tr-md"
                        : "bg-slate-50 text-neutral-800 rounded-2xl rounded-tl-md border border-slate-100"
                    } px-4 py-3`}
                  >
                    <p className="text-[13px] leading-relaxed font-light tracking-wide">{message.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[9px] ${message.sender === "user" ? "text-white/60" : "text-neutral-400"} font-medium tracking-wider`}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true
                        })}
                      </span>
                      <div className={`w-px h-2 ${message.sender === "user" ? "bg-white/30" : "bg-neutral-300"}`} />
                      <span className={`text-[8px] ${message.sender === "user" ? "text-white/50" : "text-neutral-400"} uppercase tracking-wider font-medium`}>
                        {message.sender === "user" ? "YOU" : "CLUB"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Architectural */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-50 text-neutral-800 rounded-2xl rounded-tl-md border border-slate-100 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="w-1.5 h-1.5 bg-neutral-400 rounded-sm"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-neutral-400 rounded-sm"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-neutral-400 rounded-sm"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                      />
                      <span className="text-[9px] text-neutral-400 ml-1.5 uppercase tracking-wider font-medium">
                        Composing
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Bento-Style Quick Link Block */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="px-2 py-3 border-t border-slate-100"
              >
                <p className="text-[9px] uppercase tracking-[0.14em] text-neutral-500 font-medium mb-3 px-1">
                  Quick Access
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.id}
                      onClick={() => handleQuickAction(action.action)}
                      className={`${
                        action.primary
                          ? "col-span-2 bg-neutral-900 text-white hover:bg-black"
                          : "bg-slate-50 text-neutral-700 hover:bg-slate-100 border border-slate-200"
                      } text-[11px] uppercase tracking-[0.12em] font-medium transition-all duration-300 rounded-xl px-4 py-3.5 text-left`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {action.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Architectural Input Base */}
            <form onSubmit={handleSubmit} className="p-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Share your wellness goals..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[12px] text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/20 focus:border-neutral-900/40 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 bg-neutral-900 text-white rounded-xl flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-sm hover:bg-black transition-all"
                  whileHover={{ scale: inputValue.trim() ? 1.04 : 1 }}
                  whileTap={{ scale: inputValue.trim() ? 0.96 : 1 }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
