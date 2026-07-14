"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import AllPageHero from "@/components/allPageHero";
import { useEffect, useState } from "react";

const sections = [
  { id: "data-controllers", label: "Data Controllers" },
  { id: "data-we-collect", label: "The Data We Collect" },
  { id: "how-data-is-used", label: "How Your Data Is Used" },
  { id: "cookies", label: "Cookies & Tracking" },
  { id: "data-protected", label: "How Your Data Is Protected" },
  { id: "data-shared", label: "How Your Data Is Shared" },
  { id: "retention", label: "Retention of Your Data" },
  { id: "preferences", label: "Your Data Rights & Preferences" },
  { id: "policy-changes", label: "Changes to the Policy" },
  { id: "contact", label: "How to Contact Us" },
  { id: "other-sites", label: "Links to Other Websites" },
  { id: "effective-date", label: "Effective Dates & Amendments" },
];

function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-body text-[13px] font-black text-[#e30613]">
        {number}
      </span>
      <h2 className="font-display text-[22px] font-black uppercase italic leading-tight tracking-tight text-[#0b0b0c] sm:text-[26px]">
        {title}
      </h2>
    </div>
  );
}

function DataCard({ title, items }: { title: string; items: string[] }) {
    
  return (
    <div className="rounded-lg border border-[#0b0b0c]/10 bg-[#f7f7f8] p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e30613]" />
        <span className="font-body text-[13px] font-bold uppercase tracking-[0.06em] text-[#0b0b0c]">
          {title}
        </span>
      </div>
      <ul className="space-y-1.5 pl-1 font-body text-[14px] leading-relaxed text-[#4a4a4d]">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0b0b0c]/30" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LetterCard({
  letter,
  title,
  items,
}: {
  letter: string;
  title: string;
  items: string[];
}) {
  return (
    <div className="flex gap-4 rounded-lg border border-[#0b0b0c]/10 p-5">
      <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b0b0c] text-[13px] font-black text-white">
        {letter}
      </span>
      <div>
        <p className="font-body text-[14px] font-bold text-[#0b0b0c]">{title}</p>
        <ul className="mt-2 space-y-1.5 font-body text-[14px] leading-relaxed text-[#4a4a4d]">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#0b0b0c]/30" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const usageTable = [
  {
    why: "To facilitate your subscription to our products/services",
    data: ["Your account information.", "Data we collect about you from third parties."],
  },
  {
    why: "To carry out payments",
    data: ["Your account information.", "Data you create while using our products and services."],
  },
  {
    why: "To process any requests you make, and for customer support",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
    ],
  },
  {
    why: "To provide you with real-time updates on charging/swapping facilities",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
    ],
  },
  {
    why: "To provide you with real-time updates on your vehicle",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
    ],
  },
  {
    why: "To personalise your experience",
    data: ["Data you create while using our products and services.", "Data about you that is automatically collected."],
  },
  {
    why: "For marketing and promoting",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
      "Data we collect about you from third parties.",
    ],
  },
  {
    why: "To send non-market communications to users of our products/services",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
    ],
  },
  {
    why: "For research and development",
    data: [
      "Your account information.",
      "Data you create while using our products and services.",
      "Data about you that is automatically collected.",
      "Data we collect about you from third parties.",
    ],
  },
];

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState(sections[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
                }
            });
            },
            {
            rootMargin: "-25% 0px -60% 0px",
            threshold: 0,
            }
        );

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

  return (
    <div>
      <AllPageHero
        eyebrow="Lencar Privacy"
        heading={["Privacy Policy", <><span className="text-[#e30613]">Lencar.</span></>]}
        description="How SL Mobility collects, uses, and protects your personal data across the Lencar website, the EZR App, and our vehicles."
      />

      <main className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          {/* effective date + intro */}
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0b0b0c]/10 bg-[#f7f7f8] px-4 py-1.5 font-body text-[12px] font-semibold uppercase tracking-[0.08em] text-[#4a4a4d]">
              Effective from 18th February 2025
            </span>

            <p className="mt-6 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
              SL Mobility (Pvt.) Limited (&ldquo;SL Mobility&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to providing
              convenient and eco-friendly transport solutions, using the latest technology in connectivity and
              sustainability.
            </p>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
              When you use our products and services, you trust us with your personal data. We ask that you read
              and familiarise yourself with this Privacy Policy, as it explains how we use your personal data to
              offer you a better service while protecting your privacy.
            </p>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">This Privacy Policy describes how SL Mobility and its affiliates collect, process, and protect the personal data of:</p>
            <ul className="mt-3 space-y-1.5 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
              {[
                "Visitors and users of the Lencar website.",
                "Users of the EZR App.",
                "People who do business with us and/or register for our services.",
                "People who purchase and use Lencar vehicles.",
                "People who use the battery charging/swapping facilities linked to the EZR App.",
                "People who make/send payments to us or our affiliates.",
                "Any person who discloses their personal information via the Lencar website, the EZR App, or via email or in physical form (e.g. by filling out a form during our promotional campaigns).",
              ].map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#e30613]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* sidebar + content */}
          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr] lg:gap-16">
            {/* TOC */}
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <span className="font-body text-[11px] font-bold uppercase tracking-[0.14em] text-[#8a8a8e]">
                  On this page
                </span>
                <nav className="mt-4 space-y-1 border-l border-[#0b0b0c]/10">
                  {sections.map((s, i) => (
                    <a
                        key={s.id}
                        href={`#${s.id}`}
                        className={`-ml-px flex items-center gap-3 border-l-2 py-2 pl-4 transition-all duration-300 ${
                            activeSection === s.id
                            ? "border-[#e30613] bg-[#fff5f5] text-[#0b0b0c] font-semibold"
                            : "border-transparent text-[#4a4a4d] hover:border-[#e30613] hover:text-[#0b0b0c]"
                        }`}
                        >
                        <span
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                            activeSection === s.id
                                ? "bg-[#e30613] opacity-100"
                                : "bg-transparent opacity-0"
                            }`}
                        />
                        <span
                            className={`transition-all duration-300 ${
                            activeSection === s.id
                                ? "text-[#e30613] font-bold"
                                : "text-[#a5a5a5]"
                            }`}
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{s.label}</span>
                        </a>
                  ))}
                </nav>

                <div className="mt-8 rounded-lg border border-[#0b0b0c]/10 bg-[#f7f7f8] p-5">
                  <p className="font-body text-[13px] font-bold text-[#0b0b0c]">Questions about your data?</p>
                  <p className="mt-1 font-body text-[13px] leading-relaxed text-[#4a4a4d]">
                    Reach our Head of Operations directly.
                  </p>
                  <a
                    href="mailto:info@lencar.lk"
                    className="mt-3 inline-block font-body text-[13px] font-semibold text-[#e30613] hover:underline"
                  >
                    info@lencar.lk
                  </a>
                </div>
              </div>
            </aside>

            {/* mobile TOC */}
            <nav className="flex flex-wrap gap-2 lg:hidden">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-[#0b0b0c]/10 bg-[#f7f7f8] px-3 py-1.5 font-body text-[12px] font-medium text-[#4a4a4d]"
                >
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </a>
              ))}
            </nav>

            {/* content */}
            <div className="max-w-3xl">
              {/* 1 */}
              <section id="data-controllers" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10 first:pt-0">
                <SectionHeading number="01" title="Data Controllers" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    SL Mobility (Pvt.) Limited of No 115/5-115/15, Moragasmulla Road, Rajagiriya, Sri Lanka
                    (PV No. 108147), and EZR Power Hubs (Pvt.) Limited of No. 29, Grenier Road, Borella,
                    Colombo 08, Sri Lanka (PV No. 00279226), are the data controllers for the data collected
                    in connection with the use of the products and services we provide.
                  </p>
                </div>
              </section>

              {/* 2 */}
              <section id="data-we-collect" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="02" title="The Data We Collect" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    We are in the business of providing technologically advanced transport solutions,
                    products, and related services. When you purchase or subscribe to our products and/or
                    receive our services and/or engage with us electronically or physically, we collect all
                    or some of the following categories of data. Please note that not all information listed
                    below is collected at the same time.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <DataCard
                    title="Data provided by you"
                    items={[
                      "Name, age, gender",
                      "Postal and email addresses",
                      "Mobile, residential, and official phone numbers",
                      "National Identity Card, passport, or driving license numbers",
                      "Bank account number and details",
                    ]}
                  />
                  <DataCard
                    title="Data you create while using our services"
                    items={[
                      "Electronic images and videos via the EZR App or vehicle software",
                      "Physical images submitted with any physical form",
                      "Usage data and preferences",
                      "Vehicle type(s) and details",
                      "Charging centre(s) and battery swapping facilities used",
                      "Location information, trip distances, and transaction information",
                      "Bank account and payment card details",
                      "Details of other EZR App users you share your vehicle with",
                    ]}
                  />
                  <DataCard
                    title="Data automatically collected"
                    items={[
                      "Images and videos collected through the vehicle software",
                      "Vehicle location and details at a point in time",
                      "Vehicle performance: distance travelled, battery, engine, and brake condition, system diagnostics",
                      "Duration of your use of the vehicle or the EZR App",
                      "Information provided through cookies on our website",
                    ]}
                  />
                  <DataCard
                    title="Data we collect from third parties"
                    items={[
                      "Credit reference agencies",
                      "Insurance or financial service providers",
                      "Public officials",
                      "Used to help us improve the products and services we offer you",
                    ]}
                  />
                </div>

                <div className="mt-6 rounded-lg border border-[#0b0b0c]/10 p-6">
                  <p className="font-body text-[14px] font-bold uppercase tracking-[0.06em] text-[#0b0b0c]">
                    Data Collection Through T-Box &amp; Processing
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                    The T-Box includes a SIM card that enables SL Mobility to collect real-time data related
                    to vehicle location and ride patterns, battery charge cycles and usage, system diagnostics
                    and maintenance status, and speed, acceleration, and braking patterns.
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                    This processing is conducted in compliance with the Personal Data Protection Act (PDPA)
                    of Sri Lanka, and is based on contractual necessity (providing mobility services),
                    legitimate interest (fleet optimisation and safety), and legal and regulatory compliance.
                    It is used to ensure seamless operation and safety of our e-scooter services, to provide
                    real-time diagnostics and customer support, and to analyse and improve service performance.
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                    T-Box data may be shared with EZR Power Hub for battery performance analytics, with
                    regulatory authorities where required by law, and with third-party service providers
                    strictly for operational purposes. No personal data will be sold, rented, or disclosed to
                    third parties for marketing without your explicit consent.
                  </p>
                  <p className="mt-3 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                    You have the right to request access to your collected data, and to request correction or
                    deletion, subject to our legal obligations. Data is retained for as long as necessary to
                    provide our services and meet legal requirements, and is protected with industry-standard
                    encryption and security measures.
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-[#0b0b0c]/10 p-5">
                    <p className="font-body text-[14px] font-bold text-[#0b0b0c]">Battery Rental &amp; Usage Monitoring</p>
                    <p className="mt-2 font-body text-[14px] leading-relaxed text-[#4a4a4d]">
                      As batteries are rented and remain the property of SL Mobility or its affiliates, we
                      monitor charging and swapping history, and battery health and usage behaviour (e.g.
                      overcharging, unauthorised handling), to detect improper use, enforce penalties where
                      needed, and improve battery performance.
                    </p>
                  </div>
                  <div className="rounded-lg border border-[#0b0b0c]/10 p-5">
                    <p className="font-body text-[14px] font-bold text-[#0b0b0c]">Leasing Arrangements &amp; Compliance</p>
                    <p className="mt-2 font-body text-[14px] leading-relaxed text-[#4a4a4d]">
                      If your e-bike is purchased through a leasing company, we may share vehicle registration
                      and ownership status, service and maintenance history, and any violations or penalties
                      with the leasing provider, and will comply with their instructions on service eligibility
                      and operational requirements.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-lg border border-[#0b0b0c]/10 p-5">
                  <p className="font-body text-[14px] font-bold text-[#0b0b0c]">Enforcement of Terms &amp; Penalties</p>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-[#4a4a4d]">
                    We may collect, store, and process data related to service violations (e.g. battery misuse,
                    tampering, or non-payment), penalties and outstanding charges, and legal or compliance
                    actions taken against a user. This data may be retained for legal compliance, dispute
                    resolution, and service enforcement.
                  </p>
                </div>
              </section>

              {/* 3 */}
              <section id="how-data-is-used" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="03" title="How Your Data Is Used" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    We process your personal data in compliance with the Personal Data Protection Act No. 9
                    of 2022. The data we gather is used to continue offering you eco-friendly transport
                    services that are convenient and reliable, including to facilitate your subscription, carry
                    out payments, process requests and provide customer support, share real-time updates on
                    charging/swapping facilities and vehicle condition, personalise your experience, market and
                    promote our products, send non-marketing communications, and support research and
                    development.
                  </p>
                  <p>
                    We may also use aggregate, de-identified data and statistics to monitor and improve the
                    Lencar website, the EZR App, and our products and services, and may share such aggregate
                    data with third-party market researchers, business analysts, and investors.
                  </p>
                </div>

                <div className="mt-6 overflow-hidden rounded-lg border border-[#0b0b0c]/10">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="bg-[#0b0b0c]">
                        <th className="font-body px-5 py-3 text-[12px] font-bold uppercase tracking-[0.06em] text-white">
                          Why your data is used
                        </th>
                        <th className="font-body px-5 py-3 text-[12px] font-bold uppercase tracking-[0.06em] text-white">
                          Relevant data categories
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {usageTable.map((row, i) => (
                        <tr key={i} className={i % 2 === 1 ? "bg-[#f7f7f8]" : "bg-white"}>
                          <td className="font-body border-t border-[#0b0b0c]/10 px-5 py-4 align-top text-[14px] font-semibold text-[#0b0b0c]">
                            {row.why}
                          </td>
                          <td className="font-body border-t border-[#0b0b0c]/10 px-5 py-4 align-top text-[14px] text-[#4a4a4d]">
                            <ul className="space-y-1">
                              {row.data.map((d, j) => (
                                <li key={j}>{d}</li>
                              ))}
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 4 */}
              <section id="cookies" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="04" title="Cookies & Other Information-Gathering Technologies" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    Our websites use cookies — text files placed on your computer to collect standard internet
                    log information and visitor behaviour. This information is used to track visitor use of the
                    website and compile statistical reports on website activity. For further information about
                    cookies, visit{" "}
                    <a href="https://www.aboutcookies.org" className="text-[#e30613] hover:underline" target="_blank" rel="noreferrer">
                      aboutcookies.org
                    </a>{" "}
                    or{" "}
                    <a href="https://www.allaboutcookies.org" className="text-[#e30613] hover:underline" target="_blank" rel="noreferrer">
                      allaboutcookies.org
                    </a>
                    .
                  </p>
                  <p>
                    You can set your browser to reject cookies; the sites above explain how to remove cookies
                    from your browser. However, certain features of our website may not function if you remove
                    cookies.
                  </p>
                  <p>
                    We may also allow third parties to provide audience measurement and analytics for us, serve
                    advertisements on our behalf, and track and report on the performance of those
                    advertisements. These entities may use cookies, web beacons, SDKs, and other technologies to
                    identify devices used by visitors to our websites, and when they visit other online sites
                    and services.
                  </p>
                </div>
              </section>

              {/* 5 */}
              <section id="data-protected" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="05" title="How Your Data Is Protected" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>The security and integrity of your data is important to us. We have put in place the following measures to safeguard your personal data:</p>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Encryption in transit and at rest of personal data under the \u2018account information\u2019 and \u2018data you create while using our services\u2019 categories.",
                      "Browser certificates and SSL certificates for our websites and platforms.",
                      "Ongoing awareness training for our employees, advisors, and representatives on data protection and privacy.",
                      "Employment protocols governing the processing, handling, and storing of personal data.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e30613]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p>
                    We use all reasonable efforts to safeguard your personal information; however, use of the
                    internet is not entirely secure, and we cannot guarantee the security or integrity of
                    information transferred via the internet. If a data breach occurs on our end, we will
                    immediately take the necessary steps to remedy it and notify the relevant parties in
                    compliance with applicable legal requirements.
                  </p>
                </div>
              </section>

              {/* 6 */}
              <section id="data-shared" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="06" title="How Your Data Is Shared & Disclosed" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>Some features of our products and services require sharing data with our affiliates and business partners. Data may be shared with and disclosed to:</p>
                </div>

                <div className="mt-6 space-y-4">
                  <LetterCard
                    letter="A"
                    title="EZR Power Hubs (Pvt.) Limited — developer of the EZR App, an affiliate of SL Mobility"
                    items={[
                      "Name, age, gender, postal and email addresses, contact numbers, National Identity Card/Passport/Driving License numbers",
                      "Vehicle manufacturer, model, license plate number, and photo, plus condition and battery status",
                      "Electronic images and videos submitted via the website or vehicle software",
                      "Vehicle performance: distance travelled, battery, engine, and brake condition, system diagnostics",
                      "Vehicle location and details at a point in time",
                      "Charging centre(s) and battery storage facilities used",
                    ]}
                  />
                  <LetterCard
                    letter="B"
                    title="Vendors of battery charging/swapping stations"
                    items={[
                      "Name, contact details, and location of a purchaser/user of Lencar products or services",
                      "Vehicle manufacturer, model, license plate number, photo, condition, and battery status",
                    ]}
                  />
                  <LetterCard
                    letter="C"
                    title="SL Mobility's business partners and service providers"
                    items={[
                      "Marketing platform providers, including social media advertising services and networks",
                      "Insurance and financial service providers",
                      "Research partners, including market researchers and survey providers",
                      "Payment processors and cloud storage providers",
                      "Identity verification service providers",
                      "Our consultants, legal advisors, accountants, and other professional service providers",
                    ]}
                  />
                  <LetterCard
                    letter="D"
                    title="Persons a user has requested data to be shared with"
                    items={[
                      "For example, a prospective buyer of a vehicle or a technician you've asked us to share vehicle data with",
                      "Requests related to third-party promotions offered in partnership with SL Mobility",
                    ]}
                  />
                  <LetterCard
                    letter="E"
                    title="Law enforcement or government authorities, for legal action"
                    items={[
                      "Where disclosure is required by law, regulation, or judicial process, or warranted for security and safety",
                      "In the event of a dispute, to comply with judicial or administrative proceedings or to enforce our Terms of Service",
                    ]}
                  />
                  <LetterCard
                    letter="F"
                    title="Leasing companies, for ownership verification and compliance"
                    items={["Vehicle registration and ownership status, service and maintenance history, and any violations or penalties"]}
                  />
                </div>
              </section>

              {/* 7 */}
              <section id="retention" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="07" title="Retention of Your Data" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    As our products and services depend on processing data, we retain your data for as long as
                    necessary for the purposes described in this policy. Retention periods are based on the
                    category of data, the type of user, and the purpose for which it was collected — for
                    example, we may retain transactional data longer to comply with legal or regulatory
                    requirements, prevent fraud, or address ongoing disputes and outstanding payments.
                  </p>
                  <p>
                    You may request disclosure of retained data, or corrections to inaccurate data, by emailing{" "}
                    <a href="mailto:info@lencar.lk" className="text-[#e30613] hover:underline">info@lencar.lk</a>{" "}
                    or by post to the Head of Operations, 29 Grenier Road, Colombo 08, Sri Lanka. Disclosure
                    requests may be subject to a processing fee.
                  </p>
                  <p>
                    You may also request deletion of an account, profile, or subscription at any time. On
                    receiving a deletion request, we will delete your account, profile, and subscription data —
                    though we may continue to retain some data where required by law or for the other purposes
                    described in this policy. Note that deleting data may affect your ability to access or use
                    our products and services.
                  </p>
                </div>
              </section>

              {/* 8 */}
              <section id="preferences" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="08" title="Your Data Rights & Preferences" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>We value your agency over how your data is used. You can review your consents and adjust your data preferences at any time by:</p>
                  <ul className="space-y-2 pl-1">
                    {[
                      "Accessing and reviewing Privacy and Cookies settings on the Lencar website and the EZR App.",
                      "Accessing and reviewing Device Permissions on the device(s) you use to access our products/services.",
                      "Making a request to access and review your data.",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#e30613]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 9 */}
              <section id="policy-changes" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="09" title="Changes to the Privacy Policy" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    This Privacy Policy is regularly reviewed to ensure your information is safeguarded. If we
                    make changes, we will post notice of the changes on the Lencar website and/or update the
                    EZR App, so you can review how your information is collected and used.
                  </p>
                  <p>
                    Your failure or refusal to consent to any amendments to this Privacy Policy will constitute
                    immediate termination of any agreement(s) between you and SL Mobility.
                  </p>
                </div>
              </section>

              {/* 10 */}
              <section id="contact" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="10" title="How to Contact Us" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>We welcome your views on our products and services, the Lencar website, the EZR App, and this Privacy Policy.</p>
                </div>
                <div className="mt-5 flex flex-col gap-4 rounded-lg border border-[#0b0b0c]/10 bg-[#f7f7f8] p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-body text-[13px] font-bold uppercase tracking-[0.08em] text-[#8a8a8e]">Email</p>
                    <a href="mailto:info@lencar.lk" className="font-body text-[16px] font-semibold text-[#0b0b0c] hover:text-[#e30613]">
                      info@lencar.lk
                    </a>
                  </div>
                  <div>
                    <p className="font-body text-[13px] font-bold uppercase tracking-[0.08em] text-[#8a8a8e]">Postal Address</p>
                    <p className="font-body text-[15px] font-semibold text-[#0b0b0c]">
                      Head of Operations, 29 Grenier Road, Colombo 08, Sri Lanka
                    </p>
                  </div>
                </div>
              </section>

              {/* 11 */}
              <section id="other-sites" className="scroll-mt-32 border-b border-[#0b0b0c]/10 py-10">
                <SectionHeading number="11" title="Links to Other Websites" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>
                    The Lencar website and the EZR App contain links to other websites. This Privacy Policy
                    only applies to our products and services — when you link to other websites, you should
                    familiarise yourself with their own privacy policies.
                  </p>
                </div>
              </section>

              {/* 12 */}
              <section id="effective-date" className="scroll-mt-32 py-10">
                <SectionHeading number="12" title="Effective Dates & Amendments" />
                <div className="mt-4 space-y-4 font-body text-[15px] leading-relaxed text-[#4a4a4d]">
                  <p>This Privacy Policy is effective from <strong className="text-[#0b0b0c]">18th February 2025</strong>.</p>
                  <p>
                    We may, from time to time, amend this Privacy Policy — for reasons such as updates to the
                    Lencar website and the EZR App, functionality changes, new features, or compliance with
                    legal requirements. Amendments are made at our sole discretion and take effect from the
                    date set out in the amendment. You will be notified of any amendments and have the option
                    to agree or disagree with them.
                  </p>
                  <p>
                    To use the license to access the App and receive our services, you must agree to and
                    comply with the terms of the Privacy Policy applicable at the date you request the relevant
                    product or service.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}