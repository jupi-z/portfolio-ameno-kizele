# Ameno Kizele — Portfolio

Portfolio Next.js reproduisant les écrans desktop et mobile du fichier Figma **Ameno Kizele — Portfolio V2 — Orange — Bleu**.

## Développement

```bash
npm install
npm run dev
```

Pages principales : accueil, projets, six études de cas, parcours, méthode et contact en français et en anglais (`/en`). Le formulaire utilise un transport SMTP côté serveur lorsqu’il est configuré et propose un e-mail prérempli sans prétendre qu’il a été envoyé autrement. Lire [`docs/CONTACT_CONFIGURATION.md`](docs/CONTACT_CONFIGURATION.md) avant de configurer l’envoi et [`docs/PORTFOLIO_EVIDENCE_POLICY.md`](docs/PORTFOLIO_EVIDENCE_POLICY.md) pour les règles sur les preuves des études de cas.

## Quality checks

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

`npm test` runs mocked contact-delivery unit checks and Playwright browser checks against the standalone production build on port 3100. The suite does not send email. CI runs the same checks for the pull request.

## Structure

- `src/app/` — routes Next.js et styles globaux
- `src/components/` — navigation, pied de page, sections partagées et formulaire
- `src/data/projects.ts` — contenu des études de cas
- `public/figma-assets/` — ressources originales exportées de Figma
- `figma-exports/` — 73 planches et composants de référence au format SVG, nommés avec leur identifiant Figma

L’index et les identifiants des exports sont dans [`figma-exports/README.md`](figma-exports/README.md). Les captures SVG sont des documents de référence ; les ressources intégrées au site sont conservées séparément dans `public/figma-assets/`.
