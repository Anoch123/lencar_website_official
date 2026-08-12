import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+94 713 391 391",
    href: "tel:+94713391391",
    note: "Mon–Fri, 9am–5pm",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "info@lencar.lk",
    href: "mailto:info@lencar.lk",
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "29, Grenier Road, Colombo – 08, Sri Lanka.",
    href: "https://maps.app.goo.gl/fk5HVSq5voa1CFgM9",
    note: "Sri Lanka",
  },
];

export const OFFICE_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 5:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
];

export const SUBJECTS = ["General Inquiry", "Sales", "Support", "Partnerships", "Other"];