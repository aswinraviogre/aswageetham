"use client";

import React, { useState, useEffect, useRef } from "react";
import type { InviteData } from "@/data/invites";

// ---------------------------------------------------------------------------
// 1. EMBOSSED BOTANICAL 3D GOLD WAX SEAL (RETAINED FOR EXPORTS)
// ---------------------------------------------------------------------------
export const BotanicalWaxSealSVG = ({
  className = "",
  size = 84,
}: {
  className?: string;
  size?: number;
}) => (
  <div
    className={`relative select-none flex items-center justify-center ${className}`}
    style={{
      width: size,
      height: size,
      filter:
        "drop-shadow(0 14px 24px rgba(22, 14, 6, 0.6)) drop-shadow(0 4px 8px rgba(0,0,0,0.35))",
    }}
  >
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full overflow-visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sealWaxGrad" cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#FFF4C4" />
          <stop offset="16%" stopColor="#E8C365" />
          <stop offset="42%" stopColor="#C89736" />
          <stop offset="70%" stopColor="#96671B" />
          <stop offset="90%" stopColor="#63400A" />
          <stop offset="100%" stopColor="#3B2303" />
        </radialGradient>
        <linearGradient id="sealRimGlint" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#FFFADB" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#D9AB45" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#4A2F08" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F9E298" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="sealEmbossGold" x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#FFFCE8" />
          <stop offset="40%" stopColor="#DFC06A" />
          <stop offset="75%" stopColor="#8A5D13" />
          <stop offset="100%" stopColor="#4D3106" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="43.5" fill="url(#sealWaxGrad)" />
      <circle cx="60" cy="60" r="42.5" stroke="url(#sealRimGlint)" strokeWidth="3.2" strokeOpacity="0.85" />
    </svg>
  </div>
);

// ---------------------------------------------------------------------------
// 2. AUSPICIOUS GANESHA INVOCATION SVG
// ---------------------------------------------------------------------------
const GaneshaIconSVG = ({ className = "w-9 h-9 text-[#7C1425]" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className}>
    <path d="M50 8 C42 8 36 14 36 22 C36 26 38 29 41 31 C35 34 30 40 30 48 C30 55 34 61 40 64 C35 68 31 74 31 82 C31 84 33 86 35 86 C37 86 39 84 39 82 C39 76 44 71 50 71 C56 71 61 76 61 82 C61 84 63 86 65 86 C67 86 69 84 69 82 C69 74 65 68 60 64 C66 61 70 55 70 48 C70 40 65 34 59 31 C62 29 64 26 64 22 C64 14 58 8 50 8 Z M50 14 C54 14 58 18 58 22 C58 26 54 30 50 30 C46 30 42 26 42 22 C42 18 46 14 50 14 Z M50 36 C57 36 63 41 63 48 C63 55 57 60 50 60 C43 60 37 55 37 48 C37 41 43 36 50 36 Z" opacity="0.9" />
    <circle cx="50" cy="22" r="3" fill="#D4AF37" />
    <path d="M48 42 Q50 48 52 42 Q54 48 52 54" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

// ---------------------------------------------------------------------------
// 3. PETAL TYPES FOR CELEBRATION
// ---------------------------------------------------------------------------
interface PetalParticle {
  id: number;
  type: "rose" | "jasmine" | "gold";
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

// ---------------------------------------------------------------------------
// 4. MAIN COMPONENT: ASWGEE RESPONSIVE SCREEN-FITTED THEME
// ---------------------------------------------------------------------------
export function AswgeeTheme({ invite }: { invite?: InviteData }) {
  // Animation phases: "idle" | "pressing" | "unsealing" | "unfolding" | "sliding" | "revealing" | "revealed"
  const [phase, setPhase] = useState<
    "idle" | "pressing" | "unsealing" | "unfolding" | "sliding" | "revealing" | "revealed"
  >("idle");

  // Artwork switcher for left showcase panel
  const [leftArtwork, setLeftArtwork] = useState<"portrait" | "adiyogi">("portrait");

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Celebratory petals state
  const [petals, setPetals] = useState<PetalParticle[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Target date: Wednesday, Nov 11, 2026, 11:00:00 AM IST
  useEffect(() => {
    const target = new Date("2026-11-11T11:00:00+05:30").getTime();
    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }
      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  // Continuous background audio trigger (starts on mount or first user interaction)
  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked until gesture
          });
      }
    };

    // Attempt immediate play
    playAudio();

    // Trigger on first click / tap anywhere
    const onUserInteraction = () => {
      playAudio();
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };

    window.addEventListener("click", onUserInteraction, { once: true });
    window.addEventListener("touchstart", onUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };
  }, []);

  // Audio toggle
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play failed:", err));
    }
  };

  // Trigger petal shower
  const triggerShower = (count = 32) => {
    const types: ("rose" | "jasmine" | "gold")[] = ["rose", "jasmine", "gold"];
    const newPetals: PetalParticle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      type: types[Math.floor(Math.random() * types.length)],
      left: Math.random() * 100,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 3.5 + 4,
      delay: Math.random() * 0.4,
      swayDuration: Math.random() * 1.5 + 2,
    }));
    setPetals((prev) => [...prev.slice(-40), ...newPetals]);
    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => !newPetals.includes(p)));
    }, 7000);
  };

  // Toast helper
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Realistic Physical Opening Interaction
  const handleOpenEnvelope = () => {
    if (phase !== "idle") return;

    // 1. Tactile Press Response & Audio Playback
    setPhase("pressing");

    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play allowed on gesture:", e));
    }

    // 2. Unseal & Wax Seal Lift
    setTimeout(() => {
      setPhase("unsealing");
    }, 120);

    // 3. 3D Flaps Unfold (Top, Bottom, Left)
    setTimeout(() => {
      setPhase("unfolding");
      triggerShower(24);
    }, 380);

    // 4. Inner Card Floats & Slides Forward
    setTimeout(() => {
      setPhase("sliding");
      triggerShower(30);
    }, 1100);

    // 5. Expand & Transition to Full Screen
    setTimeout(() => {
      setPhase("revealing");
    }, 1900);

    // 6. Complete Reveal of Interactive Page
    setTimeout(() => {
      setPhase("revealed");
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 2450);
  };

  // WhatsApp Share Button handler
  const handleWhatsappShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareMessage = `Together with our families, we cordially invite you to celebrate our special day on Wednesday, 11th November 2026. View our interactive wedding invitation card here: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // WhatsApp RSVP link directly to family
  const getWhatsAppRsvpUrl = () => {
    const phone = invite?.phone || "917356558475";
    const msg = encodeURIComponent(
      "Namaste! 🙏\n\nWe are delighted to receive the wedding invitation of ASWANTH & GEETHANJALI on Wednesday, 11th November 2026 at The Hill District Club, Kolagapara.\n\nWe will be honored to attend and offer our blessings to the couple! 🌸"
    );
    return `https://wa.me/${phone}?text=${msg}`;
  };

  // ICS Calendar download
  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Aswanth Geethanjali Wedding//EN",
      "BEGIN:VEVENT",
      "UID:aswgee-20261111@save-the-date",
      "DTSTAMP:20261111T000000Z",
      "DTSTART:20261111T053000Z",
      "DTEND:20261111T093000Z",
      "SUMMARY:Wedding of Aswanth & Geethanjali (Ashwageetham)",
      "DESCRIPTION:Thalikettu Ceremony at The Hill District Club\\, Kolagapara. Muhurtham: 11:00 AM - 12:00 NOON.",
      "LOCATION:The Hill District Club\\, Kolagapara\\, Wayanad\\, Kerala",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Aswanth_Geethanjali_Wedding.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("📅 Wedding event downloaded to calendar!");
  };

  const isClosed = phase !== "revealed";

  return (
    <div className="aswgee-universe relative min-h-screen w-full overflow-x-hidden select-none bg-[#FAF6EE] text-[#2C241E]">
      {/* ----------------------------------------------------------------- */}
      {/* GOOGLE FONTS & STYLESHEETS                                        */}
      {/* ----------------------------------------------------------------- */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Background Wedding Audio (Continuously Looping) */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/music/ashwageetham_bgm.mp3" type="audio/mp3" />
        <source src="/music/ashwageetham_bgm.mpeg" type="audio/mpeg" />
      </audio>

      {/* Floating Celebratory Petals Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute animate-petal-flutter"
            style={{
              left: `${p.left}%`,
              top: "-40px",
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            <div
              className="animate-petal-sway"
              style={{ animationDuration: `${p.swayDuration}s` }}
            >
              {p.type === "rose" && (
                <svg width={p.size} height={p.size} viewBox="0 0 30 30" fill="none">
                  <path
                    d="M15 2C10 2 3 9 3 17C3 23 8 28 15 28C22 28 27 23 27 17C27 9 20 2 15 2Z"
                    fill="#7C1425"
                    opacity="0.88"
                  />
                  <path
                    d="M15 6C12 6 7 11 7 17C7 21 11 25 15 25C19 25 23 21 23 17C23 11 18 6 15 6Z"
                    fill="#9B1D36"
                    opacity="0.92"
                  />
                </svg>
              )}
              {p.type === "jasmine" && (
                <svg width={p.size * 0.95} height={p.size * 0.95} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C10 7 7 10 2 12C7 14 10 17 12 22C14 17 17 14 22 12C17 10 14 7 12 2Z"
                    fill="#FFFDF8"
                    stroke="#D4AF37"
                    strokeWidth="0.6"
                  />
                  <circle cx="12" cy="12" r="2" fill="#D4AF37" />
                </svg>
              )}
              {p.type === "gold" && (
                <div
                  style={{ width: p.size * 0.6, height: p.size * 0.6 }}
                  className="rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF2B2] to-[#AA820A] shadow-sm animate-pulse"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 inset-x-0 z-[110] flex justify-center px-4 pointer-events-none">
          <div className="pointer-events-auto max-w-sm px-5 py-2.5 rounded-full bg-[#27150C]/95 text-[#FDF8EE] border border-[#D4AF37] shadow-xl text-xs sm:text-sm font-serif text-center backdrop-blur-md animate-toast">
            {toast}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CLOSED ENVELOPE STAGE (RESPONSIVE & SCREEN-FITTED)                     */}
      {/* ========================================================================= */}
      {isClosed && (
        <div
          className={`fixed inset-0 z-40 flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ${
            phase === "revealing" ? "opacity-0 scale-105 pointer-events-none" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, #9E8166 0%, #7A5F47 40%, #523D2D 75%, #342419 100%)",
          }}
        >
          {/* Ambient blurred extension of the table photograph */}
          <div
            className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
            style={{
              backgroundImage: "url('/ashwageetham/envelope_closed.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(65px) brightness(0.55)",
              transform: "scale(1.15)",
            }}
          />

          {/* Natural directional sunlight ray across the table surface */}
          <div
            className="absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-soft-light"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,248,220,0.9) 0%, rgba(255,240,200,0.4) 40%, transparent 80%)",
            }}
          />

          {/* 3D PERSPECTIVE SCENE WRAPPER (Screen-Fitted) */}
          <div
            className="relative z-10 flex flex-col items-center justify-center p-2 sm:p-4 max-h-[100dvh]"
            style={{
              perspective: "1600px",
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Contact Shadow beneath the entire tabletop scene */}
            <div
              className={`absolute bottom-[-16px] w-[88%] max-w-[400px] h-[32px] rounded-full blur-2xl pointer-events-none transition-all duration-700 ${
                phase === "idle"
                  ? "bg-[#160B04]/75 animate-envelope-shadow"
                  : "bg-[#160B04]/40 scale-95"
              }`}
            />

            {/* THE SCENE CONTAINER: Perfectly Scaled to Fit Short and Tall Viewports */}
            <div
              onClick={handleOpenEnvelope}
              className={`relative w-[min(90vw,410px)] max-h-[min(82vh,620px)] aspect-[576/1024] cursor-pointer select-none overflow-visible transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
                phase === "idle"
                  ? "animate-envelope-float hover:scale-[1.015]"
                  : phase === "pressing"
                  ? "scale-[0.985] translate-y-1"
                  : phase === "sliding"
                  ? "scale-[1.03]"
                  : "scale-100"
              }`}
              style={{
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 25px 55px rgba(18, 10, 5, 0.75))",
              }}
            >
              {/* BASE PHOTO LAYER: Authentic table scene with flowers, silk cloth & petals */}
              <img
                src="/ashwageetham/envelope_closed.jpg"
                alt="Luxury Wedding Invitation Envelope"
                className="absolute inset-0 w-full h-full object-cover rounded-xl pointer-events-none select-none z-0"
              />

              {/* THE CARD CONTAINER */}
              <div
                className="absolute z-10"
                style={{
                  left: "4.69%",
                  top: "6.93%",
                  width: "94.10%",
                  height: "86.13%",
                  transformStyle: "preserve-3d",
                }}
              >
                {/* 1. BACK INTERIOR WALL of Envelope */}
                <div
                  className="absolute inset-0 rounded-sm z-0 overflow-hidden shadow-inner"
                  style={{
                    backgroundImage: "url('/ashwageetham/dark_texture.jpg')",
                    backgroundSize: "cover",
                    backgroundColor: "#161514",
                  }}
                />

                {/* 2. INNER INVITATION CARD (Sliding Up with Ashwageetham Branding) */}
                <div
                  className={`absolute inset-x-2 sm:inset-x-3 top-2 rounded-xl bg-[#FAF6EE] border border-[#D4AF37]/75 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 overflow-hidden flex flex-col items-center justify-between p-3 sm:p-4 text-center ${
                    phase === "sliding" || phase === "revealing"
                      ? "-translate-y-28 sm:-translate-y-36 translate-z-30 scale-[1.04] shadow-[0_35px_80px_rgba(15,8,4,0.7)]"
                      : phase === "unfolding"
                      ? "translate-y-0 translate-z-10 scale-[1.01] shadow-[0_20px_45px_rgba(15,8,4,0.4)]"
                      : "translate-y-0 scale-100 shadow-sm"
                  }`}
                  style={{
                    height: "94%",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Top Monogram & Ashwageetham Calligraphy Branding */}
                  <div className="w-full flex flex-col items-center pt-0.5">
                    <img
                      src="/ashwageetham/ashwageetham_title.png"
                      alt="Ashwageetham"
                      className="h-5 sm:h-6 object-contain mb-1 drop-shadow-sm"
                    />
                    <span className="font-['Cinzel'] text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-[#8C6D23] font-bold">
                      Save The Date
                    </span>
                    <h3 className="font-['Alex_Brush'] text-xl sm:text-2xl text-[#1E1916] my-0.5 leading-none">
                      Aswanth & Geethanjali
                    </h3>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-0.5" />
                    <p className="font-serif text-[10px] sm:text-[11px] text-[#5C4A3A] font-medium">
                      Wednesday, November 11, 2026
                    </p>
                    <p className="font-serif text-[9px] text-[#78614E] italic">
                      The Hill District Club, Kolagapara
                    </p>
                  </div>

                  {/* Couple Pencil Sketch Portrait */}
                  <div className="w-full aspect-[16/11] rounded-md overflow-hidden border border-[#D4AF37]/50 shadow-md bg-[#ECE4D5] my-1.5">
                    <img
                      src="/ashwageetham/aswanth_geethanjali_sketch.jpg"
                      alt="Aswanth & Geethanjali"
                      className="w-full h-full object-cover object-top filter contrast-[1.03]"
                    />
                  </div>

                  {/* Bottom Auspicious Muhurtham Note */}
                  <div className="w-full py-1.5 px-2 bg-[#F3EDE2] rounded border border-[#D4AF37]/35 flex items-center justify-between text-[9px] sm:text-[10px] text-[#2E1E14]">
                    <span className="font-['Cinzel'] tracking-wider uppercase font-semibold text-[#78614E]">
                      Muhurtham
                    </span>
                    <span className="font-sans font-bold text-[#7C1425]">
                      11:00 AM - 12:00 NOON
                    </span>
                  </div>
                </div>

                {/* 3. ENVELOPE FRONT POCKET */}
                <div className="absolute inset-0 z-20 pointer-events-none">
                  <img
                    src="/ashwageetham/envelope_pocket.png"
                    alt="Envelope Pocket"
                    className="w-full h-full object-fill"
                  />
                </div>

                {/* 4. 3D TOP FLAP */}
                <div
                  className="absolute top-0 inset-x-0 z-30 pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                  style={{
                    height: "48.75%",
                    transformOrigin: "50% 0%",
                    transformStyle: "preserve-3d",
                    transform:
                      phase === "unfolding" || phase === "sliding" || phase === "revealing"
                        ? "rotateX(180deg)"
                        : "rotateX(0deg)",
                  }}
                >
                  <img
                    src="/ashwageetham/top_flap_front.png"
                    alt="Envelope Top Flap"
                    className="absolute inset-0 w-full h-full object-fill"
                    style={{
                      backfaceVisibility: "hidden",
                      filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))",
                    }}
                  />
                  <img
                    src="/ashwageetham/top_flap_back.png"
                    alt="Envelope Top Flap Open"
                    className="absolute inset-0 w-full h-full object-fill"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateX(180deg)",
                      filter: "drop-shadow(0 -6px 12px rgba(0,0,0,0.25))",
                    }}
                  />
                </div>

                {/* 5. WAX SEAL */}
                <div
                  className={`absolute z-40 transition-all duration-600 ease-[cubic-bezier(0.2,0.8,0.2,1)] pointer-events-none ${
                    phase === "pressing"
                      ? "scale-[0.94]"
                      : phase === "unsealing" ||
                        phase === "unfolding" ||
                        phase === "sliding" ||
                        phase === "revealing"
                      ? "scale-[1.26] -translate-y-10 translate-z-30 opacity-0 rotate-[6deg]"
                      : "scale-100"
                  }`}
                  style={{
                    left: "50.28%",
                    top: "48.70%",
                    width: "23%",
                    aspectRatio: "119/137",
                    transform: "translate(-50%, -50%)",
                    filter:
                      "drop-shadow(0 14px 22px rgba(22, 14, 6, 0.65)) drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
                  }}
                >
                  <img
                    src="/ashwageetham/seal_perfect.png"
                    alt="Embossed Gold Botanical Wax Seal"
                    className="w-full h-full object-contain pointer-events-none select-none"
                  />
                  {phase === "idle" && (
                    <div className="absolute inset-[-4px] rounded-full border border-[#FFE082]/70 animate-ping opacity-35" />
                  )}
                </div>
              </div>
            </div>

            {/* ELEGANT "TAP TO OPEN" PROMPT */}
            {phase === "idle" && (
              <div className="mt-3 sm:mt-5 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 z-30">
                <span className="font-['Cinzel'] tracking-[0.38em] uppercase text-xs sm:text-[13px] text-[#2D1B0E] font-bold animate-pulse drop-shadow-sm">
                  Tap to Open
                </span>
                <div className="w-12 h-[1.5px] bg-[#8B6D51]/75 mt-1.5" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REVEALED INVITATION: FULLY RESPONSIVE SCREEN-FITTED DUAL LAYOUT        */}
      {/* ========================================================================= */}
      {!isClosed && (
        <div className="relative min-h-screen w-full bg-[#FAF6EE] text-[#2C241E] animate-fade-in-up">
          {/* Top Sticky Navigation Bar */}
          <header className="fixed top-3 inset-x-0 z-40 px-3 sm:px-6 flex items-center justify-between pointer-events-none max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-2 pointer-events-auto">
              {/* Replay Envelope Button */}
              <button
                onClick={() => {
                  setPhase("idle");
                  window.scrollTo({ top: 0, behavior: "instant" });
                }}
                className="bg-[#FAF5EA]/90 backdrop-blur-md text-[#580F1E] px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#FAF5EA] transition-all border border-[#D4AF37]/40 text-xs shadow-md group hover:scale-105"
                title="Replay Envelope Opening"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span className="font-sans font-medium hidden sm:inline">Envelope</span>
              </button>
            </div>

            {/* Music Equalizer / Player Toggle */}
            <button
              onClick={toggleAudio}
              aria-label="Toggle Background Music"
              className="pointer-events-auto p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#FAF5EA]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[#580F1E] shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
            >
              {isPlaying ? (
                <div className="flex items-center gap-1.5">
                  <div className="flex items-end gap-[2px] h-3 w-3.5">
                    <span className="w-[2.5px] bg-[#580F1E] rounded-full animate-music-bar-1 h-1.5" />
                    <span className="w-[2.5px] bg-[#580F1E] rounded-full animate-music-bar-2 h-3" />
                    <span className="w-[2.5px] bg-[#580F1E] rounded-full animate-music-bar-3 h-2" />
                  </div>
                  <span className="text-[11px] font-sans font-bold tracking-wider text-[#580F1E] hidden sm:inline">
                    MUSIC ON
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-[#580F1E]">
                    music_off
                  </span>
                  <span className="text-[11px] font-sans font-semibold tracking-wider text-[#7A695B] hidden sm:inline">
                    PLAY MUSIC
                  </span>
                </div>
              )}
            </button>
          </header>

          {/* Floating WhatsApp Share Button */}
          <div className="floating-share">
            <button
              type="button"
              onClick={handleWhatsappShare}
              className="share-toggle-btn"
              title="Share on WhatsApp"
              aria-label="Share Invitation on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </button>
          </div>

          {/* MAIN SCREEN-FITTED CONTAINER: RESPONSIVE DUAL-COLUMN ON DESKTOP, FLUID STREAM ON MOBILE */}
          <div className="w-full min-h-screen flex flex-col lg:flex-row items-stretch justify-center relative">
            
            {/* ------------------------------------------------------------- */}
            {/* ------------------------------------------------------------- */}
            {/* DESKTOP LEFT SHOWCASE PANEL (FIXED 100vh VIEWPORT FIT - FULL SCREEN FILL) */}
            {/* ------------------------------------------------------------- */}
            <aside className="hidden lg:flex lg:w-[48%] xl:w-[45%] h-screen sticky top-0 flex-col items-center justify-between relative overflow-hidden bg-gradient-to-b from-[#FAF6EE] via-[#F4ECE1] to-[#EFE4D2] border-r border-[#D4AF37]/40 shadow-2xl select-none group">
              {/* Subtle background ornamentation */}
              <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* FULL BLEED SCREEN-FILLING ARTWORK */}
              <div className="absolute inset-0 w-full h-full">
                {leftArtwork === "portrait" ? (
                  <img
                    src="/ashwageetham/aswanth_geethanjali_sketch_feathered.png"
                    alt="Wedding Portrait of Aswanth and Geethanjali"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src="/ashwageetham/adiyogi_sketch_feathered.png"
                    alt="Aswanth & Geethanjali before Adiyogi Shiva"
                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.01] transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              {/* Top: Chariot & Royal Procession Artwork with Soft Vignette */}
              <div className="relative z-10 w-full flex flex-col items-center pt-6 pb-8 px-6 bg-gradient-to-b from-[#FAF6EE]/95 via-[#FAF6EE]/60 to-transparent pointer-events-none">
                <img
                  src="/ashwageetham/chariot_procession.png"
                  alt="Royal Wedding Procession"
                  className="w-full max-w-[300px] xl:max-w-[340px] object-contain drop-shadow-sm filter contrast-[1.03] transition-transform duration-700 hover:scale-105 pointer-events-auto"
                />

                {/* Stylized "ashwageetham" calligraphy */}
                <div className="my-1.5 flex flex-col items-center pointer-events-auto">
                  <img
                    src="/ashwageetham/ashwageetham_title.png"
                    alt="Ashwageetham"
                    className="h-7 xl:h-9 object-contain drop-shadow-[0_2px_10px_rgba(122,28,46,0.22)]"
                  />
                  <span className="font-['Cinzel'] tracking-[0.4em] text-[#7C1425] text-[10px] xl:text-xs font-bold uppercase mt-1">
                    11 . 11 . 2026
                  </span>
                </div>
              </div>

              {/* Bottom: Switcher Pills, Couple Names & Traditional Border */}
              <div className="relative z-10 w-full flex flex-col items-center pt-10 pb-4 px-6 bg-gradient-to-t from-[#201007]/90 via-[#201007]/45 to-transparent">
                {/* Switcher Pills */}
                <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#FAF6EE]/90 backdrop-blur-md border border-[#D4AF37]/60 mb-2 shadow-md">
                  <button
                    type="button"
                    onClick={() => setLeftArtwork("portrait")}
                    className={`px-3.5 py-1 rounded-full text-[10px] xl:text-[11px] font-['Cinzel'] tracking-wider uppercase font-bold transition-all ${
                      leftArtwork === "portrait"
                        ? "bg-[#7C1425] text-[#FAF6EE] shadow-sm"
                        : "text-[#6A5340] hover:text-[#1E1916]"
                    }`}
                  >
                    Wedding Portrait
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeftArtwork("adiyogi")}
                    className={`px-3.5 py-1 rounded-full text-[10px] xl:text-[11px] font-['Cinzel'] tracking-wider uppercase font-bold transition-all ${
                      leftArtwork === "adiyogi"
                        ? "bg-[#7C1425] text-[#FAF6EE] shadow-sm"
                        : "text-[#6A5340] hover:text-[#1E1916]"
                    }`}
                  >
                    Adiyogi Grace
                  </button>
                </div>

                {leftArtwork === "portrait" ? (
                  <p className="font-['Alex_Brush'] text-3xl xl:text-4xl text-[#FAF6EE] drop-shadow-md mb-1.5">
                    Aswanth & Geethanjali
                  </p>
                ) : (
                  <p className="font-['Cormorant_Garamond'] italic font-semibold text-xl xl:text-2xl text-[#FAF6EE] drop-shadow-md mb-1.5">
                    Under Adiyogi&apos;s Grace
                  </p>
                )}

                {/* Bottom: Traditional Floral Border Banner */}
                <div className="w-full max-w-[360px] pt-1">
                  <img
                    src="/ashwageetham/ashwageetham_border.png"
                    alt="Traditional Floral Border"
                    className="w-full h-7 object-cover rounded shadow-sm border border-[#D4AF37]/50"
                  />
                </div>
              </div>
            </aside>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT PANEL / MAIN EDITORIAL CARD STREAM                      */}
            {/* ------------------------------------------------------------- */}
            <main className="w-full lg:w-[52%] xl:w-[55%] min-h-screen lg:overflow-y-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-16 flex flex-col items-center bg-[#FFFDF9] relative">
              <article className="w-full max-w-[520px] mx-auto flex flex-col items-center text-center">

                {/* MOBILE HERO: ARTWORK & COUPLE SKETCH (VISIBLE ON MOBILE & TABLET ONLY) */}
                <div className="block lg:hidden w-full mb-6 flex flex-col items-center">
                  {/* 1. Chariot Procession Artwork */}
                  <div className="w-full flex flex-col items-center pt-2 pb-3">
                    <img
                      src="/ashwageetham/chariot_procession.png"
                      alt="Royal Wedding Procession"
                      className="w-full max-w-[340px] sm:max-w-[380px] object-contain drop-shadow-sm filter contrast-[1.03]"
                    />

                    {/* Stylized "ashwageetham" calligraphy & date */}
                    <div className="my-2.5 flex flex-col items-center">
                      <img
                        src="/ashwageetham/ashwageetham_title.png"
                        alt="Ashwageetham"
                        className="h-8 sm:h-9 object-contain drop-shadow-[0_2px_8px_rgba(122,28,46,0.2)]"
                      />
                      <span className="font-['Cinzel'] tracking-[0.38em] text-[#7C1425] text-[11px] sm:text-xs font-bold uppercase mt-1.5">
                        11 . 11 . 2026
                      </span>
                    </div>
                  </div>

                  {/* 2. Wedding Portrait - Clean, Full-Width & Seamlessly Feathered (Zero Overlap) */}
                  <div
                    className="w-full max-w-[420px] sm:max-w-[460px] aspect-[768/1364] relative mx-auto my-2 select-none flex items-center justify-center overflow-hidden"
                    style={{
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 68%, rgba(0,0,0,0) 98%)",
                    }}
                  >
                    <img
                      src="/ashwageetham/aswanth_geethanjali_sketch_feathered.png"
                      alt="Wedding Portrait of Aswanth and Geethanjali"
                      className="w-full h-full object-contain object-top filter contrast-[1.03] brightness-[1.01]"
                    />
                    {/* Seamless Bottom Feathering Gradient Overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-[#FFFDF9] via-[#FFFDF9]/85 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* AUSPICIOUS GANESHA INVOCATION EMBLEM */}
                <div className="flex flex-col items-center mb-4 mt-2">
                  <GaneshaIconSVG className="w-9 h-9 text-[#7C1425] mb-1.5 drop-shadow-sm" />
                  <div className="w-16 h-[1.2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
                </div>

                {/* EDITORIAL INVITATION HEADINGS */}
                <div className="flex flex-col items-center w-full">
                  <h1 className="font-['Alex_Brush'] text-5xl sm:text-6xl text-[#1E1916] leading-none mb-2 select-none">
                    our Wedding
                  </h1>

                  <p className="font-['Cinzel'] text-[11px] sm:text-xs tracking-[0.32em] uppercase text-[#7A6044] font-semibold mb-3">
                    Together With Their Families
                  </p>

                  {/* Couple Names in Romantic Script */}
                  <div className="my-1">
                    <h2 className="font-['Cormorant_Garamond'] font-semibold italic text-3xl sm:text-4xl text-[#7C1425] tracking-wide leading-tight">
                      Aswanth & Geethanjali
                    </h2>
                  </div>

                  <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent my-3.5" />
                </div>

                {/* FORMAL INVITATION WORDING */}
                <div className="font-serif text-xs sm:text-[13.5px] text-[#4A382A] leading-relaxed max-w-[380px] space-y-3.5 my-2">
                  <p className="font-medium text-[#2E1E14]">
                    <span className="font-semibold text-[#7C1425]">Mr. Sivarajan M.M.</span> &{" "}
                    <span className="font-semibold text-[#7C1425]">Mrs. Rohini Sivarajan</span>
                    <br />
                    <span className="text-[11.5px] text-[#78614E] tracking-wide">
                      Mavalliyil House, Mananthavady
                    </span>
                  </p>

                  <p className="italic text-[12px] sm:text-[13px] text-[#6A5340] px-3">
                    Solicit your esteemed and gracious presence with your family on the auspicious
                    occasion of the marriage of
                  </p>

                  {/* Highlighted Couple Names */}
                  <div className="py-2 px-4 rounded-xl bg-[#FAF5EA]/80 border border-[#D4AF37]/35 shadow-sm">
                    <span className="font-['Cinzel'] font-bold text-lg sm:text-xl text-[#1E1916] tracking-wider block">
                      ASWANTH
                    </span>
                    <span className="font-['Alex_Brush'] text-2xl sm:text-3xl text-[#C5A059] block -my-1">
                      with
                    </span>
                    <span className="font-['Cinzel'] font-bold text-lg sm:text-xl text-[#1E1916] tracking-wider block">
                      GEETHANJALI
                    </span>
                  </div>

                  <p className="font-medium text-[#2E1E14]">
                    <span className="text-[11px] text-[#78614E] block font-sans uppercase tracking-wider">
                      D/O
                    </span>
                    <span className="font-semibold text-[#7C1425]">Mr. Babu M.K</span> &{" "}
                    <span className="font-semibold text-[#7C1425]">Mrs. Sreema Babu</span>
                    <br />
                    <span className="text-[11.5px] text-[#78614E] tracking-wide">
                      Geethanjali House, Sulthan Bathery
                    </span>
                  </p>
                </div>

                {/* AUSPICIOUS DATE & MUHURTHAM BADGE */}
                <div className="w-full my-6 py-4 px-4 border-y border-[#D4AF37]/45 bg-[#FAF6EE]/80 rounded-xl flex items-center justify-center gap-4 sm:gap-6 text-[#2E1E14] shadow-sm">
                  <div className="text-right">
                    <span className="block font-['Cinzel'] text-[11px] sm:text-xs uppercase tracking-widest text-[#78614E] font-semibold">
                      Wednesday
                    </span>
                    <span className="block font-sans text-[10px] sm:text-[11px] text-[#A08157] font-medium">
                      NOV 2026
                    </span>
                  </div>

                  <div className="px-3 sm:px-4 border-x border-[#D4AF37]/60">
                    <span className="font-['Cormorant_Garamond'] text-4xl sm:text-5xl font-bold text-[#7C1425] leading-none block">
                      11
                    </span>
                  </div>

                  <div className="text-left">
                    <span className="block font-['Cinzel'] text-[10.5px] sm:text-[11.5px] uppercase tracking-wider text-[#78614E] font-semibold">
                      Muhurtham
                    </span>
                    <span className="block font-sans text-[10.5px] sm:text-[11.5px] font-bold text-[#7C1425]">
                      11:00 AM - 12:00 NOON
                    </span>
                  </div>
                </div>

                {/* VENUE & CEREMONY DETAILS */}
                <div className="space-y-1.5 max-w-[380px] text-center my-2">
                  <span className="font-['Cinzel'] text-[10.5px] tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
                    Thalikettu Ceremony
                  </span>
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#1E1916]">
                    The Hill District Club
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#6A5340]">
                    Kolagapara, Wayanad, Kerala
                  </p>
                </div>

                {/* SACRED ADIYOGI BLESSING & DEVOTIONAL ART MURAL (BORDERLESS & SEAMLESSLY FEATHERED) */}
                <div className="w-full max-w-[440px] my-10 flex flex-col items-center text-center relative select-none">
                  {/* Auspicious Crescent & Trishul Motif Header */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-[#C5A059]" />
                    <span className="font-['Cinzel'] text-[9.5px] sm:text-[10px] tracking-[0.38em] text-[#8C6D23] uppercase font-bold">
                      Divine Grace
                    </span>
                    <div className="w-8 h-[1px] bg-gradient-to-l from-transparent via-[#D4AF37] to-[#C5A059]" />
                  </div>

                  <h3 className="font-['Cormorant_Garamond'] text-2xl sm:text-3xl italic text-[#7C1425] font-semibold tracking-wide leading-snug mb-1">
                    Under the Grace of Adiyogi
                  </h3>

                  <div className="w-16 h-[1.2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-1.5" />

                  {/* 100% Borderless, Double-Feathered Artwork */}
                  <div
                    className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-[560/956] my-3 select-none"
                    style={{
                      maskImage:
                        "radial-gradient(ellipse 90% 86% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 90% 86% at 50% 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                    }}
                  >
                    <img
                      src="/ashwageetham/adiyogi_sketch_feathered.png"
                      alt="Aswanth & Geethanjali seeking the blessings of Adiyogi Shiva"
                      className="w-full h-full object-contain filter contrast-[1.02] brightness-[1.01]"
                    />
                  </div>

                  {/* Devotional Inscription & Sacred Mantra */}
                  <div className="mt-1 max-w-[350px]">
                    <p className="font-serif italic text-xs sm:text-[13px] text-[#4A382A] leading-relaxed">
                      &ldquo;Under the calm and eternal presence of Adiyogi, seeking divine blessings for a lifelong journey filled with serenity, strength, and boundless love.&rdquo;
                    </p>
                    <span className="block font-['Cinzel'] text-[9px] tracking-[0.28em] uppercase text-[#A08157] font-semibold mt-2.5">
                      Om Namah Shivaya
                    </span>
                  </div>
                </div>



                {/* INTERACTIVE ACTION CARDS */}
                <div className="w-full mt-8 space-y-3 max-w-[420px]">
                  {/* WhatsApp RSVP Card */}
                  <a
                    href={getWhatsAppRsvpUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    <i className="fab fa-whatsapp text-lg"></i>
                    <span>RSVP on WhatsApp</span>
                  </a>

                  {/* Calendar Sync & Venue Direction Grid */}
                  <div className="grid grid-cols-2 gap-2.5 w-full">
                    <button
                      onClick={downloadIcs}
                      className="py-3 px-3 rounded-xl bg-[#FAF5EA] border border-[#D4AF37]/60 text-[#580F1E] font-sans text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F3ECE0] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base text-[#C5A059]">
                        calendar_month
                      </span>
                      <span>Add Calendar</span>
                    </button>

                    <a
                      href="https://maps.google.com/?q=The+Hill+District+Club,+Kolagapara,+Wayanad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-3 rounded-xl bg-[#FAF5EA] border border-[#D4AF37]/60 text-[#580F1E] font-sans text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#F3ECE0] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined text-base text-[#C5A059]">
                        location_on
                      </span>
                      <span>View Map</span>
                    </a>
                  </div>

                  {/* Bless Couple Button (Petals Shower) */}
                  <button
                    onClick={() => {
                      triggerShower(36);
                      showToast("🌸 May your blessings bring eternal joy to Aswanth & Geethanjali!");
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-transparent border border-[#C5A059]/50 text-[#6A5340] font-sans text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#FAF5EA]/70 transition-colors shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base text-[#D4AF37]">
                      spa
                    </span>
                    <span>Shower Blessings (Pushparchana)</span>
                  </button>
                </div>

                {/* LIVE MUHURTHAM COUNTDOWN */}
                <div className="w-full mt-8 pt-6 border-t border-[#D4AF37]/35 max-w-[420px]">
                  <span className="font-['Cinzel'] text-[10.5px] tracking-[0.3em] uppercase text-[#78614E] font-bold block mb-3.5">
                    Auspicious Countdown
                  </span>

                  <div className="grid grid-cols-4 gap-2.5 max-w-[320px] mx-auto">
                    {[
                      { label: "Days", val: timeLeft.days },
                      { label: "Hours", val: timeLeft.hours },
                      { label: "Mins", val: timeLeft.minutes },
                      { label: "Secs", val: timeLeft.seconds },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-[#FAF5EA] border border-[#D4AF37]/45 rounded-xl py-2.5 px-1 flex flex-col items-center justify-center shadow-sm"
                      >
                        <span className="font-serif font-bold text-xl sm:text-2xl text-[#7C1425] leading-none">
                          {item.val}
                        </span>
                        <span className="font-sans text-[8.5px] uppercase tracking-wider text-[#78614E] mt-1 font-semibold">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FOOTER SIGNATURE & "ASHWAGEETHAM" EMBLEM */}
                <footer className="mt-8 text-center flex flex-col items-center">
                  <p className="font-['Cinzel'] text-[9.5px] tracking-[0.28em] uppercase text-[#A08157] font-semibold">
                    With Love & Prayers
                  </p>
                  <img
                    src="/ashwageetham/ashwageetham_title.png"
                    alt="Ashwageetham"
                    className="h-7 object-contain my-2 opacity-90 drop-shadow-sm"
                  />
                  <p className="font-['Alex_Brush'] text-2xl sm:text-3xl text-[#7C1425]">
                    Aswanth & Geethanjali
                  </p>
                </footer>

                {/* TRADITIONAL FLORAL JAALI BOTTOM BORDER (From attached photo) */}
                <div className="w-full mt-10 overflow-hidden border-t-2 border-[#7A1C2E] rounded-b-xl shadow-md">
                  <img
                    src="/ashwageetham/ashwageetham_border.png"
                    alt="Traditional Floral Border"
                    className="w-full h-12 sm:h-14 object-cover object-center filter contrast-[1.02]"
                  />
                </div>
              </article>
            </main>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. SCOPED CSS ANIMATIONS & RESPONSIVE STYLING                             */}
      {/* ========================================================================= */}
      <style jsx global>{`
        /* Envelope 3D Floating Idle Motion */
        @keyframes envelopeFloat {
          0%, 100% {
            transform: translateY(0px) rotateX(3deg) rotateY(-1.5deg);
          }
          50% {
            transform: translateY(-8px) rotateX(-1.5deg) rotateY(1.5deg);
          }
        }
        .animate-envelope-float {
          animation: envelopeFloat 5.8s ease-in-out infinite;
        }

        /* Ambient Floor Shadow Motion */
        @keyframes envelopeShadowMove {
          0%, 100% {
            transform: scale(1);
            opacity: 0.55;
          }
          50% {
            transform: scale(0.92);
            opacity: 0.35;
          }
        }
        .animate-envelope-shadow {
          animation: envelopeShadowMove 5.8s ease-in-out infinite;
        }

        /* Floating WhatsApp Share Button */
        .floating-share {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .floating-share {
            bottom: 20px;
            right: 18px;
          }
        }

        .share-toggle-btn {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid #C5A059;
          color: #2C2520;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(44, 37, 32, 0.16);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.35rem;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .share-toggle-btn i {
          color: #25D366;
          transition: transform 0.3s ease;
        }

        .share-toggle-btn:hover {
          transform: scale(1.1);
          background: #FFFFFF;
          box-shadow: 0 16px 32px rgba(44, 37, 32, 0.22);
        }

        .share-toggle-btn:hover i {
          transform: scale(1.15) rotate(8deg);
          color: #7C1425;
        }

        /* Petal animations */
        @keyframes petalFlutter {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) rotate(540deg);
            opacity: 0;
          }
        }
        .animate-petal-flutter {
          animation-name: petalFlutter;
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
        }

        @keyframes petalSway {
          0%, 100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(35px) rotate(25deg);
          }
        }
        .animate-petal-sway {
          animation-name: petalSway;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        /* Toast animation */
        @keyframes toastDrop {
          from {
            opacity: 0;
            transform: translateY(-12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-toast {
          animation: toastDrop 0.28s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Card fade-in-up */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* Music Bar Animations */
        @keyframes musicBar1 {
          0%, 100% { height: 6px; }
          50% { height: 14px; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 14px; }
          50% { height: 5px; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 9px; }
          50% { height: 13px; }
        }
        .animate-music-bar-1 {
          animation: musicBar1 0.8s ease-in-out infinite;
        }
        .animate-music-bar-2 {
          animation: musicBar2 0.7s ease-in-out infinite;
        }
        .animate-music-bar-3 {
          animation: musicBar3 0.9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Export both names for maximum compatibility
export { AswgeeTheme as AshwageethamTheme };
