import "./globals.css";
import "./revision.css";
import "./industry-systems.css";
import "./method-system.css";
import "./about-depth.css";
import "./partnership-call.css";
import "./client-feedback.css";
import "./industry-feedback.css";
import "./cta-feedback.css";
import "./homepage-feedback.css";
import "./service-index.css";
import "./case-study.css";
import PageTransition from "../components/PageTransition";
import SmoothScroll from "../components/SmoothScroll";

export const metadata = {
  metadataBase: new URL("https://regen.digital"),
  title: "Regen — B2B Digital Marketing Agency for SaaS, AI, Tech & Professional Services",
  description:
    "Regen is a B2B digital marketing agency for SaaS, AI, tech, and professional services. We pair a strong strategic foundation with content, paid, and search to turn pipeline into predictable revenue.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Regen — B2B Digital Marketing Agency",
    description:
      "Strategy-led B2B marketing for SaaS, AI, tech, and professional services. One system of channels that turns pipeline into predictable revenue.",
    type: "website",
    url: "https://regen.digital",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
