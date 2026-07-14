"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Shield, Zap, Sparkles, Smartphone } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "Blazing Fast Performance",
    desc: "Experience sub-millisecond response times powered by our edge network.",
    icon: Zap,
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Bank-Grade Security",
    desc: "Your data is completely encrypted at rest and in transit automatically.",
    icon: Shield,
    color: "bg-emerald-600",
  },
  {
    id: 3,
    title: "AI-Powered Insights",
    desc: "Get automated growth tips tailored specifically to your daily workflow.",
    icon: Sparkles,
    color: "bg-purple-600",
  },
  {
    id: 4,
    title: "Mobile First Design",
    desc: "Manage your entire operations stack seamlessly on any modern device.",
    icon: Smartphone,
    color: "bg-orange-600",
  },
];

export default function FeatureScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-slate-930">
      {/* Sticky Viewport Container. h-[100dvh] avoids mobile browser
          chrome (address bar) resizing the viewport under you. */}
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden px-4 py-8 md:px-20">
        <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">

          {/* Visual panel: shown on ALL breakpoints now (was hidden on
              mobile), sized down on small screens. Placed first on
              mobile via order- so the image reads above the caption. */}
          <div className="relative order-first flex h-[220px] w-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 sm:h-[280px] md:order-last md:h-[450px]">
            {FEATURES.map((feature, idx) => {
              const start = idx / FEATURES.length;
              const end = (idx + 1) / FEATURES.length;

              return (
                <FeatureVisual
                  key={feature.id}
                  feature={feature}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </div>

          {/* Text descriptions: needs an explicit height at every
              breakpoint because every child is `absolute`, so the
              container itself has no natural height to stack them in. */}
          <div className="relative order-last h-[220px] w-full md:order-first md:h-[450px]">
            {FEATURES.map((feature, idx) => {
              const start = idx / FEATURES.length;
              const end = (idx + 1) / FEATURES.length;

              return (
                <FeatureText
                  key={feature.id}
                  feature={feature}
                  progress={scrollYProgress}
                  range={[start, start + 0.1, end - 0.1, end]}
                />
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-component for individual feature text transitions
function FeatureText({ feature, progress, range }: any) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex max-w-md flex-col justify-center space-y-3 md:space-y-4"
    >
      <div className={`inline-flex w-fit rounded-xl p-2.5 text-white md:p-3 ${feature.color}`}>
        <feature.icon className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <h3 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">{feature.title}</h3>
      <p className="text-sm text-slate-400 sm:text-base md:text-lg">{feature.desc}</p>
    </motion.div>
  );
}

// Sub-component for individual feature visual transitions
function FeatureVisual({ feature, progress, range }: any) {
  const opacity = useTransform(progress, range, [0, 1]);
  const scale = useTransform(progress, range, [0.8, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`absolute inset-3 flex flex-col items-center justify-center rounded-xl text-white shadow-2xl sm:inset-4 md:inset-6 ${feature.color} p-4 md:p-6`}
    >
      <feature.icon className="mb-2 h-12 w-12 animate-pulse sm:h-16 sm:w-16 md:mb-4 md:h-20 md:w-20" />
      <span className="text-[10px] font-mono tracking-widest opacity-70 sm:text-xs md:text-sm">
        DISPLAY MOCKUP #{feature.id}
      </span>
    </motion.div>
  );
}