"use client";

import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [hasSent, setHasSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const phoneNumber = "94713391391";

  const handleSend = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || hasSent || isSending) return;

    setIsSending(true);

    // Only the customer's message is sent to WhatsApp.
    // source=website is NOT visible to the customer.
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      trimmedMessage
    )}`;

    // Mark as sent before opening WhatsApp so the user
    // cannot submit another message from this widget.
    setHasSent(true);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setIsSending(false);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    // Ctrl + Enter / Cmd + Enter sends the message
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        type="button"
        onClick={() => {
          if (!hasSent) {
            setIsOpen(true);
          }
        }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[340px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          {/* Header */}
          <div className="flex items-center justify-between bg-green-500 px-4 py-4 text-white">
            <div>
              <p className="font-semibold">Chat with Lencar</p>

              <p className="text-xs text-green-50">
                Usually replies within a few minutes
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Welcome Message */}
          <div className="bg-gray-50 p-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-gray-700 shadow-sm">
              Hello 👋 Welcome to Lencar! How can we help you today?
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 bg-white p-3">
            {!hasSent ? (
              <>
                <div className="flex items-end gap-2">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..."
                    rows={2}
                    maxLength={500}
                    autoComplete="off"
                    autoCorrect="on"
                    spellCheck={true}
                    className="min-h-[44px] flex-1 resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 caret-gray-900 placeholder:text-gray-400 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!message.trim() || isSending}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-500 text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                  >
                    <Send size={18} />
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-between px-1">
                  <p className="text-[11px] text-gray-400">
                    Ctrl + Enter to send
                  </p>

                  <p className="text-[11px] text-gray-400">
                    {message.length}/500
                  </p>
                </div>
              </>
            ) : (
              <div className="py-3 text-center">
                <p className="text-sm font-medium text-gray-700">
                  Message sent successfully
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  We’ll continue the conversation on WhatsApp.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}