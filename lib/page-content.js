const service = (title, description, hero, h1, entity, body, included, insight, faqs, extra = {}) => ({
  title, description, hero, h1, entity, body, included, insight, faqs, section: "Services", tone: "blue", cta: "Book a Strategy Call", ...extra,
});

const industry = (title, description, hero, h1, entity, body, included, insight, faqs) => ({
  title, description, hero, h1, entity, body, included, insight, faqs, section: "Industries", tone: "bone", listTitle: "How we help", cta: "Book a Strategy Call",
});

export const pageContent = {
  "/services/seo": service(
    "B2B SEO Agency | Regen",
    "A B2B SEO agency for SaaS, AI, tech, and professional services. We earn lasting rankings for the terms your buyers search, built as a long-term growth channel.",
    "Be Found When Your Buyers Are Searching.", "B2B SEO Agency",
    "Regen is a B2B SEO agency for SaaS, AI, tech, and professional services companies. We earn you rankings for the terms your buyers actually search.",
    "B2B buyers complete 61% of their evaluation before they speak to a vendor. By the time an enquiry lands, the shortlist is written. That decision gets made through independent research from framing the problem, comparing options, working out who looks credible. Search is where most of it happens, and if you are not visible during that phase, you are not being rejected. You are simply never considered.",
    ["On-page, technical, and content SEO", "Keyword and competitor research", "Content strategy built around commercial search terms", "Landing page and conversion recommendations", "Authority building and digital PR signals", "Ongoing tracking, analysis, and reporting"],
    ["What is SEO?", "SEO (search engine optimisation) is the work of earning your business a place near the top of search engines like Google for the terms your buyers search. It combines technical foundations, useful content, and authority, so the right people find you at the exact moment they are looking for what you do."],
    [["How long does SEO take to work for a B2B business?", "Commercial rankings usually build over 3 to 6 months and compound from there. It is a long-term channel, but one that keeps paying back once it is established."], ["Do you guarantee first-page rankings?", "No honest agency can promise a specific position. We target winnable, high-intent terms, report transparently on movement, and tie the work back to pipeline."], ["How is SEO different from GEO?", "SEO earns you rankings in search engines like Google, while GEO earns you mentions in AI answers. They work together, and we offer both."], ["Is SEO still worth it now that people use AI?", "Yes, more than ever. The same clear, authoritative content that ranks in Google is also what AI assistants draw on when they recommend a business."], ["How do you measure SEO success?", "On rankings for the terms that matter, qualified traffic, and ultimately the enquiries and pipeline the channel generates."]],
    {
      layout: "seo",
      heroPill: "The B2B SEO agency",
      heroEmphasis: "buyers are searching",
      openingParagraphs: [
        "B2B buyers complete 61% of their evaluation before they speak to a vendor. By the time an enquiry lands, the shortlist is written. That decision gets made through independent research from framing the problem, comparing options, working out who looks credible. Search is where most of it happens, and if you are not visible during that phase, you are not being rejected. You are simply never considered.",
        "Organic search is the one channel where buyers arrive already looking to buy. We build a complete SEO programme that combines strong technical foundations, genuinely useful content, and the authority signals that move you up the rankings, all focused on the commercial terms your buyers actually use, rather than traffic that looks good in a report but never turns into enquiries.",
      ],
      includedDetails: [
        "We fix what stops search engines reading your site, then make every page earn the position it holds.",
        "Where the commercial demand actually sits, and which of those terms your competitors have already claimed.",
        "Content mapped to how buyers search when they are close to a decision, not when they are idly reading.",
        "A ranking only counts if the page converts. We tell you what to change and why it matters.",
        "The external signals that tell Google you are credible, earned through genuine coverage rather than bought links.",
        "Monthly reporting on rankings, traffic and enquiries, plus what we are changing next and the reasoning behind it.",
      ],
      worthIt: "The real value of SEO is that it compounds over time. Paid channels stop the moment you stop spending, but a page that ranks keeps bringing in high-intent buyers month after month, with no extra cost per visit. For a considered, high-value B2B sale, being the business a buyer finds and trusts during their research is often what wins the deal before a conversation has even started.",
      hideClosingPrompts: true,
    }
  ),
  "/services/geo": service(
    "GEO Agency | Regen", "A GEO agency that gets your business recommended when buyers ask ChatGPT, Claude, Gemini, and Perplexity. Get cited by AI, not just ranked in search.",
    "Be Recommended When Your Buyers Ask AI.", "GEO Agency",
    "Regen is a GEO agency for SaaS, AI, tech, and professional services companies. We get your business cited when buyers ask AI assistants for recommendations.",
    "A fast-growing number of buyers no longer start with a search engine, they ask ChatGPT, Claude, Gemini, and Perplexity to tell them who they should work with. GEO is how you make sure your business is the one those tools name and recommend. We build the clear, consistent information, question-led content, and quotable answers that AI assistants draw on, so when a buyer asks for a shortlist in your category, you are on it. This is still new ground for most of your competitors, which makes it a rare chance to build an advantage while the space is wide open.",
    ["Entity and brand information optimisation", "Question-led content built to be quoted by AI assistants", "Structured data and technical GEO foundations", "Presence on the third-party sources AI tools trust", "Monitoring how your brand appears in AI answers", "Ongoing testing, refinement, and reporting"],
    ["What is GEO?", "Generative engine optimisation is the practice of getting your business named and recommended when buyers ask AI assistants. It rewards clear, consistent information, question-led content, and concise answers an AI can quote directly."],
    [["What is the difference between GEO and SEO?", "SEO earns rankings in search engines, while GEO earns mentions and recommendations inside AI answers. We offer both, and they work best together."], ["How do you get a business cited by AI tools?", "By publishing clear, consistent, question-led information and building presence on the third-party sources AI tools trust."], ["Is GEO worth investing in this early?", "Yes. Buyer behaviour is already shifting to AI, and getting referenced now builds an advantage while most competitors are not looking at it."], ["Can you measure GEO?", "Yes. We monitor how and where your brand appears in AI answers for the questions your buyers ask."], ["How long does GEO take to work?", "It can move faster than traditional SEO, then compounds as your authority grows."]]
  ),
  "/services/google-ads": service(
    "B2B Google Ads Agency | Regen", "A Google Ads agency for B2B that puts you in front of buyers the moment they search, and turns that spend into qualified pipeline and booked calls.",
    "Capture Demand at the Exact Moment Someone Needs You.", "B2B Google Ads Agency",
    "Regen is a Google Ads agency for B2B companies in SaaS, AI, tech, and professional services. We turn paid search into qualified pipeline.",
    "When someone searches for what you offer, they are telling you they are ready to act, and Google Ads puts you in front of them at that exact moment. We build and manage campaigns that turn your paid Google Ads spend into qualified pipeline and booked calls, reaching the right buyers and keeping your cost per enquiry down, so your sales team is talking to people who are already looking.",
    ["Google Search and Display campaign setup and management", "Keyword and competitor research", "Conversion-focused ad creative and copy", "Landing page and conversion recommendations", "Bid, budget, and audience management", "Conversion tracking and reporting"],
    ["Will Google Ads work for a considered, high-value sale?", "Yes. Even when your sale is long and involves several decision-makers, the moment a buyer searches is when they are most open to hearing from you. We focus budget on those high-intent searches."],
    [["How much should we budget for Google Ads?", "We usually recommend around £2,000 to £3,000 a month in ad spend, though the right figure depends on how competitive your industry is."], ["How quickly will we see results?", "Campaigns can generate qualified enquiries within the first few weeks, and we optimise from real data as it comes in."], ["Do you manage everything?", "Yes, from strategy and campaign build to creative, bidding, and reporting."], ["How do you keep costs under control?", "By focusing on the highest-intent searches, cutting what does not convert, and continually testing."], ["How do you measure success?", "On qualified enquiries, calls booked, cost per acquisition, and the pipeline and revenue generated."]]
  ),
  "/services/paid-social": service(
    "B2B Paid Social Media Agency | Regen", "A paid social media agency for B2B running LinkedIn, Meta, and X campaigns, from building brand awareness to generating booked calls.",
    "Paid Social Advertising That Reaches the Right Buyers.", "B2B Paid Social Media Agency",
    "Regen is a paid social media agency for B2B companies in SaaS, AI, tech, and professional services. We build paid campaigns across every feed that reach the right buyers and drive real outcomes.",
    "We bring creative precision and performance data together to build paid social campaigns that reach the right buyers, build demand, and drive conversions across LinkedIn, Meta, X, and beyond. Each platform earns its place based on where your audience is and what you are trying to achieve, from building brand awareness to generating booked calls, and we hold every campaign to the outcomes that matter to your business.",
    ["Paid strategy and media planning", "Campaign structure and audience targeting", "Ad creative briefing and optimisation", "Retargeting and funnel development", "A/B testing and conversion tracking", "Detailed reporting and performance insights"],
    null,
    [["Which platforms should we run paid social on?", "Whichever ones your buyers actually use. We build the mix around your audience and goals."], ["How is paid social different from Google Ads?", "Google captures people already searching, while paid social builds awareness and demand before they start looking."], ["How much should we budget?", "We prove the plan on a sensible test budget before scaling."], ["How do you make the budget work harder?", "By targeting tightly, testing creative continuously, and shifting spend to what performs."], ["How do you measure success?", "Against the campaign goal, always connected back to pipeline and revenue."]]
  ),
  "/services/marketing-strategy-consultancy": service(
    "B2B Marketing Strategy Agency & Fractional CMO | Regen", "A B2B marketing strategy agency and fractional CMO that sets your positioning and plan first, then builds the system that delivers pipeline and revenue.",
    "Marketing Built on Strategy, Not Guesswork.", "B2B Marketing Strategy Agency and Fractional CMO",
    "Regen is a B2B marketing strategy agency and fractional CMO for SaaS, AI, tech, and professional services companies.",
    "Most B2B brands do not have a marketing problem, they have a positioning problem, and we fix that before anything else. We research your market, sharpen your positioning and message, and build the plan that aligns your audience, your channels, and your goals into a clear direction that actually moves the business forward. Whether you need a full strategy or a fractional CMO to steer it, this is where every Regen engagement begins, and it is what makes everything that comes after it work.",
    ["Brand positioning and messaging frameworks", "Audience, competitor, and market analysis", "Channel and campaign planning", "Go-to-market and launch strategy", "Marketing audits and performance roadmaps", "Ongoing strategic consultancy and a fractional CMO option"],
    ["What does a B2B marketing strategy agency do?", "It sets your positioning, audience, and plan before channel work begins. At Regen, strategy is the front door: we find the commercial truth, get the message right, then build the system that carries it."],
    [["What is a fractional CMO?", "A senior marketing leader who steers your strategy part-time, without the cost of a full-time hire."], ["Do I have to start with strategy?", "Yes. It is the part that makes every channel afterwards work."], ["Is this consultancy or done-for-you?", "It can be either. Many clients start with consultancy, then move into full delivery."], ["How long does strategy take?", "Usually a few weeks, then it becomes the foundation for everything we run afterwards."], ["How do we know it is working?", "We tie it to commercial outcomes from the start: pipeline and revenue, not activity."]]
  ),
  "/services/organic-social": service(
    "B2B Social Media Agency | Regen", "A B2B social media agency that builds organic content systems which earn trust and drive pipeline.",
    "Build an Audience That Buys, Not Just Follows.", "B2B Social Media Agency",
    "Regen is a B2B social media agency for SaaS, AI, tech, and professional services companies, building organic content that earns trust and drives pipeline.",
    "Organic social is one of the most powerful tools a B2B brand has, and one of the most consistently wasted, so we treat it as a system rather than a stream of posts. It starts with a clear content strategy and a genuine point of view, delivered across the platforms where your buyers actually spend their time. For many B2B businesses that means LinkedIn leads, but not always, so we build the mix around your audience rather than a formula. That consistency keeps you visible and credible for the months before a buyer is ready to talk, so when the moment comes, you are the obvious choice.",
    ["Platform strategy and tone-of-voice development", "Monthly content calendars and optimisation", "Visual and storytelling direction", "SEO captions and engagement frameworks", "Community management strategy", "Performance tracking and reporting"],
    ["How does organic social drive pipeline in B2B?", "It builds trust across a long buying cycle, keeping you visible and credible to a buying committee for the months before they are ready to buy."],
    [["Which platforms should a B2B business focus on?", "For most, LinkedIn leads, supported by the platforms where your specific buyers already are."], ["Is organic social still worth it?", "Yes, when it is run as a content system with a genuine point of view."], ["How long until it drives results?", "Engagement builds within the first couple of months, with pipeline impact compounding over time."], ["Do you write the content?", "We handle strategy, writing, and scheduling, keeping your input to quick approvals and ideas."], ["How do you measure success?", "On meaningful engagement and audience growth, connected to inbound enquiries, pipeline, and revenue."]]
  ),
  "/services/account-based-marketing": service(
    "Account-Based Marketing Agency | Regen", "An account-based marketing agency for B2B that focuses your sales and marketing on the high-value accounts you most want to win.",
    "Stop Marketing to Everyone, and Win the Accounts That Matter.", "Account-Based Marketing Agency",
    "Regen is an account-based marketing agency for B2B companies in SaaS, AI, tech, and professional services. We focus your sales and marketing on the high-value accounts you most want to win.",
    "For many B2B businesses, real growth does not come from generating more leads, it comes from winning a specific set of high-value accounts, each sold to a buying committee of several decision-makers. Account-based marketing focuses your strategy, content, and sales and marketing effort on those exact accounts, and makes the reason to choose you clear to everyone involved in the decision.",
    ["Account selection and prioritisation", "Account research and buying-committee mapping", "Tailored messaging and content per account or segment", "Multi-channel orchestration across LinkedIn, paid, email, and events", "Sales and marketing alignment", "Account-level reporting tied to pipeline and revenue"],
    ["What is account-based marketing?", "ABM targets a defined set of high-value accounts with tailored messaging, rather than casting wide for leads. It is worth it when deals are high-value and involve several decision-makers."],
    [["How many accounts should ABM target?", "From a focused handful to a broader segment, prioritised by commercial value and how winnable each account is."], ["Does ABM replace our other marketing?", "No, it focuses the wider system on the accounts that matter most."], ["How is ABM different from lead generation?", "Lead generation casts wide; ABM concentrates effort on accounts you have chosen to win."], ["Is ABM right for SaaS?", "It suits high-value, multi-stakeholder SaaS deals more than low-value self-serve sales."], ["How do you measure success?", "On engagement and pipeline within target accounts, and ultimately their revenue."]]
  ),
  "/services/go-to-market-and-launch": service(
    "Go-to-Market & Product Launch Strategy | Regen", "Go-to-market, market entry, and product launch strategy for B2B. We build the positioning and the plan, then run the launch that lands, and sticks.",
    "Make Your Launch Impossible to Ignore.", "Go-to-Market and Product Launch Strategy",
    "Regen builds go-to-market, market entry strategy, and product launch strategy for B2B companies in SaaS, AI, tech, and professional services.",
    "Entering a new market, launching a product, or repositioning the business are the moments that decide how the market sees you. We build the positioning and the plan first, then run the launch that carries it, creating momentum before the day itself, driving impact on the day, and sustaining visibility long after most launches would have gone quiet.",
    ["Go-to-market and market entry planning", "Positioning, narrative, and messaging for the launch", "Launch campaign calendar and copywriting", "Community building across LinkedIn, X, and Reddit", "Launch-day scheduling, engagement, and outreach", "Post-launch tracking, insights, and optimisation"],
    ["What is a B2B go-to-market strategy?", "It is the plan for how you enter a market and win: who you are for, why they should choose you, and the sequence of channels and messages that gets you there."],
    [["When should we start planning?", "Earlier than most teams do. The positioning and momentum built beforehand decide how the launch lands."], ["Do you help with market entry?", "Yes. We build the entry strategy and run the launch around it."], ["What makes a launch succeed?", "Clarity of positioning and sustained momentum before and after launch day."], ["Can you launch internationally?", "Yes. We tailor entry strategy to how each market buys."], ["How do you measure a launch?", "On the momentum, demand, and pipeline it creates."]]
  ),
  "/services/founder-led-marketing": service(
    "Founder-Led Marketing & LinkedIn Personal Branding | Regen", "LinkedIn personal branding and founder-led marketing that turns you and your leaders into the voices your market trusts.",
    "In B2B, People Buy From People They Trust.", "Founder-Led Marketing and LinkedIn Personal Branding",
    "Regen builds founder-led marketing and LinkedIn personal branding for founders and leaders in SaaS, AI, tech, and professional services.",
    "Your buyers do not follow a logo, they follow the people behind it, which is why founder-led marketing turns you and your leaders into the voices your market genuinely trusts. We handle the positioning, the writing, and the system behind it, building credibility, reach, and inbound demand that no brand account can match, in a way that sounds like you and runs without eating into your week.",
    ["Personal positioning and narrative development", "Content strategy and ghostwriting, led by LinkedIn", "Profile optimisation and audience growth", "Posting, engagement, and inbound systems", "Thought-leadership angles tied to commercial goals", "Performance tracking and reporting"],
    ["What is founder-led marketing?", "It builds a company's founders and leaders into trusted public voices. We run the positioning, writing, and posting so it sounds like you without taking over your week."],
    [["Will the content sound like me?", "Yes. We build from your voice and point of view, and nothing is published without your sign-off."], ["How much of my time does it take?", "Very little. We keep your involvement to quick approvals and the occasional idea."], ["Why does it work in B2B?", "People trust people more than brands, and a credible founder voice shortens the path to a deal."], ["Which platform do you focus on?", "LinkedIn leads for most B2B founders, extending to other platforms where the audience is active."], ["How do you measure success?", "On reach and engagement that build authority, connected to inbound enquiries and pipeline."]]
  ),
  "/services/creator-partnerships": service(
    "B2B Influencer Marketing Agency | Regen", "A B2B influencer marketing agency that connects your brand with the industry voices your buyers already trust.",
    "Reach Buyers Through the Voices They Already Trust.", "B2B Influencer Marketing Agency and Creator Partnerships",
    "Regen is a B2B influencer marketing agency that connects SaaS, AI, tech, and professional services brands with the industry voices their buyers already trust.",
    "In B2B, influence is not about follower counts, it is about credibility. We connect you with creators, thought leaders, and industry voices who genuinely align with your values and command real trust with your audience, and build every collaboration around authenticity and measurable outcomes. Where founder-led marketing builds your own voice, creator partnerships let you borrow the trust that others have already earned.",
    ["Creator and industry-voice identification and vetting", "Outreach and relationship management", "Creative briefing and content approvals", "Contract negotiation", "Campaign coordination and delivery", "Performance tracking and reporting"],
    ["Does influencer marketing work for B2B?", "Yes, when it is built on credibility rather than follower counts. A single trusted creator can outperform a large but irrelevant reach."],
    [["How do you pick the right creators?", "By credibility and audience fit, vetting every voice for genuine alignment."], ["How is this different from founder-led marketing?", "Founder-led builds your own voice; creator partnerships borrow the trust of voices your market follows."], ["Does it really work in B2B?", "A trusted industry voice can move a specific buying audience in a way broad advertising cannot."], ["How do you measure success?", "On engagement, trust, and pipeline with the right audience, not follower numbers."]]
  ),
};

const servicePageEnhancements = {
  "/services/seo": {
    openingTitle: "Why SEO is worth it for B2B",
    openingTitleEmphasis: "SEO is worth it",
    insightImage: "/pics/seo-insight-laptop.png",
    insightImageAlt: "A laptop displaying organic search performance data on a cream boucle chair.",
  },
  "/services/geo": {
    heroPill: "The B2B GEO Agency",
    heroEmphasis: "Be Recommended",
    openingTitle: "Why GEO is worth it for B2B",
    openingTitleEmphasis: "GEO is worth it",
    includedDetails: [
      "Every public signal becomes consistent, so AI tools understand exactly who you are and what you do.",
      "Clear, concise answers meet the real questions buyers ask and give AI assistants something useful to quote.",
      "Your site's information is structured so machines can read, connect, and confidently interpret your expertise.",
      "Credible mentions in the sources models trust strengthen the evidence behind every recommendation.",
      "Monitoring shows when you appear, what gets said, and where competitors win the answers that matter.",
      "Continuous testing reveals what improves visibility, with clear reporting on movement and what changes next.",
    ],
    insightImage: "/pics/_ (2) 1.png",
    insightImageAlt: "A workstation with web content open on a large monitor.",
    insightImagePosition: "50% 0%",
    insightImageScale: 1.32,
    insightImageOrigin: "50% 0%",
  },
  "/services/google-ads": {
    heroPill: "The B2B Google Ads Agency",
    heroEmphasis: "Someone Needs You.",
    openingTitle: "Why Google Ads are worth it for B2B",
    openingTitleEmphasis: "Google Ads are worth it",
    includedDetails: [
      "Tightly structured campaigns follow buyer intent, with every moving part managed from launch onwards.",
      "Research finds the searches that signal real demand and shows where competitors win or waste spend.",
      "Every headline and description answers intent, earns attention, and gives the right buyer a reason to click.",
      "Clear recommendations turn paid landing pages into a smoother route from search to qualified enquiry.",
      "Budgets follow the buyers, searches, and moments most likely to create valuable pipeline.",
      "Tracking connects every enquiry to its source, so decisions follow pipeline rather than platform metrics.",
    ],
    insightImage: "/pics/new-asset.png",
    insightImageAlt: "Two marketers reviewing campaign work across a laptop and tablet.",
  },
  "/services/paid-social": {
    heroPill: "The B2B Paid Social Media Agency",
    heroEmphasis: "Reaches the Right Buyers.",
    openingTitle: "Why paid social is worth it for B2B",
    openingTitleEmphasis: "paid social is worth it",
    includedDetails: [
      "Every platform, audience, and budget gets a clear role before the campaign goes live.",
      "Campaigns are structured for control and scale, with targeting shaped around how your buyers actually behave.",
      "Clear briefs create ads worth noticing, then performance data shows exactly what to sharpen.",
      "Retargeting meets interested buyers with messages matched to where they are in the decision.",
      "Meaningful variables are tested against real conversion data, moving spend towards what genuinely works.",
      "Reporting shows what drives attention, action, and pipeline, plus exactly what changes next.",
    ],
    insight: [
      "What is B2B paid social advertising?",
      "B2B paid social puts targeted creative in front of the right buyers before they begin actively searching. The platform mix follows where they spend time and what the campaign needs to achieve, from awareness to booked calls.",
    ],
    insightImage: "/pics/_ (1) 1.png",
    insightImageAlt: "A creative professional working with a phone, laptop, and visual moodboard.",
    insightImagePosition: "51% 55%",
    insightImageScale: 1.18,
  },
  "/services/marketing-strategy-consultancy": {
    heroPill: "The B2B Marketing Strategy Agency",
    heroEmphasis: "Not Guesswork.",
    openingTitle: "Why Everything Starts With Strategy.",
    openingTitleEmphasis: "Everything Starts With Strategy.",
    includedDetails: [
      "Your commercial difference becomes a positioning and messaging system the whole business can use.",
      "Research finds the commercial truth across your buyers, category, and competition before setting direction.",
      "Every channel earns its place in one connected plan built around your goals, audience, and resources.",
      "The message, channels, and momentum are sequenced to enter a market or launch with impact.",
      "Audits expose what blocks growth, prioritise the fixes, and map the clearest route forward.",
      "Senior direction stays close to the work, keeping your team aligned and every decision commercially grounded.",
    ],
    insightImage: "/pics/Bielke&Yang.jpeg",
    insightImageAlt: "A small team discussing strategy around handwritten notes.",
  },
  "/services/organic-social": {
    heroPill: "The B2B Social Media Agency",
    heroEmphasis: "Not Just Follows.",
    openingTitle: "Why organic social is worth it for B2B",
    openingTitleEmphasis: "organic social is worth it",
    includedDetails: [
      "The right channels and a recognisable voice create a social presence buyers can trust.",
      "A clear monthly plan keeps publishing consistent while performance data sharpens what comes next.",
      "Creative rules and narrative angles make every post feel unmistakably yours.",
      "Search-aware captions extend discovery, while practical engagement prompts turn passive reach into useful conversations.",
      "A clear response and participation system builds relationships without leaving your audience waiting.",
      "Reporting connects reach and engagement to inbound demand, then shows exactly what needs improving.",
    ],
    insightGraphic: "organic-social",
  },
  "/services/account-based-marketing": {
    heroPill: "The Account-Based Marketing Agency",
    heroEmphasis: "Win the Accounts That Matter.",
    openingTitle: "Why ABM is worth it for B2B",
    openingTitleEmphasis: "ABM is worth it",
    includedDetails: [
      "Accounts are ranked by value, fit, and likelihood to buy, so effort goes where it can win.",
      "Research uncovers each account's priorities and maps the people who influence, champion, and approve the deal.",
      "Messaging reflects what each account or segment cares about, not a generic campaign line.",
      "LinkedIn, paid, email, and events work as one coordinated sequence around the same target accounts.",
      "Sales and marketing share the account plan, signals, and next actions, so momentum never gets lost.",
      "Reporting tracks engagement, opportunities, and revenue at account level, not vanity lead totals.",
    ],
    insightImage: "/pics/new-asset.png",
    insightImageAlt: "Two marketers reviewing campaign work across a laptop and tablet.",
    insightImagePosition: "70% 50%",
  },
  "/services/go-to-market-and-launch": {
    heroPill: "The Go-to-Market and Product Launch Agency",
    heroEmphasis: "Impossible to Ignore.",
    openingTitle: "Get the Launch Right, or Spend Months Catching Up.",
    openingTitleEmphasis: "Spend Months Catching Up.",
    includedDetails: [
      "A sequenced market-entry plan turns the opportunity into momentum and measurable demand.",
      "Positioning defines why the launch matters, who it is for, and the story buyers will remember.",
      "Every message and moment is planned across the build-up, launch day, and the weeks that follow.",
      "Genuine participation starts where your audience already gathers, before asking them to act.",
      "Live coordination across content, outreach, and responses turns launch-day attention into useful conversations.",
      "Post-launch signals show what to refine, extend, and amplify while momentum is still building.",
    ],
    insightImage: "/pics/service-launch.webp",
    insightImageAlt: "A creative professional planning at a desk with a laptop and campaign materials.",
  },
  "/services/founder-led-marketing": {
    heroPill: "The Founder-Led Marketing Agency",
    heroEmphasis: "They Trust.",
    openingTitle: "Why founder-led marketing is worth it for B2B",
    openingTitleEmphasis: "founder-led marketing is worth it",
    includedDetails: [
      "A distinctive point of view becomes a clear public narrative only you can own.",
      "Your ideas become sharp LinkedIn content that sounds like you, not an agency.",
      "A stronger profile makes the value clear, while focused distribution grows the audience that matters.",
      "A consistent publishing and response rhythm turns visibility into relevant inbound conversations.",
      "Every angle earns attention while reinforcing the expertise and priorities that support the business.",
      "Reporting tracks authority, audience quality, and inbound demand, then sharpens the programme.",
    ],
    insightImage: "/pics/Studio Meeting 2.jpeg",
    insightImageAlt: "A leader sharing ideas with two colleagues in a meeting.",
  },
  "/services/creator-partnerships": {
    heroPill: "The B2B influencer marketing agency",
    heroEmphasis: "They Already Trust.",
    openingTitle: "Why creator partnerships are worth it for B2B",
    openingTitleEmphasis: "creator partnerships are worth it",
    includedDetails: [
      "Creators are chosen for authority and audience fit, then vetted for genuine brand alignment.",
      "Considered outreach builds the relationship properly, so every partnership starts with trust.",
      "Clear briefs protect the idea and the brand while giving creators room to make it credible.",
      "Scope, usage, timelines, and terms are agreed upfront, leaving no ambiguity once work begins.",
      "Every moving part is managed from schedule to publication, keeping partners and outputs on track.",
      "Reporting measures audience quality, engagement, and pipeline impact rather than stopping at reach.",
    ],
    insightImage: "/pics/service-partnerships.webp",
    insightImageAlt: "Professionals building relationships at an industry gathering.",
  },
};

Object.entries(servicePageEnhancements).forEach(([path, extra]) => {
  Object.assign(pageContent[path], extra);
});

const industryData = {
  tech: ["Tech Marketing Agency | Regen", "A tech marketing agency for B2B technology companies whose growth has outpaced their marketing.", "For Tech Companies Whose Growth Has Outpaced Their Marketing.", "Tech Marketing Agency", "Regen is a tech marketing agency for B2B technology companies in SaaS, AI, and tech.", "The product works and the business is scaling, but the marketing has not kept pace. We fix the foundations, sharpen the positioning, and build a strategy that lasts. Then we turn your technical strength into a clear commercial story and a connected marketing system that creates pipeline.", ["A strategy that matches the stage you are actually at", "Positioning that makes a technical proposition commercially clear", "An honest read on what past activity delivered", "A joined-up system across content, search, paid, and ABM", "A long-term partner who keeps optimising as you scale"], ["What does a tech marketing agency do?", "It turns a technical product into a clear commercial story, then builds the marketing that makes buyers act on it, all measured against pipeline and revenue."], [["What makes Regen different?", "We focus on B2B technical categories and lead with strategy and positioning."], ["Do you only work with large tech companies?", "No, we work from scaling startups to established companies."], ["Can you help after failed tactics?", "Yes. We examine what stalled, then build a strategy designed to last."], ["How do you measure success?", "On pipeline, revenue, and commercial outcomes."]]],
  saas: ["Marketing Agency for SaaS | Regen", "A marketing agency for SaaS built around recurring revenue, buying committees, and retention.", "Marketing Built for How SaaS Actually Gets Bought.", "Marketing Agency for SaaS", "Regen is a marketing agency for SaaS companies, built around recurring revenue, the right accounts, and retention.", "SaaS growth comes from reaching the right accounts with a reason to choose you that works for everyone involved, then keeping them. We build around how your product is actually bought, connecting positioning, content, and demand into one system for recurring revenue and predictable pipeline.", ["Positioning for the way your product is bought", "Content that earns trust and drives demand", "ABM aimed at your highest-value accounts", "Demand and lead generation that builds pipeline", "Reporting tied to pipeline, acquisition cost, and retention"], ["What does a SaaS marketing agency do?", "It builds strategy and channels around how software is bought and kept, measured on recurring revenue and pipeline."], [["Do you do demand generation?", "Yes. Content builds trust and demand generation turns it into pipeline."], ["Do you only work with enterprise SaaS?", "No. We work across stages and deal sizes."], ["How do you help retention?", "Retention is built into the strategy from the start."], ["How do you measure SaaS marketing?", "Against pipeline, acquisition cost, and retention."]]],
  ai: ["Marketing Agency for AI Companies | Regen", "A marketing agency for AI companies that have outgrown ‘we do AI’. We make the commercial value clear.", "Marketing for AI Companies That Have Outgrown ‘We Do AI’.", "Marketing Agency for AI Companies", "Regen is a marketing agency for AI companies, helping AI startups and scale-ups turn a fast-moving technical proposition into a clear commercial story.", "The category moves weekly and buyers are drowning in lookalike claims. We position what makes you worth choosing, build demand around it, and make sure you appear when buyers ask AI tools for recommendations.", ["Positioning that cuts through a fast-moving category", "Messaging that translates technical depth into value", "Demand through the channels buyers use", "Founder-led marketing to build trust fast", "GEO, so you show up in AI recommendations"], ["How do you market an AI startup?", "Lead with the commercial outcome, not the model. We build positioning first, then the demand around it."], [["Why use a specialist partner?", "Because generic marketing sells the category rather than the reason to choose you."], ["Where do AI buyers look?", "Increasingly to AI assistants and credible founders."], ["Do you work with early-stage startups?", "Yes, from pre-investment through scale-up."], ["How do you measure success?", "On positioning, demand, pipeline, and AI visibility."]]],
  "professional-services": ["Professional Services Marketing Agency | Regen", "A professional services marketing agency for firms in legal, construction, and manufacturing.", "Marketing for Firms Whose Reputation Is Built on Judgement.", "Professional Services Marketing Agency", "Regen is a professional services marketing agency for firms in legal, construction, and manufacturing, where the value sits in judgement, track record, and trust.", "These services are bought through long, considered decisions involving several stakeholders. Most marketing sells the category instead of the judgement, track record, and trust that set one firm apart. We make that difference impossible to miss.", ["Positioning that sells your judgement", "Messaging built for a multi-stakeholder decision", "Content and thought leadership that build trust", "Demand across search, social, and founder-led marketing", "A long-term partner who understands how your firm wins work"], ["How is professional services marketing different?", "It sells judgement, track record, and trust rather than a feature list, using positioning and authority content to make the right firm clear."], [["Which firms do you work with?", "Legal, construction, and manufacturing firms."], ["Why specialist marketing?", "Because generic marketing sells the category instead of the judgement that wins work."], ["Is marketing worth it in a referral-led sector?", "Yes. Strong positioning makes you the obvious choice when a referral starts the decision."], ["How do you measure success?", "On visibility, credibility, enquiries, and won work."]]],
};

const industryMarks = {
  saas: { accentWord: "SaaS", accentColor: "#0028fa" },
  ai: { accentWord: "AI", accentColor: "#0028fa" },
  tech: { accentWord: "Tech", accentColor: "#0028fa" },
  "professional-services": { accentWord: "Professional Services", accentColor: "#0028fa" },
};

const industryEnhancements = {
  saas: {
    heroBody: "Most SaaS marketing chases reach and follower growth, numbers that look fine in a report but never touch revenue. We are the SaaS marketing agency built around what actually compounds for a software business, qualified pipeline, recurring revenue, and retention.",
    industryStats: {
      title: "What winning in SaaS takes",
      cards: [
        {
          visual: "saas-cost",
          heading: "Winning Customers Costs More",
          copy: "Acquisition costs have risen around 60% in five years. Spending your way to growth no longer works, you need marketing that brings your cost per customer down, not up.",
          source: "ProfitWell/Paddle",
        },
        {
          visual: "saas-market",
          heading: "A Huge, Crowded Market",
          copy: "SaaS spending passed $300bn in 2025 and keeps growing. The prize is enormous, but so is the noise, so sharp positioning is what gets you noticed.",
          source: "Gartner",
        },
        {
          visual: "saas-journey",
          heading: "Buyers Decide Without You",
          copy: "B2B buyers spend just 17% of the journey with suppliers. Be visible and trusted during their independent research, or you're never in the deal.",
          source: "Gartner",
        },
      ],
    },
    industryRealities: {
      title: "Marketing built around the realities of SaaS",
      items: [
        {
          heading: "Product-led, sales-led, or both",
          copy: "Whether you grow through self-serve trials, a sales-led motion, or a hybrid where expansion matters most, we build the marketing around how your product is actually bought.",
        },
        {
          heading: "Net revenue retention, not just new logos",
          copy: "SaaS lives on recurring revenue, so we build marketing that supports expansion and reduces churn, not just marketing that wins the first deal.",
        },
        {
          heading: "Standing out in a crowded category",
          copy: "When every competitor claims the same thing, we help you carve out a defensible position and differentiate on value, not feature lists.",
        },
        {
          heading: "Activation and trial-to-paid",
          copy: "We understand the metrics that actually move the business, activation, time-to-value, and trial-to-paid, and build marketing that shifts them, not just top-of-funnel traffic.",
        },
        {
          heading: "The whole buying committee",
          copy: "SaaS is rarely bought by one person, so we craft messaging that lands with the champion, the economic buyer, and everyone else in the room.",
        },
        {
          heading: "Go-to-market and sales alignment",
          copy: "Marketing, sales, and customer success only work when they pull together, so we tie the whole thing to shared pipeline and revenue.",
        },
      ],
    },
  },
  "professional-services": {
    hero: "Marketing for Professional Services Firms Whose Reputation Is Built on Judgement.",
    heroBody: "In professional services, your value sits in judgement, track record, and trust, yet most marketing sells the category instead of the reason to choose you. We are the professional services marketing agency that makes what sets your firm apart impossible to miss.",
    industryStats: {
      title: "Why clarity wins in professional services",
      cards: [
        {
          visual: "professional-clarity",
          heading: "Most Firms Blur Together",
          copy: "Only 15% of decision-makers rate the thought leadership they read as very good. Most firms fail to make their expertise clear, so buyers can't tell them apart. Clarity is the differentiator almost nobody gets right.",
          source: "LinkedIn/Edelman",
        },
        {
          visual: "professional-growth",
          heading: "The Gap Is Widening",
          copy: "High-growth firms grow around 4x faster than their peers, and up to 30% more profitably. The firms that market their expertise well are pulling decisively ahead.",
          source: "Hinge, 2025",
        },
        {
          visual: "professional-expertise",
          heading: "Expertise Opens Doors",
          copy: "75% of buyers say thought leadership led them to a firm they weren't considering, and 60% will pay a premium for it. Clear, expert content wins work you'd never otherwise reach.",
          source: "LinkedIn/Edelman",
        },
      ],
    },
    industryRealities: {
      title: "Marketing built around the realities of professional services",
      items: [
        {
          heading: "Selling judgement, not a product",
          copy: "Your value sits in expertise and track record, not features, so we make your judgement the reason clients choose you.",
        },
        {
          heading: "Standing out in a sea of sameness",
          copy: "Most firms in your field look and sound alike, so we help you carve out a clear position that genuinely sets you apart.",
        },
        {
          heading: "Winning beyond referrals",
          copy: "Referrals are brilliant until they run out, so we build the visibility and reputation that generate work you aren't relying on introductions for.",
        },
        {
          heading: "Content that proves expertise",
          copy: "Buyers check your thinking long before they call, so we turn your expertise into thought leadership that builds trust and opens doors.",
        },
        {
          heading: "A considered, multi-stakeholder decision",
          copy: "Your work is bought slowly, by more than one person, so we build messaging that reassures and convinces everyone involved.",
        },
        {
          heading: "Reputation that survives scrutiny",
          copy: "Buyers vet you online before they enquire, so we make sure what they find reinforces exactly why you're the right choice.",
        },
      ],
    },
  },
  tech: {
    heroBody: "Most tech marketing gets stuck describing what the product does, when buyers actually care about what it changes for them. We are the tech marketing agency that catches the marketing up to the business, turning technical strength into a clear commercial story and real pipeline.",
    industryStats: {
      title: "What it takes to get bought in Tech",
      cards: [
        {
          visual: "tech-committee",
          heading: "Every Sale Has a Committee",
          copy: "A typical tech purchase now runs through 6 to 10 decision-makers, and 77% of buyers call it complex. Your message has to land with everyone in the room, not just your champion, which takes deliberate positioning and content.",
          source: "Gartner",
        },
        {
          visual: "tech-spend",
          heading: "Spending Is Surging",
          copy: "Worldwide IT spending will hit $6.37 trillion in 2026, up 14.2%. The budgets are there, but so are the competitors chasing them, so being the obvious choice matters more than ever.",
          source: "Gartner, 2026",
        },
        {
          visual: "tech-budget",
          heading: "Do More With Less",
          copy: "Marketing budgets have dropped to 7.7% of revenue. With less to spend, every bit has to work harder, which is exactly what a strategy-led approach delivers.",
          source: "Gartner CMO Survey",
        },
      ],
    },
    industryRealities: {
      title: "Marketing built around the realities of tech",
      items: [
        {
          heading: "A committee, not a buyer",
          copy: "Tech is bought by a group, from the technical evaluator to the economic buyer, so we build messaging that lands with everyone in the decision, not just your champion.",
        },
        {
          heading: "Technical depth, commercial clarity",
          copy: "Your buyers are technical, but the people signing off often aren't, so we translate technical depth into the commercial outcome that gets budget approved.",
        },
        {
          heading: "Long, considered sales cycles",
          copy: "Tech deals take time and real scrutiny, so we keep you visible and credible across a long evaluation, not just at the moment of enquiry.",
        },
        {
          heading: "Proof over promises",
          copy: "Technical buyers trust evidence, not claims, so we lead with proof, results, and substance that stands up to due diligence.",
        },
        {
          heading: "Trust as a gating factor",
          copy: "In tech, credibility and reliability decide who makes the shortlist, so we help you clear that bar before the conversation even starts.",
        },
        {
          heading: "Partners and integrations",
          copy: "Much of tech growth runs through partner ecosystems and integrations, so we help you show up where those relationships and referrals actually happen.",
        },
      ],
    },
  },
  ai: {
    heroBody: "In AI, everyone claims the same ground, so the technology is rarely what wins the deal, clarity is. We are the marketing agency for AI companies that makes your commercial value impossible to miss, then builds the demand around it.",
    industryStats: {
      title: "What it takes to win in AI",
      cards: [
        {
          visual: "ai-scrutiny",
          heading: "Buyers Are Scrutinising Your AI",
          copy: "58% of buyers now dig into how AI is actually built into a product before they'll engage. Prove your value clearly and you get pulled into deals sooner, stay vague and you're passed over.",
          source: "6sense, 2025",
        },
        {
          visual: "ai-market",
          heading: "The Prize Is Enormous",
          copy: "The AI market is forecast to reach $3.5 trillion by 2033. The opportunity is massive, but so is the crowd claiming the same ground, so clear positioning is what wins.",
          source: "Grand View Research",
        },
        {
          visual: "ai-research",
          heading: "Buyers Find You Through AI",
          copy: "94% of B2B buyers now use AI to research and vet vendors. If you're not showing up in those answers, you're invisible, which is exactly what GEO fixes.",
          source: "6sense, 2025",
        },
      ],
    },
    industryRealities: {
      title: "Marketing built around the realities of AI",
      items: [
        {
          heading: "Proving your AI is real",
          copy: "Buyers are wise to AI-washing and dig into how your product actually works, so we help you show the substance behind the claim, not just the buzzword.",
        },
        {
          heading: "A category that moves weekly",
          copy: "Positioning that was right last quarter can already be stale, so we build messaging that keeps pace with a category redefining itself in real time.",
        },
        {
          heading: "Standing out from the me-too crowd",
          copy: "When every competitor claims the same ground, we help you own a clear, defensible reason to choose you.",
        },
        {
          heading: "Technical depth, commercial clarity",
          copy: "Your value is technical, but your buyer cares about the outcome, so we translate the model into the commercial result it delivers.",
        },
        {
          heading: "Being found through AI",
          copy: "Your buyers increasingly ask AI tools who to work with, so we make sure you show up and get recommended in those answers.",
        },
        {
          heading: "Trust in a low-trust category",
          copy: "AI is new and buyers are cautious, so we build the credibility, through founders, proof, and clarity, that shortens the path to a yes.",
        },
      ],
    },
  },
};

Object.entries(industryData).forEach(([slug, values]) => {
  pageContent[`/industries/${slug}`] = {
    ...industry(...values),
    industryKey: slug,
    ...industryMarks[slug],
    ...industryEnhancements[slug],
  };
});

pageContent["/methodology"] = { title: "Our B2B Marketing Methodology | Regen", description: "Audit, Test, Amplify. The three-step method that keeps Regen's work ahead of the market.", hero: "Audit, Test, Amplify.", h1: "Our B2B Marketing Methodology", section: "Why Regen", tone: "blue", variant: "methodology", body: "Good marketing is not luck, and it is not a channel, it is a method. Ours has three steps, and it is the reason our work holds its value as the market shifts.", steps: [["01", "Audit", "We research your market, audit your marketing, and analyse what is working. This is where the strategy and positioning get set, before a single campaign goes live."], ["02", "Test", "We build and run the marketing across the channels that fit, starting with targeted organic content to validate the positioning and gather the data we need."], ["03", "Amplify", "Based on what the data proves, we layer in paid media and broader tactics, scaling what works and keeping it ahead as your market shifts."]], cta: "Book a Strategy Call" };

export const overviewContent = {
  "/services": { title: "B2B Marketing Services | Regen", description: "A connected set of B2B marketing services, led by strategy, from SEO and GEO to paid, account-based marketing, and founder-led marketing.", hero: "Marketing Services That Work as One System.", h1: "B2B Marketing Services", section: "Services", tone: "blue", entity: "Regen delivers a connected set of B2B marketing services for SaaS, AI, tech, and professional services companies, led by strategy.", body: "Our services are not a menu you pick from, they are a system where the channels work together. Strategy leads, the growth services deliver it, and account-based marketing focuses the whole thing on the accounts that matter most. You can start anywhere, but it all connects back to one strategy built around your business.", cards: ["/services/marketing-strategy-consultancy", "/services/organic-social", "/services/paid-social", "/services/google-ads", "/services/account-based-marketing", "/services/seo", "/services/geo", "/services/go-to-market-and-launch", "/services/founder-led-marketing", "/services/creator-partnerships"] },
  "/industries": { title: "B2B Marketing for SaaS, AI, Tech & Professional Services | Regen", description: "We work in technical, high-consideration categories. Marketing built for how your market actually buys.", hero: "We Don't Do Generic. We Do Your Market.", h1: "B2B Marketing for the Industries We Know", section: "Industries", tone: "bone", entity: "Regen works in technical, high-consideration B2B categories, SaaS, AI, and tech, and with professional services firms in legal, construction, and manufacturing.", body: "A flat message that could speak to anyone speaks to no one. We work in categories where the value is real but hard to communicate, and where the sale is long, considered, and made by more than one person. Knowing how your market actually buys is half the work.", cards: ["/industries/saas", "/industries/tech", "/industries/ai", "/industries/professional-services", "/investors"] },
};

Object.assign(pageContent, overviewContent);

pageContent["/investors"] = { title: "Portfolio Marketing Partner for Investors | Regen", description: "The B2B marketing partner you can install across the whole portfolio.", hero: "The Marketing Partner You Can Bring to the Whole Portfolio.", h1: "Portfolio Marketing Partner for Investors", section: "Industries", tone: "bone", industryKey: "investors", accentWord: "Portfolio", accentColor: "#0028fa", entity: "A portfolio-wide marketing partner for investors and the B2B companies they back.", body: "Strong products stall when the market cannot see why to choose them. Regen gives portfolio companies a clear commercial story, the strategy to take it to market, and a connected marketing system that supports growth and the next round.", included: ["A repeatable, strategy-led approach that de-risks portfolio marketing", "Founders get a partner, not another unmanaged agency", "Positioning that makes a round-defining story land", "Deep focus on SaaS, AI, and tech", "A long-term partner that scales with each company"], listTitle: "Why funds partner with us", steps: [["01", "Preferential terms", "A portfolio relationship that makes high-quality support easier to access."], ["02", "Clear intake", "The right companies get the right support at the right stage."], ["03", "Fund reporting", "Regular visibility into portfolio marketing health."]], cta: "Book a Partnership Call" };
pageContent["/investors"].ctaHref = "/investors/partnership-call";

pageContent["/investors/partnership-call"] = {
  title: "Portfolio Partnership Call | Regen",
  description: "Talk to Regen about a portfolio-wide marketing partnership for B2B SaaS, AI, and tech companies.",
  robots: { index: false, follow: true },
};

pageContent["/work"] = { title: "B2B Marketing Case Studies | Regen", description: "B2B marketing case studies from SaaS, AI, and tech, focused on commercial results.", hero: "Results Don't Lie.", h1: "B2B Marketing Case Studies", section: "Our Work", tone: "blue", entity: "These are B2B marketing case studies from Regen's work across SaaS, AI, tech, and professional services, focused on commercial results.", body: "Every project here represents a B2B business that came to us with a challenge and left with a marketing strategy that drives real commercial growth. We do not showcase work we are merely proud of, we showcase work that performed. Each case study covers the client, the sector, the challenge, what we did, and the commercial result.", cta: "Book a Strategy Call", emptyWork: true };

pageContent["/work/film-pudding"] = { title: "Film Pudding Case Study | Regen", description: "How Regen refined and scaled Film Pudding's organic growth strategy across Instagram and LinkedIn.", hero: "Film Pudding.", h1: "Organic Growth Strategy", section: "Case Study", tone: "black", entity: "Film Industry · Organic Social", body: "Film Pudding partnered with Regen to refine and scale its organic strategy across Instagram and LinkedIn. The work strengthened brand visibility, deepened audience engagement, and sharpened creative positioning through a narrative-led system built around behind-the-scenes crew moments and commercial work.", included: ["Organic strategy across Instagram and LinkedIn", "Creative positioning and narrative direction", "Behind-the-scenes and commercial storytelling", "Performance-led content refinement"], cta: "Start a Conversation", ctaHref: "/contact" };

pageContent["/work/finden"] = { title: "Finden Case Study | Regen", description: "How Regen reintroduced Finden with organic social and a Product Hunt launch that placed 3rd of 280+ companies.", hero: "Finden.", h1: "Social Media Organic Re-Launch", section: "Case Study", tone: "blue", entity: "AI & Tech Industry · Organic Social · Product Launch", body: "Regen helped Finden return to market with a more polished and professional presence, combining organic social strategy with a coordinated Product Hunt launch. The debut placed 3rd out of more than 280 companies, setting a new benchmark and creating momentum for the re-launch.", included: ["Re-launch positioning and organic social strategy", "Product Hunt launch planning and delivery", "Community engagement and launch-day coordination", "A consistent, professional market presence"], insight: ["The result", "Finden placed 3rd out of more than 280 companies on Product Hunt, giving the re-launch a clear proof point and immediate momentum."], cta: "Start a Conversation", ctaHref: "/contact" };

pageContent["/audit"] = { title: "Free Digital Marketing Audit | Regen", description: "Get a free digital marketing audit from real strategists. See exactly where your pipeline is leaking and the first things we would fix.", hero: "Get Your Free Digital Marketing Audit.", h1: "Free Digital Marketing Audit", section: "The Audit", tone: "blue", entity: "The Audit is a free digital marketing audit from Regen's strategists, a real human review of your positioning, channels, and content.", body: "Send us your site and your channels, and we will come back with a genuine point of view on where your marketing is leaking commercial value and what we would do about it. It is a real read from people who do this every day, not an automated score or a copy-paste report.", included: ["A clear-eyed look at your positioning, channels, and content", "Where your pipeline is leaking", "The first things we would fix, and why", "An honest view on whether we are a good fit, or not"], listTitle: "What you get", insight: ["What is a digital marketing audit?", "A structured review of your positioning, channels, and content that shows where your marketing is losing pipeline and what to fix first. Regen's audit is done by real strategists, so you get a genuine point of view and a short, prioritised list of fixes."], cta: "Start Your Free Audit", ctaHref: "/contact" };

pageContent["/about"] = { title: "About Regen | B2B Digital Marketing Agency", description: "Regen is a B2B digital marketing agency built for businesses that evolve with intention, not impulse. A global team leading with strategy, not shortcuts." };
pageContent["/contact"] = { title: "Contact Regen | Book a Strategy Call", description: "Tell us what you are trying to achieve. We come back with a genuine point of view, and if it is a fit, a strategy call in the diary." };

export function contentForPath(path) { return pageContent[path]; }
