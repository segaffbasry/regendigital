import AuditForm from "./AuditForm";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

export default function AuditPage() {
  return (
    <main className="audit-review">
      <SiteHeader />
      <section className="audit-review__layout">
        <div className="audit-review__copy">
          <p className="editorial-kicker">Free digital marketing review</p>
          <h1>Find the gaps costing you pipeline.</h1>
          <p className="audit-review__lede">
            A real review of your positioning, channels, and content by Regen&apos;s strategists—followed by a short call to walk through what we would fix first.
          </p>
          <div className="audit-review__benefits">
            <strong>What you&apos;ll get</strong>
            <ul>
              <li>An honest view of your current marketing</li>
              <li>Specific recommendations on where to focus</li>
              <li>A clear roadmap for the next 90 days</li>
              <li>No sales pitch, just practical advice</li>
            </ul>
          </div>
        </div>

        <div className="audit-review__card">
          <div className="audit-review__card-heading">
            <p className="editorial-kicker">Get started here</p>
            <h2>Book your free digital marketing review</h2>
            <p><span aria-hidden="true">◷</span> 30 minute review call</p>
          </div>
          <AuditForm />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
