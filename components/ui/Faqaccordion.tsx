"use client";

import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const DEFAULT_FAQS: FaqItem[] = [
  {
    question: "How do I book a free test ride?",
    answer:
      "Use the \"Book a test ride\" button on this page to find a participating dealer near you. There's no reservation fee and no obligation to buy — just show up, hop on, and see how it feels.",
  },
  {
    question: "How does the battery swapping system work?",
    answer:
      "Simply remove your empty battery, insert it into a Lencar Battery Swapping Station, and collect a fully charged battery. The whole process takes less than a minute.",
  },
  {
    question: "How long does a battery swap take?",
    answer:
      "A battery swap takes 30 seconds, making it much faster than traditional charging.",
  },
  {
    question: "How do I find the nearest battery swapping station?",
    answer:
      "Simply use the Lencar mobile app to locate the nearest battery swapping station and check battery availability.",
  },
  {
    question: "Can I charge the battery at home?",
    answer:
      "Yes. You can charge your battery at home using the supplied charger and mobile app.",
  },
  {
    question: "Where can I get service and support?",
    answer:
      "Lencar provides reliable after-sales service through our nationwide dealer network and trained technical support team, ensuring help is always nearby.",
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
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center text-[#0F4C81] transition-transform duration-200 ${isOpen ? "rotate-45" : "rotate-0"
                  }`}
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
              </span>
            </button>
            <div
              className={`grid overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
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