import FaqItem from "./FaqItem";
import StaggerText from "./StaggerText";

const faqs = [
  {
    question: "Who is Regen?",
    answer:
      "Regen is a B2B digital marketing agency for SaaS, AI, tech, and professional services. Established in 2022, we work with founders and commercial leaders whose growth has outpaced their marketing. We are a global team operating across the EU, MENA, and APAC, and we lead with strategy rather than channel output. Our job is to turn a complex, high-stakes proposition into a clear commercial story the market acts on.",
  },
  {
    question: "What does Regen do?",
    answer:
      "Regen builds and runs the full marketing system for B2B businesses, led by strategy. We start with research, set the positioning and the plan, then deliver the channels and campaigns that carry it, from organic and paid social to Google Ads, SEO and GEO, and account-based marketing. Everything ladders up to one strategy built around your business, so the work holds its value as your market shifts. It's how we turn marketing into demand generation, lead generation, qualified pipeline, and revenue.",
  },
  {
    question: "Which industries do you work with?",
    answer:
      "We work with SaaS, AI, and tech, and with professional services like legal, construction, and manufacturing. What these have in common is a considered, multi-stakeholder sale where the value is real but hard to communicate. That is exactly where generic marketing underserves them, because it sells the category rather than the reason to choose one business over another.",
  },
  {
    question: "Do you work with start-ups?",
    answer:
      "Yes. A lot of our work is with SaaS, AI, and tech founders, from pre-investment and self-funding through to Series A and B. We meet you at the stage you are actually at, whether that is finding product-market fit, scaling demand, or entering a new market. The one thing we ask is that you are ready to lead with strategy rather than chase a single quick tactic, because that is where our work makes the biggest difference.",
  },
  {
    question: "How do I know which services I need?",
    answer:
      "You do not have to work that out on your own, and you do not pick from a menu. We research your market and audit where your marketing is now, then recommend the services that will move your business forward. The quickest way to find out is a Free Audit or a strategy call, where we give you a genuine point of view on what to prioritise.",
  },
  {
    question: "Do you just advise, or run the marketing too?",
    answer:
      "Both, we set the strategy and the positioning, then build and run the channels and campaigns that deliver it. Many clients start with consultancy and move into full delivery, and we embed like an in-house team rather than a hands-off agency you have to chase. Part of the value is raising your team's judgement along the way, so you make better marketing calls over time.",
  },
  {
    question: "How is Regen different to other agencies?",
    answer:
      "Most agencies in our space are creative-led or channel-led, so they start with output. We start with research and strategy, build the positioning from it, then run the marketing that delivers it. The difference is a commercial, strategy-led frame aimed at founders rather than marketers, backed by a real editorial point of view.",
  },
  {
    question: "How is Regen different to freelancers?",
    answer:
      "A freelancer usually gives you one skill and one pair of hands. Regen gives you a full strategy-led team and a marketing system where the channels work together, with senior thinking on positioning, the channels to deliver it, and reporting tied to pipeline and revenue. You are not left managing a set of separate specialists and hoping it all adds up. We own the strategy and the delivery as one, and we stay with you as the business evolves, so nothing falls through the gaps.",
  },
  {
    question: "How soon will we see results?",
    answer:
      "B2B marketing is a considered space, and the majority of the time it has longer lead times than other channels. Getting your positioning right has a strong, early impact on how the market sees you, and we typically start driving results from month 2 onwards. Compounding channels like SEO and GEO take longer to build and keep growing over time. We are honest about timelines on the first call, and we report on progress the whole way through.",
  },
  {
    question: "How do you measure success?",
    answer:
      "While vanity metrics like reach, impressions, and engagement are important, we tie everything back to the numbers that move your business, qualified pipeline, revenue, acquisition cost, and retention. Your reporting connects the two, so you can see how the top-of-funnel activity turns into commercial results.",
  },
];

function ClosingArrowLink({ href, children }) {
  return (
    <a className="home-link cta-motion home-link--sand" href={href}>
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

function FaqQuestion({ children }) {
  return (
    <strong className="faq-question" aria-label={children}>
      <span aria-hidden="true">
        {children.split(" ").map((word, wordIndex) => (
          <span
            className="faq-question__word"
            key={`${word}-${wordIndex}`}
            style={{ "--word-index": wordIndex }}
          >
            <span className="faq-question__track">
              <span className="faq-question__face faq-question__face--helvetica">
                {word}
              </span>
              <span className="faq-question__face faq-question__face--newsreader">
                {word}
              </span>
            </span>
          </span>
        ))}
      </span>
    </strong>
  );
}

export default function HomeClosingSections() {
  return (
    <>
      <section className="final-cta-stage" aria-label="Get in touch">
        <div className="final-cta-stage__sticky">
          <div className="home-section home-section--blue final-cta">
            <div className="final-cta__content">
              <p className="home-kicker">Get in Touch</p>
              <StaggerText lineReveal>
                Tell us what you&apos;re trying to achieve.
              </StaggerText>
              <p>
                We&apos;ll come back with a genuine point of view, and if it&apos;s
                a fit, put a strategy call in the diary.
              </p>
              <ClosingArrowLink href="/contact">Book a Call</ClosingArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--bone faq-section">
        <div className="home-section__intro">
          <p className="home-kicker">Questions, answered.</p>
          <StaggerText lineReveal>FAQs</StaggerText>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              index={index}
              question={<FaqQuestion>{faq.question}</FaqQuestion>}
              answer={faq.answer}
            />
          ))}
        </div>
      </section>
    </>
  );
}
