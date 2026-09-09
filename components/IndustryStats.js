import IndustryStatCount from "./IndustryStatCount";

function StatFrame({ children, variant = "" }) {
  return (
    <div className={`industry-stat-visual industry-stat-visual--illustration industry-stat-visual--clean ${variant}`} aria-hidden="true">
      <svg viewBox="0 0 520 260" role="presentation">{children}</svg>
    </div>
  );
}

function PercentageDial({ value, label }) {
  return (
    <StatFrame>
      <circle className="stat-clean-track" cx="260" cy="130" r="98" />
      <circle className="stat-clean-progress" cx="260" cy="130" r="98"
        pathLength="100" strokeDasharray={`${value} ${100 - value}`}
        transform="rotate(-90 260 130)" />
      <text className="stat-clean-number" x="260" y={label ? 128 : 151} textAnchor="middle">{value}%</text>
      {label ? <text className="stat-clean-label" x="260" y="159" textAnchor="middle">{label}</text> : null}
    </StatFrame>
  );
}

function CostComparison() {
  return (
    <StatFrame>
      {[{ value: "+20%", label: "then", y: 20 }, { value: "+60%", label: "now", y: 145 }].map(({ value, label, y }, index) => (
        <g key={label}>
          <rect className="stat-clean-surface" x="38" y={y} width="444" height="95" rx="24" />
          <text className="stat-clean-number stat-clean-number--medium" x="65" y={y + 64}>{value}</text>
          <text className="stat-clean-label" x="240" y={y + 59}>{label}</text>
          <path className={`stat-clean-arrow stat-clean-arrow--${index ? "up" : "down"}`}
            d={index ? `M407 ${y + 62}l15-18 15 9 20-25m-20 0h20v20` : `M407 ${y + 30}l15 18 15-9 20 25m-20 0h20v-20`} />
        </g>
      ))}
    </StatFrame>
  );
}

function GrowthPlot({ type }) {
  const isTech = type === "tech";
  return (
    <StatFrame>
      <text className="stat-clean-number" x="260" y="77" textAnchor="middle">{isTech ? "$6.37tn" : "$3.5tn"}</text>
      <text className="stat-clean-label" x="260" y="105" textAnchor="middle">{isTech ? "worldwide IT spending" : "AI market by 2033"}</text>
      <path className="stat-clean-axis" d="M65 130v87h390M65 174h390" />
      <path className="stat-clean-trend" d="M76 207C157 201 175 192 230 180S352 155 444 130" />
      <circle cx="444" cy="130" r="6" fill="var(--blue)" />
      <text className="stat-clean-small" x="65" y="246">{isTech ? "2026" : "Forecast"}</text>
      <text className="stat-clean-small" x="455" y="246" textAnchor="end">{isTech ? "+14.2%" : "2033"}</text>
    </StatFrame>
  );
}

function GrowthComparison() {
  return (
    <StatFrame>
      <text className="stat-clean-number" x="260" y="82" textAnchor="middle">4×</text>
      <text className="stat-clean-label" x="260" y="112" textAnchor="middle">faster growth</text>
      <text className="stat-clean-small" x="54" y="158">Peers</text>
      <rect className="stat-clean-surface" x="196" y="140" width="65" height="24" rx="12" />
      <text className="stat-clean-small" x="54" y="208">High-growth firms</text>
      <rect x="196" y="190" width="260" height="24" rx="12" fill="var(--blue)" />
    </StatFrame>
  );
}

function ExpertiseGraphic() {
  return (
    <StatFrame>
      <IndustryStatCount className="stat-clean-number" value={75} x="260" y="122" textAnchor="middle" />
      <text className="stat-clean-label" x="260" y="154" textAnchor="middle">of buyers</text>
      <rect className="stat-clean-surface" x="70" y="188" width="380" height="20" rx="10" />
      <rect x="70" y="188" width="285" height="20" rx="10" fill="var(--blue)" />
    </StatFrame>
  );
}

function BuyingCommittee() {
  return (
    <StatFrame>
      <text className="stat-clean-number" x="260" y="77" textAnchor="middle">6–10</text>
      <text className="stat-clean-label" x="260" y="107" textAnchor="middle">decision-makers</text>
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} transform={`translate(${92 + (i % 5) * 84} ${148 + Math.floor(i / 5) * 54})`}
          fill={i < 6 ? "var(--blue)" : "#dfe2d5"}>
          <circle cx="0" cy="0" r="10" />
          <path d="M-17 29a17 17 0 0 1 34 0z" />
        </g>
      ))}
    </StatFrame>
  );
}

const aiAssistants = [
  ["ChatGPT", "ChatGPT-Logo.png"],
  ["Gemini", "Google_Gemini_icon_2025.svg.webp"],
  ["Claude", "Claude_AI_symbol.svg.webp"],
  ["Perplexity", "perplexity-e6a4e1t06hd6dhczot580o.webp"],
  ["Grok", "grok-ai-icon.webp"],
];

function AiResearchGraphic() {
  return (
    <StatFrame variant="industry-stat-visual--mentions">
      <text className="stat-clean-number stat-clean-number--medium" x="260" y="53" textAnchor="middle">94%</text>
      <text className="stat-clean-small" x="260" y="79" textAnchor="middle">of buyers research through AI</text>
      {aiAssistants.map(([name, logo], i) => {
        const x = i < 3 ? 70 + i * 132 : 136 + (i - 3) * 132;
        const y = i < 3 ? 98 : 180;
        return (
          <g key={name}>
            <rect className="stat-clean-assistant" x={x} y={y} width="116" height="68" rx="13" />
            <image href={`/animation/Animated%20AI%20mentions%20interface/uploads/${logo}`}
              x={x + 36} y={y + 8} width="44" height="25" />
            <text className="stat-clean-small" x={x + 58} y={y + 54} textAnchor="middle">{name}</text>
          </g>
        );
      })}
    </StatFrame>
  );
}

const statVisuals = {
  "saas-cost": <CostComparison />,
  "saas-market": (
    <div className="industry-stat-visual industry-stat-visual--asset industry-stat-visual--asset-market" aria-hidden="true">
      <img src="/asset/AI%20Huge,%20Crowd%20Market.svg" alt="" />
    </div>
  ),
  "saas-journey": <PercentageDial value={17} label="with suppliers" />,
  "professional-clarity": <PercentageDial value={15} />,
  "professional-growth": <GrowthComparison />,
  "professional-expertise": <ExpertiseGraphic />,
  "tech-committee": <BuyingCommittee />,
  "tech-spend": <GrowthPlot type="tech" />,
  "tech-budget": <PercentageDial value={7.7} label="of revenue" />,
  "ai-scrutiny": <PercentageDial value={58} />,
  "ai-market": <GrowthPlot type="ai" />,
  "ai-research": <AiResearchGraphic />,
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
