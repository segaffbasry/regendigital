import SiteHeader from "../../components/SiteHeader";
import CanvasMotion from "../../components/canvas/CanvasMotion";
import CanvasUgcVideo from "../../components/CanvasUgcVideo";
import CanvasExamples from "../../components/canvas/CanvasExamples";
import CanvasInvestment from "../../components/canvas/CanvasInvestment";
import { siteUrl } from "../../lib/site-url";
import "./page.css";

const bookingUrl = "https://calendly.com/holly-regendigital/regen-canvas-ugc-introduction";
const title = "Canvas UGC — A creator network for your tech brand | Regen";
const description = "Ten dedicated creators. 300 original videos a month. A managed creator programme for tech brands, from the team behind Juno.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/canvas-ugc" },
  openGraph: { title, description, type: "website", url: `${siteUrl}/canvas-ugc`, images: [{ url: "/share-image?canvas=1", width: 1200, height: 630, alt: "Canvas UGC by Regen — Flood the algorithm. Find the winners." }] },
  twitter: { card: "summary_large_image", title, description, images: ["/share-image?canvas=1"] },
};

function ContactLink({ children = "Contact us", light = false }) {
  return (
    <a className={`home-link cta-button cta-motion ${light ? "home-link--sand" : "home-link--blue"}`} href={bookingUrl} target="_blank" rel="noopener noreferrer">
      <span className="cta-motion__fill" aria-hidden="true" />
      <span className="cta-motion__clip"><span className="cta-motion__roll"><span>{children}</span><span aria-hidden="true">{children}</span></span></span>
      <span className="cta-arrow" aria-hidden="true" />
    </a>
  );
}

export default function CanvasUgcPage() {
  return (
    <div className="canvas-page">
      <a className="canvas-skip" href="#canvas-main">Skip to content</a>
      <CanvasMotion />
      <SiteHeader animated />
      <main id="canvas-main">
        <section className="canvas-hero" aria-labelledby="canvas-title">
          <div className="canvas-hero__copy">
            <p className="canvas-eyebrow"><span className="canvas-dot" /> Canvas UGC by Regen</p>
            <h1 id="canvas-title">Flood the<br /> algorithm.<br /> <em>Find the winners.</em></h1>
            <p className="canvas-hero__lede">Your product. A whole network of voices.<br /> A managed creator programme that gets tech brands into the conversation—and keeps them there.</p>
            <div className="canvas-actions"><ContactLink light>Let’s talk Canvas</ContactLink><a className="canvas-text-link" href="#examples">See it in action <span className="canvas-icon canvas-icon--down" aria-hidden="true" /></a></div>
          </div>
          <div className="canvas-hero__visual" role="group" aria-label="Juno campaign videos">
            <span className="canvas-hero__orbit" aria-hidden="true" />
            {[1, 3, 4].map((number, index) => <span className={`canvas-phone canvas-phone--${index + 1}`} key={number}><CanvasUgcVideo src={`/videos/canvas/canvas-ugc-${number}.mp4`} poster={`/videos/canvas/canvas-ugc-${number}.jpg`} label={`Juno hero campaign video ${number}`} controls /><span className="canvas-phone__label">Juno / In the feed <span className="canvas-icon" aria-hidden="true" /></span></span>)}
            <span className="canvas-hero__note">Real creators.<br /> <em>Repeated discovery.</em></span>
          </div>
          <div className="canvas-hero__foot"><span>Built for tech. Made for the feed.</span><span>TikTok / Instagram / YouTube</span></div>
        </section>

        <section className="canvas-proof" aria-label="The Canvas programme">
          <div><strong>10</strong><span>Dedicated creators</span></div><div><strong>300</strong><span>Original videos / month</span></div><div><strong>3</strong><span>Social platforms</span></div><div><strong>4 months</strong><span>Minimum programme · month 1 is setup</span></div>
        </section>

        <section className="canvas-work canvas-section" id="examples" aria-labelledby="canvas-work-title">
          <div className="canvas-section__heading"><div><p className="canvas-eyebrow">01 / The work</p><h2 id="canvas-work-title">You’ve seen the format.<br /> <em>Now see the work.</em></h2></div><p>We’re the team behind Juno.<br /> Four real campaign examples, built to feel at home in the feed. Press play to take a look.</p></div>
          <CanvasExamples />
          <div className="canvas-work__foot"><p>Different creators. Different angles.<br /> <strong>One product people keep discovering.</strong></p><ContactLink /></div>
        </section>

        <section className="canvas-model canvas-section" id="model" aria-labelledby="canvas-model-title">
          <div className="canvas-section__heading"><div><p className="canvas-eyebrow">02 / The model</p><h2 id="canvas-model-title">A network built<br /> <em>around your brand.</em></h2></div><p>Dedicated creator accounts, a steady stream of original content, and a system for learning what earns attention.</p></div>
          <div className="canvas-steps">
            <article><span className="canvas-step-number">01</span><h3>Build the network.</h3><p>Ten creators, each with new accounts dedicated to your product. We handle sourcing, onboarding, positioning and content direction.</p><span className="canvas-step-tag">People + positioning</span></article>
            <article><span className="canvas-step-number">02</span><h3>Keep showing up.</h3><p>Thirty original videos per creator, per month. Native content across TikTok, Instagram and YouTube, supported by a private Discord and 100+ hooks.</p><span className="canvas-step-tag">300 originals / month</span></article>
            <article><span className="canvas-step-number">03</span><h3>Back what works.</h3><p>Hook reports show what travels. The network tests winning ideas, and paid usage rights let you take organic winners into ads.</p><span className="canvas-step-tag">Learn + repeat + amplify</span></article>
          </div>
          <aside className="canvas-founder">
            <img src="/images/founders/holly-updated.png" width="112" height="112" alt="Holly Brister, Regen co-founder" loading="lazy" />
            <div><blockquote>“In 2026 Canvas UGC has become incremental to a tech brand launch to infiltrate the algorithm with content about your business and about your brand to drive early signups and adoption.”</blockquote><p>Holly Brister <span> / Co-founder, Regen</span></p></div>
          </aside>
        </section>

        <section className="canvas-investment canvas-section" id="investment" aria-labelledby="canvas-investment-title">
          <div className="canvas-section__heading"><div><p className="canvas-eyebrow">03 / The investment</p><h2 id="canvas-investment-title">Clear costs.<br /> <em>Room to grow.</em></h2></div><p>A four-month minimum gives the programme time to develop. Month one is for setup, onboarding and getting the network ready.</p></div>
          <div className="canvas-pricing">
            <div className="canvas-pricing__fees"><article><p className="canvas-eyebrow">Paid to your creators</p><h3>$500 <span>/ creator / month</span></h3><p>Plus $1.30 per 1,000 views. Ten creators means $5,000 per month in base fees, before view-based payments.</p></article><article><p className="canvas-eyebrow">Regen management</p><h3>$2,500 <span>/ month</span></h3><p>Sourcing, onboarding, account setup, content direction, tracking, hook reports, community management and creator replacement.</p></article><div className="canvas-pricing__total"><span>Monthly base budget</span><strong>$7,500</strong><p>Creator base fees + management.<br /> View-based fees and paid media are additional.</p></div></div>
            <CanvasInvestment />
          </div>
        </section>

        <section className="canvas-closing canvas-section" aria-labelledby="canvas-closing-title"><p className="canvas-eyebrow">Let’s put your product in the conversation</p><h2 id="canvas-closing-title">Good products deserve<br /> <em>to get talked about.</em></h2><p>Tell Holly and Taylor what you’re launching.<br /> Let’s see what Canvas could do for your brand.</p><ContactLink light>Contact us</ContactLink><a className="canvas-closing__email" href="mailto:info@regendigital.co">Prefer email? info@regendigital.co</a></section>
      </main>
      <footer className="canvas-footer"><a className="canvas-footer__brand" href="/" aria-label="Explore Regen’s website" /><p>Canvas UGC is a Regen programme.<br /> <a href="/">Explore everything we do <span className="canvas-icon" aria-hidden="true" /></a></p><a href="/privacy-policy">Privacy policy</a></footer>
    </div>
  );
}
