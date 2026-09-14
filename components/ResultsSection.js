import "../app/results-section.css";

/* Shared proof strip, laid out the way Gripped do theirs: a big figure, a short
   sentence with the channel called out, and the client mark pinned underneath.
   Numbers and wording stay true to the three case studies. Logo scales are
   tuned for these panels, not the hero strip. */
const results = [
  {
    client: "Agency AI",
    metric: "15%",
    trend: "up",
    lead: "Increase in referral traffic in the first 30 days from ",
    emphasis: "organic, search and outbound",
    logo: "/client-logos/client-04-dark.png",
    logoScale: 3,
    href: "/work/agency-ai",
  },
  {
    client: "IntusHQ",
    metric: "5x",
    lead: "More of the target audience reached from ",
    emphasis: "account-based marketing and founder-led social",
    logo: "/client-logos/IntusHQ/intushq-dark.svg",
    logoScale: 0.62,
    href: "/work/intushq",
  },
  {
    client: "Finden",
    metric: "3rd",
    lead: "Out of 280+ companies at launch, from ",
    emphasis: "organic social and Product Hunt",
    logo: "/client-logos/client-03-dark.png",
    logoScale: 0.86,
    href: "/work/finden",
  },
];

export default function ResultsSection() {
  return (
    <section className="results-section" aria-labelledby="our-results-title">
      <h2 className="results-section__title" id="our-results-title">
        Results that moved the needle
      </h2>

      <div className="results-section__grid">
        {results.map((result) => (
          <article className="result-card" key={result.client}>
            <p className="result-card__metric">
              {result.metric}
              {result.trend === "up" ? (
                <span className="result-card__trend" aria-hidden="true">
                  ^
                </span>
              ) : null}
            </p>
            <p className="result-card__label">
              {result.lead}
              <b>{result.emphasis}</b>
            </p>
            <span className="result-card__logo">
              <img
                alt={result.client}
                loading="lazy"
                src={result.logo}
                style={{ "--result-logo-scale": result.logoScale }}
              />
            </span>
          </article>
        ))}
      </div>

      <a className="results-section__link" href="/work">
        Read more results <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  );
}
