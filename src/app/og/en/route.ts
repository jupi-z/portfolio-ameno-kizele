import { createSocialCard } from "@/lib/social-card";

export function GET() {
  return createSocialCard("en");
}
