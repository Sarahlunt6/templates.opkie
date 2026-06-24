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
