"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { industries, services, whyRegen } from "../lib/site-structure";

const childMenus = {
  services: {
    label: "Services",
    items: services.slice(1),
  },
  industries: {
    label: "Industries",
    items: industries.slice(1),
  },
  whyRegen: {
    label: "Why Regen",
    items: whyRegen,
  },
};

function NavLabel({ children }) {
  return <span className="site-header__label">{children}</span>;
}

export default function SiteHeader({ animated = false }) {
  const header = useRef(null);
  const menuArea = useRef(null);
  const nav = useRef(null);
  const mobileOverlay = useRef(null);
  const mobileDropdowns = useRef({});
  const closeTimer = useRef(null);
  const exitTimer = useRef(null);
  const pillLocked = useRef(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMobileSection, setActiveMobileSection] = useState(null);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnLight, setIsOnLight] = useState(false);

  const closeMenu = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(exitTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setIsMenuClosing(true);
      pillLocked.current = false;
      exitTimer.current = window.setTimeout(() => {
        setActiveMenu(null);
        setIsMenuClosing(false);
      }, 340);
    }, 110);
  }, []);

  function openMenu(menuName) {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(exitTimer.current);
    pillLocked.current = false;
    setIsMenuClosing(false);
    setActiveMenu(menuName);
  }

  function toggleMenu(menuName) {
    if (activeMenu === menuName) {
      closeMenu();
      return;
    }

    window.clearTimeout(closeTimer.current);
    window.clearTimeout(exitTimer.current);
    pillLocked.current = false;
    setIsMenuClosing(false);
    setActiveMenu(menuName);
  }

  function handleMenuClick(event, menuName) {
    const touchNavigation = window.matchMedia("(hover: none), (pointer: coarse)").matches;

    if (touchNavigation || event.detail === 0) {
      toggleMenu(menuName);
      return;
    }

    openMenu(menuName);
  }

  useLayoutEffect(() => {
    const navElement = nav.current;
    if (!navElement) return;

    navElement.style.setProperty("--nav-full-width", `${navElement.getBoundingClientRect().width}px`);

    const links = Array.from(navElement.querySelectorAll(".site-header__link"));
    const actions = Array.from(navElement.querySelectorAll(".site-header__action"));

    links.forEach((link) => {
      link.style.setProperty("--item-width", `${link.getBoundingClientRect().width}px`);
    });

    function movePillTo(link) {
      if (pillLocked.current) return;

      const navBounds = navElement.getBoundingClientRect();
      const linkBounds = link.getBoundingClientRect();

      navElement.style.setProperty("--pill-x", `${linkBounds.left - navBounds.left}px`);
      navElement.style.setProperty("--pill-width", `${linkBounds.width}px`);
      navElement.classList.add("is-pill-visible");
    }

    function hidePill() {
      navElement.classList.remove("is-pill-visible");
    }

    function handleFocusOut(event) {
      if (!navElement.contains(event.relatedTarget)) hidePill();
    }

    const cleanups = links.map((link) => {
      const show = () => movePillTo(link);
      link.addEventListener("pointerenter", show);
      link.addEventListener("focus", show);
      return () => {
        link.removeEventListener("pointerenter", show);
        link.removeEventListener("focus", show);
      };
    });

    actions.forEach((action) => {
      action.addEventListener("pointerenter", hidePill);
      action.addEventListener("focus", hidePill);
    });

    navElement.addEventListener("pointerleave", hidePill);
    navElement.addEventListener("focusout", handleFocusOut);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      actions.forEach((action) => {
        action.removeEventListener("pointerenter", hidePill);
        action.removeEventListener("focus", hidePill);
      });
      navElement.removeEventListener("pointerleave", hidePill);
      navElement.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  useLayoutEffect(() => {
    const headerElement = header.current;
    if (!headerElement) return;

    let frame = 0;

    function updateHeaderTone() {
      frame = 0;
      const bounds = headerElement.getBoundingClientRect();
      const probeX = Math.min(window.innerWidth - 1, Math.max(1, window.innerWidth / 2));
      const probeY = Math.min(window.innerHeight - 1, Math.max(1, bounds.bottom + 2));
      const elements = document.elementsFromPoint(probeX, probeY);
      let surface = elements.find((element) => !headerElement.contains(element));
      let lightSurface = false;

      while (surface) {
        const color = window.getComputedStyle(surface).backgroundColor;
        const channels = color.match(/[\d.]+/g)?.map(Number) || [];
        const alpha = channels.length > 3 ? channels[3] : 1;

        if (channels.length >= 3 && alpha > 0.2) {
          const [red, green, blue] = channels;
          const luminance = (red * 0.299 + green * 0.587 + blue * 0.114) / 255;
          lightSurface = luminance > 0.58;
          break;
        }

        surface = surface.parentElement;
      }

      setIsOnLight(lightSurface);
    }

    function scheduleToneUpdate() {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeaderTone);
    }

    updateHeaderTone();
    window.addEventListener("scroll", scheduleToneUpdate, { passive: true });
    window.addEventListener("resize", scheduleToneUpdate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleToneUpdate);
      window.removeEventListener("resize", scheduleToneUpdate);
    };
  }, []);

  useLayoutEffect(() => {
    const navElement = nav.current;
    const menuAreaElement = menuArea.current;
    if (!navElement || !menuAreaElement || !activeMenu) return undefined;

    const activeTrigger = navElement.querySelector(".site-header__link.is-active-menu");
    const actions = Array.from(navElement.querySelectorAll(".site-header__action"));
    if (!activeTrigger || !actions.length) return undefined;

    const compactWidth = Math.ceil(
      activeTrigger.getBoundingClientRect().width +
      actions.reduce((width, action) => width + action.getBoundingClientRect().width, 0) +
      (actions.length * 7)
    );

    navElement.style.setProperty("--nav-compact-width", `${compactWidth}px`);

    let frame = 0;
    let startedAt = 0;

    function updateSubmenuPosition(timestamp = 0) {
      const submenu = menuAreaElement.querySelector(".site-header__submenu");
      if (!submenu) return;

      const areaBounds = menuAreaElement.getBoundingClientRect();
      const triggerBounds = activeTrigger.getBoundingClientRect();
      const submenuWidth = submenu.getBoundingClientRect().width;
      const idealLeft = triggerBounds.left - areaBounds.left + (triggerBounds.width - submenuWidth) / 2;
      const maximumLeft = Math.max(0, areaBounds.width - submenuWidth);
      const left = Math.min(maximumLeft, Math.max(0, idealLeft));

      menuAreaElement.style.setProperty("--submenu-left", `${Math.round(left)}px`);

      if (timestamp) {
        if (!startedAt) startedAt = timestamp;
        if (timestamp - startedAt < 760) frame = window.requestAnimationFrame(updateSubmenuPosition);
      }
    }

    function handleResize() {
      updateSubmenuPosition();
    }

    updateSubmenuPosition();
    frame = window.requestAnimationFrame(updateSubmenuPosition);
    window.addEventListener("resize", handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [activeMenu]);

  useEffect(() => {
    function closeOutside(event) {
      if (!menuArea.current?.contains(event.target)) closeMenu();
    }

    function closeWithEscape(event) {
      if (event.key === "Escape") {
        closeMenu();
        setActiveMobileSection(null);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeWithEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [closeMenu]);

  useEffect(() => () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(exitTimer.current);
  }, []);

  useLayoutEffect(() => {
    const overlay = mobileOverlay.current;
    if (!overlay) return undefined;

    const items = overlay.querySelectorAll("[data-mobile-item]");
    const rules = overlay.querySelectorAll("[data-mobile-rule]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 0 : 0.78;

    gsap.killTweensOf([overlay, items, rules]);

    if (isMobileMenuOpen) {
      overlay.removeAttribute("inert");
      const timeline = gsap.timeline();

      timeline
        .set(overlay, {
          autoAlpha: 1,
          pointerEvents: "auto",
        })
        .fromTo(
          overlay,
          {
            clipPath: "circle(0% at calc(100% - 42px) 42px)",
          },
          {
            clipPath: "circle(150% at calc(100% - 42px) 42px)",
            duration,
            ease: "power4.inOut",
          }
        )
        .fromTo(
          rules,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: reducedMotion ? 0 : 0.7,
            ease: "power3.out",
            stagger: 0.05,
          },
          reducedMotion ? 0 : 0.26
        )
        .fromTo(
          items,
          { y: reducedMotion ? 0 : 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: reducedMotion ? 0 : 0.72,
            ease: "power3.out",
            stagger: reducedMotion ? 0 : 0.055,
          },
          reducedMotion ? 0 : 0.3
        );
    } else {
      gsap.to(overlay, {
        clipPath: "circle(0% at calc(100% - 42px) 42px)",
        autoAlpha: 0,
        duration: reducedMotion ? 0 : 0.62,
        ease: "power4.inOut",
        onComplete: () => {
          overlay.style.pointerEvents = "none";
          overlay.setAttribute("inert", "");
        },
      });
    }

    return () => gsap.killTweensOf([overlay, items, rules]);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useLayoutEffect(() => {
    Object.entries(mobileDropdowns.current).forEach(([menuName, element]) => {
      if (!element) return;
      const isActive = activeMobileSection === menuName;
      const links = element.querySelectorAll("a");
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.killTweensOf([element, links]);
      gsap.to(element, {
        height: isActive ? "auto" : 0,
        duration: reducedMotion ? 0 : 0.62,
        ease: "power3.inOut",
      });
      gsap.to(links, {
        y: isActive ? 0 : -12,
        autoAlpha: isActive ? 1 : 0,
        duration: reducedMotion ? 0 : 0.4,
        ease: "power2.out",
        stagger: isActive && !reducedMotion ? 0.035 : 0,
        delay: isActive && !reducedMotion ? 0.12 : 0,
      });
    });
  }, [activeMobileSection]);

  const menu = activeMenu ? childMenus[activeMenu] : null;
  const mobileMenus = [
    {
      name: "services",
      label: "Services",
      items: childMenus.services.items,
    },
    {
      name: "industries",
      label: "Industries",
      items: childMenus.industries.items,
    },
    {
      name: "whyRegen",
      label: "Why Regen",
      items: childMenus.whyRegen.items,
    },
  ];

  return (
    <header
      className={`${animated ? "nav site-header--overlay " : ""}site-header${isOnLight ? " is-on-light" : ""}${isMobileMenuOpen ? " is-mobile-open" : ""}`}
      ref={header}
    >
      <svg className="site-header__glass-filter" aria-hidden="true" focusable="false">
        <filter
          id="regen-glass-lens"
          primitiveUnits="objectBoundingBox"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href="/regen-glass-lens.png"
            x="0"
            y="0"
            width="1"
            height="1"
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="0.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id="regen-panel-lens"
          x="-8%"
          y="-8%"
          width="116%"
          height="116%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.006 0.018"
            numOctaves="2"
            seed="11"
            result="panel-noise"
          />
          <feGaussianBlur
            in="panel-noise"
            stdDeviation="2"
            result="panel-soft-noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="panel-soft-noise"
            scale="36"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <a className="site-header__brand" href="/" aria-label="Regen home">
        <img src="/regen-white.svg" alt="Regen" />
      </a>
      <button
        className="site-header__mobile-toggle"
        type="button"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => {
          closeMenu();
          setIsMobileMenuOpen((isOpen) => {
            if (isOpen) setActiveMobileSection(null);
            return !isOpen;
          });
        }}
      >
        <span />
        <span />
        <span />
      </button>
      <div
        className="site-header__menu-area"
        onPointerEnter={() => window.clearTimeout(closeTimer.current)}
        onPointerLeave={() => {
          if (window.matchMedia("(hover: hover)").matches) closeMenu();
        }}
        ref={menuArea}
      >
        <nav
          className="site-header__nav"
          aria-label="Primary navigation"
          ref={nav}
        >
          <span className="site-header__glass-blur" aria-hidden="true" />
          <span className="site-header__glass-fill" aria-hidden="true" />
          <span className="site-header__glass-bevel" aria-hidden="true" />
          <span className="site-header__hover-pill" aria-hidden="true" />
          <button
            className={`site-header__link${activeMenu === "services" ? " is-active-menu" : ""}`}
            type="button"
            aria-label="Services"
            aria-expanded={activeMenu === "services"}
            aria-controls="primary-child-menu"
            onClick={(event) => handleMenuClick(event, "services")}
            onFocus={() => openMenu("services")}
            onPointerEnter={() => openMenu("services")}
          >
            <NavLabel>Services</NavLabel>
            <span className="site-header__chevron" aria-hidden="true" />
          </button>
          <button
            className={`site-header__link${activeMenu === "industries" ? " is-active-menu" : ""}`}
            type="button"
            aria-label="Industries"
            aria-expanded={activeMenu === "industries"}
            aria-controls="primary-child-menu"
            onClick={(event) => handleMenuClick(event, "industries")}
            onFocus={() => openMenu("industries")}
            onPointerEnter={() => openMenu("industries")}
          >
            <NavLabel>Industries</NavLabel>
            <span className="site-header__chevron" aria-hidden="true" />
          </button>
          <a
            className="site-header__link"
            href="/work"
            aria-label="Our Work"
            onFocus={closeMenu}
            onPointerEnter={closeMenu}
          >
            <NavLabel>Our Work</NavLabel>
          </a>
          <button
            className={`site-header__link${activeMenu === "whyRegen" ? " is-active-menu" : ""}`}
            type="button"
            aria-label="Why Regen"
            aria-expanded={activeMenu === "whyRegen"}
            aria-controls="primary-child-menu"
            onClick={(event) => handleMenuClick(event, "whyRegen")}
            onFocus={() => openMenu("whyRegen")}
            onPointerEnter={() => openMenu("whyRegen")}
          >
            <NavLabel>Why Regen</NavLabel>
            <span className="site-header__chevron" aria-hidden="true" />
          </button>
          <a className="site-header__audit site-header__action cta-motion cta-button" href="/audit">
            <span className="cta-motion__fill" aria-hidden="true" />
            <span className="cta-motion__clip">
              <span className="cta-motion__roll">
                <span>Free Audit</span>
                <span aria-hidden="true">Free Audit</span>
              </span>
            </span>
          </a>
          <a className="site-header__call site-header__action cta-button" href="/contact">
            <span>Book a call</span>
          </a>
        </nav>
        {menu && (
          <div
            className={`site-header__submenu site-header__submenu--${activeMenu}${isMenuClosing ? " is-closing" : ""}`}
            id="primary-child-menu"
            key={activeMenu}
          >
            <span className="site-header__submenu-glass-blur" aria-hidden="true" />
            <span className="site-header__submenu-glass-fill" aria-hidden="true" />
            <span className="site-header__submenu-glass-bevel" aria-hidden="true" />
            <div className="site-header__submenu-heading">
              <span>{menu.label}</span>
            </div>
            <div className="site-header__submenu-grid">
              {menu.items.map((item) => (
                <a href={item.href} key={item.href}>{item.label}</a>
              ))}
            </div>
          </div>
        )}
      </div>
      <div
        className="site-header__mobile-overlay"
        id="mobile-navigation"
        ref={mobileOverlay}
        aria-hidden={!isMobileMenuOpen}
        inert={true}
      >
        <nav className="site-header__mobile-nav" aria-label="Mobile navigation">
          <div className="site-header__mobile-primary">
            {mobileMenus.slice(0, 2).map((mobileMenu) => (
              <div
                className={`site-header__mobile-row${activeMobileSection === mobileMenu.name ? " is-expanded" : ""}`}
                key={mobileMenu.name}
              >
                <span data-mobile-rule />
                <button
                  type="button"
                  data-mobile-item
                  aria-expanded={activeMobileSection === mobileMenu.name}
                  aria-controls={`mobile-${mobileMenu.name}-menu`}
                  onClick={() =>
                    setActiveMobileSection((current) =>
                      current === mobileMenu.name ? null : mobileMenu.name
                    )
                  }
                >
                  <strong>{mobileMenu.label}</strong>
                  <span className="site-header__mobile-chevron" aria-hidden="true" />
                </button>
                <div
                  className="site-header__mobile-dropdown"
                  id={`mobile-${mobileMenu.name}-menu`}
                  aria-hidden={activeMobileSection !== mobileMenu.name}
                  inert={activeMobileSection !== mobileMenu.name}
                  ref={(element) => {
                    mobileDropdowns.current[mobileMenu.name] = element;
                  }}
                >
                  <div>
                    {mobileMenu.items.map((item) => (
                      <a href={item.href} key={item.href}>{item.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="site-header__mobile-row">
              <span data-mobile-rule />
              <a className="site-header__mobile-direct" href="/work" data-mobile-item>
                <strong>Our Work</strong>
              </a>
            </div>
            {mobileMenus.slice(2).map((mobileMenu) => (
              <div
                className={`site-header__mobile-row${activeMobileSection === mobileMenu.name ? " is-expanded" : ""}`}
                key={mobileMenu.name}
              >
                <span data-mobile-rule />
                <button
                  type="button"
                  data-mobile-item
                  aria-expanded={activeMobileSection === mobileMenu.name}
                  aria-controls={`mobile-${mobileMenu.name}-menu`}
                  onClick={() =>
                    setActiveMobileSection((current) =>
                      current === mobileMenu.name ? null : mobileMenu.name
                    )
                  }
                >
                  <strong>{mobileMenu.label}</strong>
                  <span className="site-header__mobile-chevron" aria-hidden="true" />
                </button>
                <div
                  className="site-header__mobile-dropdown"
                  id={`mobile-${mobileMenu.name}-menu`}
                  aria-hidden={activeMobileSection !== mobileMenu.name}
                  inert={activeMobileSection !== mobileMenu.name}
                  ref={(element) => {
                    mobileDropdowns.current[mobileMenu.name] = element;
                  }}
                >
                  <div>
                    {mobileMenu.items.map((item) => (
                      <a href={item.href} key={item.href}>{item.label}</a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="site-header__mobile-footer">
            <div className="site-header__mobile-secondary" data-mobile-item>
              <a className="site-header__mobile-contact cta-button" href="/contact">
                <span>Contact</span>
                <span className="cta-arrow" aria-hidden="true" />
              </a>
            </div>
            <a
              className="site-header__mobile-audit cta-button"
              href="/audit"
              data-mobile-item
            >
              <span>Get a Free Audit</span>
              <span className="cta-arrow" aria-hidden="true" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
