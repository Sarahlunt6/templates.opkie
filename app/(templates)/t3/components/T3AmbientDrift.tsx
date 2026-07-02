"use client";

/**
 * Ambient background — two vast, blurred eucalyptus/sand gradients drifting
 * on 90–110s CSS cycles. Replaces the old Three.js particle canvas with
 * something calmer and far cheaper. Static under prefers-reduced-motion
 * (handled in t3-theme.css).
 */
export default function T3AmbientDrift() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="t3-drift-a absolute -top-[20%] -left-[15%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.5]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(109,139,125,0.16) 0%, rgba(109,139,125,0.05) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="t3-drift-b absolute -bottom-[25%] -right-[20%] h-[75vmax] w-[75vmax] rounded-full opacity-[0.55]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(231,224,210,0.5) 0%, rgba(231,224,210,0.18) 45%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
