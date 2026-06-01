import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 animate-slide-up md:hidden">
      <div className="mx-3 mb-3 flex items-center justify-between gap-3 rounded-full border border-white/10 bg-bg-dark px-4 py-3 shadow-[0_20px_50px_rgb(0,0,0,0.3)]">
        <div className="text-xs">
          <div className="font-semibold text-text-dark-primary">Secure Your Protection</div>
          <div className="text-text-muted-dark">Single fee · AED 499</div>
        </div>
        <a
          href="#vault"
          className="inline-flex items-center gap-1.5 rounded-full bg-action-accent px-4 py-2 text-sm font-bold text-bg-dark"
        >
          Unlock <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
