const statVisuals = {
  "saas-cost": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-cost" aria-hidden="true">
      <img src="/asset/Winning%20Customers%20Costs%20More.svg" alt="" />
    </div>
  ),
  "saas-market": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-market" aria-hidden="true">
      <img src="/asset/AI%20Huge,%20Crowd%20Market.svg" alt="" />
    </div>
  ),
  "saas-journey": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-journey" aria-hidden="true">
      <img src="/asset/Buyers%20Decide%20Without%20You.svg" alt="" />
    </div>
  ),
  "professional-clarity": (
    <div className="industry-stat-visual industry-stat-visual--ring" style={{ "--ring-value": "15%" }} aria-hidden="true">
      <strong>15%</strong><span>rated very good</span>
    </div>
  ),
  "professional-growth": (
    <div className="industry-stat-visual industry-stat-visual--bars industry-stat-visual--growth-bars" aria-hidden="true">
      <span style={{ "--bar-height": "22%" }}><i>Peers</i></span>
      <span style={{ "--bar-height": "88%" }}><i>High growth</i></span>
      <strong>4×</strong><em>+30% profit</em>
    </div>
  ),
  "professional-expertise": (
    <div className="industry-stat-visual industry-stat-visual--figure" aria-hidden="true">
      <strong>75%</strong><span>opened a new door</span><em>60% pay a premium</em>
    </div>
  ),
  "tech-committee": (
    <div className="industry-stat-visual industry-stat-visual--people" aria-hidden="true">
      <span /><span /><span /><span /><span /><span /><span /><span />
      <strong>6–10 decision-makers</strong><em>77% call it complex</em>
    </div>
  ),
  "tech-spend": (
    <div className="industry-stat-visual industry-stat-visual--figure" aria-hidden="true">
      <strong>$6.37tn</strong><span>worldwide IT spend</span><em>+14.2%</em><i>↗</i>
    </div>
  ),
  "tech-budget": (
    <div className="industry-stat-visual industry-stat-visual--shrinking" aria-hidden="true">
      <span><i /></span><strong>7.7%</strong><em>of revenue</em>
    </div>
  ),
  "ai-scrutiny": (
    <div className="industry-stat-visual industry-stat-visual--magnify" aria-hidden="true">
      <span><i /><i /><i /></span><b /><strong>58%</strong>
    </div>
  ),
  "ai-market": (
    <div className="industry-stat-visual industry-stat-visual--curve" aria-hidden="true">
      <strong>$3.5tn</strong><span>by 2033</span><i />
    </div>
  ),
  "ai-research": (
    <div className="industry-stat-visual industry-stat-visual--answer" aria-hidden="true">
      <span>AI answer</span><i /><i /><i /><strong>94%</strong>
    </div>
  ),
};

export function IndustryStats({ stats }) {
  if (!stats?.cards?.length) return null;

  return (
    <section className="industry-stats" aria-labelledby="industry-stats-title">
      <header>
        <p className="editorial-kicker">The market now</p>
        <h2 id="industry-stats-title">{stats.title}</h2>
      </header>
      <div className="industry-stats__grid">
        {stats.cards.map((card) => (
          <article className={`industry-stat-card industry-stat-card--${card.visual}`} key={card.heading}>
            {statVisuals[card.visual]}
            <div className="industry-stat-card__copy">
              <h3>{card.heading}</h3>
              <p>{card.copy}</p>
              <span className="industry-stat-card__source">Source · {card.source}</span>
            </div>
          </article>
        ))}
      </div>
      <a className="editorial-link cta-button industry-stats__cta" href="/audit">
        <span>Get Your Free Marketing Audit</span><span className="cta-arrow" aria-hidden="true" />
      </a>
    </section>
  );
}

function IndustryRealityTitle({ title }) {
  const marker = title.toLocaleLowerCase().lastIndexOf(" of ");

  if (marker === -1) return title;

  const industryStart = marker + 4;
  return (
    <>
      {title.slice(0, industryStart)}
      <em>{title.slice(industryStart)}</em>
    </>
  );
}

export function IndustryRealities({ realities }) {
  if (!realities?.items?.length) return null;

  return (
    <section className="industry-realities" aria-labelledby="industry-realities-title">
      <div className="industry-realities__panel">
        <header>
          <h2 id="industry-realities-title"><IndustryRealityTitle title={realities.title} /></h2>
        </header>
        <div className="industry-realities__grid">
          {realities.items.map((item, index) => (
            <article key={item.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.heading}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
