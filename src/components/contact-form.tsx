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
  const [messageLength, setMessageLength] = useState(0);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = { name: data.get("name"), email: data.get("email"), phone: data.get("phone"), subject: data.get("subject"), message: data.get("message"), locale, website: data.get("website") };
    setState("pending");
    setMessage(en ? "Sending your message…" : "Envoi de votre message…");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
      if (response.ok) {
        setState("sent");
        setMessage(en ? "Your message has been sent." : "Votre message a bien été envoyé.");
        form.reset();
        setMessageLength(0);
        return;
      }
      if (response.status === 503) {
        const mailto = new URLSearchParams({
          cc: "ameno.aton4@gmail.com,ameno.aton4@hotmail.com",
          subject: String(payload.subject || (en ? "Portfolio contact" : "Prise de contact")),
          body: `${en ? "Hello Ameno" : "Bonjour Ameno"},\n\n${payload.message}\n\n${en ? "Name" : "Nom"}: ${payload.name}\n${en ? "Email" : "E-mail"}: ${payload.email}\n${en ? "Phone" : "Téléphone"}: ${payload.phone}`,
        });
        setState("fallback");
        setMessage(en ? "Online sending is not configured. Your email app can open a prepared message; nothing has been sent yet." : "L’envoi en ligne n’est pas configuré. Votre messagerie peut ouvrir un message prérempli ; rien n’a encore été envoyé.");
        window.location.href = `mailto:contact@monarquegrp.com?${mailto}`;
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
    <p className="form-note form-required-note">{en ? "All fields are required. Use an international phone number, including the + country code." : "Tous les champs sont obligatoires. Indiquez le téléphone au format international, avec l’indicatif +."}</p>
    <label>{en ? "Your name" : "Votre nom"}<input name="name" autoComplete="name" required maxLength={120} placeholder={en ? "What should I call you?" : "Comment vous appelez-vous ?"} /></label>
    <label>{en ? "Your email" : "Votre e-mail"}<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder={en ? "you@company.com" : "vous@entreprise.com"} /></label>
    <label>{en ? "Your phone number" : "Votre numéro de téléphone"}<input name="phone" type="tel" inputMode="tel" autoComplete="tel" required maxLength={24} pattern="[+][1-9][0-9 ]{6,22}[0-9]" title={en ? "Enter an international number, e.g. +243 81 234 5678" : "Saisissez un numéro international, par exemple +243 81 234 5678"} placeholder="+243 81 234 5678" /></label>
    <label>{en ? "Subject" : "Objet"}<input name="subject" defaultValue={initialSubject} required maxLength={160} placeholder={en ? "Hiring or project" : "Recrutement ou projet"} /></label>
    <label>{en ? "Your message" : "Votre message"}<textarea name="message" rows={5} required minLength={30} maxLength={5000} aria-describedby="contact-message-hint" onChange={(event) => setMessageLength(event.currentTarget.value.length)} placeholder={en ? "Context, need and useful information…" : "Le contexte, votre besoin et les informations utiles…"} /><span className="contact-message-hint" id="contact-message-hint">{en ? `At least 30 characters · ${messageLength}/5000` : `30 caractères minimum · ${messageLength}/5000`}</span></label>
    <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>Leave this field empty<input name="website" autoComplete="off" tabIndex={-1} /></label>
    <p className="form-note">{en ? "Your details are used only to reply to this request. They are not stored by this site." : "Vos coordonnées servent uniquement à répondre à cette demande. Ce site ne les conserve pas."}</p>
    <button className="pill-button pill-blue" type="submit" disabled={state === "pending"}><span>{state === "pending" ? (en ? "Sending…" : "Envoi…") : (en ? "Send message" : "Envoyer le message")}</span><span className="arrow-disc" aria-hidden="true">↗</span></button>
    <p className="form-note" role="status" aria-live="polite">{message || (en ? "A copy of your message is not retained on this site." : "Aucune copie du message n’est conservée sur ce site.")}</p>
    {state === "error" && <p className="form-note"><a href="mailto:ameno.aton4@gmail.com">ameno.aton4@gmail.com</a></p>}
  </form>;
}
