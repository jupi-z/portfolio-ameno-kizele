import Link from "next/link";

const nav = [
  ["Accueil", "/"],
  ["Projets", "/projets"],
  ["Ma méthode", "/methode"],
  ["Parcours", "/parcours"],
] as const;

export function Header({ active }: { active?: string }) {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="Ameno, accueil">ameno.</Link>
      <nav className="desktop-nav" aria-label="Navigation principale">
        {nav.map(([label, href]) => <Link className={active === label ? "active" : ""} href={href} key={label}>{label}</Link>)}
      </nav>
      <Link className="pill-button header-cta" href="/contact"><span>Échangeons</span><span className="arrow-disc"><Arrow /></span></Link>
      <details className="mobile-menu">
        <summary aria-label="Ouvrir le menu"><span /><span /></summary>
        <nav aria-label="Menu mobile">{nav.map(([label, href]) => <Link href={href} key={label}>{label}<span>↗</span></Link>)}<Link href="/contact">Échangeons<span>↗</span></Link></nav>
      </details>
    </header>
  );
}

export function Arrow() { return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"><path d="M6 18 18 6M7 6h11v11" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>; }

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) { return <span className={`eyebrow${dark ? " eyebrow-dark" : ""}`}>{children}</span>; }

export function ProjectArt({ color, mark, index }: { color: string; mark: string; index: number }) { return <div className={`project-art art-${index % 6}`} style={{"--art-color":color} as React.CSSProperties}><span className="art-stamp">{mark}</span><div className="art-window"><span className="art-dots">● ● ●</span><span className="art-lines" /><span className="art-widget">{index === 0 ? "INVITATION" : index === 1 ? "SEL" : "API"}</span><span className="art-symbol">{index === 0 ? "↗" : index === 1 ? "∑" : "{ }"}</span></div><span className="art-star">✳</span></div>; }

export function ActionLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link className="pill-button" href={href}><span>{children}</span><span className="arrow-disc"><Arrow /></span></Link>; }

export function Footer() {
  return <footer className="site-footer"><div className="footer-grid"><div><Link className="footer-wordmark" href="/">ameno.</Link><p>Software Engineer,<br />backend, web &amp; Android.</p></div><div className="footer-links"><Link href="/projets">Les projets <Arrow /></Link><Link href="/methode">Ma méthode <Arrow /></Link><Link href="/parcours">Mon parcours <Arrow /></Link></div><div className="footer-links"><a href="https://github.com/jupi-z" target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><Link href="/contact">Contact <Arrow /></Link></div></div><div className="footer-bottom">© 2026 Ameno Kizele Mwine <span>Kolwezi / Lubumbashi, RDC</span></div></footer>;
}

export function Invitation() { return <section className="invitation"><div className="invitation-panel"><Eyebrow dark>Une idée. Un projet. Une conversation.</Eyebrow><h2>Construisons<br />quelque chose d’utile.</h2><p>Une équipe à rejoindre, un produit à créer ou un système à faire évoluer.</p><ActionLink href="/contact">Échangeons</ActionLink><span className="invite-star" aria-hidden="true">✳</span></div></section>; }

export function PageShell({ children, active }: { children: React.ReactNode; active?: string }) { return <><Header active={active} /><main>{children}</main><Invitation /><Footer /></>; }
