"use client";

import React from "react";

export function KeralaStickyBar() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-[#1b4332]/95 backdrop-blur-md shadow-2xl border border-[#d4af37]/30 grid grid-cols-5 p-2 px-1 text-[#faf8f5] md:hidden text-center items-center justify-items-center">
      <a
        href="#hero"
        className="flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity w-full text-center"
      >
        {/* House Icon */}
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.505-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-wider font-bold">Home</span>
      </a>

      <a
        href="#gallery"
        className="flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity w-full text-center"
      >
        {/* Photo Library Icon */}
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0z"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-wider font-bold">Gallery</span>
      </a>

      <a
        href="#event"
        className="flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity w-full text-center"
      >
        {/* Calendar Event Icon */}
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-wider font-bold">Event</span>
      </a>

      <a
        href="#location"
        className="flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity w-full text-center"
      >
        {/* Map Marker Pin Icon */}
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-wider font-bold">Map</span>
      </a>

      <a
        href="#rsvp"
        className="flex flex-col items-center justify-center gap-1 opacity-100 transition-opacity text-[#d4af37] w-full text-center"
      >
        {/* RSVP Check Icon */}
        <svg
          className="w-[22px] h-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7.5L12 14.5L8 10.5M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75"
          />
        </svg>
        <span className="text-[10px] uppercase tracking-wider font-bold">RSVP</span>
      </a>
    </div>
  );
}
