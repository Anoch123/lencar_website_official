import Image from "next/image";

type LinkGroup = {
  heading: string;
  links: { label: string; href: string }[];
};

const OFFICE_DETAILS = {
  heading: "Office",
  address: "29, Grenier Road, Colombo – 08, Sri Lanka.",
  email: "info@lencar.lk",
  phone: "+94 713 391 391",
};

const LINK_GROUPS: LinkGroup[] = [
  {
    heading: "Quick Links",
    links: [
      { label: "My Lencar", href: "/my-lencar" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Terms & Conditions", href: "../pdfs/terms-and-condition.pdf" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Dealer Points", href: "/dealer-network" },
    ],
  },
  {
    heading: "Our Products",
    links: [
      { label: "eRc 80 - eScooter", href: "/lencar-bikes/erc-80" },
      { label: "eRc 80+ - eScooter", href: "/lencar-bikes/erc-80-plus" },
      { label: "Zivi", href: "/lencar-bikes/zivi" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "#", path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.9 4.9 0 011.772 1.153 4.9 4.9 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.9 4.9 0 01-1.153 1.772 4.9 4.9 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.9 4.9 0 01-1.772-1.153 4.9 4.9 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.9 4.9 0 011.153-1.772A4.9 4.9 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 1.802a3.333 3.333 0 110 6.666 3.333 3.333 0 010-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
  { label: "Facebook", href: "#", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
  { label: "YouTube", href: "#", path: "M21.582 7.186a2.51 2.51 0 00-1.768-1.779C18.254 5 12 5 12 5s-6.254 0-7.814.407a2.51 2.51 0 00-1.768 1.78C2 8.756 2 12 2 12s0 3.244.418 4.814a2.51 2.51 0 001.768 1.779C5.746 19 12 19 12 19s6.254 0 7.814-.407a2.51 2.51 0 001.768-1.779C22 15.244 22 12 22 12s0-3.244-.418-4.814zM10 15.5v-7l6 3.5-6 3.5z" },
  { label: "X", href: "#", path: "M13.982 10.622 20.412 3h-1.524l-5.583 6.618L8.85 3H3.5l6.744 9.577L3.5 21h1.524l5.898-6.99L15.964 21H21.3l-7.318-10.378zm-2.088 2.475-.684-.957L5.775 4.155h2.34l4.386 6.14.684.957 5.702 7.984h-2.34l-4.653-6.514z" },
];

// Small inline icons for the office details block (Heroicons v2, 20x20 solid)
const ICONS = {
  pin: [
    "M9.69 18.933l.003.001.006.003.018.008a5.741 5.741 0 00.28.14c.186.093.446.235.757.427.62.383 1.445.966 2.274 1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z",
  ],
  mail: [
    "M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z",
    "M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z",
  ],
  phone: [
    "M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-.54 1.539l-.822.62a.75.75 0 00-.272.822 11.978 11.978 0 007.5 7.5.75.75 0 00.822-.272l.62-.822a1.5 1.5 0 011.539-.54l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z",
  ],
};

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