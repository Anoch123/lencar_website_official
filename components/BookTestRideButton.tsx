"use client";

import { useState } from "react";
import BookTestRideModal from "@/components/BookTestRideModal";

type BookTestRideButtonProps = {
  bikeName?: string;
  className?: string;
};

export default function BookTestRideButton({
  bikeName,
  className = "",
}: BookTestRideButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={className}
      >
        Book a test ride
      </button>
      <BookTestRideModal
        isOpen={open}
        onClose={() => setOpen(false)}
        bikeName={bikeName}
      />
    </>
  );
}
