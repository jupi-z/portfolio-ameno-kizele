"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/localization";

type DemoSlug = "happiguest" | "arkena-core";

export function SyntheticDemo({ slug, locale = "fr" }: { slug: DemoSlug; locale?: Locale }) {
  const en = locale === "en";
  const [seats, setSeats] = useState("1");
  const [permission, setPermission] = useState("project:read");
  const [result, setResult] = useState<"allowed" | "denied" | null>(null);
  const happiguest = slug === "happiguest";
  const subject = `proof-${slug}`;

  return <section className="synthetic-demo section-wash" aria-labelledby="synthetic-demo-title">
    <div className="synthetic-demo-copy"><span className="case-kicker">{en ? "ILLUSTRATIVE · SYNTHETIC DATA" : "ILLUSTRATION · DONNÉES SYNTHÉTIQUES"}</span><h2 id="synthetic-demo-title">{happiguest ? (en ? "Check remaining capacity." : "Vérifier la capacité restante.") : (en ? "Check a permission." : "Vérifier une permission.")}</h2><p>{happiguest ? (en ? "Example: an invitation has 2 places left. Enter a group size to see the expected business decision." : "Exemple : une invitation a 2 places restantes. Saisissez un nombre de personnes pour voir la décision métier attendue.") : (en ? "Example: a project viewer can read a project, but cannot approve a financial operation." : "Exemple : un lecteur de projet peut lire un projet, mais ne peut pas approuver une opération financière.")}</p></div>
    <div className="synthetic-demo-panel">
      {happiguest ? <form onSubmit={(event) => { event.preventDefault(); setResult(Number(seats) > 0 && Number(seats) <= 2 ? "allowed" : "denied"); }}>
        <label htmlFor="demo-attendees">{en ? "People to admit (2 places left)" : "Personnes à admettre (2 places restantes)"}</label>
        <input id="demo-attendees" name="attendees" type="number" min="1" max="10" value={seats} onChange={(event) => { setSeats(event.target.value); setResult(null); }} required />
        <button className="pill-button pill-blue" type="submit"><span>{en ? "Check capacity" : "Vérifier la capacité"}</span><span className="arrow-disc" aria-hidden="true">↗</span></button>
      </form> : <form onSubmit={(event) => { event.preventDefault(); setResult(permission === "project:read" ? "allowed" : "denied"); }}>
        <label htmlFor="demo-permission">{en ? "Requested permission" : "Permission demandée"}</label>
        <select id="demo-permission" name="permission" value={permission} onChange={(event) => { setPermission(event.target.value); setResult(null); }}><option value="project:read">project:read</option><option value="finance:approve">finance:approve</option></select>
        <button className="pill-button pill-blue" type="submit"><span>{en ? "Check access" : "Vérifier l’accès"}</span><span className="arrow-disc" aria-hidden="true">↗</span></button>
      </form>}
      <p className={`synthetic-demo-result${result ? ` synthetic-demo-result-${result}` : ""}`} role="status" aria-live="polite">{result === "allowed" ? (en ? "ALLOWED · The example rule accepts this request." : "AUTORISÉ · La règle d’exemple accepte cette demande.") : result === "denied" ? (happiguest ? (en ? "409 · Not enough places remain." : "409 · Le nombre de places restantes est insuffisant.") : (en ? "403 · This role does not grant that permission." : "403 · Ce rôle ne possède pas cette permission.")) : (en ? "Run the synthetic scenario to see its result." : "Lancez le scénario synthétique pour voir le résultat.")}</p>
      <p className="synthetic-demo-note">{en ? "Local illustration only. It does not call a product, service or backend and is not a product test." : "Illustration locale uniquement. Elle n’appelle aucun produit, service ou backend et ne constitue pas un test du produit."}</p>
      <Link href={`${locale === "en" ? "/en" : ""}${locale === "en" ? "/projects" : "/projets"}/${slug}#proofs`}>{en ? "View related evidence" : "Voir les preuves associées"}</Link>
      <Link className="synthetic-demo-contact" href={`${locale === "en" ? "/en/contact" : "/contact"}?subject=${subject}`}>{en ? "Request access to private evidence" : "Demander les preuves privées"}</Link>
    </div>
  </section>;
}
