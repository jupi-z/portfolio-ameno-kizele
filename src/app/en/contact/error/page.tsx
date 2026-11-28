import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow, PageShell } from "@/components/site";
import styles from "../../../(fr)/contact/status-responsive.module.css";
export const metadata: Metadata = { title: "Check your message", robots: { index: false, follow: false, googleBot: { index: false, follow: false } }, alternates: { canonical: "/en/contact/error", languages: { fr: "/contact/error", en: "/en/contact/error" } } };
export default function ContactErrorPage() { return <PageShell locale="en" showInvitation={false}><section className={`status-page status-ready status-contact-error ${styles.responsiveStatus}`}><div className="status-composition"><div className="status-message"><Eyebrow>Your message</Eyebrow><h1>One more<br /><em>quick check.</em></h1><p>Please complete every field, enter a valid international phone number and write at least 30 characters.</p><Link className="pill-button" href="/en/contact#contact-form"><span>Review my message</span><span className="arrow-disc">↗</span></Link></div><div className="status-illustration"><Image src="/figma-assets/8-3.svg" width={458} height={252} alt="A person floating" /></div></div></section></PageShell>; }
