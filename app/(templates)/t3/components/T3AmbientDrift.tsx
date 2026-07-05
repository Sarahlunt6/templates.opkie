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
      <div
        className="t3-drift-a absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.55]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(109,139,125,0.2) 0%, rgba(109,139,125,0.07) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="t3-drift-b absolute -bottom-[25%] -right-[20%] h-[75vmax] w-[75vmax] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(231,224,210,0.45) 0%, rgba(231,224,210,0.16) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="t3-drift-a absolute top-[20%] right-[-10%] h-[50vmax] w-[50vmax] rounded-full opacity-[0.4]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(242,246,238,0.6) 0%, rgba(232,239,227,0.2) 50%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}
