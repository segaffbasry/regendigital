import { notFound } from "next/navigation";
import AboutPage from "../../components/AboutPage";
import ContactPage from "../../components/ContactPage";
import HowWeWorkPage from "../../components/HowWeWorkPage";
import InteriorPage from "../../components/InteriorPage";
import PrivacyPage from "../../components/PrivacyPage";
import { phaseOnePages } from "../../lib/site-structure";

export const dynamicParams = true;

export function generateStaticParams() {
  return phaseOnePages.map((page) => ({
    slug: page.href.slice(1).split("/"),
  }));
}

function titleFromSlug(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function resolvePage(slug) {
  const path = `/${slug.join("/")}`;
  const page = phaseOnePages.find((item) => item.href === path);

  if (page) return { title: page.label, section: page.section };
  if (slug.length === 2 && slug[0] === "work") {
    return { title: titleFromSlug(slug[1]), section: "Case Study" };
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = resolvePage(slug);
  if (!page) return {};

  return {
    title: `${page.title} | Regen`,
  };
}

export default async function PhaseOnePage({ params }) {
  const { slug } = await params;
  const page = resolvePage(slug);
  if (!page) notFound();

  if (slug.length === 1 && slug[0] === "contact") {
    return <ContactPage />;
  }

  if (slug.length === 1 && slug[0] === "about") {
    return <AboutPage />;
  }

  if (slug.length === 1 && slug[0] === "how-we-work") {
    return <HowWeWorkPage />;
  }

  if (slug.length === 1 && slug[0] === "privacy-policy") {
    return <PrivacyPage />;
  }

  return <InteriorPage title={page.title} section={page.section} />;
}
