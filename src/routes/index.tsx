import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/landing/Hero";
import { JurisdictionRibbon } from "@/components/landing/JurisdictionRibbon";
import { AudienceBento } from "@/components/landing/AudienceBento";
import { ExposureCalculator } from "@/components/landing/ExposureCalculator";
import { EscalationTimeline } from "@/components/landing/EscalationTimeline";
import { DirectorVault } from "@/components/landing/DirectorVault";
import { Testimonials } from "@/components/landing/Testimonials";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { Navbar } from "@/components/landing/Navbar";
import { KnowledgeBase } from "@/components/landing/KnowledgeBase";
import { AboutDrawer } from "@/components/landing/AboutDrawer";
import { ContactDrawer } from "@/components/landing/ContactDrawer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAEworkrights" },
      { name: "description", content: "Your UAE settlement letter is probably wrong. Senior-counsel triage on gratuity, end-of-service & arbitrary dismissal across MOHRE, DIFC, ADGM, VARA & SCA — AED 499." },
      { property: "og:title", content: "UAEworkrights" },
      { property: "og:description", content: "UAE Labour Law protects both sides. One flat AED 499 triage by senior employment counsel." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-bg-light text-text-light-primary">
      <Navbar />
      <Hero />
      <JurisdictionRibbon />
      <AudienceBento />
      <ExposureCalculator />
      <EscalationTimeline />
      <KnowledgeBase />
      <Testimonials />
      <DirectorVault />
      <SiteFooter />
      <StickyCTA />
      <AboutDrawer />
      <ContactDrawer />
    </main>
  );
}
