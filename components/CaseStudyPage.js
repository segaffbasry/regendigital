import CaseStudyMotion from "./CaseStudyMotion";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

function MarkedHeadline({ children, emphasis }) {
  if (!emphasis) return children;

  const start = children.toLocaleLowerCase().indexOf(emphasis.toLocaleLowerCase());
  if (start === -1) return children;

  const end = start + emphasis.length;

  return (
    <>
      {children.slice(0, start)}
      <em>{children.slice(start, end)}</em>
      {children.slice(end)}
    </>
  );
}

function SectionHeadline({ heading }) {
  return <>{heading.lead} <em>{heading.emphasis}</em></>;
}

function ArrowLink({ href, children }) {
  return (
    <a className="case-arrow-link" href={href}>
      <span>{children}</span>
      <i aria-hidden="true" />
    </a>
  );
}

function WorkMedia({ items, variant }) {
  if (!items?.length) return null;

  return (
    <section className={`case-work-media case-work-media--${variant}`} aria-label={`${variant === "feature" ? "Featured" : "More"} work from the project`}>
      {items.map((item) => (
        <figure data-case-reveal key={item.src}>
          <img src={item.src} alt={item.alt} />
        </figure>
      ))}
    </section>
  );
}

export default function CaseStudyPage({ content }) {
  const study = content.caseStudy;

  return (
    <main className="case-study-page">
      <CaseStudyMotion />
      <SiteHeader />

      <section className="case-hero" aria-labelledby="case-study-title">
        <div className="case-hero__copy">
          <p className="case-kicker" data-case-hero>Case study · {study.client}</p>
          <h1 id="case-study-title" data-case-hero>
            <MarkedHeadline emphasis={study.headlineEmphasis}>{study.headline}</MarkedHeadline>
          </h1>
        </div>
      </section>

      {/* Not every case study has a quote cleared for use yet. */}
      {study.quote ? (
        <section className="case-quote" aria-label="Client testimonial">
          <blockquote data-case-reveal>
            <p>{study.quote.text}</p>
            <footer>
              <img src={study.quote.image} alt="" />
              <cite>
                <strong>{study.quote.name}</strong>
                <span>{study.quote.role}</span>
              </cite>
            </footer>
          </blockquote>
        </section>
      ) : null}

      <section className="case-about" aria-labelledby="case-about-title">
        <div className="case-section-heading" data-case-reveal>
          <p className="case-kicker">About the client</p>
          <h2 id="case-about-title">About <em>{study.client}</em></h2>
        </div>
        <div className="case-about__body" data-case-reveal>
          {study.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <WorkMedia items={study.media?.feature} variant="feature" />

      <section className="case-challenge" aria-labelledby="case-challenge-title">
        <div className="case-challenge__intro" data-case-reveal>
          <p className="case-kicker">The challenge</p>
          <h2 id="case-challenge-title"><SectionHeadline heading={study.challengeHeading} /></h2>
          {study.challengeIntro ? <p>{study.challengeIntro}</p> : null}
        </div>
        <div className="case-challenge__grid">
          {study.challenges.map((challenge, index) => (
            <article data-case-reveal key={challenge.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{challenge.title}</h3>
              <p>{challenge.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-approach" aria-labelledby="case-approach-title">
        <div className="case-approach__opening">
          <div className="case-section-heading" data-case-reveal>
            <p className="case-kicker">How Regen supported {study.client}</p>
            <h2 id="case-approach-title"><SectionHeadline heading={study.approachHeading} /></h2>
          </div>
          {study.approachIntro ? (
            <p className="case-approach__intro" data-case-reveal>{study.approachIntro}</p>
          ) : null}
        </div>

        <div className="case-approach__list">
          {study.approach.map((item, index) => (
            <article data-case-reveal key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <WorkMedia items={study.media?.gallery} variant="gallery" />

      <section className="case-results" aria-labelledby="case-results-title">
        <div className="case-results__heading" data-case-reveal>
          <p className="case-kicker">The results</p>
          <h2 id="case-results-title"><SectionHeadline heading={study.resultsHeading} /></h2>
          {study.resultsIntro ? <p>{study.resultsIntro}</p> : null}
        </div>
        <div className="case-results__grid">
          {study.results.map((result, index) => (
            <article className="case-result" key={result.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{result.value}</strong>
              <p>{result.label}</p>
            </article>
          ))}
        </div>
        {study.closing ? (
          <p className="case-results__closing" data-case-reveal>{study.closing}</p>
        ) : null}
      </section>

      <section className="case-next">
        <div data-case-reveal>
          <p className="case-kicker">Your growth story next</p>
          <h2><SectionHeadline heading={study.nextHeading} /></h2>
        </div>
        <ArrowLink href="/contact">Start a conversation</ArrowLink>
      </section>

      <SiteFooter />
    </main>
  );
}
