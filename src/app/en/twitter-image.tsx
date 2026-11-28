import { createSocialCard, socialImageSize } from "@/lib/social-card";
export const alt = "Ameno Kizele Mwine — Software Engineer in Kolwezi and Lubumbashi, DR Congo";
export const size = socialImageSize;
export const contentType = "image/png";
export default function TwitterImage() { return createSocialCard("en"); }
