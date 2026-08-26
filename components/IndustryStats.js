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
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-orbit">
          <circle className="stat-bone-stroke" cx="260" cy="116" r="78" pathLength="100" />
          <circle className="stat-blue-stroke" cx="260" cy="116" r="78" pathLength="100" strokeDasharray="15 85" />
        </g>
        <circle cx="260" cy="116" r="51" fill="#fff" />
        <text className="stat-value" x="260" y="116" textAnchor="middle">15%</text>
        <text className="stat-serif-label" x="260" y="139" textAnchor="middle">rated very good</text>
        <path className="stat-signal stat-signal--red" d="M116 62l18 13 17-25 20 12" />
        <path className="stat-signal stat-signal--red" d="M158 47l13 15-20 4" />
      </svg>
    </div>
  ),
  "professional-growth": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-panel stat-panel--muted">
          <rect x="60" y="118" width="170" height="73" rx="22" />
          <text className="stat-small-label" x="82" y="145">PEERS</text>
          <text className="stat-panel-value" x="82" y="177">1×</text>
        </g>
        <g className="stat-panel stat-panel--active">
          <rect x="248" y="49" width="214" height="142" rx="25" />
          <text className="stat-small-label" x="274" y="80">HIGH GROWTH</text>
          <text className="stat-value stat-value--large" x="274" y="143">4×</text>
          <path d="M378 137l40-40m-19 1h20v20" />
        </g>
        <g className="stat-badge stat-badge--green">
          <rect x="70" y="82" width="118" height="30" rx="15" />
          <text x="129" y="102" textAnchor="middle">+30% PROFIT</text>
        </g>
      </svg>
    </div>
  ),
  "professional-expertise": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-door-grid">
          <rect x="66" y="49" width="82" height="62" rx="17" />
          <rect x="158" y="49" width="82" height="62" rx="17" />
          <rect x="66" y="121" width="82" height="62" rx="17" />
          <rect className="stat-door-grid__open" x="158" y="121" width="82" height="62" rx="17" />
        </g>
        <path className="stat-route" d="M250 152h45c18 0 24-18 24-38V91" />
        <path className="stat-route" d="M307 101l12-12 12 12" />
        <text className="stat-value stat-value--large" x="390" y="132" textAnchor="middle">75%</text>
        <text className="stat-serif-label" x="390" y="155" textAnchor="middle">opened a new door</text>
        <g className="stat-badge">
          <rect x="323" y="169" width="127" height="30" rx="15" />
          <text x="386.5" y="189" textAnchor="middle">60% PAY MORE</text>
        </g>
      </svg>
    </div>
  ),
  "tech-committee": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-people-grid">
          <circle cx="111" cy="74" r="27" /><circle cx="173" cy="74" r="27" />
          <circle cx="235" cy="74" r="27" /><circle cx="297" cy="74" r="27" />
          <circle cx="359" cy="74" r="27" /><circle cx="142" cy="139" r="27" />
          <circle cx="204" cy="139" r="27" /><circle cx="266" cy="139" r="27" />
          <circle className="stat-people-grid__muted" cx="328" cy="139" r="27" />
          <circle className="stat-people-grid__muted" cx="390" cy="139" r="27" />
        </g>
        <text className="stat-value" x="252" y="207" textAnchor="middle">6–10</text>
        <text className="stat-serif-label" x="327" y="207">decision-makers</text>
        <g className="stat-badge stat-badge--top">
          <rect x="334" y="21" width="132" height="30" rx="15" />
          <text x="400" y="41" textAnchor="middle">77% COMPLEX</text>
        </g>
      </svg>
    </div>
  ),
  "tech-spend": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-growth-chart">
          <rect x="74" y="151" width="58" height="42" rx="15" />
          <rect x="147" y="126" width="58" height="67" rx="15" />
          <rect x="220" y="92" width="58" height="101" rx="15" />
          <rect x="293" y="50" width="58" height="143" rx="15" />
        </g>
        <path className="stat-route" d="M78 131c74-2 154-47 241-100" />
        <path className="stat-route" d="M299 31h22v22" />
        <text className="stat-value stat-value--spend" x="410" y="118" textAnchor="middle">$6.37tn</text>
        <text className="stat-small-label" x="404" y="143" textAnchor="middle">IT SPEND</text>
        <g className="stat-badge stat-badge--green">
          <rect x="355" y="158" width="98" height="30" rx="15" />
          <text x="404" y="178" textAnchor="middle">+14.2%</text>
        </g>
      </svg>
    </div>
  ),
  "tech-budget": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <text className="stat-value stat-value--xl" x="260" y="120" textAnchor="middle">7.7%</text>
        <text className="stat-serif-label" x="260" y="146" textAnchor="middle">of revenue</text>
        <rect className="stat-budget-track" x="90" y="173" width="340" height="25" rx="12.5" />
        <rect className="stat-budget-fill" x="90" y="173" width="92" height="25" rx="12.5" />
        <path className="stat-signal" d="M112 52h78m-12-12 12 12-12 12M408 52h-78m12-12-12 12 12 12" />
        <text className="stat-small-label" x="260" y="57" textAnchor="middle">BUDGETS CONTRACT</text>
      </svg>
    </div>
  ),
  "ai-scrutiny": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-document">
          <rect x="73" y="43" width="286" height="154" rx="25" />
          <rect x="101" y="76" width="118" height="13" rx="6.5" />
          <rect x="101" y="105" width="204" height="11" rx="5.5" />
          <rect x="101" y="130" width="164" height="11" rx="5.5" />
          <rect x="101" y="155" width="91" height="11" rx="5.5" />
        </g>
        <g className="stat-magnifier">
          <circle cx="351" cy="109" r="58" />
          <path d="M393 151l49 49" />
        </g>
        <text className="stat-value" x="351" y="119" textAnchor="middle">58%</text>
        <g className="stat-badge stat-badge--top">
          <rect x="322" y="24" width="144" height="30" rx="15" />
          <text x="394" y="44" textAnchor="middle">BUYERS CHECK</text>
        </g>
      </svg>
    </div>
  ),
  "ai-market": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-network">
          <path d="M78 174l80-49 83 29 88-84 111-25" />
          <circle cx="78" cy="174" r="16" /><circle cx="158" cy="125" r="16" />
          <circle cx="241" cy="154" r="16" /><circle cx="329" cy="70" r="16" />
          <circle cx="440" cy="45" r="16" />
        </g>
        <text className="stat-value stat-value--xl" x="259" y="105" textAnchor="middle">$3.5tn</text>
        <text className="stat-serif-label" x="259" y="132" textAnchor="middle">forecast by 2033</text>
        <path className="stat-route" d="M399 31h42v42" />
      </svg>
    </div>
  ),
  "ai-research": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-ai-answer">
          <rect x="64" y="38" width="392" height="164" rx="27" />
          <circle cx="102" cy="78" r="15" />
          <path d="M96 78h12M102 72v12" />
          <rect x="130" y="67" width="128" height="12" rx="6" />
          <rect x="130" y="88" width="77" height="9" rx="4.5" />
          <rect x="93" y="127" width="246" height="10" rx="5" />
          <rect x="93" y="151" width="188" height="10" rx="5" />
          <rect x="93" y="175" width="220" height="10" rx="5" />
        </g>
        <g className="stat-answer-score">
          <circle cx="390" cy="142" r="55" />
          <text className="stat-value" x="390" y="148" textAnchor="middle">94%</text>
          <text className="stat-small-label" x="390" y="168" textAnchor="middle">USE AI</text>
        </g>
      </svg>
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
