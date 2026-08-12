import FaqItem from "./FaqItem";
import IndustrySystemGraphic, { IndustryCardGraphic } from "./IndustrySystemGraphic";
import InteriorMotion from "./InteriorMotion";
import MethodologySystemGraphic from "./MethodologySystemGraphic";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import { contentForPath } from "../lib/page-content";

const protectedTitleWords = new Set(["AI", "B2B", "GEO", "Google", "Regen", "SaaS", "SEO"]);

const industryHeroMedia = {
  saas: [
    { after: 1, src: "/images/founders/holly-taylor.webp", position: "50% 50%" },
    { after: 4, src: "/pics/Studio Meeting 2.jpeg", position: "50% 43%" },
  ],
  ai: [
    { after: 1, src: "/Scene.webp", position: "27% 50%" },
    { after: 4, src: "/pics/service-launch.webp", position: "50% 30%" },
  ],
  tech: [
    { after: 1, src: "/pics/service-seo.webp", position: "50% 0%" },
    { after: 4, src: "/pics/service-paid-social.webp", position: "51% 53%", scale: 1.12 },
  ],
  "professional-services": [
    { after: 1, src: "/pics/Bielke&Yang.jpeg", position: "50% 45%" },
    { after: 5, src: "/pics/service-partnerships.webp", position: "50% 45%" },
  ],
  investors: [
    { after: 1, src: "/pics/_ (68).jpeg", position: "50% 48%" },
    { after: 5, src: "/images/founders/holly-taylor.webp", position: "50% 50%" },
  ],
};

function sentenceCaseTitle(title) {
  let wordIndex = 0;
  return title.replace(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g, (word) => {
    const isFirst = wordIndex++ === 0;
    if (isFirst || protectedTitleWords.has(word) || /^[A-Z0-9]{2,}$/.test(word)) return word;
    return word.toLocaleLowerCase();
  });
}

function ArrowLink({ href = "/contact", children }) {
  return <a className="editorial-link" href={href}><span>{children}</span><span className="cta-arrow" aria-hidden="true" /></a>;
}

function HeroTitle({ children, accentWord, accentColor }) {
  if (!accentWord) return children;

  const start = children.toLocaleLowerCase().indexOf(accentWord.toLocaleLowerCase());
  if (start === -1) return children;
  const end = start + accentWord.length;

  return (
    <>
      {children.slice(0, start)}
      <span
        className="editorial-hero__marked-word"
        style={{ "--industry-mark": accentColor }}
      >
        {children.slice(start, end)}
      </span>
      {children.slice(end)}
    </>
  );
}

function IndustryHeroTitle({ page, title }) {
  const media = industryHeroMedia[page.industryKey];
  if (!media?.length) {
    return <HeroTitle accentWord={page.accentWord} accentColor={page.accentColor}>{title}</HeroTitle>;
  }

  const accentStart = page.accentWord
    ? title.toLocaleLowerCase().indexOf(page.accentWord.toLocaleLowerCase())
    : -1;
  const accentEnd = accentStart === -1 ? -1 : accentStart + page.accentWord.length;
  const words = title.split(" ");
  let cursor = 0;

  return words.map((word, index) => {
    const start = cursor;
    const end = start + word.length;
    const isMarked = accentStart !== -1 && start < accentEnd && end > accentStart;
    const titleMedia = media.find((item) => item.after === index);
    cursor = end + 1;

    return (
      <span className="editorial-hero__title-part" key={`${word}-${index}`}>
        {index > 0 ? " " : null}
        {isMarked ? (
          <span className="editorial-hero__marked-word" style={{ "--industry-mark": page.accentColor }}>{word}</span>
        ) : word}
        {titleMedia ? (
          <span className="editorial-hero__media" aria-hidden="true">
            <img
              src={titleMedia.src}
              alt=""
              style={{ objectPosition: titleMedia.position, transform: `scale(${titleMedia.scale || 1})` }}
            />
          </span>
        ) : null}
      </span>
    );
  });
}

function CardGrid({ paths }) {
  if (!paths?.length) return null;
  return (
    <section className="editorial-grid-wrap">
      <p className="editorial-kicker">Explore</p>
      <div className="editorial-card-grid">
        {paths.map((path, index) => {
          const item = contentForPath(path);
          if (!item) return null;
          const industryType = item.industryKey;
          return (
            <a className={`editorial-card${industryType ? ` editorial-card--industry editorial-card--${industryType}` : ""}`} href={path} key={path}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {industryType ? <IndustryCardGraphic type={industryType} /> : null}
              <h2>{item.h1}</h2>
              <p>{item.entity || item.body}</p>
              <span className="editorial-card__pill">
                Explore <i className="cta-arrow" aria-hidden="true" />
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

const motionImages = [
  "/pics/ChatGPT Image Jul 31, 2026, 10_26_27 AM.png",
  "/pics/ChatGPT Image Jul 31, 2026, 10_26_34 AM.png",
  "/pics/ChatGPT Image Jul 31, 2026, 10_27_29 AM.png",
  "/pics/ChatGPT Image Jul 31, 2026, 10_29_03 AM.png",
];

const peopleImages = [
  "/pics/Studio Meeting 2.jpeg",
  "/pics/Bielke&Yang.jpeg",
  "/pics/_ (68).jpeg",
];

function imageSetFor(page) {
  const seed = Array.from(page.h1 || page.hero || "Regen").reduce((total, character) => total + character.charCodeAt(0), 0);
  return {
    primary: motionImages[seed % motionImages.length],
    portrait: peopleImages[seed % peopleImages.length],
    supporting: peopleImages[(seed + 1) % peopleImages.length],
  };
}

function MediaPlaceholder({ format = "landscape", label = "Regen at work", note = "", src }) {
  return (
    <div className={`editorial-media editorial-media--${format}`} data-media-reveal>
      <div className={`editorial-media__frame${src ? " editorial-media__frame--image" : ""}`}>
        {src ? (
          <div className="editorial-media__field editorial-media__field--image">
            <img className="editorial-media__image" src={src} alt={label} />
          </div>
        ) : (
          <>
            <div className="editorial-media__field" aria-hidden="true">
              <span className="editorial-media__cross editorial-media__cross--one" />
              <span className="editorial-media__cross editorial-media__cross--two" />
              <span className="editorial-media__scan" />
            </div>
            <span className="editorial-media__label">{label}</span>
            <span className="editorial-media__note">{note}</span>
          </>
        )}
      </div>
    </div>
  );
}

export default function InteriorPage({ content, title, section }) {
  const page = content || { hero: title, h1: title, section };
  const heroTitle = sentenceCaseTitle(page.hero);
  const tone = page.tone || (page.section === "Services" ? "blue" : "bone");
  const media = imageSetFor(page);
  const isMethodology = page.variant === "methodology";
  const isIndustryDetail = Boolean(page.industryKey);

  return (
    <main
      className={`editorial-page editorial-page--${tone}${page.variant ? ` editorial-page--${page.variant}` : ""}${isIndustryDetail ? " editorial-page--industry-detail" : ""}`}
      data-industry={isIndustryDetail ? page.industryKey : undefined}
    >
      <InteriorMotion />
      <SiteHeader />
      <section className="editorial-hero">
        <p className="editorial-kicker">{page.section}</p>
        <h1 aria-label={heroTitle}>
          {isIndustryDetail ? (
            <IndustryHeroTitle page={page} title={heroTitle} />
          ) : (
            <HeroTitle accentWord={page.accentWord} accentColor={page.accentColor}>{heroTitle}</HeroTitle>
          )}
        </h1>
        <div className="editorial-hero__foot">
          <p>{page.entity || page.h1}</p>
          <ArrowLink href={page.ctaHref}>{page.cta || "Book a Strategy Call"}</ArrowLink>
        </div>
      </section>

      {!isIndustryDetail ? (
        <section className="editorial-intro">
          <p className="editorial-kicker">{page.h1}</p>
          <p className="editorial-intro__body">{page.body}</p>
        </section>
      ) : null}

      {isMethodology ? <MethodologySystemGraphic /> : null}
      {isIndustryDetail ? <IndustrySystemGraphic body={page.body} type={page.industryKey} /> : null}

      {!page.emptyWork && !isMethodology && !isIndustryDetail ? (
        <section className="editorial-media-stage">
          <MediaPlaceholder label={`${page.h1} in motion`} src={media.primary} />
        </section>
      ) : null}

      {page.included?.length ? (
        <section className="editorial-included">
          <div><p className="editorial-kicker">{page.listTitle || "What's included"}</p><h2>Everything connected.<br /><em>Nothing wasted.</em></h2></div>
          <ol>{page.included.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
        </section>
      ) : null}

      {page.steps?.length ? (
        <section className="editorial-steps">
          {page.steps.map(([number, name, copy]) => <article key={number}><span>{number}</span><h2>{name}</h2><p>{copy}</p></article>)}
        </section>
      ) : null}

      {page.insight && !isIndustryDetail ? (
        <section className="editorial-insight">
          <p className="editorial-kicker">Good to know</p>
          <div><h2>{page.insight[0]}</h2><p>{page.insight[1]}</p></div>
        </section>
      ) : null}

      <CardGrid paths={page.cards} />

      {!page.emptyWork && !isMethodology && !isIndustryDetail ? (
        <section className="editorial-media-pair" aria-label="Regen team imagery">
          <MediaPlaceholder format="portrait" label="Regen team collaborating" src={media.portrait} />
          <MediaPlaceholder format="square" label="A collaborative studio session" src={media.supporting} />
        </section>
      ) : null}

      {page.emptyWork ? (
        <section className="editorial-work-note">
          <div>
            <p className="editorial-kicker">Selected work</p>
            <span>Case studies are being prepared.</span>
          </div>
          <div className="editorial-work-note__aside">
            <p>In the meantime, tell us what you are solving and we&apos;ll share the work most relevant to your market, growth stage, and commercial goal.</p>
            <ArrowLink href="/contact">Ask for relevant work</ArrowLink>
          </div>
        </section>
      ) : null}

      {page.faqs?.length ? (
        <section className="editorial-faq">
          <div><p className="editorial-kicker">FAQs</p><h2>Questions,<br /><em>answered.</em></h2></div>
          <div className="editorial-faq__items">{page.faqs.map(([question, answer]) => <FaqItem question={question} answer={answer} key={question} />)}</div>
        </section>
      ) : null}

      <section className="founder-cta">
        <div className="founder-cta__copy">
          <p className="editorial-kicker">Ready when you are</p>
          <h2>Ready to move the business forward?</h2>
          <p>An open conversation about your current marketing and where the business is heading, to see whether there is genuine potential for a collaboration.</p>
        </div>
        <div className="founder-cta__card">
          <div className="founder-cta__faces" aria-label="Holly and Taylor, Regen co-founders">
            <img src="/images/founders/holly-updated.png" alt="Holly, Regen co-founder" />
            <img src="/images/founders/taylor-portrait.webp" alt="Taylor, Regen co-founder" />
          </div>
          <p className="editorial-kicker">Get started here</p>
          <h3>{page.cta || "Book a Strategy Call"}</h3>
          <p className="founder-cta__meta"><span aria-hidden="true">◷</span> 30 minute conversation</p>
          <ul>
            <li>Helpful advice and guidance</li>
            <li>No obligation</li>
          </ul>
          <ArrowLink href={page.ctaHref}>{page.cta || "Book a Strategy Call"}</ArrowLink>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
