"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Lenis from '@studio-freight/lenis';
import type { InviteData } from "@/data/invites";

const easeCustom: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: easeCustom } 
  }
};

export function ChristianTheme({ invite }: { invite: InviteData }) {
  // Global Smooth Scroll (Lenis)
  useEffect(() => {
    // Disable right click globally
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const lenis = new Lenis({
      duration: 1.5, // Soft, calm easing
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      lenis.destroy();
    };
  }, []);

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "15%"]);

  return (
    <div className="min-h-screen w-full bg-[#f8fafc] text-[#0f172a] font-serif overflow-hidden">
      <Link href="/" className="fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-md text-[#64748b] px-4 py-2 rounded-full flex items-center gap-2 hover:text-[#0f172a] hover:bg-white transition-all shadow-sm border border-slate-200 text-sm font-sans font-medium">
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Exit Design
      </Link>
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <style>{`
          @keyframes verySlowZoom {
            0% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}</style>
        
        {/* Subtle Parallax & Zoom Background */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute inset-[-10%] w-[120%] h-[120%] bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc]"
            style={{ y: backgroundY, animation: "verySlowZoom 20s ease-out forwards" }}
          >
             {/* Optional Hero Image goes here. A soft gradient gives a heavenly vibe. */}
          </motion.div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: easeCustom }}
            className="text-[#64748b] tracking-[0.4em] uppercase text-xs md:text-sm mb-8 font-medium"
          >
            With the Grace of God
          </motion.p>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: easeCustom }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-[#0f172a] mb-8 tracking-wider"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            {invite.couple.split('&')[0].trim()} 
            <span className="text-[#7dd3fc] font-serif italic mx-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">and</span> 
            {invite.couple.split('&')[1]?.trim() || invite.couple.split('♥')[1]?.trim() || "Maria"}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
            className="h-[1px] w-24 bg-[#94a3b8] mb-8"
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: easeCustom }}
            className="text-xl md:text-2xl text-[#475569] font-medium tracking-[0.2em]"
          >
            {invite.date}
          </motion.p>
        </div>
      </section>

      {/* --- BIBLE VERSE SECTION --- */}
      <VerseSection />

      {/* --- OUR STORY --- */}
      <StorySection />

      {/* --- EVENT SECTION --- */}
      <EventSection invite={invite} />

      {/* --- GALLERY SECTION --- */}
      <GallerySection />

      {/* --- RSVP SECTION --- */}
      <RSVPSection phone={invite.phone} />
      
      <footer className="py-12 text-center bg-[#f1f5f9]">
        <p className="text-[#64748b] text-sm tracking-widest uppercase">
          Forever & Always
        </p>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------
// Sub-components for scroll animations
// ---------------------------------------------------------

function VerseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-white flex flex-col items-center justify-center text-center relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={isInView ? { opacity: 1, width: "80px" } : {}}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="h-[1px] bg-[#7dd3fc] mb-10"
      />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-3xl"
      >
        <p className="text-2xl md:text-4xl text-[#334155] leading-relaxed italic font-light">
          "We love because he first loved us."
        </p>
        <p className="mt-6 text-[#94a3b8] tracking-widest text-sm uppercase font-semibold">
          1 John 4:19
        </p>
      </motion.div>
    </section>
  );
}

function StorySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const textLines = [
    "Two lives, two hearts,",
    "joined together in friendship,",
    "united forever in love."
  ];

  return (
    <section ref={ref} className="py-24 px-6 bg-[#f8fafc] text-center">
      <motion.h2 
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-12 tracking-wide"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Our Story
      </motion.h2>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {textLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.3, duration: 1, ease: easeCustom }}
            className="text-lg md:text-2xl text-[#475569] font-light"
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function EventSection({ invite }: { invite: InviteData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-white relative">
      <motion.h2 
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center text-3xl md:text-5xl font-bold text-[#0f172a] mb-16 tracking-wide"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        The Celebration
      </motion.h2>

      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
        {/* Ceremony Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: easeCustom }}
          className="flex-1 bg-[#f8fafc] p-10 rounded-2xl shadow-sm hover:shadow-[0_20px_40px_rgba(125,211,252,0.15)] hover:-translate-y-2 transition-all duration-500 border border-[#e2e8f0] text-center group"
        >
          <div className="w-16 h-16 mx-auto bg-[#e0f2fe] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#bae6fd] transition-colors duration-500">
            <span className="material-symbols-outlined text-[#0ea5e9] text-3xl">church</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Holy Matrimony</h3>
          <p className="text-[#64748b] tracking-widest text-xs uppercase mb-6">10:30 AM</p>
          <p className="text-lg text-[#334155] font-medium">{invite.venue}</p>
          <p className="text-[#64748b] mt-2">City, Country</p>
        </motion.div>

        {/* Reception Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: easeCustom }}
          className="flex-1 bg-[#f8fafc] p-10 rounded-2xl shadow-sm hover:shadow-[0_20px_40px_rgba(125,211,252,0.15)] hover:-translate-y-2 transition-all duration-500 border border-[#e2e8f0] text-center group"
        >
          <div className="w-16 h-16 mx-auto bg-[#e0f2fe] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#bae6fd] transition-colors duration-500">
            <span className="material-symbols-outlined text-[#0ea5e9] text-3xl">restaurant</span>
          </div>
          <h3 className="text-2xl font-bold text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-plus-jakarta)" }}>Reception</h3>
          <p className="text-[#64748b] tracking-widest text-xs uppercase mb-6">12:30 PM</p>
          <p className="text-lg text-[#334155] font-medium">Grand Banquet Hall</p>
          <p className="text-[#64748b] mt-2">City, Country</p>
        </motion.div>
      </div>
    </section>
  );
}

function GallerySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Dummy beautiful soft images for a Christian theme
  const images = [
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop", // Rings
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop", // Church details
    "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop", // Flowers
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-[#f8fafc]">
      <motion.h2 
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center text-3xl md:text-5xl font-bold text-[#0f172a] mb-16 tracking-wide"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Memories
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15, ease: easeCustom }}
            className="relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm group"
          >
            <div className="absolute inset-0 bg-[#0f172a]/10 z-10 transition-opacity duration-500 group-hover:opacity-0" />
            <img 
              src={img} 
              alt="Wedding Moment" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function RSVPSection({ phone }: { phone: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-white text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-light text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
          Be Our Guest
        </h2>
        <p className="text-[#64748b] text-lg mb-12 font-light">
          We kindly request your presence to celebrate our holy union.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3 }}
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#0f172a] text-white px-10 py-5 rounded-full tracking-widest uppercase text-sm font-semibold hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] transition-shadow duration-300"
        >
          <span className="material-symbols-outlined">favorite</span>
          RSVP Now
        </motion.a>
      </motion.div>
    </section>
  );
}
