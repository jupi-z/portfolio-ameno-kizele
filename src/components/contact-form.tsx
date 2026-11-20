"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [ready, setReady] = useState(false);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Prise de contact"));
    const body = encodeURIComponent(`Bonjour Ameno,\n\n${data.get("message")}\n\n${data.get("name")} · ${data.get("email")}`);
    setReady(true);
    window.location.href = `mailto:ameno.aton4@gmail.com?subject=${subject}&body=${body}`;
  }
  return <form id="contact-form" className="contact-form" onSubmit={prepare}><label>Votre nom<input name="name" autoComplete="name" required placeholder="Nom et prénom" /></label><label>Votre e-mail<input name="email" type="email" autoComplete="email" required placeholder="vous@entreprise.com" /></label><label>Objet<select name="subject" defaultValue=""><option value="" disabled>Choisir un sujet</option><option>Recrutement</option><option>Projet</option><option>Collaboration</option><option>Autre</option></select></label><label>Votre message<textarea name="message" rows={5} required placeholder="Parlons de votre besoin…" /></label><button className="pill-button" type="submit"><span>Préparer mon e-mail</span><span className="arrow-disc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M7 6h11v11" /></svg></span></button>{ready && <p className="form-note" role="status">Votre application e-mail va s’ouvrir avec le message préparé.</p>}</form>;
}
