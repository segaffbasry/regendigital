const organicStages = [
  ["01", "Visible"],
  ["02", "Trusted"],
  ["03", "Shortlisted"],
];

export default function ServiceInsightGraphic({ variant }) {
  if (variant !== "organic-social") return null;

  return (
    <div
      className="service-insight-graphic service-insight-graphic--organic"
      role="img"
      aria-label="Organic social builds visibility into trust, then turns that trust into a place on the buyer's shortlist."
    >
      <div className="service-insight-graphic__journey" aria-hidden="true">
        <span className="service-insight-graphic__route" />
        {organicStages.map(([number, label], index) => (
          <span
            className={`service-insight-graphic__stage service-insight-graphic__stage--${index + 1}`}
            key={number}
          >
            <small>{number}</small>
            <strong>{label}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}
