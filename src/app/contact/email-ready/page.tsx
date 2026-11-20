import Image from "next/image";
import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/site";

export default function EmailReadyPage() { return <PageShell><section className="status-page status-ready"><div><Eyebrow>Votre message</Eyebrow><h1>Votre message<br /><em>est prêt.</em></h1><p>Votre application e-mail peut maintenant ouvrir le brouillon prérempli.</p><a className="pill-button" href="mailto:ameno.aton4@gmail.com"><span>Ouvrir ma messagerie</span><span className="arrow-disc">↗</span></a><p className="small-note">Rien ne s’ouvre ? <a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com</a></p><Link className="under-link" href="/">Retour à l’accueil <span>↗</span></Link></div><Image src="/figma-assets/8-3.svg" width={360} height={270} alt="Illustration d’une personne en lévitation" /></section></PageShell>; }
