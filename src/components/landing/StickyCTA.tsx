import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? window.scrollY / scrollable : 0;
      setShow(depth >= 0.4);
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
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-all duration-500 ${
        show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
      aria-hidden={!show}
    >
      <div className="pointer-events-auto mx-3 mb-3 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-bg-dark/85 px-4 py-3 shadow-[0_20px_50px_rgb(0,0,0,0.3)] backdrop-blur-xl md:mx-auto md:max-w-xl md:px-6">
        <div className="text-xs md:text-sm">
          <div className="font-semibold text-text-dark-primary">
            Secure Your Protection — AED 499
          </div>
          <div className="text-[11px] text-text-muted-dark md:text-xs">
            Single transparent fee · 24h turnaround
          </div>
        </div>
        <a
          href="#vault"
          className="inline-flex items-center gap-1.5 rounded-full bg-action-accent px-4 py-2 text-sm font-bold text-bg-dark transition-transform duration-300 hover:scale-[1.03]"
        >
          Unlock <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
