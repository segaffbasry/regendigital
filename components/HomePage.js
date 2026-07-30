import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import StaggerText from "./StaggerText";
import HomeClosingSections from "./HomeClosingSections";
import HomeSectionMotion from "./HomeSectionMotion";
import TestimonialDrag from "./TestimonialDrag";
import WhoWeHelpTabs from "./WhoWeHelpTabs";
import MethodologySequence from "./MethodologySequence";

const services = [
  {
    title: "Marketing Strategy & Consultancy",
    href: "/services/marketing-strategy-consultancy",
    copy: "Research, positioning and a practical plan that gives every channel one clear commercial direction.",
    tone: "blue",
  },
  {
    title: "Go-to-Market & Launch",
    href: "/services/go-to-market-and-launch",
    copy: "A joined-up launch system that turns a strong proposition into attention, demand and qualified pipeline.",
    tone: "orange",
    image: "/pics/service-launch.webp",
  },
  {
    title: "Organic Social",
    href: "/services/organic-social",
    copy: "Distinctive, expert-led content that builds recognition and makes your company worth following.",
    tone: "sky",
  },
  {
    title: "Paid Social",
    href: "/services/paid-social",
    copy: "Paid campaigns built around real buyer insight, sharper creative and the outcomes your business needs.",
    tone: "black",
    image: "/pics/service-paid-social.webp",
  },
  {
    title: "Google Ads",
    href: "/services/google-ads",
    copy: "High-intent search campaigns that meet buyers at the moment they are ready to act.",
    tone: "lavender",
  },
  {
    title: "SEO",
    href: "/services/seo",
    copy: "Search visibility built to compound, capture demand, and make your expertise easier to find.",
    tone: "cream",
    image: "/pics/service-seo.webp",
  },
  {
    title: "GEO",
    href: "/services/geo",
    copy: "A clear, credible presence across the new generation of AI-powered discovery and answer engines.",
    tone: "sky",
  },
  {
    title: "Account-Based Marketing",
    href: "/services/account-based-marketing",
    copy: "Focused campaigns that create relevance and momentum inside the accounts that matter most.",
    tone: "blue",
    image: "/pics/service-abm.webp",
  },
  {
    title: "Founder-Led Marketing",
    href: "/services/founder-led-marketing",
    copy: "A credible founder voice transformed into a repeatable platform for trust, authority and demand.",
    tone: "orange",
  },
  {
    title: "Creator Partnerships",
    href: "/services/creator-partnerships",
    copy: "Strategic partnerships that borrow trust, reach the right communities and create genuine advocacy.",
    tone: "sky",
    image: "/pics/service-partnerships.webp",
  },
];

const clientLogos = [
  { src: "/client-logos/client-01.png", alt: "MFD Solutions", scale: 1.75 },
  { src: "/client-logos/client-02.png", alt: "Equals Might", scale: 1.2 },
  { src: "/client-logos/client-03.png", alt: "Finden", scale: 0.72 },
  { src: "/client-logos/client-04.png", alt: "AgencyAI", scale: 2.15 },
  { src: "/client-logos/client-05.png", alt: "Pelicano", scale: 1.75 },
  { src: "/client-logos/client-06.png", alt: "Gitano", scale: 1.65 },
];

const testimonialCards = [
  {
    company: "Finden",
    name: "Randeep Wilkhu",
    role: "Founder",
    image: "/testimonials/randeep-wilkhu.jpg",
    initials: "RW",
    quote: "From day one, Regen approached our brand with the same care and urgency as an in-house team. Partnering with Regen for our re-launch was a standout experience. Our Product Hunt debut, placing 3rd out of 280+ companies, set a new benchmark and sparked momentum. What we valued most was their communication and ability to operate seamlessly. Regen helped us reintroduce Finden with a more polished, professional presence, and we’d recommend them to any company looking for partners who deliver and take responsibility.",
    tone: "white",
  },
  {
    company: "Equals Mgmt.",
    name: "Scott Pugnetti",
    role: "Directors Agency",
    image: "/testimonials/scott-pugnetti.jpg",
    initials: "SP",
    quote: "Our social media page was constantly on pause and they’ve added consistency. Their keen eye for design and engaging content has led to us receiving constant compliments for our page. They are an integral part of our business and their professional and personable approach has made them a pleasure to deal with. They are always on top of current trends and I can’t overstate how crucial their work has been to the change in our brand identity and how this has increased our perceived value.",
    tone: "lavender",
  },
  {
    company: "Lucy Mills",
    name: "Lucy Mills",
    role: "TV Presenter",
    image: "/testimonials/lucy-mills.jpg",
    initials: "LM",
    quote: "I found Taylor and Holly after noticing a total uplift on my friend’s business profile, managed by Regen. From there, a fully fleshed-out audit of my socials was produced and a bespoke package pulled together in two weeks. I’ve fallen head over heels for the way Regen work together with me and my brand. They’re an extension of the team, and I love the collaborative approach where we build something together. My following is growing and clients are recognising the geniuses now working with me: innovative, creative, thoughtful and on the ball.",
    tone: "blue",
  },
  {
    company: "Only Child",
    name: "Dana Leonard",
    role: "Founder",
    image: "/testimonials/dana-leonard.png",
    initials: "DL",
    quote: "Regeneration feel like a true extension of our team. They understand the production industry, know how to position creative work across Instagram and LinkedIn, and communicate clearly and consistently throughout. Working with them feels seamless, and we trust them completely with our brand presence.",
    tone: "sand",
  },
  {
    company: "AgencyAI",
    name: "Max Modlin",
    image: "/testimonials/max-modlin.webp",
    initials: "MM",
    quote: "What sets them apart is that they operate as a genuine strategic partner, not an external agency. Holly and Taylor are properly invested in seeing us succeed, and it shows in how they work: they keep me right on the strategic decisions, bring thinking to the table proactively, and treat our goals as their own. The combination is rare. They’re sharp on the strategy, reliable on the delivery, and genuinely good people to work with. They’ve become a team I trust to help steer the direction of the business, which is not something I’d say about most agencies.",
    tone: "lavender",
  },
];

function ArrowLink({ href, children, className = "" }) {
  return (
    <a className={`home-link cta-motion ${className}`} href={href}>
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

function ServiceTitle({ children }) {
  return (
    <strong className="service-title" aria-label={children}>
      <span aria-hidden="true">
        {children.split(" ").map((word, index) => (
          <span
            className="service-title__word"
            key={`${word}-${index}`}
            style={{ "--service-word-index": index }}
          >
            <span className="service-title__track">
              <span className="service-title__face">{word}</span>
              <span className="service-title__face service-title__face--editorial">
                {word}
              </span>
            </span>
          </span>
        ))}
      </span>
    </strong>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <SiteHeader animated />
        <div className="home-hero__content">
          <StaggerText
            as="h1"
            className="hero-title-3d stagger-text--loader"
            aria-label="B2B marketing that grows as fast as you do."
            observe={false}
          >
            <span className="hero-title-mask">
              <span className="hero-title-3d__line">B2B marketing that</span>
            </span>
            <span className="hero-title-mask hero-title-mask--editorial-line">
              <span className="hero-title-3d__line">
                <em className="hero-title-3d__editorial">grows</em> as fast as you do.
              </span>
            </span>
          </StaggerText>
          <div className="home-hero__bottom hero-anim">
            <p>Regen is a B2B digital marketing agency for SaaS, AI, tech, and professional services. We pair a strong strategic foundation with content, paid, and search to turn pipeline into predictable revenue.</p>
            <ArrowLink href="/audit" className="home-link--sand">Free Audit</ArrowLink>
          </div>
        </div>
        <div className="client-strip" aria-label="Client logo strip">
          <p>Trusted by ambitious B2B teams</p>
          <div className="client-strip__viewport">
            <div className="client-strip__track">
              {[false, true].map((duplicate) => (
                <div
                  className="client-strip__logos"
                  aria-hidden={duplicate ? "true" : undefined}
                  key={duplicate ? "duplicate" : "primary"}
                >
                  {clientLogos.map((logo) => (
                    <span className="client-strip__logo" key={`${duplicate ? "duplicate-" : ""}${logo.src}`}>
                      <img
                        src={logo.src}
                        alt={duplicate ? "" : logo.alt}
                        style={{ "--logo-scale": logo.scale }}
                      />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section home-section--bone what-we-do" id="services">
        <div className="home-section__intro">
          <p className="home-kicker">What We Do</p>
          <StaggerText lineReveal>B2B digital marketing that scales with your business</StaggerText>
        </div>
        <div className="home-section__split">
          <p className="home-body-large">We connect strategy, positioning, content, paid media, and search into one system. Every channel has a clear job, every signal improves the next decision, and the whole plan is built around qualified pipeline and revenue.</p>
          <div className="home-section__actions home-section__actions--services">
            <ArrowLink href="/services">Explore our services</ArrowLink>
            <ArrowLink href="/audit" className="home-link--blue">Free Audit</ArrowLink>
          </div>
          <div className="service-stack">
            {services.map((service, index) => (
              <article
                className="service-stack__step"
                key={service.href}
                style={{ "--service-index": index }}
              >
                <a
                  className={`service-stack__card service-stack__card--${service.tone}${service.image ? " service-stack__card--image" : ""}`}
                  href={service.href}
                  style={service.image ? { "--service-image": `url("${service.image}")` } : undefined}
                >
                  <div className="service-stack__copy">
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <p>{service.copy}</p>
                  </div>
                </a>
                <span className="service-stack__corner" aria-hidden="true">
                  <span className="cta-arrow" />
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="problem-audience-bridge">
        <section className="home-section problem-section">
          <StaggerText lineReveal>Businesses get overlooked when their digital marketing falls flat</StaggerText>
          <div className="problem-section__copy">
            <p>If your growth has stagnated, your pipeline is unpredictable, and your acquisition costs keep climbing, it is usually a positioning problem. Too often, companies switch on paid ads and organic content before nailing their strategy and messaging. Spend goes up, but the revenue does not follow. We fix your foundation first, then run the marketing that turns the pipeline into predictable revenue.</p>
            <ArrowLink href="/audit" className="home-link--sand">Free Audit</ArrowLink>
          </div>
        </section>

        <WhoWeHelpTabs />
      </div>

      <MethodologySequence />

      <div className="home-gradient-sequence">
        <section className="home-section home-section--sand why-section">
          <div className="why-section__grid">
            <div className="why-section__content">
              <StaggerText lineReveal>Why Regen</StaggerText>
              <p className="why-section__statement">Trust and performance.</p>
              <p className="home-body-large">Every strategy we build stands on 2 things, trust and performance. We're not a legacy agency recycling tired digital marketing strategies and calling it innovation. We're an agile B2B marketing team built for SaaS, AI, tech, and professional services businesses that think forward, move fast, and expect more from their marketing. We challenge convention, reject cookie-cutter solutions, and build you a digital marketing strategy as specific to your business as the market you're competing in.</p>
              <ArrowLink href="/audit">Free Audit</ArrowLink>
            </div>
            <figure className="why-section__image">
              <img
                src="/pics/new-asset.png"
                alt="The Regen founders working together"
                width="948"
                height="790"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="home-section proof-section">
          <div className="home-section__intro">
            <p className="home-kicker">Proof</p>
            <StaggerText lineReveal>What our clients say</StaggerText>
          </div>
          <div className="testimonial-marquee" aria-label="Client testimonials">
            <div className="testimonial-marquee__track">
              {[0, 1].map((group) => (
                <div
                  className="testimonial-marquee__group"
                  aria-hidden={group === 1 ? "true" : undefined}
                  key={group}
                >
                  {testimonialCards.map((testimonial, index) => (
                    <article
                      className={`testimonial-card testimonial-card--${testimonial.tone}`}
                      key={`${group}-${testimonial.company}`}
                    >
                      <header className="testimonial-card__person">
                        <span className="testimonial-card__avatar">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt="" />
                          ) : (
                            testimonial.initials
                          )}
                        </span>
                        <span className="testimonial-card__identity">
                          <strong>{testimonial.name}</strong>
                          <span>
                            {testimonial.role
                              ? `${testimonial.company} — ${testimonial.role}`
                              : testimonial.company}
                          </span>
                        </span>
                        <span className="testimonial-card__stars" aria-label="5 out of 5 stars">
                          ★★★★★
                        </span>
                      </header>
                      <blockquote>{testimonial.quote}</blockquote>
                    </article>
                  ))}
                </div>
              ))}
            </div>
            <TestimonialDrag />
          </div>
          <ArrowLink href="/work" className="home-link--blue">See our work</ArrowLink>
        </section>

        <section className="home-section home-section--audit">
          <div className="home-section--audit__content">
            <p className="home-kicker">Free Audit</p>
            <StaggerText lineReveal>Get your free digital marketing audit</StaggerText>
            <p className="home-body-large">Get a free digital marketing audit of your positioning, channels, and content from real strategists. You'll see exactly where your pipeline is leaking, what's working, and the first things we'd fix.</p>
            <ArrowLink href="/audit">Free Audit</ArrowLink>
          </div>
        </section>
      </div>

      <HomeClosingSections />

      <HomeSectionMotion />
      <SiteFooter />
    </>
  );
}
