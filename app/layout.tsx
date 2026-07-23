import type { Metadata } from "next";
import "../app/css/globals.css";

import { Inter, Oswald } from "next/font/google";
import WhatsAppChat from "@/components/ui/whatsappChat";

const inter = Inter({
  subsets:["latin"],
  variable:"--font-inter"
});

const oswald = Oswald({
  subsets:["latin"],
  variable:"--font-oswald"
});


export const metadata: Metadata = {
  title:"Lencar | Future Electric Mobility",
  description:
  "Lencar creates intelligent electric vehicles and sustainable mobility solutions."
};


export default function RootLayout({
  children,
  }:{
  children:React.ReactNode
  }){

  return(
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable} bg-black text-white`}>
        {children}
        <WhatsAppChat />
      </body>
    </html>
  )

}