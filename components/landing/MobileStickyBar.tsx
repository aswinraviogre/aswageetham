"use client";

import Link from "next/link";

type Props = {
  whatsappUrl: string;
  demoPath: string;
};

export function MobileStickyBar({ whatsappUrl, demoPath }: Props) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "linear-gradient(to top, rgba(5,0,16,0.98) 0%, rgba(13,0,32,0.92) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(124,58,237,0.25)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Urgency strip */}
      <div
        className="flex items-center justify-center gap-2 py-2"
        style={{ borderBottom: "1px solid rgba(124,58,237,0.15)" }}
      >
        {/* Pulse dot */}
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75"
            style={{
              background: "#a78bfa",
              animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
            }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: "#7c3aed" }}
          />
        </span>
        <p className="text-[11px] font-semibold tracking-wide text-purple-200/80">
          🎉 Limited spots — setup takes just 5 minutes
        </p>
      </div>

      {/* CTA row */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Ghost / secondary */}
        <Link
          href={demoPath}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border py-3 text-sm font-semibold text-white transition active:scale-95"
          style={{ borderColor: "rgba(124,58,237,0.45)", background: "rgba(124,58,237,0.1)" }}
        >
          <span className="material-symbols-outlined text-[17px] text-purple-300">visibility</span>
          View Demo
        </Link>

        {/* Primary */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.6] items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-lg transition active:scale-95"
          style={{
            background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
            boxShadow: "0 4px 20px rgba(124,58,237,0.5)",
          }}
        >
          <span className="material-symbols-outlined text-[17px]">chat</span>
          Start for Free
        </a>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
