import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export function StickyCTA() {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const isContactPage = location.pathname === "/contact" || location.pathname === "/privacy" || location.pathname === "/terms";

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? window.scrollY / scrollable : 0;
      setShow(depth >= 0.15);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (isContactPage) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 motion-safe:transition-[translate,opacity] motion-safe:duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{
        backgroundColor: "var(--color-burg-deep)",
        borderTop: "1px solid rgba(212,168,130,0.2)",
      }}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div
          className="hidden text-[13px] font-light md:block"
          style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.6)" }}
        >
          Settlement review
        </div>
        <div
          className="hidden text-[13px] font-medium md:block"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-light)" }}
        >
          AED 999 · Single transparent fee · 48h turnaround
        </div>
        <div
          className="flex items-center gap-2 text-[13px] md:hidden"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-sand-light)" }}
        >
          <span className="font-medium">Review your settlement</span>
        </div>
        <a
          href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] md:px-5"
          style={{
            fontFamily: "var(--font-sans)",
            backgroundColor: "var(--color-sand-warm)",
            color: "var(--color-burg-deep)",
          }}
        >
          <span className="md:hidden">Book now →</span>
          <span className="hidden md:inline">Book now →</span>
        </a>
      </div>
    </div>
  );
}
