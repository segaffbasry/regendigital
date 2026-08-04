import ContactForm from "./ContactForm";
import ContactMotion from "./ContactMotion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function ContactPage() {
  return (
    <main className="contact-page">
      <ContactMotion />
      <SiteHeader />

      <section className="contact-studio">
        <div className="contact-studio__intro">
          <p className="contact-kicker" data-contact-reveal>Got a project in mind?</p>
          <h1 data-contact-title>
            Let&apos;s make your next move <em>matter.</em>
          </h1>
          <p className="contact-studio__lede" data-contact-reveal>
            Tell us what you&apos;re trying to achieve. You&apos;ll hear directly from
            the people who will think about—and work on—your business.
          </p>

          <div className="contact-hosts" data-contact-reveal>
            <div className="contact-hosts__faces" aria-label="Holly and Taylor, Regen co-founders">
              <img src="/images/founders/holly-updated.png" alt="Holly, Regen co-founder" />
              <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
            </div>
            <div>
              <strong>Holly &amp; Taylor</strong>
              <span>Your first conversation is with us.</span>
            </div>
          </div>

          <div className="contact-details" data-contact-reveal>
            <a href="mailto:info@regendigital.co">
              <span>Email us</span>
              <strong>info@regendigital.co</strong>
              <span className="contact-row-arrow" aria-hidden="true">
                <img src="/download.svg" alt="" />
              </span>
            </a>
            <a href="https://www.linkedin.com/company/regenerationsocial">
              <span>Follow along</span>
              <strong>LinkedIn</strong>
              <span className="contact-row-arrow" aria-hidden="true">
                <img src="/download.svg" alt="" />
              </span>
            </a>
            <a href="/audit">
              <span>Not ready for a call?</span>
              <strong>Request a free audit</strong>
              <span className="contact-row-arrow" aria-hidden="true">
                <img src="/download.svg" alt="" />
              </span>
            </a>
          </div>
        </div>

        <div className="contact-form-card" data-contact-form>
          <div className="contact-form-card__top">
            <div>
              <p className="contact-kicker">Start a conversation</p>
              <h2>What are you working on?</h2>
            </div>
            <div className="contact-form-card__meta">
              <span><i aria-hidden="true">◷</i> 30 min intro</span>
              <span><i aria-hidden="true">●</i> Reply in 1–2 days</span>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
