"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import type { InviteData } from "@/data/invites";

function Sparkles() {
  const particles = Array.from({ length: 40 }).map((_, i) => {
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 5;
    const size = 1 + Math.random() * 3;

    return (
      <motion.div
        key={i}
        className="absolute rounded-full bg-[#b8860b]/40"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: `${size}px`,
          height: `${size}px`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "easeInOut",
        }}
      />
    );
  });

  return <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">{particles}</div>;
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
      }).catch(() => {});
    };

    audio.play().then(() => setIsPlaying(true)).catch(() => {
      window.addEventListener("click", startAudio);
      window.addEventListener("touchstart", startAudio);
    });

    return () => {
      window.removeEventListener("click", startAudio);
      window.removeEventListener("touchstart", startAudio);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/royal_theme.mp3" loop autoPlay preload="auto" />
      <button
        onClick={togglePlay}
        className="fixed bottom-8 left-8 z-50 w-14 h-14 bg-[#6b0504] border-2 border-[#b8860b] rounded-full flex items-center justify-center shadow-2xl text-[#b8860b] hover:scale-110 transition-transform"
      >
        <span className="material-symbols-outlined">{isPlaying ? "volume_up" : "volume_off"}</span>
      </button>
    </>
  );
}

export function RoyalTheme({ invite }: { invite: InviteData }) {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [1, 1.1]), { stiffness: 50 });

  return (
    <div className="min-h-screen bg-[#fdf5e6] text-[#6b0504] font-serif overflow-hidden relative">
      <Link href="/" className="fixed top-4 left-4 z-50 bg-[#6b0504]/90 backdrop-blur-md text-[#b8860b] px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#6b0504] transition-colors border border-[#b8860b]/50 shadow-xl text-sm font-sans font-semibold">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Exit Design
      </Link>

      <Sparkles />
      <BackgroundMusic />

      {/* --- HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 text-center">
        {/* Palace Border Ornament */}
        <div className="absolute inset-10 border-[1px] border-[#b8860b]/30 pointer-events-none">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#b8860b]"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#b8860b]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#b8860b]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#b8860b]"></div>
        </div>

        <motion.div style={{ scale }} className="z-10">
          <h2 className="text-[#b8860b] uppercase tracking-[0.4em] text-sm mb-8 font-sans font-bold">Royal Invitation</h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight drop-shadow-sm">
            {invite.couple.split('&')[0]} <br />
            <span className="text-3xl md:text-5xl text-[#b8860b]">&</span> <br />
            {invite.couple.split('&')[1]}
          </h1>
          <div className="w-24 h-1 bg-[#b8860b] mx-auto my-8"></div>
          <p className="text-xl md:text-2xl tracking-[0.2em] font-medium uppercase">{invite.date}</p>
        </motion.div>
      </section>

      {/* --- PALACE ARCH QUOTE --- */}
      <section className="py-24 px-6 bg-[#6b0504] text-[#fdf5e6] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           {/* Palace Pattern Placeholder */}
           <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="material-symbols-outlined text-[#b8860b] text-5xl mb-6">castle</span>
          <p className="text-2xl md:text-4xl leading-relaxed font-light italic">
            "We request the pleasure of your company at the celebration of our union as we begin our forever together in a story of love and royalty."
          </p>
        </div>
      </section>

      {/* --- GALLERY --- */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-16 tracking-[0.2em] uppercase">Palace Memories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {invite.images.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] rounded-none border-[12px] border-white shadow-2xl overflow-hidden group"
            >
              <Image src={img} alt="Wedding" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 border-[1px] border-[#b8860b]/30 m-2"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- VENUE --- */}
      <section className="py-24 bg-[#f9f3e3] border-y border-[#b8860b]/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-[#b8860b] text-sm uppercase tracking-[0.4em] mb-12 font-bold font-sans">The Grand Venue</h2>
          <div className="space-y-6">
            <h3 className="text-4xl md:text-6xl font-bold">{invite.venue}</h3>
            <p className="text-xl text-[#6b0504]/70">The Ballroom, Palace Grounds</p>
            <div className="flex items-center justify-center gap-4 py-8">
              <div className="h-[1px] bg-[#b8860b] w-20"></div>
              <span className="material-symbols-outlined text-[#b8860b]">event_seat</span>
              <div className="h-[1px] bg-[#b8860b] w-20"></div>
            </div>
            <p className="text-lg">Reception follows immediately at the Grand Courtyard</p>
          </div>
        </div>
      </section>

      {/* --- RSVP --- */}
      <section className="py-24 text-center bg-[#6b0504] text-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Will You Attend?</h2>
          <p className="text-white/60 mb-12 text-lg">Your presence would be the greatest gift of all. Please let us know by RSVPing via WhatsApp.</p>
          <a
            href={`https://wa.me/${invite.phone}`}
            className="inline-block px-12 py-5 bg-[#b8860b] text-[#6b0504] text-lg font-bold uppercase tracking-widest hover:bg-white transition-colors"
          >
            RSVP on WhatsApp
          </a>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 text-center bg-[#fdf5e6]">
         <div className="mb-4">
            <span className="text-[#b8860b] font-sans font-bold tracking-[0.3em] uppercase text-xs">Forever Yours</span>
         </div>
         <h2 className="text-4xl font-bold">{invite.couple}</h2>
      </footer>
    </div>
  );
}
