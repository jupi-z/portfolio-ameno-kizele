# VPS deployment

The production hostname is `ameno.monarquegrp.com`. The site runs as a standalone
Next.js server on loopback port `3212`, behind Nginx and a Let's Encrypt TLS
certificate. It has its own release directory, service account, systemd unit and
Nginx virtual host; it does not share a web root or listener with another site.

For each release, build with `npm ci && npm run build`, copy the contents of
`.next/standalone` to a new release directory, then copy `public/` and
`.next/static/` into that directory. Point `current` at the complete release,
restart `ameno-portfolio`, and verify the HTTPS homepage, sitemap, robots file,
Open Graph image and `/projets` before considering the release active. Keep the
previous release so `current` can be atomically pointed back if a smoke check
fails.

The Nginx template is `ameno.monarquegrp.com.conf`; the service definition is
`ameno-portfolio.service`. Neither template contains account credentials.
