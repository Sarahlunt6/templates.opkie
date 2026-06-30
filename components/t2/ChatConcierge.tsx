"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "system";
  timestamp: Date;
}

const quickActions = [
  { id: "booking", label: "[ ACTION: SECURE ONLINE BOOKING ]", action: "booking" },
  { id: "insurance", label: "[ ACTION: SCAN INSURANCE DATA ]", action: "insurance" },
  { id: "reviews", label: "[ ACTION: SYSTEM REVIEWS & RATINGS ]", action: "reviews" },
];

export default function T2ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "NEXUS AI ONLINE // System initialized. Precision digital dentistry module active. How may I assist your treatment planning?",
      sender: "system",
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

    // Simulate system response
    setTimeout(() => {
      const systemMessage: Message = {
        id: `system-${Date.now()}`,
        text: "REQUEST PROCESSED // A specialist will respond with precision guidance shortly. Standing by.",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, systemMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleQuickAction = (action: string) => {
    let responseText = "";
    switch (action) {
      case "booking":
        responseText = "Initiate secure online booking sequence";
        break;
      case "insurance":
        responseText = "Request insurance data scan and verification";
        break;
      case "reviews":
        responseText = "Access system reviews and performance ratings";
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
      {/* Floating Trigger Button - Cyber Minimalist */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 22 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-2xl flex items-center justify-center text-white hover:border-teal-500/50 transition-colors shadow-[0_0_15px_rgba(20,184,166,0.1)]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Cyber Notification Pulse */}
        <motion.div
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-teal-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon - Sharp Geometric */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {isOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Smoked Obsidian Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-20 right-4 md:right-6 z-50 w-[calc(100vw-32px)] sm:w-80 md:w-[22rem] h-[min(500px,70vh)] md:h-[500px] md:max-h-[82vh] bg-neutral-950/60 backdrop-blur-2xl border border-white/10 rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Panel - Flat Black Razor-Sharp */}
            <div className="bg-neutral-950/80 border-b border-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {/* Cyber Dot Tracker */}
                  <div className="relative">
                    <div className="w-2 h-2 bg-teal-400 rounded-full" />
                    <motion.div
                      className="absolute inset-0 w-2 h-2 bg-teal-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-[0.25em] font-semibold text-neutral-400 uppercase">
                      NEXUS AI SYSTEMS
                    </h3>
                    <p className="text-[8px] tracking-[0.2em] text-neutral-500 uppercase mt-0.5 font-mono">
                      ONLINE • READY
                    </p>
                  </div>
                </div>

                {/* System Status Indicator */}
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                  <span className="text-[7px] tracking-[0.15em] text-emerald-400/70 uppercase font-mono">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Message Arena - Smoked Glass */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-neutral-950/40">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, x: message.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      message.sender === "user"
                        ? "bg-gradient-to-br from-teal-500/20 to-teal-600/20 text-white border border-teal-500/30 rounded-2xl rounded-tr-sm"
                        : "bg-neutral-900/60 text-neutral-100 border border-white/10 rounded-2xl rounded-tl-sm"
                    } px-3.5 py-2.5 backdrop-blur-sm`}
                  >
                    <p className="text-[11px] leading-relaxed font-light tracking-wide">{message.text}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <span className="text-[8px] text-neutral-500 font-mono tracking-wider">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false
                        })}
                      </span>
                      <div className="w-px h-2 bg-neutral-700" />
                      <span className="text-[7px] text-neutral-600 uppercase tracking-wider font-mono">
                        {message.sender === "user" ? "USER" : "SYS"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator - Technical */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-neutral-900/60 text-neutral-100 border border-white/10 rounded-2xl rounded-tl-sm px-3.5 py-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                      />
                      <span className="text-[8px] text-neutral-500 ml-1 uppercase tracking-wider font-mono">
                        PROCESSING
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Precision Quick-Action Controls */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-3 border-t border-white/5 bg-neutral-950/60 space-y-1.5"
              >
                <p className="text-[8px] uppercase tracking-[0.2em] text-neutral-600 font-mono mb-2">
                  &gt; QUICK ACTIONS
                </p>
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action.action)}
                    className="w-full text-left text-[10px] uppercase tracking-[0.15em] font-medium text-neutral-300 bg-white/5 border border-white/5 rounded-lg px-4 py-2.5 hover:border-teal-500/40 hover:bg-white/10 transition-all font-mono"
                    whileHover={{ x: 2, borderColor: "rgba(20,184,166,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Input Bar - High-Tech Terminal */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-neutral-950/80">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] text-neutral-600 font-mono">
                    &gt;
                  </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="ENTER COMMAND..."
                    className="w-full pl-7 pr-3 py-2.5 bg-neutral-900/80 border border-white/10 rounded-lg text-[11px] text-white placeholder-neutral-600 focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500/50 transition-all font-mono uppercase tracking-wide"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 text-black rounded-lg flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 transition-all font-bold"
                  whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
