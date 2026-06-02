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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sovereign — UAE Workrights Triage | AED 499" },
      { name: "description", content: "Premium UAE employment law triage. MOHRE, DIFC, ADGM, VARA & SCA compliant. Secure your settlement review for AED 499." },
      { property: "og:title", content: "Sovereign — UAE Workrights Triage" },
      { property: "og:description", content: "Premium UAE employment law triage. Single AED 499 fee." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-bg-light text-text-light-primary">
      <Hero />
      <JurisdictionRibbon />
      <AudienceBento />
      <ExposureCalculator />
      <EscalationTimeline />
      <DirectorVault />
      <Testimonials />
      <SiteFooter />
      <StickyCTA />
    </main>
  );
}
