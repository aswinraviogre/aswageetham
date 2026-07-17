"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import type { InviteData } from "@/data/invites";

/* ── Animation Variants ─────────────────────────────── */

const easeSmooth: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: easeSmooth },
  }),
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, delay, ease: easeSmooth },
  }),
};

const lineExpand = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: easeSmooth },
  }),
};

const slideX = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: easeSmooth },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
    transition: { duration: 0.45, ease: easeSmooth },
  }),
};

/* ── Animated Section Wrapper ───────────────────────── */

function Reveal({
  children,
  className = "",
  delay = 0,
  variant = fadeUp,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variant?: any;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      variants={variant}
      custom={delay}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Floral SVG Ornament ────────────────────────────── */

function FloralOrnament({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 80"
      className={`mx-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center flower */}
      <circle cx="200" cy="40" r="6" fill="#c9b8a0" opacity="0.5" />
      <circle cx="200" cy="40" r="3" fill="#c9b8a0" opacity="0.8" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="200"
          cy="40"
          rx="3"
          ry="12"
          fill="#c9b8a0"
          opacity="0.3"
          transform={`rotate(${angle} 200 40)`}
        />
      ))}
      {/* Left vine */}
      <path
        d="M190 40 Q170 35, 150 42 Q130 50, 110 38 Q90 26, 60 40"
        stroke="#c9b8a0"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      <circle cx="150" cy="42" r="3" fill="#c9b8a0" opacity="0.25" />
      <circle cx="110" cy="38" r="2.5" fill="#c9b8a0" opacity="0.2" />
      <circle cx="80" cy="36" r="2" fill="#c9b8a0" opacity="0.15" />
      {/* Left leaves */}
      <ellipse cx="130" cy="44" rx="8" ry="3" fill="#c9b8a0" opacity="0.15" transform="rotate(-20 130 44)" />
      <ellipse cx="90" cy="32" rx="7" ry="2.5" fill="#c9b8a0" opacity="0.12" transform="rotate(15 90 32)" />
      {/* Right vine (mirrored) */}
      <path
        d="M210 40 Q230 35, 250 42 Q270 50, 290 38 Q310 26, 340 40"
        stroke="#c9b8a0"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      <circle cx="250" cy="42" r="3" fill="#c9b8a0" opacity="0.25" />
      <circle cx="290" cy="38" r="2.5" fill="#c9b8a0" opacity="0.2" />
      <circle cx="320" cy="36" r="2" fill="#c9b8a0" opacity="0.15" />
      {/* Right leaves */}
      <ellipse cx="270" cy="44" rx="8" ry="3" fill="#c9b8a0" opacity="0.15" transform="rotate(20 270 44)" />
      <ellipse cx="310" cy="32" rx="7" ry="2.5" fill="#c9b8a0" opacity="0.12" transform="rotate(-15 310 32)" />
    </svg>
  );
}

/* ── Thin Divider ───────────────────────────────────── */

function Divider({ delay = 0 }: { delay?: number }) {
  return (
    <Reveal delay={delay} variant={lineExpand} className="flex justify-center py-6">
      <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#c9b8a0] to-transparent origin-center" />
    </Reveal>
  );
}

/* ── Cross Symbol ───────────────────────────────────── */

function CrossSymbol({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="0" width="4" height="40" rx="1" fill="#c9b8a0" opacity="0.35" />
      <rect x="2" y="10" width="20" height="4" rx="1" fill="#c9b8a0" opacity="0.35" />
    </svg>
  );
}

/* ── Photo Gallery Carousel ─────────────────────────── */

const GALLERY_IMAGES = [
  { src: "/sia_img/1.png", alt: "Siya & Jithin – 1" },
  { src: "/sia_img/2.png", alt: "Siya & Jithin – 2" },
  { src: "/sia_img/3.png", alt: "Siya & Jithin – 3" },
  { src: "/sia_img/4.png", alt: "Siya & Jithin – 4" },
];

function PhotoGallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = GALLERY_IMAGES.length;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrent((prev) => (prev + newDirection + total) % total);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) paginate(1);
    else if (info.offset.x > 50) paginate(-1);
  };

  return (
    <section className="py-14 text-center">
      <FloralOrnament className="w-56 md:w-72 mb-6 opacity-50 mx-auto" />
      <p
        className="text-[#a09580] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-10"
        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
      >
        Our Moments
      </p>

      <div className="relative mx-auto w-full max-w-xs">
        <div
          className="relative w-full overflow-hidden rounded-[2px]"
          style={{
            aspectRatio: "4 / 5",
            border: "1px solid #d6c8b4",
            boxShadow: "0 8px 40px rgba(90,79,64,0.12), 0 2px 8px rgba(90,79,64,0.08)",
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={current}
              custom={direction}
              variants={slideX}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              style={{ touchAction: "pan-y" }}
            >
              <Image
                src={GALLERY_IMAGES[current].src}
                alt={GALLERY_IMAGES[current].alt}
                fill
                className="object-cover select-none pointer-events-none"
                draggable={false}
                sizes="(max-width: 768px) 80vw, 320px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop arrows */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Previous"
          className="hidden md:flex absolute left-[-44px] top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-[#d6c8b4] bg-[#faf8f4]/80 text-[#8a7d6b] hover:text-[#5a4f40] transition-all shadow-sm"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M12 5L7 10L12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => paginate(1)}
          aria-label="Next"
          className="hidden md:flex absolute right-[-44px] top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full border border-[#d6c8b4] bg-[#faf8f4]/80 text-[#8a7d6b] hover:text-[#5a4f40] transition-all shadow-sm"
        >
          <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
            <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2.5 mt-7">
        {GALLERY_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            aria-label={`Photo ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? "20px" : "6px",
              height: "6px",
              background: i === current ? "#B23A48" : "#c9b8a0",
              opacity: i === current ? 1 : 0.55,
            }}
          />
        ))}
      </div>

      <Divider delay={0} />
    </section>
  );
}

/* ── Scratch Overlay & Music ────────────────────────── */

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

    audio.play().then(() => setIsPlaying(true)).catch(() => {
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
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/christian_bg.mp3" loop autoPlay preload="auto" />
      <button
        onClick={togglePlay}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-white/70 border border-[#e0d5c5] rounded-full flex items-center justify-center shadow-md text-[#5a4f40] hover:scale-105 transition-transform backdrop-blur-sm"
      >
        <span className="material-symbols-outlined">{isPlaying ? "volume_up" : "volume_off"}</span>
      </button>
    </>
  );
}

function ScratchCardOverlay({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    
    const img = new window.Image();
    img.src = '/sia_img/2.png';
    img.onload = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    let isDrawing = false;
    let audioPlaying = false;

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      if (isDone) return;
      isDrawing = true;
      if (audioRef.current && !audioPlaying) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(()=>{});
        audioPlaying = true;
      }
      scratch(e);
    };

    const stopDrawing = () => {
      isDrawing = false;
      if (audioRef.current && audioPlaying) {
        audioRef.current.pause();
        audioPlaying = false;
      }
      checkProgress();
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isDone) return;
      if (e.cancelable) e.preventDefault();
      
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2);
      ctx.fill();
    };

    const checkProgress = () => {
      if (isDone) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;
      
      for (let i = 3; i < pixels.length; i += 400) {
        if (pixels[i] < 128) transparentPixels++;
      }
      
      const totalSampled = Math.floor(pixels.length / 400);
      const percent = (transparentPixels / totalSampled) * 100;
      
      if (percent > 40 && !isDone) {
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);
    
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isDone, onComplete]);

  if (isDone && !canvasRef.current) return null;

  return (
    <motion.div 
      initial={{ opacity: 1, filter: "blur(0px)" }}
      animate={{ 
        opacity: isDone ? 0 : 1,
        filter: isDone ? "blur(12px)" : "blur(0px)",
        scale: isDone ? 1.05 : 1
      }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#EAD3A7] ${isDone ? 'pointer-events-none' : ''}`}
    >
      <audio ref={audioRef} src="/music/scratch.mp3" loop preload="auto" />
      
      <div className="mb-8 animate-pulse text-center">
        <p className="text-[#2B1E1E] text-lg md:text-xl tracking-[0.3em] font-sans drop-shadow-sm font-semibold">SCRATCH TO REVEAL</p>
      </div>

      <div className="p-[8px] md:p-[12px] bg-gradient-to-br from-[#EAD3A7] via-[#E78CA0] to-[#B23A48] rounded-xl shadow-2xl">
        <div 
          ref={containerRef}
          className="relative w-[80vw] max-w-[340px] aspect-[4/5] overflow-hidden rounded-md bg-[#F5E6C8]"
        >
          <Image 
            src="/sia_img/4.png" 
            alt="Underneath" 
            fill 
            className="object-cover object-[center_30%] z-0" 
            priority
          />
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-10 w-full h-full cursor-pointer touch-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════ */

export function ElegantChristianTheme({ invite }: { invite: InviteData }) {
  const [isScratched, setIsScratched] = useState(false);

  /* Smooth Scroll */
  useEffect(() => {
    if (!isScratched) return;

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    const lenis = new Lenis({
      duration: 2,
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
  }, [isScratched]);

  return (
    <>
      {!isScratched && <ScratchCardOverlay onComplete={() => setIsScratched(true)} />}
      {isScratched && <BackgroundMusic />}

      <div
        className={`w-full overflow-hidden ${!isScratched ? 'h-screen overflow-hidden' : 'min-h-screen'}`}
        style={{
          background: "linear-gradient(180deg, #faf8f4 0%, #f5f0e8 40%, #faf8f4 100%)",
        fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Josefin+Sans:wght@300;400&display=swap');
      `}</style>

      {/* ──────────────── PREMIUM HEADER SECTION ──────────────── */}
      <section className="relative w-full h-[85vh] md:h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-[#EAD3A7]">
        {/* Watercolor Image with subtle zoom */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 12, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0 origin-center"
        >
          {/* Mobile Image */}
          <Image
            src="/sia_img/1.png"
            alt="Siya & Jithin"
            fill
            className="md:hidden object-cover object-[center_30%] opacity-90"
            priority
          />
          {/* Desktop Image */}
          <Image
            src="/sia_img/desktop-sia.png"
            alt="Siya & Jithin"
            fill
            className="hidden md:block object-cover object-center opacity-90"
            priority
          />
        </motion.div>

        {/* Soft fog overlay for text readability and transition */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(255,255,255,0.2)] via-transparent to-[rgba(255,255,255,0.6)]" />
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#faf8f4] to-transparent z-0" />

        {/* Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full h-full pt-16">
          
        </div>
      </section>

      {/* ──────────────── NAMES SECTION ──────────────── */}
      <section className="py-20 text-center">
        <Reveal delay={0.2} variant={fadeUp}>
          <h2 className="text-[#2B1E1E] text-5xl md:text-7xl font-semibold leading-tight tracking-wide">
            Siya Rose
          </h2>
          <div className="my-4">
            <span className="text-[#B23A48] text-3xl md:text-5xl font-light italic">&amp;</span>
          </div>
          <h2 className="text-[#2B1E1E] text-5xl md:text-7xl font-semibold leading-tight tracking-wide">
            Jithin Mathew Roy
          </h2>
        </Reveal>
      </section>

      {/* ──────────────── CARD CONTAINER ──────────────── */}
      <div className="max-w-2xl mx-auto px-6 md:px-12">

        {/* ═══ SECTION 1: BIBLE VERSE ═══ */}
        <section className="pt-32 pb-8 text-center">
          <Reveal delay={0.2}>
            <CrossSymbol className="w-5 h-8 mx-auto mb-8 opacity-60" />
          </Reveal>

          <Reveal delay={0.4}>
            <p
              className="text-[#6b6050] text-lg md:text-xl italic leading-relaxed font-light"
            >
              &ldquo;We love because He first loved us&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.6}>
            <p
              className="mt-4 text-[#a09580] text-xs tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              1 John 4:19
            </p>
          </Reveal>

          <Divider delay={0.7} />
        </section>

        {/* ═══ SECTION 2: PARENTS ═══ */}
        <section className="py-10 text-center">
          <Reveal delay={0.1}>
            <p
              className="text-[#a09580] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-10"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Together with their families
            </p>
          </Reveal>

          {/* Bride's parents */}
          <Reveal delay={0.2}>
            <div className="mb-10">
              <p className="text-[#5a4f40] text-base md:text-lg font-medium tracking-wide">
                Mr. Shaji AP &amp; Mrs. Shiny Shaji
              </p>
              <p className="text-[#a09580] text-sm mt-1.5 font-light">
                Alukkaran House, Old Vythiri, Vythiri
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="text-[#c9b8a0] text-sm italic mb-10">&amp;</p>
          </Reveal>

          {/* Groom's parents */}
          <Reveal delay={0.4}>
            <div className="mb-6">
              <p className="text-[#5a4f40] text-base md:text-lg font-medium tracking-wide">
                Mr. Roy Mathew &amp; Mrs. Jeena Roy
              </p>
              <p className="text-[#a09580] text-sm mt-1.5 font-light">
                Mullenkuzhi (H), Amboori, Trivandrum
              </p>
            </div>
          </Reveal>

          <Divider delay={0.5} />
        </section>

        {/* ═══ SECTION 3: INVITATION TEXT ═══ */}
        <section className="py-6 text-center">
          <Reveal delay={0.1}>
            <p className="text-[#7a6f5f] text-base md:text-lg leading-relaxed font-light">
              We&apos;re inviting you for our big day
            </p>
          </Reveal>
        </section>


        {/* ═══ SECTION 5: EVENT DETAILS ═══ */}
        <section className="py-10 text-center">
          <Reveal delay={0.1}>
            <p
              className="text-[#a09580] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-12"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              Ceremony
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p
              className="text-[#5a4f40] text-2xl md:text-4xl font-medium mb-2"
            >
              Thursday
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex items-center justify-center gap-4 md:gap-8 my-6">
              <div className="text-center">
                <p className="text-[#3d3428] text-5xl md:text-7xl font-bold leading-none">14</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="h-[1px] w-12 bg-[#c9b8a0]" />
                <p
                  className="text-[#a09580] text-[10px] tracking-[0.3em] uppercase"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  May
                </p>
                <div className="h-[1px] w-12 bg-[#c9b8a0]" />
              </div>
              <div className="text-center">
                <p
                  className="text-[#a09580] text-sm tracking-wider"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  at
                </p>
                <p className="text-[#3d3428] text-2xl md:text-3xl font-medium">11:30</p>
                <p
                  className="text-[#a09580] text-xs tracking-wider uppercase"
                  style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                  AM
                </p>
              </div>
            </div>
          </Reveal>

          <Divider delay={0.4} />

          <Reveal delay={0.5}>
            <div className="mt-8">
              <span className="material-symbols-outlined text-[#c9b8a0] text-3xl mb-4 block">church</span>
              <p className="text-[#5a4f40] text-xl md:text-2xl font-medium">
                St George Church
              </p>
              <p className="text-[#a09580] text-sm mt-1.5 font-light">
                Charity
              </p>
            </div>
          </Reveal>
        </section>

        {/* ═══ GALLERY ═══ */}
        <PhotoGallery />

        {/* ═══ SECTION 6: RECEPTION ═══ */}
        <section className="py-16 text-center">
          <Reveal delay={0.1}>
            <div className="border border-[#e0d5c5]/60 rounded-sm px-8 py-12 md:px-16 md:py-16 relative">
              {/* Corner ornaments */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#c9b8a0]/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9b8a0]/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9b8a0]/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#c9b8a0]/40" />

              <p
                className="text-[#a09580] text-[10px] md:text-xs tracking-[0.4em] uppercase mb-8"
                style={{ fontFamily: "'Josefin Sans', sans-serif" }}
              >
                Reception
              </p>
              <p className="text-[#5a4f40] text-xl md:text-2xl font-medium">
                St. Jude Parish Hall
              </p>
              <p className="text-[#a09580] text-sm mt-2 font-light">
                Chundale
              </p>
              <div className="mt-6">
                <div className="h-[1px] w-16 bg-[#c9b8a0]/40 mx-auto" />
              </div>
              <p className="text-[#7a6f5f] text-sm mt-6 font-light italic">
                Reception follows the ceremony
              </p>
            </div>
          </Reveal>
        </section>

        {/* ═══ SECTION 7: RSVP ═══ */}
        <section className="py-10 text-center">
          <Reveal delay={0.1}>
            <p className="text-[#7a6f5f] text-base font-light mb-8">
              Kindly confirm your presence
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={`https://wa.me/${invite.phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#5a4f40] text-[#faf8f4] text-xs tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#3d3428] hover:shadow-lg hover:scale-[1.02]"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              RSVP on WhatsApp
            </a>
          </Reveal>
        </section>

        {/* ═══ SECTION 8: FOOTER ═══ */}
        <section className="py-20 pb-32 text-center">
          <Reveal delay={0.1}>
            <FloralOrnament className="w-64 md:w-80 mb-10 opacity-60" />
          </Reveal>

          <Reveal delay={0.3}>
            <p
              className="text-[#a09580] text-xs tracking-[0.4em] uppercase mb-4"
              style={{ fontFamily: "'Josefin Sans', sans-serif" }}
            >
              With Love
            </p>
          </Reveal>

          <Reveal delay={0.5}>
            <p className="text-[#5a4f40] text-2xl md:text-3xl font-medium tracking-wide">
              Siya Rose &amp; Jithin Mathew Roy
            </p>
          </Reveal>

          <Reveal delay={0.6}>
            <CrossSymbol className="w-4 h-6 mx-auto mt-10 opacity-40" />
          </Reveal>
        </section>
      </div>
    </div>
    </>
  );
}
