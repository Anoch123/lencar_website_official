import type { Metadata } from "next";
import "../app/css/globals.css";

import { Inter, Oswald } from "next/font/google";
import WhatsAppChat from "@/components/ui/whatsappChat";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets:["latin"],
  variable:"--font-inter"
});

const oswald = Oswald({
  subsets:["latin"],
  variable:"--font-oswald"
});


export const metadata: Metadata = {
  title:{
    default:"Lencar | Future Electric Mobility",
    template:"%s | Lencar"
  },
  description:
    "Lencar creates intelligent electric vehicles and sustainable mobility solutions for Sri Lanka.",
  keywords:[
    "Lencar",
    "electric scooter",
    "electric vehicle",
    "e-mobility",
    "Sri Lanka",
    "battery swapping",
    "electric bikes",
    "eRc 80",
    "eRc 80 Plus",
    "Zivi",
    "sustainable transport",
    "EV scooter",
    "smart scooter",
  ],
  authors:[{name:"SL Mobility (Pvt.) Limited"}],
  creator:"Lencar",
  publisher:"SL Mobility (Pvt.) Limited",
  formatDetection:{
    email:false,
    address:false,
    telephone:false,
  },
  openGraph:{
    type:"website",
    siteName:"Lencar",
    title:"Lencar | Future Electric Mobility",
    description:
      "Lencar creates intelligent electric vehicles and sustainable mobility solutions.",
    url:"https://lencar.lk",
    images:[
      {
        url:"/images/Lencar-Dark-Logo.png",
        width:1200,
        height:630,
        alt:"Lencar",
      },
    ],
    locale:"en_US",
  },
  twitter:{
    card:"summary_large_image",
    title:"Lencar | Future Electric Mobility",
    description:
      "Lencar creates intelligent electric vehicles and sustainable mobility solutions.",
    images:["/images/Lencar-Dark-Logo.png"],
    creator:"@lencar_lk",
  },
  robots:{
    index:true,
    follow:true,
    googleBot:{
      index:true,
      follow:true,
      "max-video-preview":-1,
      "max-image-preview":"large",
      "max-snippet":-1,
    },
  },
  icons:{
    icon:"/favicon.ico",
    shortcut:"/favicon.ico",
    apple:"/favicon.ico",
  },
};

export default function RootLayout({
  children,
  }:{
  children:React.ReactNode
  }){

  return(
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="canonical" href="https://lencar.lk" />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className={`${inter.variable} ${oswald.variable} bg-black text-white`}>
        {children}
        <WhatsAppChat />
      </body>
    </html>
  )

}