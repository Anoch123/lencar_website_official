import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

export const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+94 11 234 5678",
    href: "tel:+94112345678",
    note: "Mon–Fri, 9am–6pm",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@yourcompany.com",
    href: "mailto:hello@yourcompany.com",
    note: "We reply within 24 hours",
  },
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Galle Road, Colombo 03",
    href: "https://maps.google.com",
    note: "Sri Lanka",
  },
];

export const OFFICE_HOURS = [
  { day: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 1:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

export const SUBJECTS = ["General Inquiry", "Sales", "Support", "Partnerships", "Other"];