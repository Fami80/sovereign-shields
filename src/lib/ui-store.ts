type Evt = "open-about" | "open-contact" | "reset-home";

const listeners: Record<Evt, Set<() => void>> = {
  "open-about": new Set(),
  "open-contact": new Set(),
  "reset-home": new Set(),
};

export function emitUi(e: Evt) {
  listeners[e].forEach((fn) => fn());
}

export function onUi(e: Evt, cb: () => void) {
  listeners[e].add(cb);
  return () => {
    listeners[e].delete(cb);
  };
}

export function smoothScrollTo(href: string) {
  if (href === "#" || href === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
