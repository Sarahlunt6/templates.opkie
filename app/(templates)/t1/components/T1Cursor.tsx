"use client";

/**
 * T1 PRESS — the bespoke editorial cursor is retired.
 *
 * A printed page does not have a cursor. This file keeps the previous
 * public API (T1CursorProvider default export + useT1Cursor hook) as
 * inert pass-throughs so any lingering imports keep compiling; the
 * provider is no longer mounted by page.tsx.
 */

import { createContext, useContext, type ReactNode } from "react";

type CursorMode = "dot" | "grow" | "label" | "hidden";

interface CursorSnapshot {
  mode: CursorMode;
  label: string | null;
}

interface T1CursorContextValue {
  enabled: boolean;
  /** no-op — the editorial cursor no longer exists */
  setCursor: (snapshot: CursorSnapshot | null) => void;
}

const T1CursorContext = createContext<T1CursorContextValue>({
  enabled: false,
  setCursor: () => {},
});

export const useT1Cursor = () => useContext(T1CursorContext);

export default function T1CursorProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
