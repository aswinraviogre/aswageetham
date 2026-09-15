"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import type { InviteData } from "@/data/invites";

interface PetalParticle {
  id: number;
  type: "rose" | "jasmine" | "gold" | "lotus";
  left: number;
  size: number;
  duration: number;
  delay: number;
  swayDuration: number;
}

interface Wish {
  id: string;
  name: string;
  message: string;
  relation?: string;
  date: string;
}

// 1. Traditional Calligraphic Lord Ganesha Emblem in Deep Maroon
const GaneshaEmblemSVG = ({ className = "w-11 h-14" }: { className?: string }) => (
  <svg viewBox="0 0 100 130" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 6 C40 6 32 12 30 20 C26 29 30 40 38 44 C44 46 47 50 47 56 C47 67 36 76 36 89 C36 103 49 115 63 115 C74 115 82 106 82 95 C82 86 75 80 67 80 C58 80 54 87 54 93 C54 97 57 100 61 100 C65 100 67 97 67 94 C67 89 62 87 60 89 C58 91 58 94 60 95 C56 95 53 92 53 87 C53 79 62 73 70 73 C81 73 89 82 89 94 C89 109 74 120 59 120 C42 120 27 105 27 86 C27 71 38 60 38 51 C38 45 35 40 30 36 C21 30 17 19 22 9 C27 0 38 -3 50 -3 C66 -3 78 4 84 15 C86 19 84 23 80 23 C76 23 74 21 73 18 C69 10 61 6 50 6 Z"
      fill="#580F1E"
    />
    {/* Crown Kireedam crest */}
    <path d="M50 -4 L53 3 L47 3 Z" fill="#D4AF37" />
    <circle cx="50" cy="-6" r="2" fill="#D4AF37" />
    {/* Forehead Tilak */}
    <path d="M48 20 C48 16 52 16 52 20 L52 30 C52 32 48 32 48 30 Z" fill="#D4AF37" />
    <circle cx="50" cy="34" r="2" fill="#9B1D36" />
    {/* Right Ear / Curve */}
    <path
      d="M63 24 C74 24 81 33 79 44 C77 53 68 57 61 57"
      stroke="#580F1E"
      strokeWidth="5"
      strokeLinecap="round"
    />
    {/* Modak in Hand */}
    <circle cx="80" cy="62" r="6" fill="#D4AF37" stroke="#580F1E" strokeWidth="1.5" />
    <path d="M80 56 L82 59 L78 59 Z" fill="#580F1E" />
    {/* Auspicious Dots */}
    <circle cx="50" cy="126" r="1.5" fill="#D4AF37" />
    <circle cx="43" cy="126" r="1" fill="#D4AF37" />
    <circle cx="57" cy="126" r="1" fill="#D4AF37" />
  </svg>
);

// 2. Traditional Geometric Kolam / Rangoli Watermark
const KolamWatermarkSVG = () => (
  <svg viewBox="0 0 160 160" fill="none" className="w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#C5A059" strokeWidth="1.2">
      {/* Central Interlaced Diamond Loops */}
      <path d="M80 15 L145 80 L80 145 L15 80 Z" strokeDasharray="3 3" />
      <path d="M80 28 L132 80 L80 132 L28 80 Z" />
      <path d="M80 40 L120 80 L80 120 L40 80 Z" />
      {/* Curved loop petals */}
      <path d="M80 40 Q105 40 105 80 Q105 120 80 120 Q55 120 55 80 Q55 40 80 40" />
      <path d="M40 80 Q40 55 80 55 Q120 55 120 80 Q120 105 80 105 Q40 105 40 80" />
      {/* Dots */}
      <circle cx="80" cy="80" r="5" fill="none" />
      <circle cx="80" cy="80" r="2.5" fill="#C5A059" />
      <circle cx="80" cy="40" r="2" fill="#C5A059" />
      <circle cx="80" cy="120" r="2" fill="#C5A059" />
      <circle cx="40" cy="80" r="2" fill="#C5A059" />
      <circle cx="120" cy="80" r="2" fill="#C5A059" />
    </g>
  </svg>
);

// 3. Side Lace Filigree Ornament
const SideLaceSVG = ({ isRight = false }: { isRight?: boolean }) => (
  <svg
    viewBox="0 0 35 90"
    fill="none"
    className={`w-5 sm:w-7 h-16 sm:h-22 opacity-35 text-[#C5A059] ${isRight ? "-scale-x-100" : ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 10 Q16 10 22 26 Q28 42 12 58 Q0 68 0 80" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M0 26 Q12 26 18 36 Q22 46 12 58" stroke="currentColor" strokeWidth="1" fill="none" />
    <circle cx="14" cy="22" r="2" fill="currentColor" />
    <circle cx="20" cy="38" r="2.5" fill="currentColor" />
    <circle cx="15" cy="54" r="2" fill="currentColor" />
    <path d="M6 44 L0 39 L0 49 Z" fill="currentColor" />
  </svg>
);

// 4. Gold Flourish Divider
const FlourishDividerSVG = () => (
  <div className="flex items-center justify-center gap-3 w-full max-w-[260px] mx-auto my-3 select-none px-2">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]" />
    <svg width="34" height="12" viewBox="0 0 36 12" fill="none">
      <path d="M18 0 C16 4 10 6 0 6 C10 6 16 8 18 12 C20 8 26 6 36 6 C26 6 20 4 18 0 Z" fill="#C5A059" />
      <circle cx="18" cy="6" r="2" fill="#580F1E" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]" />
  </div>
);

// 5. Traditional Kerala Nilavilakku (Sacred Brass Lamp)
const NilavilakkuSVG = ({ className = "w-6 h-14 md:w-8 md:h-20" }: { className?: string }) => (
  <svg viewBox="0 0 40 100" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="35%" stopColor="#D4AF37" />
        <stop offset="70%" stopColor="#AA820A" />
        <stop offset="100%" stopColor="#755800" />
      </linearGradient>
      <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFDE59" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#FF914D" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="20" cy="11" r="10" fill="url(#lampGlow)" className="animate-pulse" />
    <path
      d="M20 3 C17 8 16 11 18 14 C19 16 21 16 22 14 C24 11 23 8 20 3 Z"
      fill="#FF4500"
      className="origin-bottom animate-flame"
    />
    <path
      d="M20 5 C18 9 18 11 19 13 C19.5 14 20.5 14 21 13 C22 11 22 9 20 5 Z"
      fill="#FFD700"
      className="origin-bottom animate-flame-inner"
    />
    <ellipse cx="20" cy="16" rx="2" ry="1" fill="#331118" />
    <path d="M5 18 C10 16 30 16 35 18 C33 22 7 22 5 18 Z" fill="url(#brassGold)" stroke="#755800" strokeWidth="0.5" />
    <ellipse cx="20" cy="18" rx="14" ry="2" fill="url(#brassGold)" />
    <path d="M18 20 L18 60 L22 60 L22 20 Z" fill="url(#brassGold)" />
    <circle cx="20" cy="35" r="4" fill="url(#brassGold)" stroke="#755800" strokeWidth="0.5" />
    <circle cx="20" cy="50" r="5" fill="url(#brassGold)" stroke="#755800" strokeWidth="0.5" />
    <path d="M12 60 L28 60 L26 72 L14 72 Z" fill="url(#brassGold)" />
    <path d="M8 72 C12 70 28 70 32 72 L36 90 C30 92 10 92 4 90 Z" fill="url(#brassGold)" stroke="#755800" strokeWidth="0.5" />
    <ellipse cx="20" cy="91" rx="17" ry="4" fill="url(#brassGold)" stroke="#755800" strokeWidth="0.5" />
  </svg>
);

// 6. Hanging Temple Brass Bell
const HangingBell = ({ delay = "0s", className = "" }: { delay?: string; className?: string }) => (
  <div
    className={`inline-flex flex-col items-center origin-top animate-bell-swing ${className}`}
    style={{ animationDelay: delay }}
  >
    <div className="w-[1.5px] h-10 md:h-16 bg-gradient-to-b from-[#D4AF37] via-[#AA820A] to-[#D4AF37]" />
    <svg width="22" height="28" viewBox="0 0 24 30" fill="none">
      <defs>
        <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#755800" />
        </linearGradient>
      </defs>
      <path d="M10 0 H14 V5 H10 Z" fill="url(#bellGrad)" />
      <path d="M7 6 C7 2 17 2 17 6 V18 C20 19 22 22 22 25 H2 C2 22 4 19 7 18 V6 Z" fill="url(#bellGrad)" stroke="#755800" strokeWidth="0.5" />
      <ellipse cx="12" cy="25" rx="10" ry="2" fill="#AA820A" />
      <circle cx="12" cy="28" r="2.5" fill="#4A0E17" />
    </svg>
  </div>
);

// 7. Kerala Kasavu Temple Brocade Bottom Border Component
const KeralaKasavuBorder = () => (
  <div className="w-full select-none overflow-hidden">
    {/* Stepped Temple Kalasam / Gopuram Peak Teeth */}
    <div className="w-full flex items-end justify-center overflow-hidden h-4 bg-[#FAF5EA]">
      <svg className="w-full h-4" preserveAspectRatio="repeat" viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <pattern id="gopuramTeeth" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M8 0 L15 16 H1 Z" fill="#4A0E17" />
          <path d="M8 3 L13 16 H3 Z" fill="#580F1E" />
          <path d="M8 8 L10 16 H6 Z" fill="#D4AF37" />
        </pattern>
        <rect width="100%" height="16" fill="url(#gopuramTeeth)" />
      </svg>
    </div>

    {/* Gold Filigree Hairline */}
    <div className="w-full h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#FFF2B2] to-[#D4AF37]" />

    {/* Traditional Woven Kasavu Diamond Brocade Zari Band */}
    <div className="w-full py-2.5 px-4 bg-[#4A0E17] relative overflow-hidden">
      {/* Woven Geometric Diamond Texture */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 8px), repeating-linear-gradient(-45deg, #D4AF37 0, #D4AF37 1px, transparent 0, transparent 8px)`,
        }}
      />
      <div className="relative z-10 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-serif tracking-[0.2em] text-[#F4E295] uppercase font-bold text-center">
        <span>॥ മംഗളം ഭവതു ॥</span>
        <span>•</span>
        <span className="text-white tracking-widest">ASHWAGEETHAM</span>
        <span>•</span>
        <span>11.11.2026</span>
      </div>
    </div>

    {/* Solid Deep Maroon Baseline */}
    <div className="w-full h-2 bg-[#2D060D]" />
  </div>
);

export function AshwageethamTheme({ invite }: { invite: InviteData }) {
  // Opening cover states
  const [isOpened, setIsOpened] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  // Audio playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Petals & blessing shower state
  const [petals, setPetals] = useState<PetalParticle[]>([]);
  const [blessingCount, setBlessingCount] = useState(108);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  // Guestbook state
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [authorName, setAuthorName] = useState("");
  const [blessingMsg, setBlessingMsg] = useState("");
  const [relation, setRelation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Toast message
  const [toast, setToast] = useState<string | null>(null);

  // Photo Lightbox modal state
  const [selectedPhoto, setSelectedPhoto] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  // Target Countdown: Wednesday, Nov 11, 2026, 11:00:00 AM IST
  useEffect(() => {
    const targetDate = new Date("2026-11-11T11:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Wishes
  useEffect(() => {
    const seedWishes: Wish[] = [
      {
        id: "w-1",
        name: "Aswathy, Akhil & Anuraj",
        message: "Hearty congratulations and prayers for our dearest Aswanth & Geethanjali! Wishing you both unconditional love, harmony, and endless happiness!",
        relation: "Family",
        date: "Special Blessing",
      },
      {
        id: "w-2",
        name: "Ridhai & Lyra",
        message: "Sending lots of love, sweet hugs, and warmest wishes to Uncle Aswanth & Aunty Geethanjali! Excited to celebrate on 11.11.2026!",
        relation: "With Love",
        date: "Blessing",
      },
      {
        id: "w-3",
        name: "Radhakrishnan & Family",
        message: "Warmest wedding greetings to Sivarajan ettan, Rohini edathi and the blessed couple. May Lord Guruvayoorappan guide you always.",
        relation: "Family Friends, Mananthavady",
        date: "Special Blessing",
      },
    ];

    try {
      const saved = localStorage.getItem("ashwageetham_wishes_v4");
      if (saved) {
        setWishes(JSON.parse(saved));
      } else {
        setWishes(seedWishes);
        localStorage.setItem("ashwageetham_wishes_v4", JSON.stringify(seedWishes));
      }

      const count = localStorage.getItem("ashwageetham_count_v4");
      if (count) setBlessingCount(parseInt(count, 10));
    } catch (err) {
      console.log("Storage error:", err);
      setWishes(seedWishes);
    }
  }, []);

  // Ambient falling petals on load
  useEffect(() => {
    const initialPetals: PetalParticle[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      type: (["rose", "jasmine", "gold", "lotus"] as const)[Math.floor(Math.random() * 4)],
      left: Math.random() * 100,
      size: Math.random() * 12 + 10,
      duration: Math.random() * 5 + 6,
      delay: Math.random() * 4,
      swayDuration: Math.random() * 2 + 3,
    }));
    setPetals(initialPetals);
  }, []);

  // Escape key listener to close lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPhoto(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Scroll lock when opening cover is active
  useEffect(() => {
    if (!isFullyRevealed) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isFullyRevealed]);

  // Open Invitation Sequence
  const handleOpenInvitation = () => {
    if (isOpened || isFullyRevealed) return;
    setIsOpened(true);

    // Audio Autoplay
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio play blocked:", e));
    }

    // Shower celebratory petals
    triggerShower(35);

    // Reveal full interactive suite
    setTimeout(() => {
      setIsFullyRevealed(true);
    }, 1100);
  };

  // Audio Toggle
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Audio failed:", e));
    }
  };

  // Petal Shower Trigger
  const triggerShower = (count = 25) => {
    const types: ("rose" | "jasmine" | "gold" | "lotus")[] = ["rose", "jasmine", "gold", "lotus"];
    const newItems: PetalParticle[] = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      type: types[Math.floor(Math.random() * types.length)],
      left: Math.random() * 100,
      size: Math.random() * 14 + 12,
      duration: Math.random() * 3.5 + 4,
      delay: Math.random() * 0.6,
      swayDuration: Math.random() * 1.5 + 2.5,
    }));

    setPetals((prev) => [...prev.slice(-35), ...newItems]);
    setTimeout(() => {
      setPetals((prev) => prev.filter((p) => !newItems.includes(p)));
    }, 7000);
  };

  const handleBlessingShowerClick = () => {
    triggerShower(35);
    const updatedCount = blessingCount + 1;
    setBlessingCount(updatedCount);
    try {
      localStorage.setItem("ashwageetham_count_v4", updatedCount.toString());
    } catch (e) { }
    showToast("🌸 May your blessings shower eternal grace upon Aswanth & Geethanjali!");
  };

  // Guestbook Submit
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !blessingMsg.trim()) return;

    const newWish: Wish = {
      id: `w-${Date.now()}`,
      name: authorName.trim(),
      message: blessingMsg.trim(),
      relation: relation.trim() || "Well Wisher",
      date: "Just now",
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    setAuthorName("");
    setBlessingMsg("");
    setRelation("");
    setSubmitted(true);
    triggerShower(25);

    try {
      localStorage.setItem("ashwageetham_wishes_v4", JSON.stringify(updated));
    } catch (e) { }

    showToast("✨ Your loving blessing has been posted to the guestbook!");
    setTimeout(() => setSubmitted(false), 4000);
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Calendar URL Generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Wedding: Aswanth & Geethanjali (Ashwageetham)");
    const details = encodeURIComponent(
      "Auspicious marriage ceremony of Aswanth with Geethanjali.\n\nDate: Wednesday, 11th November 2026\nMuhurtham: 11:00 AM - 12:00 NOON\nVenue: The Hill District Club, Kolagapara, Wayanad\n\nMr. Sivarajan M.M. & Mrs. Rohini Sivarajan (Mavalliyil House, Mananthavady)"
    );
    const location = encodeURIComponent("The Hill District Club, Kolagapara, Wayanad, Kerala");
    const dates = "20261111T053000Z/20261111T093000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const downloadIcs = () => {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ashwageetham Wedding//EN",
      "BEGIN:VEVENT",
      "UID:ashwageetham-20261111@save-the-date",
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

  // WhatsApp RSVP link
  const getWhatsAppRsvpUrl = () => {
    const phone = invite?.phone || "917356558475";
    const msg = encodeURIComponent(
      "Namaste! 🙏\n\nWe are delighted to receive the wedding invitation of ASWANTH & GEETHANJALI (Ashwageetham) on Wednesday, 11th November 2026 at The Hill District Club, Kolagapara.\n\nWe will be honored to attend and offer our blessings to the couple! 🌸"
    );
    return `https://wa.me/${phone}?text=${msg}`;
  };

  // WhatsApp Share Button handler (exact to AjayAparnaTheme)
  const handleWhatsappShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareMessage = `👋 Hello!

❤️ You're warmly invited to celebrate our special day.

Tap the link below to view our digital invitation.

⬇️: ${url}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="w-full relative min-h-screen bg-[#FAF5EA] text-[#331118] font-serif overflow-x-hidden selection:bg-[#580F1E] selection:text-[#FAF6EF]">
      {/* Font Awesome Stylesheet for WhatsApp and Social Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/music/vidssavecom-mangalyam-official-audio-wedding-song-arun-pradeep-feat-sand_MaLJU9Oi.aac"
        loop
        preload="auto"
      />

      {/* Floating Animated Petals Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute animate-petal-flutter will-change-transform"
            style={{
              left: `${petal.left}%`,
              top: "-45px",
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
            }}
          >
            <div
              className="animate-petal-sway"
              style={{ animationDuration: `${petal.swayDuration}s` }}
            >
              {petal.type === "rose" && (
                <svg width={petal.size} height={petal.size} viewBox="0 0 30 30" fill="none">
                  <path
                    d="M15 2C10 2 3 9 3 17C3 23 8 28 15 28C22 28 27 23 27 17C27 9 20 2 15 2Z"
                    fill="#7B1127"
                    opacity="0.88"
                  />
                  <path
                    d="M15 6C12 6 7 11 7 17C7 21 11 25 15 25C19 25 23 21 23 17C23 11 18 6 15 6Z"
                    fill="#9B1D36"
                    opacity="0.92"
                  />
                </svg>
              )}
              {petal.type === "jasmine" && (
                <svg width={petal.size * 0.9} height={petal.size * 0.9} viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C10 7 7 10 2 12C7 14 10 17 12 22C14 17 17 14 22 12C17 10 14 7 12 2Z"
                    fill="#FFFDF7"
                    stroke="#D4AF37"
                    strokeWidth="0.5"
                  />
                  <circle cx="12" cy="12" r="2" fill="#D4AF37" />
                </svg>
              )}
              {petal.type === "lotus" && (
                <svg width={petal.size * 1.1} height={petal.size * 1.1} viewBox="0 0 30 30" fill="none">
                  <path d="M15 3 C10 10 6 18 15 27 C24 18 20 10 15 3 Z" fill="#D45D79" opacity="0.85" />
                  <path d="M15 8 C12 14 10 19 15 25 C20 19 18 14 15 8 Z" fill="#EA9085" />
                </svg>
              )}
              {petal.type === "gold" && (
                <div
                  style={{ width: petal.size * 0.5, height: petal.size * 0.5 }}
                  className="rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF2B2] to-[#AA820A] shadow-sm animate-pulse"
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-14 sm:top-6 inset-x-0 z-[100] flex justify-center px-4 pointer-events-none">
          <aside
            role="status"
            aria-live="polite"
            onClick={() => setToast(null)}
            className="pointer-events-auto w-full sm:w-auto max-w-[480px] px-5 py-3 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#4A0A17] via-[#630E21] to-[#4A0A17] text-[#FAF5EA] shadow-[0_12px_40px_rgba(0,0,0,0.55),0_0_20px_rgba(212,175,55,0.35)] border-2 border-[#D4AF37] flex items-center justify-center text-center gap-2 animate-toast backdrop-blur-md cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <p className="text-xs sm:text-sm font-serif font-medium leading-snug tracking-wide text-[#FAF0DE] m-0 text-center">
              {toast}
            </p>
          </aside>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-modal-in cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[92vw] max-h-[92vh] flex flex-col items-center cursor-default animate-toast"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 sm:-right-2 bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 text-[#F4E295] border border-[#D4AF37]/60 rounded-full p-2 backdrop-blur-md transition-all cursor-pointer flex items-center justify-center shadow-lg"
              aria-label="Close photo preview"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            {/* Royal Gold Frame */}
            <div className="rounded-2xl p-[3px] bg-gradient-to-b from-[#D4AF37] via-[#FFF2B2] to-[#AA7C11] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden max-h-[76vh]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[74vh] object-contain rounded-[13px] block"
              />
            </div>

            {/* Caption Card */}
            <div className="mt-3.5 text-center px-4 w-full max-w-[500px]">
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#F4E295] tracking-wide drop-shadow-sm">
                {selectedPhoto.title}
              </h3>
              <p className="text-xs sm:text-sm font-sans text-[#E8DEC8] italic mt-0.5">
                {selectedPhoto.subtitle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Floating Controls */}
      <header className="fixed top-3 inset-x-0 z-40 px-3 md:px-6 flex items-center justify-between pointer-events-none max-w-4xl mx-auto w-full">
        <Link
          href="/"
          className="pointer-events-auto bg-[#FAF5EA]/90 backdrop-blur-md text-[#580F1E] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-[#FAF5EA] transition-all border border-[#D4AF37]/40 text-xs shadow-md group hover:scale-105"
        >
          <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-0.5 transition-transform">
            arrow_back
          </span>
          <span className="font-sans font-medium">All Invites</span>
        </Link>

        {/* Audio Floating Disc with Equalizer */}
        <button
          onClick={toggleAudio}
          aria-label="Toggle Wedding Music"
          className="pointer-events-auto p-2 md:p-2.5 rounded-full bg-[#FAF5EA]/95 backdrop-blur-md border border-[#D4AF37]/60 text-[#580F1E] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer group"
        >
          {isPlaying ? (
            <div className="flex items-center gap-1.5 px-1">
              <div className="flex items-end gap-[2px] h-3.5 w-4">
                <span className="w-[3px] bg-[#580F1E] rounded-full animate-music-bar-1 h-2" />
                <span className="w-[3px] bg-[#580F1E] rounded-full animate-music-bar-2 h-3.5" />
                <span className="w-[3px] bg-[#580F1E] rounded-full animate-music-bar-3 h-2.5" />
              </div>
              <span className="text-[11px] font-sans font-bold tracking-wider text-[#580F1E] hidden sm:inline">
                MUSIC ON
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-1">
              <span className="material-symbols-outlined text-[20px] text-[#580F1E]">music_off</span>
              <span className="text-[11px] font-sans font-semibold tracking-wider text-[#7A695B] hidden sm:inline">
                PLAY MUSIC
              </span>
            </div>
          )}
        </button>
      </header>

      {/* WhatsApp Share Floating Button (Only visible after card is opened - exact to AjayAparnaTheme) */}
      {isFullyRevealed && (
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
      )}

      {/* ========================================================================= */}
      {/* 1. NATIVE OPENING PAGE DESIGN (MATCHING ATTACHED WEDDING CARD PHOTO)      */}
      {/* ========================================================================= */}
      {!isFullyRevealed && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#1E0408]/90 backdrop-blur-md overflow-y-auto transition-all duration-1000 ${isOpened ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
            }`}
          style={{
            backgroundImage: `radial-gradient(circle at center, #3F0A13 0%, #150205 100%)`,
          }}
        >
          {/* Authentic Physical Wedding Card Container */}
          <div className="relative w-full max-w-[500px] my-auto bg-[#FAF5EA] rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.65)] border border-[#C5A059]/60 overflow-hidden flex flex-col justify-between text-center select-none transform transition-all duration-700">

            {/* Subtle Parchment Texture & Side Laces */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none z-10">
              <SideLaceSVG />
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 pointer-events-none z-10">
              <SideLaceSVG isRight />
            </div>

            {/* Card Inner Padding Area */}
            <div className="pt-6 sm:pt-8 px-5 sm:px-8 pb-3 relative z-10">

              {/* 1. Auspicious Lord Ganesha Emblem */}
              <div className="flex flex-col items-center justify-center mb-3 group">
                <GaneshaEmblemSVG className="w-10 h-13 sm:w-12 sm:h-16 transform group-hover:scale-105 transition-transform" />
              </div>

              {/* 2. Groom's Parents */}
              <div className="space-y-0.5 mb-2.5">
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#331118] tracking-wide leading-snug">
                  Mr. Sivarajan M.M. & Mrs. Rohini Sivarajan
                </h2>
                <p className="text-xs font-serif text-[#665043] tracking-wide">
                  Mavalliyil House, Mananthavady
                </p>
              </div>

              {/* 3. Formal Solicitation */}
              <p className="text-xs sm:text-[13px] font-serif italic text-[#4A3B32] max-w-[380px] mx-auto leading-relaxed mb-4 px-2">
                Solicit your esteemed and gracious presence with your family on the auspicious occasion of the marriage of
              </p>

              {/* 4. Groom & Bride Names */}
              <div className="my-3 text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#580F1E] tracking-wider leading-none">
                  ASWANTH
                </h1>

                <span className="block text-sm sm:text-base font-serif italic text-[#8C6D23] my-1.5 font-medium">
                  with
                </span>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#580F1E] tracking-wider leading-none">
                  GEETHANJALI
                </h1>

                <div className="mt-2.5 space-y-0.5">
                  <p className="text-xs sm:text-[13px] font-serif text-[#4A3B32]">
                    D/O Mr. Babu M. K & Mrs. Sreema Babu
                  </p>
                  <p className="text-xs font-serif text-[#665043]">
                    Geethanjali House, Sulthan Bathery
                  </p>
                </div>
              </div>

              {/* 5. The 3-Column Event Details Box with Kolam Watermark */}
              <div className="relative my-5 py-3 px-1 rounded-xl bg-[#FAF5EA] border-y border-[#D4AF37]/40 overflow-hidden">
                {/* Background Central Kolam Rangoli */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36">
                    <KolamWatermarkSVG />
                  </div>
                </div>

                {/* 3 Columns */}
                <div className="relative z-10 grid grid-cols-3 divide-x divide-[#C5A059]/40 text-center items-center">

                  {/* Left Column: Date */}
                  <div className="px-1.5 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#8C6D23] mb-0.5">
                      calendar_month
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-serif tracking-widest text-[#331118] uppercase font-bold">
                      WEDNESDAY
                    </span>
                    <div className="flex items-start justify-center font-serif text-[#331118] font-bold leading-none my-0.5">
                      <span className="text-2xl sm:text-3xl">11</span>
                      <span className="text-[10px] sm:text-xs ml-0.5 mt-0.5">TH</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-serif tracking-wider text-[#331118] uppercase font-bold">
                      NOV 2026
                    </span>
                  </div>

                  {/* Center Column: Venue */}
                  <div className="px-1.5 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#8C6D23] mb-0.5">
                      location_on
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-serif text-[#665043] tracking-wide uppercase font-semibold">
                      THALIKETTU AT
                    </span>
                    <h4 className="text-[10px] sm:text-[11px] font-serif font-extrabold text-[#331118] leading-tight my-0.5">
                      THE HILL DISTRICT CLUB
                    </h4>
                    <span className="text-[9px] sm:text-[10px] font-serif font-bold text-[#8C6D23] tracking-wider uppercase">
                      KOLAGAPARA
                    </span>
                  </div>

                  {/* Right Column: Muhurtham */}
                  <div className="px-1.5 flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-[18px] text-[#8C6D23] mb-0.5">
                      schedule
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-serif tracking-widest text-[#331118] uppercase font-bold">
                      MUHURTHAM
                    </span>
                    <p className="text-[9px] sm:text-[10px] font-serif font-semibold text-[#331118] mt-1 leading-tight">
                      11:00 A.M &<br />12:00 NOON
                    </p>
                  </div>
                </div>
              </div>

              {/* 6. Gold Flourish Divider */}
              <FlourishDividerSVG />

              {/* 7. Love and Regards */}
              <div className="my-2 space-y-0.5">
                <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.2em] text-[#331118] uppercase font-bold block">
                  LOVE AND REGARDS
                </span>
                <p className="text-xs sm:text-[13px] font-serif text-[#5E4D3E]">
                  Aswathy ,Akhil ,Anuraj
                </p>
                <p className="text-xs sm:text-[13px] font-serif text-[#5E4D3E]">
                  Ridhai & Lyra
                </p>
              </div>

              {/* 8. Interactive "Open Full Invitation" Seal Button */}
              <div className="mt-4 mb-2 flex flex-col items-center justify-center">
                <button
                  onClick={handleOpenInvitation}
                  className="group relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#580F1E] via-[#7B1127] to-[#580F1E] text-[#F4E295] border border-[#D4AF37] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#F4E295] animate-pulse">
                    mail
                  </span>
                  <span className="font-sans text-xs font-bold tracking-wider uppercase">
                    Tap to Open Invitation
                  </span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
                <span className="text-[10px] font-sans text-[#8C6D23] mt-1 italic">
                  Music • Countdown • Directions • RSVP
                </span>
              </div>
            </div>

            {/* 9. Authentic Kasavu Brocade Bottom Border */}
            <KeralaKasavuBorder />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. THE COMPLETE RESPONSIVE ROYAL WEDDING CARD SUITE (POST-OPEN)            */}
      {/* ========================================================================= */}
      <main className="w-full max-w-[760px] mx-auto px-3 sm:px-5 md:px-8 pt-16 md:pt-20 pb-28">

        {/* ----------------------------------------------------------------------- */}
        {/* CARD CONTAINER: LUXURIOUS GOLD-FOILED MATTE CREAM CARD                  */}
        {/* ----------------------------------------------------------------------- */}
        <article className="w-full relative bg-[#FAF5EA] rounded-2xl md:rounded-3xl shadow-[0_20px_60px_rgba(88,15,30,0.15)] border-2 md:border-[3px] border-[#D4AF37] overflow-hidden">

          {/* Top Brass Temple Bells Hanging Decorative Fringe */}
          <div className="absolute top-0 inset-x-0 flex justify-between px-6 md:px-12 pointer-events-none z-20">
            <HangingBell delay="0s" className="scale-75 md:scale-100" />
            <HangingBell delay="0.6s" className="scale-75 md:scale-100 hidden sm:inline-flex" />
            <HangingBell delay="1.2s" className="scale-75 md:scale-100" />
          </div>

          {/* Card Inner Gold Double Border */}
          <div className="w-full p-3 sm:p-5 md:p-8">
            <div className="w-full relative border border-[#D4AF37]/50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 bg-[#FAF5EA]">

              {/* Four Corner Brass Filigree Accents */}
              <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 left-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-[#D4AF37]" />

              {/* ----------------------------------------------------------------- */}
              {/* SECTION A: AUSPICIOUS HEADER & FLICKERING LAMPS                  */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full text-center pt-6 pb-2">
                <div className="flex items-center justify-center gap-4 md:gap-8 mb-2">
                  <NilavilakkuSVG className="w-5 h-12 md:w-7 md:h-16" />
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-sm md:text-base tracking-[0.25em] text-[#580F1E] uppercase font-extrabold">
                      ॥ ശ്രീ ഗണേശായ നമഃ ॥
                    </span>
                    <span className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-[#8C6D23] uppercase font-bold mt-0.5">
                      With Divine Blessings
                    </span>
                  </div>
                  <NilavilakkuSVG className="w-5 h-12 md:w-7 md:h-16 -scale-x-100" />
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION B: THE AUTHENTIC ARTWORK PHOTO HERO                      */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-4 text-center">
                <div className="relative w-full rounded-xl overflow-hidden bg-[#FAF5EA] shadow-md border border-[#D4AF37]/40 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ashwageetham/theme_card.jpg"
                    alt="Ashwageetham Wedding Card Procession Art"
                    className="w-full h-auto object-contain mx-auto transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION C: LIVE WEDDING COUNTDOWN TIMER                          */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8 text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="h-[1px] w-6 bg-[#D4AF37]" />
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold">
                    The Sacred Muhurtham Countdown
                  </span>
                  <div className="h-[1px] w-6 bg-[#D4AF37]" />
                </div>

                <h2 className="text-xl md:text-2xl font-serif text-[#580F1E] font-bold mb-4">
                  Counting Down to 11.11.2026
                </h2>

                <div className="w-full max-w-[480px] mx-auto grid grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: "DAYS", val: timeLeft.days },
                    { label: "HOURS", val: timeLeft.hours },
                    { label: "MINUTES", val: timeLeft.minutes },
                    { label: "SECONDS", val: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-2.5 sm:p-3.5 shadow-sm border border-[#D4AF37]/50 flex flex-col items-center justify-center relative overflow-hidden group hover:border-[#D4AF37] transition-all"
                    >
                      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#580F1E] to-[#D4AF37]" />
                      <span className="text-xl sm:text-2xl md:text-3xl font-serif font-extrabold text-[#580F1E] tracking-tight">
                        {item.val}
                      </span>
                      <span className="text-[8px] sm:text-[9px] font-sans font-bold text-[#8C6D23] tracking-widest uppercase mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <FlourishDividerSVG />

              {/* ----------------------------------------------------------------- */}
              {/* SECTION D: FORMAL FAMILY INVITATION TEXT                          */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-6 text-center">
                {/* Groom's Parents Inviting */}
                <div className="w-full space-y-1 mb-5 px-2">
                  <h3 className="text-xl sm:text-2xl md:text-3xl text-[#580F1E] font-serif font-bold tracking-wide leading-snug">
                    Mr. Sivarajan M.M. & Mrs. Rohini Sivarajan
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#7A695B] tracking-wider uppercase font-semibold">
                    Mavalliyil House, Mananthavady
                  </p>
                </div>

                {/* Solicit Presence */}
                <div className="w-full max-w-[620px] mx-auto py-3.5 px-4 border-y border-[#D4AF37]/30 my-4">
                  <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#4A3B32] leading-relaxed">
                    &ldquo;Solicit your esteemed and gracious presence with your family on the auspicious occasion of the marriage of&rdquo;
                  </p>
                </div>

                {/* Couple Spotlight Card */}
                <div className="w-full max-w-[560px] mx-auto my-6 p-5 sm:p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#D4AF37]/60 shadow-md">
                  {/* GROOM */}
                  <div className="w-full mb-3 text-center">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8C6D23] uppercase font-sans font-bold block mb-1">
                      GROOM
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#580F1E] font-serif font-extrabold tracking-wide">
                      ASWANTH
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5E4D3E] font-sans mt-1">
                      Son of Mr. Sivarajan M.M. & Mrs. Rohini Sivarajan
                    </p>
                    <p className="text-xs text-[#7A695B] font-sans italic">
                      Mavalliyil House, Mananthavady
                    </p>
                  </div>

                  {/* Knot Divider */}
                  <div className="flex items-center justify-center gap-3 my-4">
                    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                    <span className="text-base sm:text-lg font-serif italic text-[#8C6D23] font-bold">
                      with
                    </span>
                    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                  </div>

                  {/* BRIDE */}
                  <div className="w-full mt-3 text-center">
                    <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#8C6D23] uppercase font-sans font-bold block mb-1">
                      BRIDE
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#580F1E] font-serif font-extrabold tracking-wide">
                      GEETHANJALI
                    </h2>
                    <p className="text-xs sm:text-sm text-[#5E4D3E] font-sans mt-1">
                      D/O Mr. Babu M.K & Mrs. Sreema Babu
                    </p>
                    <p className="text-xs text-[#7A695B] font-sans italic">
                      Geethanjali House, Sulthan Bathery
                    </p>
                  </div>
                </div>
              </section>

              <FlourishDividerSVG />

              {/* ----------------------------------------------------------------- */}
              {/* SECTION: CHERISHED MOMENTS — DUAL PHOTO SHOWCASE                  */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8 text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <div className="h-[1px] w-6 bg-[#D4AF37]" />
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold">
                    Cherished Moments
                  </span>
                  <div className="h-[1px] w-6 bg-[#D4AF37]" />
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#580F1E] font-bold mb-2">
                  Aswanth &amp; Geethanjali
                </h2>

                <p className="text-xs sm:text-sm font-serif italic text-[#7A695B] max-w-[500px] mx-auto mb-6 px-3 leading-relaxed">
                  &ldquo;Two souls, one sacred path, bound by eternal love and divine blessings.&rdquo;
                </p>

                {/* Dual Photo Showcase Grid */}
                <div className="w-full max-w-[640px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 px-2">

                  {/* Photo 1: Together in Love */}
                  <div
                    onClick={() => setSelectedPhoto({
                      src: "/ashwageetham/couple_portrait.jpg",
                      title: "Aswanth & Geethanjali",
                      subtitle: "Together in Love & Boundless Joy"
                    })}
                    className="group relative rounded-2xl p-[3px] bg-gradient-to-b from-[#D4AF37] via-[#FFF2B2] to-[#AA7C11] shadow-[0_12px_32px_rgba(88,15,30,0.18)] hover:shadow-[0_20px_48px_rgba(212,175,55,0.4)] transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
                  >
                    <div className="relative w-full rounded-[13px] overflow-hidden bg-[#2D060D] aspect-[4/5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/ashwageetham/couple_portrait.jpg"
                        alt="Aswanth & Geethanjali Portrait"
                        style={{ objectPosition: "center 38%" }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Golden ambient gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060D]/90 via-[#2D060D]/20 to-transparent pointer-events-none" />

                      {/* Ornate Corner Accents */}
                      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

                      {/* Tap to View Hint */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs text-[#FFF1C5] p-1.5 rounded-full border border-[#D4AF37]/50">
                        <span className="material-symbols-outlined text-[16px] block">fullscreen</span>
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-3 inset-x-3 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EA]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-md mb-1.5">
                          <span className="text-xs">🌸</span>
                          <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#580F1E]">
                            Love &amp; Companionship
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#FFF5DF] tracking-wide drop-shadow-sm">
                          Aswanth &amp; Geethanjali
                        </h4>
                      </div>
                    </div>
                  </div>

                  {/* Photo 2: Under Sacred Grace (Adiyogi) */}
                  <div
                    onClick={() => setSelectedPhoto({
                      src: "/ashwageetham/couple_adiyogi.jpg",
                      title: "Seeking Divine Blessings",
                      subtitle: "Under the Sacred Grace of Mahadev"
                    })}
                    className="group relative rounded-2xl p-[3px] bg-gradient-to-b from-[#D4AF37] via-[#FFF2B2] to-[#AA7C11] shadow-[0_12px_32px_rgba(88,15,30,0.18)] hover:shadow-[0_20px_48px_rgba(212,175,55,0.4)] transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
                  >
                    <div className="relative w-full rounded-[13px] overflow-hidden bg-[#2D060D] aspect-[4/5]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/ashwageetham/couple_adiyogi.jpg"
                        alt="Aswanth & Geethanjali with Adiyogi Shiva"
                        style={{ objectPosition: "center 50%" }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Golden ambient gradient overlay at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#2D060D]/90 via-[#2D060D]/20 to-transparent pointer-events-none" />

                      {/* Ornate Corner Accents */}
                      <div className="absolute top-2.5 left-2.5 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute top-2.5 right-2.5 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute bottom-2.5 left-2.5 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
                      <div className="absolute bottom-2.5 right-2.5 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />

                      {/* Tap to View Hint */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 backdrop-blur-xs text-[#FFF1C5] p-1.5 rounded-full border border-[#D4AF37]/50">
                        <span className="material-symbols-outlined text-[16px] block">fullscreen</span>
                      </div>

                      {/* Bottom Caption Pill */}
                      <div className="absolute bottom-3 inset-x-3 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EA]/90 backdrop-blur-md border border-[#D4AF37]/60 shadow-md mb-1.5">
                          <span className="text-xs">🔱</span>
                          <span className="text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-wider text-[#580F1E]">
                            Divine Grace
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-serif font-bold text-[#FFF5DF] tracking-wide drop-shadow-sm">
                          Sacred Union
                        </h4>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Poetic Couple Quote Banner */}
                <div className="mt-6 max-w-[540px] mx-auto p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-[#D4AF37]/50 shadow-xs text-center">
                  <div className="flex items-center justify-center gap-1.5 text-[#D4AF37] mb-1">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </div>
                  <p className="text-xs sm:text-sm font-serif italic text-[#580F1E] font-medium leading-relaxed px-2">
                    &ldquo;In each other, we found our greatest blessing, our true home, and our forever love.&rdquo;
                  </p>
                </div>
              </section>

              <FlourishDividerSVG />

              {/* ----------------------------------------------------------------- */}
              {/* SECTION E: CEREMONY, DATE & MUHURTHAM TIMELINE                    */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8">
                <div className="text-center mb-6">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold block mb-1">
                    Ceremony & Timings
                  </span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#580F1E] font-bold">
                    Thalikettu & Vivaham
                  </h2>
                </div>

                {/* Responsive 1-col on mobile, 3-col on desktop */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {/* Card 1: Date */}
                  <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-[#D4AF37]/50 flex flex-col items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#580F1E]/10 text-[#580F1E] flex items-center justify-center mb-2.5">
                      <span className="material-symbols-outlined text-[22px]">calendar_month</span>
                    </div>
                    <span className="text-[9px] font-sans tracking-widest text-[#8C6D23] uppercase font-bold">
                      Auspicious Day
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#580F1E] mt-0.5">
                      WEDNESDAY
                    </h4>
                    <p className="text-lg sm:text-xl font-serif font-extrabold text-[#580F1E]">
                      NOV 11, 2026
                    </p>
                    <p className="text-xs text-[#7A695B] font-sans mt-1">
                      11 . 11 . 2026
                    </p>
                  </div>

                  {/* Card 2: Muhurtham */}
                  <div className="w-full bg-gradient-to-b from-white via-[#FAF5EA] to-white rounded-xl p-5 shadow-md border-2 border-[#D4AF37] flex flex-col items-center justify-center relative">
                    <div className="absolute top-0 inset-x-0 bg-[#D4AF37] text-[#331118] text-[8px] font-sans font-extrabold tracking-widest uppercase py-0.5">
                      MUHURTHAM
                    </div>
                    <div className="w-11 h-11 rounded-full bg-[#580F1E] text-[#FAF5EA] flex items-center justify-center mt-2 mb-2.5 shadow-sm">
                      <span className="material-symbols-outlined text-[22px]">schedule</span>
                    </div>
                    <span className="text-[9px] font-sans tracking-widest text-[#8C6D23] uppercase font-bold">
                      Sacred Timing
                    </span>
                    <h4 className="text-base sm:text-lg font-serif font-extrabold text-[#580F1E] mt-0.5 leading-snug">
                      11:00 A.M & 12:00 NOON
                    </h4>
                    <p className="text-xs text-[#5E4D3E] font-sans mt-1">
                      Thalikettu Ceremony
                    </p>
                  </div>

                  {/* Card 3: Venue */}
                  <div className="w-full bg-white rounded-xl p-5 shadow-sm border border-[#D4AF37]/50 flex flex-col items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#580F1E]/10 text-[#580F1E] flex items-center justify-center mb-2.5">
                      <span className="material-symbols-outlined text-[22px]">location_on</span>
                    </div>
                    <span className="text-[9px] font-sans tracking-widest text-[#8C6D23] uppercase font-bold">
                      Venue
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-[#580F1E] mt-0.5 leading-snug">
                      THE HILL DISTRICT CLUB
                    </h4>
                    <p className="text-xs font-serif font-semibold text-[#8C6D23]">
                      KOLAGAPARA
                    </p>
                    <p className="text-[11px] text-[#7A695B] font-sans mt-0.5">
                      Wayanad, Kerala
                    </p>
                  </div>
                </div>

                {/* Wedding Feast Callout */}
                <div className="w-full mt-4 p-3.5 rounded-xl bg-white/80 border border-[#D4AF37]/40 flex items-center justify-center gap-2.5 text-center text-xs sm:text-sm text-[#580F1E] font-medium">
                  <span className="material-symbols-outlined text-[20px] text-[#D4AF37]">restaurant</span>
                  <span>Followed by Traditional Kerala Grand Wedding Sadya from <strong>12:30 P.M. onwards</strong></span>
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION F: INTERACTIVE FLOWER & AKSHATHA SHOWER                   */}
              {/* ----------------------------------------------------------------- */}
              <section id="blessings" className="w-full my-8 text-center scroll-mt-20">
                <div className="w-full max-w-[620px] mx-auto rounded-2xl p-[2px] bg-gradient-to-b from-[#D4AF37] via-[#F4E295] to-[#AA7C11] shadow-[0_12px_36px_rgba(88,15,30,0.22)]">
                  <div className="relative w-full rounded-[14px] bg-gradient-to-b from-[#4A0A17] via-[#5C0D1E] to-[#3B0712] text-[#FAF5EA] p-6 sm:p-8 overflow-hidden">
                    {/* Subtle royal background glow and pattern */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-36 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    {/* Ornate Corner Accents */}
                    <svg className="absolute top-2 left-2 w-5 h-5 text-[#D4AF37]/60 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 2h8M2 2v8M2 2l7 7" />
                    </svg>
                    <svg className="absolute top-2 right-2 w-5 h-5 text-[#D4AF37]/60 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2h-8M22 2v8M22 2l-7 7" />
                    </svg>
                    <svg className="absolute bottom-2 left-2 w-5 h-5 text-[#D4AF37]/60 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 22h8M2 22v-8M2 22l7-7" />
                    </svg>
                    <svg className="absolute bottom-2 right-2 w-5 h-5 text-[#D4AF37]/60 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 22h-8M22 22v-8M22 22l-7-7" />
                    </svg>

                    {/* Top Auspicious Icon Badge */}
                    <div className="relative z-10 flex items-center justify-center mx-auto w-12 h-12 rounded-full bg-gradient-to-b from-[#D4AF37]/25 to-transparent border border-[#F4E295]/50 shadow-[0_0_15px_rgba(212,175,55,0.25)] mb-3">
                      <span className="material-symbols-outlined text-[26px] text-[#F4E295] animate-pulse leading-none">
                        local_florist
                      </span>
                    </div>

                    {/* Subtitle tag */}
                    <span className="relative z-10 text-[10px] sm:text-xs font-serif uppercase tracking-[0.25em] text-[#F4E295]/90 font-bold block mb-1">
                      Auspicious Petal Shower
                    </span>

                    {/* Section Heading */}
                    <h3 className="relative z-10 text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4E295] via-[#FFF6D6] to-[#D4AF37] tracking-wide mb-2 text-center">
                      Shower Divine Blessings
                    </h3>

                    {/* Traditional Gold Divider */}
                    <div className="relative z-10 flex items-center justify-center gap-2 mb-3.5">
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-[#F4E295]" />
                      <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]" />
                    </div>

                    {/* Description Text with proper width & typography */}
                    <p className="relative z-10 text-xs sm:text-sm font-serif italic text-[#FAF0DE] max-w-[500px] mx-auto mb-6 leading-relaxed px-2 text-center">
                      Tap below to shower fragrant flowers and sacred Akshatha upon Aswanth &amp; Geethanjali.
                    </p>

                    {/* Buttons & Live Counter with matching heights & perfect alignment */}
                    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-[460px] mx-auto w-full">
                      {/* Shower Flowers Button */}
                      <button
                        onClick={handleBlessingShowerClick}
                        className="w-full sm:w-auto h-12 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F4E295] to-[#C5A059] text-[#331118] font-sans font-bold text-xs tracking-wider uppercase shadow-[0_4px_18px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_24px_rgba(212,175,55,0.65)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#FFF6D6]/70 group"
                      >
                        <span className="material-symbols-outlined text-[20px] text-[#4A0A17] transition-transform duration-300 group-hover:rotate-45 leading-none">
                          spa
                        </span>
                        <span className="whitespace-nowrap">Shower Flowers</span>
                      </button>

                      {/* Counter Badge */}
                      <div className="w-full sm:w-auto h-12 px-5 rounded-full bg-black/40 backdrop-blur-sm border border-[#D4AF37]/50 text-xs text-[#FAF5EA] font-sans flex items-center justify-center gap-2 shadow-inner">
                        <span className="text-base leading-none">🌸</span>
                        <strong className="text-sm font-serif font-bold text-[#F4E295] tracking-wide">
                          {blessingCount}
                        </strong>
                        <span className="text-[#E8DEC8] text-[11px] uppercase tracking-wider font-semibold whitespace-nowrap">
                          Blessings Showered
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION G: VENUE MAP & DIRECT DIRECTIONS                          */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8">
                <div className="text-center mb-4">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold block mb-1">
                    Venue Guide
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif text-[#580F1E] font-bold">
                    Location & Directions
                  </h2>
                </div>

                <div className="w-full bg-white rounded-xl shadow-md border border-[#D4AF37]/50 overflow-hidden">
                  <div className="p-4 bg-[#FAF5EA] border-b border-[#D4AF37]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="text-base font-serif font-bold text-[#580F1E]">
                        The Hill District Club
                      </h4>
                      <p className="text-xs font-sans text-[#5E4D3E]">
                        Kolagapara, NH 766, Sulthan Bathery / Meenangadi, Wayanad
                      </p>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href="https://maps.google.com/?q=The+Hill+District+Club,+Kolagapara,+Wayanad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#580F1E] text-[#FAF5EA] font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 hover:bg-[#400B16] transition-all shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">directions</span>
                        <span>Directions</span>
                      </a>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(
                            "The Hill District Club, Kolagapara, Wayanad, Kerala"
                          );
                          showToast("📍 Venue address copied to clipboard!");
                        }}
                        className="px-3 py-2 rounded-lg bg-white border border-[#D4AF37]/60 text-[#580F1E] font-sans font-medium text-xs flex items-center gap-1 hover:bg-[#FAF5EA] transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">content_copy</span>
                        <span>Copy</span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full h-64 sm:h-72 bg-gray-100 relative">
                    <iframe
                      title="The Hill District Club Kolagapara Location"
                      src="https://maps.google.com/maps?q=The+Hill+District+Club+Kolagapara+Wayanad+Kerala&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION H: CALENDAR & WHATSAPP RSVP ACTION CARDS                  */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Calendar Card */}
                  <div className="w-full bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#D4AF37]/40 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-[#580F1E]/10 text-[#580F1E] flex items-center justify-center mb-2.5">
                        <span className="material-symbols-outlined text-[22px]">event_available</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#580F1E]">Save The Date</h4>
                      <p className="text-xs font-sans text-[#5E4D3E] mt-1 mb-4 leading-relaxed">
                        Add to your personal digital calendar to receive reminders on the wedding day.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                      <a
                        href={getGoogleCalendarUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-lg bg-[#580F1E] text-[#FAF5EA] font-sans font-bold text-xs tracking-wider uppercase text-center hover:bg-[#400B16] transition-all"
                      >
                        Google Calendar
                      </a>
                      <button
                        onClick={downloadIcs}
                        className="py-2.5 px-3.5 rounded-lg bg-[#FAF5EA] border border-[#D4AF37]/60 text-[#580F1E] font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#F3ECE0] transition-all cursor-pointer"
                      >
                        Apple / iCal
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp RSVP Card */}
                  <div className="w-full bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#D4AF37]/40 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2.5">
                        <span className="material-symbols-outlined text-[22px]">chat</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#580F1E]">Confirm RSVP</h4>
                      <p className="text-xs font-sans text-[#5E4D3E] mt-1 mb-4 leading-relaxed">
                        Let the family know you will be joining the auspicious celebration via WhatsApp.
                      </p>
                    </div>
                    <div className="pt-2 border-t border-gray-100">
                      <a
                        href={getWhatsAppRsvpUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-sm"
                      >
                        <span>RSVP on WhatsApp</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <FlourishDividerSVG />

              {/* ----------------------------------------------------------------- */}
              {/* SECTION I: LOVE AND REGARDS FAMILY SECTION (User requirement)    */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8 text-center">
                <div className="w-full max-w-[500px] mx-auto p-6 sm:p-8 rounded-2xl bg-white/80 border border-[#D4AF37]/50 shadow-sm">
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <div className="h-[1px] w-6 bg-[#D4AF37]" />
                    <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold">
                      With Warmth & Affection
                    </span>
                    <div className="h-[1px] w-6 bg-[#D4AF37]" />
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#580F1E] mb-3">
                    LOVE AND REGARDS
                  </h3>

                  <div className="space-y-2 font-serif px-2">
                    <div className="text-base sm:text-lg md:text-xl text-[#331118] font-bold tracking-wide">
                      Aswathy ,Akhil ,Anuraj
                    </div>
                    <div className="text-sm sm:text-base md:text-lg text-[#8C6D23] font-semibold italic">
                      Ridhai & Lyra
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#7A695B] font-sans italic leading-relaxed px-2">
                    &ldquo;Your gracious presence and heartfelt blessings on this auspicious day are the most cherished gift for our family.&rdquo;
                  </p>
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION J: DIGITAL GUESTBOOK WISHES WALL                         */}
              {/* ----------------------------------------------------------------- */}
              <section className="w-full my-8">
                <div className="text-center mb-6">
                  <span className="text-[10px] md:text-xs font-sans tracking-[0.25em] uppercase text-[#8C6D23] font-bold block mb-1">
                    Guestbook
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif text-[#580F1E] font-bold">
                    Leave Your Blessings
                  </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleWishSubmit} className="w-full max-w-[500px] mx-auto bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#D4AF37]/40 mb-6 space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-sans font-bold text-[#580F1E] uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Suresh & Family"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold text-[#580F1E] uppercase tracking-wider mb-1">
                      Relation / Place (Optional)
                    </label>
                    <input
                      type="text"
                      value={relation}
                      onChange={(e) => setRelation(e.target.value)}
                      placeholder="e.g. Family Friend, Sulthan Bathery"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-bold text-[#580F1E] uppercase tracking-wider mb-1">
                      Your Message / Blessing *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={blessingMsg}
                      onChange={(e) => setBlessingMsg(e.target.value)}
                      placeholder="Wishing you a lifetime of endless joy, prosperity, and harmony..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none text-xs sm:text-sm font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#580F1E] text-[#FAF5EA] font-sans font-bold text-xs tracking-wider uppercase hover:bg-[#400B16] transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">send</span>
                    <span>Post Blessing</span>
                  </button>
                </form>

                {/* Wishes List */}
                <div className="w-full max-w-[500px] mx-auto space-y-3">
                  {wishes.map((w) => (
                    <div
                      key={w.id}
                      className="w-full bg-white rounded-xl p-4 shadow-xs border border-[#D4AF37]/30 text-left"
                    >
                      <p className="text-xs sm:text-sm font-serif italic text-[#331118] leading-relaxed mb-2">
                        &ldquo;{w.message}&rdquo;
                      </p>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-[11px] font-sans">
                        <div className="flex items-center gap-1.5">
                          <strong className="text-[#580F1E] font-semibold">{w.name}</strong>
                          {w.relation && <span className="text-[#7A695B]">({w.relation})</span>}
                        </div>
                        <span className="text-[#8C6D23] font-mono text-[10px]">{w.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ----------------------------------------------------------------- */}
              {/* SECTION K: FOOTER KASAVU BROCADE BAND                             */}
              {/* ----------------------------------------------------------------- */}
              <footer className="w-full mt-10 rounded-xl overflow-hidden border border-[#D4AF37]/60">
                <KeralaKasavuBorder />
              </footer>

            </div>
          </div>
        </article>
      </main>

      {/* ========================================================================= */}
      {/* 3. RESPONSIVE MOBILE QUICK BOTTOM BAR                                     */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#FAF5EA]/95 backdrop-blur-md border-t border-[#D4AF37]/40 py-2 px-4 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] flex items-center justify-between w-full max-w-[480px] mx-auto sm:hidden">
        <a
          href="https://maps.google.com/?q=The+Hill+District+Club,+Kolagapara,+Wayanad"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 text-[#580F1E] text-[10px] font-sans font-semibold py-1 hover:text-[#331118]"
        >
          <span className="material-symbols-outlined text-[20px]">directions</span>
          <span>Venue</span>
        </a>

        <button
          onClick={handleBlessingShowerClick}
          className="flex flex-col items-center justify-center flex-1 text-[#580F1E] text-[10px] font-sans font-semibold py-1 hover:text-[#331118] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px] text-[#D4AF37]">spa</span>
          <span>Bless</span>
        </button>

        <a
          href={getWhatsAppRsvpUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 text-emerald-800 text-[10px] font-sans font-bold py-1 hover:text-emerald-900"
        >
          <span className="material-symbols-outlined text-[20px]">chat</span>
          <span>RSVP</span>
        </a>

        <button
          onClick={() => toggleAudio()}
          className="flex flex-col items-center justify-center flex-1 text-[#580F1E] text-[10px] font-sans font-semibold py-1 hover:text-[#331118] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">
            {isPlaying ? "volume_up" : "volume_off"}
          </span>
          <span>{isPlaying ? "Mute" : "Music"}</span>
        </button>
      </nav>

      {/* ========================================================================= */}
      {/* 4. CUSTOM ANIMATION STYLES & FLUID BEHAVIOR                               */}
      {/* ========================================================================= */}
      <style jsx global>{`
        /* Petal Falling & Swaying */
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

        /* Lamp Flame Flickering */
        @keyframes flameFlicker {
          0%, 100% {
            transform: scale(1) skewX(0deg);
            opacity: 0.95;
          }
          25% {
            transform: scale(1.08, 0.96) skewX(-2deg);
            opacity: 1;
          }
          50% {
            transform: scale(0.95, 1.05) skewX(1deg);
            opacity: 0.9;
          }
          75% {
            transform: scale(1.04, 0.98) skewX(-1deg);
            opacity: 1;
          }
        }
        .animate-flame {
          animation: flameFlicker 1.8s ease-in-out infinite;
        }
        .animate-flame-inner {
          animation: flameFlicker 1.2s ease-in-out infinite reverse;
        }

        /* Temple Bell Swing */
        @keyframes bellSwing {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        .animate-bell-swing {
          animation: bellSwing 4s ease-in-out infinite;
        }

        /* Toast Drop Animation */
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

        /* Modal Fade In */
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-modal-in {
          animation: modalFadeIn 0.25s ease-out forwards;
        }

        /* Music Equalizer Bar Animations */
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

        /* Floating WhatsApp Share Button (exact to AjayAparnaTheme) */
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
            bottom: 74px;
            right: 18px;
          }
        }

        .share-toggle-btn {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid #C5A059;
          color: #2C2520;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 8px 16px rgba(44, 37, 32, 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .share-toggle-btn i {
          color: #25D366;
          transition: transform 0.3s ease;
        }

        .share-toggle-btn:hover {
          transform: scale(1.1);
          background: #FFFFFF;
          box-shadow: 0 16px 32px rgba(44, 37, 32, 0.12);
        }

        .share-toggle-btn:hover i {
          transform: scale(1.15) rotate(8deg);
          color: #580F1E;
        }
      `}</style>
    </div>
  );
}
