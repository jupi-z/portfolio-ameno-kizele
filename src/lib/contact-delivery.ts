import nodemailer from "nodemailer";

export type ContactMessage = { name: string; email: string; subject: string; message: string };
export type MailConfig = { host: string; port: number; secure: boolean; auth: { user: string; pass: string }; connectionTimeout: number; greetingTimeout: number; socketTimeout: number };
export type OutgoingMail = { from: string; to: string; replyTo: { name: string; address: string }; subject: string; text: string };
export type MailTransport = { sendMail: (message: OutgoingMail) => Promise<unknown> };
export type DeliveryResult = "sent" | "not_configured" | "invalid_config" | "failed";
export type TransportFactory = (config: MailConfig) => MailTransport;
export type ContactEnv = { SMTP_HOST?: string; SMTP_PORT?: string; SMTP_SECURE?: string; SMTP_USER?: string; SMTP_PASS?: string; CONTACT_TO?: string; CONTACT_FROM?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const createTransport: TransportFactory = (config) => nodemailer.createTransport(config) as MailTransport;

export async function deliverContactMessage(
  message: ContactMessage,
  env: ContactEnv = {
    SMTP_HOST: process.env.SMTP_HOST, SMTP_PORT: process.env.SMTP_PORT, SMTP_SECURE: process.env.SMTP_SECURE,
    SMTP_USER: process.env.SMTP_USER, SMTP_PASS: process.env.SMTP_PASS, CONTACT_TO: process.env.CONTACT_TO, CONTACT_FROM: process.env.CONTACT_FROM,
  },
  makeTransport: TransportFactory = createTransport,
): Promise<DeliveryResult> {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO || !CONTACT_FROM) return "not_configured";
  const port = Number(SMTP_PORT);
  if (!Number.isInteger(port) || port < 1 || port > 65_535 || !emailPattern.test(CONTACT_TO) || !emailPattern.test(CONTACT_FROM)) return "invalid_config";
  try {
    const transport = makeTransport({ host: SMTP_HOST, port, secure: SMTP_SECURE === "true", auth: { user: SMTP_USER, pass: SMTP_PASS }, connectionTimeout: 8_000, greetingTimeout: 8_000, socketTimeout: 12_000 });
    await transport.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: { name: message.name, address: message.email },
      subject: `[Portfolio] ${message.subject}`,
      text: `Name: ${message.name}\nEmail: ${message.email}\n\n${message.message}`,
    });
    return "sent";
  } catch {
    return "failed";
  }
}
