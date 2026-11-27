# Contact delivery

The form validates input on the server and sends mail only when all SMTP settings are configured. Without them, the API returns `503 transport_not_configured` and the browser offers an honest prepared-email fallback; it does not claim the message was sent.

Copy `.env.example` to the deployment environment and replace every placeholder with values from an email provider approved by the owner. Keep all values server-side and never use a `NEXT_PUBLIC_` prefix. `CONTACT_FROM` must be a sender accepted by the provider; `CONTACT_TO` is the intended inbox. Use authenticated TLS where the provider supports it.

The handler limits the request size and field lengths, rejects header newlines, validates the email, uses a hidden honeypot and a per-process rate limiter (five requests per 15 minutes). Behind the included Nginx proxy it uses the rightmost `X-Forwarded-For` address, which Nginx appends from its observed peer address. The limiter is intentionally not described as distributed: it resets on process restart and is not shared between workers. Add an approved shared limiter before deploying to a multi-instance environment if this level is insufficient. Message contents are not logged or persisted by this application. SMTP success does not guarantee inbox placement; configure SPF, DKIM and DMARC with the domain owner and verify delivery in the provider's approved test environment before production use.

Automated tests use invalid requests and the unconfigured transport path only. No real email is sent by this repository's tests.
