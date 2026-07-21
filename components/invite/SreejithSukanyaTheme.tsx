"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import type { InviteData } from "@/data/invites";

interface Petal {
  id: number;
  type: "rose" | "jasmine" | "lotus";
  size: number;
  left: number;
  duration: number;
  delay: number;
  rotation: number;
}

// 1. Gopuram sketch outline SVG
const TempleGopuramSVG = () => (
  <svg viewBox="0 0 120 200" className="temple-gopuram-svg" width="100%" height="100%">
    <rect x="40" y="180" width="40" height="20" rx="1" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    <path d="M 50 180 L 70 180 L 60 195 Z" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Tier 1 */}
    <rect x="43" y="160" width="34" height="20" rx="1" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Tier 2 */}
    <rect x="46" y="140" width="28" height="20" rx="1" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Tier 3 */}
    <rect x="49" y="120" width="22" height="20" rx="1" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Tier 4 */}
    <rect x="52" y="100" width="16" height="20" rx="1" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    {/* Cap/Kalasam */}
    <path d="M 54 100 L 60 75 L 66 100 Z" stroke="var(--gold-primary)" strokeWidth="0.8" fill="none" opacity="0.4" />
    <line x1="60" y1="75" x2="60" y2="65" stroke="var(--gold-primary)" strokeWidth="0.8" opacity="0.4" />
    <circle cx="60" cy="63" r="2" fill="none" stroke="var(--gold-primary)" strokeWidth="0.8" opacity="0.4" />
    {/* Side architectural pillars */}
    <line x1="30" y1="200" x2="30" y2="160" stroke="var(--gold-primary)" strokeWidth="0.6" opacity="0.3" />
    <line x1="90" y1="200" x2="90" y2="160" stroke="var(--gold-primary)" strokeWidth="0.6" opacity="0.3" />
  </svg>
);

// 2. Mandala backdrop SVG
const MandalaSVG = () => (
  <svg viewBox="0 0 100 100" className="mandala-svg" width="100%" height="100%">
    <circle cx="50" cy="50" r="45" stroke="var(--gold-primary)" strokeWidth="0.4" fill="none" opacity="0.25" />
    <circle cx="50" cy="50" r="35" stroke="var(--gold-primary)" strokeWidth="0.4" strokeDasharray="1,1" fill="none" opacity="0.25" />
    {Array.from({ length: 24 }).map((_, i) => (
      <path
        key={i}
        d="M50 50 Q 50 10 55 5 Q 60 10 50 50"
        stroke="var(--gold-primary)"
        strokeWidth="0.3"
        fill="none"
        opacity="0.25"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
    {Array.from({ length: 12 }).map((_, i) => (
      <circle
        key={i}
        cx="50"
        cy="15"
        r="1"
        fill="var(--gold-primary)"
        opacity="0.25"
        transform={`rotate(${i * 30} 50 50)`}
      />
    ))}
  </svg>
);

// 3. Stylized Lotus SVG for arches and headers
const LotusSVG = ({ className, size = "48" }: { className?: string; size?: string }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className}>
    <defs>
      <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f596aa" />
        <stop offset="100%" stopColor="#e87a90" />
      </linearGradient>
    </defs>
    {/* Lotus Petals */}
    <path d="M32 12 C28 24 16 28 32 60 C48 28 36 24 32 12 Z" fill="url(#lotusGrad)" opacity="0.9" />
    <path d="M32 20 C22 28 14 34 26 60 C38 34 30 28 32 20 Z" fill="url(#lotusGrad)" opacity="0.85" />
    <path d="M32 20 C42 28 50 34 38 60 C26 34 34 28 32 20 Z" fill="url(#lotusGrad)" opacity="0.85" />
    <path d="M32 28 C14 34 6 42 16 60 C26 42 18 34 32 28 Z" fill="url(#lotusGrad)" opacity="0.75" />
    <path d="M32 28 C50 34 58 42 48 60 C38 42 46 34 32 28 Z" fill="url(#lotusGrad)" opacity="0.75" />
    {/* Green leaf base */}
    <path d="M14 55 C22 47 42 47 50 55 C40 60 24 60 14 55 Z" fill="#608c5a" opacity="0.8" />
  </svg>
);

// 4. Brass Bell Hanging SVGs
const HangingBellSVG = ({ style }: { style?: React.CSSProperties }) => (
  <div className="hanging-bell-wrapper" style={style}>
    <svg width="24" height="60" viewBox="0 0 24 60" fill="none">
      <defs>
        <linearGradient id="bellGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FAF0D7" />
          <stop offset="50%" stopColor="#C5A880" />
          <stop offset="100%" stopColor="#A88656" />
        </linearGradient>
      </defs>
      {/* Hanging chain */}
      <line x1="12" y1="0" x2="12" y2="40" stroke="var(--gold-primary)" strokeWidth="1" strokeDasharray="1,2" />
      {/* Bell Cap */}
      <path d="M7 40C7 36 17 36 17 40V48H7V40Z" fill="url(#bellGoldGrad)" stroke="#A88656" strokeWidth="0.5" />
      {/* Bell Flap */}
      <path d="M4 48H20C20 48 21 51 12 51C3 51 4 48 4 48Z" fill="url(#bellGoldGrad)" stroke="#A88656" strokeWidth="0.5" />
      {/* Small clapper ring */}
      <circle cx="12" cy="54" r="2.5" fill="#500a12" />
    </svg>
  </div>
);

export function SreejithSukanyaTheme({ invite }: { invite: InviteData }) {
  // Opening states
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isEnvelopeHidden, setIsEnvelopeHidden] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  // Music state
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic layouts
  const [petals, setPetals] = useState<Petal[]>([]);
  const [yOffset, setYOffset] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Lightbox gallery state
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. 3D Tilt Effect on mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEnvelopeOpened) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 20, y: y * -20 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // 2. Cover opening animation trigger
  const handleOpenEnvelope = () => {
    if (isEnvelopeOpened) return;
    setIsEnvelopeOpened(true);

    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked:", err);
        });
    }

    setTimeout(() => {
      setIsEnvelopeHidden(true);
      setIsCardVisible(true);
    }, 1800);
  };

  // Lock document scroll while cover is closed
  useEffect(() => {
    if (!isEnvelopeOpened) {
      document.documentElement.classList.add("sreejith-sukanya-locked");
    } else {
      document.documentElement.classList.remove("sreejith-sukanya-locked");
    }
    return () => {
      document.documentElement.classList.remove("sreejith-sukanya-locked");
    };
  }, [isEnvelopeOpened]);

  // 3. Audio Playback Control
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play failed:", err);
        });
    }
  };

  // 4. Falling Petals Generator (Rose & Jasmine & Lotus)
  useEffect(() => {
    if (!isCardVisible) return;

    let petalId = 0;
    const createPetal = () => {
      const typeRand = Math.random();
      const type = typeRand < 0.33 ? "rose" : typeRand < 0.66 ? "jasmine" : "lotus";
      const size = Math.random() * 10 + 10;
      const left = Math.random() * 100;
      const duration = Math.random() * 6 + 6;
      const delay = Math.random() * 3;
      const rotation = Math.random() * 360;

      const newPetal: Petal = {
        id: petalId++,
        type,
        size,
        left,
        duration,
        delay,
        rotation,
      };

      setPetals((prev) => [...prev, newPetal]);

      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== newPetal.id));
      }, (duration + delay) * 1000);
    };

    for (let i = 0; i < 15; i++) {
      createPetal();
    }

    const interval = setInterval(createPetal, 450);
    return () => clearInterval(interval);
  }, [isCardVisible]);

  // 5. Parallax Scroll effect for right-side background artwork
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setYOffset(scrollTop * 0.15);
    }
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth <= 992) {
        setYOffset(window.scrollY * 0.15);
      }
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // 6. Countdown Timer Target (September 01, 2026 9:00 AM IST)
  useEffect(() => {
    const targetDate = new Date("2026-09-01T09:00:00+05:30").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // 7. Scroll reveal IntersectionObserver
  useEffect(() => {
    if (!isCardVisible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [isCardVisible]);

  // 8. WhatsApp share trigger
  const handleWhatsappShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const shareMessage = `👋 Hello!

❤️ You are cordially invited to our wedding ceremony.

Tap the link below to view our digital cinematic invitation album:

⬇️
${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Disable context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div className="sreejith-sukanya-theme relative w-full min-h-screen overflow-x-hidden">
      {/* Stylesheet imports & Scoped custom CSS */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Alex+Brush&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

      <style>{`
        html.sreejith-sukanya-locked, 
        html.sreejith-sukanya-locked body {
          overflow: hidden !important;
          height: 100vh !important;
        }

        .sreejith-sukanya-theme {
          --bg-warm-cream: #FAF6F0;
          --bg-deep-cream: #F4ECE1;
          --bg-light-gold: #E6D5B8;
          --gold-primary: #C5A880;
          --gold-dark: #A88656;
          --gold-light: #F5EFEB;
          --text-dark: #2C2520;
          --text-muted: #6E6259;
          --accent-burgundy: #500a12;
          --burgundy-light: #6e1c25;
          --white: #FFFFFF;
          --shadow-sm: 0 4px 10px rgba(80, 10, 18, 0.03);
          --shadow-md: 0 10px 25px rgba(80, 10, 18, 0.05);
          --shadow-lg: 0 20px 45px rgba(80, 10, 18, 0.1);

          --font-serif-header: 'Cinzel', serif;
          --font-serif-decorative: 'Cinzel Decorative', serif;
          --font-serif-body: 'Playfair Display', serif;
          --font-sans: 'Montserrat', sans-serif;
          --font-script: 'Alex Brush', cursive;
          
          font-family: var(--font-sans);
          background-color: var(--bg-warm-cream);
          color: var(--text-dark);
        }

        /* 1. Pre-Open Page (Cinematic Cover) */
        .cinematic-pre-open-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at center, var(--burgundy-light) 0%, #1e0205 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 999;
          transition: opacity 1.2s cubic-bezier(0.77, 0, 0.175, 1),
                      visibility 1.2s cubic-bezier(0.77, 0, 0.175, 1),
                      transform 1.4s cubic-bezier(0.77, 0, 0.175, 1);
          overflow: hidden;
        }

        .cinematic-pre-open-wrapper.is-hidden {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.95) translateY(-50px);
          pointer-events: none;
        }

        .cinematic-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(197, 168, 128, 0.1) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 1;
          filter: blur(50px);
          animation: pulseGlow 10s infinite alternate ease-in-out;
        }

        @keyframes pulseGlow {
          0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        }

        .dust-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }

        .dust-particle {
          position: absolute;
          background: radial-gradient(circle, rgba(230, 213, 184, 0.6) 0%, rgba(230, 213, 184, 0) 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: floatDust linear infinite;
        }

        @keyframes floatDust {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-150px) translateX(30px) scale(1.3); opacity: 0; }
        }

        .pre-open-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 60px;
          z-index: 10;
          max-width: 1100px;
          width: 90%;
          padding: 20px;
        }

        .book-stage {
          perspective: 1800px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .book-container {
          position: relative;
          width: 380px;
          height: 520px;
          perspective: 1800px;
          cursor: pointer;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .book-container:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .book-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 1.8s cubic-bezier(0.77, 0, 0.175, 1);
          transform-origin: left center;
          z-index: 5;
        }

        .book-container.is-open .book-card {
          transform: rotateY(-140deg);
        }

        .book-cover {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background-image: url('/sukanya_sreejith_cover.jpg');
          background-size: cover;
          background-position: center;
          border-radius: 12px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1);
        }

        .book-back {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #4a1515;
          border-radius: 12px;
          transform: rotateY(180deg);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: inset 0 0 50px rgba(0,0,0,0.6);
          border: 2.5px solid var(--gold-primary);
        }

        .book-inside {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #FAF6F0;
          border-radius: 12px;
          border: 3px solid var(--gold-primary);
          box-shadow: 0 15px 40px rgba(0,0,0,0.2), inset 0 0 35px rgba(197, 168, 128, 0.2);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 30px;
          text-align: center;
          z-index: 1;
        }

        .inside-monogram {
          font-family: var(--font-serif-decorative);
          font-size: 2.8rem;
          color: var(--gold-primary);
          margin-bottom: 15px;
          letter-spacing: 2px;
          border-bottom: 1.5px solid var(--gold-light);
          padding-bottom: 10px;
          width: 80%;
        }

        .inside-title {
          font-family: var(--font-serif-header);
          font-size: 1.1rem;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 25px;
        }

        .inside-text {
          font-family: var(--font-serif-body);
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-muted);
          font-style: italic;
          margin-bottom: 30px;
        }

        .inside-date {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--gold-dark);
          font-weight: 600;
        }

        .pre-open-content {
          max-width: 460px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .pre-open-welcome {
          font-family: var(--font-serif-header);
          font-size: 1rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          color: var(--gold-primary);
          background: linear-gradient(135deg, #c5a880 0%, #f0e6d2 50%, #c5a880 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .pre-open-names {
          font-family: var(--font-serif-body);
          font-size: 3.5rem;
          color: var(--white);
          line-height: 1.2;
          margin-bottom: 1.5rem;
          text-shadow: 0 4px 12px rgba(0,0,0,0.3);
          font-weight: 600;
        }

        .pre-open-description {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2.5rem;
        }

        .open-invitation-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 100%);
          color: var(--text-dark);
          border: 1px solid var(--gold-light);
          padding: 18px 36px;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.85rem;
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(197, 168, 128, 0.35);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .open-invitation-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 30%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-30deg);
          animation: shimmerBtn 3.5s infinite;
        }

        .open-invitation-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(197, 168, 128, 0.5);
          background: var(--white);
          color: var(--accent-burgundy);
        }

        .open-invitation-btn i {
          transition: transform 0.3s ease;
        }

        .open-invitation-btn:hover i {
          transform: translateX(6px);
        }

        .pre-open-scroll-hint {
          position: absolute;
          bottom: 35px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--gold-light);
          opacity: 0.55;
        }

        .pre-open-scroll-hint span {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        /* 2. Main Scrollable Site Layout */
        .wedding-card {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          min-height: 100vh;
          display: flex;
          background-color: var(--bg-warm-cream);
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.2s ease, visibility 1.2s ease;
          z-index: 10;
        }

        .wedding-card.is-visible {
          opacity: 1;
          visibility: visible;
        }

        .card-content-scroll {
          width: 100%;
          min-height: 100vh;
          padding: 80px 8% 120px 8%;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-warm-cream);
          position: relative;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .card-content-scroll::-webkit-scrollbar {
          display: none;
        }

        /* 3. Common Component Styles */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .reveal-on-scroll.revealed {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }
        .delay-500 { transition-delay: 500ms; }

        .ornament-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 2rem 0;
          color: var(--gold-primary);
          font-size: 1.2rem;
          position: relative;
          width: 100%;
        }

        .ornament-divider::before,
        .ornament-divider::after {
          content: '';
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-primary), transparent);
          flex-grow: 1;
          margin: 0 15px;
        }

        .section-title {
          font-family: var(--font-serif-header);
          font-size: 2rem;
          letter-spacing: 4px;
          text-align: center;
          text-transform: uppercase;
          color: var(--accent-burgundy);
          margin-bottom: 3.5rem;
          position: relative;
          font-weight: 500;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background-color: var(--gold-primary);
        }

        /* Hero / Introduction Page Style (Matching mock template) */
        .luxury-hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: calc(100vh - 120px);
          gap: 40px;
          position: relative;
          padding-bottom: 60px;
        }

        .hero-text-content {
          flex: 1.2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .hero-visual-frame {
          flex: 0.8;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        /* Carved Temple Inner/Outer Arch */
        .temple-arch-outer {
          position: relative;
          width: 380px;
          height: 520px;
          padding: 8px;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 50%, var(--gold-dark) 100%);
          border-radius: 190px 190px 16px 16px;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255,255,255,0.4);
          z-index: 5;
        }

        .temple-arch-inner {
          width: 100%;
          height: 100%;
          background: var(--bg-warm-cream);
          border-radius: 182px 182px 10px 10px;
          border: 1.5px solid var(--gold-primary);
          box-shadow: inset 0 0 35px rgba(197, 168, 128, 0.25);
          position: relative;
          overflow: hidden;
        }

        .temple-arch-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 8s ease;
        }

        .temple-arch-outer:hover .temple-arch-inner img {
          transform: scale(1.05);
        }

        /* Gold ampersand divider styling */
        .gold-ampersand-divider {
          display: flex;
          align-items: center;
          gap: 15px;
          margin: 0.8rem 0 1.2rem 0;
          width: 80%;
        }

        .gold-ampersand-divider .line {
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold-primary), transparent);
          flex-grow: 1;
        }

        .gold-ampersand-divider .ampersand {
          font-family: var(--font-script);
          font-size: 2.2rem;
          color: var(--gold-dark);
          line-height: 1;
        }

        .couple-name {
          font-family: var(--font-serif-body);
          font-size: 4.6rem;
          font-weight: 600;
          color: var(--accent-burgundy);
          line-height: 1.1;
        }

        .hero-quote {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-top: 1.2rem;
          margin-bottom: 2.5rem;
          font-weight: 500;
        }

        .hero-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--burgundy-light) 0%, var(--accent-burgundy) 100%);
          color: var(--white);
          border: 1px solid var(--gold-primary);
          padding: 16px 36px;
          border-radius: 40px;
          font-family: var(--font-sans);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8rem;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .hero-action-btn:hover {
          transform: translateY(-3px);
          background: var(--white);
          color: var(--accent-burgundy);
          box-shadow: var(--shadow-lg);
        }

        /* Top capsule menu navbar */
        .top-luxury-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
          z-index: 10;
        }

        .top-nav-capsule {
          background: rgba(253, 251, 247, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(197, 168, 128, 0.4);
          border-radius: 30px;
          padding: 6px 30px;
          display: flex;
          gap: 30px;
          box-shadow: var(--shadow-sm);
        }

        .top-nav-link {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s ease;
          padding: 8px 0;
        }

        .top-nav-link:hover {
          color: var(--accent-burgundy);
        }

        /* Kerala background elements positioning */
        .gopuram-bg-container {
          position: absolute;
          bottom: 2%;
          left: -4%;
          width: 250px;
          height: 380px;
          pointer-events: none;
          z-index: 1;
        }

        .mandala-bg-container {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 450px;
          height: 450px;
          pointer-events: none;
          z-index: 1;
        }

        .lotus-bg-arch-left {
          position: absolute;
          bottom: -20px;
          left: -40px;
          z-index: 6;
        }

        .lotus-bg-arch-right {
          position: absolute;
          bottom: -30px;
          right: -40px;
          z-index: 6;
        }

        /* Jasmine garlands strings */
        .jasmine-garlands-container {
          position: absolute;
          top: 0;
          right: 4%;
          display: flex;
          gap: 24px;
          z-index: 2;
          pointer-events: none;
        }

        .jasmine-string {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          animation: swingGarland 4s ease-in-out infinite alternate;
          transform-origin: top center;
        }

        @keyframes swingGarland {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }

        .jasmine-bud {
          width: 8px;
          height: 15px;
          background: var(--white);
          border-radius: 50% 50% 35% 35%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          border-bottom: 2px solid #8fa886;
        }

        /* Message section */
        .invitation-message-section {
          text-align: center;
          padding: 60px 0;
          max-width: 700px;
          margin: 0 auto 100px auto;
          position: relative;
        }

        .parchment-card {
          background-color: var(--white);
          border: 1.5px solid var(--gold-primary);
          border-radius: 12px;
          padding: 50px 40px;
          box-shadow: var(--shadow-md);
          margin-bottom: 3.5rem;
          position: relative;
          background-image: linear-gradient(rgba(197, 168, 128, 0.03) 1px, transparent 1px);
          background-size: 100% 24px;
        }

        .invitation-text {
          font-family: var(--font-serif-body);
          font-size: 1.35rem;
          line-height: 1.9;
          color: var(--text-dark);
          text-align: center;
          font-style: italic;
        }

        .parents-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 40px;
          margin-top: 2rem;
        }

        .parents-group {
          flex: 1;
        }

        .parents-group h3 {
          font-family: var(--font-serif-header);
          font-size: 0.95rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 1.2rem;
          font-weight: 600;
        }

        .parent-name {
          font-family: var(--font-serif-body);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.6;
        }

        .parents-separator {
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--gold-primary), transparent);
        }

        /* Introduction Card Layouts */
        .intro-cards-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-top: 3rem;
          margin-bottom: 60px;
        }

        .intro-card {
          background-color: var(--white);
          border: 1px solid var(--gold-light);
          border-radius: 12px;
          padding: 35px 25px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s ease;
        }

        .intro-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold-primary);
        }

        .intro-role {
          font-family: var(--font-sans);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--accent-burgundy);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .intro-name {
          font-family: var(--font-serif-header);
          font-size: 1.6rem;
          color: var(--accent-burgundy);
          margin-bottom: 1rem;
        }

        .intro-bio {
          font-family: var(--font-serif-body);
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          font-style: italic;
        }

        /* Events Section (Muhurtham & Reception) */
        .events-section {
          padding: 60px 0;
          margin-bottom: 100px;
        }

        .events-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 35px;
        }

        .event-card {
          background-color: var(--white);
          border: 1.5px solid var(--gold-light);
          border-radius: 12px;
          padding: 45px 35px;
          text-align: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(to right, var(--gold-light), var(--gold-primary), var(--gold-light));
        }

        .event-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-md);
          border-color: var(--gold-primary);
        }

        .event-badge {
          font-family: var(--font-sans);
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 2.5px;
          color: var(--accent-burgundy);
          font-weight: 600;
          background-color: rgba(80, 10, 18, 0.05);
          padding: 5px 14px;
          border-radius: 20px;
          display: inline-block;
          align-self: center;
          margin-bottom: 1.8rem;
        }

        .event-name {
          font-family: var(--font-serif-header);
          font-size: 1.3rem;
          line-height: 1.4;
          color: var(--accent-burgundy);
          margin-bottom: 2.2rem;
          font-weight: 600;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .event-details-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          text-align: left;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }

        .event-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .event-detail-item i {
          color: var(--gold-dark);
          font-size: 1.15rem;
          margin-top: 3px;
          width: 24px;
          text-align: center;
        }

        .event-detail-item span {
          font-family: var(--font-sans);
          font-weight: 500;
          line-height: 1.4;
        }

        .map-btn {
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 100%);
          color: var(--text-dark);
          border: 1px solid var(--gold-primary);
          border-radius: 4px;
          padding: 14px 28px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(197, 168, 128, 0.15);
        }

        .map-btn:hover {
          background: var(--accent-burgundy);
          color: var(--white);
          border-color: var(--accent-burgundy);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        /* Residence details */
        .residence-title {
          font-family: var(--font-serif-header);
          font-size: 0.95rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .residence-address {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          font-weight: 500;
          line-height: 1.6;
          color: var(--text-muted);
        }

        /* Gallery Section */
        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          margin-top: 2rem;
        }

        .gallery-item {
          position: relative;
          aspect-ratio: 3/4;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 2px solid var(--white);
          cursor: pointer;
          transform: translate3d(0, 0, 0);
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s ease;
        }

        .gallery-item:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
          border-color: var(--gold-primary);
        }

        .gallery-item:hover img {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(80, 10, 18, 0.7), transparent);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.4s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-overlay i {
          color: var(--white);
          font-size: 1.8rem;
          transform: scale(0.8);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .gallery-item:hover .gallery-overlay i {
          transform: scale(1);
        }

        /* Lightbox modal */
        .lightbox-modal {
          position: fixed;
          inset: 0;
          background-color: rgba(26, 12, 14, 0.95);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          opacity: 0;
          animation: fadeOpen 0.3s forwards ease;
        }

        @keyframes fadeOpen {
          to { opacity: 1; }
        }

        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 85vh;
        }

        .lightbox-img {
          max-width: 100%;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          border: 2.5px solid var(--gold-primary);
        }

        .lightbox-close {
          position: absolute;
          top: -45px;
          right: 0;
          color: var(--white);
          font-size: 2.2rem;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .lightbox-close:hover {
          color: var(--gold-primary);
        }

        /* Countdown with Glassmorphism */
        .countdown-section {
          padding: 60px 0;
          text-align: center;
          margin-bottom: 100px;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 2rem;
        }

        .countdown-item {
          width: 110px;
          height: 110px;
          border: 1.5px solid rgba(197, 168, 128, 0.45);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
          position: relative;
        }

        .countdown-item::after {
          content: '';
          position: absolute;
          inset: -4px;
          border: 1px dashed var(--gold-primary);
          border-radius: 50%;
          transition: all 0.3s ease;
          opacity: 0.55;
        }

        .countdown-item:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
          border-color: var(--gold-primary);
          background-color: var(--white);
        }

        .countdown-item:hover::after {
          opacity: 0.85;
          transform: scale(1.02);
        }

        .countdown-item .number {
          font-family: var(--font-sans);
          font-size: 2.2rem;
          font-weight: 600;
          color: var(--accent-burgundy);
          line-height: 1.1;
        }

        .countdown-item .label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
          font-weight: 600;
          margin-top: 4px;
        }

        /* Map Section */
        .map-section {
          padding: 60px 0;
          margin-bottom: 100px;
        }

        .map-container-wrapper {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1.5px solid var(--gold-primary);
          position: relative;
          aspect-ratio: 16/9;
          width: 100%;
        }

        @media (max-width: 768px) {
          .map-container-wrapper {
            aspect-ratio: 4/3;
          }
        }

        /* Custom Mockup Bottom Navigation Bar */
        .bottom-luxury-navbar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          background: linear-gradient(to right, #320307, #500a12, #320307);
          border-top: 2px solid var(--gold-primary);
          box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.3);
          padding: 12px 30px pb-[env(safe-area-inset-bottom)];
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 50px;
          transition: all 0.4s ease;
        }

        .nav-btn {
          color: rgba(240, 230, 210, 0.7);
          text-decoration: none;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .nav-btn i {
          font-size: 1.25rem;
        }

        .nav-btn:hover {
          color: var(--gold-light);
          transform: translateY(-2px);
        }

        /* Floating Audio Control Container */
        .music-player {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 1000;
        }

        .music-toggle-btn {
          background: rgba(253, 251, 247, 0.85);
          border: 1px solid var(--gold-primary);
          color: var(--accent-burgundy);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.4s ease;
          box-shadow: var(--shadow-sm);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .music-toggle-btn:hover {
          transform: scale(1.08);
          background-color: var(--accent-burgundy);
          color: var(--white);
          border-color: var(--accent-burgundy);
        }

        .floating-share {
          position: fixed;
          bottom: 90px;
          right: 24px;
          z-index: 1000;
        }

        .share-toggle-btn {
          background: #25D366;
          color: white;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(0,0,0,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          transition: all 0.3s ease;
          border: none;
        }

        .share-toggle-btn:hover {
          transform: scale(1.08) translateY(-2px);
          box-shadow: 0 12px 30px rgba(37, 211, 102, 0.4);
        }

        .invitation-footer {
          margin-top: auto;
          text-align: center;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-top: 1px solid var(--gold-primary);
        }

        .invitation-footer p {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .footer-link {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--gold-dark);
          text-decoration: none;
          display: inline-block;
          margin-top: 5px;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--accent-burgundy);
        }

        /* Petals falling */
        .petals-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 99;
          opacity: 0;
          transition: opacity 1.5s ease;
        }

        .wedding-card.is-visible .petals-container {
          opacity: 1;
        }

        .petal {
          position: absolute;
          pointer-events: none;
          animation: fall linear infinite;
          will-change: transform, opacity;
        }

        .petal.rose {
          background: radial-gradient(circle at 35% 35%, #ff9ebb, #e05e83 70%, #b82b54);
          border-radius: 50% 0 50% 50%;
          box-shadow: 0 2px 5px rgba(184, 43, 84, 0.2);
        }

        .petal.jasmine {
          background: radial-gradient(circle at 35% 35%, #ffffff, #fefdf6 60%, #fae69e);
          border-radius: 40% 60% 40% 60% / 50% 50% 50% 50%;
          box-shadow: 0 1px 3px rgba(197, 168, 128, 0.15);
        }

        .petal.lotus {
          background: radial-gradient(circle at 35% 35%, #FB96B6, #e87a90 70%, #500a12);
          border-radius: 50% 0 50% 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }

        @keyframes fall {
          0% { transform: translateY(-5%) rotate(0deg); opacity: 0; }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }

        /* Responsive Overrides */
        @media (max-width: 992px) {
          .pre-open-container {
            flex-direction: column !important;
            gap: 40px !important;
            text-align: center !important;
            align-items: center !important;
            padding: 10px !important;
          }

          .pre-open-content {
            align-items: center !important;
            text-align: center !important;
            max-width: 100% !important;
            padding: 0 10px !important;
          }

          .wedding-card {
            flex-direction: column;
            overflow-y: auto;
          }

          .card-content-scroll {
            width: 100%;
            min-height: auto;
            padding: 50px 24px 140px 24px !important;
          }

          .couple-names .name {
            font-size: 3.5rem;
          }

          .couple-names .and {
            font-size: 2.8rem;
          }

          .pre-open-scroll-hint {
            display: none;
          }

          .book-container.is-open {
            transform: translateX(65px) rotateY(-130deg) scale(0.8) !important;
          }

          .luxury-hero-container {
            flex-direction: column-reverse;
            gap: 40px;
            text-align: center;
            align-items: center;
          }

          .hero-text-content {
            align-items: center;
            text-align: center;
          }

          .gold-ampersand-divider {
            width: 100%;
            justify-content: center;
          }

          .top-luxury-header {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }

          .top-nav-capsule {
            display: none; /* Rely on bottom navigation bar on mobile devices */
          }

          .gopuram-bg-container {
            width: 160px;
            height: 240px;
            bottom: -5%;
            left: -2%;
            opacity: 0.08;
          }

          .jasmine-garlands-container {
            right: 2%;
            gap: 12px;
          }
        }

        @media (max-width: 768px) {
          .events-grid,
          .intro-cards-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .parents-grid {
            flex-direction: column;
            gap: 20px;
          }

          .parents-separator {
            width: 80px;
            height: 1px;
            margin: 0 auto;
            background: linear-gradient(to right, transparent, var(--gold-primary), transparent);
          }

          .countdown-timer {
            gap: 12px;
            flex-wrap: wrap;
          }

          .countdown-item {
            width: 76px;
            height: 76px;
          }

          .countdown-item .number {
            font-size: 1.4rem;
          }

          .countdown-item .label {
            font-size: 0.55rem;
            letter-spacing: 1px;
          }

          .gallery-grid {
            grid-template-columns: 1fr 1fr;
          }

          .bottom-luxury-navbar {
            gap: 24px;
            padding: 8px 16px 14px 16px;
          }

          .nav-btn {
            font-size: 0.55rem;
            letter-spacing: 1px;
            gap: 4px;
          }

          .nav-btn i {
            font-size: 1.1rem;
          }
        }
        
        @media (max-width: 480px) {
          .pre-open-container {
            gap: 20px !important;
            padding-top: 40px !important;
          }

          .book-container {
            width: 240px !important;
            height: 330px !important;
          }

          .book-container.is-open {
            transform: translateX(85px) rotateY(-130deg) scale(0.7) !important;
          }

          .book-inside {
            padding: 16px !important;
          }

          .inside-monogram {
            font-size: 1.8rem !important;
            margin-bottom: 8px !important;
            padding-bottom: 6px !important;
          }

          .inside-title {
            font-size: 0.8rem !important;
            margin-bottom: 12px !important;
            letter-spacing: 2px !important;
          }

          .inside-text {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
            margin-bottom: 15px !important;
          }

          .inside-date {
            font-size: 0.65rem !important;
            letter-spacing: 1.5px !important;
          }

          .pre-open-welcome {
            font-size: 0.85rem !important;
            letter-spacing: 3px !important;
          }

          .pre-open-names {
            font-size: 2.2rem !important;
            margin-bottom: 0.8rem !important;
          }

          .pre-open-description {
            font-size: 0.85rem !important;
            margin-bottom: 1.5rem !important;
            line-height: 1.5 !important;
          }

          .open-invitation-btn {
            padding: 14px 28px !important;
            font-size: 0.75rem !important;
            letter-spacing: 1px !important;
          }

          .countdown-timer {
            gap: 8px !important;
          }

          .countdown-item {
            width: 68px !important;
            height: 68px !important;
          }

          .countdown-item .number {
            font-size: 1.3rem !important;
          }

          .countdown-item .label {
            font-size: 0.5rem !important;
            letter-spacing: 0.5px !important;
          }

          .card-content-scroll {
            padding: 40px 16px 140px 16px !important;
          }

          .couple-name {
            font-size: 2.8rem !important;
          }

          .gold-ampersand-divider .ampersand {
            font-size: 1.6rem !important;
          }

          .section-title {
            font-size: 1.4rem !important;
            margin-bottom: 2.5rem !important;
          }

          .gallery-grid {
            grid-template-columns: 1fr;
          }

          .temple-arch-outer {
            width: 280px;
            height: 380px;
            border-radius: 140px 140px 12px 12px;
          }

          .temple-arch-inner {
            border-radius: 132px 132px 8px 8px;
          }

          .lotus-bg-arch-left,
          .lotus-bg-arch-right {
            transform: scale(0.7);
          }

          .lotus-bg-arch-left {
            left: -25px;
          }

          .lotus-bg-arch-right {
            right: -25px;
          }

          .floating-share {
            bottom: 80px;
            right: 16px;
          }
        }
      `}</style>

      {/* Floating Exit Link */}
      <Link
        href="/"
        className="fixed top-4 left-4 z-50 bg-[#500a12]/85 backdrop-blur-md text-[#FAF6F0] px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#500a12] transition-colors border border-[#c5a880]/30 text-sm font-semibold shadow-md"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Exit Design
      </Link>

      {/* Top Background Music Control */}
      <div className="music-player">
        <audio
          ref={audioRef}
          src="/music/vidssavecom-mangalyam-official-audio-wedding-song-arun-pradeep-feat-sand_MaLJU9Oi.aac"
          loop
          preload="auto"
        />
        <button
          onClick={toggleMusic}
          className="music-toggle-btn"
          aria-label="Toggle Background Music"
        >
          <i className={isMusicPlaying ? "fas fa-music" : "fas fa-volume-mute"}></i>
        </button>
      </div>

      {/* WhatsApp Share Floating Button (Only visible after card is opened) */}
      {isCardVisible && (
        <div className="floating-share">
          <button
            onClick={handleWhatsappShare}
            className="share-toggle-btn"
            aria-label="Share Invitation on WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      )}

      {/* PHASE 1 & 2: Interactive Cinematic Front Cover */}
      {!isEnvelopeHidden && (
        <div className={`cinematic-pre-open-wrapper ${isEnvelopeOpened ? "is-hidden" : ""}`}>
          <div className="cinematic-glow"></div>

          <div className="dust-container">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="dust-particle"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 5 + 4}s`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <div className="pre-open-container">
            {/* 3D Velvet Album Cover */}
            <div className="book-stage">
              <div
                className={`book-container ${isEnvelopeOpened ? "is-open" : ""}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={handleOpenEnvelope}
                style={{
                  transform: isEnvelopeOpened
                    ? 'rotateY(-140deg)'
                    : `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                <div className="book-spine" style={{
                  position: 'absolute',
                  left: '-10px',
                  top: '5px',
                  width: '10px',
                  height: 'calc(100% - 10px)',
                  backgroundColor: '#300c0c',
                  borderRadius: '3px 0 0 3px',
                  boxShadow: '-5px 5px 15px rgba(0,0,0,0.3)',
                  zIndex: 4
                }}></div>

                {/* Stationary Inside Page */}
                <div className="book-inside">
                  <div className="inside-monogram">S & S</div>
                  <div className="inside-title">Wedding Invitation</div>
                  <div className="inside-text">
                    Together with our families,<br />
                    we invite you to celebrate our special day.
                  </div>
                  <div className="inside-date">September 01, 2026</div>
                </div>

                {/* Flapping 3D Cover */}
                <div className="book-card">
                  <div className="book-cover"></div>
                  <div className="book-back"></div>
                </div>
              </div>
            </div>

            {/* Welcome Typography & Trigger CTA */}
            <div className="pre-open-content">
              <h2 className="pre-open-welcome">You Are Invited To Our Wedding</h2>
              <div className="pre-open-names">Sukanya & Sreejith</div>
              <p className="pre-open-description">
                Join us as we step into our new journey of love and togetherness. Click below to open our digital wedding album invitation.
              </p>
              <button onClick={handleOpenEnvelope} className="open-invitation-btn">
                <span>Open Invitation</span>
                <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          {/* Scroll hint indicator */}
          {!isEnvelopeOpened && (
            <div className="pre-open-scroll-hint">
              <span>Click to Enter</span>
              <i className="fas fa-chevron-down bouncing-chevron"></i>
            </div>
          )}
        </div>
      )}

      {/* PHASE 3: The Main Scrolling Card */}
      <main className={`wedding-card ${isCardVisible ? "is-visible" : ""}`}>
        {/* Falling Petals Background */}
        <div className="petals-container">
          {petals.map((p) => (
            <div
              key={p.id}
              className={`petal ${p.type}`}
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                transform: `rotate(${p.rotation}deg)`,
              }}
            />
          ))}
        </div>

        {/* Left Side Scrollable Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="card-content-scroll"
        >
          {/* Top Header menu (Matches mock layout on desktop) */}
          <header className="top-luxury-header">
            {/* Elegant Monogram */}
            <div style={{ fontFamily: 'var(--font-serif-decorative)', fontSize: '1.8rem', color: 'var(--accent-burgundy)' }}>S & S</div>

            <nav className="top-nav-capsule">
              <a href="#hero" className="top-nav-link">Home</a>
              <a href="#intro" className="top-nav-link">Our Story</a>
              <a href="#events" className="top-nav-link">Events</a>
              <a href="#gallery" className="top-nav-link">Gallery</a>
            </nav>

            {/* Placeholder to balance the navbar alignment */}
            <div style={{ width: '60px' }}></div>
          </header>

          {/* Hero / Cover Section */}
          <section className="hero-section" id="hero">
            {/* Background elements */}
            <div className="gopuram-bg-container">
              <TempleGopuramSVG />
            </div>
            <div className="mandala-bg-container">
              <MandalaSVG />
            </div>

            {/* Jasmine garlands hanging top-right */}
            <div className="jasmine-garlands-container">
              <div className="jasmine-string" style={{ animationDelay: '0s' }}>
                {Array.from({ length: 6 }).map((_, idx) => <span key={idx} className="jasmine-bud"></span>)}
                <HangingBellSVG />
              </div>
              <div className="jasmine-string" style={{ animationDelay: '1s' }}>
                {Array.from({ length: 8 }).map((_, idx) => <span key={idx} className="jasmine-bud"></span>)}
                <HangingBellSVG />
              </div>
              <div className="jasmine-string" style={{ animationDelay: '0.5s' }}>
                {Array.from({ length: 5 }).map((_, idx) => <span key={idx} className="jasmine-bud"></span>)}
                <HangingBellSVG />
              </div>
            </div>

            <div className="luxury-hero-container">
              {/* Left Column: Typography */}
              <div className="hero-text-content">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-serif-header)',
                  fontSize: '0.8rem',
                  letterSpacing: '4px',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  <span>The Wedding Invitation of</span>
                </div>

                <div className="couple-names-wrapper">
                  <h1 className="couple-name">Sukanya</h1>
                  <div className="gold-ampersand-divider">
                    <span className="line"></span>
                    <span className="ampersand">&</span>
                    <span className="line"></span>
                  </div>
                  <h1 className="couple-name">Sreejith</h1>
                </div>

                <p className="hero-quote">
                  "Two hearts. One promise.<br />
                  A celebration of love, faith, and family."
                </p>

                <a href="#intro" className="hero-action-btn">
                  <span>You're Invited</span>
                  <i className="fas fa-arrow-right"></i>
                </a>
              </div>

              {/* Right Column: Stone Temple Carved Arch holding the portrait */}
              <div className="hero-visual-frame">
                <div className="temple-arch-outer">
                  <div className="temple-arch-inner">
                    <img
                      src="/sukanya_sreejith_couple_1.jpg"
                      alt="Sukanya and Sreejith portrait inside stone arch frame"
                    />
                  </div>
                  {/* Decorative lotuses at base */}
                  <LotusSVG className="lotus-bg-arch-left" size="76" />
                  <LotusSVG className="lotus-bg-arch-right" size="76" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 1: Intro / Story Section */}
          <section className="invitation-message-section reveal-on-scroll" id="intro">
            <div className="ornament-divider">
              <LotusSVG size="32" />
            </div>
            <h2 className="section-title">Meet the Couple</h2>

            <div className="intro-cards-container">
              {/* Bride details */}
              <div className="intro-card">
                <div className="intro-role">The Bride</div>
                <h3 className="intro-name">Sukanya</h3>
                <p className="intro-bio">
                  A beautiful soul from Kozhikode. Embodying grace, kindness, and values, she steps forward to start this lifetime journey of love.
                </p>
              </div>

              {/* Groom details */}
              <div className="intro-card">
                <div className="intro-role">The Groom</div>
                <h3 className="intro-name">Sreejith</h3>
                <p className="intro-bio">
                  A gentleman from Thrissur. Diligent, warm-hearted, and supportive, he looks forward to walking hand-in-hand forever.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Invitation Message Section */}
          <section className="invitation-message-section reveal-on-scroll" id="message">
            <div className="ornament-divider">
              <LotusSVG size="32" />
            </div>

            <div className="parchment-card">
              <p className="invitation-text">
                "Together with our families, we cordially invite you to celebrate our special day. As we
                unite our lives in sacred matrimony under the blessings of God, your presence and
                prayers will bring us immense joy and happiness."
              </p>
            </div>

            {/* Couple Traditional Portrait inside carved frame */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="temple-arch-outer" style={{ height: '480px' }}>
                <div className="temple-arch-inner" style={{ borderRadius: '182px 182px 10px 10px' }}>
                  <img
                    src="/sukanya_sreejith_couple_bw.jpg"
                    alt="Sukanya and Sreejith Traditional Portrait"
                  />
                </div>
                <LotusSVG className="lotus-bg-arch-left" size="64" />
                <LotusSVG className="lotus-bg-arch-right" size="64" />
              </div>
            </div>
          </section>

          {/* Section 3: Family Members & Symmetrical Parents/Addresses Grid */}
          <section className="invitation-message-section reveal-on-scroll" id="parents">
            <div className="ornament-divider">
              <LotusSVG size="32" />
            </div>
            <h2 className="section-title">Our Families</h2>

            <div className="parents-grid">
              <div className="parents-group bride-parents">
                <h3>Bride's Parents</h3>
                <p className="parent-name">Mr. Murukesh</p>
                <p className="parent-name">& Mrs. Thankamani Murukesh</p>
              </div>
              <div className="parents-separator"></div>
              <div className="parents-group groom-parents">
                <h3>Groom's Parents</h3>
                <p className="parent-name">Mr. Jayan V.A.</p>
                <p className="parent-name">& Mrs. Omana Jayan</p>
              </div>
            </div>

            <div className="parents-grid" style={{ marginTop: '3.5rem' }}>
              <div className="parents-group bride-address">
                <h3 className="residence-title">Bride's Residence</h3>
                <p className="residence-address">
                  Sonayil House<br />
                  Mammunnippadi, Engapuzha<br />
                  Puduppadi P.O.<br />
                  Kozhikode – 673586
                </p>
              </div>
              <div className="parents-separator"></div>
              <div className="parents-group groom-address">
                <h3 className="residence-title">Groom's Residence</h3>
                <p className="residence-address">
                  Varadattil House<br />
                  Panangattukara P.O.<br />
                  Kallampara<br />
                  Thrissur – 680623
                </p>
              </div>
            </div>

            {/* Bride Portrait inside arch frame */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
              <div className="temple-arch-outer" style={{ height: '480px' }}>
                <div className="temple-arch-inner" style={{ borderRadius: '182px 182px 10px 10px' }}>
                  <img
                    src="/sukanya_sreejith_bride.jpg"
                    alt="Sukanya Portrait"
                  />
                </div>
                <LotusSVG className="lotus-bg-arch-left" size="64" />
                <LotusSVG className="lotus-bg-arch-right" size="64" />
              </div>
            </div>
          </section>

          {/* Section 4: Sharing the Happiness */}
          <section className="invitation-message-section reveal-on-scroll" id="sharing-happiness">
            <div className="ornament-divider">
              <LotusSVG size="32" />
            </div>
            <h2 className="section-title" style={{ fontSize: '1.25rem', letterSpacing: '3px', color: 'var(--gold-dark)' }}>Sharing the Happiness</h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '15px 30px',
              fontFamily: 'var(--font-serif-body)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-dark)'
            }}>
              <span>Surya</span>
              <span>Karthik</span>
              <span>Akshay</span>
              <span>Devadath</span>
            </div>
          </section>

          {/* Section 5: Events Section */}
          <section className="events-section reveal-on-scroll" id="events">
            <h2 className="section-title">Wedding Events</h2>

            <div className="events-grid">
              {/* Event 1: Marriage Ceremony */}
              <div className="event-card marriage-card reveal-on-scroll delay-100">
                <div className="event-badge">Ceremony</div>
                <h3 className="event-name">Marriage Ceremony</h3>

                <div className="event-details-list">
                  <div className="event-detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <span>01 September 2026, Tuesday</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="far fa-clock"></i>
                    <span>Morning Slot (Muhurtham)</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-gopuram"></i>
                    <span>Sree Krishna Temple</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Guruvayoor, Thrissur</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Sree+Krishna+Temple,+Guruvayoor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  📍 See on Map
                </a>
              </div>

              {/* Event 2: Reception */}
              <div className="event-card reception-card reveal-on-scroll delay-200">
                <div className="event-badge">Celebration</div>
                <h3 className="event-name">Wedding Reception</h3>

                <div className="event-details-list">
                  <div className="event-detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <span>01 September 2026, Tuesday</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="far fa-clock"></i>
                    <span>3:00 PM – 9:00 PM</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-hotel"></i>
                    <span>Parish Hall</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Kuppayakode</span>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Parish+Hall,+Kuppayakode"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  📍 See on Map
                </a>
              </div>
            </div>
          </section>

          {/* Section 6: Photo Gallery */}
          <section className="events-section reveal-on-scroll" id="gallery">
            <h2 className="section-title">Visual Memories</h2>

            <div className="gallery-grid">
              {/* Image 1 */}
              <div onClick={() => setLightboxImg("/sukanya_sreejith_couple_1.jpg")} className="gallery-item reveal-on-scroll delay-100">
                <img src="/sukanya_sreejith_couple_1.jpg" alt="Sreejith and Sukanya Portrait" />
                <div className="gallery-overlay">
                  <i className="fas fa-magnifying-glass-plus"></i>
                </div>
              </div>

              {/* Image 2 */}
              <div onClick={() => setLightboxImg("/sukanya_sreejith_bride.jpg")} className="gallery-item reveal-on-scroll delay-200">
                <img src="/sukanya_sreejith_bride.jpg" alt="Sukanya Portrait" />
                <div className="gallery-overlay">
                  <i className="fas fa-magnifying-glass-plus"></i>
                </div>
              </div>

              {/* Image 3 */}
              <div onClick={() => setLightboxImg("/sukanya_sreejith_couple_bw.jpg")} className="gallery-item reveal-on-scroll delay-300">
                <img src="/sukanya_sreejith_couple_bw.jpg" alt="Sreejith and Sukanya B&W" />
                <div className="gallery-overlay">
                  <i className="fas fa-magnifying-glass-plus"></i>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: Live Countdown Timer */}
          <section className="countdown-section reveal-on-scroll" id="countdown">
            <h2 className="section-title">Time Until Wedding</h2>

            <div className="countdown-timer">
              <div className="countdown-item reveal-on-scroll delay-100">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Days</span>
              </div>
              <div className="countdown-item reveal-on-scroll delay-200">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="countdown-item reveal-on-scroll delay-300">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <div className="countdown-item reveal-on-scroll delay-400">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </section>


          {/* Section 10: Thank You */}
          <section className="invitation-message-section reveal-on-scroll" id="thankyou" style={{ marginBottom: '60px' }}>
            <div className="ornament-divider">
              <LotusSVG size="48" />
            </div>
            <h2 className="section-title" style={{ fontFamily: 'var(--font-serif-decorative)', fontSize: '2.5rem', textTransform: 'none', color: 'var(--gold-primary)' }}>Thank You</h2>
            <p className="invitation-text" style={{ fontSize: '1.35rem', marginTop: '1.5rem', marginBottom: '2.5rem' }}>
              "Your blessings, love, and support are what make this day complete. We are forever grateful for your presence in our lives."
            </p>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              - Sukanya & Sreejith -
            </div>
          </section>

          {/* Symmetrical Footer */}
          <footer className="invitation-footer" style={{ paddingBottom: '160px', paddingTop: '40px' }}>
            <p>CREATE YOUR BEAUTIFUL INVITE LINK</p>
            <a
              href="https://save-the-date.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Click Now
            </a>
          </footer>
        </div>
      </main>

      {/* Lightbox Modal Node */}
      {lightboxImg && (
        <div className="lightbox-modal" onClick={() => setLightboxImg(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightboxImg(null)}>
              <i className="fas fa-xmark"></i>
            </button>
            <img src={lightboxImg} className="lightbox-img" alt="Enlarged Memory Card View" />
          </div>
        </div>
      )}

      {/* Fixed Bottom Luxury Navigation Bar */}
      {isCardVisible && (
        <nav className="bottom-luxury-navbar">
          <a href="#hero" className="nav-btn">
            <i className="fas fa-book-open"></i>
            <span>Home</span>
          </a>
          <a href="#intro" className="nav-btn">
            <i className="fas fa-heart"></i>
            <span>Our Story</span>
          </a>
          <a href="#events" className="nav-btn">
            <i className="fas fa-calendar-alt"></i>
            <span>Events</span>
          </a>
          <a href="#gallery" className="nav-btn">
            <i className="fas fa-image"></i>
            <span>Gallery</span>
          </a>
        </nav>
      )}
    </div>
  );
}
