import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type Persona = "employee" | "employer";

type Ctx = {
  persona: Persona;
  setPersona: (p: Persona) => void;
};

const PersonaContext = createContext<Ctx | null>(null);

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [persona, setPersona] = useState<Persona>("employee");
  const value = useMemo(() => ({ persona, setPersona }), [persona]);
  return <PersonaContext.Provider value={value}>{children}</PersonaContext.Provider>;
}

export function usePersona() {
  const ctx = useContext(PersonaContext);
  if (!ctx) throw new Error("usePersona must be used inside PersonaProvider");
  return ctx;
}
