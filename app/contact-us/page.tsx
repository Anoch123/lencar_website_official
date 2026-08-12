"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/common/footer";
import AllPageHero from "@/components/ui/allPageHero";
import { CONTACT_METHODS, OFFICE_HOURS, SUBJECTS } from "@/lib/constants/contact_us";
import { validateContactUsForm } from "@/lib/validation";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errors = validateContactUsForm({
      fullName: formData.fullName,
      email: formData.email,
      message: formData.message,
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const form = e.currentTarget;
    // const formPayload = new FormData(form);
    const payload = {
      name: String(formData.fullName),
      email: String(formData.email),
      subject: String(formData.subject || "General Inquiry"),
      message: String(formData.message),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send your message right now.");
      }

      setIsSubmitting(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  }


  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setValidationErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div>
      <AllPageHero
        eyebrow="Contact Us"
        heading={["We're Here to Help"]}
        description="Have a question? Our team is ready to assist you with sales, support, and general inquiries."
        imageSrc="/images/Contact_us.png"
      />
      <main className="bg-white text-[#0b0b0c]">
        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
              Contact Us
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#0b0b0c] sm:text-5xl">
              Let&apos;s talk
            </h1>
            <p className="mt-5 text-base leading-relaxed text-[#0b0b0c]/60 sm:text-lg">
              Questions, feedback, or a project in mind — our team usually gets back
              to you within one business day.
            </p>
          </div>
        </section>

        {/* Contact methods */}
        <section className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#0b0b0c]/10 bg-[#0b0b0c]/10 sm:grid-cols-3">
            {CONTACT_METHODS.map(({ icon: Icon, label, value, href, note }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group relative flex flex-col gap-3 bg-white p-8 transition-colors hover:bg-[#faf9f8]"
              >
                <Icon className="h-5 w-5 text-[#0F4C81]" strokeWidth={1.75} />
                <div>
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0b0c]/40">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[17px] font-semibold text-[#0b0b0c]">{value}</p>
                  <p className="mt-1 text-sm text-[#0b0b0c]/50">{note}</p>
                </div>
                <ArrowRight
                  className="absolute right-6 top-8 h-4 w-4 -translate-x-1 text-[#0b0b0c]/20 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#0F4C81]"
                  strokeWidth={2}
                />
              </a>
            ))}
          </div>
        </section>

        {/* Form + details */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              {isSubmitting ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#0b0b0c]/10 bg-[#faf9f8] px-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-[#0F4C81]" strokeWidth={1.5} />
                  <h3 className="mt-5 text-xl font-semibold text-[#0b0b0c]">Message sent</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#0b0b0c]/60">
                    Thanks for reaching out. Someone from our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitting(false)}
                    className="mt-6 font-body text-[13px] font-bold uppercase tracking-[0.12em] text-[#0F4C81] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                        Full name <span className="text-[#0f4c81]">*</span>
                      </label>
                      <input
                        value={formData.fullName}
                        type="text"
                        inputMode="text"
                        autoComplete="name"
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                          updateField("fullName", value);
                        }}
                        placeholder="Your name"
                        className={`mt-1 w-full rounded-xl border bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#0f4c81] sm:mt-1.5 sm:py-2.5 ${validationErrors.fullName ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                          }`}
                      />
                      {validationErrors.fullName ? (
                        <p className="mt-1 text-[12px] text-[#0f4c81]">{validationErrors.fullName}</p>
                      ) : null}
                    </div>

                    <div>
                      <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                        Email <span className="text-[#0f4c81]">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="you@example.com"
                        className={`mt-1 w-full rounded-xl border bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#0f4c81] sm:mt-1.5 sm:py-2.5 ${validationErrors.email ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"}`}
                      />
                      {validationErrors.email ? (
                        <p className="mt-1 text-[12px] text-[#0f4c81]">{validationErrors.email}</p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/50">
                      Subject
                    </label>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <label key={s} className="cursor-pointer">
                          <input
                            type="radio"
                            name="subject"
                            value={s}
                            checked={formData.subject === s}
                            onChange={(e) => updateField("subject", e.target.value)}
                            className="peer sr-only"
                          />

                          <span
                            className="
                              inline-flex rounded-full border border-[#0b0b0c]/15 
                              px-4 py-1.5 text-[13px] text-[#0b0b0c]/60 
                              transition-colors
                              peer-checked:border-[#0F4C81]
                              peer-checked:bg-[#0F4C81]
                              peer-checked:text-white
                            "
                          >
                            {s}
                          </span>
                        </label>
                      ))}
                    </div>

                    {validationErrors.subject ? (
                      <p className="mt-1 text-[12px] text-[#0f4c81]">
                        {validationErrors.subject}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/50"
                    >
                      Message <span className="text-[#0f4c81]">*</span>
                    </label>

                    <textarea
                      value={formData.message}
                      rows={6}
                      onChange={(e) => updateField("message", e.target.value)}
                      placeholder="you@example.com"
                      className={`mt-1 w-full rounded-xl border bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#0f4c81] sm:mt-1.5 sm:py-2.5 ${validationErrors.email ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"}`}
                    />

                    {validationErrors.message ? (
                      <p className="mt-1 text-[12px] text-[#0f4c81]">{validationErrors.message}</p>
                    ) : null}
                  </div>

                  {error ? (
                    <p className="rounded-xl border border-[#0F4C81]/20 bg-[#0F4C81]/5 px-4 py-3 text-sm text-[#c00510]">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0F4C81] px-7 py-3.5 font-body text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[transparent] hover:border hover:border-[#0F4C81] hover:text-[#0F4C81] disabled:opacity-60"
                  >
                    {isSubmitting ? "Sending..." : "Send message"}
                    {!isSubmitting && (
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Details sidebar */}
            <div className="lg:col-span-2 lg:pl-4">
              <div className="rounded-2xl border border-[#0b0b0c]/10 p-8">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4.5 w-4.5 text-[#0F4C81]" strokeWidth={1.75} />
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0b0c]/50">
                    Office Hours
                  </p>
                </div>
                <dl className="mt-5 space-y-3">
                  {OFFICE_HOURS.map(({ day, hours }) => (
                    <div key={day} className="flex items-baseline justify-between gap-4 text-sm">
                      <dt className="text-[#0b0b0c]/60">{day}</dt>
                      <dd className="font-medium text-[#0b0b0c]">{hours}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 border-t border-[#0b0b0c]/10 pt-8">
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0b0c]/50">
                    Head Office
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#0b0b0c]/70">
                    29, Grenier Road, 
                    <br />
                    Colombo – 08, Sri Lanka.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}