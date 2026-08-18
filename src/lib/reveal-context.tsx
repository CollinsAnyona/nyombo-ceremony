"use client";
import { createContext, useContext, useState, ReactNode } from "react";

const Ctx = createContext<{ revealed: boolean; reveal: () => void }>({
  revealed: false,
  reveal: () => {},
});

export function RevealProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <Ctx.Provider value={{ revealed, reveal: () => setRevealed(true) }}>
      {children}
    </Ctx.Provider>
  );
}

export const useRevealed = () => useContext(Ctx);
