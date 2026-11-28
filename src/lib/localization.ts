export type Locale = "fr" | "en";

export const sharedCopy = {
  fr: {
    navigation: [
      ["home", "Accueil", "/"],
      ["projects", "Projets", "/projets"],
      ["method", "Ma méthode", "/methode"],
      ["journey", "Parcours", "/parcours"],
    ],
    contact: "Échangeons",
    menuLabel: "Ameno Kizele / navigation",
    menuOpen: "Ouvrir le menu",
    menuClose: "Fermer le menu",
    languageLabel: "English",
    footerDescription: ["Software Engineer,", "backend, web & Android."],
    footerProjects: "Les projets",
    footerMethod: "Ma méthode",
    footerJourney: "Mon parcours",
    footerContact: "Contact",
    invitationEyebrow: "Une idée. Un projet. Une conversation.",
    invitationTitle: ["Construisons", "quelque chose d’utile."],
    invitationDescription: "Une équipe à rejoindre, un produit à créer ou un système à faire évoluer.",
    roadmap: [
      ["01", "Comprendre", "Écouter le besoin, identifier les utilisateurs et les contraintes qui comptent."],
      ["02", "Structurer", "Définir les règles métier, les parcours, les données et les contrats."],
      ["03", "Construire", "Développer un ensemble cohérent, des services jusqu’aux interfaces."],
      ["04", "Vérifier & livrer", "Contrôler les parcours et les états, préparer le déploiement et la maintenance."],
    ],
  },
  en: {
    navigation: [
      ["home", "Home", "/en"],
      ["projects", "Projects", "/en/projects"],
      ["method", "Method", "/en/method"],
      ["journey", "Experience", "/en/career"],
    ],
    contact: "Get in touch",
    menuLabel: "Ameno Kizele / navigation",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    languageLabel: "Français",
    footerDescription: ["Software Engineer,", "backend, web & Android."],
    footerProjects: "Projects",
    footerMethod: "Method",
    footerJourney: "Experience",
    footerContact: "Contact",
    invitationEyebrow: "An idea. A project. A conversation.",
    invitationTitle: ["Let’s build", "something useful."],
    invitationDescription: "A team to join, a product to create or a system to improve.",
    roadmap: [
      ["01", "Understand", "Listen to the need, identify the users and clarify the constraints that matter."],
      ["02", "Structure", "Define business rules, journeys, data and contracts."],
      ["03", "Build", "Develop a coherent system, from services through to interfaces."],
      ["04", "Verify & deliver", "Check flows and states, then prepare deployment and maintenance."],
    ],
  },
} as const;

const frToEn = [
  ["/", "/en"],
  ["/projets", "/en/projects"],
  ["/parcours", "/en/career"],
  ["/methode", "/en/method"],
  ["/contact", "/en/contact"],
  ["/contact/email-ready", "/en/contact/email-ready"],
  ["/contact/error", "/en/contact/error"],
] as const;

const enToFr = new Map<string, string>(frToEn.map(([fr, en]) => [en, fr]));

export function localizedPath(pathname: string, from: Locale): string {
  if (from === "fr") {
    const exact = frToEn.find(([fr]) => pathname === fr);
    if (exact) return exact[1];
    if (pathname.startsWith("/projets/")) return pathname.replace(/^\/projets\//, "/en/projects/");
    return `/en${pathname === "/" ? "" : pathname}`;
  }

  const exact = enToFr.get(pathname);
  if (exact) return exact;
  if (pathname.startsWith("/en/projects/")) return pathname.replace(/^\/en\/projects\//, "/projets/");
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function localizedAlternates(frPath: string, enPath: string) {
  return {
    canonical: frPath,
    languages: {
      fr: frPath,
      en: enPath,
      "x-default": frPath,
    },
  };
}
