import { motion } from "framer-motion";
import { User, Building2 } from "lucide-react";
import { usePersona, type Persona } from "@/lib/persona-context";

const OPTIONS: { value: Persona; label: string; Icon: typeof User }[] = [
  { value: "employee", label: "Employee", Icon: User },
  { value: "employer", label: "Employer", Icon: Building2 },
];

export function PersonaToggle() {
  const { persona, setPersona } = usePersona();
  return (
    <div className="flex justify-center">
      <div
        role="tablist"
        aria-label="Choose your perspective"
        className="relative inline-flex items-center rounded-full p-1 backdrop-blur-xl"
        style={{
          background: "rgba(45,16,24,0.55)",
          border: "1px solid rgba(212,168,130,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(237,216,184,0.06)",
        }}
      >
        {OPTIONS.map(({ value, label, Icon }) => {
          const active = persona === value;
          return (
            <button
              key={value}
              role="tab"
              aria-selected={active}
              onClick={() => setPersona(value)}
              className="relative z-10 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-medium transition-colors"
              style={{
                color: active ? "#1E0A0E" : "rgba(237,216,184,0.7)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {active && (
                <motion.span
                  layoutId="persona-pill"
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: "linear-gradient(135deg, #EDD8B8 0%, #D4A882 100%)",
                    boxShadow: "0 6px 20px rgba(212,168,130,0.35)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
