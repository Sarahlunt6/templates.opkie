"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Message {
  id: string;
  text: string;
  sender: "user" | "concierge";
  timestamp: Date;
}

const quickReplies = [
  { id: "booking", label: "📅 Book Consultation", action: "booking" },
  { id: "insurance", label: "💳 Check Insurance Coverage", action: "insurance" },
  { id: "emergency", label: "🚨 Emergency Openings", action: "emergency" },
];

export default function ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Elena, your practice concierge. How may I assist you today?",
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
        text: "Thank you for reaching out! A team member will respond shortly with personalized assistance.",
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
      case "booking":
        responseText = "I'd like to book a consultation";
        break;
      case "insurance":
        responseText = "Can you help me check my insurance coverage?";
        break;
      case "emergency":
        responseText = "Do you have any emergency appointment openings?";
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
      {/* Floating Action Button (FAB) */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#0f5a53] text-white rounded-full shadow-[0_8px_30px_rgba(15,90,83,0.3)] hover:shadow-[0_12px_40px_rgba(15,90,83,0.4)] flex items-center justify-center transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Notification Dot */}
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Icon - Toggle between Chat and Close */}
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.div>
      </motion.button>

      {/* Expandable Luxury Concierge Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] max-h-[80vh] bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header Block */}
            <div className="bg-gradient-to-r from-[#0f5a53] to-[#0d4f49] text-white px-6 py-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-semibold border-2 border-white/30">
                  <span>E</span>
                  {/* Active Status Indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                </div>

                {/* Concierge Info */}
                <div>
                  <h3 className="text-sm font-semibold tracking-wide">Elena — Practice Concierge</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/90 uppercase tracking-wider font-medium">
                      Online & Ready to Assist
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Arena */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] ${
                      message.sender === "user"
                        ? "bg-[#0f5a53] text-white rounded-2xl rounded-tr-sm"
                        : "bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100"
                    } px-4 py-3 shadow-sm`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-[10px] mt-1 block ${
                        message.sender === "user" ? "text-white/70" : "text-slate-400"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100 px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-1">
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-slate-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reply Pills */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-4 py-3 border-t border-slate-200/50 bg-white/50"
              >
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-2">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.action)}
                      className="border border-slate-200 text-xs text-slate-700 rounded-full px-4 py-2 bg-slate-50/50 hover:bg-[#0f5a53] hover:text-white hover:border-[#0f5a53] transition-all duration-300 shadow-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {reply.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input Bar */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200/50 bg-white">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask our concierge anything..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0f5a53]/20 focus:border-[#0f5a53] transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-[#0f5a53] text-white rounded-full flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all"
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
