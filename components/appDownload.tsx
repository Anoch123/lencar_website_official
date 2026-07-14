import { MapPin, BatteryCharging, ShieldCheck, Gauge } from "lucide-react";
import { TbBrandCarbon } from "react-icons/tb";

function AppleMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.365 1.43c0 1.14-.462 2.06-1.184 2.75-.79.75-1.936 1.34-3.02 1.25-.115-1.1.436-2.24 1.16-2.94.79-.77 2.06-1.33 3.044-1.06zM20.7 17.15c-.5 1.15-.74 1.66-1.38 2.68-.9 1.42-2.16 3.2-3.73 3.21-1.4.02-1.76-.92-3.66-.91-1.9.01-2.3.93-3.7.91-1.57-.02-2.76-1.62-3.66-3.04C2.1 16.9 1.4 12.9 3.05 10.24c.9-1.46 2.5-2.38 4.06-2.4 1.5-.02 2.5.98 3.55.98 1.05 0 2.4-1.21 4.05-1.03.69.03 2.62.28 3.86 2.1-1.4.87-2.44 2.26-2.42 4 .02 2.35 1.9 3.34 2.61 3.66z"/>
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.5 3.5a1 1 0 0 0-.5.87v15.26a1 1 0 0 0 .5.87l9.9-8.5-9.9-8.5z" opacity=".85"/>
      <path d="M15.8 12l3.4-1.95a1 1 0 0 0 0-1.72L15.65 6.3 12.1 12l3.55 5.7 3.55-2.03a1 1 0 0 0 0-1.72L15.8 12z"/>
    </svg>
  );
}

function StoreBadge({
  kicker,
  title,
  icon,
}: {
  kicker: string;
  title: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className="group flex items-center gap-3 rounded-lg border border-[#0b0b0c]/15 bg-white px-5 py-3 transition-colors hover:border-[#0b0b0c]/35 hover:bg-[#0b0b0c]/[0.03]"
    >
      <span className="text-[#0b0b0c]">{icon}</span>
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

function StatChip({
  icon,
  label,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute flex items-center gap-2 rounded-full border border-[#0b0b0c]/10 bg-white px-3.5 py-2 shadow-[0_12px_28px_rgba(11,11,12,0.12)] ${className}`}
    >
      <span className="text-[#e30613]">{icon}</span>
      <span className="font-body text-[12px] font-medium text-[#0b0b0c] whitespace-nowrap">
        {label}
      </span>
    </div>
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
          <p className="font-body text-[13px] font-bold uppercase tracking-[0.14em] text-[#e30613]">
            Get the App
          </p>
          <h2 className="font-display mt-4 text-[32px] font-black uppercase italic leading-[1.05] tracking-tight sm:text-[40px] lg:text-[48px]">
            Your Scooter,<br />in Your Pocket.
          </h2>
          <p className="font-body mt-6 max-w-md text-[18px] leading-relaxed text-[#4a4a4d]">
            Track your ride live, get an alert the second someone touches your
            scooter, and check battery health before you head out — free on
            iOS and Android.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <StoreBadge kicker="Download on the" title="App Store" icon={<AppleMark />} />
            <StoreBadge kicker="Get it on" title="Google Play" icon={<PlayMark />} />
          </div>

          <div className="mt-8 flex items-center gap-3 text-[#4a4a4d]/70">
            <div className="h-px w-10 bg-[#0b0b0c]/15" />
            <span className="font-body text-[12px] uppercase tracking-[0.1em]">
              Free download · 4.8 average rating
            </span>
          </div>
        </div>

        {/* phone mockup with floating live-data chips */}
        <div className="relative mx-auto flex h-[520px] w-full max-w-[380px] items-center justify-center">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#e30613]/[0.07] blur-3xl" />

          <div className="relative h-[480px] w-[240px] rounded-[2.4rem] border-[6px] border-[#0b0b0c] bg-white shadow-[0_30px_60px_rgba(11,11,12,0.18)]">
            <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-[#0b0b0c]" />
            <div className="flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-white p-4 pt-8">
              <span className="font-body text-[10px] uppercase tracking-[0.14em] text-[#4a4a4d]">
                Live Ride
              </span>
              <div className="mt-3 flex-1 rounded-2xl border border-[#0b0b0c]/10 bg-[#f7f7f8]">
                <div className="flex h-full items-center justify-center">
                  <MapPin className="h-8 w-8 text-[#e30613]" strokeWidth={2.2} />
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-[#0b0b0c]/10 bg-white p-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-[11px] text-[#4a4a4d]">Battery</span>
                  <span className="font-body text-[13px] font-semibold text-[#0b0b0c]">92%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#0b0b0c]/10">
                  <div className="h-full w-[92%] rounded-full bg-[#e30613]" />
                </div>
              </div>
            </div>
          </div>

          <StatChip
            icon={<ShieldCheck className="h-4 w-4" strokeWidth={2.2} />}
            label="Locked & Secure"
            className="left-0 top-10"
          />
          <StatChip
            icon={<TbBrandCarbon className="h-4 w-4" strokeWidth={2.2} />}
            label="Total Carbon Saved"
            className="right-0 top-1/2 -translate-y-1/2"
          />
          <StatChip
            icon={<BatteryCharging className="h-4 w-4" strokeWidth={2.2} />}
            label="Full charge · 3h left"
            className="bottom-8 left-4"
          />
        </div>
      </div>
    </section>
  );
}