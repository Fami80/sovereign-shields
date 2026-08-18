import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { JurisdictionRibbon } from "@/components/landing/JurisdictionRibbon";
import { AudienceBento } from "@/components/landing/AudienceBento";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { About } from "@/components/landing/About";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { Navbar } from "@/components/landing/Navbar";
import { KnowledgeBase } from "@/components/landing/KnowledgeBase";
import ogImage from "@/assets/og-hero.jpg";

// Lazy: framer-motion + motion-dom (~130KB) is only needed for this one
// below-the-fold widget's count-up animation. Splitting it out of the main
// homepage bundle keeps that weight off the critical parse/execute path.
const ExposureCalculator = lazy(() =>
  import("@/components/landing/ExposureCalculator").then((m) => ({ default: m.ExposureCalculator })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAE Employment Contract & Settlement Review | UAEworkrights" },
      { name: "description", content: "Employment contract review before you start or settlement letter review before you leave. Written findings across all UAE jurisdictions within 48 hours. AED 999." },
      { property: "og:title", content: "UAE Employment Contract & Settlement Review | UAEworkrights" },
      { property: "og:description", content: "Employment contract review before you start or settlement letter review before you leave. Written findings across all UAE jurisdictions within 48 hours. AED 999." },
      { property: "og:url", content: "https://uaeworkrights.com/" },
      { property: "og:image", content: `https://uaeworkrights.com${ogImage}` },
      { property: "og:image:alt", content: "UAE employment contract and settlement review by UAEworkrights" },
      { name: "twitter:image", content: `https://uaeworkrights.com${ogImage}` },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;
    // Wait a tick for sections to mount
    const id = window.setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <main className="min-h-dvh bg-bg-light text-text-light-primary">

      <Navbar />
      <Hero />
      <JurisdictionRibbon />
      <Suspense fallback={null}>
        <ExposureCalculator />
      </Suspense>
      <HowItWorks />
      <AudienceBento />
      <KnowledgeBase />
      <Testimonials />
      <About />
      <SiteFooter />
      <StickyCTA />
    </main>
  );
}
