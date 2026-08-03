"use client";

/**
 * Ambient background — vast, blurred eucalyptus and sand gradients drifting
 * on 90–110s CSS cycles over the sage canvas, building the soft-greenery
 * atmosphere with CSS only (no external imagery). Static under
 * prefers-reduced-motion (handled in t3-theme.css).
 */
export default function T3AmbientDrift() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* opacities + core alphas tuned ~1.8x so the blooms register as
          gentle atmosphere on a bright screen without competing with copy */}
      <div
        className="t3-drift-a absolute -top-[20%] -left-[15%] h-[80vmax] w-[80vmax] rounded-full opacity-[0.85]"
        style={{
          background:
            "radial-gradient(circle at center, rgb(var(--t3-euc-rgb) / 0.3) 0%, rgb(var(--t3-euc-rgb) / 0.11) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="t3-drift-b absolute -bottom-[25%] -right-[20%] h-[85vmax] w-[85vmax] rounded-full opacity-[0.8]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(231,224,210,0.6) 0%, rgba(231,224,210,0.22) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="t3-drift-a absolute top-[20%] right-[-10%] h-[55vmax] w-[55vmax] rounded-full opacity-[0.65]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(248,250,244,0.75) 0%, rgba(232,239,227,0.28) 50%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
