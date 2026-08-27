"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Ready = { ready: boolean; setReady: (v: boolean) => void };

const ReadyContext = createContext<Ready>({ ready: true, setReady: () => {} });

export function useAppReady() {
  return useContext(ReadyContext).ready;
}

export function useSetAppReady() {
  return useContext(ReadyContext).setReady;
}

export function ReadyProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const value = useMemo(() => ({ ready, setReady }), [ready]);
  return <ReadyContext.Provider value={value}>{children}</ReadyContext.Provider>;
}
