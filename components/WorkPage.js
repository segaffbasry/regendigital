import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import WorkHeroShowcase from "./WorkHeroShowcase";
import WorkMotion from "./WorkMotion";

const cases = [
  {
    number: "01",
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
    number: "02",
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
];

function Arrow() {
  return <span className="work-arrow" aria-hidden="true" />;
}

export default function WorkPage() {
  return (
    <main className="work-page">
      <WorkMotion />
      <SiteHeader />

      <WorkHeroShowcase cases={cases} />

      <section className="work-featured" aria-labelledby="featured-work-title">
        <div className="work-section-head">
          <p className="editorial-kicker" id="featured-work-title">Featured case studies</p>
          <p>Two partnerships. Two different markets. One standard: work that earns attention and creates momentum.</p>
        </div>

        {cases.map((item) => (
          <a className="work-case" href={item.href} key={item.name}>
            <div className="work-case__visual">
              <img src={item.image} alt={`${item.name} case study`} />
              <span className="work-case__proof">{item.proof}</span>
              <span className="work-case__open"><Arrow /></span>
            </div>
            <div className="work-case__caption">
              <span>{item.number}</span>
              <h2>{item.name}</h2>
              <p>{item.summary}</p>
              <div><span>{item.service}</span><span>{item.sector}</span></div>
            </div>
          </a>
        ))}
      </section>

      <section className="work-index" aria-labelledby="work-index-title">
        <div className="work-section-head work-section-head--index">
          <p className="editorial-kicker" id="work-index-title">Index</p>
          <h2>The work,<br /><em>at a glance.</em></h2>
        </div>
        <div className="work-index__table">
          <div className="work-index__labels" aria-hidden="true">
            <span>Project</span><span>Discipline</span><span>Market</span><span>Result</span>
          </div>
          {cases.map((item) => (
            <a className="work-index__row" href={item.href} key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.service}</span>
              <span>{item.sector}</span>
              <span>{item.proof}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="work-closing">
        <div>
          <p className="editorial-kicker">Your project next</p>
          <h2>Ready to make the work<br /><em>worth showing?</em></h2>
        </div>
        <a href="/contact"><span>Start a conversation</span><Arrow /></a>
      </section>

      <SiteFooter />
    </main>
  );
}
