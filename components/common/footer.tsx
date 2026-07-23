import { ICONS, LINK_GROUPS, OFFICE_DETAILS, SOCIALS } from "@/lib/constants/footer";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0b0b0c]">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_0.9fr_0.9fr] lg:gap-8">
          {/* -------------------------------------------------------- */}
          {/* Brand column                                             */}
          {/* -------------------------------------------------------- */}
          <div>
            <Image
              src="/images/logo.png"
              alt="NIU"
              width={96}
              height={28}
              className="h-7 w-auto"
            />
            <p className="font-body mt-4 max-w-xs text-[14px] leading-relaxed text-[#8b8b90]">
              Smart electric scooters for the ride ahead. Designed in Europe,
              ridden everywhere.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-[#6b6b70] transition-colors hover:text-[#f5f4f1]"
                >
                  <span className="sr-only">{social.label}</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* -------------------------------------------------------- */}
          {/* Office details (plain info, not a link list)             */}
          {/* -------------------------------------------------------- */}
          <div>
            <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b6b70]">
              {OFFICE_DETAILS.heading}
            </p>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#6b6b70]"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {ICONS.pin.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                <span className="font-body text-[14px] leading-relaxed text-[#a3a3a8]">
                  {OFFICE_DETAILS.address}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#6b6b70]"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {ICONS.mail.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                <a
                  href={`mailto:${OFFICE_DETAILS.email}`}
                  className="font-body text-[14px] leading-relaxed text-[#a3a3a8] transition-colors hover:text-[#f5f4f1]"
                >
                  {OFFICE_DETAILS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 text-[#6b6b70]"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  {ICONS.phone.map((d) => (
                    <path key={d} d={d} />
                  ))}
                </svg>
                <a
                  href={`tel:${OFFICE_DETAILS.phone.replace(/\s+/g, "")}`}
                  className="font-body text-[14px] leading-relaxed text-[#a3a3a8] transition-colors hover:text-[#f5f4f1]"
                >
                  {OFFICE_DETAILS.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* -------------------------------------------------------- */}
          {/* Link columns                                             */}
          {/* -------------------------------------------------------- */}
          {LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-[#6b6b70]">
                {group.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-[14px] text-[#a3a3a8] transition-colors hover:text-[#f5f4f1]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Bottom bar                                                   */}
        {/* ------------------------------------------------------------ */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="font-body text-[13px] text-[#6b6b70]">
            © {new Date().getFullYear()} Lencar International. All rights
            reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {["Privacy policy"].map(
              (item) => (
                <a
                  key={item}
                  href={"/privacy-policy"}
                  className="font-body text-[13px] text-[#6b6b70] transition-colors hover:text-[#f5f4f1]"
                >
                  {item}
                </a>
              )
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}