import Image from "next/image";

const facts = [
  ["Established", "2022"],
  ["Team", "Global"],
  ["Regions", "EU · MENA · APAC"],
  ["Focus", "SaaS · AI · Tech · Professional services"],
];

const systemNodes = [
  ["01", "Research", "about-depth-system__node--research"],
  ["02", "Positioning", "about-depth-system__node--positioning"],
  ["03", "Creative", "about-depth-system__node--creative"],
  ["04", "Paid", "about-depth-system__node--paid"],
  ["05", "Search", "about-depth-system__node--search"],
  ["06", "Reporting", "about-depth-system__node--reporting"],
];

const principles = [
  {
    number: "01",
    title: "Strategy before output",
    copy: "We research the market, define the positioning, and decide what matters before a single campaign goes live.",
  },
  {
    number: "02",
    title: "One system, not silos",
    copy: "Creative, media, search, and reporting work from one commercial plan, so every signal improves the next move.",
  },
  {
    number: "03",
    title: "Senior team, properly embedded",
    copy: "You work with the people shaping and delivering the work, as an extension of your team rather than a set of disconnected specialists.",
  },
  {
    number: "04",
    title: "Commercially accountable",
    copy: "We connect attention and activity back to qualified pipeline, revenue, and the outcomes that move the business.",
  },
];

export function AboutDepthHero() {
  return (
    <section className="about-depth-hero" aria-labelledby="about-depth-title">
      <div className="about-depth-hero__grid" aria-hidden="true" />

      <div className="about-depth-hero__content">
        <p className="about-depth-kicker" data-about-reveal>About Regen / Est. 2022</p>
        <h1 id="about-depth-title">
          The B2B marketing team built around the <em>commercial outcome.</em>
        </h1>
        <p className="about-depth-hero__intro" data-about-reveal>
          We turn complex, high-stakes propositions into a clear commercial
          story, then build the connected marketing system that takes it to
          market.
        </p>
      </div>

      <div className="about-depth-hero__signal" aria-hidden="true">
        <span className="about-depth-hero__signal-label">
          One connected system
        </span>
        <div className="about-depth-hero__signal-track">
          <span>
            <i>01</i>
            Strategy
          </span>
          <span>
            <i>02</i>
            Positioning
          </span>
          <span>
            <i>03</i>
            Demand
          </span>
          <strong>
            <i>04</i>
            Pipeline + revenue
          </strong>
        </div>
      </div>

      <dl className="about-depth-hero__facts">
        {facts.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function AboutDepthStory() {
  return (
    <section className="about-depth-story" aria-labelledby="about-depth-story-title">
      <div className="about-depth-story__copy">
        <p className="about-depth-kicker" data-about-reveal>Why Regen exists</p>
        <h2 id="about-depth-story-title">
          Strong B2B businesses deserve marketing that catches up with the
          product.
        </h2>
        <div className="about-depth-story__body">
          <p data-about-reveal>
            We work with founders and commercial leaders whose growth has
            outpaced their marketing. We start with research and strategy,
            make the proposition commercially clear, then run the channels
            that turn attention into qualified pipeline.
          </p>
          <p data-about-delay="80" data-about-reveal>
            Senior thinking and hands-on delivery sit in one team: strategy,
            creative, paid, search, and reporting all working from one
            commercial plan.
          </p>
        </div>
      </div>

      <figure className="about-depth-story__media">
        <Image
          alt="Holly and Taylor working together on a client strategy"
          fill
          sizes="(max-width: 820px) 100vw, 48vw"
          src="/pics/new-asset.png"
        />
        <figcaption>
          <span>Strategy</span>
          <i aria-hidden="true" />
          <span>Positioning</span>
          <i aria-hidden="true" />
          <span>Demand</span>
          <i aria-hidden="true" />
          <strong>Pipeline</strong>
        </figcaption>
      </figure>
    </section>
  );
}

export function AboutDepthSystem() {
  return (
    <section className="about-depth-system" aria-labelledby="about-depth-system-title">
      <div className="about-depth-system__copy">
        <p className="about-depth-kicker" data-about-reveal>One connected team</p>
        <h2 id="about-depth-system-title">
          Built to operate as one connected marketing function.
        </h2>
        <p data-about-reveal>
          The people thinking about the business are the people building,
          testing, and improving the work. Every discipline works from the
          same commercial plan.
        </p>
      </div>

      <div className="about-depth-system__visual">
        <svg
          aria-hidden="true"
          className="about-depth-system__connections"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="31" />
          <circle cx="50" cy="50" r="43" />
          <line x1="50" y1="50" x2="50" y2="8" />
          <line x1="50" y1="50" x2="88" y2="27" />
          <line x1="50" y1="50" x2="88" y2="73" />
          <line x1="50" y1="50" x2="50" y2="92" />
          <line x1="50" y1="50" x2="12" y2="73" />
          <line x1="50" y1="50" x2="12" y2="27" />
        </svg>

        <div className="about-depth-system__core">
          <span>Shared goal</span>
          <strong>Commercial growth</strong>
        </div>

        {systemNodes.map(([number, label, positionClass]) => (
          <div
            className={`about-depth-system__node ${positionClass}`}
            key={label}
          >
            <i>{number}</i>
            <strong>{label}</strong>
          </div>
        ))}
      </div>

      <ol className="about-depth-system__text-list">
        {systemNodes.map(([number, label]) => (
          <li key={label}>
            <span>{number}</span>
            {label}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AboutDepthPrinciples() {
  return (
    <section
      className="about-depth-principles"
      aria-labelledby="about-depth-principles-title"
    >
      <header className="about-depth-principles__header">
        <p className="about-depth-kicker" data-about-reveal>How we operate</p>
        <h2 id="about-depth-principles-title">
          The standards behind the work.
        </h2>
      </header>

      <div className="about-depth-principles__grid">
        {principles.map((principle) => (
          <article data-about-reveal key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AboutDepthSections() {
  return (
    <>
      <AboutDepthHero />
      <AboutDepthStory />
      <AboutDepthSystem />
      <AboutDepthPrinciples />
    </>
  );
}
