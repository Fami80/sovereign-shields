import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Hero } from "@/components/landing/Hero";
import { JurisdictionRibbon } from "@/components/landing/JurisdictionRibbon";
import { AudienceBento } from "@/components/landing/AudienceBento";
import { ExposureCalculator } from "@/components/landing/ExposureCalculator";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { About } from "@/components/landing/About";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { Navbar } from "@/components/landing/Navbar";
import { KnowledgeBase } from "@/components/landing/KnowledgeBase";
import ogImage from "@/assets/og-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAE Settlement Letter Review in 48 Hours | UAEworkrights" },
      { name: "description", content: "Got a UAE settlement letter? Most contain errors. We check it against UAE Labour Law across MOHRE, DIFC and ADGM, with written findings in 48 hours. AED 999." },
      { property: "og:title", content: "UAE Settlement Letter Review in 48 Hours | UAEworkrights" },
      { property: "og:description", content: "Got a UAE settlement letter? Most contain errors. We check it against UAE Labour Law across MOHRE, DIFC and ADGM, with written findings in 48 hours. AED 999." },
      { property: "og:url", content: "https://uaeworkrights.com/" },
      { property: "og:image", content: `https://uaeworkrights.com${ogImage}` },
      { property: "og:image:alt", content: "UAE settlement letter review by UAEworkrights" },
      { name: "twitter:image", content: `https://uaeworkrights.com${ogImage}` },
    ],
    links: [
      { rel: "canonical", href: "https://uaeworkrights.com/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
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
      <ExposureCalculator />
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
