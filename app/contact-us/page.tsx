"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";
import Footer from "@/components/common/footer";
import AllPageHero from "@/components/ui/allPageHero";
import { CONTACT_METHODS, OFFICE_HOURS, SUBJECTS } from "@/lib/constants/contact_us";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || "General Inquiry"),
      message: String(formData.get("message") || ""),
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

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send your message right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AllPageHero
        eyebrow="Contact Us"
        heading={["Let's talk"]}
        description="Questions, feedback, or a project in mind — our team usually gets back to you within one business day."
      />
      <main className="bg-white text-[#0b0b0c]">
        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 pt-20 sm:pt-24 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
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
                <Icon className="h-5 w-5 text-[#e30613]" strokeWidth={1.75} />
                <div>
                  <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0b0c]/40">
                    {label}
                  </p>
                  <p className="mt-1.5 text-[17px] font-semibold text-[#0b0b0c]">{value}</p>
                  <p className="mt-1 text-sm text-[#0b0b0c]/50">{note}</p>
                </div>
                <ArrowRight
                  className="absolute right-6 top-8 h-4 w-4 -translate-x-1 text-[#0b0b0c]/20 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-[#e30613]"
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
              {submitted ? (
                <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border border-[#0b0b0c]/10 bg-[#faf9f8] px-8 text-center">
                  <CheckCircle2 className="h-10 w-10 text-[#e30613]" strokeWidth={1.5} />
                  <h3 className="mt-5 text-xl font-semibold text-[#0b0b0c]">Message sent</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#0b0b0c]/60">
                    Thanks for reaching out. Someone from our team will get back to you
                    shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 font-body text-[13px] font-bold uppercase tracking-[0.12em] text-[#e30613] underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <Field label="Full name" name="name" placeholder="Jane Perera" required />
                    <Field
                      label="Email address"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/50">
                      Subject
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {SUBJECTS.map((s) => (
                        <SubjectPill key={s} label={s} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/50"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us a bit about what you need..."
                      className="mt-2 w-full resize-none rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-3 text-[15px] text-[#0b0b0c] placeholder:text-[#0b0b0c]/30 outline-none transition-colors focus:border-[#e30613]"
                    />
                  </div>

                  {error ? (
                    <p className="rounded-xl border border-[#e30613]/20 bg-[#e30613]/5 px-4 py-3 text-sm text-[#c00510]">
                      {error}
                    </p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-2 rounded-full bg-[#e30613] px-7 py-3.5 font-body text-[13px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#c00510] disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send message"}
                    {!loading && (
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
                  <Clock className="h-4.5 w-4.5 text-[#e30613]" strokeWidth={1.75} />
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
                    123 Galle Road
                    <br />
                    Colombo 03, Sri Lanka
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

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-body text-[12px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/50"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-3 text-[15px] text-[#0b0b0c] placeholder:text-[#0b0b0c]/30 outline-none transition-colors focus:border-[#e30613]"
      />
    </div>
  );
}

function SubjectPill({ label }: { label: string }) {
  return (
    <label className="cursor-pointer">
      <input type="radio" name="subject" value={label} className="peer sr-only" defaultChecked={label === "General Inquiry"} />
      <span className="inline-flex rounded-full border border-[#0b0b0c]/15 px-4 py-1.5 text-[13px] text-[#0b0b0c]/60 transition-colors peer-checked:border-[#e30613] peer-checked:bg-[#e30613] peer-checked:text-white">
        {label}
      </span>
    </label>
  );
}