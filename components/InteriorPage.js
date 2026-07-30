import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function InteriorPage({ title, section }) {
  const hasBlueHero = section === "Services";
  const isAudit = section === "Free Audit";

  if (isAudit) {
    return (
      <main className="audit-page">
        <SiteHeader />
        <section className="audit-page__hero">
          <div className="audit-page__content">
            <p>Free Audit</p>
            <h1>Get your free digital marketing audit</h1>
            <div className="audit-page__support">
              <p>
                A genuine audit from real strategists. We&apos;ll show you where
                your pipeline is leaking, what&apos;s working, and the first
                things we&apos;d fix.
              </p>
              <a className="home-link" href="/contact">
                Start your audit
                <span className="cta-arrow" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    );
  }

  return (
    <main className={`page-shell${hasBlueHero ? " page-shell--blue-hero" : ""}`}>
      <SiteHeader />
      <section className="page-hero">
        <p>{section}</p>
        <h1>{title}</h1>
      </section>
      <SiteFooter />
    </main>
  );
}
