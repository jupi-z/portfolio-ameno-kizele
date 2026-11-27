"use client";

import { FormEvent, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/localization";

const allowedSubjects = new Map([["cv", "Demande de CV / CV request"], ["proof-happiguest", "Preuve HappiGuest / HappiGuest evidence"], ["proof-sel-facturation", "Preuve SEL Facturation / SEL Facturation evidence"], ["proof-arkena-core", "Preuve Arkena / Arkena evidence"], ["proof-monarque-connect", "Preuve MonarQue Connect / MonarQue Connect evidence"], ["proof-brice-miaffo", "Preuve Brice Miaffo / Brice Miaffo evidence"], ["proof-tervyn", "Preuve Tervyn / Tervyn evidence"]]);

export function ContactForm({ locale = "fr" }: { locale?: Locale }) {
  const en = locale === "en";
  const search = useSearchParams();
  const querySubject = search.get("subject") ?? "";
  const initialSubject = allowedSubjects.get(querySubject) ?? "";
  const [state, setState] = useState<"idle" | "pending" | "sent" | "fallback" | "error">("idle");
  const [message, setMessage] = useState("");
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { name: data.get("name"), email: data.get("email"), subject: data.get("subject"), message: data.get("message"), website: data.get("website") };
    setState("pending");
    setMessage(en ? "Sending your message…" : "Envoi de votre message…");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (response.ok) {
        setState("sent");
        setMessage(en ? "Your message has been sent." : "Votre message a bien été envoyé.");
        form.reset();
        return;
      }
      if (response.status === 503) {
        const subject = encodeURIComponent(String(payload.subject || (en ? "Portfolio contact" : "Prise de contact")));
        const body = encodeURIComponent(`${en ? "Hello Ameno" : "Bonjour Ameno"},\n\n${payload.message}\n\n${payload.name} · ${payload.email}`);
        setState("fallback");
        setMessage(en ? "Online sending is not configured. Your email app can open a prepared message; nothing has been sent yet." : "L’envoi en ligne n’est pas configuré. Votre messagerie peut ouvrir un message prérempli ; rien n’a encore été envoyé.");
        window.location.href = `mailto:ameno.aton4@gmail.com?subject=${subject}&body=${body}`;
        return;
      }
      setState("error");
      setMessage(en ? "We could not send your message. Your text is still here; please try again or email directly." : "Le message n’a pas pu être envoyé. Votre texte est conservé ; réessayez ou écrivez directement.");
    } catch {
      setState("error");
      setMessage(en ? "We could not reach the sending service. Your text is still here; please try again or email directly." : "Le service d’envoi est inaccessible. Votre texte est conservé ; réessayez ou écrivez directement.");
    } finally {
      submitting.current = false;
    }
  }

  return <form id="contact-form" className="contact-form" onSubmit={submit}>
    <label>{en ? "Your name" : "Votre nom"}<input name="name" autoComplete="name" required maxLength={120} placeholder={en ? "What should I call you?" : "Comment vous appelez-vous ?"} /></label>
    <label>{en ? "Your email" : "Votre e-mail"}<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder={en ? "you@company.com" : "vous@entreprise.com"} /></label>
    <label>{en ? "Subject" : "Objet"}<input name="subject" defaultValue={initialSubject} maxLength={160} placeholder={en ? "Hiring or project" : "Recrutement ou projet"} /></label>
    <label>{en ? "Your message" : "Votre message"}<textarea name="message" rows={5} required minLength={10} maxLength={5000} placeholder={en ? "Context, need and useful information…" : "Le contexte, votre besoin et les informations utiles…"} /></label>
    <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>Leave this field empty<input name="website" autoComplete="off" tabIndex={-1} /></label>
    <p className="form-note">{en ? "Your details are used only to reply to this request. They are not stored by this site." : "Vos coordonnées servent uniquement à répondre à cette demande. Ce site ne les conserve pas."}</p>
    <button className="pill-button pill-blue" type="submit" disabled={state === "pending"}><span>{state === "pending" ? (en ? "Sending…" : "Envoi…") : (en ? "Send message" : "Envoyer le message")}</span><span className="arrow-disc" aria-hidden="true">↗</span></button>
    <p className="form-note" role="status" aria-live="polite">{message || (en ? "A copy of your message is not retained on this site." : "Aucune copie du message n’est conservée sur ce site.")}</p>
    {state === "error" && <p className="form-note"><a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com</a></p>}
  </form>;
}
