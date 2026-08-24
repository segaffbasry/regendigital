import "../app/results-section.css";

/* One shared proof strip. The numbers and the wording after them come straight
   from the three case studies, so this stays true to what those pages claim.

   The logo scales are tuned for this panel, not inherited from the hero strip,
   where the box and the rhythm around it are different.

   The client logos are the same files the hero strip uses, and those are white
   artwork cut for the blue band. On the sky panel they would be invisible, so
   they are kept as-is on the sky panel. */
const results = [
  {
    client: "Agency AI",
    headline: "15% increase in referral traffic",
    lead: "In the first 30 days, from ",
    emphasis: "organic, search and outbound",
    logo: "/client-logos/client-04.png",
    logoScale: 3,
    href: "/work/agency-ai",
  },
  {
    client: "IntusHQ",
    headline: "5x the target audience reached",
    lead: "From ",
    emphasis: "account-based marketing and founder-led social",
    logo: "/client-logos/IntusHQ/intushq.svg",
    logoScale: 0.62,
    href: "/work/intushq",
  },
  {
    client: "Finden",
    headline: "Placed 3rd out of 280+ companies",
    lead: "At launch, from ",
    emphasis: "organic social and Product Hunt",
    logo: "/client-logos/client-03.png",
    logoScale: 0.86,
    href: "/work/finden",
  },
];

export default function ResultsSection() {
  return (
    <section className="results-section" aria-labelledby="our-results-title">
      <h2 className="results-section__title" id="our-results-title">Our results</h2>

      <div className="results-section__grid">
        {results.map((result) => (
          <article className="result-card" key={result.client}>
            <h3 className="result-card__headline">{result.headline}</h3>
            <p className="result-card__label">
              {result.lead}
              <b>{result.emphasis}</b>.
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
