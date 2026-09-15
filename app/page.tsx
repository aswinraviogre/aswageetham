import type { Metadata } from "next";
import { LandingHome } from "@/components/landing/LandingHome";

export const metadata: Metadata = {
  title: "Wedding Invitation | Aswanth & Geethanjali (Ashwageetham)",
  description:
    "Mr. Sivarajan M.M. & Mrs. Rohini Sivarajan cordially invite you with family to the wedding of Aswanth & Geethanjali on Wednesday, 11th November 2026 at The Hill District Club, Kolagapara.",
  openGraph: {
    title: "Aswanth & Geethanjali Wedding Invitation (Ashwageetham)",
    description:
      "Together with our families, we cordially invite you to celebrate our wedding on Wednesday, 11th November 2026 at The Hill District Club, Kolagapara.",
    images: [
      {
        url: "/ashwageetham/theme_card.jpg",
        width: 1200,
        height: 630,
        alt: "Aswanth & Geethanjali Wedding Invitation",
      },
    ],
  },
};

export default function Home() {
  return <LandingHome />;
}
