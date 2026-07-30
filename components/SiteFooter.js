import { footerColumns, legalLinks } from "../lib/site-structure";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="site-footer__brand" href="/" aria-label="Regen home" />
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
      <div className="site-footer__legal">
        <span>© 2026 <a href="/">Regen</a>. All rights reserved.</span>
        {legalLinks.map((link) => (
          <a href={link.href} key={link.href}>{link.label}</a>
        ))}
      </div>
    </footer>
  );
}
