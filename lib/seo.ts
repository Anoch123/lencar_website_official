import type { Metadata } from "next";

const SITE_URL = "https://lencar.lk";
const SITE_NAME = "Lencar";
const DEFAULT_DESCRIPTION =
  "Lencar creates intelligent electric vehicles and sustainable mobility solutions for Sri Lanka.";
const DEFAULT_IMAGE = "/images/Lencar-Dark-Logo.png";

export function seoMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = SITE_NAME,
  type = "website",
  publishedTime,
}: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "book" | "profile" | "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other";
  publishedTime?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_IMAGE}`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: "2015",
    address: {
      "@type": "PostalAddress",
      streetAddress: "29, Grenier Road, Colombo 08",
      addressLocality: "Colombo",
      addressRegion: "Western Province",
      addressCountry: "LK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+94 713 391 391",
      contactType: "customer service",
      email: "info@lencar.lk",
    },
    sameAs: [
      "https://www.instagram.com/lencar.lk",
      "https://www.facebook.com/share/19CXSdMthg/?mibextid=wwXIfr",
      "https://www.linkedin.com/company/lencar/",
      "https://www.youtube.com/",
    ],
  };
}

export function articleJsonLd({
  title,
  description,
  url,
  image,
  publishedTime,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    image,
    ...(publishedTime ? { datePublished: publishedTime } : {}),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}${DEFAULT_IMAGE}`,
      },
    },
  };
}
