import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { sharedCopy, type Locale } from "@/lib/localization";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileMenuEscape } from "@/components/mobile-menu-escape";

const activeKeys: Record<string, string> = { Accueil: "home", Home: "home", Projets: "projects", Projects: "projects", "Ma méthode": "method", Method: "method", Parcours: "journey", Experience: "journey" };

export function Header({ active, locale = "fr" }: { active?: string; locale?: Locale }) {
  const copy = sharedCopy[locale];
  const activeKey = activeKeys[active ?? ""];
  const home = activeKey === "home";
  const journey = activeKey === "journey";
  return (
    <header className={`site-header${home ? " site-header-home" : ""}${activeKey === "projects" ? " site-header-projects" : ""}${journey ? " site-header-journey" : ""}${activeKey === "method" ? " site-header-method" : ""}`}>
      <Link className="wordmark" href={locale === "fr" ? "/" : "/en"} aria-label={locale === "fr" ? "Ameno, accueil" : "Ameno, home"}><Image className="brand-mark" src="/brand/AK-noir.svg" alt="" width={34} height={21} /><span>ameno.</span></Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {copy.navigation.map(([key, label, href]) => <Link className={activeKey === key ? "active" : ""} aria-current={activeKey === key ? "page" : undefined} href={href} key={key}>{label}</Link>)}
      </nav>
      <div className="header-actions"><Suspense fallback={<span className="language-switcher" aria-hidden="true">{locale === "fr" ? "EN" : "FR"}</span>}><LanguageSwitcher locale={locale} /></Suspense><Link className="pill-button header-cta" href={locale === "fr" ? "/contact" : "/en/contact"}><span>{copy.contact}</span><span className="arrow-disc"><Arrow /></span></Link></div>
      <details className="mobile-menu">
        <MobileMenuEscape />
        <summary aria-label={copy.menuOpen}><Image className="menu-trigger-icon" src="/figma-assets/menu-icon.svg" alt="" width={28} height={28} /><span className="menu-close-label">{copy.menuClose}</span><span className="menu-close-arrow"><Arrow /></span></summary>
        <div className="mobile-menu-content">
          <Eyebrow>{copy.menuLabel}</Eyebrow>
          <nav aria-label={locale === "fr" ? "Menu mobile" : "Mobile menu"}>{copy.navigation.map(([key, label, href]) => <Link aria-current={activeKey === key ? "page" : undefined} href={href} key={key}>{label}</Link>)}<Link href={locale === "fr" ? "/contact" : "/en/contact"}>{locale === "fr" ? "Contact" : "Contact"}</Link></nav>
          <Suspense fallback={<span className="language-switcher language-switcher-mobile" aria-hidden="true">{locale === "fr" ? "EN" : "FR"}</span>}><LanguageSwitcher locale={locale} mobile /></Suspense>
          <div className="mobile-menu-social"><a href="https://github.com/jupi-z" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
        </div>
      </details>
    </header>
  );
}

export function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M7 6h11v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <span className={`eyebrow${dark ? " eyebrow-dark" : ""}`}>{children}</span>; }

export function Portrait({ locale = "fr" }: { locale?: Locale }) { return <div className="portrait"><div className="portrait-block" /><div className="portrait-disc" /><div className="portrait-orange" /><picture className="portrait-photo"><source media="(max-width: 700px)" srcSet="/figma-assets/portrait-ameno-mobile.webp" /><Image src="/figma-assets/portrait-ameno.webp" alt={locale === "fr" ? "Portrait d’Ameno Kizele" : "Portrait of Ameno Kizele"} width={432} height={440} sizes="(max-width: 700px) 92vw, (max-width: 1159px) 40vw, 432px" loading="eager" fetchPriority="high" className="portrait-photo-image" /></picture><span className="portrait-tag">{locale === "fr" ? "Des idées aux usages." : "From ideas to use."}</span><span className="portrait-role">Backend · Web · Android</span><Image className="portrait-star" src="/figma-assets/asterisk-orange.svg" alt="" width={74} height={74} /><Image className="portrait-star small" src="/figma-assets/asterisk-blue.svg" alt="" width={54} height={54} /></div>; }

export function MethodRoadmap({ locale = "fr" }: { locale?: Locale }) {
  const methodSteps = sharedCopy[locale].roadmap;
  return <div className="method-roadmap">
    <Image className="method-path" src="/figma-assets/method-path.svg" alt="" width={840} height={860} />
    {methodSteps.map(([number, title, description], index) => <div className={`roadmap-card-wrap roadmap-card-wrap-${index + 1}`} key={number}>
      <article className={`roadmap-card roadmap-card-${index + 1}`}><span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true" /></article>
    </div>)}
  </div>;
}

export function ProjectArt({ color, mark, index }: { color: string; mark: string; index: number }) { return <div className={`project-art art-${index % 6}`} style={{"--art-color":color} as React.CSSProperties}><span className="art-stamp">{mark}</span><div className="art-window"><span className="art-dots">● ● ●</span><span className="art-lines" /><span className="art-widget">{index === 0 ? "INVITATION" : index === 1 ? "SEL" : "API"}</span><span className="art-symbol">{index === 0 ? "↗" : index === 1 ? "∑" : "{ }"}</span></div><span className="art-star">✳</span></div>; }

export function ActionLink({ href, children, tone }: { href: string; children: React.ReactNode; tone?: "dark" | "blue" }) { return <Link className={`pill-button${tone === "blue" ? " pill-blue" : ""}`} href={href}><span>{children}</span><span className="arrow-disc"><Arrow /></span></Link>; }

export function Footer({ home = false, caseStudy = false, journey = false, method = false, locale = "fr" }: { home?: boolean; caseStudy?: boolean; journey?: boolean; method?: boolean; locale?: Locale }) {
  const copy = sharedCopy[locale];
  return <footer className={`site-footer${home ? " site-footer-home" : ""}${caseStudy ? " site-footer-case" : ""}${journey ? " site-footer-journey" : ""}${method ? " site-footer-method" : ""}`}><div className="footer-grid"><div><Link className="footer-wordmark" href={locale === "fr" ? "/" : "/en"}><Image className="brand-mark" src="/brand/AK-couleur.svg" alt="" width={42} height={26} /><span>ameno.</span></Link><p>{copy.footerDescription[0]}<br />{copy.footerDescription[1]}</p></div><div className="footer-links"><Link href={locale === "fr" ? "/projets" : "/en/projects"}>{copy.footerProjects} <Arrow /></Link><Link href={locale === "fr" ? "/methode" : "/en/method"}>{copy.footerMethod} <Arrow /></Link><Link href={locale === "fr" ? "/parcours" : "/en/career"}>{copy.footerJourney} <Arrow /></Link></div><div className="footer-links"><a href="https://github.com/jupi-z" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><Link href={locale === "fr" ? "/contact" : "/en/contact"}>{copy.footerContact} <Arrow /></Link></div></div><div className="footer-bottom">© 2026 Ameno Kizele Mwine · Kolwezi / Lubumbashi, {locale === "fr" ? "RDC" : "DR Congo"}</div></footer>;
}

export function Invitation({ home = false, journey = false, locale = "fr" }: { home?: boolean; journey?: boolean; locale?: Locale }) { const copy = sharedCopy[locale]; return <section className={`invitation${home ? " invitation-home" : ""}${journey ? " invitation-journey" : ""}`}><div className="invitation-panel"><Eyebrow dark>{copy.invitationEyebrow}</Eyebrow><h2>{copy.invitationTitle[0]}<br />{copy.invitationTitle[1]}</h2><p>{copy.invitationDescription}</p><ActionLink href={locale === "fr" ? "/contact" : "/en/contact"}>{copy.contact}</ActionLink>{!home && <Image className="invite-star" src="/figma-assets/asterisk-feature.svg" width={58} height={58} alt="" />}</div></section>; }

export function PageShell({ children, active, showInvitation = true, caseStudy = false, locale = "fr" }: { children: React.ReactNode; active?: string; showInvitation?: boolean; caseStudy?: boolean; locale?: Locale }) { const activeKey = activeKeys[active ?? ""], home = activeKey === "home", journey = activeKey === "journey", method = activeKey === "method"; const skipLabel = locale === "fr" ? "Passer au contenu" : "Skip to content"; return <><a className="skip-link" href="#main-content">{skipLabel}</a><Header active={active} locale={locale} /><main id="main-content">{children}</main>{showInvitation && <Invitation home={home} journey={journey} locale={locale} />}<Footer home={home} caseStudy={caseStudy} journey={journey} method={method} locale={locale} /></>; }
