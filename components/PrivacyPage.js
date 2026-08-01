import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import PrivacyMotion from "./PrivacyMotion";

const contents = [
  ["information", "The information we collect"],
  ["use", "How we use your information"],
  ["legal-bases", "Our legal bases"],
  ["sharing", "Who we share information with"],
  ["cookies", "Cookies and analytics"],
  ["retention", "How long we keep information"],
  ["security", "How we protect information"],
  ["transfers", "International transfers"],
  ["rights", "Your privacy rights"],
  ["updates", "Changes to this policy"],
  ["contact", "How to contact us"],
];

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <PrivacyMotion />
      <SiteHeader />

      <section className="privacy-hero">
        <p className="privacy-hero__eyebrow">Legal</p>
        <h1>Website<br />Privacy Policy</h1>
      </section>

      <div className="privacy-document">
        <aside className="privacy-document__meta">
          <p>Last updated</p>
          <p>29 July 2026</p>
        </aside>

        <article className="privacy-document__content">
          <section className="privacy-introduction">
            <h2>Introduction</h2>
            <p>
              This privacy policy explains how Regen Digital (“Regen”, “we”, “us” or
              “our”) collects, uses and protects personal information when you visit
              our website, contact us, request an audit, or work with us.
            </p>
            <p>
              We only collect information that helps us respond to you, deliver our
              services, improve the website and meet our legal obligations. If you
              have a question about this policy or how we use your information, email{" "}
              <a href="mailto:info@regendigital.co">info@regendigital.co</a>.
            </p>
          </section>

          <nav className="privacy-contents" aria-label="Privacy policy contents">
            <p>Contents</p>
            <ol>
              {contents.map(([id, label], index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="information">
            <h2><span>01</span>The information we collect</h2>
            <p>We may collect information that you choose to give us, including:</p>
            <ul>
              <li>your name, work email address, phone number and company details;</li>
              <li>the information you include in an enquiry, audit request or project brief;</li>
              <li>communications and feedback you share while working with us; and</li>
              <li>marketing preferences, where you have chosen to receive updates.</li>
            </ul>
            <p>
              When you use the website, limited technical information may also be
              collected automatically. This can include your IP address, browser and
              device type, referring page, pages viewed, approximate location and the
              time and duration of your visit. We do not intentionally collect special
              category or sensitive personal information through this website.
            </p>
          </section>

          <section id="use">
            <h2><span>02</span>How we use your information</h2>
            <p>We use personal information to:</p>
            <ul>
              <li>respond to enquiries and prepare audits, proposals or recommendations;</li>
              <li>provide, manage and improve our services;</li>
              <li>operate, secure and understand how people use our website;</li>
              <li>send relevant marketing where you have consented or where permitted by law;</li>
              <li>maintain business, financial and contractual records; and</li>
              <li>comply with legal obligations or protect our legitimate interests.</li>
            </ul>
            <p>We do not sell your personal information.</p>
          </section>

          <section id="legal-bases">
            <h2><span>03</span>Our legal bases</h2>
            <p>
              Where UK or EU data protection law applies, we rely on one or more of
              the following legal bases: your consent; taking steps at your request
              before entering into a contract; performing a contract with you; our
              legitimate interests in running and improving our business; and
              compliance with a legal obligation.
            </p>
            <p>
              When we rely on legitimate interests, we consider the impact on your
              rights and only proceed where those interests are not overridden by
              your privacy interests.
            </p>
          </section>

          <section id="sharing">
            <h2><span>04</span>Who we share information with</h2>
            <p>
              We may share information with trusted suppliers that help us operate,
              such as website hosting, analytics, customer relationship management,
              cloud storage, email and professional advisers. They may only use the
              information to provide services to us and must protect it appropriately.
            </p>
            <p>
              We may also disclose information where required by law, to protect our
              rights or the rights of others, or as part of a merger, acquisition or
              transfer of business assets. We do not share information with third
              parties for their own unrelated marketing.
            </p>
          </section>

          <section id="cookies">
            <h2><span>05</span>Cookies and analytics</h2>
            <p>
              Our website may use essential cookies needed for it to function and
              optional analytics cookies that help us understand visits and improve
              performance. Where required, optional cookies are used only after you
              give consent. You can change your browser settings to block or delete
              cookies, although parts of the website may not work as intended.
            </p>
            <p>
              More detail is available in our <a href="/cookie-policy">Cookie Policy</a>.
            </p>
          </section>

          <section id="retention">
            <h2><span>06</span>How long we keep information</h2>
            <p>
              We keep personal information only for as long as it is reasonably
              needed for the purpose for which it was collected, including to meet
              legal, accounting and reporting requirements. Enquiries that do not
              become client relationships are normally deleted or anonymised within
              24 months. Client records may be retained for up to seven years after
              the relationship ends where required for tax, contractual or legal
              purposes.
            </p>
          </section>

          <section id="security">
            <h2><span>07</span>How we protect information</h2>
            <p>
              We use reasonable technical and organisational safeguards designed to
              protect personal information from loss, misuse, unauthorised access,
              alteration or disclosure. No online system is completely secure, so we
              cannot guarantee absolute security.
            </p>
          </section>

          <section id="transfers">
            <h2><span>08</span>International transfers</h2>
            <p>
              Some suppliers may process information outside the United Kingdom or
              European Economic Area. Where this happens, we use appropriate
              safeguards, such as adequacy regulations or approved contractual
              clauses, where required by applicable law.
            </p>
          </section>

          <section id="rights">
            <h2><span>09</span>Your privacy rights</h2>
            <p>
              Depending on where you live, you may have the right to ask for access
              to, correction of, deletion of, or restriction of your personal
              information. You may also have the right to object to processing,
              request portability, withdraw consent, or complain to your local data
              protection authority.
            </p>
            <p>
              To exercise a right, email <a href="mailto:info@regendigital.co">info@regendigital.co</a>.
              We may need to verify your identity before acting on a request. You can
              unsubscribe from marketing at any time using the link in an email or by
              contacting us.
            </p>
          </section>

          <section id="updates">
            <h2><span>10</span>Changes to this policy</h2>
            <p>
              We may update this policy when our services, suppliers or legal
              obligations change. The latest version will always appear on this page
              with its updated date.
            </p>
          </section>

          <section id="contact">
            <h2><span>11</span>How to contact us</h2>
            <p>
              For privacy questions or requests, contact Regen Digital at{" "}
              <a href="mailto:info@regendigital.co">info@regendigital.co</a>.
            </p>
            <p>
              If you are in the UK and are not satisfied with our response, you may
              also raise a concern with the Information Commissioner’s Office at{" "}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
                ico.org.uk
              </a>.
            </p>
          </section>
        </article>
      </div>

      <SiteFooter />
    </main>
  );
}
