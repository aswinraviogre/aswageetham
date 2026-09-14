"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { invites } from "@/data/invites";
import { motion } from "framer-motion";
import { CardStack } from "@/components/ui/card-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";

const IMPORTANCE_ITEMS = [
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
    title: "Interactive Photo Gallery",
    description: "A gorgeous, swipeable photo gallery displaying pre-wedding shoots, family functions, and save-the-date memories.",
    imageSrc: "/wedding_card_3.png",
    href: "/",
  },
];

const INVITE_CARDS = [
  {
    id: 1,
    title: "Aswanth & Geethanjali (Ashwageetham)",
    description: "Ashwageetham Kerala Royal: Traditional royal procession artwork, interactive 3D wax seal envelope, wedding countdown, Thalikettu ceremony at The Hill District Club, and continuous wedding BGM.",
    imageSrc: "/ashwageetham/theme_card.jpg",
    href: "/invite/aswanth-geethanjali-wedding-digital-invitation",
  },
  {
    id: 2,
    title: "Anandhu & Archana",
    description: "Kerala Traditional: Rich gold and green traditional theme featuring falling petals, video reels, and traditional music.",
    imageSrc: "/kerala_couple_1_1777897655779.png",
    href: "/invite/anandhu-archana-kerala-wedding",
  },
  {
    id: 3,
    title: "Daniel & Maria",
    description: "Christian Elegance: Minimalist heavenly blue and white aesthetic with gentle scroll transitions.",
    imageSrc: "/sia_img/desktop-sia.png",
    href: "/invite/daniel-maria-wedding",
  },
  {
    id: 4,
    title: "Aditya & Meera",
    description: "Royal Palace: Deep maroon and gold luxury theme with sparkling particle effects and cinematic animations.",
    imageSrc: "/hero-bg.jpg",
    href: "/invite/aditya-meera-royal-wedding",
  },
  {
    id: 5,
    title: "Ajay & Aparna",
    description: "Ajay & Aparna Traditional: Interactive 3D envelope opening sequence, gold wax seal, and traditional background audio.",
    imageSrc: "/couple_casual.jpg",
    href: "/invite/ajay-aparna-wedding-digital-invitation",
  },
  {
    id: 6,
    title: "Sukanya & Sreejith",
    description: "Sreejith & Sukanya Traditional: Interactive 3D envelope, gold wax seal, traditional background audio, addresses, and contacts.",
    imageSrc: "/sukanya_sreejith_couple_1.jpg",
    href: "/invite/sreejith-sukanya-wedding-digital-invitation",
  },
  {
    id: 7,
    title: "Vishnu & Athulya",
    description: "Vishnu & Athulya Kerala Premium: Multi-panel slide envelope, gold wax seal, interactive scratch details card, dynamic floating petals, snap carousel, local guestbook, and traditional music.",
    imageSrc: "/vishnu_athulya/couple_close.jpg",
    href: "/invite/vishnu-athulya-wedding-digital-invitation",
  },
];

const MOCKUP_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDmko94YpFi7CzGTYaZceQrEcv4jJH2ICZG_4Ufxx3sxbicIwMOHEyAxRWA3G-X7C53zmH9HUn9ZclHF1W7hJ_HuCIeP-KBwwr6D-WRBdXGMmdPTx2VW7DpLU202gdcFreLy1LHDPK0PFqMgjCWWwb1ISKxUmmt26WQCY0cNdgJf2wMr-aG5-Zq_vYIca5amNweOrGxr8Jk2jEtKunohrQKiLf9DuvYDXHY-WR1PKI779FRbLBFaufA9wqaGLkkLqEjqkBtyWZ-swM";

const FEATURES = [
  { icon: "palette", color: "#7c3aed", bg: "#f3f0ff", title: "AI-Curated Aesthetics", desc: "Upload a mood board or select a color palette — our AI instantly generates a cohesive, magazine-quality layout tailored to your vibe." },
  { icon: "how_to_reg", color: "#0ea5e9", bg: "#e0f2fe", title: "Smart RSVP", desc: "Automated meal tracking, plus-one logic, and instant guest list exports." },
  { icon: "photo_library", color: "#10b981", bg: "#d1fae5", title: "Interactive Photo Gallery", desc: "A gorgeous, swipeable photo gallery displaying pre-wedding shoots, family functions, and save-the-date memories." },
  { icon: "send_to_mobile", color: "#f59e0b", bg: "#fef3c7", title: "Instant WhatsApp Invitation", desc: "Send personalized, beautifully formatted wedding website links and digital cards directly to your guests on WhatsApp in one click." },
];

const TEMPLATES = [
  {
    title: "Ashwageetham Royal Kerala",
    couple: "Aswanth & Geethanjali",
    slug: "aswanth-geethanjali-wedding-digital-invitation",
    desc: "Ivory and imperial burgundy theme with traditional royal chariot & elephant procession, 3D wax seal envelope, live countdown, and continuous wedding BGM.",
    image: "/ashwageetham/theme_card.jpg",
    bgClass: "border-amber-500/40 bg-[#250810]/95",
    tagColor: "bg-amber-500/20 text-amber-200 border border-amber-500/30",
    badge: "⭐ Featured",
    gradient: "from-[#4a0e17] via-[#66182c] to-[#4a0e17]",
    textCol: "text-[#FAF6EF]",
    subtitleCol: "text-[#FAF6EF]/80"
  },
  {
    title: "Kerala Traditional",
    couple: "Anandhu & Archana",
    slug: "anandhu-archana-kerala-wedding",
    desc: "Rich gold and green traditional theme featuring falling petals, video reels, and traditional music.",
    image: "/kerala_couple_1_1777897655779.png",
    bgClass: "border-emerald-500/20 bg-[#0c1813]/90",
    tagColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20",
    gradient: "from-emerald-900 via-emerald-800 to-emerald-700",
    textCol: "text-emerald-200",
    subtitleCol: "text-emerald-300"
  },
  {
    title: "Christian Elegance",
    couple: "Daniel & Maria",
    slug: "daniel-maria-wedding",
    desc: "Minimalist heavenly blue and white aesthetic with gentle scroll transitions and interactive elements.",
    image: "/sia_img/desktop-sia.png",
    bgClass: "border-sky-500/20 bg-[#07131c]/90",
    tagColor: "bg-sky-500/20 text-sky-300 border border-sky-500/20",
    gradient: "from-sky-100 via-sky-50 to-white",
    textCol: "text-sky-800",
    subtitleCol: "text-sky-600"
  },
  {
    title: "Royal Palace",
    couple: "Aditya & Meera",
    slug: "aditya-meera-royal-wedding",
    desc: "Deep maroon and gold luxury theme with sparkling particle effects and cinematic animations.",
    image: "/hero-bg.jpg",
    bgClass: "border-red-500/20 bg-[#1c080b]/90",
    tagColor: "bg-red-500/20 text-red-300 border border-red-500/20",
    gradient: "from-[#6b0504] via-[#8d0801] to-[#6b0504]",
    textCol: "text-amber-200",
    subtitleCol: "text-amber-400"
  },
  {
    title: "Ajay & Aparna Traditional",
    couple: "Ajay & Aparna",
    slug: "ajay-aparna-wedding-digital-invitation",
    desc: "Interactive 3D envelope opening sequence, gold wax seal trigger, falling petals, and Kerala traditional background audio.",
    image: "/couple_casual.jpg",
    bgClass: "border-amber-500/20 bg-[#181107]/90",
    tagColor: "bg-amber-500/20 text-amber-300 border border-amber-500/20",
    gradient: "from-[#1b4332] via-[#2d6a4f] to-[#1b4332]",
    textCol: "text-[#d4af37]",
    subtitleCol: "text-[#d4af37]/80"
  },
  {
    title: "Sreejith & Sukanya Traditional",
    couple: "Sukanya & Sreejith",
    slug: "sreejith-sukanya-wedding-digital-invitation",
    desc: "Interactive 3D envelope, gold wax seal, Kerala traditional background audio, addresses, and contacts.",
    image: "/sukanya_sreejith_couple_1.jpg",
    bgClass: "border-yellow-500/20 bg-[#181507]/90",
    tagColor: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20",
    gradient: "from-[#603813] via-[#b29f7f] to-[#603813]",
    textCol: "text-[#FAF6F0]",
    subtitleCol: "text-[#FAF6F0]/80"
  },
  {
    title: "Vishnu & Athulya Kerala Premium",
    couple: "Vishnu & Athulya",
    slug: "vishnu-athulya-wedding-digital-invitation",
    desc: "Multi-panel slide envelope, gold wax seal, interactive scratch details card, dynamic floating petals, snap carousel, local guestbook, and traditional music.",
    image: "/vishnu_athulya/couple_close.jpg",
    bgClass: "border-rose-500/20 bg-[#1f0008]/90",
    tagColor: "bg-rose-500/20 text-rose-300 border border-rose-500/20",
    gradient: "from-[#2b080c] via-[#800020] to-[#2b080c]",
    textCol: "text-[#faebb7]",
    subtitleCol: "text-[#faebb7]/80"
  },
];

const FAQS = [
  { q: "How long does it take?", a: "We deliver your live link within 24–48 hours of receiving your details." },
  { q: "Can I edit the details later?", a: "Yes — update event details, photos, and music anytime from your dashboard." },
  { q: "Do you provide custom domains?", a: "Premium plans include a custom domain for one year so your link is easy to remember." },
  { q: "Is it mobile friendly?", a: "Yes. Every invitation is optimized to look beautiful on phones, tablets, and desktops." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="text-base font-semibold text-slate-900">{q}</span>
        <span
          className="material-symbols-outlined shrink-0 text-[#7c3aed] transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          add
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm leading-relaxed text-slate-600">{a}</p>
        </div>
      )}
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const
    }
  }
};

const getFeatureIcon = (iconName: string, color: string) => {
  if (iconName === "palette") {
    return (
      <svg className="w-[22px] h-[22px]" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-2.224.236l-3.488 1.938A1.196 1.196 0 003.12 19.34v.263a1.2 1.2 0 001.2 1.2h1.688a1.2 1.2 0 001.12-.767l1.01-2.907a3 3 0 011.392-1.637l3.488-1.938A1.196 1.196 0 0014.28 12.56v-.263a1.2 1.2 0 00-1.2-1.2h-1.688a1.2 1.2 0 00-1.12.767l-1.01 2.907zM16.242 16.242A6 6 0 113.757 3.757a6 6 0 018.485 8.485" />
      </svg>
    );
  }
  if (iconName === "how_to_reg") {
    return (
      <svg className="w-[22px] h-[22px]" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  }
  if (iconName === "photo_library") {
    return (
      <svg className="w-[22px] h-[22px]" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    );
  }
  return (
    <svg className="w-[22px] h-[22px]" fill="none" stroke={color} strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
};

const KERALA_TESTIMONIALS = [
  {
    name: "Amal Dev",
    username: "@amaldev",
    body: "Nalla kidu website! All our family members in Kozhikode RSVP'd within 2 days. Super easy! 🔥",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Kozhikode",
  },
  {
    name: "Anjali Nair",
    username: "@anjalinair",
    body: "Absolutely loved the traditional Kerala theme. Background music and falling petals are beautiful! Highly recommended.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Ernakulam",
  },
  {
    name: "Rohit Krishnan",
    username: "@rohitkrish",
    body: "Ellarkkum bhayangara ishtamayi! The Wax seal animation was so premium. Worth every rupee! 💯",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Trivandrum",
  },
  {
    name: "Meera Pillai",
    username: "@meera",
    body: "RSVP tracking was a lifesaver. Custom food options and table management was perfect.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Kottayam",
  },
  {
    name: "Siddharth K.",
    username: "@sid_k",
    body: "Simple and elegant. Mobile view is superb. Nalla work! 👏",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Palakkad",
  },
  {
    name: "Divya Jose",
    username: "@divya_j",
    body: "Live photo wall during the reception was awesome! All guests uploaded photos directly to the gallery.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120",
    country: "🌴 Thrissur",
  },
];

function TestimonialCard({ img, name, username, body, country }: typeof KERALA_TESTIMONIALS[number]) {
  return (
    <Card className="w-64 border border-white/10 bg-[#1e134a]/30 backdrop-blur-sm text-white">
      <CardContent className="p-5">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9 border border-white/20">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-purple-800 text-white text-xs">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-semibold text-white flex items-center gap-1">
              {name} <span className="text-[10px] opacity-60">{country}</span>
            </figcaption>
            <p className="text-[10px] font-medium text-purple-300/70">{username}</p>
          </div>
        </div>
        <blockquote className="mt-3 text-xs leading-relaxed text-purple-200/80">{body}</blockquote>
      </CardContent>
    </Card>
  );
}

export function LandingHome() {
  const ashwageethamPath = "/invite/aswanth-geethanjali-wedding-digital-invitation";
  const primary = invites[0];
  const demoPath = ashwageethamPath;
  const whatsappUrl = `https://wa.me/${primary.phone}`;

  return (
    <>

      {/* ── HEADER ── */}
      <Header whatsappUrl={whatsappUrl} />

      <div className="pt-[72px] pb-[max(5rem,calc(3.5rem+env(safe-area-inset-bottom,0px)+1rem))] md:pb-0">
        <main className="grow">
          {/* ── HERO ── */}
          <section
            id="hero"
            className="relative scroll-mt-[80px] overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at 70% 50%, #1a0a3e 0%, #0d0020 60%, #050010 100%)",
              minHeight: "calc(100vh - 72px)",
            }}
          >
            {/* Dot grid */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Glow orbs */}
            <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-30" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)" }} />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(60px)" }} />

            <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-10">
              {/* Left copy */}
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[15px] text-purple-300">auto_awesome</span>
                  <span className="text-xs font-semibold tracking-wider text-purple-200">Next-Gen Wedding Tech</span>
                </div>

                <h1 className="font-display text-[2.6rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
                  Create{" "}
                  <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Beautiful Digital Wedding Invitations
                  </span>
                </h1>

                <p className="text-base leading-relaxed text-purple-100/80" style={{ maxWidth: "480px" }}>
                  Ditch the paper and the complex builders. Create a breathtaking, AI-powered wedding website and digital invitation suite in minutes. Manage RSVPs effortlessly.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #6d28d9)", boxShadow: "0 4px 24px rgba(124,58,237,0.5)" }}
                  >
                    Start for Free
                  </a>
                  <Link
                    href={ashwageethamPath}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-7 py-3.5 text-sm font-semibold text-amber-200 backdrop-blur-sm transition hover:bg-amber-500/20 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px] text-amber-300">mail</span>
                    View Ashwageetham Demo
                  </Link>
                </div>
                <p className="text-xs text-purple-300/60">No credit card required. Setup takes 5 minutes.</p>
              </div>

              {/* Right — phone mockup showcasing Ashwageetham */}
              <div className="relative mx-auto flex w-full max-w-[320px] justify-center lg:mx-0 lg:max-w-none lg:justify-end">
                {/* Floating badge top-left */}
                <div
                  className="absolute top-10 -left-4 z-20 flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-[#250810]/85 p-3 shadow-xl backdrop-blur-md sm:-left-8"
                  style={{ animation: "floatY 4s ease-in-out infinite" }}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/30">
                    <span className="material-symbols-outlined text-[18px] text-amber-200">mail</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">Ashwageetham</p>
                    <p className="text-[10px] text-amber-200/80">Aswanth &amp; Geethanjali</p>
                  </div>
                </div>

                {/* Phone */}
                <Link
                  href={ashwageethamPath}
                  className="group relative h-[500px] w-[248px] overflow-hidden rounded-[34px] border-[6px] border-amber-500/30 bg-slate-900 shadow-2xl sm:h-[540px] sm:w-[268px] block cursor-pointer"
                  style={{ transform: "perspective(1200px) rotateY(-8deg) rotateX(4deg)", transition: "transform 0.5s ease" }}
                  title="Click to view Aswanth & Geethanjali Live Invite"
                >
                  <Image src="/ashwageetham/theme_card.jpg" alt="Aswanth & Geethanjali wedding invitation preview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="300px" priority unoptimized />
                  {/* Bottom bar */}
                  <div className="absolute bottom-5 left-3 right-3 flex items-center justify-between rounded-xl border border-amber-400/40 bg-white/95 p-3 shadow-lg backdrop-blur-md">
                    <div>
                      <p className="text-xs font-bold text-slate-900">Aswanth &amp; Geethanjali</p>
                      <p className="text-[10px] text-[#7C1425] font-semibold">Nov 11, 2026 • Royal</p>
                    </div>
                    <span className="rounded-lg px-3 py-1.5 text-[11px] font-bold text-white shadow" style={{ background: "linear-gradient(135deg, #7C1425, #9B1D36)" }}>
                      Open
                    </span>
                  </div>
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-black/40" />
                </Link>

                {/* Bottom floating badge */}
                <div
                  className="absolute -bottom-2 -right-2 z-20 rounded-xl border border-amber-500/30 bg-[#250810]/85 px-4 py-2.5 backdrop-blur-md sm:-right-6 shadow-lg"
                  style={{ animation: "floatY 4.5s ease-in-out 0.8s infinite" }}
                >
                  <p className="text-[11px] font-semibold text-amber-200">✨ 3D Wax Seal &amp; Royal Chariot</p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070215] to-transparent pointer-events-none z-10" />
            <style>{`
            @keyframes floatY {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
          `}</style>
          </section>

          {/* ── FEATURED SPOTLIGHT: ASHWAGEETHAM ── */}
          <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#070215] via-[#1c0612] to-[#0d0020] border-y border-amber-500/20 overflow-hidden">
            {/* Ambient gold glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[600px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, #D4AF37 0%, transparent 70%)", filter: "blur(90px)" }} />

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
              <div className="rounded-3xl border border-amber-500/35 bg-[#250810]/85 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                {/* Left Text Column */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/15 px-4 py-1 mb-4 shadow-sm">
                    <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">⭐ Featured Live Design</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6EE] mb-2 tracking-tight">
                    Ashwageetham
                  </h2>
                  <p className="text-amber-300/80 font-['Cinzel'] tracking-widest text-xs uppercase mb-4 font-semibold">
                    Aswanth &amp; Geethanjali • November 11, 2026
                  </p>

                  <p className="text-purple-100/80 text-sm sm:text-base mb-6 leading-relaxed max-w-xl">
                    Experience our flagship Kerala Royal wedding invitation suite. Features an interactive 3D wax seal envelope opening, traditional chariot &amp; elephant royal procession artwork, pencil sketch portrait, auspicious nadaswaram BGM, and instant WhatsApp RSVP.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                    <Link
                      href={ashwageethamPath}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105"
                      style={{ background: "linear-gradient(135deg, #7C1425, #A51D36)", boxShadow: "0 6px 24px rgba(124,20,37,0.5)" }}
                    >
                      <span className="material-symbols-outlined text-[18px]">mail</span>
                      Open 3D Invitation
                    </Link>
                    <a
                      href="https://wa.me/918848772371?text=Hi!%20I%20love%20the%20Ashwageetham%20wedding%20invitation%20design.%20I%20would%20like%20to%20create%20one%20for%20my%20wedding."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/40 bg-amber-500/10 px-6 py-3.5 text-sm font-semibold text-amber-200 backdrop-blur-sm transition hover:bg-amber-500/20"
                    >
                      <i className="fab fa-whatsapp text-emerald-400 text-base"></i>
                      Order This Design
                    </a>
                  </div>
                </div>

                {/* Right Visual Card Preview */}
                <Link
                  href={ashwageethamPath}
                  className="relative w-full max-w-[360px] aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group cursor-pointer block"
                >
                  <Image
                    src="/ashwageetham/theme_card.jpg"
                    alt="Ashwageetham Wedding Invitation Preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 360px"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                      Live Digital Invite
                    </span>
                    <p className="text-white text-lg font-bold">Aswanth &amp; Geethanjali</p>
                    <span className="text-amber-200/90 text-xs flex items-center gap-1 mt-0.5 group-hover:translate-x-1 transition-transform font-medium">
                      Click to experience <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* ── TEMPLATES ── */}
          <section
            id="templates"
            className="scroll-mt-20 py-20 sm:py-24 relative overflow-hidden"
            style={{
              background: "radial-gradient(ellipse at 70% 50%, #1a0a3e 0%, #0d0020 60%, #050010 100%)",
            }}
          >
            {/* Dot grid */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            {/* Glow orbs */}
            <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(70px)" }} />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(60px)" }} />

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
              <div className="mb-14 text-center">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">Invitation Samples</h2>
                <p className="mx-auto text-base text-purple-200/60" style={{ maxWidth: "560px" }}>Curated templates you can personalize to match your wedding vision.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
                {TEMPLATES.map((t) => (
                  <div
                    key={t.slug}
                    className="group relative flex flex-col rounded-2xl sm:rounded-3xl border border-white/10 bg-[#120a2a]/60 backdrop-blur-md overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-purple-500/30"
                  >
                    {/* Image Preview Container */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 border-b border-white/10">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 360px"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      <span className={`absolute top-2 right-2 sm:top-4 sm:right-4 text-[7px] sm:text-[10px] font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${t.tagColor}`}>
                        {t.title}
                      </span>
                    </div>

                    {/* Text Info */}
                    <div className="p-3 sm:p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-sm sm:text-2xl font-bold tracking-tight text-white mb-0.5 sm:mb-1 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                          {t.couple}
                        </h3>
                        <p className="text-[8px] sm:text-[11px] font-bold text-purple-300/70 uppercase tracking-widest mb-2 sm:mb-3">
                          {t.title}
                        </p>
                        <p className="text-purple-100/70 text-[10px] sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-2">
                          {t.desc}
                        </p>
                      </div>
                      <Link
                        href={`/invite/${t.slug}`}
                        className="inline-flex items-center gap-1 text-[9px] sm:text-xs font-bold text-purple-300 uppercase tracking-widest transition group-hover:gap-2 hover:text-white"
                      >
                        Launch Live Demo
                        <span className="material-symbols-outlined text-[12px] sm:text-[14px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070215] to-transparent pointer-events-none z-10" />
          </section>

          {/* ── FEATURES ── */}
          <section id="features" className="scroll-mt-20 bg-[#070215] text-white py-20 sm:py-24 relative overflow-hidden border-t border-white/5">
            {/* Subtle background glow orbs */}
            <div className="pointer-events-none absolute top-10 left-10 h-[300px] w-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(60px)" }} />
            <div className="pointer-events-none absolute bottom-10 right-10 h-[300px] w-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", filter: "blur(60px)" }} />

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8">
              <div className="mb-14 text-center">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Everything you need, nothing you don&apos;t.
                </h2>
                <p className="mx-auto text-base text-purple-200/60" style={{ maxWidth: "560px" }}>
                  Designed for modern couples who want sophisticated design without the hassle of a complex website builder.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-6 pb-8 scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
              >
                {FEATURES.map((f, i) => (
                  <motion.div
                    key={f.title}
                    variants={cardVariants}
                    whileHover={{
                      y: -8,
                      borderColor: "rgba(124, 58, 237, 0.4)"
                    }}
                    className="snap-center shrink-0 w-[285px] md:w-auto min-h-[460px] flex flex-col justify-between rounded-3xl border border-white/10 bg-[#120a2a]/60 backdrop-blur-md p-6 relative overflow-hidden group transition-colors duration-300"
                  >
                    <div>
                      <h3 className="text-xl font-bold tracking-tight text-white mb-2">{f.title}</h3>
                      <p className="text-xs leading-relaxed text-purple-200/60">{f.desc}</p>
                    </div>

                    {/* Mockup Graphics inside cards */}
                    {i === 0 && (
                      <div className="relative w-full h-[180px] rounded-2xl bg-black/40 border border-white/5 mt-8 overflow-hidden flex flex-col justify-center items-center gap-3">
                        <div className="flex gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#1b4332] border border-white/20 shadow-lg transform -rotate-12 translate-x-2" />
                          <div className="w-10 h-10 rounded-full bg-[#d4af37] border border-white/20 shadow-lg z-10" />
                          <div className="w-10 h-10 rounded-full bg-[#faf8f5] border border-white/20 shadow-lg transform rotate-12 -translate-x-2" />
                        </div>
                        <div className="rounded-lg bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] text-purple-200 font-semibold tracking-wider uppercase">
                          Royal Green & Gold
                        </div>
                      </div>
                    )}

                    {i === 1 && (
                      <div className="relative w-full h-[180px] rounded-2xl bg-black/40 border border-white/5 mt-8 p-3.5 overflow-hidden flex flex-col gap-2.5">
                        <div className="flex items-center justify-between border-b border-white/5 pb-2 text-[10px] text-purple-200/50">
                          <span>GUEST RSVP</span>
                          <span className="text-emerald-400 font-bold">✓ ACCEPTED</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-purple-200/70">Attending</span>
                            <span className="font-semibold text-purple-100">Sarah & John</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-purple-200/70">Meal Choice</span>
                            <span className="font-semibold text-purple-100">Chicken & Vegan</span>
                          </div>
                        </div>
                        <div className="mt-auto flex gap-1 justify-center">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-medium">Table 2</span>
                          <span className="text-[9px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-medium">+1 Guest</span>
                        </div>
                      </div>
                    )}

                    {i === 2 && (
                      <div className="relative w-full h-[180px] rounded-2xl bg-black/40 border border-white/5 mt-8 overflow-hidden flex items-center justify-center">
                        <div className="absolute w-[80px] h-[100px] bg-white border border-slate-200 p-1 shadow-2xl transform -rotate-12 -translate-x-12 translate-y-2">
                          <div className="w-full h-[70px] bg-slate-200 relative overflow-hidden">
                            <Image src="/kerala_couple_1_1777897655779.png" alt="Traditional couple" fill className="object-cover" sizes="80px" unoptimized />
                          </div>
                          <div className="text-[6px] text-slate-800 font-bold text-center mt-1">Archana & Anandhu</div>
                        </div>
                        <div className="absolute w-[90px] h-[110px] bg-white border border-slate-200 p-1.5 shadow-2xl z-10 transform rotate-3">
                          <div className="w-full h-[80px] bg-slate-200 relative overflow-hidden">
                            <Image src="/couple_casual.jpg" alt="Casual couple" fill className="object-cover" sizes="90px" unoptimized />
                          </div>
                          <div className="text-[7px] text-slate-800 font-bold text-center mt-1.5">Ajay & Aparna 💍</div>
                        </div>
                        <div className="absolute w-[80px] h-[100px] bg-white border border-slate-200 p-1 shadow-2xl transform rotate-12 translate-x-12 translate-y-3">
                          <div className="w-full h-[70px] bg-slate-200 relative overflow-hidden">
                            <Image src="/gallery/PEPPEADS_1817_resized.jpg" alt="Wedding guest photo" fill className="object-cover" sizes="80px" unoptimized />
                          </div>
                          <div className="text-[6px] text-slate-800 font-bold text-center mt-1">Laughter & Love</div>
                        </div>
                      </div>
                    )}

                    {i === 3 && (
                      <div className="relative w-full h-[180px] rounded-2xl bg-black/40 border border-white/5 mt-8 p-3 overflow-hidden flex flex-col justify-center gap-2">
                        <div className="rounded-xl bg-[#075E54] text-white text-[10px] p-2 max-w-[85%] self-start rounded-tl-none shadow-md leading-relaxed border-l-4 border-[#25D366]">
                          <div className="font-bold text-[#25D366] text-[8px] mb-0.5 uppercase tracking-wider">WhatsApp Invite</div>
                          Hey Sarah! 💌 You&apos;re invited to our wedding. View our page & RSVP here:
                          <span className="underline block mt-0.5 font-semibold text-emerald-300">save-the-date.in/ajay-aparna</span>
                        </div>
                        <div className="rounded-xl bg-[#128C7E]/20 border border-[#128C7E]/40 text-[#25D366] text-[9px] p-1.5 max-w-[85%] self-end rounded-tr-none shadow-md text-right font-medium">
                          Confirmed! Coming with John 🎉
                        </div>
                      </div>
                    )}

                    <div className="mt-auto pt-4 flex justify-end">
                      <span className="material-symbols-outlined text-[20px] text-purple-300 group-hover:translate-x-1 transition-transform duration-200">
                        arrow_forward
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a041c] to-transparent pointer-events-none z-10" />
            <style>{`
            .scrollbar-none::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-none {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          </section>

          {/* ── IMPORTANCE CARD STACK ── */}
          <section className="scroll-mt-20 bg-[#0a041c] text-white py-20 sm:py-24 relative overflow-hidden border-t border-white/5">
            {/* Spotlight gradients */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(90px)" }} />

            <div className="relative z-10 mx-auto max-w-4xl px-6 sm:px-8 flex flex-col items-center">
              <div className="mb-8 text-center">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Explore Our Wedding Invites
                </h2>
                <p className="mx-auto text-base text-purple-200/60" style={{ maxWidth: "480px" }}>
                  Slide, drag, or click through the cards below to preview our premium digital wedding invitations.
                </p>
              </div>

              <div className="w-full max-w-2xl mt-4">
                <CardStack
                  items={INVITE_CARDS}
                  initialIndex={0}
                  autoAdvance
                  intervalMs={3200}
                  pauseOnHover
                  showDots
                />
              </div>
            </div>
          </section>

          {/* ── 3D TESTIMONIALS MARQUEE ── */}
          <section className="scroll-mt-20 bg-[#050010] text-white py-20 sm:py-24 relative overflow-hidden border-t border-white/5">
            {/* Spotlight glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(90px)" }} />

            <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-8 flex flex-col items-center">
              <div className="mb-10 text-center">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  What Our Couples Say
                </h2>
                <p className="mx-auto text-base text-purple-200/60" style={{ maxWidth: "560px" }}>
                  Real feedback from newlyweds across Kerala who designed their digital wedding invites with Save The Date.
                </p>
              </div>

              <div className="mx-auto w-full max-w-[800px] mt-6">
                <div className="border border-white/10 rounded-3xl relative flex h-[480px] w-full flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:1000px] bg-[#120a2a]/30 backdrop-blur-md">
                  <div
                    className="flex flex-row items-center gap-6"
                    style={{
                      transform:
                        'translateX(-40px) translateY(0px) translateZ(-150px) rotateX(15deg) rotateY(-15deg) rotateZ(10deg)',
                    }}
                  >
                    {/* Vertical Marquee 1 (downwards) */}
                    <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s]">
                      {KERALA_TESTIMONIALS.slice(0, 3).map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                      ))}
                    </Marquee>
                    {/* Vertical Marquee 2 (upwards) */}
                    <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:35s]">
                      {KERALA_TESTIMONIALS.slice(3, 6).map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                      ))}
                    </Marquee>
                    {/* Vertical Marquee 3 (downwards) */}
                    <Marquee vertical pauseOnHover repeat={3} className="[--duration:35s]">
                      {KERALA_TESTIMONIALS.slice(0, 3).map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                      ))}
                    </Marquee>
                  </div>

                  {/* Gradient overlays for 3D marquee */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#050010] to-transparent"></div>
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#050010] to-transparent"></div>
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#050010] to-transparent"></div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          </section>



          {/* ── PRICING ── */}
          <section id="pricing" className="scroll-mt-20 border-t border-slate-100 bg-slate-50/80 py-20 sm:py-24 relative">
            <div className="mx-auto max-w-6xl px-6 sm:px-8">
              <div className="mb-14 text-center">
                <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing.</h2>
                <p className="mx-auto text-base text-slate-500" style={{ maxWidth: "400px" }}>No hidden fees — just beautiful results.</p>
              </div>
              <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
                {/* Basic */}
                <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Basic Plan</h3>
                  <p className="mt-1 text-sm text-slate-400">The essentials for a digital start.</p>
                  <p className="my-6 text-4xl font-bold text-slate-900">₹3,500</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {["Digital Invitation", "RSVP Tracking", "Background Music"].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-[18px] text-[#7c3aed]">check_circle</span>{i}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full rounded-xl border-2 border-[#7c3aed] py-3 text-center text-sm font-semibold text-[#7c3aed] transition hover:bg-violet-50">Get Started</a>
                </div>

                {/* Popular */}
                <div className="relative flex flex-col rounded-2xl p-8 shadow-xl lg:-mt-2 lg:mb-2 lg:scale-[1.02]" style={{ background: "linear-gradient(160deg,#7c3aed,#5b21b6)" }}>
                  <div className="absolute top-0 right-0 rounded-bl-lg rounded-tr-2xl bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase">Most Popular</div>
                  <h3 className="pt-2 text-lg font-semibold text-white">Custom Domain</h3>
                  <p className="mt-1 text-sm text-purple-200">Everything you need for a professional look.</p>
                  <p className="my-6 text-4xl font-bold text-white">₹6,999</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {["Everything in Basic", "Custom Domain Name", "Premium Support"].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-purple-100">
                        <span className="material-symbols-outlined text-[18px] text-purple-200">check_circle</span>{i}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full rounded-xl bg-white py-3.5 text-center text-sm font-semibold text-[#7c3aed] shadow-md transition hover:shadow-lg">Get Started Now</a>
                </div>

                {/* Premium */}
                <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <h3 className="text-lg font-semibold text-slate-900">Premium Plus</h3>
                  <p className="mt-1 text-sm text-slate-400">Bespoke design for your big day.</p>
                  <p className="my-6 text-4xl font-bold text-slate-900">₹25,000</p>
                  <ul className="mb-8 flex-1 space-y-3">
                    {["Fully Bespoke Design", "Priority 24/7 Support", "Premium Hosting"].map((i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="material-symbols-outlined text-[18px] text-[#7c3aed]">check_circle</span>{i}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="mt-auto block w-full rounded-xl border-2 border-[#7c3aed] py-3 text-center text-sm font-semibold text-[#7c3aed] transition hover:bg-violet-50">Get Started</a>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050010] to-transparent pointer-events-none z-10" />
          </section>

        </main>

        {/* ── FAQ ── */}
        <section id="faq" className="scroll-mt-20 border-t border-slate-100 bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mb-14 text-center">
              <h2 className="mb-3 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
              <p className="mx-auto text-base text-slate-500" style={{ maxWidth: "480px" }}>Everything you need to know about your digital wedding invitation.</p>
            </div>
            <div className="mx-auto max-w-3xl divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
              {FAQS.map((item) => <FaqItem key={item.q} {...item} />)}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-slate-100 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-6 py-10 sm:px-8 md:grid-cols-3">
            <div className="text-center text-lg font-bold tracking-tight text-slate-900 md:text-left">Save The Date</div>
            <p className="text-center text-xs text-slate-400">© 2025 Save The Date. Modern Wedding Stationery.</p>
            <nav className="flex flex-wrap justify-center gap-5 md:justify-end">
              {["Privacy Policy", "Help Center", "Contact Us"].map((l) => (
                <a key={l} href="#" className="text-xs font-semibold tracking-wide text-slate-400 uppercase transition hover:text-[#7c3aed]">{l}</a>
              ))}
            </nav>
          </div>
        </footer>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/918848772371?text=${encodeURIComponent("Hello goutham , i want e-invitation website.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </>
  );
}

/* ── Inline Header (same file to avoid prop-drilling issues) ── */
function Header({ whatsappUrl }: { whatsappUrl: string }) {
  const navCls = "text-sm font-semibold text-white/70 transition hover:text-white";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0d0020]/80 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight text-white">
          Save The Date
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <a className={navCls} href="#features">Features</a>
          <a className={navCls} href="#hero">How it Works</a>
          <a className={navCls} href="#pricing">Pricing</a>
          <a className={navCls} href="#templates">Examples</a>
        </nav>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a className="text-sm font-semibold text-white/70 transition hover:text-white" href="#">Log In</a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
          >
            Get Started
          </a>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-3 py-2 text-xs font-semibold text-white md:hidden"
          style={{ background: "linear-gradient(135deg,#7c3aed,#6d28d9)" }}
        >
          Start
        </a>
      </div>
    </header>
  );
}
