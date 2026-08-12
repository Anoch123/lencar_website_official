"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
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

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#0b0b0c] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="font-body text-center text-xs font-bold uppercase tracking-[0.22em] text-[#e4241c]">
          FAQ
        </p>
        <h2 className="font-display mt-3 text-center text-[2rem] font-black uppercase italic tracking-tight text-[#f5f4f1] sm:text-[2.4rem]">
          Questions, answered.
        </h2>

        <div className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-body text-[15px] font-semibold text-[#f5f4f1] sm:text-base">
                    {faq.question}
                  </span>
                  <Plus
                    size={18}
                    strokeWidth={2.25}
                    className={`shrink-0 text-[#e4241c] transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>

                <div
                  className="grid overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="font-body pb-6 pr-8 text-[14px] leading-relaxed text-[#a3a3a8]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}