# Ameno Kizele — Portfolio

Portfolio Next.js reproduisant les écrans desktop et mobile du fichier Figma **Ameno Kizele — Portfolio V2 — Orange — Bleu**.

## Développement

```bash
npm install
npm run dev
```

Pages principales : accueil, projets, six études de cas, parcours, méthode et contact. Le formulaire prépare un e-mail dans le logiciel de messagerie de la personne ; il ne transmet pas les données à un serveur.

## Structure

- `src/app/` — routes Next.js et styles globaux
- `src/components/` — navigation, pied de page, sections partagées et formulaire
- `src/data/projects.ts` — contenu des études de cas
- `public/figma-assets/` — ressources originales exportées de Figma
- `figma-exports/` — 63 planches de référence au format SVG, nommées avec leur identifiant Figma

L’index et les identifiants des exports sont dans [`figma-exports/README.md`](figma-exports/README.md). Les captures SVG sont des documents de référence ; les ressources intégrées au site sont conservées séparément dans `public/figma-assets/`.
