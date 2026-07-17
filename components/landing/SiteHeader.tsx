"use client";

import Link from "next/link";
import { useState } from "react";

type SiteHeaderProps = {
  demoPath: string;
  whatsappUrl: string;
};

const navLink =
  "font-h3 text-sm font-semibold tracking-tight text-slate-600 transition-colors duration-200 hover:text-[#7253f6]";

export function SiteHeader({ demoPath, whatsappUrl }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-100/90 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="relative mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900"
          onClick={() => setMenuOpen(false)}
        >
          Save The Date
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          <a className={navLink} href="#features">
            Features
          </a>
          <a className={navLink} href="#how-it-works">
            How it Works
          </a>
          <a className={navLink} href="#pricing">
            Pricing
          </a>
          <a className={navLink} href="#templates">
            Templates
          </a>
        </nav>

        <div className="hidden shrink-0 items-center gap-5 md:flex">
          <a className={`${navLink} text-[#7253f6]`} href="#">
            Log in
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#7253f6] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#6347e0]"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#7253f6] md:hidden"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a className={navLink} href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a className={navLink} href="#how-it-works" onClick={() => setMenuOpen(false)}>
              How it Works
            </a>
            <a className={navLink} href="#pricing" onClick={() => setMenuOpen(false)}>
              Pricing
            </a>
            <a className={navLink} href="#templates" onClick={() => setMenuOpen(false)}>
              Templates
            </a>
            <a className={navLink} href={demoPath} onClick={() => setMenuOpen(false)}>
              View Demo
            </a>
            <a
              className="mt-2 rounded-lg bg-[#7253f6] py-3 text-center text-sm font-semibold text-white"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              Get Started
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
