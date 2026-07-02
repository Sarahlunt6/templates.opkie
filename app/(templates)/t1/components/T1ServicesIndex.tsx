"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Fade } from "./T1Motion";

export interface ServiceEntry {
  title: string;
  description: string;
  image: string;
}

interface T1ServicesIndexProps {
  services: ServiceEntry[];
  alsoPracticed: string[];
}

/**
 * Chapter II — the services set as an editorial index.
 * Hovering a row slides a brass rule across its baseline and floats a
 * plate photograph that trails the cursor. On touch and small screens
 * the plates render inline instead.
 */
export default function T1ServicesIndex({
  services,
  alsoPracticed,
}: T1ServicesIndexProps) {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const floatX = useSpring(cursorX, { stiffness: 120, damping: 20 });
  const floatY = useSpring(cursorY, { stiffness: 120, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced) return;
    cursorX.set(e.clientX + 28);
    cursorY.set(e.clientY - 110);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className="relative mt-14 lg:mt-20"
    >
      {/* Floating plate — desktop pointer devices only */}
      <AnimatePresence>
        {active !== null && !reduced && (
          <motion.div
            key={active}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-30 hidden w-72 lg:block"
            style={{ x: floatX, y: floatY }}
            initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-[#16130F]/10 bg-[#EFEAE0] shadow-[0_30px_60px_-25px_rgba(22,19,15,0.45)]">
              <Image
                src={services[active].image}
                alt=""
                fill
                sizes="288px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 bg-[#F7F5F0] px-1 font-sans text-[10px] uppercase tracking-[0.24em] text-[#6B675E]">
              Plate {String(active + 1).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <ol>
        {services.map((service, i) => (
          <li key={service.title}>
            <Fade y={20} delay={i * 0.05}>
              <article
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="group relative border-t border-[#16130F]/15 py-8 md:py-10"
              >
                {/* Brass rule that slides in along the top hairline */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-[#9C7E46] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:items-baseline md:gap-8">
                  <span className="font-t1-display text-sm italic text-[#9C7E46] md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-t1-display text-3xl font-light leading-tight text-[#16130F] transition-colors duration-500 group-hover:text-[#5E2A2B] md:col-span-4 md:text-4xl lg:text-5xl">
                    {service.title}
                  </h3>
                  <p className="max-w-md font-sans text-sm leading-relaxed text-[#6B675E] md:col-span-5 md:text-base">
                    {service.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden text-right font-t1-display text-2xl italic text-[#9C7E46] opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:col-span-2 md:block"
                  >
                    →
                  </span>
                </div>

                {/* Inline plate for touch / small screens */}
                <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden lg:hidden">
                  <Image
                    src={service.image}
                    alt={`${service.title} — photographed for the practice portfolio`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 0px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              </article>
            </Fade>
          </li>
        ))}
      </ol>

      <div className="border-t border-[#16130F]/15 pt-6">
        <p className="font-sans text-sm leading-relaxed text-[#6B675E]">
          <span className="t1-eyebrow mr-4">Also practiced</span>
          {alsoPracticed.join("  ·  ")}
        </p>
      </div>
    </div>
  );
}
