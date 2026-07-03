"use client";

/**
 * T1 Maison — editorial cursor.
 *
 * A small brass dot that lerps behind the pointer and morphs contextually:
 *   - over links / buttons it grows slightly
 *   - over elements carrying data-cursor="view" | "turn" | "drag" | …
 *     it becomes a circled italic Fraunces label
 *   - over native inputs / iframes it retires and returns the OS cursor
 *
 * Fine pointers only. Disappears entirely on touch devices and under
 * prefers-reduced-motion. Components opt in declaratively via a
 * data-cursor attribute; imperative overrides are available through
 * the useT1Cursor() context for edge cases.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { T1_EASE } from "./T1Motion";

type CursorMode = "dot" | "grow" | "label" | "hidden";

interface CursorSnapshot {
  mode: CursorMode;
  label: string | null;
}

interface T1CursorContextValue {
  enabled: boolean;
  /** imperative override — pass null to release back to hover detection */
  setCursor: (snapshot: CursorSnapshot | null) => void;
}

const T1CursorContext = createContext<T1CursorContextValue>({
  enabled: false,
  setCursor: () => {},
});

export const useT1Cursor = () => useContext(T1CursorContext);

/** Elements that grow the dot without a label */
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], summary, label, input[type='range']";

/** Elements where the native cursor / caret must survive untouched */
const NATIVE_SELECTOR =
  "input:not([type='range']), textarea, select, iframe, [data-cursor-native]";

const DOT = 10;
const GROW = 26;
const LABEL = 84;

function EditorialCursor({ override }: { override: CursorSnapshot | null }) {
  const [snap, setSnap] = useState<CursorSnapshot>({
    mode: "dot",
    label: null,
  });
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.55 });

  useEffect(() => {
    const applySnap = (next: CursorSnapshot) =>
      setSnap((prev) =>
        prev.mode === next.mode && prev.label === next.label ? prev : next
      );

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (target.closest(NATIVE_SELECTOR)) {
        applySnap({ mode: "hidden", label: null });
        return;
      }
      const labelled = target.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        const label = labelled.dataset.cursor || null;
        applySnap(
          label ? { mode: "label", label } : { mode: "grow", label: null }
        );
        return;
      }
      if (target.closest(INTERACTIVE_SELECTOR)) {
        applySnap({ mode: "grow", label: null });
        return;
      }
      applySnap({ mode: "dot", label: null });
    };

    const onOut = (e: PointerEvent) => {
      // pointer left the window, or slipped into an iframe
      if (
        !e.relatedTarget ||
        (e.relatedTarget instanceof Element &&
          e.relatedTarget.tagName === "IFRAME")
      ) {
        setVisible(false);
      }
    };

    const onLeaveDoc = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerout", onOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveDoc);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
      document.documentElement.removeEventListener("mouseleave", onLeaveDoc);
    };
  }, [x, y]);

  const active = override ?? snap;
  const mode: CursorMode = visible ? active.mode : "hidden";
  const size = mode === "label" ? LABEL : mode === "grow" ? GROW : DOT;

  return (
    <motion.div
      aria-hidden="true"
      className="t1-cursor"
      style={{ x: springX, y: springY }}
    >
      <motion.div
        className="t1-cursor-core"
        animate={{
          width: size,
          height: size,
          opacity: mode === "hidden" ? 0 : 1,
          scale: mode === "hidden" ? 0.4 : 1,
          backgroundColor:
            mode === "label" ? "rgba(247,245,240,0.92)" : "#9C7E46",
          borderColor:
            mode === "label" ? "rgba(156,126,70,0.75)" : "rgba(156,126,70,0)",
        }}
        transition={{ duration: 0.5, ease: T1_EASE }}
      >
        <AnimatePresence>
          {mode === "label" && active.label && (
            <motion.span
              key={active.label}
              className="t1-cursor-label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.1 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {active.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export default function T1CursorProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [enabled, setEnabled] = useState(false);
  const [override, setOverride] = useState<CursorSnapshot | null>(null);
  const overrideRef = useRef(override);
  overrideRef.current = override;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  const setCursor = useCallback((snapshot: CursorSnapshot | null) => {
    setOverride(snapshot);
  }, []);

  const value = useMemo(
    () => ({ enabled, setCursor }),
    [enabled, setCursor]
  );

  return (
    <T1CursorContext.Provider value={value}>
      <div
        style={{ display: "contents" }}
        className={enabled ? "t1-cursor-zone" : undefined}
      >
        {children}
      </div>
      {enabled && <EditorialCursor override={override} />}
    </T1CursorContext.Provider>
  );
}
