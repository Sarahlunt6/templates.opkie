"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "concierge";
  timestamp: Date;
}

const quickReplies = [
  { id: "booking", label: "Book a consultation", action: "booking" },
  { id: "insurance", label: "Insurance coverage", action: "insurance" },
  { id: "emergency", label: "Emergency openings", action: "emergency" },
];

/* ────────────────────────────────────────────────────────────────
   Per-template theming. The widget mounts in the root layout, outside
   the template wrappers, so it detects the active template by its
   scoped root class — which also works on scaffolded client sites
   where the template lives at "/".
   ──────────────────────────────────────────────────────────────── */

type ThemeKey = "default" | "t1" | "t2" | "t3";

interface ChatTheme {
  fab: string;
  dot: string;
  panel: string;
  header: string;
  headerName: string;
  avatar: string;
  statusDot: string;
  statusText: string;
  arena: string;
  userBubble: string;
  conciergeBubble: string;
  userTime: string;
  conciergeTime: string;
  typingDot: string;
  quickWrap: string;
  quickLabel: string;
  quickBtn: string;
  inputWrap: string;
  input: string;
  send: string;
}

const THEMES: Record<ThemeKey, ChatTheme> = {
  /* Hub page and any template without its own treatment */
  default: {
    fab: "bg-[#0f5a53] text-white rounded-full shadow-[0_8px_30px_rgba(15,90,83,0.3)] hover:shadow-[0_12px_40px_rgba(15,90,83,0.4)]",
    dot: "bg-emerald-400 border-white",
    panel:
      "bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-2xl",
    header: "bg-gradient-to-r from-[#0f5a53] to-[#0d4f49] text-white",
    headerName: "text-sm font-semibold tracking-wide",
    avatar:
      "rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30",
    statusDot: "bg-emerald-400",
    statusText: "text-white/90",
    arena: "bg-slate-50/30",
    userBubble: "bg-[#0f5a53] text-white rounded-2xl rounded-tr-sm",
    conciergeBubble:
      "bg-white text-slate-800 rounded-2xl rounded-tl-sm border border-slate-100",
    userTime: "text-white/70",
    conciergeTime: "text-slate-400",
    typingDot: "bg-slate-400",
    quickWrap: "border-t border-slate-200/50 bg-white/50",
    quickLabel: "text-slate-500",
    quickBtn:
      "border border-slate-200 text-slate-700 rounded-full bg-slate-50/50 hover:bg-[#0f5a53] hover:text-white hover:border-[#0f5a53]",
    inputWrap: "border-t border-slate-200/50 bg-white",
    input:
      "bg-slate-50 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#0f5a53]/20 focus:border-[#0f5a53]",
    send: "bg-[#0f5a53] text-white rounded-full",
  },

  /* T1 PRESS — paper, ink, one editorial red; sharp print corners */
  t1: {
    fab: "bg-[#1A1713] text-[#F3EFE6] rounded-sm shadow-[0_8px_30px_rgba(26,23,19,0.35)] hover:bg-[#D92B21] transition-colors",
    dot: "bg-[#D92B21] border-[#F3EFE6]",
    panel: "bg-[#F3EFE6] border border-[#1A1713] rounded-sm",
    header: "bg-[#1A1713] text-[#F3EFE6]",
    headerName:
      "font-t1-mono text-[11px] font-bold uppercase tracking-[0.16em]",
    avatar:
      "rounded-sm bg-[#D92B21] text-[#F3EFE6] font-t1-press border border-[#F3EFE6]/30",
    statusDot: "bg-[#D92B21]",
    statusText: "text-[#F3EFE6]/70",
    arena: "bg-[#F3EFE6]",
    userBubble: "bg-[#1A1713] text-[#F3EFE6] rounded-sm",
    conciergeBubble:
      "bg-white text-[#1A1713] rounded-sm border border-[rgba(26,23,19,0.15)]",
    userTime: "text-[#F3EFE6]/60",
    conciergeTime: "text-[#6B675E]",
    typingDot: "bg-[#6B675E]",
    quickWrap: "border-t border-[rgba(26,23,19,0.15)] bg-[#E9E3D4]",
    quickLabel: "text-[#6B675E]",
    quickBtn:
      "border border-[#1A1713] text-[#1A1713] rounded-sm bg-transparent hover:bg-[#D92B21] hover:text-[#F3EFE6] hover:border-[#D92B21]",
    inputWrap: "border-t border-[rgba(26,23,19,0.15)] bg-[#F3EFE6]",
    input:
      "bg-white border border-[rgba(26,23,19,0.3)] rounded-sm text-[#1A1713] placeholder-[#6B675E] focus:ring-2 focus:ring-[#D92B21]/25 focus:border-[#D92B21]",
    send: "bg-[#1A1713] text-[#F3EFE6] rounded-sm hover:bg-[#D92B21] transition-colors",
  },

  /* T2 PRECISION — near-black surfaces, volt green, mono readouts */
  t2: {
    fab: "bg-[#7EE04B] text-[#060806] rounded-full shadow-[0_8px_30px_rgba(126,224,75,0.35)] hover:shadow-[0_12px_44px_rgba(126,224,75,0.5)]",
    dot: "bg-[#060806] border-[#7EE04B]",
    panel: "bg-[#0E120E] border border-[rgba(242,245,240,0.1)] rounded-2xl",
    header:
      "bg-[#060806] text-[#F2F5F0] border-b border-[rgba(242,245,240,0.08)]",
    headerName:
      "font-t2-mono text-[11px] uppercase tracking-[0.18em] text-[#7EE04B]",
    avatar:
      "rounded-full bg-[rgba(126,224,75,0.12)] text-[#7EE04B] border-2 border-[rgba(126,224,75,0.4)]",
    statusDot: "bg-[#7EE04B]",
    statusText: "text-[#F2F5F0]/60",
    arena: "bg-[#0E120E]",
    userBubble: "bg-[#7EE04B] text-[#060806] rounded-2xl rounded-tr-sm",
    conciergeBubble:
      "bg-[#141A14] text-[#F2F5F0] rounded-2xl rounded-tl-sm border border-[rgba(242,245,240,0.08)]",
    userTime: "text-[#060806]/60",
    conciergeTime: "text-[#F2F5F0]/50",
    typingDot: "bg-[#F2F5F0]/50",
    quickWrap: "border-t border-[rgba(242,245,240,0.08)] bg-[#0E120E]",
    quickLabel: "text-[#F2F5F0]/50",
    quickBtn:
      "border border-[rgba(242,245,240,0.2)] text-[#F2F5F0] rounded-full bg-transparent hover:bg-[#7EE04B] hover:text-[#060806] hover:border-[#7EE04B]",
    inputWrap: "border-t border-[rgba(242,245,240,0.08)] bg-[#0E120E]",
    input:
      "bg-[#141A14] border border-[rgba(242,245,240,0.14)] rounded-full text-[#F2F5F0] placeholder-[#F2F5F0]/40 focus:ring-2 focus:ring-[#7EE04B]/25 focus:border-[#7EE04B]",
    send: "bg-[#7EE04B] text-[#060806] rounded-full",
  },

  /* T3 HAVEN — pale sage, eucalyptus, soft glass and generous radii */
  t3: {
    fab: "bg-[#566E61] text-[#F2F6EE] rounded-full shadow-[0_18px_48px_-20px_rgba(46,59,52,0.5)] hover:bg-[#4a6154] transition-colors",
    dot: "bg-[#C97E5D] border-[#F2F6EE]",
    panel:
      "bg-[#F2F6EE]/95 backdrop-blur-xl border border-white/70 rounded-[1.5rem]",
    header: "bg-[#566E61] text-[#F2F6EE]",
    headerName: "text-sm font-light tracking-wide",
    avatar:
      "rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30",
    statusDot: "bg-[#C97E5D]",
    statusText: "text-[#F2F6EE]/80",
    arena: "bg-[#F2F6EE]",
    userBubble: "bg-[#566E61] text-[#F2F6EE] rounded-2xl rounded-tr-sm",
    conciergeBubble:
      "bg-white text-[#2E3B34] rounded-2xl rounded-tl-sm border border-white",
    userTime: "text-[#F2F6EE]/70",
    conciergeTime: "text-[#2E3B34]/50",
    typingDot: "bg-[#6D8B7D]",
    quickWrap: "border-t border-[rgba(109,139,125,0.28)] bg-white/50",
    quickLabel: "text-[#47594F]",
    quickBtn:
      "border border-[rgba(109,139,125,0.4)] text-[#2E3B34] rounded-full bg-white/60 hover:bg-[#566E61] hover:text-[#F2F6EE] hover:border-[#566E61]",
    inputWrap: "border-t border-[rgba(109,139,125,0.28)] bg-[#F2F6EE]",
    input:
      "bg-white border border-[rgba(109,139,125,0.35)] rounded-full text-[#2E3B34] placeholder-[#2E3B34]/40 focus:ring-2 focus:ring-[#566E61]/25 focus:border-[#566E61]",
    send: "bg-[#566E61] text-[#F2F6EE] rounded-full",
  },
};

function useTemplateTheme(): ChatTheme {
  const pathname = usePathname();
  const [key, setKey] = useState<ThemeKey>("default");

  useEffect(() => {
    if (document.querySelector(".t1-root")) setKey("t1");
    else if (document.querySelector(".t2p")) setKey("t2");
    else if (document.querySelector(".t3-haven")) setKey("t3");
    else setKey("default");
  }, [pathname]);

  return THEMES[key];
}

export default function ChatConcierge() {
  const theme = useTemplateTheme();
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
        aria-label={isOpen ? "Close chat" : "Chat with us"}
        className={`fixed bottom-[104px] right-4 md:bottom-6 md:right-6 z-40 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-300 ${theme.fab}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Pulsing Notification Dot */}
        <motion.div
          className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 ${theme.dot}`}
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

      {/* Expandable Concierge Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-[172px] right-4 md:bottom-24 md:right-6 z-40 w-80 md:w-96 h-[500px] max-h-[60vh] md:max-h-[80vh] shadow-2xl flex flex-col overflow-hidden ${theme.panel}`}
          >
            {/* Header Block */}
            <div className={`px-6 py-4 ${theme.header}`}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div
                  className={`relative w-12 h-12 flex items-center justify-center text-lg font-semibold ${theme.avatar}`}
                >
                  <span>E</span>
                  {/* Active Status Indicator */}
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white ${theme.statusDot}`}
                  />
                </div>

                {/* Concierge Info */}
                <div>
                  <h3 className={theme.headerName}>
                    Elena — Practice Concierge
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full animate-pulse ${theme.statusDot}`}
                    />
                    <span
                      className={`text-[10px] uppercase tracking-wider font-medium ${theme.statusText}`}
                    >
                      Online &amp; Ready to Assist
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Arena */}
            <div className={`flex-1 p-4 overflow-y-auto space-y-3 ${theme.arena}`}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 shadow-sm ${
                      message.sender === "user"
                        ? theme.userBubble
                        : theme.conciergeBubble
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <span
                      className={`text-[10px] mt-1 block ${
                        message.sender === "user"
                          ? theme.userTime
                          : theme.conciergeTime
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
                  <div className={`px-4 py-3 shadow-sm ${theme.conciergeBubble}`}>
                    <div className="flex items-center gap-1">
                      {[0, 0.2, 0.4].map((delay) => (
                        <motion.div
                          key={delay}
                          className={`w-2 h-2 rounded-full ${theme.typingDot}`}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay }}
                        />
                      ))}
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
                className={`px-4 py-3 ${theme.quickWrap}`}
              >
                <p
                  className={`text-[10px] uppercase tracking-wider font-medium mb-2 ${theme.quickLabel}`}
                >
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <motion.button
                      key={reply.id}
                      onClick={() => handleQuickReply(reply.action)}
                      className={`text-xs px-4 py-2 transition-all duration-300 shadow-sm ${theme.quickBtn}`}
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
            <form onSubmit={handleSubmit} className={`p-4 ${theme.inputWrap}`}>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask our concierge anything..."
                  className={`flex-1 px-4 py-3 text-sm focus:outline-none transition-all ${theme.input}`}
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  aria-label="Send message"
                  className={`w-10 h-10 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all ${theme.send}`}
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
