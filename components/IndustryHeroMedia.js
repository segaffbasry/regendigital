const platformLogos = [
  { src: "/client-logos/client-03.png", alt: "Finden", className: "industry-platform-logos__finden" },
  { src: "/client-logos/IntusHQ/intushq.svg", alt: "IntusHQ", className: "industry-platform-logos__intus" },
  { src: "/client-logos/juno.svg", alt: "Juno", className: "industry-platform-logos__juno" },
];

export default function IndustryHeroMedia({ media }) {
  if (media.type === "logos") {
    return (
      <span className="editorial-hero__media editorial-hero__media--logos" aria-label="SaaS platforms including Finden, IntusHQ, and Juno">
        <span className="industry-platform-logos">
          {platformLogos.map((logo) => <img alt={logo.alt} className={logo.className} key={logo.src} src={logo.src} />)}
        </span>
      </span>
    );
  }

  return (
    <span className="editorial-hero__media" aria-hidden="true">
      <img
        src={media.src}
        alt=""
        style={{ objectPosition: media.position, transform: `scale(${media.scale || 1})` }}
      />
    </span>
  );
}
