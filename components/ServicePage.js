import FaqItem from "./FaqItem";
import ClientLogoStrip from "./ClientLogoStrip";
import ServiceAnimation from "./ServiceAnimation";
import ServiceMotion from "./ServiceMotion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import "../app/service-feedback.css";

const protectedTitleWords = new Set(["AI", "B2B", "GEO", "Google", "Regen", "SaaS", "SEO"]);

function sentenceCaseTitle(title) {
  let wordIndex = 0;
  return title.replace(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g, (word) => {
    const isFirst = wordIndex++ === 0;
    if (isFirst || protectedTitleWords.has(word) || /^[A-Z0-9]{2,}$/.test(word)) return word;
    return word.toLocaleLowerCase();
  });
}

function emphasizedText(text, emphasis, className) {
  if (!emphasis) return text;

  const start = text.replaceAll("\u00a0", " ").toLocaleLowerCase().indexOf(emphasis.toLocaleLowerCase());
  if (start === -1) return text;

  const end = start + emphasis.length;
  return (
    <>
      {text.slice(0, start)}
      <em className={className}>{text.slice(start, end)}</em>
      {text.slice(end)}
    </>
  );
}

function keepFinalWordsTogether(text) {
  const finalSpace = text.lastIndexOf(" ");
  if (finalSpace === -1) return text;
  return `${text.slice(0, finalSpace)}\u00a0${text.slice(finalSpace + 1)}`;
}

function ServiceHeroTitle({ page }) {
  const title = keepFinalWordsTogether(sentenceCaseTitle(page.hero));
  return emphasizedText(title, page.heroEmphasis, "service-detail__hero-emphasis");
}

function ArrowLink({ href = "/contact", children }) {
  return <a className="service-detail__link cta-button" href={href}><span>{children}</span><span className="cta-arrow" aria-hidden="true" /></a>;
}

export default function ServicePage({ content: page, serviceKey }) {
  const deliverables = page.included || [];
  const openingParagraphs = page.openingParagraphs || [page.body];
  const existingFaqs = page.faqs || [];
  const insightFaq = page.insight
    ? [page.insight[0], page.insight[1], page.worthIt || null]
    : null;
  const faqs = insightFaq
    ? [insightFaq, ...existingFaqs.filter(([question]) => question !== insightFaq[0])]
    : existingFaqs;

  return (
    <main className="service-detail service-detail--visual service-detail--refined" data-service={serviceKey}>
      <ServiceMotion />
      <SiteHeader />

      <section className="service-detail__hero">
        {page.heroPill ? <p className="service-detail__hero-pill">{page.heroPill}</p> : null}
        <h1 aria-label={sentenceCaseTitle(page.hero)}><ServiceHeroTitle page={page} /></h1>
        <div className="service-detail__hero-meta">
          <p>{page.entity}</p>
          <ArrowLink href={page.ctaHref}>{page.cta}</ArrowLink>
        </div>
        <ClientLogoStrip variant="compact" />
      </section>

      <section className="service-detail__opening">
        <div className="service-detail__opening-copy">
          {page.openingTitle ? (
            <h2>
              {emphasizedText(page.openingTitle, page.openingTitleEmphasis, "service-detail__opening-emphasis")}
            </h2>
          ) : null}
          {openingParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <ServiceAnimation serviceKey={serviceKey} />
      </section>

      <section className="service-detail__deliverables">
        <header>
          <p className="editorial-kicker">What&apos;s included</p>
          <h2>Everything the work<br /><em>needs to perform.</em></h2>
        </header>
        <div className="service-detail__deliverable-grid service-detail__deliverable-grid--primary">
          {deliverables.map((item, index) => (
            <article className="service-deliverable" key={item}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item}</h3>
              {page.includedDetails?.[index] ? <p>{page.includedDetails[index]}</p> : null}
            </article>
          ))}
        </div>
      </section>

      {faqs.length ? (
        <section className="editorial-faq">
          <div><p className="editorial-kicker">FAQs</p><h2>Questions,<br /><em>answered.</em></h2></div>
          <div className="editorial-faq__items">
            {faqs.map(([question, answer, continuation], index) => (
              <FaqItem
                question={question}
                answer={continuation ? (
                  <>
                    {answer}
                    <span className="service-faq__continuation">{continuation}</span>
                  </>
                ) : answer}
                defaultOpen={index === 0}
                key={question}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section className="service-detail__closing">
        <div className="service-detail__closing-copy">
          {!page.hideClosingPrompts ? <p className="editorial-kicker">Start here</p> : null}
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
          {!page.hideClosingPrompts ? <span className="service-detail__closing-note">Get started here ↘</span> : null}
          <div className="service-detail__closing-faces" aria-label="Holly and Taylor, Regen co-founders">
            <img src="/images/founders/holly-updated.png" alt="Holly, Regen co-founder" />
            <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
          </div>
          <h3>Book a strategy call</h3>
          <p className="service-detail__closing-meta"><span aria-hidden="true">◷</span> 30 minute session</p>
          <form className="service-detail__closing-form" action="/contact" method="get">
            <label>
              <span>Name</span>
              <input autoComplete="name" type="text" name="name" placeholder="Your name*" required />
            </label>
            <label>
              <span>Work email address</span>
              <input autoComplete="email" type="email" name="email" placeholder="Your work email address*" required />
            </label>
            <p>By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
            <button className="service-detail__link service-detail__closing-submit cta-button" type="submit">Let&apos;s talk <span className="cta-arrow" aria-hidden="true" /></button>
          </form>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
