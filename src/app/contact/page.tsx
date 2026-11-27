import Image from "next/image";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Eyebrow, PageShell } from "@/components/site";
import styles from "./contact-responsive.module.css";

export const metadata: Metadata = {
  title: "Contacter Ameno Kizele Mwine",
  description:
    "Contacter Ameno Kizele à Kolwezi ou Lubumbashi pour un poste, un projet logiciel ou une collaboration en API, web, Android et systèmes métier.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Ameno Kizele Mwine",
    description: "Échanger au sujet d’un poste, d’un projet logiciel ou d’une collaboration.",
    url: "/contact",
  },
  twitter: { title: "Contact — Ameno Kizele Mwine" },
};

export default function ContactPage() { return <PageShell showInvitation={false}><section className="contact-intro"><Eyebrow>Recrutement · Projet · Collaboration</Eyebrow><h1>Et si on construisait<br />la suite ensemble ?</h1><p>Une équipe à rejoindre ou un projet à construire : parlons du contexte et de la suite.</p></section><section className={`contact-layout section-wash ${styles.contactResponsive}`}><div className="contact-direct"><Image src="/figma-assets/asterisk-orange.svg" alt="" width={64} height={64} /><h2>Bonjour,<br />je suis Ameno.</h2><p>Kolwezi · Lubumbashi / RDC</p><a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com <span>↗</span></a><a href="tel:+243843187952">+243 843 187 952 <span>↗</span></a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a></div><ContactForm /></section></PageShell>; }
