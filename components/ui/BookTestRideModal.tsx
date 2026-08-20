"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  COUNTRY_CODES,
  getMinimumAllowedTimeForToday,
  getPhoneNumberForSubmission,
  getTodayDateString,
  validateTestRideForm,
} from "@/lib/validation";

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
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+94",
    bike: bikeName || "",
    date: "",
    time: "",
    message: "",
  });

  useEffect(() => {
    if (!isOpen) {
      const timeoutId = window.setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        setSubmitError(null);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          countryCode: "+94",
          bike: bikeName || "",
          date: "",
          time: "",
          message: "",
        });
        setValidationErrors({});
      }, 0);

      return () => window.clearTimeout(timeoutId);
    }
  }, [isOpen, bikeName]);

  // Drives the enter transition (slide up / fade in) on mobile & desktop.
  useEffect(() => {
    if (isOpen) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [isOpen]);

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
    setSubmitError(null);

    const errors = validateTestRideForm({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      countryCode: formData.countryCode,
      bike: formData.bike,
      date: formData.date,
      time: formData.time,
      message: formData.message,
    });

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/test-ride", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: getPhoneNumberForSubmission(formData.countryCode, formData.phone),
        }),
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
    setValidationErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleDateChange = (value: string) => {
    const minimumTime = getMinimumAllowedTimeForToday();
    const today = getTodayDateString();

    setFormData((prev) => ({
      ...prev,
      date: value,
      time: value === today && prev.time && prev.time < minimumTime ? "" : prev.time,
    }));
    setValidationErrors((prev) => ({ ...prev, date: "", time: "" }));
  };

  const handleTimeChange = (value: string) => {
    const today = getTodayDateString();
    const minimumTime = getMinimumAllowedTimeForToday();
    const nextValue = formData.date === today && value < minimumTime ? minimumTime : value;
    updateField("time", nextValue);
  };

  const handleTimeBlur = () => {
    const today = getTodayDateString();
    const minimumTime = getMinimumAllowedTimeForToday();

    if (formData.date === today && formData.time && formData.time < minimumTime) {
      updateField("time", minimumTime);
    }
  };

  const todayDate = getTodayDateString();
  const minimumTimeForToday = formData.date === todayDate ? getMinimumAllowedTimeForToday() : undefined;

  if (!isOpen) return null;
  const inputBase =
    "w-full min-w-0 appearance-none rounded-xl border bg-white px-4 py-3 text-[15px] text-[#0b0b0c] outline-none transition-all duration-150 focus:border-[#0f4c81] focus:ring-4 focus:ring-[#0f4c81]/10";

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-[#0b0b0c]/60 backdrop-blur-sm transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Panel: bottom sheet on mobile, centered card on larger screens */}
      <div
        className={`relative flex w-full max-w-lg flex-col overflow-hidden bg-white shadow-2xl transition-all duration-300 ease-out
        max-h-[94vh] rounded-t-3xl
        sm:max-h-[88vh] sm:rounded-3xl
        ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 sm:translate-y-4"}`}
      >
        {/* Accent bar */}
        <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#0f4c81] via-[#0f4c81] to-[#c90512]" />

        {/* Drag handle (mobile only) */}
        <div className="flex shrink-0 justify-center pt-2.5 sm:hidden">
          <span className="h-1.5 w-10 rounded-full bg-[#0b0b0c]/15" />
        </div>

        {!submitted ? (
          <>
            {/* Sticky header */}
            <div className="relative shrink-0 border-b border-[#0b0b0c]/8 px-5 pb-4 pt-3 sm:px-8 sm:pb-5 sm:pt-6">
              <button
                onClick={onClose}
                className="absolute right-4 top-3 flex h-9 w-9 items-center justify-center rounded-full text-[#6b6b70] transition-colors hover:bg-[#f5f4f1] hover:text-[#0b0b0c] active:scale-95 sm:right-6 sm:top-6"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.8} />
              </button>

              <div className="pr-10">
                <p className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#0f4c81] sm:text-[13px]">
                  Book a test ride
                </p>
                <h2 className="font-display mt-1 text-[24px] font-black uppercase italic leading-[1.05] tracking-tight text-[#0b0b0c] sm:mt-2 sm:text-[30px]">
                  Feel the ride
                </h2>
                <p className="font-body mt-1.5 text-[13px] leading-relaxed text-[#6b6b70] sm:text-[14px]">
                  Fill in your details and we&apos;ll get back to you to schedule your test ride.
                </p>
              </div>
            </div>

            {/* Scrollable form body */}
            <form
              id="test-ride-form"
              onSubmit={handleSubmit}
              className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-8 sm:py-6"
            >
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
                  className={`mt-1.5 ${inputBase} ${validationErrors.fullName ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                    }`}
                />
                {validationErrors.fullName ? (
                  <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.fullName}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="you@example.com"
                    className={`mt-1.5 ${inputBase} ${validationErrors.email ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                      }`}
                  />
                  {validationErrors.email ? (
                    <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.email}</p>
                  ) : null}
                </div>

                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Whatsapp number
                  </label>
                  <div className="mt-1.5 flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => updateField("countryCode", e.target.value)}
                      className={`w-[40%] rounded-xl border bg-white px-2 py-3 text-[14px] text-[#0b0b0c] outline-none transition-all duration-150 focus:border-[#0f4c81] focus:ring-4 focus:ring-[#0f4c81]/10 ${validationErrors.countryCode ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                        }`}
                    >
                      {COUNTRY_CODES.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={formData.phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        updateField("phone", value);
                      }}
                      placeholder="771234567"
                      className={`w-[60%] ${inputBase} ${validationErrors.phone ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                        }`}
                    />
                  </div>
                  {validationErrors.countryCode ? (
                    <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.countryCode}</p>
                  ) : null}
                  {validationErrors.phone ? (
                    <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.phone}</p>
                  ) : null}
                  {/* <p className="mt-1 text-[12px] text-[#FF0000]/50">please enter whatsapp number</p> */}
                </div>
              </div>

              <div>
                <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                  Preferred bike <span className="text-[#0f4c81]">*</span>
                </label>
                <select
                  value={formData.bike}
                  onChange={(e) => updateField("bike", e.target.value)}
                  className={`mt-1.5 ${inputBase} ${validationErrors.bike ? "border-[#0f4c81]" : "border-[#0b0b0c]/15"
                    }`}
                >
                  <option value="">Select a bike</option>
                  {bikes.map((bike) => (
                    <option key={bike.slug} value={bike.name}>
                      {bike.name}
                    </option>
                  ))}
                </select>
                {validationErrors.bike ? (
                  <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.bike}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Preferred date <span className="text-[#0f4c81]">*</span>
                  </label>
                  <input
                    type="date"
                    min={todayDate}
                    value={formData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    style={{ width: "100%" }}
                    className={`mt-1.5 ${inputBase} ${validationErrors.date
                      ? "border-[#0f4c81]"
                      : "border-[#0b0b0c]/15"
                      }`}
                  />
                  {validationErrors.date ? (
                    <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.date}</p>
                  ) : null}
                </div>

                <div>
                  <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                    Preferred time <span className="text-[#0f4c81]">*</span>
                  </label>
                  <input
                    type="time"
                    min={minimumTimeForToday}
                    value={formData.time}
                    onChange={(e) => handleTimeChange(e.target.value)}
                    onBlur={handleTimeBlur}
                    style={{ width: "100%" }}
                    className={`mt-1.5 ${inputBase} ${validationErrors.time
                        ? "border-[#0f4c81]"
                        : "border-[#0b0b0c]/15"
                      }`}
                  />
                  {validationErrors.time ? (
                    <p className="mt-1 text-[12px] text-[#c90512]">{validationErrors.time}</p>
                  ) : null}
                </div>
              </div>

              <div>
                <label className="font-body text-[11px] font-bold uppercase tracking-[0.1em] text-[#0b0b0c]/60 sm:text-[12px]">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  placeholder="Any specific requests or questions?"
                  rows={2}
                  className={`mt-1.5 resize-none ${inputBase} border-[#0b0b0c]/15 placeholder:text-[#0b0b0c]/30`}
                />
              </div>

              {submitError ? (
                <p className="rounded-xl border border-[#c90512]/20 bg-[#c90512]/5 px-4 py-3 text-[13px] leading-relaxed text-[#c90512]">
                  {submitError}
                </p>
              ) : null}
            </form>

            {/* Sticky footer */}
            <div className="flex shrink-0 items-center justify-end gap-3 border-t border-[#0b0b0c]/8 bg-white px-5 py-4 sm:px-8">
              <button
                type="button"
                onClick={onClose}
                className="font-body text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c]/60 transition-colors hover:text-[#0b0b0c]"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="test-ride-form"
                disabled={isSubmitting}
                className="font-body inline-flex flex-1 items-center justify-center rounded-xl bg-[#0f4c81] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-white shadow-sm transition-all duration-150 hover:bg-[transparent] hover:border hover:border-[#0f4c81] hover:text-[#0f4c81] disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none sm:px-7"
              >
                {isSubmitting ? "Sending..." : "Submit request"}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0f4c81]/10">
              <svg
                className="h-7 w-7 text-[#0f4c81]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display mt-5 text-[22px] font-black uppercase italic tracking-tight text-[#0b0b0c] sm:text-[24px]">
              Request received
            </h3>
            <p className="font-body mt-2 max-w-sm text-[13px] leading-relaxed text-[#6b6b70] sm:text-[14px]">
              Thanks for your interest. A member of our team will contact you shortly to confirm your test ride.
            </p>
            <button
              onClick={onClose}
              className="font-body mt-6 inline-flex items-center justify-center rounded-xl border border-[#0b0b0c]/15 px-7 py-3 text-[13px] font-semibold uppercase tracking-[0.06em] text-[#0b0b0c] transition-colors hover:border-[#0f4c81] hover:text-[#0f4c81]"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}