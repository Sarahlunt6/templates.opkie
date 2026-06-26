/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "var(--primary-brand)",
          accent: "var(--secondary-accent)",
          mainText: "var(--text-main)",
          canvas: "var(--bg-canvas)",
        },
        emergency: "var(--emergency-alert)",
        success: "var(--success-indicator)",
        neutral: {
          border: "var(--neutral-border)",
          muted: "var(--neutral-muted)",
        },
        grid: {
          line: "var(--grid-line)",
        },
      },
      fontFamily: {
        // Default families
        serif: ["var(--font-prestige)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // Template-specific premium families
        prestige: ["var(--font-prestige)", "Cormorant Garamond", "Georgia", "serif"],
        innovator: ["var(--font-innovator)", "Space Grotesk", "ui-sans-serif", "sans-serif"],
        sanctuary: ["var(--font-sanctuary)", "Outfit", "ui-sans-serif", "sans-serif"],
        // T2 Premium Cinematic Typography System
        // Display: Elegant serif for headlines - editorial gravitas
        "t2-display": ["var(--font-t2-display)", "Playfair Display", "Georgia", "serif"],
        // Heading: Modern geometric sans for subheadings - tech precision
        "t2-heading": ["var(--font-t2-heading)", "Inter", "ui-sans-serif", "sans-serif"],
        // Body: Highly readable geometric sans for body copy
        "t2-body": ["var(--font-t2-body)", "Inter", "ui-sans-serif", "sans-serif"],
        // Mono: Technical data and UI labels
        "t2-mono": ["var(--font-t2-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        // Fluid typography using clamp()
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.35vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.6vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.25rem + 1.25vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
        "fluid-5xl": "clamp(3rem, 2rem + 5vw, 4rem)",
        "fluid-6xl": "clamp(3.75rem, 2.5rem + 6.25vw, 5rem)",
        // T2 Cinematic Display Scale - Editorial Impact
        "t2-hero": ["clamp(2.5rem, 2rem + 4vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "500" }],
        "t2-display": ["clamp(2.5rem, 2rem + 4vw, 5rem)", { lineHeight: "1.0", letterSpacing: "-0.02em", fontWeight: "500" }],
        "t2-headline": ["clamp(1.75rem, 1.5rem + 2vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "t2-subhead": ["clamp(1.125rem, 1rem + 0.5vw, 1.375rem)", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "t2-body-lg": ["clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)", { lineHeight: "1.7", letterSpacing: "0" }],
        "t2-caption": ["0.8125rem", { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "500" }],
        "t2-micro": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "600" }],
      },
      spacing: {
        // Fluid spacing
        "fluid-4": "clamp(0.75rem, 0.5rem + 1.25vw, 1rem)",
        "fluid-6": "clamp(1rem, 0.75rem + 1.25vw, 1.5rem)",
        "fluid-8": "clamp(1.5rem, 1rem + 2.5vw, 2rem)",
        "fluid-12": "clamp(2rem, 1.5rem + 2.5vw, 3rem)",
        "fluid-16": "clamp(2.5rem, 2rem + 2.5vw, 4rem)",
        "fluid-20": "clamp(3rem, 2rem + 5vw, 5rem)",
        "fluid-24": "clamp(4rem, 3rem + 5vw, 6rem)",
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/4": "3 / 4",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up-delay": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards",
        "scroll": "scroll 30s linear infinite",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "magnetic-hover": "magneticPulse 0.3s ease-out",
        "reveal-text": "revealText 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spring-bounce": "springBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        // Ambient drift animations for hero glow elements
        "drift": "drift 12s ease-in-out infinite",
        "drift-reverse": "drift 12s ease-in-out infinite reverse",
        "drift-slow": "drift 15s ease-in-out infinite",
        "marquee": "scroll 30s linear infinite",
        // T2 Cinematic Animations
        "t2-fade-up": "t2FadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "t2-fade-up-stagger": "t2FadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) var(--stagger-delay, 0s) forwards",
        "t2-scale-reveal": "t2ScaleReveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "t2-line-expand": "t2LineExpand 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "t2-glow-pulse": "t2GlowPulse 4s ease-in-out infinite",
        "t2-gradient-shift": "t2GradientShift 8s ease-in-out infinite",
        "t2-text-shimmer": "t2TextShimmer 3s ease-in-out infinite",
        "t2-video-zoom": "t2VideoZoom 20s ease-in-out infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        magneticPulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1)" },
        },
        revealText: {
          "0%": { clipPath: "inset(0 100% 0 0)", opacity: "0" },
          "100%": { clipPath: "inset(0 0% 0 0)", opacity: "1" },
        },
        springBounce: {
          "0%": { transform: "scale(1)" },
          "40%": { transform: "scale(1.08)" },
          "60%": { transform: "scale(0.98)" },
          "100%": { transform: "scale(1)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(20px, -15px)" },
          "50%": { transform: "translate(-10px, 20px)" },
          "75%": { transform: "translate(-20px, -10px)" },
        },
        // T2 Cinematic Keyframes
        t2FadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        t2ScaleReveal: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        t2LineExpand: {
          "0%": { transform: "scaleX(0)", transformOrigin: "left" },
          "100%": { transform: "scaleX(1)", transformOrigin: "left" },
        },
        t2GlowPulse: {
          "0%, 100%": { opacity: "0.4", filter: "blur(100px)" },
          "50%": { opacity: "0.6", filter: "blur(120px)" },
        },
        t2GradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        t2TextShimmer: {
          "0%, 100%": { backgroundPosition: "-200% center" },
          "50%": { backgroundPosition: "200% center" },
        },
        t2VideoZoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "magnetic": "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
    },
  },
  plugins: [],
};
