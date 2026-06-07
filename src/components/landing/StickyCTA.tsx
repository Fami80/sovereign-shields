import { useEffect, useState } from "react";

export function StickyCTA() {
  const [show, setShow] = useState(false);

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

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      style={{
        backgroundColor: "#1E0A0E",
        borderTop: "1px solid rgba(212,168,130,0.2)",
      }}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-3 md:flex-row">
        <div
          className="text-[13px] font-light"
          style={{ fontFamily: "var(--font-sans)", color: "rgba(237,216,184,0.6)" }}
        >
          Review your settlement
        </div>
        <div
          className="hidden text-[13px] font-medium md:block"
          style={{ fontFamily: "var(--font-sans)", color: "#EDD8B8" }}
        >
          AED 999 · Single transparent fee · 48h turnaround
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-[13px] font-medium transition-transform duration-300 hover:scale-[1.03]"
          style={{
            fontFamily: "var(--font-sans)",
            backgroundColor: "#D4A882",
            color: "#1E0A0E",
          }}
        >
          Book now →
        </a>
      </div>
    </div>
  );
}
