"use client";

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
import { buildBrandStylesheet, type BrandColors } from "@/lib/brand/templates";
import { normalizeHex } from "@/lib/brand/color";

/* ------------------------------------------------------------------ *
 *  Brand Studio — state.
 *
 *  Everything a client types or drops here stays in their browser tab.
 *  No upload, no request, no database: the logo becomes a data URL in
 *  memory, the colors become one <style> element, and closing the tab
 *  ends it. That is a deliberate product decision, not a shortcut — a
 *  prospect trying on five templates should not be leaving an account
 *  behind to do it.
 * ------------------------------------------------------------------ */

export interface BrandLogo {
  /** Data URL — read locally with FileReader, never sent anywhere. */
  src: string;
  /** Intrinsic ratio, so each template can size the mark to its own scale. */
  aspect: number;
  /** Measured at upload: true when the mark would disappear on a dark ground. */
  dark: boolean;
  name: string;
}

export interface BrandState {
  colors: BrandColors;
  logo: BrandLogo | null;
  /** False until the client changes something — templates show as designed. */
  active: boolean;
}

interface BrandStudioValue extends BrandState {
  setColor: (role: keyof BrandColors, hex: string) => void;
  setColors: (colors: BrandColors) => void;
  setLogo: (logo: BrandLogo | null) => void;
  reset: () => void;
  /** True once the provider has read sessionStorage — gates logo rendering. */
  hydrated: boolean;
}

const STORAGE_KEY = "opkie.brand-studio";
const STYLE_ID = "opkie-brand-studio";
const CHANNEL = "opkie.brand-studio";

type SyncMessage =
  | { type: "state"; state: BrandState }
  | { type: "request" };

/** Neutral seeds, shown before a client has picked anything. */
const SEED: BrandColors = { primary: "#0f766e", accent: "#38bdf8" };

const BrandStudioContext = createContext<BrandStudioValue | null>(null);

/**
 * True when this document is running inside one of the hub's preview
 * plates rather than as the page the client is actually looking at.
 * The plates are same-origin, so this never throws in practice; the
 * guard is there so a hostile embed degrades to "not framed" instead
 * of taking the page down.
 */
export function isFramed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

function readStored(): BrandState | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<BrandState>;
    const primary = normalizeHex(parsed.colors?.primary ?? "");
    const accent = normalizeHex(parsed.colors?.accent ?? "");
    if (!primary || !accent) return null;
    return {
      colors: { primary, accent },
      logo: parsed.logo?.src ? parsed.logo : null,
      active: Boolean(parsed.active),
    };
  } catch {
    return null;
  }
}

export default function BrandStudioProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, setState] = useState<BrandState>({
    colors: SEED,
    logo: null,
    active: false,
  });
  const [hydrated, setHydrated] = useState(false);

  /* Cross-tab sync. A new tab opened from the hub inherits the session
     outright, but a tab opened any other way — typed, bookmarked, or
     already sitting open before the client picked a color — would start
     blank. This channel closes that gap: a fresh tab asks, whoever has
     the brand answers, and later edits fan out to every tab at once.
     Declared before the restore effect so the channel exists when that
     effect needs to ask. Nothing here is persisted. */
  const channelRef = useRef<BroadcastChannel | null>(null);
  /* The last state we sent or accepted — the guard that stops two tabs
     from echoing the same brand back and forth forever. */
  const syncedRef = useRef<string>("");

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const channel = new BroadcastChannel(CHANNEL);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      const message = event.data;

      if (message?.type === "request") {
        // A new tab is asking. Mirrors stay quiet; the real pages answer.
        if (syncedRef.current && !isFramed()) {
          channel.postMessage({
            type: "state",
            state: JSON.parse(syncedRef.current) as BrandState,
          });
        }
        return;
      }

      if (message?.type === "state" && message.state) {
        const json = JSON.stringify(message.state);
        if (json === syncedRef.current) return;
        syncedRef.current = json;
        setState(message.state);
      }
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, []);

  /* Restore the in-tab session, so moving between templates keeps the
     brand on. Runs once, after mount, to keep SSR markup deterministic. */
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setState(stored);
      syncedRef.current = JSON.stringify(stored);
    } else {
      channelRef.current?.postMessage({ type: "request" } satisfies SyncMessage);
    }
    setHydrated(true);
  }, []);

  /* Fan local edits out to the other tabs. Skipped when the state is one
     we just accepted from another tab, so the two do not trade it back. */
  useEffect(() => {
    if (!hydrated || isFramed()) return;
    const json = JSON.stringify(state);
    if (json === syncedRef.current) return;
    syncedRef.current = json;
    channelRef.current?.postMessage({ type: "state", state } satisfies SyncMessage);
  }, [state, hydrated]);

  /* Same-origin iframes in this tab share our sessionStorage AND receive
     its `storage` events — which is exactly what the hub's live plates
     need. Each plate is a real template document running this provider;
     it listens here and repaints when the client moves a color, with no
     reload and no message plumbing. */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== null && e.key !== STORAGE_KEY) return;
      setState(readStored() ?? { colors: SEED, logo: null, active: false });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* Only the top-level document writes. A framed plate is a read-only
     mirror — letting it write would echo its own state back out and
     fight the panel the client is actually typing into. */
  useEffect(() => {
    if (!hydrated || isFramed()) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* Private mode, or a logo that outgrew the quota. The preview still
         works for this page; it just will not survive a hard reload. */
    }
  }, [state, hydrated]);

  /* The single override sheet. Kept out of React's tree on purpose: it
     has to sit in <head>, after the template stylesheets.

     Note there is no unmount cleanup, deliberately. React double-invokes
     effects, and a teardown that removed the element by id would delete
     the sheet a newer mount had already installed — the preview would
     silently revert. The element is a document-lifetime singleton owned
     by whichever mount ran last; `active` going false is what removes
     it, which is the only removal a client can actually ask for. */
  useEffect(() => {
    if (!state.active) {
      document.getElementById(STYLE_ID)?.remove();
      return;
    }

    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    el.textContent = buildBrandStylesheet(state.colors);
  }, [state.active, state.colors]);

  const setColor = useCallback((role: keyof BrandColors, hex: string) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return;
    setState((prev) => ({
      ...prev,
      active: true,
      colors: { ...prev.colors, [role]: normalized },
    }));
  }, []);

  const setColors = useCallback((colors: BrandColors) => {
    const primary = normalizeHex(colors.primary);
    const accent = normalizeHex(colors.accent);
    if (!primary || !accent) return;
    setState((prev) => ({ ...prev, active: true, colors: { primary, accent } }));
  }, []);

  const setLogo = useCallback((logo: BrandLogo | null) => {
    setState((prev) => ({ ...prev, logo, active: prev.active || Boolean(logo) }));
  }, []);

  const reset = useCallback(() => {
    setState({ colors: SEED, logo: null, active: false });
    try {
      window.sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* nothing to clean up */
    }
  }, []);

  const value = useMemo<BrandStudioValue>(
    () => ({ ...state, hydrated, setColor, setColors, setLogo, reset }),
    [state, hydrated, setColor, setColors, setLogo, reset],
  );

  return (
    <BrandStudioContext.Provider value={value}>
      {children}
    </BrandStudioContext.Provider>
  );
}

/**
 * Read the current preview. Returns null outside the provider so template
 * components stay usable in a scaffolded client site, where the studio is
 * stripped out and there is nothing to preview.
 */
export function useBrandStudio(): BrandStudioValue | null {
  return useContext(BrandStudioContext);
}
