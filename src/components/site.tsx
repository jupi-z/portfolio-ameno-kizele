import Image from "next/image";
import Link from "next/link";

const nav = [
  ["Accueil", "/"],
  ["Projets", "/projets"],
  ["Ma méthode", "/methode"],
  ["Parcours", "/parcours"],
] as const;

export function Header({ active }: { active?: string }) {
  const home = active === "Accueil";
  const journey = active === "Parcours";
  return (
    <header className={`site-header${home ? " site-header-home" : ""}${active === "Projets" ? " site-header-projects" : ""}${journey ? " site-header-journey" : ""}${active === "Ma méthode" ? " site-header-method" : ""}`}>
      <Link className="wordmark" href="/" aria-label="Ameno, accueil"><Image className="brand-mark" src="/brand/AK-noir.svg" alt="" width={34} height={21} priority /><span>ameno.</span></Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {nav.map(([label, href]) => <Link className={active === label ? "active" : ""} href={href} key={label}>{label}</Link>)}
      </nav>
      <Link className="pill-button header-cta" href="/contact"><span>Échangeons</span><span className="arrow-disc"><Arrow /></span></Link>
      <details className="mobile-menu">
        <summary aria-label="Ouvrir ou fermer le menu"><Image className="menu-trigger-icon" src="/figma-assets/menu-icon.svg" alt="" width={28} height={28} /><span className="menu-close-label">Fermer</span><span className="menu-close-arrow"><Arrow /></span></summary>
        <div className="mobile-menu-content">
          <Eyebrow>Ameno Kizele / navigation</Eyebrow>
          <nav aria-label="Menu mobile">{nav.map(([label, href]) => <Link href={href} key={label}>{label}</Link>)}<Link href="/contact">Contact</Link></nav>
          <div className="mobile-menu-social"><a href="https://github.com/jupi-z" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div>
        </div>
      </details>
    </header>
  );
}

export function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M7 6h11v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <span className={`eyebrow${dark ? " eyebrow-dark" : ""}`}>{children}</span>; }

export function Portrait() { return <div className="portrait"><div className="portrait-block" /><div className="portrait-disc" /><div className="portrait-orange" /><Image src="/figma-assets/asset_10-2_0.png" alt="Portrait d’Ameno Kizele" width={432} height={440} priority className="portrait-photo" /><span className="portrait-tag">Des idées aux usages.</span><span className="portrait-role">Backend · Web · Android</span><Image className="portrait-star" src="/figma-assets/asterisk-orange.svg" alt="" width={74} height={74} /><Image className="portrait-star small" src="/figma-assets/asterisk-blue.svg" alt="" width={54} height={54} /></div>; }

const methodSteps = [
  ["01", "Comprendre", "Écouter le besoin, identifier les utilisateurs et les contraintes qui comptent."],
  ["02", "Structurer", "Définir les règles métier, les parcours, les données et les contrats."],
  ["03", "Construire", "Développer un ensemble cohérent, des services jusqu’aux interfaces."],
  ["04", "Vérifier & livrer", "Contrôler les parcours et les états, préparer le déploiement et la maintenance."],
];

export function MethodRoadmap() {
  return <div className="method-roadmap">
    <Image className="method-path" src="/figma-assets/method-path.svg" alt="" width={840} height={860} />
    {methodSteps.map(([number, title, description], index) => <div className={`roadmap-card-wrap roadmap-card-wrap-${index + 1}`} key={number}>
      <article className={`roadmap-card roadmap-card-${index + 1}`}><span>{number}</span><h3>{title}</h3><p>{description}</p><i aria-hidden="true" /></article>
    </div>)}
  </div>;
}

export function ProjectArt({ color, mark, index }: { color: string; mark: string; index: number }) { return <div className={`project-art art-${index % 6}`} style={{"--art-color":color} as React.CSSProperties}><span className="art-stamp">{mark}</span><div className="art-window"><span className="art-dots">● ● ●</span><span className="art-lines" /><span className="art-widget">{index === 0 ? "INVITATION" : index === 1 ? "SEL" : "API"}</span><span className="art-symbol">{index === 0 ? "↗" : index === 1 ? "∑" : "{ }"}</span></div><span className="art-star">✳</span></div>; }

export function ActionLink({ href, children, tone }: { href: string; children: React.ReactNode; tone?: "dark" | "blue" }) { return <Link className={`pill-button${tone === "blue" ? " pill-blue" : ""}`} href={href}><span>{children}</span><span className="arrow-disc"><Arrow /></span></Link>; }

export function Footer({ home = false, caseStudy = false, journey = false, method = false }: { home?: boolean; caseStudy?: boolean; journey?: boolean; method?: boolean }) {
  return <footer className={`site-footer${home ? " site-footer-home" : ""}${caseStudy ? " site-footer-case" : ""}${journey ? " site-footer-journey" : ""}${method ? " site-footer-method" : ""}`}><div className="footer-grid"><div><Link className="footer-wordmark" href="/"><Image className="brand-mark" src="/brand/AK-couleur.svg" alt="" width={42} height={26} /><span>ameno.</span></Link><p>Software Engineer,<br />backend, web &amp; Android.</p></div><div className="footer-links"><Link href="/projets">Les projets <Arrow /></Link><Link href="/methode">Ma méthode <Arrow /></Link><Link href="/parcours">Mon parcours <Arrow /></Link></div><div className="footer-links"><a href="https://github.com/jupi-z" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><Link href="/contact">Contact <Arrow /></Link></div></div><div className="footer-bottom">© 2026 Ameno Kizele Mwine · Kolwezi / Lubumbashi, RDC</div></footer>;
}

export function Invitation({ home = false, journey = false }: { home?: boolean; journey?: boolean }) { return <section className={`invitation${home ? " invitation-home" : ""}${journey ? " invitation-journey" : ""}`}><div className="invitation-panel"><Eyebrow dark>Une idée. Un projet. Une conversation.</Eyebrow><h2>Construisons<br />quelque chose d’utile.</h2><p>Une équipe à rejoindre, un produit à créer ou un système à faire évoluer.</p><ActionLink href="/contact">Échangeons</ActionLink>{!home && <Image className="invite-star" src="/figma-assets/asterisk-feature.svg" width={58} height={58} alt="" />}</div></section>; }

export function PageShell({ children, active, showInvitation = true, caseStudy = false }: { children: React.ReactNode; active?: string; showInvitation?: boolean; caseStudy?: boolean }) { const home = active === "Accueil", journey = active === "Parcours", method = active === "Ma méthode"; return <><Header active={active} /><main>{children}</main>{showInvitation && <Invitation home={home} journey={journey} />}<Footer home={home} caseStudy={caseStudy} journey={journey} method={method} /></>; }
