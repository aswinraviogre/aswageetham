# System Rules: Kerala Theme Design System

## 1. Core Philosophy
When building or extending components for this landing page or any related pages, **strict adherence to the traditional Kerala aesthetic** is required. The design relies on a premium, elegant, and culturally rich visual language combining dark green, warm cream, gold accents, and deep red traditional touches.

## 2. Color Palette
Use exact hex codes to maintain consistency. Do not use generic Tailwind colors (e.g., `green-800` or `yellow-500`) unless specified.
- **Background (Base)**: `#faf8f5` (Warm Cream)
- **Primary Text & Dark Backgrounds**: `#1b4332` (Deep Traditional Green)
- **Primary Accent (Gold)**: `#d4af37` (used for borders, highlights, dividers, and icons)
- **Secondary Accent (Deep Red)**: `#9b2226` (used for subtle ornaments, like the heart or traditional square centerpieces)

## 3. Typography
- **Global Font**: `font-serif` must be applied to the root container.
- **Headings Font**: Use `var(--font-plus-jakarta)` for all major headings (`h1`, `h2`, `h3`, and prominent numbers).
- **Styling**: Headings should be bold, text should generally be `#1b4332`. If placed on a dark background (like the dark green sections), text should be `#faf8f5` or `#d4af37`.

## 4. UI Components & Patterns

### Containers & Sections
- Sections alternate between the light cream background (`#faf8f5`) and the dark green background (`#1b4332`).
- Dark sections should have gold borders at the top and bottom: `border-y-4 border-[#d4af37]`.

### Traditional Ornaments & Dividers
Always use custom HTML/CSS dividers instead of basic `<hr>` tags.
**Example Divider**:
```tsx
<div className="flex items-center justify-center gap-4 w-full max-w-xs mb-6">
  <div className="h-[1px] w-full bg-gradient-to-r from-transparent to-[#d4af37]"></div>
  <div className="w-3 h-3 rotate-45 border border-[#d4af37]"></div>
  <div className="h-[1px] w-full bg-gradient-to-l from-transparent to-[#d4af37]"></div>
</div>
```

### Cards & Glassmorphism
- Elements floating over images or dark backgrounds should use glassmorphism:
  `bg-[#faf8f5]/10 backdrop-blur-sm border border-[#d4af37]/40 shadow-lg`
- Mobile sticky navs and floating buttons should use:
  `bg-[#1b4332]/95 backdrop-blur-md shadow-2xl border border-[#d4af37]/30`

### Images & Media
- Use thick white borders for gallery images to mimic physical photos: `border-[4px] border-white`.
- Add hover effects to images for interactivity: `hover:scale-105 hover:shadow-xl transition-all duration-300`.

### Buttons
- **Primary Button (Gold)**: `bg-[#d4af37] text-[#1b4332] px-8 py-4 rounded-full font-bold shadow-[0_8px_30px_rgba(212,175,55,0.4)] hover:bg-[#ffe58f] hover:scale-105 transition-colors transform duration-300`

## 5. Animations & Interactions
- **Micro-interactions**: Use `group-hover` and `hover:scale-110` to make buttons and icons feel responsive.
- **Scroll Animations**: Utilize `framer-motion` for scroll-linked background parallax (`useScroll`, `useTransform`).
- **CSS Animations**: Use keyframes for continuous atmospheric effects (e.g., falling petals, floating elements, spinning backgrounds).
- **Icons**: Use Google Material Symbols (`material-symbols-outlined`) for consistent iconography.

## 6. Layout & Responsiveness
- Ensure all sections are centered using `max-w-7xl`, `max-w-4xl`, or `max-w-2xl` with `mx-auto`.
- Maintain adequate padding: `py-20 px-6` for mobile, scaling up to `md:px-12` for desktop.
- For mobile sticky navbars, always account for safe areas: `pb-[env(safe-area-inset-bottom)]`.
