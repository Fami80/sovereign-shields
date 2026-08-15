import { useEffect, useState } from "react";
import {
  CONSENT_CHANGE_EVENT,
  applyConsent,
  getStoredConsent,
  restoreConsent,
} from "@/lib/consent";

/** Opens the banner from anywhere (the footer control uses this). */
export const CONSENT_OPEN_EVENT = "uwr:consent-open";

export function openConsentPreferences() {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
}

export function ConsentBanner() {
  // Starts closed so the server-rendered markup and the first client render
  // agree. The effect below opens it only when there is genuinely no decision.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getStoredConsent() === null) setOpen(true);
    else restoreConsent();

    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  if (!open) return null;

  const choose = (choice: "granted" | "denied") => {
    applyConsent(choice);
    setOpen(false);
  };

  const buttonBase =
    "w-full rounded-full px-6 py-3 font-sans text-[14px] font-medium motion-safe:transition-transform motion-safe:duration-150 motion-safe:ease-out motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.97] focus-visible:[outline:2px_solid_var(--color-sand-light)] focus-visible:[outline-offset:2px] sm:w-auto";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
      className="fixed inset-x-0 bottom-0 z-[60] motion-safe:animate-fade-rise"
      style={{
        backgroundColor: "var(--color-burg-deep)",
        borderTop: "1px solid rgba(212,168,130,0.25)",
      }}
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div>
          <p
            id="consent-title"
            className="font-sans text-[14px] font-medium"
            style={{ color: "var(--color-sand-light)" }}
          >
            Analytics on this site
          </p>
          <p
            id="consent-desc"
            className="mt-1.5 font-sans text-[13px] font-light leading-relaxed"
            style={{ color: "rgba(237,216,184,0.7)" }}
          >
            We would like to measure how the site is used so we can improve it. Nothing is
            collected unless you agree, and your enquiry or case details are never sent to
            analytics. You can change this at any time from the footer.
          </p>
        </div>

        {/* Both actions are given identical visual weight by design. */}
        <div className="flex flex-shrink-0 flex-col gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={() => choose("granted")}
            className={buttonBase}
            style={{ backgroundColor: "var(--color-sand-warm)", color: "var(--color-burg-deep)" }}
          >
            Accept analytics
          </button>
          <button
            type="button"
            onClick={() => choose("denied")}
            className={buttonBase}
            style={{
              backgroundColor: "var(--color-sand-warm)",
              color: "var(--color-burg-deep)",
            }}
          >
            Decline analytics
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer control so the decision can always be revisited. */
export function ConsentPreferencesButton() {
  const [choice, setChoice] = useState<string | null>(null);

  useEffect(() => {
    setChoice(getStoredConsent());
    const onChange = (e: Event) => setChoice((e as CustomEvent).detail as string);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={openConsentPreferences}
      className="font-sans text-[13px] underline decoration-1 underline-offset-2 transition-opacity duration-150 hover:opacity-80 focus-visible:[outline:2px_solid_var(--color-sand-warm)] focus-visible:[outline-offset:2px]"
      style={{ color: "rgba(237,216,184,0.7)" }}
    >
      Analytics preferences
      {choice ? (
        <span style={{ color: "rgba(237,216,184,0.5)" }}>
          {" "}
          ({choice === "granted" ? "accepted" : "declined"})
        </span>
      ) : null}
    </button>
  );
}
