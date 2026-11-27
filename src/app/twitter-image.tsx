import { createSocialCard, socialImageSize } from "@/lib/social-card";

export const alt = "Ameno Kizele Mwine — Software engineer à Kolwezi et Lubumbashi, RDC";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialCard();
}
