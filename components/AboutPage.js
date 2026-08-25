"use client";

import Image from "next/image";
import {
  AboutDepthHero,
  AboutDepthPrinciples,
} from "./AboutDepthSections";
import AboutSectionMotion from "./AboutSectionMotion";
import HomeClosingSections from "./HomeClosingSections";
import HomeSectionMotion from "./HomeSectionMotion";
import MarketingEcosystemAnimation from "./MarketingEcosystemAnimation";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import StaggerText from "./StaggerText";

const founders = [
  {
    name: "Taylor",
    image: "/images/founders/taylor-portrait.webp",
    title: "Co-Founder",
    previousCompany: "Ex VistaJet + Pelorus",
    bio: "Leads strategy and client partnerships.",
  },
  {
    name: "Holly",
    image: "/images/founders/holly-updated.png",
    title: "Co-Founder",
    previousCompany: "Ex Estée Lauder + Klarna",
    bio: "Leads creative direction and campaign execution.",
  },
];

const teamMembers = [
  {
    name: "Max Modlin",
    image: "/pics/Max.png",
    title: "AI Partner",
    previousCompany: "Ex Barclays + Morgan Stanley",
    bio:
      "AI Partner who builds credible, effective AI systems across a range of businesses, bringing that expertise into Regen's strategy as we grow.",
  },
  {
    name: "Ben Sanford",
    image: "/pics/Ben.png",
    title: "Google Ads Partner",
    previousCompany: "Ex American Express",
    bio:
      "Google Ads partner working alongside Regen to extend paid search expertise across the team. Specialising in B2B Google Ads strategies built to drive measurable results.",
  },
  {
    name: "Cam Elson",
    image: "/pics/Cam.png",
    title: "Social Media Assistant",
    bio:
      "From daily scheduling to community management, keeping every client channel live, consistent, and on brand.",
  },
  {
    name: "Jordan Stimpson",
    image: "/pics/Jordan.png",
    title: "Web Design and Build",
    previousCompany: "Founder of Jords Co, a design studio for B2B brands",
    bio:
      "Jordan's our go-to for highly technical builds, sites with heavy animation and serious detail.",
  },
  {
    name: "Segaf Basry",
    image: "/pics/Segaf.png",
    title: "Design Lead",
    bio:
      "From web design concepts to finished campaign assets, leading the creative output behind every Regen campaign.",
  },
];

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutSectionMotion />
      <SiteHeader />

      <AboutDepthHero />

      <section className="about-team" aria-labelledby="about-team-title">
        <h2 className="about-team__title" id="about-team-title">
          Meet the team
        </h2>
        <div className="about-team__layout">
          <div className="about-team__founders">
            {founders.map((founder) => (
              <article
                className={`about-team__founder about-team__founder--${founder.name.toLowerCase()}`}
                key={founder.name}
              >
                <div className="about-team__founder-image">
                  <Image
                    alt={`${founder.name}, Regen co-founder`}
                    fill
                    sizes="(max-width: 700px) 44vw, (max-width: 1180px) 42vw, 46vw"
                    src={founder.image}
                  />
                </div>
                <h3>{founder.name}</h3>
                <p className="about-team__role">{founder.title}</p>
                <p className="about-team__experience">
                  {founder.previousCompany}
                </p>
                <p className="about-team__bio about-team__founder-focus">
                  {founder.bio}
                </p>
              </article>
            ))}
          </div>

          <div className="about-team__members">
            {teamMembers.map((member) => (
              <article className="about-team__member" key={member.name}>
                <div className="about-team__portrait">
                  <Image
                    alt={`${member.name}, Regen team member`}
                    fill
                    sizes="(max-width: 760px) 72px, (max-width: 1180px) 9vw, 7.2vw"
                    src={member.image}
                  />
                </div>
                <h3>{member.name}</h3>
                <p className="about-team__role">{member.title}</p>
                {member.previousCompany ? (
                  <p className="about-team__experience">
                    {member.previousCompany}
                  </p>
                ) : null}
                <p className="about-team__bio about-team__member-description">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="about-manifesto about-system-panel"
        aria-labelledby="about-system-panel-title"
      >
        <div className="about-system-panel__inner">
          <div className="about-system-panel__cards">
            <article
              className="about-system-card about-system-card--statement"
              data-about-reveal
            >
              <p className="about-eyebrow">What we believe</p>
              <StaggerText
                as="h2"
                id="about-system-panel-title"
                lineReveal
              >
                Marketing should feel like <em>one intelligent system,</em> not
                a collection of disconnected tactics.
              </StaggerText>
            </article>

            <article
              className="about-system-card about-system-card--support about-system-card--plan"
              data-about-delay="80"
              data-about-reveal
            >
              <span className="about-system-card__number">01</span>
              <p>
                Regen brings strategy, creative, media, and search into one
                commercial plan. That gives ambitious B2B teams a clearer
                route from attention to pipeline.
              </p>
            </article>

            <article
              className="about-system-card about-system-card--support about-system-card--market"
              data-about-delay="140"
              data-about-reveal
            >
              <span className="about-system-card__number">02</span>
              <p>
                We work closely with founders and commercial leaders, finding
                the message that matters and building the engine that carries
                it into market.
              </p>
            </article>
          </div>

          <figure className="about-system-panel__visual" data-about-reveal>
            <MarketingEcosystemAnimation title="An animated marketing system connecting Regen's channels" />
          </figure>
        </div>
      </section>

      <AboutDepthPrinciples />

      <HomeClosingSections showLeadForm />
      <HomeSectionMotion />
      <SiteFooter />
    </main>
  );
}
