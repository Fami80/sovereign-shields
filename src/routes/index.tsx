import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UAE Settlement Letter Review | UAEworkrights" },
      { name: "description", content: "Got a UAE settlement letter? Most have errors. We review it against UAE labour law — written findings in 48 hours. AED 999 flat fee." },
      { property: "og:title", content: "UAE Settlement Letter Review | UAEworkrights" },
      { property: "og:description", content: "Got a UAE settlement letter? Most have errors. We review it against UAE labour law — written findings in 48 hours. AED 999 flat fee." },
      { property: "og:url", content: "https://uaeworkrights.com/" },
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
  return (
    <main className="min-h-screen bg-bg-light text-text-light-primary">
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
