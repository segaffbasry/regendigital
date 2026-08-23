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
    name: "Film Pudding",
    service: "Organic Growth Strategy",
    sector: "Film Industry",
    image: "/pics/Studio Meeting 2.jpeg",
    href: "/work/film-pudding",
    summary: "A creative-first organic system across Instagram and LinkedIn, built to sharpen positioning, deepen engagement, and make the studio more visible to the production industry.",
    proof: "Instagram + LinkedIn",
    heroResult: "Built a sharper organic presence that made the studio more visible to the production industry.",
    media: [
      "/pics/Studio Meeting 2.jpeg",
      "/pics/Bielke&Yang.jpeg",
      "/pics/_ (68).jpeg",
    ],
  },
  {
    number: "03",
    name: "Finden",
    service: "Social Media Organic Re-Launch",
    sector: "AI & Tech Industry",
    image: "/pics/ChatGPT Image Jul 31, 2026, 10_27_29 AM.png",
    href: "/work/finden",
    summary: "A more polished, professional market reintroduction, combining organic social with a Product Hunt launch that created immediate momentum.",
    proof: "3rd of 280+ launches",
    heroResult: "Reintroduced Finden with a polished social presence and a top-three Product Hunt launch.",
    media: [
      "/pics/ChatGPT Image Jul 31, 2026, 10_27_29 AM.png",
      "/pics/_ (1) 1.png",
      "/pics/_ (2) 1.png",
    ],
  },
  {
    number: "04",
    name: "IntusHQ",
    service: "Founder-Led ABM & Organic",
    sector: "Wealth Tech & Family Office",
    image: "/IntusHQ/image%205.png",
    href: "/work/intushq",
    summary: "A founder-led system across strategy, account-based marketing and organic social that put the platform in front of the families and offices it was built for.",
    proof: "5x audience reached",
  },
  {
    number: "05",
    name: "Only Child",
    service: "Organic Social",
    sector: "Production Industry",
    image: "/pics/Bielke&Yang.jpeg",
    href: "/contact",
    summary: "An embedded organic presence across Instagram and LinkedIn that gives the production agency consistent visibility.",
    proof: "Case study coming soon",
    placeholder: true,
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
        <span>{item.number}</span>
        <h2>{item.name}</h2>
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
          <p>Five partnerships across B2B, AI, wealth tech and production. Every case study leads with the outcome, then shows the work that made it happen.</p>
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
