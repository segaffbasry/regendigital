const ECOSYSTEM_ANIMATION_SRC =
  "/Design%20system%20animation/Marketing%20Ecosystem.dc.html?embed=1";

export default function MarketingEcosystemAnimation({
  className = "",
  title = "A connected marketing ecosystem with Regen at its centre",
}) {
  return (
    <iframe
      className={`marketing-ecosystem-animation${className ? ` ${className}` : ""}`}
      loading="lazy"
      referrerPolicy="no-referrer"
      sandbox="allow-same-origin allow-scripts"
      src={ECOSYSTEM_ANIMATION_SRC}
      tabIndex={-1}
      title={title}
    />
  );
}
