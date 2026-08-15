// Consent-first analytics.
//
// GA4 is not loaded and sends nothing until the visitor explicitly accepts.
// Consent Mode v2 defaults are declared denied in the document head before any
// tag exists, so the "no decision yet" state is indistinguishable from a
// decline as far as Google is concerned.

export const GA_MEASUREMENT_ID = "G-HGFBT3JNT4";
export const CONSENT_STORAGE_KEY = "uwr-analytics-consent";
export const CONSENT_CHANGE_EVENT = "uwr:consent-change";

export type ConsentChoice = "granted" | "denied";

/** Reads the stored decision. null means the visitor has not chosen yet. */
export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    // Private mode or storage disabled: treat as undecided, which means denied.
    return null;
  }
}

function persist(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Non-fatal. Consent then lasts for the session only, which fails closed.
  }
}

/** Strips parameters that carry message content rather than analytics value. */
export function sanitizePath(pathname: string, search: string, hash: string): string {
  let cleanSearch = "";
  if (search && search.length > 1) {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    params.delete("message");
    const s = params.toString();
    cleanSearch = s ? `?${s}` : "";
  }
  return `${pathname}${cleanSearch}${hash || ""}`;
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let tagInjected = false;

/** Injects gtag.js exactly once. Only ever called after an explicit accept. */
function injectTag() {
  if (tagInjected || typeof document === "undefined") return;
  if (document.getElementById("ga4-tag")) {
    tagInjected = true;
    return;
  }
  const s = document.createElement("script");
  s.id = "ga4-tag";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  tagInjected = true;

  gtag("js", new Date());
  // send_page_view is off: this is a client-routed app, so page_view is emitted
  // per navigation from the router instead (see __root.tsx).
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Applies a decision: persists it, updates Consent Mode, loads the tag if accepted. */
export function applyConsent(choice: ConsentChoice) {
  persist(choice);

  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (choice === "granted") injectTag();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: choice }));
  }
}

/** Re-arms GA on a return visit that previously accepted. */
export function restoreConsent() {
  if (getStoredConsent() === "granted") applyConsent("granted");
}

/** Sends a page_view, but only with consent. Never called otherwise. */
export function trackPageView(path: string) {
  if (getStoredConsent() !== "granted") return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  // page_location must be passed explicitly. Left unset, gtag derives it from
  // document.location.href, which would reintroduce the stripped parameters.
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}
