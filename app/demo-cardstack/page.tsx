"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import Link from "next/link";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Instant RSVP Tracking",
    description: "Say goodbye to tracking post mail. Guests can RSVP in one click, select meals, and update headcount in real-time.",
    imageSrc: "/wedding_card_2.png",
    href: "/",
  },
  {
    id: 2,
    title: "Beautiful Storytelling",
    description: "Share your love story, wedding schedule, and registry all in one sophisticated digital home tailored to your aesthetic.",
    imageSrc: "/wedding_card_1.png",
    href: "/",
  },
  {
    id: 3,
    title: "Shared Photo Memories",
    description: "Let guests upload photos directly to your live website gallery during the reception, saving memories forever.",
    imageSrc: "/wedding_card_3.png",
    href: "/",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="min-h-screen bg-[#050010] text-white py-16 px-6 sm:px-8 relative overflow-hidden flex flex-col justify-between">
      {/* Background glow orbs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition mb-6 font-semibold">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Importance of a <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Wedding Website</span>
          </h1>
          <p className="text-purple-200/60 max-w-md mx-auto text-sm sm:text-base leading-relaxed tracking-wide font-medium px-4" style={{ maxWidth: "480px" }}>
            Slide through the cards below to see why a digital invitation changes the wedding experience.
          </p>
        </div>

        {/* Card Stack Display */}
        <div className="w-full max-w-2xl mt-4">
          <CardStack
            items={items}
            initialIndex={0}
            autoAdvance
            intervalMs={3000}
            pauseOnHover
            showDots
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-purple-300/40 mt-16">
        © 2025 Save The Date. All rights reserved.
      </footer>
    </div>
  );
}
