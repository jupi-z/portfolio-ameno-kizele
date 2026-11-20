import { ContactForm } from "@/components/contact-form";
import { Eyebrow, PageShell } from "@/components/site";

export default function ContactPage() { return <PageShell><section className="contact-layout"><div><Eyebrow>Recrutement · Projet · Collaboration</Eyebrow><h1>Parlons de<br /><em>votre projet.</em></h1><p className="lead">Un besoin à clarifier, une équipe à rejoindre ou un système à faire évoluer ?</p><div className="contact-meta"><span>Kolwezi · Lubumbashi / RDC</span><a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com ↗</a><a href="tel:+243843187952">+243 843 187 952 ↗</a><a href="https://www.linkedin.com/in/ameno-kizele-3b8322360" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div><ContactForm /></section></PageShell>; }
