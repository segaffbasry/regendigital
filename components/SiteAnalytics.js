"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import "../app/analytics-consent.css";

export const measurementId = "G-9FEPPKZ483";
const consentKey = "regen-analytics-consent";

export default function SiteAnalytics() {
  const [choice, setChoice] = useState("loading");

  useEffect(() => {
    try { setChoice(localStorage.getItem(consentKey) || "unset"); }
    catch { setChoice("unset"); }
  }, []);

  function choose(value) {
    try { localStorage.setItem(consentKey, value); } catch {}
    setChoice(value);
  }

  return (
    <>
      {choice === "accepted" ? (
        <>
          <Script id="regen-ga-config" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);};
            window.gtag('js', new Date());
            window.gtag('config', '${measurementId}', {
              page_location: window.location.origin + window.location.pathname,
              page_referrer: document.referrer ? document.referrer.split('?')[0].split('#')[0] : '',
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `}</Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
        </>
      ) : null}
      {choice === "unset" ? (
        <aside className="analytics-consent" aria-label="Analytics cookie preferences">
          <p>Can we use analytics cookies to understand visits and improve the website? <a href="/privacy-policy#cookies">Privacy policy</a></p>
          <div>
            <button type="button" onClick={() => choose("declined")}>No thanks</button>
            <button type="button" onClick={() => choose("accepted")}>Allow analytics</button>
          </div>
        </aside>
      ) : null}
      {choice === "accepted" || choice === "declined" ? (
        <button className="analytics-preferences" type="button" onClick={() => {
          try { localStorage.removeItem(consentKey); } catch {}
          window.location.reload();
        }}>Cookie preferences</button>
      ) : null}
    </>
  );
}
