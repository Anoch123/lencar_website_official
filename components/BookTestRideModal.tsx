"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type BikeOption = {
  name: string;
  slug: string;
};

type BookTestRideModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bikeName?: string;
  bikes?: BikeOption[];
};

const DEFAULT_BIKES: BikeOption[] = [
  { name: "eRc 80", slug: "erc-80" },
  { name: "eRc 80+", slug: "erc-80-plus" },
  { name: "Zivi", slug: "zivi" },
];

export default function BookTestRideModal({
  isOpen,
  onClose,
  bikeName,
  bikes = DEFAULT_BIKES,
}: BookTestRideModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bike: bikeName || "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        bike: bikeName || "",
        date: "",
        time: "",
        message: "",
      });
    }
  }, [isOpen, bikeName]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/test-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to send your request right now.");
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your request right now. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[88vh]">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-[#6b6b70] transition-colors hover:bg-[#f5f4f1] hover:text-[#0b0b0c] sm:right-4 sm:top-4"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.8} />
        </button>

        <div className="overflow-y-auto p-5 sm:p-8">
          {!submitted ? (
            <>
              <div className="pr-8">
                <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-[#e30613] sm:text-[13px]">
                  Book a test ride
                </p>
                <h2 className="font-display mt-1.5 text-[22px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:mt-3 sm:text-[28px]">
                  Feel the ride
                </h2>
                <p className="font-body mt-1.5 text-[13px] leading-relaxed text-[#6b6b70] sm:mt-2 sm:text-[14px]">
                  Fill in your details and we&apos;ll get back to you to schedule your test ride.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Full name <span className="text-[#e30613]">*</span>
                  </label>
                  <input
                    required
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Your name"
                    className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5 required"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                      Email <span className="text-[#e30613]">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="you@example.com"
                      className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5 required"
                    />
                  </div>

                  <div>
                    <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                      Phone <span className="text-[#e30613]">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+94 77 123 4567"
                      className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5 required"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                      Preferred bike
                    </label>
                    <select
                      value={formData.bike}
                      onChange={(e) => updateField("bike", e.target.value)}
                      className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5 required"
                    >
                      <option value="">Select a bike</option>
                      {bikes.map((bike) => (
                        <option key={bike.slug} value={bike.name}>
                          {bike.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                      Preferred date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      required
                      className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Preferred time
                  </label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    required
                    className="mt-1 w-full rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2 text-[15px] text-[#0b0b0c] outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-2.5"
                  />
                </div>

                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    required
                    placeholder="Any specific requests or questions?"
                    rows={2}
                    className="mt-1 w-full resize-none rounded-xl border border-[#0b0b0c]/15 bg-white px-4 py-2.5 text-[15px] text-[#0b0b0c] placeholder:text-[#0b0b0c]/30 outline-none transition-colors focus:border-[#e30613] sm:mt-1.5 sm:py-3"
                  />
                </div>

                {submitError ? (
                  <p className="rounded-xl border border-[#e30613]/20 bg-[#e30613]/5 px-4 py-2.5 text-[13px] leading-relaxed text-[#c90512] sm:py-3">
                    {submitError}
                  </p>
                ) : null}

                <div className="flex items-center justify-end gap-3 pt-1 sm:pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="font-body text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c]/60 transition-colors hover:text-[#0b0b0c]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="font-body inline-flex rounded items-center justify-center bg-[#e30613] px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-white transition-colors hover:bg-[#c90512] disabled:cursor-not-allowed disabled:opacity-70 sm:px-7 sm:py-3"
                  >
                    {isSubmitting ? "Sending..." : "Submit request"}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-6 text-center sm:py-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e30613]/10">
                <svg
                  className="h-6 w-6 text-[#e30613]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-display mt-4 text-[20px] font-black uppercase italic tracking-tight text-[#0b0b0c] sm:mt-5 sm:text-[22px]">
                Request received
              </h3>
              <p className="font-body mt-2 max-w-sm text-[13px] leading-relaxed text-[#6b6b70] sm:text-[14px]">
                Thanks for your interest. A member of our team will contact you shortly to confirm your test ride.
              </p>
              <button
                onClick={onClose}
                className="font-body mt-5 inline-flex items-center justify-center border border-[#0b0b0c]/15 px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#e30613] hover:text-[#e30613] sm:mt-6 sm:px-7 sm:py-3"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}