"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "What is the range and top speed of Lencar vehicles?",
    answer:
      "Range and top speed vary by model — each model page lists the exact figures for that vehicle, tested under Sri Lankan road conditions.",
  },
  {
    question: "Where can I charge or swap a battery?",
    answer:
      "Lencar offers home charging as well as a growing network of charging and battery-swapping points, so you're never far from a top-up.",
  },
  {
    question: "Does Lencar come with a warranty?",
    answer:
      "Yes, every Lencar vehicle is covered by a manufacturer warranty. Reach out to your nearest dealer for the exact terms on your model.",
  },
  {
    question: "Can I track my vehicle's performance?",
    answer:
      "Yes — the Lencar mobile app lets you monitor battery health, range, and ride history, and helps you get the most out of your vehicle.",
  },
  {
    question: "Where can I book a test ride or find a service center?",
    answer:
      "Use the store locator to find your nearest showroom or service center, or book a test ride directly from our website.",
  },
];

export default function FaqAccordion({
  items = DEFAULT_FAQS,
}: {
  items?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8 divide-y divide-[#e5e5e5] border-t border-[#e5e5e5]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-body text-[15px] font-semibold text-[#0b0b0c] sm:text-[16px]">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#e30613] transition-transform duration-200 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-200 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="font-body max-w-2xl text-[14px] leading-relaxed text-[#6b6b70]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}