"use client";

type MobileStickyNavProps = {
  whatsappUrl: string;
};

const itemClass =
  "flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-slate-600 transition active:bg-slate-50 w-full text-center";

const iconClass = "material-symbols-outlined text-[22px] leading-none text-[#7253f6]";

export function MobileStickyNav({ whatsappUrl }: MobileStickyNavProps) {
  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 w-full border-t border-slate-200/80 bg-white/95 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom, 0px))" }}
      aria-label="Primary mobile navigation"
    >
      <div className="mx-auto grid grid-cols-4 h-14 w-full max-w-lg items-center px-2">
        <a href="#hero" className="flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-slate-600 transition active:bg-slate-50 w-full text-center">
          <svg className="w-[21px] h-[21px] text-[#7253f6]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.505-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span className="truncate text-[10px] font-semibold tracking-wide text-slate-700 w-full">
            Home
          </span>
        </a>

        <a href="#features" className="flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-slate-600 transition active:bg-slate-50 w-full text-center">
          <svg className="w-[21px] h-[21px] text-[#7253f6]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6zM9 9h6M9 13h6M9 17h4" />
          </svg>
          <span className="truncate text-[10px] font-semibold tracking-wide text-slate-700 w-full">
            Features
          </span>
        </a>

        <a href="#templates" className="flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-slate-600 transition active:bg-slate-50 w-full text-center">
          <svg className="w-[21px] h-[21px] text-[#7253f6]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          <span className="truncate text-[10px] font-semibold tracking-wide text-slate-700 w-full">
            Templates
          </span>
        </a>

        <a href="#pricing" className="flex flex-col items-center justify-center gap-1 rounded-lg py-1 text-slate-600 transition active:bg-slate-50 w-full text-center">
          <svg className="w-[21px] h-[21px] text-[#7253f6]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581a2.25 2.25 0 003.182 0l4.318-4.318a2.25 2.25 0 000-3.182L11.16 3.659A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
          <span className="truncate text-[10px] font-semibold tracking-wide text-slate-700 w-full">
            Pricing
          </span>
        </a>
      </div>
    </nav>
  );
}
