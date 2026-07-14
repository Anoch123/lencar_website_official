"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function WhatsAppChat() {
  return (
    <FloatingWhatsApp
      phoneNumber="94763443826"
      accountName="Lencar"
      chatMessage="Hello 👋 Welcome to Lencar! How can we help you today?"
      statusMessage="Usually replies within a few minutes"
      placeholder="Type your message..."
      allowEsc
      avatar="/images/logo.png"
      onSubmit={(e) => {
        console.log(e)
      }}
    />
  );
}