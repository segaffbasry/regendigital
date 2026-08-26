import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import WorkMotion from "./WorkMotion";

const cases = [
  {
    number: "01",
    name: "Agency AI",
    service: "Outbound Growth Engine",
    sector: "AI & Automation",
    image: "/pics/Max.png",
    href: "/work/agency-ai",
    summary: "A connected organic, search and outbound system that grew qualified traffic and started more of the right sales conversations.",
    proof: "+15% referral traffic",
  },
  {
    number: "02",
    name: "Finden",
    service: "Go-to-Market Relaunch",
    sector: "AI & Tech Industry",
    image: "/pics/ChatGPT Image Jul 31, 2026, 10_27_29 AM.png",
    href: "/work/finden",
    summary: "A connected relaunch across organic, Product Hunt, creator content, and paid social that multiplied landing page views on flat spend.",
    proof: "+511% landing page views",
    heroResult: "Grew landing page views by 511% and placed 3rd out of 280+ companies on launch day.",
    media: [
      "/pics/ChatGPT Image Jul 31, 2026, 10_27_29 AM.png",
      "/pics/_ (1) 1.png",
      "/pics/_ (2) 1.png",
    ],
  },
  {
    number: "03",
    name: "IntusHQ",
    service: "Founder-Led ABM & Organic",
    sector: "SaaS & Wealth Tech",
    image: "/IntusHQ/intushq-cover.jpg",
    href: "/work/intushq",
    marks: [
      { src: "/IntusHQ/intushq-mark.png", alt: "IntusHQ" },
      { src: "/IntusHQ/katy-jeffcoate.png", alt: "Katy Jeffcoate, founder of IntusHQ" },
    ],
    summary: "A founder-led system across strategy, account-based marketing and organic social that put the platform in front of the families and offices it was built for.",
    proof: "5x audience reached",
  },
];

function Arrow() {
  return <span className="work-arrow" aria-hidden="true" />;
}

function WorkCase({ item }) {
  const content = (
    <>
      <div className="work-case__visual">
        <img src={item.image} alt={`${item.name} case study`} />
        <span className="work-case__proof">{item.proof}</span>
        {!item.placeholder ? <span className="work-case__open"><Arrow /></span> : null}
      </div>
      <div className="work-case__caption">
        {item.marks?.length ? null : <span>{item.number}</span>}
        {item.marks?.length ? (
          <div className="work-case__identity">
            <span className="work-case__marks" aria-hidden="true">
              {item.marks.map((mark) => (
                <span className="work-case__mark" key={mark.src}>
                  <img alt="" loading="lazy" src={mark.src} />
                </span>
              ))}
            </span>
            <h2>{item.name}</h2>
          </div>
        ) : (
          <h2>{item.name}</h2>
        )}
        <p>{item.summary}</p>
        <div><span>{item.service}</span><span>{item.sector}</span></div>
      </div>
    </>
  );

  if (item.placeholder) {
    return <article aria-disabled="true" className="work-case work-case--placeholder">{content}</article>;
  }

  return <a className="work-case" href={item.href}>{content}</a>;
}

export default function WorkPage() {
  return (
    <main className="work-page">
      <WorkMotion />
      <SiteHeader />

      <section className="work-featured" aria-labelledby="featured-work-title">
        <div className="work-results-hero">
          <p className="editorial-kicker">Our work</p>
          <h1 id="featured-work-title">Tangible results.<br /><em>Proven in the work.</em></h1>
          <p>Three partnerships across B2B, AI and wealth tech. Every case study leads with the outcome, then shows the work that made it happen.</p>
        </div>
        <div className="work-case-grid">
          {cases.map((item) => <WorkCase item={item} key={item.name} />)}
        </div>
      </section>

      <section className="work-closing">
        <div>
          <p className="editorial-kicker">Your project next</p>
          <h2>Ready to make the work<br /><em>worth showing?</em></h2>
        </div>
        <a className="cta-button" href="/contact"><span>Start a conversation</span><Arrow /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
