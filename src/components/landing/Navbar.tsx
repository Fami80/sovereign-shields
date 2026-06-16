import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { emitUi, smoothScrollTo } from "@/lib/ui-store";

type NavItem = { label: string; action: () => void };

const buildLinks = (navigate: (opts: { to: string }) => void): NavItem[] => [
  { label: "Services", action: () => smoothScrollTo("#features") },
  { label: "Knowledge Base", action: () => smoothScrollTo("#knowledge") },
  { label: "About", action: () => smoothScrollTo("#about") },
  { label: "Contact", action: () => navigate({ to: "/contact" }) },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const links = buildLinks(navigate);

  const closeMenu = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onBrand = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("#");
    emitUi("reset-home");
  };

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(30,10,14,0.85)",
        borderBottom: "1px solid rgba(212,168,130,0.12)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          onClick={onBrand}
          className="font-display text-xl tracking-tight focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[#D4A882] focus-visible:underline-offset-4"
          style={{ color: "#EDD8B8", fontWeight: 600 }}
        >
          UAEwork<span style={{ color: "#D4A882", fontStyle: "italic" }}>rights</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <button
              key={l.label}
              onClick={l.action}
              className="font-sans text-sm transition-colors focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[#D4A882] focus-visible:underline-offset-4"
              style={{ color: "rgba(237,216,184,0.7)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#EDD8B8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(237,216,184,0.7)")}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full px-5 py-2 font-sans text-sm motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px] sm:inline-flex"
            style={{ backgroundColor: "#D4A882", color: "#1E0A0E", fontWeight: 500 }}
          >
            Book a review
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="rounded-full p-2 focus-visible:[outline:2px_solid_#D4A882] focus-visible:[outline-offset:2px] lg:hidden"
            style={{ border: "1px solid rgba(212,168,130,0.25)", color: "#EDD8B8" }}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="backdrop-blur-md lg:hidden"
          style={{
            backgroundColor: "rgba(30,10,14,0.97)",
            borderTop: "1px solid rgba(212,168,130,0.12)",
          }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => {
                  l.action();
                  setOpen(false);
                }}
                className="rounded-lg px-3 py-3 text-left font-sans text-sm focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[#D4A882]"
                style={{ color: "rgba(237,216,184,0.7)" }}
              >
                {l.label}
              </button>
            ))}
            <a
              href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-3 font-sans text-sm focus-visible:[outline:2px_solid_#EDD8B8] focus-visible:[outline-offset:2px] sm:hidden"
              style={{ backgroundColor: "#D4A882", color: "#1E0A0E", fontWeight: 500 }}
            >
              Book a review
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
