import { Star } from "lucide-react";

const ITEMS = [
  { name: "Randa", region: "Dubai — Private Sector", quote: "Recovered three months of withheld gratuity in eleven days. The roadmap was surgical." },
  { name: "Omar K.", region: "Abu Dhabi — ADGM", quote: "The exposure model gave our board the clarity we needed before terminating a regional lead." },
  { name: "Priya N.", region: "Sharjah — Freezone", quote: "Calm, fast and confidential. AED 499 was the best legal spend I've made." },
  { name: "Hassan A.", region: "Dubai — DIFC", quote: "The Director Vault assistant flagged a clause our retained firm missed entirely." },
];

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">Verified Outcomes</p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Trusted across the Emirates.</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((t) => (
          <figure
            key={t.name}
            className="relative flex flex-col overflow-hidden rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-4 select-none font-display text-[110px] leading-none text-action-accent/10"
            >
              &ldquo;
            </span>
            <div className="relative flex gap-0.5" aria-label="5 star verified review">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#E5B83C] text-[#E5B83C]" />
              ))}
            </div>
            <blockquote className="relative mt-4 flex-1 text-sm leading-relaxed text-text-light-primary">"{t.quote}"</blockquote>
            <figcaption className="relative mt-5 border-t border-black/5 pt-4">
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-text-muted-light">{t.region}</div>
            </figcaption>
          </figure>

        ))}
      </div>
    </section>
  );
}
