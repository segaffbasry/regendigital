function PercentageDial({ value, compactValue = false }) {
  return (
    <div className="industry-stat-visual industry-stat-visual--illustration industry-stat-visual--percentage" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-percentage-dial">
          <circle className="stat-percentage-dial__track" cx="260" cy="116" r="84" pathLength="100" />
          <circle
            className="stat-percentage-dial__progress"
            cx="260"
            cy="116"
            r="84"
            pathLength="100"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{ "--dial-offset": 100 - value }}
          />
        </g>
        <text
          className={`stat-value stat-value--xl stat-percentage-dial__value${compactValue ? " stat-percentage-dial__value--compact" : ""}`}
          x="260"
          y="139"
          textAnchor="middle"
        >
          {value}%
        </text>
      </svg>
    </div>
  );
}

function GrowthPlot({ type }) {
  const isTech = type === "tech";

  return (
    <div className={`industry-stat-visual industry-stat-visual--illustration industry-stat-visual--growth-plot industry-stat-visual--growth-plot-${type}`} aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-growth-axis">
          <path d="M74 39v155h382" />
          <path d="M74 145h382M74 96h382" />
        </g>
        <text className="stat-growth-label stat-growth-label--start" x="74" y="211">
          {isTech ? "$5tn" : "Now"}
        </text>
        <path
          className="stat-growth-line"
          pathLength="100"
          d={isTech ? "M92 169C155 164 188 148 235 132S333 105 420 58" : "M91 174C159 168 190 155 238 138S335 102 420 53"}
        />
        <g className="stat-growth-end-label">
          <rect x="304" y="22" width="152" height="54" rx="18" />
          <text x="380" y="58" textAnchor="middle">{isTech ? "$6.37tn" : "$3.5tn"}</text>
        </g>
        <text className="stat-growth-label stat-growth-label--end" x="454" y="211" textAnchor="end">
          {isTech ? "+14,2%" : "2033"}
        </text>
      </svg>
    </div>
  );
}

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
  "professional-clarity": <PercentageDial value={15} />,
  "professional-growth": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-gap-axis">
          <path d="M74 125h372" />
          <circle cx="74" cy="125" r="8" />
        </g>
        <path className="stat-gap-line" pathLength="100" d="M74 125h346" />
        <g className="stat-gap-marker">
          <circle cx="420" cy="125" r="16" />
          <circle cx="420" cy="125" r="6" />
        </g>
        <text className="stat-gap-label" x="74" y="174">0×</text>
        <text className="stat-value stat-value--xl stat-gap-value" x="420" y="96" textAnchor="middle">4×</text>
      </svg>
    </div>
  ),
  "professional-expertise": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-expertise-track">
          <rect x="77" y="174" width="366" height="18" rx="9" />
          <rect className="stat-expertise-track__fill" x="77" y="174" width="275" height="18" rx="9" />
        </g>
        <g className="stat-expertise-ticker">
          <text className="stat-value stat-value--xl" x="260" y="139" textAnchor="middle">25%</text>
          <text className="stat-value stat-value--xl" x="260" y="139" textAnchor="middle">38%</text>
          <text className="stat-value stat-value--xl" x="260" y="139" textAnchor="middle">52%</text>
          <text className="stat-value stat-value--xl" x="260" y="139" textAnchor="middle">64%</text>
          <text className="stat-value stat-value--xl" x="260" y="139" textAnchor="middle">75%</text>
        </g>
      </svg>
    </div>
  ),
  "tech-committee": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-people-grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((person) => {
            const x = 102 + (person % 5) * 79;
            const y = person < 5 ? 61 : 145;
            const focus = {
              2: { x: "0px", y: "49px", delay: "0s" },
              6: { x: "-1px", y: "-35px", delay: ".12s" },
              8: { x: "1px", y: "-35px", delay: ".24s" },
            }[person];
            const dimOrder = [0, 1, 3, 4, 5, 7, 9].indexOf(person);
            return (
              <g
                className={`stat-person ${focus ? "stat-person--focus" : "stat-person--dim"}`}
                key={person}
                style={focus ? {
                  "--person-focus-x": focus.x,
                  "--person-focus-y": focus.y,
                  "--person-focus-delay": focus.delay,
                } : { "--person-dim-delay": `${dimOrder * .1}s` }}
              >
                <svg x={x - 34} y={y - 29} width="68" height="68" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  ),
  "tech-spend": <GrowthPlot type="tech" />,
  "tech-budget": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <defs>
          <clipPath id="stat-budget-copy-mask">
            <rect x="151" y="35" width="218" height="159" rx="20" />
          </clipPath>
        </defs>
        <g className="stat-budget-bar stat-budget-bar--seven">
          <rect className="stat-budget-bar__track" x="75" y="24" width="46" height="190" rx="23" />
          <circle className="stat-budget-bar__fill" cx="98" cy="191" r="23" />
        </g>
        <g className="stat-budget-bar stat-budget-bar--ten">
          <rect className="stat-budget-bar__track" x="399" y="24" width="46" height="190" rx="23" />
          <rect className="stat-budget-bar__fill stat-budget-bar__fill--ten" x="399" y="156" width="46" height="58" rx="23" />
        </g>
        <g className="stat-budget-copy" clipPath="url(#stat-budget-copy-mask)">
          <g className="stat-budget-copy__state stat-budget-copy__state--then">
            <text className="stat-budget-copy__number" x="260" y="122" textAnchor="middle">7,7%</text>
            <text className="stat-budget-copy__word" x="260" y="168" textAnchor="middle">then</text>
          </g>
          <g className="stat-budget-copy__state stat-budget-copy__state--now">
            <text className="stat-budget-copy__number" x="260" y="122" textAnchor="middle">10%</text>
            <text className="stat-budget-copy__word" x="260" y="168" textAnchor="middle">now</text>
          </g>
        </g>
      </svg>
    </div>
  ),
  "ai-scrutiny": <PercentageDial value={58} compactValue />,
  "ai-market": <GrowthPlot type="ai" />,
  "ai-research": (
    <div className="industry-stat-visual industry-stat-visual--illustration" aria-hidden="true">
      <svg viewBox="0 0 520 240" role="presentation">
        <g className="stat-geo-window">
          <rect className="stat-geo-window__surface" x="54" y="27" width="412" height="186" rx="28" />
          <g className="stat-geo-prompt">
            <rect x="77" y="49" width="366" height="46" rx="16" />
            <circle cx="102" cy="72" r="8" />
            <text x="121" y="77">Which AI partner?</text>
          </g>
          <g className="stat-geo-answer">
            <circle cx="93" cy="125" r="12" />
            <path d="M88 125h10M93 120v10" />
            <rect x="116" y="116" width="185" height="11" rx="5.5" />
            <rect x="116" y="138" width="257" height="9" rx="4.5" />
            <rect x="116" y="157" width="211" height="9" rx="4.5" />
          </g>
          <g className="stat-geo-citations">
            <g><rect x="78" y="181" width="62" height="22" rx="11" /><text x="109" y="196" textAnchor="middle">01</text></g>
            <g><rect x="149" y="181" width="62" height="22" rx="11" /><text x="180" y="196" textAnchor="middle">02</text></g>
          </g>
        </g>
        <g className="stat-answer-score">
          <circle cx="410" cy="151" r="45" />
          <text
            className="stat-value stat-answer-score__value"
            x="410"
            y="151"
            textAnchor="middle"
            dominantBaseline="central"
          >
            94<tspan className="stat-answer-score__percent">%</tspan>
          </text>
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
