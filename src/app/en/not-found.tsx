import Link from "next/link";
import { PageShell, Eyebrow } from "@/components/site";
export default function NotFound() { return <PageShell locale="en" showInvitation={false}><section className="status-page"><Eyebrow>404 · Page not found</Eyebrow><h1>This page<br />isn’t here.</h1><p>The address may have changed or the page may no longer exist.</p><Link className="pill-button" href="/en"><span>Back to home</span><span className="arrow-disc" aria-hidden="true">↗</span></Link></section></PageShell>; }
