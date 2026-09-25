import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export const metadata: Metadata = {
  title: {
    default: "SLEDMC — Sri Lanka European Skills Development & Mobility Centre",
    template: "%s | SLEDMC",
  },
  description:
    "SLEDMC connects prepared Sri Lankan professionals with legitimate European employment opportunities through language, skills, and pre-departure preparation.",
  keywords: [
    "SLEDMC",
    "European skills development",
    "Sri Lanka mobility centre",
    "European driver academy",
    "Code 95 Sri Lanka",
    "European work visa preparation",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "SLEDMC Mobility & Skills",
  },
};

const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem("sledmc_theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Apply the saved theme before first paint so light-theme users never see a dark flash */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
