import FaqItem from "./FaqItem";
import { InvestorGraphic } from "./IndustrySystemGraphic";
import PartnershipForm from "./PartnershipForm";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";

const partnershipSteps = [
  ["01", "Triage", "We identify the biggest commercial marketing gaps and which companies need support first."],
  ["02", "Activate", "Each company gets the right mix of positioning, strategy, and delivery for its stage."],
  ["03", "Report", "The fund gets clear updates on progress, priorities, and the next commercial move."],
];

const partnershipBenefits = [
  "Preferential portfolio terms",
  "Senior support for founders",
  "Specialist B2B SaaS, AI, and tech delivery",
  "A shared standard without a one-size-fits-all playbook",
];

const fitSignals = [
  "A strong product is hard for the market to understand.",
  "Growth has outpaced the marketing around it.",
  "A founder needs a partner, not another supplier to manage.",
  "The commercial story needs to support the next round.",
  "Several companies need a repeatable route to better marketing.",
];

const partnershipFaqs = [
  [
    "Do you work with the fund or each portfolio company?",
    "Either. We can structure a portfolio relationship with the investment team and scope work directly with the companies that need it. The call establishes the right model.",
  ],
  [
    "Which companies are the best fit?",
    "B2B SaaS, AI, and tech businesses where the proposition is complex, the sale is considered, and marketing needs to catch up with the product or growth stage.",
  ],
  [
    "What can you support?",
    "Positioning, strategy, go-to-market, content, SEO and GEO, paid media, ABM, and founder-led marketing—connected around one commercial goal.",
  ],
  [
    "What happens on the call?",
    "A 30-minute conversation with a Regen co-founder about portfolio priorities, current support gaps, and one useful place to start. There is no obligation.",
  ],
];

export default function InvestorPartnershipPage() {
  return (
    <main className="partnership-page">
      <SiteHeader />

      <section className="partnership-hero">
        <div className="partnership-hero__copy">
          <p className="editorial-kicker">For venture capital and investment teams</p>
          <h1>
            Bring one marketing standard to the <em>whole portfolio.</em>
          </h1>
          <p className="partnership-hero__lede">
            Regen helps B2B SaaS, AI, and tech companies sharpen their positioning, build demand,
            and become commercially ready for the next stage—without every founder having to find
            and manage a different agency.
          </p>
          <div className="partnership-hero__actions">
            <a className="editorial-link cta-button" href="#partnership-call">
              <span>Request a partnership call</span>
              <span className="cta-arrow" aria-hidden="true" />
            </a>
            <p>30 minutes · With Holly or Taylor · No obligation</p>
          </div>
        </div>

        <div
          className="partnership-hero__system industry-system--investors"
          role="img"
          aria-label="A portfolio of companies connected to one shared growth standard."
        >
          <div className="partnership-hero__system-topline" aria-hidden="true">
            <span>PORTFOLIO / CONNECTED</span>
            <span>REGEN / GROWTH STANDARD</span>
          </div>
          <div className="industry-system__visual">
            <InvestorGraphic />
          </div>
          <div className="partnership-hero__system-foot" aria-hidden="true">
            <span>TRIAGE</span><i /><span>ACTIVATE</span><i /><span>REPORT</span>
          </div>
        </div>
      </section>

      <section className="partnership-model">
        <div className="partnership-model__intro">
          <p className="editorial-kicker">The portfolio problem</p>
          <h2>Strong products stall when the market cannot see why to choose them.</h2>
          <p>
            The gap is often not product or ambition. It is the story, the strategy, and the system
            around growth. We give portfolio companies senior marketing thinking and delivery,
            while the fund gets a clearer view of progress, risks, and opportunities.
          </p>
        </div>

        <div className="partnership-model__steps" aria-label="Our three-layer portfolio partnership model">
          {partnershipSteps.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>

        <ul className="partnership-model__benefits" aria-label="Partnership benefits">
          {partnershipBenefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
        </ul>
      </section>

      <section className="partnership-fit">
        <div>
          <p className="editorial-kicker">Where we are useful</p>
          <h2>Bring us in <em>when…</em></h2>
        </div>
        <ol>
          {fitSignals.map((signal, index) => (
            <li key={signal}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{signal}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="editorial-faq partnership-faq">
        <div>
          <p className="editorial-kicker">Investor FAQs</p>
          <h2>Questions,<br /><em>answered.</em></h2>
        </div>
        <div className="editorial-faq__items">
          {partnershipFaqs.map(([question, answer]) => (
            <FaqItem answer={answer} key={question} question={question} />
          ))}
        </div>
      </section>

      <section className="partnership-call" id="partnership-call" aria-labelledby="partnership-call-title">
        <div className="partnership-call__copy">
          <p className="editorial-kicker">Partnership call</p>
          <h2 id="partnership-call-title" tabIndex="-1">Tell us where the portfolio needs support.</h2>
          <p>
            A little context lets Holly or Taylor make the first conversation useful. We will reply
            directly to arrange a time that works.
          </p>
          <div className="contact-hosts">
            <div className="contact-hosts__faces" aria-label="Holly and Taylor, Regen co-founders">
              <img src="/images/founders/holly-updated.png" alt="Holly, Regen co-founder" />
              <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
            </div>
            <div>
              <strong>Holly &amp; Taylor</strong>
              <span>Your partnership conversation is with us.</span>
            </div>
          </div>
        </div>

        <div className="contact-form-card partnership-call__card">
          <div className="contact-form-card__top">
            <div>
              <div className="form-founder-faces" aria-hidden="true">
                <img src="/images/founders/holly-updated.png" alt="" />
                <img src="/images/founders/taylor-portrait.webp" alt="" />
              </div>
              <p className="contact-kicker">Get started here</p>
              <h2>Request a partnership call</h2>
            </div>
            <div className="contact-form-card__meta">
              <span><i aria-hidden="true">◷</i> 30 min conversation</span>
              <span><i aria-hidden="true">●</i> Reply in 1–2 days</span>
            </div>
          </div>
          <PartnershipForm />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
