"use client";

import { useId, useLayoutEffect, useRef } from "react";

const trendPath = "M0,166 C24,143 40,169 64,147 C88,125 104,153 128,137 C152,119 176,143 200,126 C224,110 248,129 272,120 C296,109 320,125 344,112 C368,98 392,114 416,91 C440,70 464,91 488,68 C512,42 536,67 560,38 C576,23 592,36 600,18";

const serviceVisuals = {
  seo: { scene: "seo", label: "Organic search performance growing across rankings, clicks, authority, and inbound leads" },
  geo: { scene: "geo", label: "A buyer question becoming a cited AI recommendation through trusted sources" },
  "google-ads": { scene: "google-ads", label: "High-intent searches moving through a focused paid search funnel into qualified enquiries" },
  "paid-social": { scene: "paid-social", label: "A fan of paid social creative variants connected to matched audiences and retargeting" },
  "marketing-strategy-consultancy": { scene: "strategy", label: "A connected strategy compass aligning audience, message, channels, and measurement" },
  "organic-social": { scene: "organic-social", label: "An editorial calendar ribbon connecting a consistent cadence of social content" },
  "account-based-marketing": { scene: "abm", label: "A priority account target expanding into a mapped B2B buying committee" },
  "go-to-market-and-launch": { scene: "launch", label: "An ascending go-to-market runway moving from positioning through launch into sustained momentum" },
  "founder-led-marketing": { scene: "founder-led", label: "A distinctive founder point of view broadcasting outward and generating inbound conversations" },
  "creator-partnerships": { scene: "creator-partnerships", label: "A brand and trusted industry creators joining in partnership to produce collaborative content" },
};

const seoMetrics = [
  { slot: "leads", kind: "major", count: 68, label: "organic inbound leads", sub: "in 6 months", dot: true },
  { slot: "clicks", kind: "major", count: 180, suffix: "%", label: "organic clicks", arrow: true },
  { slot: "rating", kind: "minor", label: "Domain Rating", count: 41, delta: "12" },
  { slot: "rankings", kind: "minor", label: "Top 3 Rankings", count: 54, delta: "31" },
];

function GrowthArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function metricData(metric) {
  return {
    "data-count": metric.count,
    "data-prefix": metric.prefix || "",
    "data-suffix": metric.suffix || "",
    "data-decimals": metric.decimals || 0,
  };
}

function staticValue(metric) {
  return `${metric.prefix || ""}${Number(metric.count).toLocaleString("en-GB", {
    minimumFractionDigits: metric.decimals || 0,
    maximumFractionDigits: metric.decimals || 0,
  })}${metric.suffix || ""}`;
}

function MetricCard({ metric }) {
  const classes = `seo-result-graphic__metric seo-result-graphic__metric--${metric.slot}`;

  if (metric.kind === "major") {
    return (
      <div className={classes}>
        <span className="seo-result-graphic__metric-inner">
          <span className="seo-result-graphic__big">
            <span {...metricData(metric)}>{staticValue(metric)}</span>
            {metric.arrow ? <GrowthArrow /> : null}
          </span>
          <span className="seo-result-graphic__label">{metric.dot ? <span className="seo-result-graphic__dot" /> : null}{metric.label}</span>
          {metric.sub ? <span className="seo-result-graphic__sub">{metric.sub}</span> : null}
        </span>
      </div>
    );
  }

  return (
    <div className={classes}>
      <span className="seo-result-graphic__metric-inner">
        <span className="seo-result-graphic__small-label">{metric.label}</span>
        <span className="seo-result-graphic__small-row">
          <span className="seo-result-graphic__figure" {...metricData(metric)}>{staticValue(metric)}</span>
          <span className="seo-result-graphic__delta"><GrowthArrow />{metric.delta}</span>
        </span>
      </span>
    </div>
  );
}

function SeoComposition({ gradientId }) {
  return (
    <div className="seo-result-graphic__stack" aria-hidden="true">
      <div className="seo-result-graphic__chart-card">
        <div className="seo-result-graphic__chart">
          <svg viewBox="0 0 600 190" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#062efa" stopOpacity=".14" />
                <stop offset="100%" stopColor="#062efa" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="seo-result-graphic__grid">
              {[30, 70, 110, 150, 189].map((y) => <line x1="0" y1={y} x2="600" y2={y} key={y} />)}
            </g>
            <path className="seo-result-graphic__area" fill={`url(#${gradientId})`} d={`${trendPath} L600,190 L0,190 Z`} />
            <path className="seo-result-graphic__line" pathLength="1" d={trendPath} />
          </svg>
        </div>
      </div>
      <span className="service-visual__disclaimer">Illustrative programme metrics</span>
      <div className="seo-result-graphic__metrics">
        {seoMetrics.map((metric) => <MetricCard metric={metric} key={metric.slot} />)}
      </div>
    </div>
  );
}

function GeoComposition() {
  return (
    <div className="service-art service-art--geo" aria-hidden="true">
      <svg className="service-art__wires service-art__piece" viewBox="0 0 522 320">
        <path d="M94 67C145 71 159 95 199 121M323 147C385 132 405 93 466 93M205 178C161 199 144 234 94 247" />
        <path className="geo-wire--optional" d="M323 161C377 169 391 215 443 231" />
        <circle cx="94" cy="67" r="5" /><circle className="geo-wire--optional" cx="443" cy="231" r="5" /><circle cx="466" cy="93" r="5" /><circle cx="94" cy="247" r="5" />
      </svg>
      <div className="service-art__chip service-art__piece geo-question"><span>Buyer question</span><strong>Who should we trust?</strong></div>
      <div className="service-art__surface service-art__piece geo-answer">
        <span className="service-art__eyebrow">AI answer result</span>
        <strong>Your brand is surfaced</strong>
        <i /><i /><i />
        <em>Backed by relevant evidence</em>
      </div>
      <div className="service-art__surface service-art__piece geo-source geo-source--one"><b>01</b><span>Expert proof</span></div>
      <div className="service-art__surface service-art__piece geo-source geo-source--two"><b>02</b><span>Industry report</span></div>
      <div className="service-art__surface service-art__piece geo-source geo-source--three"><b>03</b><span>Product evidence</span></div>
    </div>
  );
}

function GoogleAdsComposition() {
  return (
    <div className="service-art service-art--google-ads" aria-hidden="true">
      <div className="service-art__surface service-art__piece ads-search"><span className="ads-search__icon" /><strong>best B2B growth partner</strong><em>High intent</em></div>
      <div className="service-art__surface service-art__piece ads-auction">
        <span className="service-art__eyebrow">Campaign focus</span>
        <div><b>Commercial terms</b><i><em /></i></div>
        <div><b>Brand demand</b><i><em /></i></div>
        <div><b>Retargeting</b><i><em /></i></div>
      </div>
      <svg className="ads-funnel service-art__piece" viewBox="0 0 522 320">
        <path d="M82 77H440L377 151H145Z" /><path d="M145 151H377L329 215H193Z" /><path d="M193 215H329L287 267H235Z" />
      </svg>
      <div className="service-art__surface service-art__piece ads-enquiry"><span>Qualified enquiry</span><strong>Ready to talk</strong></div>
      <span className="service-art__chip service-art__piece ads-term ads-term--one">Problem aware</span>
      <span className="service-art__chip service-art__piece ads-term ads-term--two">Solution searching</span>
    </div>
  );
}

function PaidSocialComposition() {
  return (
    <div className="service-art service-art--paid-social" aria-hidden="true">
      <svg className="paid-orbits service-art__piece" viewBox="0 0 522 320">
        <ellipse cx="272" cy="162" rx="219" ry="104" /><ellipse cx="272" cy="162" rx="172" ry="76" /><path d="M61 200C95 285 364 302 459 211" />
      </svg>
      <div className="service-art__surface service-art__piece paid-card paid-card--one"><span>PROOF</span><i /><i /><b>See the outcome.</b></div>
      <div className="service-art__surface service-art__piece paid-card paid-card--two"><span>POINT OF VIEW</span><i /><i /><b>Lead the category.</b></div>
      <div className="service-art__surface service-art__piece paid-card paid-card--three"><span>DEMO</span><i /><i /><b>Make it tangible.</b></div>
      <span className="service-art__chip service-art__piece paid-audience">Matched audience</span>
      <span className="service-art__chip service-art__piece paid-loop">Retargeting loop ↗</span>
      <span className="service-art__badge service-art__piece paid-winner">Selected creative</span>
    </div>
  );
}

function StrategyComposition() {
  return (
    <div className="service-art service-art--strategy" aria-hidden="true">
      <svg className="strategy-compass service-art__piece" viewBox="0 0 522 320">
        <circle cx="261" cy="160" r="116" /><circle cx="261" cy="160" r="77" /><path d="M261 22V298M123 160H399" /><path className="strategy-route" d="M177 87C225 35 338 60 369 127C400 193 331 270 251 251C172 232 137 144 177 87Z" />
        <path className="strategy-needle" d="M261 160L306 91L280 174Z" />
      </svg>
      <div className="service-art__surface service-art__piece strategy-core"><span>North star</span><strong>Positioning</strong></div>
      <span className="service-art__chip service-art__piece strategy-node strategy-node--audience">Audience</span>
      <span className="service-art__chip service-art__piece strategy-node strategy-node--message">Message</span>
      <span className="service-art__chip service-art__piece strategy-node strategy-node--channels">Channels</span>
      <span className="service-art__chip service-art__piece strategy-node strategy-node--measure">Measurement</span>
      <span className="strategy-caption service-art__piece">One connected system</span>
    </div>
  );
}

function OrganicSocialComposition() {
  return (
    <div className="service-art service-art--organic" aria-hidden="true">
      <div className="service-art__surface service-art__piece organic-ribbon">
        {['MON', 'TUE', 'WED', 'THU', 'FRI'].map((day, index) => <span className={index === 1 || index === 3 ? 'is-live' : ''} key={day}><b>{day}</b><i /></span>)}
      </div>
      <svg className="organic-flow service-art__piece" viewBox="0 0 522 320"><path d="M31 181C105 181 88 82 172 82C256 82 240 234 331 234C422 234 416 133 492 133" /></svg>
      <div className="service-art__surface service-art__piece organic-post organic-post--one"><span>POINT OF VIEW</span><strong>An idea worth saving.</strong><i /><i /></div>
      <div className="service-art__surface service-art__piece organic-post organic-post--two"><span>CUSTOMER PROOF</span><strong>Show the work.</strong><i /><i /></div>
      <div className="service-art__surface service-art__piece organic-post organic-post--three"><span>CONVERSATION</span><strong>Invite a response.</strong><i /><i /></div>
      <span className="service-art__chip service-art__piece organic-reaction organic-reaction--two">Reply</span>
    </div>
  );
}

function AbmComposition() {
  return (
    <div className="service-art service-art--abm" aria-hidden="true">
      <svg className="abm-target service-art__piece" viewBox="0 0 522 320">
        <circle cx="180" cy="160" r="126" /><circle cx="180" cy="160" r="88" /><circle cx="180" cy="160" r="49" /><circle className="abm-hit" cx="180" cy="160" r="10" />
        <path d="M225 143C291 125 313 93 365 88M225 160C302 160 342 160 402 160M218 184C286 209 316 232 366 242" />
      </svg>
      <div className="service-art__surface service-art__piece abm-account"><span>Tier 1 account</span><strong>Priority buyer</strong><em>Selected</em></div>
      <div className="service-art__surface service-art__piece abm-persona abm-persona--one"><b>C</b><span>Champion</span></div>
      <div className="service-art__surface service-art__piece abm-persona abm-persona--two"><b>T</b><span>Technical</span></div>
      <div className="service-art__surface service-art__piece abm-persona abm-persona--three"><b>E</b><span>Economic buyer</span></div>
      <span className="abm-caption service-art__piece">Buying committee mapped</span>
    </div>
  );
}

function LaunchComposition() {
  return (
    <div className="service-art service-art--launch" aria-hidden="true">
      <svg className="launch-runway service-art__piece" viewBox="0 0 522 320">
        <path className="launch-base" d="M31 266L475 54" /><path className="launch-momentum" d="M31 258C103 249 130 238 182 211C235 184 260 179 301 143C343 107 386 102 475 55" />
        <path className="launch-pulse" d="M301 143L301 62L318 107L337 35" />
        {[{x:72,y:246},{x:180,y:212},{x:301,y:143},{x:438,y:72}].map((p) => <circle cx={p.x} cy={p.y} r="7" key={p.x} />)}
      </svg>
      <div className="service-art__surface service-art__piece launch-phase launch-phase--one"><span>01</span><strong>Position</strong></div>
      <div className="service-art__surface service-art__piece launch-phase launch-phase--two"><span>02</span><strong>Prime</strong></div>
      <div className="service-art__surface service-art__piece launch-phase launch-phase--three"><span>03</span><strong>Launch</strong></div>
      <div className="service-art__surface service-art__piece launch-phase launch-phase--four"><span>04</span><strong>Sustain</strong></div>
      <span className="service-art__badge service-art__piece launch-day">LAUNCH DAY</span>
      <span className="launch-caption service-art__piece">Momentum keeps climbing</span>
    </div>
  );
}

function FounderLedComposition() {
  return (
    <div className="service-art service-art--founder" aria-hidden="true">
      <div className="service-art__surface service-art__piece founder-document">
        <span className="service-art__eyebrow">Founder point of view</span>
        <strong>Say the thing<br />only you can say.</strong>
        <blockquote>“A clear perspective gives buyers something—and someone—to remember.”</blockquote>
        <i className="founder-signature">— Founder</i>
      </div>
      <svg className="founder-broadcast service-art__piece" viewBox="0 0 522 320"><path d="M274 154C330 127 379 135 418 172" /><path d="M287 115C368 78 447 103 487 174" /><path d="M274 194C341 226 397 218 444 179" /><circle cx="269" cy="154" r="6" /><circle cx="269" cy="194" r="6" /></svg>
      <div className="service-art__surface service-art__piece founder-response founder-response--one"><span>Inbound reply</span><strong>“This is exactly our problem.”</strong></div>
      <div className="service-art__surface service-art__piece founder-response founder-response--two"><span>Saved by</span><strong>Priority buyer</strong></div>
      <span className="service-art__chip service-art__piece founder-channel">Voice → trust → demand</span>
    </div>
  );
}

function CreatorPartnershipComposition() {
  return (
    <div className="service-art service-art--creator" aria-hidden="true">
      <svg className="creator-connections service-art__piece" viewBox="0 0 522 320"><path d="M120 82C165 92 179 112 207 136M403 79C362 91 346 111 317 136M262 193V242M262 242L153 277M262 242L262 282M262 242L371 277" /></svg>
      <div className="service-art__surface service-art__piece creator-party creator-party--brand"><span>BRAND</span><strong>Clear brief</strong><i /><i /></div>
      <div className="service-art__surface service-art__piece creator-party creator-party--voice"><span>TRUSTED VOICE</span><strong>Right audience</strong><i /><i /></div>
      <div className="service-art__surface service-art__piece creator-handshake">
        <svg viewBox="0 0 280 150">
          <path className="creator-sleeve creator-sleeve--left" d="M15 62L68 28L104 67L52 111Z" />
          <path className="creator-sleeve creator-sleeve--right" d="M265 62L212 28L176 67L228 111Z" />
          <path className="creator-hand creator-hand--left" d="M71 55L108 30C121 21 139 22 151 32L173 50L151 70L132 57L114 71C104 78 91 76 84 67Z" />
          <path className="creator-hand creator-hand--right" d="M209 55L172 30C159 21 143 22 132 30L106 51L126 70L146 57L190 94C198 101 211 99 218 90L230 74C235 67 230 60 209 55Z" />
          <path className="creator-fingers" d="M148 69L185 100M135 79L171 110M122 88L154 118" />
        </svg>
        <span>Co-created partnership</span>
      </div>
      <div className="service-art__surface service-art__piece creator-output creator-output--article"><b>A</b><span>Article</span></div>
      <div className="service-art__surface service-art__piece creator-output creator-output--event"><b>E</b><span>Event</span></div>
      <div className="service-art__surface service-art__piece creator-output creator-output--post"><b>P</b><span>Post</span></div>
      <span className="service-art__chip service-art__piece creator-match">Matched on audience + authority</span>
    </div>
  );
}

const compositions = {
  geo: GeoComposition,
  "google-ads": GoogleAdsComposition,
  "paid-social": PaidSocialComposition,
  strategy: StrategyComposition,
  "organic-social": OrganicSocialComposition,
  abm: AbmComposition,
  launch: LaunchComposition,
  "founder-led": FounderLedComposition,
  "creator-partnerships": CreatorPartnershipComposition,
};

export default function ServiceHeroGraphic({ serviceKey = "seo" }) {
  const root = useRef(null);
  const gradientId = `service-result-fill-${useId().replaceAll(":", "")}`;
  const visual = serviceVisuals[serviceKey] || serviceVisuals.seo;
  const Composition = compositions[visual.scene];

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const figures = Array.from(element.querySelectorAll("[data-count]"));
    const format = (figure, value) => {
      const decimals = Number(figure.dataset.decimals || 0);
      const number = Number(value).toLocaleString("en-GB", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
      return `${figure.dataset.prefix || ""}${number}${figure.dataset.suffix || ""}`;
    };
    let animationFrame;
    let observer;
    let done = false;

    element.classList.add("seo-result-graphic--armed");
    figures.forEach((figure) => { figure.textContent = format(figure, 0); });

    const run = () => {
      if (done) return;
      done = true;
      element.classList.add("is-in");
      if (!figures.length) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - ((1 - progress) ** 3);
        figures.forEach((figure) => {
          const target = Number(figure.dataset.count);
          const decimals = Number(figure.dataset.decimals || 0);
          const factor = 10 ** decimals;
          figure.textContent = format(figure, Math.round(target * eased * factor) / factor);
        });
        if (progress < 1) animationFrame = window.requestAnimationFrame(tick);
      };
      animationFrame = window.requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.2)) return;
        observer.disconnect();
        run();
      }, { threshold: 0.2 });
      observer.observe(element);
    } else {
      animationFrame = window.requestAnimationFrame(run);
    }

    return () => {
      observer?.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      figures.forEach((figure) => { figure.textContent = format(figure, Number(figure.dataset.count)); });
      element.classList.remove("seo-result-graphic--armed", "is-in");
    };
  }, [serviceKey]);

  return (
    <div
      className={`seo-result-graphic service-visual service-visual--${serviceKey}`}
      ref={root}
      role="img"
      aria-label={`Illustrative service graphic: ${visual.label}`}
    >
      {visual.scene === "seo" ? <SeoComposition gradientId={gradientId} /> : <Composition />}
    </div>
  );
}
