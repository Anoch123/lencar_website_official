"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

type Faq = {
  question: string;
  answer: string;
};

const FAQS: Faq[] = [
  {
    question: "How far can a Lencar scooter ride on a single charge?",
    answer:
      "Range depends on the model, rider weight and terrain, but most Lencar scooters cover between 60 and 100+ km per charge. You'll find the exact figure for each model on its product page, tested under both real-world and standardized conditions.",
  },
  {
    question: "Do I need a license to ride a Lencar scooter?",
    answer:
      "It depends on the model's top speed and your country's regulations. Kickscooters and low-power mopeds are often license-free, while faster models may require a moped or motorcycle license. Check your local rules or ask at your nearest Lencar store.",
  },
  {
    question: "What does the warranty actually cover?",
    answer:
      "Every Lencar comes with 2 years of coverage on the vehicle and 2 years on the battery, valid across the EU. It covers manufacturing defects and workmanship issues — normal wear items like tires and brake pads aren't included.",
  },
  {
    question: "Can I swap or charge the battery at home?",
    answer:
      "Yes — most Lencar batteries are removable, so you can charge them indoors on a standard outlet. You can also use the public service network for swaps and top-ups when you're out on a longer ride.",
  },
  {
    question: "How do I book a free test ride?",
    answer:
      "Use the \"Book a test ride\" button on this page to find a participating dealer near you. There's no reservation fee and no obligation to buy — just show up, hop on, and see how it feels.",
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