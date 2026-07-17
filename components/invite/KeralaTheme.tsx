"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import type { InviteData } from "@/data/invites";
import { KeralaStickyBar } from "./KeralaStickyBar";

function FallingPetals() {
  const petals = Array.from({ length: 30 }).map((_, i) => {
    const left = (i * 17) % 100; 
    const animDur = 10 + (i % 10);
    const animDelay = 6 + ((i * 0.9) % 15); // Start after 6 seconds
    const swayDur = 3 + (i % 4);
    const size = 12 + (i % 12);

    return (
      <div 
        key={i} 
        className="absolute top-[-10%] opacity-80"
        style={{
          left: `${left}%`,
          animation: `fall ${animDur}s linear infinite`,
          animationDelay: `${animDelay}s`,
          width: `${size}px`,
          height: `${size}px`,
        }}
      >
        <div style={{ animation: `sway ${swayDur}s ease-in-out infinite alternate`, width: '100%', height: '100%' }}>
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md" style={{ animation: `spin ${animDur * 1.5}s linear infinite` }}>
            <path d="M15,0 C25,5 30,15 25,25 C15,30 5,25 0,15 C0,5 10,0 15,0 Z" fill="#dc2626" />
          </svg>
        </div>
      </div>
    );
  });

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(110vh); }
        }
        @keyframes sway {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {petals}
    </div>
  );
}

function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const startAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true);
        window.removeEventListener("click", startAudio);
        window.removeEventListener("touchstart", startAudio);
        window.removeEventListener("scroll", startAudio);
      }).catch(() => {});
    };

    // Attempt to auto-play on mount
    audio.play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.log("Autoplay blocked, waiting for interaction:", error);
        // Add listeners for any interaction to start music
        window.addEventListener("click", startAudio);
        window.addEventListener("touchstart", startAudio);
        window.addEventListener("scroll", startAudio);
      });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
      window.removeEventListener("scroll", startAudio);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/Kiliye%20song%20Climax%20BGM%20ARM%20Love%20bgm%20Tovino%20Krithi%20Dhibu%20N%20Thomas%20Trending.mp3"
        loop
        autoPlay
        preload="auto"
      />
      <button
        onClick={togglePlay}
        className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 w-12 h-12 bg-[#1b4332]/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] border-2 border-[#d4af37]/60 text-[#d4af37] hover:scale-110 hover:bg-[#1b4332] transition-all duration-300 group"
        aria-label="Toggle Background Music"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isPlaying ? "volume_up" : "volume_off"}
        </span>
        
        {/* Simple ripple animation when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-[#d4af37] opacity-0 animate-ping" style={{ animationDuration: '2s' }}></span>
        )}
      </button>
    </>
  );
}

export function KeralaTheme({ invite }: { invite: InviteData }) {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(smoothScrollY, [0, 1000], ["0%", "30%"]);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Disable right-click globally to protect images
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Countdown Timer Logic
    const targetDate = new Date("2030-01-22T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      clearInterval(interval);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#faf8f5] text-[#1b4332] font-serif overflow-hidden relative">
      <Link href="/" className="fixed top-4 left-4 z-50 bg-[#1b4332]/80 backdrop-blur-md text-[#d4af37] px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#1b4332] transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] border border-[#d4af37]/60 text-sm font-sans font-semibold">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Exit Design
      </Link>
      <BackgroundMusic />
      <FallingPetals />
      
      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <style>{`
          @keyframes smoothZoom {
            0% { transform: scale(1); }
            100% { transform: scale(1.15); }
          }
        `}</style>
        
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            className="absolute top-[-20%] left-0 w-full h-[140%]" 
            style={{ y: backgroundY, animation: "smoothZoom 30s ease-in-out infinite alternate" }}
          >
            <Image
              src="/hero-bg.jpg"
              alt="Traditional Kerala Wedding Background"
              fill
              className="object-cover opacity-95"
              quality={80}
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f5]/80 via-[#faf8f5]/50 to-[#faf8f5]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
          
          <p className="text-[#d4af37] tracking-[0.2em] uppercase text-sm mb-4 font-semibold">
            We invite you to our wedding
          </p>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 text-[#1b4332] drop-shadow-sm whitespace-nowrap" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Anandhu <span className="text-[#9b2226] text-2xl sm:text-4xl md:text-5xl align-middle mx-1 md:mx-2">❤️</span> Archana
          </h1>
          
          {/* Traditional Divider */}
          <div className="flex items-center justify-center gap-4 w-full max-w-xs mb-6">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-[#d4af37]"></div>
            <div className="w-3 h-3 rotate-45 border border-[#d4af37]"></div>
            <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-[#d4af37]"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-[#1b4332] font-medium tracking-wide">
            22 January 2026
          </p>
        </div>
      </section>

      {/* --- INTRO SECTION --- */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#d4af37]/30 rounded-full"></div>
        <p className="text-lg md:text-2xl leading-relaxed text-[#1b4332]/80 mt-8 italic">
          "With the blessings of our families, we joyfully invite you to share in our happiness as we unite in marriage and begin our new life together."
        </p>
        <div className="mt-12 mx-auto w-32 h-auto opacity-70">
           <svg viewBox="0 0 100 20" className="fill-[#d4af37]">
             <path d="M50 10 Q 25 -10, 0 10 Q 25 30, 50 10 M50 10 Q 75 -10, 100 10 Q 75 30, 50 10" />
           </svg>
        </div>
      </section>

      {/* --- COUNTDOWN SECTION --- */}
      <section className="py-16 bg-[#1b4332] text-[#faf8f5] relative border-y-4 border-[#d4af37]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-2xl tracking-[0.15em] uppercase text-[#d4af37] mb-12 font-semibold">
            The Celebration Begins In
          </h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Mins", value: timeLeft.minutes },
              { label: "Secs", value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#faf8f5]/10 p-6 rounded-tl-3xl rounded-br-3xl border border-[#d4af37]/40 w-28 md:w-32 backdrop-blur-sm shadow-lg">
                <span className="text-4xl md:text-5xl font-bold text-[#d4af37]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                  {item.value}
                </span>
                <span className="text-xs uppercase tracking-widest mt-2 text-[#faf8f5]/80">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- GALLERY SECTION --- */}
      <section id="gallery" className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-[#1b4332]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Memories
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Grid Style Images - Left/Top Side */}
          <div className="w-full lg:w-[55%] columns-2 gap-4 space-y-4">
            {[
              "/gallery/PEPPEADS_1340_resized.jpg",
              "/gallery/PEPPEADS_1817_resized.jpg",
              "/gallery/PEPPEADS_1802_resized.jpg",
              "/gallery/PEPPEADS_2092_resized.jpg",
              "/gallery/PEPPEADS_1833_resized.jpg",
              "/gallery/PEPPEADS_31_resized.jpg",
              "/gallery/PEPPEADS_7_resized.jpg",
            ].map((img, i) => (
              <div 
                key={i} 
                className="relative overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-xl transition-shadow duration-300 border-[4px] border-white group"
              >
                <Image 
                  src={img} 
                  alt="Memory" 
                  width={600}
                  height={800}
                  className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            ))}
          </div>

          {/* Video Section - Right/Bottom Side */}
          <div className="w-full lg:w-[45%] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(27,67,50,0.1)] border-[8px] border-white aspect-[9/16] relative bg-[#faf8f5] mx-auto lg:mx-0">
             <iframe 
                src="https://www.instagram.com/reel/DVqmvemDyXE/embed" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                allow="encrypted-media"
                loading="lazy"
                title="Wedding Reel"
             ></iframe>
          </div>
        </div>
      </section>

      {/* --- EVENT DETAILS SECTION --- */}
      <section id="event" className="py-24 relative w-full">
        <div className="w-full bg-[#1b4332] py-20 px-6 md:px-12 rounded-none border-y-4 border-[#d4af37]/40 shadow-2xl relative z-10 text-center">
          
          {/* Traditional Top Ornament (Square Style) */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#faf8f5] px-4 py-2">
             <div className="w-12 h-12 rotate-45 border-2 border-[#d4af37] flex items-center justify-center bg-[#faf8f5]">
               <div className="w-6 h-6 rotate-45 bg-[#9b2226]"></div>
             </div>
          </div>
          
          <h2 className="text-center text-3xl md:text-4xl font-bold mt-6 mb-12 text-[#d4af37]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Wedding Ceremony
          </h2>
          
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex-1 bg-[#faf8f5]/5 p-8 rounded-none border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors">
              <span className="material-symbols-outlined text-[#d4af37] mb-3 text-4xl">calendar_month</span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]/70 font-semibold mb-3">When</p>
              <p className="text-2xl md:text-3xl text-[#faf8f5] font-semibold">{invite.date}</p>
              <p className="text-lg text-[#d4af37] mt-3 font-medium">Muhurtham: 10:00 AM - 11:30 AM</p>
            </div>
            
            <div className="flex-1 bg-[#faf8f5]/5 p-8 rounded-none border border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-colors">
              <span className="material-symbols-outlined text-[#d4af37] mb-3 text-4xl">location_on</span>
              <p className="text-sm uppercase tracking-[0.2em] text-[#d4af37]/70 font-semibold mb-3">Where</p>
              <p className="text-2xl md:text-3xl text-[#faf8f5] font-semibold">{invite.venue}</p>
              <p className="text-lg text-[#d4af37] mt-3 font-medium">Kerala, India</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOCATION SECTION --- */}
      <section id="location" className="py-20 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8 text-[#1b4332]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Directions
        </h2>
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white bg-gray-200">
          {/* Actual Google Maps embed based on venue */}
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent(invite.venue + ', Kerala')}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy"
            title="Location Map"
          ></iframe>
        </div>
      </section>

      {/* --- RSVP SECTION --- */}
      <section id="rsvp" className="py-24 text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1b4332] z-0"></div>
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-white" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            We look forward to seeing you
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Please let us know if you can make it to our special day.
          </p>
          
          <a
            href={`https://wa.me/${invite.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-[#d4af37] text-[#1b4332] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#ffe58f] transition-colors shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:scale-105 transform duration-300"
          >
            <span className="material-symbols-outlined">chat</span>
            Join us via WhatsApp
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 pb-32 md:pb-12 text-center bg-[#faf8f5] border-t border-[#d4af37]/20">
        <p className="text-[#1b4332] font-medium tracking-wide">
          With Love,
        </p>
        <p className="text-2xl mt-2 font-bold text-[#1b4332]" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Anandhu & Archana
        </p>
      </footer>

      {/* --- MOBILE STICKY NAV --- */}
      <KeralaStickyBar />
    </div>
  );
}
