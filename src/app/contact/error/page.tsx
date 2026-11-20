import Image from "next/image";
import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/site";

export default function ContactErrorPage() { return <PageShell><section className="status-page status-ready"><div><Eyebrow>Votre message</Eyebrow><h1>Encore une petite<br /><em>vérification.</em></h1><p>Renseignez votre nom, une adresse e-mail valide et votre message.</p><Link className="pill-button" href="/contact#contact-form"><span>Corriger mon message</span><span className="arrow-disc">↗</span></Link></div><Image src="/figma-assets/8-3.svg" width={458} height={252} alt="Illustration d’une personne en lévitation" /></section></PageShell>; }
