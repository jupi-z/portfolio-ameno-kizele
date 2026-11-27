import Image from "next/image";
import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/site";
import styles from "./contact/status-responsive.module.css";

export default function NotFound() { return <PageShell showInvitation={false}><section className={`status-page status-not-found ${styles.responsiveStatus}`}><div className="status-composition"><div className="status-message"><Eyebrow>Erreur 404</Eyebrow><h1>Ce chemin<br /><em>s’est égaré.</em></h1><p>Revenez à l’accueil ou explorez les projets pour poursuivre votre visite.</p><Link className="pill-button" href="/"><span>Retour à l’accueil</span><span className="arrow-disc">↗</span></Link></div><div className="status-illustration status-illustration-404"><Image src="/figma-assets/404-accent.svg" className="status-404-accent" fill alt="" /><Image src="/figma-assets/404-ink.svg" className="status-404-ink" fill alt="" /></div></div></section></PageShell>; }
