import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow, PageShell } from "@/components/site";
import styles from "../status-responsive.module.css";

export const metadata: Metadata = {
  title: "Vérifier votre message",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ContactErrorPage() { return <PageShell showInvitation={false}><section className={`status-page status-ready status-contact-error ${styles.responsiveStatus}`}><div className="status-composition"><div className="status-message"><Eyebrow>Votre message</Eyebrow><h1>Encore une petite<br /><em>vérification.</em></h1><p>Renseignez tous les champs, un numéro international valide et un message d’au moins 30 caractères.</p><Link className="pill-button" href="/contact#contact-form"><span>Corriger mon message</span><span className="arrow-disc">↗</span></Link></div><div className="status-illustration"><Image src="/figma-assets/8-3.svg" width={458} height={252} alt="Illustration d’une personne en lévitation" /></div></div></section></PageShell>; }
