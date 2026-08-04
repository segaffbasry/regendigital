import FaqItem from "./FaqItem";
import ServiceMotion from "./ServiceMotion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const protectedTitleWords = new Set(["AI", "B2B", "GEO", "Google", "Regen", "SaaS", "SEO"]);

function sentenceCaseTitle(title) {
  let wordIndex = 0;
  return title.replace(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g, (word) => {
    const isFirst = wordIndex++ === 0;
    if (isFirst || protectedTitleWords.has(word) || /^[A-Z0-9]{2,}$/.test(word)) return word;
    return word.toLocaleLowerCase();
  });
}

function ArrowLink({ href = "/contact", children }) {
  return <a className="service-detail__link" href={href}><span>{children}</span><span className="cta-arrow" aria-hidden="true" /></a>;
}

function MediaSlot({ format = "wide" }) {
  return (
    <div className={`service-media service-media--${format}`} data-service-media>
      <span className="service-media__placeholder">Image coming soon</span>
    </div>
  );
}

export default function ServicePage({ content: page }) {
  const midpoint = Math.ceil((page.included?.length || 0) / 2);
  const firstDeliverables = page.included?.slice(0, midpoint) || [];
  const remainingDeliverables = page.included?.slice(midpoint) || [];

  return (
    <main className="service-detail">
      <ServiceMotion />
      <SiteHeader />

      <section className="service-detail__hero">
        <p className="editorial-kicker">{page.h1}</p>
        <h1>{sentenceCaseTitle(page.hero)}</h1>
        <div className="service-detail__hero-meta">
          <p>{page.entity}</p>
          <ArrowLink href={page.ctaHref}>{page.cta}</ArrowLink>
        </div>
      </section>

      <section className="service-detail__opening">
        <div>
          <p className="editorial-kicker">The opportunity</p>
          <span>{page.h1}</span>
        </div>
        <p>{page.body}</p>
      </section>

      <section className="service-detail__deliverables">
        <header>
          <p className="editorial-kicker">What&apos;s included</p>
          <h2>Everything the work<br /><em>needs to perform.</em></h2>
        </header>
        <div className="service-detail__deliverable-grid service-detail__deliverable-grid--primary">
          {firstDeliverables.map((item, index) => (
            <article className="service-deliverable" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="service-detail__media-pair" aria-label="Media placeholders">
        <MediaSlot index="02" format="portrait" label={`${page.h1} — people, detail, or behind the scenes`} />
        <div className="service-detail__media-pair-copy">
          <p className="editorial-kicker">Built around the work</p>
          <div className="service-detail__deliverable-grid service-detail__deliverable-grid--stack">
            {remainingDeliverables.map((item, index) => (
              <article className="service-deliverable" key={item}>
                <span>{String(index + midpoint + 1).padStart(2, "0")}</span>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {page.insight ? (
        <section className="service-detail__insight">
          <p className="editorial-kicker">Good to know</p>
          <div><h2>{page.insight[0]}</h2><p>{page.insight[1]}</p></div>
        </section>
      ) : null}

      {page.faqs?.length ? (
        <section className="editorial-faq">
          <div><p className="editorial-kicker">FAQs</p><h2>Questions,<br /><em>answered.</em></h2></div>
          <div className="editorial-faq__items">{page.faqs.map(([question, answer]) => <FaqItem question={question} answer={answer} key={question} />)}</div>
        </section>
      ) : null}

      <section className="service-detail__closing">
        <div className="service-detail__closing-copy">
          <p className="editorial-kicker">Start here</p>
          <h2>Ready to build demand<br /><em>that converts?</em></h2>
          <p>An open conversation about your current marketing and where the business is heading, to see whether there is genuine potential for a collaboration.</p>
          <div className="service-detail__closing-benefits">
            <strong>Here&apos;s what you&apos;ll get:</strong>
            <ul>
              <li>Helpful advice and practical guidance</li>
              <li>A clear view of your strongest next move</li>
              <li>No obligation</li>
            </ul>
          </div>
        </div>
        <div className="service-detail__closing-card">
          <span className="service-detail__closing-note">Get started here ↘</span>
          <div className="service-detail__closing-faces" aria-label="Holly and Taylor, Regen co-founders">
            <img src="/images/founders/holly.webp" alt="Holly, Regen co-founder" />
            <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
          </div>
          <h3>Book a strategy call</h3>
          <p className="service-detail__closing-meta"><span aria-hidden="true">◷</span> 30 minute session</p>
          <form className="service-detail__closing-form" action="/contact" method="get">
            <label>
              <span>Work email address</span>
              <input type="email" name="email" placeholder="Your work email address*" required />
            </label>
            <label>
              <span>How did you hear about us?</span>
              <input type="text" name="source" placeholder="How did you hear about us?*" required />
            </label>
            <p>By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
            <button className="service-detail__link service-detail__closing-submit" type="submit">Let&apos;s talk <span className="cta-arrow" aria-hidden="true" /></button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
