import type { Locale } from "@/lib/localization";

export type ContactEmailInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  locale?: Locale;
};

const copy = {
  fr: {
    preheader: "Nouvelle demande reçue depuis ameno.monarquegrp.com.",
    eyebrow: "NOUVEAU MESSAGE",
    title: "Une nouvelle conversation commence.",
    intro: "Une personne vous a contacté depuis le formulaire de votre portfolio.",
    sender: "EXPÉDITEUR",
    subject: "OBJET DE LA DEMANDE",
    phone: "TÉLÉPHONE",
    message: "SON MESSAGE",
    reply: "Répondre à cette demande",
    date: "Reçue le",
    footer: "Ce message a été transmis par le formulaire de contact d’Ameno Kizele Mwine.",
    privacy: "Les informations sont incluses uniquement pour permettre une réponse à cette demande.",
  },
  en: {
    preheader: "A new enquiry has arrived from ameno.monarquegrp.com.",
    eyebrow: "NEW MESSAGE",
    title: "A new conversation starts here.",
    intro: "Someone contacted you through the contact form on your portfolio.",
    sender: "FROM",
    subject: "ENQUIRY SUBJECT",
    phone: "PHONE",
    message: "THE MESSAGE",
    reply: "Reply to this enquiry",
    date: "Received",
    footer: "This message was sent through Ameno Kizele Mwine’s portfolio contact form.",
    privacy: "The details are included only so you can respond to this enquiry.",
  },
} as const;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]!);
}

export function renderContactEmail(input: ContactEmailInput, receivedAt = new Date()) {
  const locale = input.locale === "en" ? "en" : "fr";
  const text = copy[locale];
  const name = escapeHtml(input.name);
  const address = escapeHtml(input.email);
  const subject = escapeHtml(input.subject);
  const message = escapeHtml(input.message);
  const received = new Intl.DateTimeFormat(locale === "fr" ? "fr-CD" : "en-GB", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Africa/Lubumbashi",
  }).format(receivedAt);
  const replySubject = encodeURIComponent(`${locale === "fr" ? "Re" : "Re"}: ${input.subject}`);
  const replyHref = escapeHtml(`mailto:${input.email}?subject=${replySubject}`);
  const plainText = [
    text.title,
    text.intro,
    "",
    `${text.sender}: ${input.name} <${input.email}>`,
    `${text.phone}: ${input.phone}`,
    `${text.subject}: ${input.subject}`,
    `${text.date}: ${received}`,
    "",
    `${text.message}:`,
    input.message,
    "",
    `${text.reply}: ${`mailto:${input.email}?subject=${replySubject}`}`,
    "",
    "Ameno Kizele Mwine · https://ameno.monarquegrp.com",
  ].join("\n");

  const html = `<!doctype html>
<html lang="${locale}" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>${text.title}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f1f3f5;font-family:Arial,Helvetica,sans-serif;color:#14171c;-webkit-text-size-adjust:100%;">
    <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${text.preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f1f3f5;border-collapse:collapse;width:100%;">
      <tr><td align="center" style="padding:32px 12px;">
        <table role="presentation" width="620" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:620px;border-collapse:separate;border-spacing:0;background-color:#ffffff;border:1px solid #dce0e5;border-radius:20px;overflow:hidden;">
          <tr><td style="padding:26px 32px;background-color:#14171c;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
              <tr>
                <td style="font-size:24px;line-height:30px;font-weight:800;letter-spacing:-1px;color:#ffffff;">ameno<span style="color:#f27635;">.</span></td>
                <td align="right" style="font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.5px;color:#f27635;">${text.eyebrow}</td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:34px 32px 12px;">
            <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;letter-spacing:-.7px;font-weight:700;color:#14171c;">${text.title}</h1>
            <p style="margin:0;font-size:15px;line-height:1.65;color:#616872;">${text.intro}</p>
          </td></tr>
          <tr><td style="padding:20px 32px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
              <tr><td style="padding:14px 0;border-bottom:1px solid #dce0e5;">
                <div style="margin-bottom:5px;font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.2px;color:#285ce6;">${text.sender}</div>
                <div style="font-size:15px;line-height:1.5;font-weight:700;color:#14171c;">${name}</div>
                <div style="font-size:14px;line-height:1.5;color:#616872;word-break:break-word;">${address}</div>
              </td></tr>
              <tr><td style="padding:14px 0;border-bottom:1px solid #dce0e5;">
                <div style="margin-bottom:5px;font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.2px;color:#285ce6;">${text.phone}</div>
                <div style="font-size:15px;line-height:1.5;color:#14171c;"><a href="tel:${escapeHtml(input.phone)}" style="color:#14171c;text-decoration:none;">${escapeHtml(input.phone)}</a></div>
              </td></tr>
              <tr><td style="padding:14px 0;border-bottom:1px solid #dce0e5;">
                <div style="margin-bottom:5px;font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.2px;color:#285ce6;">${text.subject}</div>
                <div style="font-size:15px;line-height:1.5;font-weight:700;color:#14171c;word-break:break-word;">${subject}</div>
              </td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:22px 32px 0;">
            <div style="margin-bottom:9px;font-size:10px;line-height:14px;font-weight:700;letter-spacing:1.2px;color:#285ce6;">${text.message}</div>
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;background-color:#f1f3f5;border-left:4px solid #285ce6;border-radius:4px;">
              <tr><td style="padding:18px 20px;font-size:15px;line-height:1.75;color:#14171c;white-space:pre-wrap;word-break:break-word;">${message}</td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:26px 32px 0;">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="border-collapse:separate;border-spacing:0;">
              <tr><td bgcolor="#285ce6" style="border-radius:999px;background-color:#285ce6;">
                <a href="${replyHref}" style="display:inline-block;padding:14px 22px;color:#ffffff;font-size:14px;line-height:20px;font-weight:700;text-decoration:none;">${text.reply}&nbsp;&nbsp;↗</a>
              </td></tr>
            </table>
          </td></tr>
          <tr><td style="padding:22px 32px 0;font-size:12px;line-height:1.6;color:#616872;">${text.date} ${escapeHtml(received)} · Lubumbashi, RDC</td></tr>
          <tr><td style="padding:28px 32px 30px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;border-top:1px solid #dce0e5;">
              <tr><td style="padding-top:18px;font-size:12px;line-height:1.6;color:#616872;">${text.footer}<br>${text.privacy}</td></tr>
              <tr><td style="padding-top:10px;font-size:11px;line-height:1.5;color:#285ce6;"><a href="https://ameno.monarquegrp.com" style="color:#285ce6;text-decoration:none;">ameno.monarquegrp.com</a></td></tr>
            </table>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { subject: `[Portfolio] ${input.subject}`, text: plainText, html };
}
