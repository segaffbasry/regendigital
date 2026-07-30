import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const contactOptions = [
  {
    number: "001",
    title: "General enquiries",
    copy: "Have a question or want to say hello? Reach out and we’ll point you in the right direction.",
    label: "info@regendigital.co",
    href: "mailto:info@regendigital.co",
  },
  {
    number: "002",
    title: "New business",
    copy: "Tell us where you want to grow. We’ll talk through the opportunity, the obstacles, and the right next move.",
    label: "Start a project",
    href: "mailto:info@regendigital.co?subject=New%20project%20enquiry",
  },
  {
    number: "003",
    title: "Free marketing audit",
    copy: "Get a clear view of what is working, what is holding growth back, and where to focus next.",
    label: "Request your audit",
    href: "/audit",
  },
  {
    number: "004",
    title: "Follow Regen",
    copy: "Keep up with our latest thinking, work, and practical perspectives on B2B marketing.",
    label: "Connect on LinkedIn",
    href: "https://www.linkedin.com/company/regenerationsocial",
  },
];

export default function ContactPage() {
  return (
    <main className="contact-page">
      <SiteHeader />
      <section className="contact-editorial">
        <div className="contact-editorial__intro">
          <p>Got a project in mind?</p>
          <h1 className="contact-title">
            <span className="contact-title__line">Get in</span>
            <span className="contact-title__line" aria-label="touch">
              <span className="contact-title__touch" aria-hidden="true">
                <span className="contact-title__touch-serif">touch</span>
              </span>
            </span>
            <span className="contact-title__line contact-title__underlined">
              with us
              <svg
                aria-hidden="true"
                className="contact-title__underline"
                preserveAspectRatio="none"
                viewBox="0 0 320 24"
              >
                <path d="M4 14C55 7 102 17 153 12C205 7 255 15 316 9" />
              </svg>
            </span>
          </h1>
        </div>

        <div className="contact-editorial__grid">
          {contactOptions.map((option) => (
            <article className="contact-card" key={option.number}>
              <span className="contact-card__number">{option.number}</span>
              <h2>{option.title}</h2>
              <p>{option.copy}</p>
              <a className="cta-motion" href={option.href}>
                <span className="cta-motion__fill" aria-hidden="true" />
                <span className="cta-motion__clip">
                  <span className="cta-motion__roll">
                    <span>{option.label}</span>
                    <span aria-hidden="true">{option.label}</span>
                  </span>
                </span>
                <span className="cta-arrow" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
