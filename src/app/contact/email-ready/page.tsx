import Image from "next/image";
import type { Metadata } from "next";
import { Eyebrow, PageShell } from "@/components/site";
import styles from "../status-responsive.module.css";

export const metadata: Metadata = {
  title: "Votre message est prêt",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function EmailReadyPage() { return <PageShell showInvitation={false}><section className={`status-page status-ready status-email-ready ${styles.responsiveStatus}`}><div className="status-composition"><div className="status-message"><Eyebrow>Votre message</Eyebrow><h1>Votre message<br /><em>est prêt.</em></h1><p>Ouvrez votre messagerie pour relire et envoyer votre e-mail. Rien n’a été envoyé automatiquement.</p><a className="pill-button" href="mailto:ameno.aton4@gmail.com"><span>Ouvrir ma messagerie</span><span className="arrow-disc">↗</span></a><p className="small-note"><span>Rien ne s’ouvre ?</span><a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com</a></p></div><div className="status-illustration"><Image src="/figma-assets/8-3.svg" width={458} height={252} alt="Illustration d’une personne en lévitation" /></div></div></section></PageShell>; }
