"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import type { InviteData } from "@/data/invites";

interface Petal {
  id: number;
  type: "rose" | "jasmine";
  size: number;
  left: number;
  duration: number;
  delay: number;
  rotation: number;
}

export function AjayAparnaThemeClone({ invite }: { invite: InviteData }) {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [isEnvelopeHidden, setIsEnvelopeHidden] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [petals, setPetals] = useState<Petal[]>([]);
  const [yOffset, setYOffset] = useState(0);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 1. Envelope opening logic
  const handleOpenEnvelope = () => {
    if (isEnvelopeOpened) return;
    setIsEnvelopeOpened(true);

    // Play music when seal is clicked
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((err) => {
          console.log("Audio play blocked by browser:", err);
        });
    }

    // Hide envelope and show card after envelope animation completes (1.3 seconds)
    setTimeout(() => {
      setIsEnvelopeHidden(true);
      setIsCardVisible(true);
    }, 1300);
  };

  // Lock document scroll while envelope is closed
  useEffect(() => {
    if (!isEnvelopeOpened) {
      document.documentElement.classList.add("ajay-aparna-locked");
    } else {
      document.documentElement.classList.remove("ajay-aparna-locked");
    }
    return () => {
      document.documentElement.classList.remove("ajay-aparna-locked");
    };
  }, [isEnvelopeOpened]);

  // 2. Background Music Controller
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

  // 3. Falling Petals generator
  useEffect(() => {
    if (!isCardVisible) return;

    let petalId = 0;
    const createPetal = () => {
      const type = Math.random() > 0.5 ? "rose" : "jasmine";
      const size = Math.random() * 12 + 10; // 10px to 22px
      const left = Math.random() * 100;
      const duration = Math.random() * 6 + 6; // 6s to 12s
      const delay = Math.random() * 4;
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

      // Remove petal after animation completes
      setTimeout(() => {
        setPetals((prev) => prev.filter((p) => p.id !== newPetal.id));
      }, (duration + delay) * 1000);
    };

    // Spawn initial batch
    for (let i = 0; i < 15; i++) {
      createPetal();
    }

    const interval = setInterval(createPetal, 450);
    return () => clearInterval(interval);
  }, [isCardVisible]);

  // 4. Parallax Scroll effect for side artwork
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setYOffset(scrollTop * 0.15);
    }
  };

  // For mobile devices, scroll is on window
  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.innerWidth <= 992) {
        setYOffset(window.scrollY * 0.15);
      }
    };
    window.addEventListener("scroll", handleWindowScroll);
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // 5. Countdown Timer
  useEffect(() => {
    const targetDate = new Date("2026-08-20T12:15:00+05:30").getTime();

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

  // 6. WhatsApp Share Button handler
  const handleWhatsappShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const shareMessage = `Together with our families, we cordially invite you to celebrate our special day on Thursday, August 20, 2026. View our interactive wedding invitation card here: ${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // Disable right-click globally for context menu (as done in the original theme)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <div className="ajay-aparna-theme relative w-full min-h-screen">
      {/* Stylesheet imports & Scoped custom CSS */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=Montserrat:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <style>{`
        html.ajay-aparna-locked, 
        html.ajay-aparna-locked body {
          overflow: hidden !important;
          height: 100vh !important;
        }

        .ajay-aparna-theme {
          --bg-warm-cream: #FAF6F0;
          --bg-deep-cream: #F4ECE1;
          --bg-light-gold: #E6D5B8;
          --gold-primary: #C5A880;
          --gold-dark: #A88656;
          --gold-light: #F0E6D2;
          --text-dark: #2C2520;
          --text-muted: #6E6259;
          --accent-maroon: #802A2A;
          --accent-green: #2E5A44;
          --white: #FFFFFF;
          --shadow-sm: 0 4px 6px rgba(44, 37, 32, 0.05);
          --shadow-md: 0 8px 16px rgba(44, 37, 32, 0.08);
          --shadow-lg: 0 16px 32px rgba(44, 37, 32, 0.12);
          --shadow-inset: inset 0 2px 4px rgba(0, 0, 0, 0.06);

          --font-serif-header: 'Cinzel', serif;
          --font-serif-decorative: 'Cinzel Decorative', serif;
          --font-serif-body: 'Playfair Display', serif;
          --font-sans: 'Montserrat', sans-serif;
          
          font-family: var(--font-sans);
          background-color: var(--bg-warm-cream);
          color: var(--text-dark);
        }

        /* Envelope Styles */
        .envelope-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, var(--bg-warm-cream) 0%, var(--bg-deep-cream) 100%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 999;
          transition: opacity 0.8s cubic-bezier(0.77, 0, 0.175, 1),
                      visibility 0.8s cubic-bezier(0.77, 0, 0.175, 1),
                      transform 1s cubic-bezier(0.77, 0, 0.175, 1);
          overflow: hidden;
        }

        .envelope-wrapper.is-hidden {
          opacity: 0;
          visibility: hidden;
          transform: scale(0.9) translateY(-100px);
          pointer-events: none;
        }

        .envelope {
          position: relative;
          width: 420px;
          height: 280px;
          background-color: #6d2222;
          border-radius: 6px;
          box-shadow: var(--shadow-lg);
          perspective: 1000px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        @media (max-width: 480px) {
          .envelope {
            width: 320px;
            height: 213px;
          }
        }

        .envelope:hover {
          transform: translateY(-5px);
        }

        .envelope-flap {
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
          z-index: 3;
        }

        .top-flap {
          top: 0;
          left: 0;
          width: 100%;
          height: 50%;
          border-width: 140px 210px 0 210px;
          border-color: #8a2e2e transparent transparent transparent;
          transform-origin: top center;
          transition: transform 0.6s ease-in-out;
          z-index: 4;
        }

        @media (max-width: 480px) {
          .top-flap {
            border-width: 106.5px 160px 0 160px;
          }
        }

        .left-flap {
          top: 0;
          left: 0;
          height: 100%;
          width: 50%;
          border-width: 140px 0 140px 210px;
          border-color: transparent transparent transparent #752525;
        }

        @media (max-width: 480px) {
          .left-flap {
            border-width: 106.5px 0 106.5px 160px;
          }
        }

        .right-flap {
          top: 0;
          right: 0;
          height: 100%;
          width: 50%;
          border-width: 140px 210px 140px 0;
          border-color: transparent #752525 transparent transparent;
        }

        @media (max-width: 480px) {
          .right-flap {
            border-width: 106.5px 160px 106.5px 0;
          }
        }

        .bottom-flap {
          bottom: 0;
          left: 0;
          width: 100%;
          height: 60%;
          border-width: 0 210px 140px 210px;
          border-color: transparent transparent #611e1e transparent;
        }

        @media (max-width: 480px) {
          .bottom-flap {
            border-width: 0 160px 106.5px 160px;
          }
        }

        .envelope-card-preview {
          position: absolute;
          top: 10px;
          left: 20px;
          right: 20px;
          bottom: 10px;
          background-color: var(--bg-warm-cream);
          border-radius: 4px;
          z-index: 2;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 1px solid var(--gold-primary);
          transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
          padding: 20px;
          background-image: radial-gradient(var(--bg-deep-cream) 1px, transparent 1px);
          background-size: 16px 16px;
        }

        .preview-initials {
          font-family: var(--font-serif-decorative);
          font-size: 2.2rem;
          color: var(--gold-primary);
          margin-bottom: 5px;
          letter-spacing: 2px;
        }

        .preview-text {
          font-family: var(--font-sans);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 4px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .wax-seal {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 70px;
          height: 70px;
          transform: translate(-50%, -30%) scale(1);
          z-index: 5;
          cursor: pointer;
          background: radial-gradient(circle at 35% 35%, #f4d068, #c5973c 70%, #9e7528);
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25), 
                      inset 0 -2px 5px rgba(0, 0, 0, 0.2),
                      inset 0 2px 5px rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @media (max-width: 480px) {
          .wax-seal {
            width: 60px;
            height: 60px;
            transform: translate(-50%, -25%) scale(1);
          }
        }

        .wax-seal::after {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          border-radius: 53% 47% 45% 55% / 40% 60% 40% 60%;
          border: 4px solid rgba(197, 168, 128, 0.3);
          pointer-events: none;
        }

        .wax-seal:hover {
          transform: translate(-50%, -30%) scale(1.1);
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3), 
                      inset 0 -2px 5px rgba(0, 0, 0, 0.2),
                      inset 0 2px 5px rgba(255, 255, 255, 0.5);
        }

        .seal-inner {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          border: 2px dashed rgba(255, 255, 255, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 480px) {
          .seal-inner {
            width: 46px;
            height: 46px;
          }
        }

        .seal-monogram {
          font-family: var(--font-serif-decorative);
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          letter-spacing: 1px;
        }

        .envelope.is-open .top-flap {
          transform: rotateX(180deg);
          z-index: 1;
        }

        .envelope.is-open .wax-seal {
          transform: translate(-50%, 60px) scale(0.8);
          opacity: 0;
          pointer-events: none;
        }

        .envelope.is-open .envelope-card-preview {
          transform: translateY(-130px);
        }

        @media (max-width: 480px) {
          .envelope.is-open .envelope-card-preview {
            transform: translateY(-90px);
          }
          .envelope.is-open .wax-seal {
            transform: translate(-50%, 40px) scale(0.8);
          }
        }

        .envelope-hint {
          margin-top: 30px;
          font-family: var(--font-sans);
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 3px;
          color: var(--text-muted);
          animation: bounce 2s infinite;
          pointer-events: none;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-8px); }
          60% { transform: translateY(-4px); }
        }

        /* Wedding Card Styles */
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
          transition: opacity 1s ease, visibility 1s ease;
          z-index: 10;
        }

        .wedding-card.is-visible {
          opacity: 1;
          visibility: visible;
        }

        .card-content-scroll {
          width: 60%;
          min-height: 100vh;
          padding: 80px 10%;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-warm-cream);
          position: relative;
          overflow-y: auto;
        }

        .card-side-art {
          width: 40%;
          height: 100vh;
          position: fixed;
          right: 0;
          top: 0;
          z-index: 20;
          overflow: hidden;
          box-shadow: -8px 0 24px rgba(44, 37, 32, 0.08);
          border-left: 2px solid var(--gold-primary);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%);
          mask-image: linear-gradient(to right, transparent 0%, black 12%);
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        .art-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom, rgba(44, 37, 32, 0.05), transparent 30%, rgba(44, 37, 32, 0.15));
          z-index: 21;
          pointer-events: none;
        }

        .side-art-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 6s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .wedding-card.is-visible .side-art-img {
          transform: scale(1.05);
        }

        /* Hero */
        .hero-section {
          min-height: calc(100vh - 160px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          margin-bottom: 80px;
        }

        .initials-logo {
          font-family: var(--font-serif-decorative);
          font-size: 2rem;
          color: var(--gold-primary);
          width: 100px;
          height: 100px;
          border: 2px solid var(--gold-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          letter-spacing: 0px;
          background-color: rgba(255, 255, 255, 0.4);
          box-shadow: var(--shadow-sm);
          position: relative;
          white-space: nowrap;
        }

        .initials-logo::after {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          border: 1px dashed var(--gold-primary);
          border-radius: 50%;
          opacity: 0.6;
        }

        .invitation-heading {
          font-family: var(--font-serif-header);
          font-weight: 400;
          font-size: 1.1rem;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .couple-names {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }

        .couple-names .name {
          font-family: var(--font-serif-body);
          font-size: 4.5rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.1;
          text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
        }

        .couple-names .and {
          font-family: var(--font-serif-body);
          font-size: 2.5rem;
          font-style: italic;
          color: var(--gold-primary);
          margin: 0.5rem 0;
        }

        .couple-portrait-wrapper {
          max-width: 380px;
          width: 90%;
          margin: 2rem auto;
          overflow: hidden;
          background-color: transparent;
          position: relative;
          -webkit-mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          mask-image: radial-gradient(ellipse at center, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%);
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        .couple-portrait {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.8s ease;
        }

        .couple-portrait-wrapper:hover .couple-portrait {
          transform: scale(1.03);
        }

        .hero-details {
          border-top: 1px solid var(--gold-light);
          border-bottom: 1px solid var(--gold-light);
          padding: 1.2rem 2.5rem;
          margin-bottom: 3rem;
          background-color: rgba(244, 236, 225, 0.3);
        }

        .hero-date {
          font-family: var(--font-serif-header);
          font-size: 1.3rem;
          letter-spacing: 4px;
          color: var(--accent-maroon);
          font-weight: 600;
          margin-bottom: 0.4rem;
        }

        .hero-location {
          font-family: var(--font-sans);
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 3px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .scroll-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--gold-dark);
        }

        .scroll-text {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 500;
        }

        .scroll-arrow {
          animation: bounce-arrow 2s infinite;
        }

        @keyframes bounce-arrow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }

        /* Message */
        .invitation-message-section {
          text-align: center;
          padding: 60px 0;
          max-width: 600px;
          margin: 0 auto 80px auto;
        }

        .invitation-text {
          font-family: var(--font-serif-body);
          font-size: 1.25rem;
          line-height: 1.8;
          color: var(--text-dark);
          margin-bottom: 3.5rem;
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
          font-size: 0.9rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 1rem;
        }

        .parent-name {
          font-family: var(--font-serif-body);
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.4;
        }

        .parents-separator {
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--gold-primary), transparent);
        }

        /* Events */
        .events-section {
          padding: 60px 0;
          margin-bottom: 80px;
        }

        .section-title {
          font-family: var(--font-serif-header);
          font-size: 1.8rem;
          letter-spacing: 4px;
          text-align: center;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 3rem;
          position: relative;
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

        .events-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .event-card {
          background-color: var(--bg-deep-cream);
          border: 1px solid var(--gold-light);
          border-radius: 8px;
          padding: 40px 30px;
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
          height: 4px;
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
          letter-spacing: 2px;
          color: var(--accent-maroon);
          font-weight: 600;
          background-color: rgba(128, 42, 42, 0.08);
          padding: 4px 12px;
          border-radius: 20px;
          display: inline-block;
          align-self: center;
          margin-bottom: 1.5rem;
        }

        .event-name {
          font-family: var(--font-serif-header);
          font-size: 1.15rem;
          line-height: 1.4;
          color: var(--text-dark);
          margin-bottom: 2rem;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .event-details-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          text-align: left;
          margin-bottom: 2.5rem;
          flex-grow: 1;
        }

        .event-detail-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .event-detail-item i {
          color: var(--gold-dark);
          font-size: 1.1rem;
          margin-top: 3px;
          width: 20px;
          text-align: center;
        }

        .event-detail-item span {
          font-family: var(--font-sans);
          font-weight: 400;
        }

        .map-btn {
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-primary) 100%);
          color: var(--text-dark);
          border: none;
          border-radius: 4px;
          padding: 12px 24px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(197, 168, 128, 0.2);
        }

        .map-btn:hover {
          background: var(--text-dark);
          color: var(--white);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        /* Countdown */
        .countdown-section {
          padding: 60px 0;
          text-align: center;
          margin-bottom: 80px;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 2rem;
        }

        .countdown-item {
          width: 100px;
          height: 100px;
          border: 1px solid var(--gold-primary);
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--bg-deep-cream);
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .countdown-item:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-md);
          background-color: rgba(255, 255, 255, 0.8);
        }

        .countdown-item .number {
          font-family: var(--font-sans);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--accent-maroon);
          line-height: 1.1;
        }

        .countdown-item .label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 4px;
        }

        /* Footer */
        .invitation-footer {
          margin-top: auto;
          padding: 40px 0 0 0;
          border-top: 1px solid var(--gold-light);
          text-align: center;
        }

        .invitation-footer p {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .footer-link {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
          text-decoration: none;
          display: inline-block;
          margin: 10px 0 15px 0;
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 25px;
          height: 1px;
          background-color: var(--gold-primary);
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: var(--accent-maroon);
        }

        .footer-link:hover::after {
          width: 100%;
          background-color: var(--accent-maroon);
        }

        .footer-link i {
          margin-left: 6px;
          color: #25D366;
          font-size: 0.95rem;
          transition: transform 0.3s ease;
          display: inline-block;
          vertical-align: middle;
        }

        .footer-link:hover i {
          transform: scale(1.15) rotate(5deg);
        }

        .share-btn {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--gold-primary);
          color: var(--text-dark);
          border-radius: 30px;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          text-decoration: none;
          padding: 12px 28px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          cursor: pointer;
        }

        .share-btn i {
          font-size: 1.1rem;
          color: #25D366;
          transition: transform 0.3s ease;
          vertical-align: middle;
        }

        .share-btn span {
          vertical-align: middle;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          background: var(--white);
          color: var(--accent-maroon);
          border-color: var(--gold-dark);
          box-shadow: var(--shadow-lg);
        }

        .share-btn:hover i {
          color: var(--accent-maroon);
          transform: scale(1.15) rotate(5deg);
        }

        /* Music player and WhatsApp Share Buttons floating container */
        .music-player {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-toggle-btn {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--gold-primary);
          color: var(--text-dark);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: var(--shadow-md);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          animation: pulse-music 3s infinite alternate;
        }

        .music-toggle-btn:hover {
          transform: scale(1.1);
          background: var(--white);
          color: var(--accent-maroon);
          box-shadow: var(--shadow-lg);
        }

        .music-toggle-btn.playing i {
          color: var(--accent-maroon);
        }

        @keyframes pulse-music {
          0% { box-shadow: 0 0 0 0 rgba(197, 168, 128, 0.4); }
          70% { box-shadow: 0 0 0 12px rgba(197, 168, 128, 0); }
          100% { box-shadow: 0 0 0 0 rgba(197, 168, 128, 0); }
        }

        .floating-share {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .share-toggle-btn {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--gold-primary);
          color: var(--text-dark);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: var(--shadow-md);
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
          background: var(--white);
          box-shadow: var(--shadow-lg);
        }

        .share-toggle-btn:hover i {
          transform: scale(1.15) rotate(8deg);
          color: var(--accent-maroon);
        }

        /* Falling Petals Background Effect */
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

        @keyframes fall {
          0% {
            transform: translate3d(0, -50px, 0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.85; }
          90% { opacity: 0.85; }
          100% {
            transform: translate3d(120px, calc(100vh + 50px), 0) rotate(480deg);
            opacity: 0;
          }
        }

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

        /* Responsive Layout Overrides */
        @media (max-width: 992px) {
          .wedding-card {
            flex-direction: column;
            overflow-y: auto;
          }

          .card-side-art {
            width: 100%;
            height: 480px;
            position: relative;
            border-left: none;
            border-bottom: none;
            -webkit-mask-image: linear-gradient(to bottom, black 35%, transparent 95%);
            mask-image: linear-gradient(to bottom, black 35%, transparent 95%);
            mask-size: 100% 100%;
            -webkit-mask-size: 100% 100%;
            mask-repeat: no-repeat;
            -webkit-mask-repeat: no-repeat;
            transform: translate3d(0, 0, 0);
            -webkit-transform: translate3d(0, 0, 0);
            margin-bottom: -50px;
          }

          .card-content-scroll {
            width: 100%;
            min-height: auto;
            padding: 60px 5%;
          }

          .hero-section {
            min-height: auto;
            padding: 40px 0;
            margin-bottom: 40px;
          }

          .couple-names .name {
            font-size: 3.2rem;
          }

          .couple-names .and {
            font-size: 2rem;
          }
        }

        @media (max-width: 768px) {
          .events-grid {
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
        }
      `}</style>



      {/* Background Music Player */}
      <div className="music-player">
        <audio
          ref={audioRef}
          src="/music/vidssavecom-mangalyam-official-audio-wedding-song-arun-pradeep-feat-sand_MaLJU9Oi.aac"
          loop
          preload="auto"
        />
        <button
          onClick={toggleMusic}
          className={`music-toggle-btn ${isMusicPlaying ? "playing" : ""}`}
          aria-label="Toggle Background Music"
        >
          <i className={isMusicPlaying ? "fas fa-volume-up" : "fas fa-volume-mute"}></i>
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

      {/* Section 1: The Interactive 3D Envelope */}
      {!isEnvelopeHidden && (
        <div className={`envelope-wrapper ${isEnvelopeOpened ? "is-hidden" : ""}`}>
          <div
            className={`envelope ${isEnvelopeOpened ? "is-open" : ""}`}
            onClick={handleOpenEnvelope}
          >
            <div className="envelope-flap top-flap"></div>
            <div className="envelope-flap left-flap"></div>
            <div className="envelope-flap right-flap"></div>
            <div className="envelope-flap bottom-flap"></div>

            {/* The Card Peeking / Inside Envelope */}
            <div className="envelope-card-preview">
              <div className="preview-initials">A & A</div>
              <div className="preview-text">Save the Date</div>
            </div>

            {/* Gold Wax Seal */}
            <div className="wax-seal">
              <div className="seal-inner">
                <span className="seal-monogram">A&A</span>
              </div>
            </div>
          </div>
          <div className="envelope-hint">Click the Wax Seal to Open</div>
        </div>
      )}

      {/* Section 2: The Main Wedding Card */}
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

        {/* Right Side Column Decoration (Kerala Traditional Elements) */}
        <div className="card-side-art">
          <div className="art-overlay"></div>
          <img
            src="/kerala_wedding_bg.png"
            alt="Kerala Traditional Wedding Pillar, Vilakku and Jasmine Garlands"
            className="side-art-img"
            style={{
              transform: `scale(1.05) translateY(${yOffset}px)`,
            }}
          />
        </div>

        {/* Left Side Scrollable Content */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="card-content-scroll"
        >
          {/* Hero / Cover Section */}
          <section className="hero-section" id="hero">
            <div className="initials-logo">A & A</div>
            <h1 className="invitation-heading">The Wedding Invitation of</h1>
            <div className="couple-names">
              <span className="name">Ajay</span>
              <span className="and">&</span>
              <span className="name">Aparna</span>
            </div>
            {/* Couple Casual Portrait */}
            <div className="couple-portrait-wrapper">
              <img
                src="/couple_traditional.jpg"
                alt="Ajay and Aparna Casual Portrait"
                className="couple-portrait"
              />
            </div>
            <div className="hero-details">
              <p className="hero-date">August 20, 2026</p>
              <p className="hero-location">Pulpally, Kerala</p>
            </div>
            <div className="scroll-indicator">
              <span className="scroll-text">Scroll to Begin</span>
              <i className="fas fa-chevron-down scroll-arrow"></i>
            </div>
          </section>

          {/* Invitation details section */}
          <section className="invitation-message-section" id="message">
            <div className="ornament-divider">
              <i className="fas fa-feather-pointed"></i>
            </div>
            <p className="invitation-text">
              Together with our families, we cordially invite you to celebrate our special day. As we
              unite our lives in sacred matrimony under the blessings of God, your presence and
              prayers will bring us immense joy.
            </p>

            {/* Couple Traditional Portrait */}
            <div className="couple-portrait-wrapper">
              <img
                src="/couple_casual.jpg"
                alt="Ajay and Aparna Traditional Portrait"
                className="couple-portrait"
              />
            </div>

            {/* Parents details */}
            <div className="parents-grid">
              <div className="parents-group groom-parents">
                <h3>Groom's Parents</h3>
                <p className="parent-name">Mr. Sivan</p>
                <p className="parent-name">& Mrs. Sathi</p>
              </div>
              <div className="parents-separator"></div>
              <div className="parents-group bride-parents">
                <h3>Bride's Parents</h3>
                <p className="parent-name">Mr. Baiju</p>
                <p className="parent-name">& Mrs. Sunitha</p>
              </div>
            </div>
          </section>

          {/* Events Section (Muhurtham & Reception) */}
          <section className="events-section" id="events">
            <h2 className="section-title">Wedding Events</h2>

            <div className="events-grid">
              {/* Event 1: Muhurtham */}
              <div className="event-card muhurtham-card">
                <div className="event-badge">Ceremony</div>
                <h3 className="event-name">Marriage Ceremony (Muhurtham)</h3>

                <div className="event-details-list">
                  <div className="event-detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <span>20 August 2026, Thursday</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="far fa-clock"></i>
                    <span>12:15 PM (Muhurtham)</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-gopuram"></i>
                    <span>Seethadevi Temple</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Pulpally, Wayanad</span>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/zVybRk1idCd1vcyV6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  📍 See on Map
                </a>
              </div>

              {/* Event 2: Reception */}
              <div className="event-card reception-card">
                <div className="event-badge">Celebration</div>
                <h3 className="event-name">Wedding Reception</h3>

                <div className="event-details-list">
                  <div className="event-detail-item">
                    <i className="far fa-calendar-alt"></i>
                    <span>20 August 2026, Thursday</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="far fa-clock"></i>
                    <span>12:00 PM Onwards</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-church"></i>
                    <span>St. Joseph Church Auditorium</span>
                  </div>
                  <div className="event-detail-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>Marakavu, Pulpally</span>
                  </div>
                </div>

                <a
                  href="https://maps.app.goo.gl/XA1ZpSrckFxbfivs6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  📍 See on Map
                </a>
              </div>
            </div>
          </section>

          {/* Live Countdown Section */}
          <section className="countdown-section" id="countdown">
            <h2 className="section-title">Time Until Muhurtham</h2>

            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="number">{timeLeft.days}</span>
                <span className="label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.hours}</span>
                <span className="label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.minutes}</span>
                <span className="label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="number">{timeLeft.seconds}</span>
                <span className="label">Seconds</span>
              </div>
            </div>
          </section>

          <footer className="invitation-footer">
            <p>CREATE YOUR BEAUTIFUL INVITE LINK</p>
            <a
              href="https://save-the-date.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
            >
              Click Now
            </a>
            <p>© aswinraviogre.</p>
          </footer>
        </div>
      </main>
    </div>
  );
}
