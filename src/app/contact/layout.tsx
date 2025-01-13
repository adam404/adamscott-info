import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Adam Scott - Software Engineer & Technical Leader",
  description:
    "Get in touch with Adam Scott for software development projects, technical consulting, or collaboration opportunities. Connect via email, LinkedIn, or the contact form.",
  openGraph: {
    title: "Contact | Adam Scott - Software Engineer & Technical Leader",
    description:
      "Get in touch with Adam Scott for software development projects, technical consulting, or collaboration opportunities.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact | Adam Scott",
    description:
      "Get in touch with Adam Scott for software development projects, technical consulting, or collaboration opportunities.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
