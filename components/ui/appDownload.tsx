import { MapPin, BatteryCharging, ShieldCheck, Gauge } from "lucide-react";
import { TbBrandCarbon } from "react-icons/tb";
import Image from "next/image";

function StoreBadge({
  href = "#",
  kicker,
  title,
  icon,
}: {
  href?: string;
  kicker: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-lg border border-[#0b0b0c]/15 bg-white px-5 py-3 transition-colors hover:border-[#0b0b0c]/35 hover:bg-[#0b0b0c]/[0.03]"
    >
      <span className="flex h-6 w-6 items-center justify-center text-[#0b0b0c]">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-body text-[10px] uppercase tracking-[0.12em] text-[#4a4a4d]">
          {kicker}
        </span>
        <span className="font-body text-[15px] font-semibold text-[#0b0b0c]">
          {title}
        </span>
      </span>
    </a>
  );
}

export default function AppDownload() {
  return (
    <section className="relative overflow-hidden border-y border-[#0b0b0c]/10 bg-[#f7f7f8] py-24 text-[#0b0b0c]">
      {/* faint dot texture, consistent with the rest of the brand's quiet detailing */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: "radial-gradient(#0b0b0c 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:px-8">
        {/* copy + badges */}
        <div>
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#0F4C81]">
            Get the App
          </p>
          <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight sm:text-[40px] lg:text-[48px]">
            Your Scooter,<br />Always within a reach.
          </h2>
          <p className="font-body mt-6 max-w-md text-[18px] leading-relaxed text-[#4a4a4d]">
            Take control of your Lencar electric scooter with the free Lencar EZR Power Hub App—<br />All from your smartphone. Download it free on iOS and Android.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <StoreBadge
              href="https://apps.apple.com/lk/app/ezr-power-hub/id6479234704"
              kicker="Download on the"
              title="App Store"
              icon={
                <Image src="/images/apple.png" alt="Apple App Store" width={20} height={20} />
              }
            />
            <StoreBadge
              href="https://play.google.com/store/apps/details?id=com.ezr.pwer.mobile&hl=en"
              kicker="Get it on"
              title="Google Play"
              icon={
                <Image src="/images/playstore.png" alt="Google Play Store" width={20} height={20} />
              }
            />
          </div>

          <div className="mt-8 flex items-center gap-3 text-[#4a4a4d]/70">
            <div className="h-px w-10 bg-[#0b0b0c]/15" />
            <span className="font-body text-[12px] uppercase tracking-[0.1em]">
              Free download
            </span>
            <div className="h-px w-10 bg-[#0b0b0c]/15" />
          </div>
        </div>

        {/* app image */}
        <div className="relative mx-auto flex h-[520px] w-full max-w-[380px] items-center justify-center">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#0F4C81]/[0.07] blur-3xl" />

          <img
            src="/images/downloading.png"
            alt="App download illustration"
            className="relative w-full max-w-[250px] rounded-[2rem] object-contain shadow-[0_30px_60px_rgba(11,11,12,0.18)]"
          />
        </div>
      </div>
    </section>
  );
}