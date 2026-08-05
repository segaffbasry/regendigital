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

function SaaSGraphic() {
  return (
    <svg aria-hidden="true" viewBox="0 0 760 420">
      <g className="industry-system__grid-lines">
        <path d="M80 70V340M80 340H700" />
        <path d="M80 270H700M80 200H700M80 130H700" />
      </g>
      <path className="industry-system__area" d="M80 315C160 300 174 268 240 274S337 229 390 224S484 162 540 170S624 104 700 92V340H80Z" />
      <path className="industry-system__signal-line" d="M80 315C160 300 174 268 240 274S337 229 390 224S484 162 540 170S624 104 700 92" />
      <g className="industry-system__signal-dots">
        <circle cx="240" cy="274" r="7" /><circle cx="390" cy="224" r="7" /><circle cx="540" cy="170" r="7" /><circle cx="700" cy="92" r="7" />
      </g>
      <g className="industry-system__metric-card">
        <rect x="112" y="88" width="174" height="78" rx="14" />
        <text x="132" y="116">NET REVENUE RETENTION</text>
        <text className="industry-system__metric-value" x="132" y="148">116%</text>
      </g>
      <g className="industry-system__metric-card">
        <rect x="474" y="252" width="178" height="68" rx="14" />
        <text x="494" y="280">QUALIFIED PIPELINE</text>
        <text className="industry-system__metric-value" x="494" y="307">+42%</text>
      </g>
    </svg>
  );
}

function AIGraphic() {
  const nodes = [[116, 104], [116, 210], [116, 316], [276, 88], [276, 162], [276, 258], [276, 332], [482, 120], [482, 210], [482, 300], [654, 156], [654, 264]];
  return (
    <svg aria-hidden="true" viewBox="0 0 760 420">
      <g className="industry-system__ai-links">
        <path d="M116 104L276 88L482 120L654 156M116 104L276 162L482 210L654 156M116 210L276 162M116 210L276 258L482 210M116 316L276 258L482 300L654 264M116 316L276 332L482 300M276 88L482 210M276 332L482 210M482 120L654 264" />
      </g>
      <g className="industry-system__ai-nodes">
        {nodes.map(([x, y], index) => <circle cx={x} cy={y} key={`${x}-${y}`} r={index === 8 ? 17 : 8} />)}
      </g>
      <g className="industry-system__ai-core">
        <rect x="348" y="176" width="136" height="68" rx="34" />
        <text x="416" y="204" textAnchor="middle">VALUE</text>
        <text x="416" y="226" textAnchor="middle">INFERENCE</text>
      </g>
      <text className="industry-system__axis-label" x="76" y="382">MODEL CAPABILITY</text>
      <text className="industry-system__axis-label" x="590" y="382">BUYER VALUE</text>
    </svg>
  );
}

function TechGraphic() {
  return (
    <svg aria-hidden="true" viewBox="0 0 760 420">
      <g className="industry-system__tech-traces">
        <path d="M92 210H180M580 210H676M380 66V118M380 302V354M180 122H238V158M180 298H238V262M580 122H522V158M580 298H522V262" />
        <circle cx="92" cy="210" r="7" /><circle cx="676" cy="210" r="7" /><circle cx="380" cy="66" r="7" /><circle cx="380" cy="354" r="7" />
      </g>
      <g className="industry-system__tech-stack">
        <rect x="238" y="118" width="284" height="64" rx="10" />
        <rect x="238" y="190" width="284" height="64" rx="10" />
        <rect x="238" y="262" width="284" height="40" rx="10" />
        <text x="262" y="156">POSITIONING LAYER</text>
        <text x="262" y="228">DEMAND ENGINE</text>
        <text x="262" y="288">PIPELINE SIGNAL</text>
        <text className="industry-system__tech-status" x="486" y="156" textAnchor="end">CLEAR</text>
        <text className="industry-system__tech-status" x="486" y="228" textAnchor="end">SYNCED</text>
        <text className="industry-system__tech-status" x="486" y="288" textAnchor="end">LIVE</text>
      </g>
      <g className="industry-system__tech-side-labels">
        <text x="104" y="198">PRODUCT</text><text x="104" y="222">TRUTH</text>
        <text x="600" y="198">MARKET</text><text x="600" y="222">DEMAND</text>
      </g>
    </svg>
  );
}

function ProfessionalServicesGraphic() {
  return (
    <svg aria-hidden="true" viewBox="0 0 760 420">
      <g className="industry-system__decision-path">
        <path d="M94 210H666" />
        <circle cx="154" cy="210" r="44" /><circle cx="330" cy="210" r="44" /><circle cx="506" cy="210" r="44" /><circle cx="666" cy="210" r="26" />
      </g>
      <g className="industry-system__decision-labels">
        <text x="154" y="204" textAnchor="middle">EXPERT</text><text x="154" y="224" textAnchor="middle">PROOF</text>
        <text x="330" y="204" textAnchor="middle">BUYER</text><text x="330" y="224" textAnchor="middle">TRUST</text>
        <text x="506" y="204" textAnchor="middle">TEAM</text><text x="506" y="224" textAnchor="middle">CONSENSUS</text>
        <text x="666" y="216" textAnchor="middle">WIN</text>
      </g>
      <g className="industry-system__stakeholder-tags">
        <rect x="116" y="88" width="108" height="34" rx="17" /><text x="170" y="110" textAnchor="middle">COMMERCIAL</text>
        <rect x="276" y="304" width="108" height="34" rx="17" /><text x="330" y="326" textAnchor="middle">TECHNICAL</text>
        <rect x="452" y="88" width="108" height="34" rx="17" /><text x="506" y="110" textAnchor="middle">LEADERSHIP</text>
      </g>
    </svg>
  );
}

function InvestorGraphic() {
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

function GraphicFor({ type }) {
  if (type === "saas") return <SaaSGraphic />;
  if (type === "ai") return <AIGraphic />;
  if (type === "tech") return <TechGraphic />;
  if (type === "professional-services") return <ProfessionalServicesGraphic />;
  return <InvestorGraphic />;
}

export function IndustryCardGraphic({ type }) {
  return (
    <span className={`industry-card-graphic industry-card-graphic--${type}`} aria-hidden="true">
      <span /><span /><span /><i />
    </span>
  );
}

export default function IndustrySystemGraphic({ type = "tech" }) {
  const meta = industryMeta[type] || industryMeta.tech;

  return (
    <section className={`industry-system industry-system--${type}`} aria-label={`${meta.eyebrow}: ${meta.title}`}>
      <div className="industry-system__topline">
        <span>{meta.status}</span>
        <span>REGEN / B2B MARKET SYSTEM</span>
      </div>
      <div className="industry-system__copy">
        <p className="editorial-kicker">{meta.eyebrow}</p>
        <h2>{meta.title}</h2>
        <p>{meta.detail}</p>
      </div>
      <div className="industry-system__visual">
        <GraphicFor type={type} />
      </div>
      <div className="industry-system__readout" aria-hidden="true">
        <span>SIGNAL 01</span><i /><span>STRATEGY</span><i /><span>DEMAND</span><i /><span>PIPELINE</span>
      </div>
    </section>
  );
}
