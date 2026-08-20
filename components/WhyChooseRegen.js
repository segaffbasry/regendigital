import StaggerText from "./StaggerText";
import "../app/why-choose.css";

/* Same markup as the other home-page actions, so the roll-and-fill hover
   behaviour and arrow styling come along unchanged. */
function ArrowLink({ href, children, className = "" }) {
  return (
    <a className={`home-link cta-button cta-motion ${className}`} href={href}>
      <span className="cta-motion__fill" aria-hidden="true" />
      <span className="cta-motion__clip">
        <span className="cta-motion__roll">
          <span>{children}</span>
          <span aria-hidden="true">{children}</span>
        </span>
      </span>
      <span className="cta-arrow" aria-hidden="true" />
    </a>
  );
}

/* Minimal line icons, drawn on a 24px grid and stroked in currentColor so they
   pick up the tile colour rather than carrying their own. */
const icons = {
  compass: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="m15.6 8.4-2.3 5.4-5.4 2.3 2.3-5.4z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.8" />
      <circle cx="12" cy="12" r="3.1" />
      <path d="M12 1.8v2.8M12 19.4v2.8M1.8 12h2.8M19.4 12h2.8" />
    </>
  ),
  link: (
    <>
      <path d="M10.1 13.9a4.1 4.1 0 0 0 5.8 0l2.6-2.6a4.1 4.1 0 0 0-5.8-5.8l-1.3 1.3" />
      <path d="M13.9 10.1a4.1 4.1 0 0 0-5.8 0l-2.6 2.6a4.1 4.1 0 0 0 5.8 5.8l1.3-1.3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.4 12S6 5.6 12 5.6 21.6 12 21.6 12 18 18.4 12 18.4 2.4 12 2.4 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  chart: (
    <>
      <path d="M2.8 20.4h18.4" />
      <path d="M6.4 20.4v-5.6M11 20.4V8.2M15.6 20.4v-8.4M20.2 20.4V4.6" />
    </>
  ),
  bolt: <path d="M13.4 2.4 4.9 13.6h5.9l-1 8 8.4-11.2h-5.9z" />,
};

const reasons = [
  {
    icon: "compass",
    title: "Strategy comes first, always",
    body: "We’re not creative-led or channel-led. Every engagement starts with research and positioning, so everything that follows is built on something solid, not guesswork.",
  },
  {
    icon: "target",
    title: "Built for B2B, not everyone",
    body: "We work only with SaaS, AI, tech, and professional services businesses, so we already know how your market buys. We’re not learning on your budget.",
  },
  {
    icon: "link",
    title: "A partner, not a supplier",
    body: "We embed like an extension of your team and stay for the long game, advising and optimising as the business evolves, not running one channel and moving on.",
  },
  {
    icon: "eye",
    title: "A real point of view",
    body: "We challenge convention and reject cookie-cutter playbooks, so you get sharp, editorial thinking and a strategy as specific as the market you’re competing in.",
  },
  {
    icon: "chart",
    title: "Data drives every decision",
    body: "We track CAC, LTV, pipeline velocity, and conversion at every stage, then act on it, killing what isn’t working and scaling what is.",
  },
  {
    icon: "bolt",
    title: "We move fast, and you see it",
    body: "No six-month black holes. We work in short, focused sprints with real-time reporting, so you can see leads, conversions, and pipeline moving at every stage, not once a quarter.",
  },
];

export default function WhyChooseRegen() {
  return (
    <section className="home-section home-section--sand why-choose">
      <div className="why-choose__head">
        <StaggerText lineReveal>Why teams choose Regen?</StaggerText>
      </div>

      <ul className="why-choose__grid">
        {reasons.map((reason) => (
          <li className="why-choose__card" key={reason.title}>
            <span className="why-choose__icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {icons[reason.icon]}
              </svg>
            </span>
            <h3>{reason.title}</h3>
            <p>{reason.body}</p>
          </li>
        ))}
      </ul>

      <div className="why-choose__actions">
        <ArrowLink href="/contact" className="home-link--blue">Book a call</ArrowLink>
      </div>
    </section>
  );
}
