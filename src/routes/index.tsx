import { createFileRoute } from "@tanstack/react-router";
import { JurisdictionRibbon } from "@/components/landing/JurisdictionRibbon";
import { AudienceBento } from "@/components/landing/AudienceBento";
import { ExposureCalculator } from "@/components/landing/ExposureCalculator";
import { DirectorVault } from "@/components/landing/DirectorVault";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { About } from "@/components/landing/About";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { Navbar } from "@/components/landing/Navbar";
import { KnowledgeBase } from "@/components/landing/KnowledgeBase";
import { PersonaProvider } from "@/lib/persona-context";
import { PersonaToggle } from "@/components/landing/PersonaToggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <PersonaProvider>
      <main className="min-h-screen bg-[#1E0A0E] text-text-light-primary">
        <Navbar />
        <JurisdictionRibbon />

        {/* Persona toggle — above the calculator */}
        <div className="mx-auto max-w-6xl px-6 pt-8">
          <PersonaToggle />
        </div>

        {/* Calculator is the hero */}
        <ExposureCalculator />

        <DirectorVault />
        <Testimonials />

        {/* Brochure content tucked into drawers */}
        <section className="bg-[#1E0A0E] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-6">
            <p
              className="mb-6 text-center text-[13px] font-medium uppercase tracking-[2.5px]"
              style={{ color: "rgba(212,168,130,0.6)", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Background · Process · Coverage
            </p>
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem
                value="how"
                className="overflow-hidden rounded-2xl border border-[rgba(212,168,130,0.18)] bg-[#2D1018]/60 backdrop-blur"
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left text-[15px] font-medium hover:no-underline"
                  style={{ color: "#EDD8B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  How the review process works
                </AccordionTrigger>
                <AccordionContent>
                  <HowItWorks />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="services"
                className="overflow-hidden rounded-2xl border border-[rgba(212,168,130,0.18)] bg-[#2D1018]/60 backdrop-blur"
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left text-[15px] font-medium hover:no-underline"
                  style={{ color: "#EDD8B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Services — for both sides of the table
                </AccordionTrigger>
                <AccordionContent>
                  <AudienceBento />
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                value="about"
                className="overflow-hidden rounded-2xl border border-[rgba(212,168,130,0.18)] bg-[#2D1018]/60 backdrop-blur"
              >
                <AccordionTrigger
                  className="px-6 py-5 text-left text-[15px] font-medium hover:no-underline"
                  style={{ color: "#EDD8B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  About the expert behind UAEworkrights
                </AccordionTrigger>
                <AccordionContent>
                  <About />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <KnowledgeBase />
        <SiteFooter />
        <StickyCTA />
      </main>
    </PersonaProvider>
  );
}
