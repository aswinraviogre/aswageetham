"use client";

import { useEffect, useState, useRef } from "react";
import type { InviteData } from "@/data/invites";

interface Wish {
  name: string;
  message: string;
  date: string;
}

export function VishnuAthulyaTheme({ invite }: { invite: InviteData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComplete, setIsOpenComplete] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [guestName, setGuestName] = useState("");
  const [guestWishes, setGuestWishes] = useState("");
  const [attendance, setAttendance] = useState("Yes");
  const [ambientPetals, setAmbientPetals] = useState<any[]>([]);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDrawingRef = useRef(false);
  const eventCarouselRef = useRef<HTMLDivElement | null>(null);

  // SVGs for background leaves
  const backgroundLeafSVGs = [
    `<svg width="14" height="14" viewBox="0 0 100 100" fill="#FF8C00"><circle cx="50" cy="50" r="40"/><circle cx="20" cy="50" r="10" fill="#FFD700"/><circle cx="80" cy="50" r="10" fill="#FFD700"/><circle cx="50" cy="20" r="10" fill="#FFD700"/><circle cx="50" cy="80" r="10" fill="#FFD700"/></svg>`,
    `<svg width="16" height="24" viewBox="0 0 50 100" fill="#D4AF37"><path d="M 25 0 Q 50 40 25 100 Q 0 40 25 0" /></svg>`,
    `<svg width="15" height="22" viewBox="0 0 50 100" fill="#8F9E8B"><path d="M 25 0 Q 40 30 25 100 Q 10 30 25 0" /></svg>`
  ];

  // 1. Initial State & Petals
  useEffect(() => {
    // Generate 12 ambient floating petals
    const petals = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 7 + Math.random() * 8,
      svg: backgroundLeafSVGs[Math.floor(Math.random() * backgroundLeafSVGs.length)]
    }));
    setAmbientPetals(petals);

    // Initialize wishes
    const mockWishes = [
      { name: "Suresh & Mini", message: "Congratulations Vishnu & Athulya! Wishing you both a lifetime of happiness, love, and prosperity.", date: "Today" },
      { name: "Anjali Krishna", message: "So happy for you both! Can't wait to witness this beautiful union on August 20. God bless!", date: "Yesterday" }
    ];
    let localWishes = localStorage.getItem("wedding_wishes_vishnu_athulya");
    if (!localWishes) {
      localStorage.setItem("wedding_wishes_vishnu_athulya", JSON.stringify(mockWishes));
      setWishes(mockWishes);
    } else {
      setWishes(JSON.parse(localWishes));
    }
  }, []);

  // 2. Body Scroll Locking
  useEffect(() => {
    if (!isOpenComplete) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.classList.add("overflow-x-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden", "overflow-x-hidden");
    };
  }, [isOpenComplete]);

  // 3. Audio Handlers
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch(err => {
        console.log("Audio block resolved on tap action:", err);
      });
    }

    setTimeout(() => {
      setIsOpenComplete(true);
      triggerFlowerShower();
    }, 1200);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      });
    }
  };

  // 4. Countdown Timer
  useEffect(() => {
    const targetTime = new Date("August 20, 2026 12:15:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (diff < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

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

  // 5. Canvas Scratch Card Initializer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = document.getElementById("scratch-container");
    if (!container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Draw Gold foil
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#B89B2B");
    grad.addColorStop(0.3, "#faebb7");
    grad.addColorStop(0.5, "#D4AF37");
    grad.addColorStop(0.7, "#faebb7");
    grad.addColorStop(1, "#9A8220");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "rgba(128, 0, 32, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(12, 12, canvas.width - 24, canvas.height - 24);

    ctx.fillStyle = "#800020";
    ctx.font = "bold 12px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ SCRATCH HERE ✨", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "italic 10px Montserrat, sans-serif";
    ctx.fillText("To Reveal the Wedding Details", canvas.width / 2, canvas.height / 2 + 12);
  }, [isOpenComplete]);

  // 6. Scratch Events handlers
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isScratched) return;
    isDrawingRef.current = true;
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current || isScratched) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coords = getCanvasCoords(e);
    if (!coords) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 20, 0, Math.PI * 2);
    ctx.fill();
  };

  const stopDrawing = () => {
    if (!isDrawingRef.current || isScratched) return;
    isDrawingRef.current = false;
    checkScratchPercentage();
  };

  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    let transparentPixels = 0;

    for (let i = 3; i < data.length; i += 16) {
      if (data[i] === 0) transparentPixels++;
    }

    const totalChecked = data.length / 16;
    const percent = (transparentPixels / totalChecked) * 100;

    if (percent > 45) {
      setIsScratched(true);
      setTimeout(() => {
        triggerFlowerPop();
      }, 300);
    }
  };

  // 7. Ambient Particle Animation Helpers
  const triggerFlowerPop = () => {
    const container = document.getElementById("scratch-container");
    const mainCont = containerRef.current;
    if (!container || !mainCont) return;

    const rect = container.getBoundingClientRect();
    const mainRect = mainCont.getBoundingClientRect();

    const centerX = rect.left - mainRect.left + rect.width / 2;
    const centerY = rect.top - mainRect.top + rect.height / 2;

    const colors = ["#FF8C00", "#FFD700", "#D4AF37", "#8F9E8B", "#FFB6C1", "#800020"];
    const svgs = [
      `<svg width="14" height="14" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="COLOR"/><circle cx="50" cy="20" r="10" fill="#FFD700"/></svg>`,
      `<svg width="12" height="18" viewBox="0 0 50 100"><path d="M 25 0 Q 50 40 25 100 Q 0 40 25 0" fill="COLOR" /></svg>`
    ];

    for (let i = 0; i < 40; i++) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.left = centerX + "px";
      el.style.top = centerY + "px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "30";

      const color = colors[Math.floor(Math.random() * colors.length)];
      const template = svgs[Math.floor(Math.random() * svgs.length)];
      el.innerHTML = template.replace("COLOR", color);
      mainCont.appendChild(el);

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      let vx = Math.cos(angle) * speed;
      let vy = Math.sin(angle) * speed - 2.5;
      let x = centerX;
      let y = centerY;
      let rot = Math.random() * 360;
      const rotSpeed = -15 + Math.random() * 30;
      const gravity = 0.15;

      const step = () => {
        vx *= 0.97;
        vy += gravity;
        x += vx;
        y += vy;
        rot += rotSpeed;

        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.transform = `rotate(${rot}deg)`;

        if (y < mainRect.height + 50) {
          requestAnimationFrame(step);
        } else {
          el.remove();
        }
      };
      requestAnimationFrame(step);
    }
  };

  const triggerFlowerShower = () => {
    const mainCont = containerRef.current;
    if (!mainCont) return;

    const mainRect = mainCont.getBoundingClientRect();
    const colors = ["#FF8C00", "#FFD700", "#D4AF37", "#8F9E8B"];

    for (let i = 0; i < 30; i++) {
      const el = document.createElement("div");
      el.style.position = "absolute";
      el.style.top = "-20px";
      el.style.left = Math.random() * mainRect.width + "px";
      el.style.pointerEvents = "none";
      el.style.zIndex = "30";

      const color = colors[Math.floor(Math.random() * colors.length)];
      el.innerHTML = `<svg width="12" height="12" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="${color}"/></svg>`;
      mainCont.appendChild(el);

      let x = parseFloat(el.style.left);
      let y = -20;
      let vy = 1 + Math.random() * 3;
      let vx = -1 + Math.random() * 2;
      let rot = Math.random() * 360;
      const rotSpeed = -5 + Math.random() * 10;

      const stepShower = () => {
        y += vy;
        x += vx;
        rot += rotSpeed;

        el.style.top = y + "px";
        el.style.left = x + "px";
        el.style.transform = `rotate(${rot}deg)`;

        if (y < mainRect.height + 50) {
          requestAnimationFrame(stepShower);
        } else {
          el.remove();
        }
      };
      requestAnimationFrame(stepShower);
    }
  };
  // 6. WhatsApp Share Button handler
  const handleWhatsappShare = (e: React.MouseEvent) => {
    e.preventDefault();
    const shareMessage = `👋 Hello!

❤️ You're warmly invited to celebrate our special day.

Tap the link below to view our digital invitation.

⬇️
${window.location.href}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`;
    window.open(whatsappUrl, "_blank");
  };

  // 8. Event Carousel Scrolling Indicator
  const handleCarouselScroll = () => {
    const el = eventCarouselRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / el.clientWidth);
    setActiveCarouselIndex(index);
  };

  const handleDotClick = (index: number) => {
    const el = eventCarouselRef.current;
    if (!el) return;
    const firstChild = el.children[0] as HTMLElement;
    if (!firstChild) return;
    const cardWidth = firstChild.offsetWidth + 16;
    el.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  };

  // 9. RSVP Submit Wishes Register
  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestWishes.trim()) return;

    const newWish = {
      name: guestName.trim(),
      message: guestWishes.trim(),
      date: "Just now",
    };

    const updatedWishes = [...wishes, newWish];
    localStorage.setItem("wedding_wishes_vishnu_athulya", JSON.stringify(updatedWishes));
    setWishes(updatedWishes);

    let attendanceText = "Joyfully Accept";
    if (attendance === "Maybe") attendanceText = "Regretfully Decline";
    else if (attendance === "No") attendanceText = "Not Sure Yet";

    const whatsappMessage = `*Wedding RSVP*\n\n*Name:* ${guestName}\n*Attendance:* ${attendanceText}\n*Wishes & Blessings:* ${guestWishes}`;
    const whatsappUrl = `https://wa.me/918281361003?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, "_blank");

    setGuestName("");
    setGuestWishes("");
  };

  // 10. Scroll Reveal Observer Hook
  useEffect(() => {
    if (!isOpenComplete) return;

    const revealElements = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isOpenComplete]);

  return (
    <div className="vishnu-athulya-theme min-h-screen bg-[#120305] text-[#333333] font-sans antialiased flex justify-center items-center overflow-hidden w-full relative">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Styles block representing CSS overrides */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Cinzel+Decorative:wght@400;700&display=swap');

        .vishnu-athulya-theme {
          --color-maroon-50: #fdf2f2;
          --color-maroon-100: #fde8e8;
          --color-maroon-800: #800020;
          --color-maroon-900: #5c0016;
          --color-gold-100: #fcf8e3;
          --color-gold-200: #faebb7;
          --color-gold-300: #f5d77f;
          --color-gold-400: #f0c24d;
          --color-gold-500: #D4AF37;
          --color-gold-600: #B89B2B;
          --color-gold-700: #9A8220;
          --color-sage-100: #f0f4f0;
          --color-sage-200: #e1eae1;
          --color-sage-400: #8F9E8B;
          --color-sage-500: #758771;
          --color-ivory-50: #FDFBF7;
          --color-ivory-100: #f7f3e9;
          --color-ivory-200: #ece3d0;
          
          --font-serif: 'Playfair Display', serif;
          --font-cursive: 'Great Vibes', cursive;
          --font-sans: 'Montserrat', sans-serif;
          --font-cinzel: 'Cinzel Decorative', serif;
        }

        .font-serif {
          font-family: var(--font-serif) !important;
        }
        .font-cursive {
          font-family: var(--font-cursive) !important;
        }
        .font-sans {
          font-family: var(--font-sans) !important;
        }
        .font-cinzel {
          font-family: var(--font-cinzel) !important;
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .watercolor-blob-1 {
          background: radial-gradient(circle, rgba(143, 158, 139, 0.15) 0%, rgba(253, 251, 247, 0) 70%);
          border-radius: 43% 57% 70% 30% / 45% 45% 55% 55%;
        }
        .watercolor-blob-2 {
          background: radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(253, 251, 247, 0) 70%);
          border-radius: 50% 50% 30% 70% / 50% 60% 40% 60%;
        }
        .watercolor-blob-3 {
          background: radial-gradient(circle, rgba(128, 0, 32, 0.08) 0%, rgba(253, 251, 247, 0) 70%);
          border-radius: 60% 40% 50% 50% / 40% 50% 50% 60%;
        }

        @keyframes driftDown {
          0% {
            transform: translateY(-50px) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% {
            transform: translateY(110vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 15;
        }
        .petal {
          position: absolute;
          display: block;
          pointer-events: none;
          animation: driftDown 10s linear infinite;
        }

        @keyframes floatSeal {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes pulseGold {
          0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.2), inset 0 0 10px rgba(212, 175, 55, 0.1); }
          50% { box-shadow: 0 0 35px rgba(212, 175, 55, 0.5), inset 0 0 15px rgba(212, 175, 55, 0.3); }
        }
        .monogram-seal {
          animation: floatSeal 5s ease-in-out infinite, pulseGold 4s ease-in-out infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes rotateVinyl {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .music-playing {
          animation: rotateVinyl 4s linear infinite;
        }

        .gold-shine {
          background: linear-gradient(to right, #9A8220 0%, #faebb7 25%, #D4AF37 50%, #faebb7 75%, #9A8220 100%);
          background-size: 200% auto;
          color: #000;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: goldShineText 4s linear infinite;
        }
        @keyframes goldShineText {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .mughal-arch {
          clip-path: polygon(50% 0%, 82% 15%, 90% 35%, 90% 100%, 10% 100%, 10% 35%, 18% 15%);
          border-radius: 50% 50% 0 0 / 25% 25% 0 0;
        }

        /* Music player and WhatsApp Share Buttons floating container */
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
          border: 1px solid var(--color-gold-500);
          color: #333333;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
          background: #ffffff;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .share-toggle-btn:hover i {
          transform: scale(1.15) rotate(8deg);
          color: var(--color-maroon-900);
        }
      `}</style>

      {/* Desktop Ambient background */}
      <div className="fixed inset-0 bg-cover bg-center filter blur-xl opacity-30 z-0 hidden md:block" style={{ backgroundImage: `url('/vishnu_athulya/couple_full.jpg')` }}></div>
      <div className="fixed inset-0 bg-gradient-to-br from-[#2b080c] via-[#120305] to-[#000000] z-0 hidden md:block"></div>

      {/* Background Music Player */}
      <audio id="bgMusic" ref={audioRef} loop preload="auto">
        <source src="/music/vidssavecom-mangalyam-official-audio-wedding-song-arun-pradeep-feat-sand_MaLJU9Oi.aac" type="audio/aac" />
      </audio>


      {/* Floating Audio Control Widget */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div id="audio-bars" className={`flex gap-1 items-end h-6 w-8 px-1 ${!isMusicPlaying ? "hidden" : ""}`}>
          <span className="w-1 bg-[#D4AF37] rounded-full animate-[pulse_1s_infinite_100ms] h-3"></span>
          <span className="w-1 bg-[#D4AF37] rounded-full animate-[pulse_1s_infinite_300ms] h-5"></span>
          <span className="w-1 bg-[#D4AF37] rounded-full animate-[pulse_1s_infinite_200ms] h-2"></span>
          <span className="w-1 bg-[#D4AF37] rounded-full animate-[pulse_1s_infinite_400ms] h-4"></span>
        </div>
        <button
          onClick={toggleMusic}
          id="musicToggle"
          className={`w-12 h-12 rounded-full bg-[#800020] border-2 border-[#D4AF37] flex items-center justify-center shadow-lg text-[#D4AF37] hover:bg-[#5c0016] transition-all duration-300 focus:outline-none ${isMusicPlaying ? "music-playing" : ""}`}
          aria-label="Toggle background music"
        >
          {!isMusicPlaying ? (
            <svg id="musicPlayIcon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          ) : (
            <svg id="musicPauseIcon" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>
      </div>

      {/* Main Mobile-First Wrapper Container */}
      <main
        ref={containerRef}
        id="main-container"
        className={`w-full md:max-w-[480px] min-h-screen bg-[#FDFBF7] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 flex flex-col border-x border-[#D4AF37]/20 scroll-smooth ${!isOpenComplete ? "overflow-hidden h-screen" : "overflow-y-auto overflow-x-hidden"
          }`}
      >

        {/* Spawning Container for Floating Petals */}
        <div id="petals-container" className="floating-container">
          {ambientPetals.map((petal) => (
            <div
              key={petal.id}
              className="petal"
              style={{
                left: `${petal.left}%`,
                animationDelay: `${petal.delay}s`,
                animationDuration: `${petal.duration}s`
              }}
              dangerouslySetInnerHTML={{ __html: petal.svg }}
            />
          ))}
        </div>

        {/* Watercolor Background Layers */}
        <div className="absolute top-10 left-[-20%] w-[80%] h-[400px] watercolor-blob-1 pointer-events-none z-0"></div>
        <div className="absolute top-[30%] right-[-30%] w-[90%] h-[500px] watercolor-blob-2 pointer-events-none z-0"></div>
        <div className="absolute bottom-[20%] left-[-25%] w-[80%] h-[450px] watercolor-blob-3 pointer-events-none z-0"></div>
        <div className="absolute bottom-0 right-[-10%] w-[70%] h-[300px] watercolor-blob-1 pointer-events-none z-0"></div>

        {/* ==========================================
             0. INVITATION COVER OVERLAY (Tap to Open)
             ========================================== */}
        <div
          id="cover-overlay"
          className={`fixed inset-0 md:left-1/2 md:-translate-x-1/2 md:max-w-[480px] z-50 flex flex-col justify-between items-center bg-[#1f0008] text-center overflow-hidden transition-all duration-1000 ${isOpenComplete ? "hidden" : ""
            }`}
        >
          {/* Top Half Slide Panel */}
          <div
            id="cover-panel-top"
            className={`absolute top-0 left-0 right-0 h-1/2 bg-[#2b080c] border-b-2 border-[#D4AF37]/40 z-30 transition-transform duration-[1200ms] ease-in-out flex flex-col justify-end pb-8 ${isOpen ? "-translate-y-full" : ""
              }`}
          >
            <div className="absolute top-4 left-4 text-[#D4AF37]/30">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0 H50 C30 0 0 30 0 50 Z" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 text-[#D4AF37]/30 rotate-90">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0 H50 C30 0 0 30 0 50 Z" />
              </svg>
            </div>
          </div>

          {/* Bottom Half Slide Panel */}
          <div
            id="cover-panel-bottom"
            className={`absolute bottom-0 left-0 right-0 h-1/2 bg-[#2b080c] border-t-2 border-[#D4AF37]/40 z-30 transition-transform duration-[1200ms] ease-in-out flex flex-col justify-start pt-8 ${isOpen ? "translate-y-full" : ""
              }`}
          >
            <div className="absolute bottom-4 left-4 text-[#D4AF37]/30 -rotate-90">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0 H50 C30 0 0 30 0 50 Z" />
              </svg>
            </div>
            <div className="absolute bottom-4 right-4 text-[#D4AF37]/30 rotate-180">
              <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                <path d="M0 0 H50 C30 0 0 30 0 50 Z" />
              </svg>
            </div>
          </div>

          {/* Centered Envelope Opening Card */}
          <div
            id="cover-content"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-11/12 max-w-[360px] bg-[#1f0008] border-2 border-[#D4AF37]/40 p-6 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-all duration-[800ms] ease-in-out flex flex-col items-center ${isOpen ? "opacity-0 scale-90 pointer-events-none" : ""
              }`}
          >
            <div className="w-20 h-20 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-lg bg-[#2b080c]">
              <span className="font-cursive text-2xl text-[#D4AF37] font-bold">V & A</span>
            </div>

            <h2 className="text-[#fdf2f2] font-serif text-[10px] tracking-[0.3em] uppercase mb-4 opacity-80">You are invited to the Wedding of</h2>
            <h1 className="font-cursive text-4xl font-bold text-[#D4AF37] mb-1 gold-shine">Vishnu</h1>
            <p className="font-serif italic text-xs text-[#f5d77f] opacity-60 my-1">&</p>
            <h1 className="font-cursive text-4xl font-bold text-[#D4AF37] mb-6 gold-shine">Athulya</h1>

            <p className="font-serif italic text-[11px] text-[#f7f3e9]/70 mb-8 max-w-[260px] leading-relaxed text-center">
              "Together with our parents, we invite you to be a part of our celebrations."
            </p>

            <button
              onClick={handleOpenInvitation}
              className="px-8 py-3 bg-gradient-to-r from-[#B89B2B] to-[#f0c24d] text-[#5c0016] font-serif font-bold text-xs tracking-widest rounded-full hover:scale-105 transition duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] animate-pulse"
            >
              OPEN INVITATION
            </button>
          </div>
        </div>

        {/* ==========================================
             1. HERO SECTION (Main Header screen)
             ========================================== */}
        <section className="min-h-screen flex flex-col justify-between items-center py-12 px-6 relative z-10 text-center select-none">
          <div className="w-full flex justify-between px-4 absolute top-4 left-0 right-0 pointer-events-none">
            <svg className="w-8 h-8 text-[#D4AF37] opacity-60 transform" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 L0,40 C0,20 20,0 40,0 Z M0,0 L30,0 L0,30 Z M0,0 L10,0 C10,5 5,10 0,10 Z" />
            </svg>
            <svg className="w-8 h-8 text-[#D4AF37] opacity-60 transform rotate-90" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 L0,40 C0,20 20,0 40,0 Z M0,0 L30,0 L0,30 Z M0,0 L10,0 C10,5 5,10 0,10 Z" />
            </svg>
          </div>

          <div></div>

          <div className="flex flex-col items-center mt-6">
            <div className="w-32 h-32 rounded-full bg-[#800020] monogram-seal flex items-center justify-center border-4 border-[#D4AF37] shadow-2xl relative">
              <div className="absolute inset-1 rounded-full border border-dashed border-[#f5d77f] opacity-50"></div>
              <svg className="w-24 h-24 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <text x="50%" y="58%" fontFamily="'Great Vibes', cursive" fontSize="34" fill="#D4AF37" textAnchor="middle" fontWeight="bold">V & A</text>
                <path d="M30 65 Q 50 72 70 65" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
                <path d="M35 32 Q 50 25 65 32" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.8" />
              </svg>
            </div>
          </div>

          <div className="my-6">
            <span className="text-[#800020] font-serif tracking-widest text-xs uppercase block mb-3 font-semibold">The Wedding Invitation of</span>
            <h1 className="text-[#800020] font-cursive text-5xl md:text-6xl drop-shadow-sm font-bold gold-shine">Vishnu</h1>
            <div className="flex items-center justify-center gap-4 my-2">
              <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
              <span className="text-[#D4AF37] text-2xl font-serif">💍</span>
              <span className="h-[1px] w-12 bg-[#D4AF37]"></span>
            </div>
            <h1 className="text-[#800020] font-cursive text-5xl md:text-6xl drop-shadow-sm font-bold gold-shine">Athulya</h1>
          </div>

          <div className="mb-12">
            <div className="inline-block py-2 px-6 border-y border-[#D4AF37]/50">
              <p className="font-serif text-lg tracking-[0.2em] text-[#800020] font-medium">AUGUST 20, 2026</p>
            </div>
            <p className="text-[#758771] font-serif text-xs tracking-widest mt-2 uppercase">Pulpally, Kerala</p>
          </div>

          <div
            onClick={() => {
              const el = document.getElementById("intro-photo");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center gap-1 cursor-pointer transition-transform hover:scale-105"
          >
            <span className="text-[#B89B2B] font-sans text-[10px] tracking-[0.3em] uppercase font-semibold animate-pulse">Scroll to Begin</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#D4AF37] animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6l-7 7-7-7" />
            </svg>
          </div>

          <div className="w-full flex justify-between px-4 absolute bottom-4 left-0 right-0 pointer-events-none">
            <svg className="w-8 h-8 text-[#D4AF37] opacity-60 transform -rotate-90" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 L0,40 C0,20 20,0 40,0 Z M0,0 L30,0 L0,30 Z M0,0 L10,0 C10,5 5,10 0,10 Z" />
            </svg>
            <svg className="w-8 h-8 text-[#D4AF37] opacity-60 transform rotate-180" viewBox="0 0 100 100" fill="currentColor">
              <path d="M0,0 L0,40 C0,20 20,0 40,0 Z M0,0 L30,0 L0,30 Z M0,0 L10,0 C10,5 5,10 0,10 Z" />
            </svg>
          </div>
        </section>

        {/* ==========================================
             2. INTRO PHOTO SECTION (Arch close-up & Gallery trigger)
             ========================================== */}
        <section id="intro-photo" className="py-12 px-6 relative z-10 flex flex-col items-center">
          <div
            className="reveal w-full max-w-[340px] aspect-[3/4] p-2 bg-white shadow-2xl rounded-t-full border border-[#D4AF37]/30 flex justify-center items-center cursor-zoom-in"
            onClick={() => setLightboxImage("/vishnu_athulya/couple_close.jpg")}
          >
            <div className="w-full h-full mughal-arch overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#5c0016]/40 via-transparent to-transparent z-10"></div>
              <img src="/vishnu_athulya/couple_close.jpg" alt="Vishnu & Athulya Close Up" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" />
            </div>
          </div>
          <p className="reveal text-center font-cursive text-3xl text-[#B89B2B] mt-6 font-semibold">Two Hearts, One Journey</p>

          <div className="reveal w-28 h-6 my-4 mx-auto text-[#D4AF37] opacity-80">
            <svg className="w-full h-full" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 10 Q 50 18 90 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="50" cy="10" r="4" fill="currentColor" />
              <path d="M35 10 Q 50 2 65 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </section>

        {/* ==========================================
             3. INVITATION & LIVE COUNTDOWN SECTION
             ========================================== */}
        <section className="py-12 px-6 relative z-10 flex flex-col items-center">
          <div className="reveal bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-[#D4AF37]/30 w-full relative">
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/50"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4AF37]/50"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4AF37]/50"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/50"></div>

            <div className="text-center">
              <h2 className="font-cinzel text-[#800020] text-lg tracking-widest font-semibold mb-6">💍 WEDDING INVITATION</h2>

              <p className="font-cursive text-4xl text-[#800020] font-bold mb-1">Vishnu Baiju</p>
              <p className="font-serif text-[10px] text-[#758771] uppercase tracking-widest mb-2 font-semibold">&</p>
              <p className="font-cursive text-4xl text-[#800020] font-bold mb-6">Athulya Ravi</p>

              <p className="font-sans text-xs leading-relaxed text-gray-600 mb-8 font-medium">
                Together with our families, we cordially invite you to celebrate our special day. As we unite our lives in sacred matrimony under the blessings of God, your presence and prayers will bring us immense joy.
              </p>

              <div className="h-[1px] w-2/3 bg-[#D4AF37]/30 mx-auto my-6"></div>

              <div className="mb-8">
                <p className="font-serif italic text-xs text-[#758771] mb-3">With the Blessings of Our Beloved Parents</p>
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-[#5c0016] font-serif">
                  <div>
                    <p className="text-[10px] uppercase text-[#B89B2B] tracking-wider mb-1">Groom's Parents</p>
                    <p>Mr. Baiju</p>
                    <p>& Mrs. Sunitha</p>
                  </div>
                  <div className="border-l border-[#D4AF37]/20">
                    <p className="text-[10px] uppercase text-[#B89B2B] tracking-wider mb-1">Bride's Parents</p>
                    <p>Mr. Ravi</p>
                    <p>& Mrs. Sheela</p>
                  </div>
                </div>
              </div>

              {/* Countdown Timer Widget */}
              <div className="mt-8 bg-[#fdf2f2] rounded-xl p-4 border border-[#fde8e8]">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#800020] font-semibold mb-3">Countdown to Muhurtham</p>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-[#800020] text-white rounded-lg p-2 flex flex-col justify-center items-center shadow-md">
                    <span className="font-serif text-xl font-bold text-[#f5d77f]">{timeLeft.days}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#f7f3e9]">Days</span>
                  </div>
                  <div className="bg-[#800020] text-white rounded-lg p-2 flex flex-col justify-center items-center shadow-md">
                    <span className="font-serif text-xl font-bold text-[#f5d77f]">{timeLeft.hours}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#f7f3e9]">Hours</span>
                  </div>
                  <div className="bg-[#800020] text-white rounded-lg p-2 flex flex-col justify-center items-center shadow-md">
                    <span className="font-serif text-xl font-bold text-[#f5d77f]">{timeLeft.minutes}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#f7f3e9]">Mins</span>
                  </div>
                  <div className="bg-[#800020] text-white rounded-lg p-2 flex flex-col justify-center items-center shadow-md">
                    <span className="font-serif text-xl font-bold text-[#f5d77f]">{timeLeft.seconds}</span>
                    <span className="text-[8px] uppercase tracking-wider text-[#f7f3e9]">Secs</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ==========================================
             3.5 INTERACTIVE SCRATCH TO REVEAL DATE
             ========================================== */}
        <section className="py-12 px-6 relative z-10 flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-[#800020] font-serif text-2xl font-semibold">📅 Reveal the Details</h2>
            <p className="text-xs text-[#758771] font-serif italic mt-1">Scratch the gold foil to reveal date & Muhurtham details</p>
          </div>

          {/* Scratch Box Container */}
          <div className="relative w-full max-w-[320px] aspect-[2/1] bg-white rounded-2xl shadow-xl border border-[#D4AF37]/20 flex flex-col items-center justify-center overflow-hidden" id="scratch-container">
            {/* Revealed Date Card Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-[#fdf2f2] select-none">
              <p className="font-serif text-[10px] text-[#758771] uppercase tracking-widest mb-1 font-bold">Aug 20, 2026</p>
              <p className="font-serif text-lg font-bold text-[#800020] tracking-wider">THURSDAY, 20 AUGUST 2026</p>
              <div className="h-[1px] w-24 bg-[#D4AF37] my-2"></div>
              <p className="font-sans text-[11px] text-[#9A8220] font-bold leading-normal">
                Muhurtham: 12:15 PM<br />
                Reception: 12:00 PM onwards
              </p>
            </div>

            {/* Scratch Canvas Overlay */}
            <canvas
              ref={canvasRef}
              id="scratch-canvas"
              className={`absolute inset-0 z-20 cursor-pointer touch-none transition-opacity duration-500 ${isScratched ? "opacity-0 pointer-events-none" : ""}`}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </section>

        {/* ==========================================
             4. PHOTO FRAME GALLERY SECTION (Captured Moments)
             ========================================== */}
        <section className="py-12 px-6 relative z-10">
          <div className="text-center mb-8">
            <span className="text-[#B89B2B] font-serif tracking-[0.25em] text-[10px] uppercase block mb-2 font-bold">Our Love Story</span>
            <h2 className="text-[#800020] font-serif text-3xl font-semibold">Captured Moments</h2>
            <p className="text-xs italic text-[#758771] font-serif mt-1">Tap on any photo to view full screen</p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-[360px] mx-auto">
            {/* Polaroid 1 */}
            <div
              className="reveal bg-white p-2.5 pb-4 shadow-lg rounded border border-[#D4AF37]/10 cursor-zoom-in hover:z-20 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:border-[#D4AF37]/40 -rotate-2 relative"
              onClick={() => setLightboxImage("/vishnu_athulya/couple_close.jpg")}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#f0c24d] border-2 border-white shadow-inner flex items-center justify-center opacity-80">
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded border border-gray-100 mt-2">
                <img src="/vishnu_athulya/couple_close.jpg" alt="Two Hearts" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-cursive text-lg text-[#800020] leading-none">Two Hearts</p>
                <p className="font-serif text-[8px] text-[#B89B2B] tracking-wider uppercase mt-1 leading-none">Sacred Bond</p>
              </div>
            </div>

            {/* Polaroid 2 */}
            <div
              className="reveal bg-white p-2.5 pb-4 shadow-lg rounded border border-[#D4AF37]/10 cursor-zoom-in hover:z-20 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:border-[#D4AF37]/40 rotate-2 relative"
              onClick={() => setLightboxImage("/vishnu_athulya/couple_full.jpg")}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#f0c24d] border-2 border-white shadow-inner flex items-center justify-center opacity-80">
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded border border-gray-100 mt-2">
                <img src="/vishnu_athulya/couple_full.jpg" alt="Reflection" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-cursive text-lg text-[#800020] leading-none">Reflection</p>
                <p className="font-serif text-[8px] text-[#B89B2B] tracking-wider uppercase mt-1 leading-none">Love's Grace</p>
              </div>
            </div>

            {/* Polaroid 3 */}
            <div
              className="reveal bg-white p-2.5 pb-4 shadow-lg rounded border border-[#D4AF37]/10 cursor-zoom-in hover:z-20 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:border-[#D4AF37]/40 -rotate-1 relative"
              onClick={() => setLightboxImage("/vishnu_athulya/couple_cart.jpg")}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#f0c24d] border-2 border-white shadow-inner flex items-center justify-center opacity-80">
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded border border-gray-100 mt-2">
                <img src="/vishnu_athulya/couple_cart.jpg" alt="Joyful Ride" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-cursive text-lg text-[#800020] leading-none">Joyful Ride</p>
                <p className="font-serif text-[8px] text-[#B89B2B] tracking-wider uppercase mt-1 leading-none">Love In Motion</p>
              </div>
            </div>

            {/* Polaroid 4 */}
            <div
              className="reveal bg-white p-2.5 pb-4 shadow-lg rounded border border-[#D4AF37]/10 cursor-zoom-in hover:z-20 transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-2xl hover:border-[#D4AF37]/40 rotate-3 relative"
              onClick={() => setLightboxImage("/vishnu_athulya/couple_casual.jpg")}
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#f0c24d] border-2 border-white shadow-inner flex items-center justify-center opacity-80">
                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              </div>
              <div className="w-full aspect-[3/4] overflow-hidden rounded border border-gray-100 mt-2">
                <img src="/vishnu_athulya/couple_casual.jpg" alt="Sweet Moments" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 text-center">
                <p className="font-cursive text-lg text-[#800020] leading-none">Sweet Moments</p>
                <p className="font-serif text-[8px] text-[#B89B2B] tracking-wider uppercase mt-1 leading-none">Together Always</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             5. EVENTS / CARD CAROUSEL SECTION
             ========================================== */}
        <section className="py-12 px-6 relative z-10">
          <div className="text-center mb-8">
            <span className="text-[#B89B2B] font-serif tracking-[0.25em] text-[10px] uppercase block mb-2 font-bold">The Celebration Unfolds</span>
            <h2 className="text-[#800020] font-serif text-3xl font-semibold">Events & Details</h2>
            <p className="text-xs italic text-[#758771] font-serif mt-1">Swipe to explore our wedding functions</p>
          </div>

          {/* Carousel Cards Container */}
          <div
            ref={eventCarouselRef}
            onScroll={handleCarouselScroll}
            id="event-carousel"
            className="reveal flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-none pb-4 px-2"
          >
            {/* Card 1: Marriage Ceremony */}
            <div className="w-[290px] shrink-0 snap-center bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-[#D4AF37]/60 p-5 shadow-lg flex flex-col justify-between min-h-[440px]">
              <div>
                <div className="text-center text-[#B89B2B] text-[10px] font-semibold uppercase tracking-wider mb-2">🕊️ Muhurtham</div>
                <h3 className="text-center font-serif text-xl text-[#800020] font-bold mb-4">Marriage Ceremony</h3>

                <div className="w-full bg-[#FDFBF7] rounded-xl p-2 mb-4 border border-[#D4AF37]/20">
                  <svg className="w-full h-32 mx-auto" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="50" y="30" width="8" height="120" rx="1" fill="#D4AF37" />
                    <rect x="240" y="30" width="8" height="120" rx="1" fill="#D4AF37" />
                    <path d="M50 40 Q 56 45 50 50 Q 56 55 50 60 Q 56 65 50 70 Q 56 75 50 80 Q 56 85 50 90 Q 56 95 50 100 Q 56 105 50 110" stroke="#FFBF00" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M248 40 Q 242 45 248 50 Q 242 55 248 60 Q 242 65 248 70 Q 242 75 248 80 Q 242 85 248 90 Q 242 95 248 100 Q 242 105 248 110" stroke="#FFBF00" strokeWidth="1.5" strokeLinecap="round" />
                    <rect x="30" y="20" width="240" height="10" rx="2" fill="#D4AF37" />
                    <rect x="40" y="15" width="220" height="5" rx="1" fill="#800020" />
                    <path d="M40 30 C 90 40, 100 40, 150 30 C 200 40, 210 40, 260 30" stroke="#FF9F00" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                    <line x1="70" y1="30" x2="70" y2="55" stroke="#FF9F00" strokeWidth="1" strokeDasharray="2 3" />
                    <circle cx="70" cy="57" r="2.5" fill="#800020" />
                    <line x1="150" y1="30" x2="150" y2="60" stroke="#FFBF00" strokeWidth="1" strokeDasharray="2 3" />
                    <circle cx="150" cy="62" r="2.5" fill="#800020" />
                    <line x1="230" y1="30" x2="230" y2="55" stroke="#FF9F00" strokeWidth="1" strokeDasharray="2 3" />
                    <circle cx="230" cy="57" r="2.5" fill="#800020" />
                    <path d="M125 150 L135 128 L165 128 L175 150 Z" fill="#4A4A4A" />
                    <path d="M142 128 C142 110, 150 100, 150 100 C150 100, 158 110, 158 128 Z" fill="#FF4500" opacity="0.9" />
                    <path d="M147 128 C147 118, 150 110, 150 110 C150 110, 153 118, 153 128 Z" fill="#FFD700" />
                  </svg>
                </div>

                <div className="text-center font-serif text-sm font-semibold text-[#5c0016] mb-1">20 August 2026</div>
                <div className="text-center font-sans text-[11px] text-[#800020] mb-4">Thursday | 12:15 PM Muhurtham</div>

                <div className="text-center mb-4">
                  <p className="text-xs font-bold text-[#5c0016] uppercase tracking-wide">Seethadhevi Temple</p>
                  <p className="text-[10px] text-gray-500">Pulpally, Wayanad</p>
                </div>
              </div>

              <div className="mt-4">
                <a href="https://maps.app.goo.gl/Yve2dpq6A74tegEe7?g_st=ic" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 bg-[#800020] text-[#D4AF37] font-serif font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#5c0016] transition-all duration-300 shadow-md">
                  <span>📍 SEE ON MAP</span>
                </a>
              </div>
            </div>

            {/* Card 2: Wedding Reception */}
            <div className="w-[290px] shrink-0 snap-center bg-white/95 backdrop-blur-sm rounded-2xl border-2 border-[#8F9E8B]/60 p-5 shadow-lg flex flex-col justify-between min-h-[440px]">
              <div>
                <div className="text-center text-[#758771] text-[10px] font-semibold uppercase tracking-wider mb-2">🎉 Celebration</div>
                <h3 className="text-center font-serif text-xl text-[#800020] font-bold mb-4">Wedding Reception</h3>

                <div className="w-full bg-[#FDFBF7] rounded-xl p-2 mb-4 border border-[#8F9E8B]/30">
                  <svg className="w-full h-32 mx-auto" viewBox="0 0 300 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 60 150 A 80 80 0 0 1 240 150" stroke="#8F9E8B" strokeWidth="3" fill="none" />
                    <path d="M 80 150 C 80 90, 220 90, 220 150" stroke="#FFD700" strokeWidth="1" fill="none" strokeDasharray="2 4" />
                    <circle cx="150" cy="70" r="5" fill="#800020" />
                    <circle cx="145" cy="67" r="4" fill="#D4AF37" />
                    <circle cx="155" cy="67" r="4" fill="#E8DCBF" />
                    <path d="M100 150 L100 130 C100 120, 110 115, 120 115 L180 115 C190 115, 200 120, 200 130 L200 150 Z" fill="#800020" />
                    <rect x="110" y="130" width="80" height="15" rx="2" fill="#D4AF37" />
                    <rect x="40" y="70" width="6" height="80" fill="#E8DCBF" />
                    <circle cx="43" cy="66" r="5" fill="#FFB6C1" />
                    <rect x="254" y="70" width="6" height="80" fill="#E8DCBF" />
                    <circle cx="257" cy="66" r="5" fill="#FFB6C1" />
                  </svg>
                </div>

                <div className="text-center font-serif text-sm font-semibold text-[#5c0016] mb-1">20 August 2026</div>
                <div className="text-center font-sans text-[11px] text-[#800020] mb-4">Thursday | 12:00 PM Onwards</div>

                <div className="text-center mb-4">
                  <p className="text-xs font-bold text-[#5c0016] uppercase tracking-wide">St. Joseph Church Auditorium</p>
                  <p className="text-[10px] text-gray-500">Marakavu, Pulpally</p>
                </div>
              </div>

              <div className="mt-4">
                <a href="https://maps.app.goo.gl/wV7bM5QJH2t2vaqx6?g_st=ic" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 px-4 bg-[#800020] text-[#D4AF37] font-serif font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#5c0016] transition-all duration-300 shadow-md">
                  <span>📍 SEE ON MAP</span>
                </a>
              </div>
            </div>
          </div>

          {/* Carousel Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4" id="carousel-dots">
            <span onClick={() => handleDotClick(0)} className={`w-2.5 h-2.5 rounded-full cursor-pointer ${activeCarouselIndex === 0 ? "bg-[#800020]" : "bg-[#f5d77f]"}`}></span>
            <span onClick={() => handleDotClick(1)} className={`w-2.5 h-2.5 rounded-full cursor-pointer ${activeCarouselIndex === 1 ? "bg-[#800020]" : "bg-[#f5d77f]"}`}></span>
          </div>
        </section>

        {/* ==========================================
             6. RSVP & BLESSINGS REGISTER (Interactive Guestbook)
             ========================================== */}
        <section className="py-12 px-6 relative z-10">
          <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-[#D4AF37]/20">
            <h2 className="text-center font-cinzel text-[#800020] text-lg tracking-widest font-semibold mb-6">✍️ RSVP & BLESSINGS</h2>

            <form id="rsvp-form" className="space-y-4" onSubmit={handleRSVPSubmit}>
              <div>
                <label htmlFor="guest-name" className="block font-serif text-xs text-[#5c0016] font-semibold mb-1 uppercase tracking-wider">Your Name</label>
                <input
                  type="text"
                  id="guest-name"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-xl bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#800020] transition duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <span className="block font-serif text-xs text-[#5c0016] font-semibold mb-1 uppercase tracking-wider">Will you attend?</span>
                <div className="grid grid-cols-3 gap-2">
                  <label className={`cursor-pointer border border-[#D4AF37]/30 rounded-xl p-2 flex items-center justify-center text-[10px] font-bold text-center transition duration-300 ${attendance === "Yes" ? "bg-[#fdf2f2] border-[#800020]" : "hover:bg-[#fdf2f2]"}`}>
                    <input type="radio" name="attendance" value="Yes" checked={attendance === "Yes"} onChange={() => setAttendance("Yes")} className="hidden" />
                    <span className={attendance === "Yes" ? "text-[#800020] font-bold" : "text-gray-500"}>Joyfully Accept</span>
                  </label>
                  <label className={`cursor-pointer border border-[#D4AF37]/30 rounded-xl p-2 flex items-center justify-center text-[10px] font-bold text-center transition duration-300 ${attendance === "Maybe" ? "bg-[#fdf2f2] border-[#800020]" : "hover:bg-[#fdf2f2]"}`}>
                    <input type="radio" name="attendance" value="Maybe" checked={attendance === "Maybe"} onChange={() => setAttendance("Maybe")} className="hidden" />
                    <span className={attendance === "Maybe" ? "text-[#800020] font-bold" : "text-gray-500"}>Regretfully Decline</span>
                  </label>
                  <label className={`cursor-pointer border border-[#D4AF37]/30 rounded-xl p-2 flex items-center justify-center text-[10px] font-bold text-center transition duration-300 ${attendance === "No" ? "bg-[#fdf2f2] border-[#800020]" : "hover:bg-[#fdf2f2]"}`}>
                    <input type="radio" name="attendance" value="No" checked={attendance === "No"} onChange={() => setAttendance("No")} className="hidden" />
                    <span className={attendance === "No" ? "text-[#800020] font-bold" : "text-gray-500"}>Not Sure Yet</span>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="guest-message" className="block font-serif text-xs text-[#5c0016] font-semibold mb-1 uppercase tracking-wider">Wishes & Blessings</label>
                <textarea
                  id="guest-message"
                  required
                  rows={3}
                  value={guestWishes}
                  onChange={(e) => setGuestWishes(e.target.value)}
                  className="w-full px-4 py-2 border border-[#D4AF37]/30 rounded-xl bg-[#FDFBF7] text-sm focus:outline-none focus:border-[#800020] transition duration-300"
                  placeholder="Write your heartfelt blessing here..."
                />
              </div>

              <button type="submit" className="w-full py-3 bg-[#800020] text-[#D4AF37] font-serif font-bold text-xs tracking-widest rounded-xl hover:bg-[#5c0016] transition-all duration-300 shadow-md">
                SEND BLESSINGS & RSVP
              </button>
            </form>

            <div className="h-[1px] w-full bg-[#D4AF37]/20 my-8"></div>

            <div>
              <h3 className="font-serif text-sm font-semibold text-[#5c0016] mb-4 uppercase tracking-wider flex items-center gap-2">
                <span>💌 Blessings & Wishes</span>
                <span id="blessings-count" className="bg-[#800020] text-[#f5d77f] text-[10px] py-0.5 px-2 rounded-full font-sans">{wishes.length}</span>
              </h3>

              <div id="blessings-list" className="space-y-3 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                {[...wishes].reverse().map((wish, index) => (
                  <div key={index} className="bg-[#FDFBF7] p-3 rounded-xl border border-[#D4AF37]/10 text-xs shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-serif font-bold text-[#800020]">{wish.name}</span>
                      <span className="text-[9px] text-gray-400 font-semibold">{wish.date}</span>
                    </div>
                    <p className="font-sans italic text-gray-600 text-[11px] leading-relaxed">{wish.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
             7. CONTACT & INQUIRIES SECTION
             ========================================== */}
        <section className="py-12 px-6 relative z-10 text-center">
          <div className="bg-[#800020]/90 text-white rounded-2xl p-6 shadow-xl border border-[#D4AF37]/30">
            <h2 className="font-cinzel text-[#D4AF37] text-lg tracking-widest font-semibold mb-4">📞 CONTACT FOR INQUIRIES</h2>

            <p className="text-[11px] text-[#f7f3e9] font-medium mb-6 leading-relaxed">
              Should you require any assistance regarding the venue or wedding details, please feel free to contact us.
            </p>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-left">
                  <p className="text-[10px] text-[#f5d77f] uppercase font-semibold">Groom's Father</p>
                  <p className="font-serif text-sm font-bold">Baiju</p>
                </div>
                <a href="tel:9020205149" className="py-2 px-4 bg-[#D4AF37] text-[#5c0016] font-sans font-bold text-xs rounded-lg shadow hover:bg-[#faebb7] transition-all duration-300">
                  CALL NOW
                </a>
              </div>

              <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-left">
                  <p className="text-[10px] text-[#f5d77f] uppercase font-semibold">Groom</p>
                  <p className="font-serif text-sm font-bold">Vishnu</p>
                </div>
                <div className="flex gap-2">
                  <a href="https://wa.me/918281361003" target="_blank" rel="noopener noreferrer" className="py-2 px-3 bg-green-600 hover:bg-green-700 text-white font-sans font-bold text-[10px] rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-1">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.453 5.461 0 9.902-4.44 9.905-9.902.002-2.646-1.02-5.133-2.88-6.995C16.635 1.85 14.15 1.824 12.008 1.824c-5.461 0-9.903 4.44-9.907 9.903-.001 1.748.459 3.456 1.331 4.973L2.453 21.65l5.194-1.362zm10.742-7.447c-.29-.145-1.72-.848-1.987-.946-.267-.097-.46-.145-.655.145-.195.29-.755.946-.925 1.14-.17.195-.34.218-.63.073-1.085-.544-1.82-1.024-2.542-2.274-.19-.328.19-.304.545-1.01.06-.12.03-.226-.015-.323-.045-.097-.46-1.11-.63-1.517-.166-.4-.35-.34-.48-.347-.124-.006-.267-.007-.412-.007-.145 0-.38.054-.58.272-.2.218-.765.748-.765 1.822 0 1.074.78 2.113.89 2.26.11.145 1.536 2.345 3.72 3.287.519.223.924.357 1.24.457.522.166.997.143 1.373.087.418-.06 1.72-.703 1.962-1.383.243-.68.243-1.26.17-1.383-.074-.122-.267-.195-.558-.34z" />
                    </svg>
                    CHAT
                  </a>
                  <a href="tel:8281361003" className="py-2 px-3 bg-[#D4AF37] text-[#5c0016] font-sans font-bold text-[10px] rounded-lg shadow hover:bg-[#faebb7] transition-all duration-300 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    CALL
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WhatsApp Share Floating Button (Only visible after card is opened) */}
        {isOpenComplete && (
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




        {/* ==========================================
             8. FOOTER SECTION
             ========================================== */}
        <footer className="py-12 px-6 relative z-10 text-center border-t border-[#D4AF37]/10 mt-auto bg-[#5c0016]/10">
          <div className="w-16 h-16 mx-auto mb-6 text-[#D4AF37] opacity-60">
            <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="10" />
              <path d="M50 0 C45 20, 30 35, 50 50 C70 35, 55 20, 50 0 Z" />
              <path d="M50 100 C45 80, 30 65, 50 50 C70 65, 55 80, 50 100 Z" />
              <path d="M0 50 C20 45, 35 30, 50 50 C35 70, 20 55, 0 50 Z" />
              <path d="M100 50 C80 45, 65 30, 50 50 C65 70, 80 55, 100 50 Z" />
            </svg>
          </div>

          <p className="font-cursive text-3xl text-[#D4AF37] mb-2 font-bold gold-shine">Vishnu & Athulya</p>
          <p className="font-serif text-[10px] text-[#758771] tracking-[0.2em] uppercase mb-6 font-semibold">Joined in Love & Harmony</p>

          <div className="h-[1px] w-24 bg-[#D4AF37]/30 mx-auto mb-6"></div>

          <p className="text-[9px] text-[#758771]/60 font-medium">
            Designed with ♥ for Vishnu & Athulya
          </p>
        </footer>

      </main>

      {/* ==========================================
           LIGHTBOX MODAL COMPONENT (Captured Moments)
           ========================================== */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out p-4"
        >
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-lg shadow-2xl border border-white/10 relative">
            <img src={lightboxImage} alt="Preview" className="max-w-full max-h-[85vh] object-contain mx-auto" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition border border-white/20 text-xl font-bold"
              aria-label="Close lightbox"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
