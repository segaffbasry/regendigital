import { footerColumns, legalLinks } from "../lib/site-structure";

export default function SiteFooter() {
  return (
    <footer className="site-footer site-footer--expanded">
      <div className="site-footer__identity">
        <a className="site-footer__brand" href="/" aria-label="Regen home" />
        <p>
          Strategy-led B2B marketing for SaaS, AI, tech, and professional
          services.
        </p>
        <div className="site-footer__credentials" aria-label="About Regen">
          <span>Est. 2022</span>
          <span>Global team</span>
          <span>EU · MENA · APAC</span>
        </div>
      </div>
      <div className="site-footer__columns">
        {footerColumns.map((column) => (
          <section className="site-footer__column" key={column.title}>
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="site-footer__contact">
        <section>
          <p>Start a conversation</p>
          <h2>Ready to turn attention into qualified pipeline?</h2>
          <a href="/contact">Book a strategy call</a>
        </section>
        <section>
          <p>Prefer email?</p>
          <a href="mailto:info@regendigital.co">info@regendigital.co</a>
        </section>
      </div>
      <div className="site-footer__legal">
        <span>
          © 2026 <a href="/">Regen</a>. All rights reserved.
        </span>
        {legalLinks.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
