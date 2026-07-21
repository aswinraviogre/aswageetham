import Link from "next/link";
import Image from "next/image";

export default function DemoPage() {
  const demos = [
    {
      title: "Kerala Traditional",
      couple: "Anandhu & Archana",
      slug: "anandhu-archana-kerala-wedding",
      desc: "Rich gold and green traditional theme featuring falling petals, video reels, and traditional music.",
      image: "/kerala_couple_1_1777897655779.png",
      bgClass: "border-emerald-500/20 bg-[#0c1813]/95",
      tagColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20"
    },
    {
      title: "Christian Elegance",
      couple: "Daniel & Maria",
      slug: "daniel-maria-wedding",
      desc: "Minimalist heavenly blue and white aesthetic with gentle scroll transitions and interactive elements.",
      image: "/sia_img/desktop-sia.png",
      bgClass: "border-sky-500/20 bg-[#07131c]/95",
      tagColor: "bg-sky-500/20 text-sky-300 border border-sky-500/20"
    },
    {
      title: "Royal Palace",
      couple: "Aditya & Meera",
      slug: "aditya-meera-royal-wedding",
      desc: "Deep maroon and gold luxury theme with sparkling particle effects and cinematic animations.",
      image: "/hero-bg.jpg",
      bgClass: "border-red-500/20 bg-[#1c080b]/95",
      tagColor: "bg-red-500/20 text-red-300 border border-red-500/20"
    },
    {
      title: "Ajay & Aparna Traditional",
      couple: "Ajay & Aparna",
      slug: "ajay-aparna-wedding-digital-invitation",
      desc: "Interactive 3D envelope opening sequence, gold wax seal trigger, falling petals, and Kerala traditional background audio.",
      image: "/couple_casual.jpg",
      bgClass: "border-amber-500/20 bg-[#181107]/95",
      tagColor: "bg-amber-500/20 text-amber-300 border border-amber-500/20"
    },
    {
      title: "Sreejith & Sukanya Traditional",
      couple: "Sukanya & Sreejith",
      slug: "sreejith-sukanya-wedding-digital-invitation",
      desc: "Interactive 3D envelope, gold wax seal, Kerala traditional background audio, addresses, and contacts.",
      image: "/sukanya_sreejith_couple_1.jpg",
      bgClass: "border-yellow-500/20 bg-[#181507]/95",
      tagColor: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050010] text-white py-16 px-6 sm:px-8 relative overflow-hidden flex flex-col justify-between">
      {/* Background glow orbs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, #a855f7 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-purple-300 hover:text-white transition mb-6 font-semibold">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Select a <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Wedding Demo</span>
          </h1>
          <p className="text-purple-200/70 mx-auto text-sm sm:text-base leading-relaxed tracking-wide font-medium px-4" style={{ maxWidth: "480px" }}>
            Choose a theme below to preview live web invitations, RSVP systems, and transitions.
          </p>
        </div>

        {/* 2-Column Grid (stacked by 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {demos.map((d) => (
            <Link 
              key={d.slug}
              href={`/invite/${d.slug}`}
              className={`group relative flex flex-col rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(124,58,237,0.15)] ${d.bgClass}`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/5">
                <Image 
                  src={d.image} 
                  alt={d.title}
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <span className={`absolute top-4 right-4 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md ${d.tagColor}`}>
                  {d.title}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-2 group-hover:text-purple-300 transition-colors" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                    {d.couple}
                  </h3>
                  <p className="text-purple-200/70 text-sm leading-relaxed mb-4">
                    {d.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 uppercase tracking-widest mt-2">
                  Launch Live Demo
                  <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1 duration-200">arrow_forward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-purple-300/40 mt-16">
        © 2025 Save The Date. All rights reserved.
      </footer>
    </div>
  );
}
