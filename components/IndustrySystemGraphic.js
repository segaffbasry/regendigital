const industryMeta = {
  saas: {
    eyebrow: "Recurring revenue system",
    title: "From product signal to predictable ARR.",
    detail: "Positioning, acquisition, activation, and retention measured as one commercial loop.",
    status: "ARR ENGINE / LIVE",
  },
  ai: {
    eyebrow: "AI category signal",
    title: "Translate model capability into buyer value.",
    detail: "A clear path from technical proof to category authority, demand, and AI visibility.",
    status: "INFERENCE / MARKET FIT",
  },
  tech: {
    eyebrow: "Commercial architecture",
    title: "Connect technical depth to market demand.",
    detail: "Product truth becomes a clear narrative, then a connected system that produces pipeline.",
    status: "GO-TO-MARKET / SYNCED",
  },
  "professional-services": {
    eyebrow: "High-trust decision system",
    title: "Make judgement visible before the first conversation.",
    detail: "Reputation, expertise, and proof aligned to every stakeholder in a considered buying decision.",
    status: "TRUST LAYER / VERIFIED",
  },
  investors: {
    eyebrow: "Portfolio growth layer",
    title: "One marketing standard across every company.",
    detail: "A repeatable strategic system that sharpens positioning and accelerates commercial readiness.",
    status: "PORTFOLIO / CONNECTED",
  },
};

const industryStages = {
  saas: ["Positioning", "Acquisition", "Activation", "Retention"],
  ai: ["Capability", "Buyer value", "Authority", "Demand"],
  tech: ["Product truth", "Narrative", "Demand", "Pipeline"],
  "professional-services": ["Expertise", "Proof", "Trust", "Consensus"],
  investors: ["Positioning", "Readiness", "Growth", "Portfolio signal"],
};

export function InvestorGraphic() {
  const companies = [[126, 104], [126, 210], [126, 316], [310, 104], [310, 316], [494, 104], [494, 316], [654, 210]];
  return (
    <svg aria-hidden="true" viewBox="0 0 760 420">
      <g className="industry-system__portfolio-links">
        {companies.map(([x, y]) => <path d={`M380 210L${x} ${y}`} key={`${x}-${y}`} />)}
      </g>
      <g className="industry-system__portfolio-companies">
        {companies.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 44} y={y - 24} width="88" height="48" rx="12" />
            <text x={x} y={y + 5} textAnchor="middle">CO {String(index + 1).padStart(2, "0")}</text>
          </g>
        ))}
      </g>
      <g className="industry-system__portfolio-core">
        <circle cx="380" cy="210" r="72" />
        <text x="380" y="202" textAnchor="middle">GROWTH</text>
        <text x="380" y="225" textAnchor="middle">STANDARD</text>
      </g>
    </svg>
  );
}

export function IndustryCardGraphic({ type }) {
  return (
    <span className={`industry-card-graphic industry-card-graphic--${type}`} aria-hidden="true">
      <span /><span /><span /><i />
    </span>
  );
}

export default function IndustrySystemGraphic({ body, type = "tech" }) {
  const meta = industryMeta[type] || industryMeta.tech;
  const stages = industryStages[type] || industryStages.tech;

  return (
    <section className={`industry-system industry-system--${type}`} aria-label={`${meta.eyebrow}: ${meta.title}`}>
      <div className="industry-system__topline">
        <span>{meta.status}</span>
        <span>REGEN / B2B MARKET SYSTEM</span>
      </div>
      <div className="industry-system__copy">
        <p className="editorial-kicker">{meta.eyebrow}</p>
        <h2>{meta.title}</h2>
        <p>{body || meta.detail}</p>
      </div>
      <ol className="industry-system__signal-field" aria-label={`${meta.eyebrow} stages`} role="list">
        {stages.map((stage, index) => (
          <li key={stage}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}
