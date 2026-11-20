import Link from "next/link";
import { Eyebrow, PageShell } from "@/components/site";

export default function NotFound() { return <PageShell><section className="status-page"><Eyebrow>Erreur 404</Eyebrow><h1>Ce chemin<br /><em>s’est égaré.</em></h1><p>Revenez à l’accueil ou explorez les projets pour poursuivre votre visite.</p><Link className="pill-button" href="/"><span>Retour à l’accueil</span><span className="arrow-disc">↗</span></Link></section></PageShell>; }
