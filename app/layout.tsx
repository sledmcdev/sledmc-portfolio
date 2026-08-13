import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "SLEDMC Recruitment — Connecting Talent. Powering Growth.",
    template: "%s | SLEDMC Recruitment",
  },
  description:
    "SLEDMC Recruitment is a specialist recruitment agency connecting exceptional candidates with forward-thinking organisations across multiple industries. Find your next job or your next hire.",
  keywords: [
    "recruitment agency",
    "jobs",
    "talent acquisition",
    "executive search",
    "permanent recruitment",
    "contract staffing",
    "career opportunities",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SLEDMC Recruitment",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
