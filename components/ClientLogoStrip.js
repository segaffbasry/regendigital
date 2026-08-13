const clientLogos = [
  { src: "/client-logos/client-01.png", alt: "MFD Solutions", scale: 1.58 },
  { src: "/client-logos/client-02.png", alt: "Equals Mgmt", scale: 0.81 },
  { src: "/client-logos/client-03.png", alt: "Finden", scale: 0.65 },
  { src: "/client-logos/client-04.png", alt: "Agency AI", scale: 1.94 },
  { src: "/client-logos/client-05.png", alt: "Pelicano", scale: 1.58 },
  { src: "/client-logos/client-06.png", alt: "Gitano", scale: 1.49 },
  { src: "/client-logos/juno.svg", alt: "Juno", scale: 0.42 },
  { src: "/client-logos/IntusHQ/intushq.svg", alt: "IntusHQ", scale: 0.44 },
  { src: "/client-logos/IntusHQ/ripl.svg", alt: "RIPL", scale: 0.44 },
];

function LogoSet({ duplicate = false }) {
  return (
    <div
      className="client-strip__logos"
      aria-hidden={duplicate ? "true" : undefined}
    >
      {clientLogos.map((logo) => (
        <span className="client-strip__logo" key={logo.src}>
          <img
            src={logo.src}
            alt={duplicate ? "" : logo.alt}
            style={{ "--logo-scale": logo.scale }}
          />
        </span>
      ))}
    </div>
  );
}

export default function ClientLogoStrip({ variant = "marquee", className = "" }) {
  const compact = variant === "compact";
  const rootClassName = [
    "client-strip",
    `client-strip--${compact ? "compact" : "marquee"}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClassName} aria-label="Client logo strip">
      <p>Trusted by ambitious B2B teams</p>
      <div className="client-strip__viewport">
        <div className="client-strip__track">
          {compact ? (
            <LogoSet />
          ) : (
            <>
              <LogoSet />
              <LogoSet duplicate />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
