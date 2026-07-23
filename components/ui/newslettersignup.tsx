"use client";

import { useState, type FormEvent } from "react";

const COUNTRIES = [
 "Sri Lanka",
];

const PRODUCT_INTERESTS = ["Lencar erc.80", "Lencar erc.80 +", "ZIVI"];

export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle"
  );
  const [interests, setInterests] = useState<string[]>([]);
  const [consent, setConsent] = useState(false);

  function toggleInterest(value: string) {
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return;

    setStatus("submitting");
    const formData = new FormData(e.currentTarget);

    try {
      // Replace with your real endpoint:
      // await fetch("/api/newsletter", { method: "POST", body: formData });
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-lg rounded-2xl border border-black/[0.06] bg-[#f7f7f7] p-8 text-center sm:p-10">
            <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#e4241c]">
              Lencar crew
            </p>
            <h2 className="font-display mt-3 text-2xl font-black uppercase italic tracking-tight text-[#1a1a1a]">
              You&apos;re in.
            </h2>
            <p className="font-body mt-3 text-[14px] leading-relaxed text-[#5a5a5a]">
              Thanks for signing up — keep an eye on your inbox for news and
              updates from Lencar.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="font-body text-xs font-bold uppercase tracking-[0.22em] text-[#e4241c]">
          Lencar crew
        </p>
        <h2 className="font-display mt-3 text-[2rem] font-black uppercase italic tracking-tight text-[#1a1a1a] sm:text-[2.4rem]">
          Newsletter signup
        </h2>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-x-16 gap-y-10 lg:grid-cols-2">
          {/* -------------------------------------------------------- */}
          {/* Left: identity fields                                   */}
          {/* -------------------------------------------------------- */}
          <div className="max-w-md space-y-6">
            <Field label="First name" htmlFor="firstName">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Type your first name"
                required
                className="form-input"
              />
            </Field>

            <Field label="Last name" htmlFor="lastName">
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Type your last name"
                required
                className="form-input"
              />
            </Field>

            <Field label="Country" htmlFor="country">
              <select
                id="country"
                name="country"
                required
                defaultValue=""
                className="form-input"
              >
                <option value="" disabled>
                  Select your country
                </option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Email" htmlFor="email" required>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Type your email"
                required
                className="form-input"
              />
            </Field>
          </div>

          {/* -------------------------------------------------------- */}
          {/* Right: preferences + consent                             */}
          {/* -------------------------------------------------------- */}
          <div className="max-w-md">
            <p className="font-body text-[14px] font-semibold text-[#1a1a1a]">
              Which products are you interested in?
            </p>
            <div className="mt-3 space-y-3">
              {PRODUCT_INTERESTS.map((interest) => (
                <label
                  key={interest}
                  className="flex cursor-pointer items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => toggleInterest(interest)}
                    className="h-4 w-4 rounded-[3px] border-gray-300 text-[#e4241c] focus:ring-[#e4241c]"
                  />
                  <span className="font-body text-[14px] text-[#5a5a5a]">
                    {interest}
                  </span>
                </label>
              ))}
            </div>

            <p className="font-body mt-8 text-[14px] font-semibold text-[#1a1a1a]">
              Data protection
            </p>
            <label className="mt-3 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded-[3px] border-gray-300 text-[#e4241c] focus:ring-[#e4241c]"
              />
              <span className="font-body text-[12px] uppercase leading-relaxed tracking-[0.02em] text-[#8a8a8a]">
                I hereby give consent to Lencar Technologies holding my personal
                data and contact me with news and updates about Lencar
                Technologies products and services in accordance with the
                privacy policy.
              </span>
            </label>

            <button
              type="submit"
              disabled={!consent || status === "submitting"}
              className="font-body mt-8 inline-flex items-center rounded-md bg-[#e4241c] px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#c41a13] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "submitting" ? "Submitting…" : "Submit"}
            </button>

            {status === "error" && (
              <p className="font-body mt-3 text-[13px] text-[#e4241c]">
                Something went wrong — please try again.
              </p>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .form-input {
          width: 100%;
          border-radius: 6px;
          border: 1px solid rgba(0, 0, 0, 0.14);
          padding: 0.75rem 0.9rem;
          font-size: 14px;
          color: #1a1a1a;
          background: #fff;
          transition: border-color 0.2s ease;
        }
        .form-input::placeholder {
          color: #a8a8a8;
        }
        .form-input:focus {
          outline: none;
          border-color: #e4241c;
          box-shadow: 0 0 0 3px rgba(228, 36, 28, 0.12);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="font-body block text-[14px] font-semibold text-[#1a1a1a]"
      >
        {label}
        {required && <span className="ml-0.5 text-[#e4241c]">*</span>}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}