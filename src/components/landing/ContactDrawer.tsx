import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { CheckCircle2 } from "lucide-react";
import { onUi } from "@/lib/ui-store";

type Errors = Partial<Record<"name" | "email" | "enquiry" | "message", string>>;

export function ContactDrawer() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", enquiry: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() =>
    onUi("open-contact", () => {
      setOpen(true);
      setSubmitted(false);
    }),
  []);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim() || form.name.length > 80) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.enquiry) e.enquiry = "Select an enquiry type.";
    if (!form.message.trim() || form.message.length > 1000) e.message = "Message is required (max 1000 chars).";
    return e;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full border-l border-white/10 bg-[#032B24]/95 p-0 text-text-dark-primary shadow-2xl backdrop-blur-xl sm:max-w-lg"
      >
        <div className="flex h-full flex-col overflow-y-auto px-7 py-8">
          <SheetHeader className="text-left">
            <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted-dark">
              Confidential Desk
            </span>
            <SheetTitle className="mt-3 text-3xl font-extrabold text-text-dark-primary">Contact Sovereign.</SheetTitle>
            <SheetDescription className="text-sm text-text-muted-dark">
              Senior counsel responds within one UAE business day. Every enquiry is encrypted and never shared with third parties.
            </SheetDescription>
          </SheetHeader>

          {submitted ? (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-action-accent/30 bg-action-accent/10 p-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-action-accent" />
              <p className="mt-4 text-base font-semibold">Enquiry received.</p>
              <p className="mt-2 text-xs text-text-muted-dark">A member of the desk will reach out within one UAE business day.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="mt-7 space-y-5">
              <Field label="Full Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-dark-primary outline-none transition-colors focus:border-action-accent focus:ring-2 focus:ring-action-accent/30"
                  placeholder="Your name"
                />
              </Field>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-dark-primary outline-none transition-colors focus:border-action-accent focus:ring-2 focus:ring-action-accent/30"
                  placeholder="you@company.ae"
                />
              </Field>

              <Field label="Type of Enquiry" error={errors.enquiry}>
                <select
                  value={form.enquiry}
                  onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                  className="w-full appearance-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-dark-primary outline-none transition-colors focus:border-action-accent focus:ring-2 focus:ring-action-accent/30"
                >
                  <option value="" className="bg-bg-dark">Select…</option>
                  <option value="triage" className="bg-bg-dark">Executive Triage</option>
                  <option value="audit" className="bg-bg-dark">Corporate Audit</option>
                </select>
              </Field>

              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={4}
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-text-dark-primary outline-none transition-colors focus:border-action-accent focus:ring-2 focus:ring-action-accent/30"
                  placeholder="Briefly describe your matter…"
                />
              </Field>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-action-accent py-3.5 text-sm font-bold text-bg-dark transition-all duration-300 hover:scale-[1.01]"
              >
                Send Confidential Enquiry
              </button>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-text-muted-dark">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs text-red-300">{error}</span>}
    </label>
  );
}
