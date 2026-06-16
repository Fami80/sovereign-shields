import step1Image from "@/assets/step1-send-documents.jpg.asset.json";
import step2Image from "@/assets/step2-pencil-review.jpg.asset.json";
import step3Image from "@/assets/step3-written-findings.jpg.asset.json";

type Step = {
  id: string;
  number: number;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
  badge?: string;
};

const STEPS: Step[] = [
  {
    id: "01",
    number: 1,
    title: "Send your documents",
    description:
      "Upload your settlement letter and employment contract. Secure, confidential. Takes two minutes.",
    image: step1Image.url,
    imagePosition: "center",
  },
  {
    id: "02",
    number: 2,
    title: "We review every line",
    description:
      "Gratuity, leave encashment, deductions, notice period — all checked against UAE Labour Law for your jurisdiction.",
    image: step2Image.url,
    imagePosition: "center top",
  },
  {
    id: "03",
    number: 3,
    title: "You receive written findings",
    description:
      "A clear written summary of what's correct, what's wrong, and what you can do about it. Delivered within 48 hours.",
    image: step3Image.url,
    imagePosition: "center",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-bg-light py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted-light">
            How it works
          </p>
          <h2
            className="mt-2 text-3xl md:text-4xl"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "#1E0A0E",
            }}
          >
            From settlement letter to written findings in 48 hours
          </h2>
        </div>

        <ol className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map(({ id, number, title, description, image, imagePosition, badge }) => (
            <li key={id} className="flex flex-col items-center text-center">
              <div className="relative">
                <div
                  className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-[#FAF3E8] ring-offset-4 ring-offset-[#FAF3E8] md:h-36 md:w-36"
                  style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.12)" }}
                >
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: imagePosition ?? "center" }}
                  />
                </div>
                <span
                  className="absolute -bottom-2 -right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: "#1E0A0E",
                    color: "#D4A882",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {number}
                </span>
              </div>

              {badge ? (
                <span
                  className="mt-5 mb-3 inline-flex items-center"
                  style={{
                    backgroundColor: "rgba(139,45,58,0.08)",
                    color: "#8B2D3A",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    borderRadius: "100px",
                    padding: "3px 10px",
                  }}
                >
                  <span
                    className="animate-pulse"
                    style={{
                      display: "inline-block",
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: "#8B2D3A",
                      marginRight: "6px",
                    }}
                  />
                  {badge}
                </span>
              ) : null}

              <h3
                className={`text-xl ${badge ? "" : "mt-5"}`}
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: "#1E0A0E",
                }}
              >
                {title}
              </h3>
              <p
                className="mt-3 text-sm"
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 400,
                  color: "rgba(30,10,14,0.65)",
                  lineHeight: 1.75,
                  maxWidth: "220px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                {description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex justify-center">
          <a
            href={`https://wa.me/971547736565?text=${encodeURIComponent("Hi Kaoutar, I'd like to book a settlement review — AED 999.")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 motion-safe:transition-all motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:hover:bg-[#C4A882]"
            style={{
              backgroundColor: "#D4A882",
              color: "#1E0A0E",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 500,
              borderRadius: "100px",
              padding: "14px 32px",
            }}
          >
            Start your review — AED 999 →
          </a>
        </div>
      </div>
    </section>
  );
}
