export type InviteData = {
  slug: string;
  couple: string;
  date: string;
  images: string[];
  venue: string;
  /** Digits only, country code included (e.g. 919876543210 for wa.me) */
  phone: string;
  theme?: string;
  ogImage?: string;
  ogDescription?: string;
};

export const invites: InviteData[] = [
  {
    slug: "rahul-arya-wedding-digital-invitation",
    couple: "Rahul ❤️ Arya",
    date: "June 20, 2026",
    venue: "Wayanad Resort",
    phone: "918848772371",
    images: ["/1.jpg", "/2.jpg"],
  },
  {
    slug: "anandhu-archana-kerala-wedding",
    couple: "Anandhu & Archana",
    date: "22nd January 2026",
    venue: "The Hill District Club",
    phone: "918848772371",
    theme: "kerala",
    images: [
      "/kerala_couple_1_1777897655779.png",
      "/kerala_couple_2_1777897675614.png"
    ],
  },
  {
    slug: "daniel-maria-wedding",
    couple: "Daniel & Maria",
    date: "14 February 2026",
    venue: "St. Peter's Cathedral",
    phone: "918848772371",
    theme: "christian",
    images: [],
  },
  {
    slug: "aditya-meera-royal-wedding",
    couple: "Aditya & Meera",
    date: "December 12, 2026",
    venue: "The Grand Palace, Udaipur",
    phone: "918848772371",
    theme: "royal",
    images: [
      "/gallery/PEPPEADS_1340_resized.jpg",
      "/gallery/PEPPEADS_1817_resized.jpg",
      "/gallery/PEPPEADS_1802_resized.jpg",
      "/gallery/PEPPEADS_2092_resized.jpg",
    ],
  },
  {
    slug: "siya-jithin-christian-wedding",
    couple: "Siya Rose & Jithin Mathew Roy",
    date: "Thursday, 14 May",
    venue: "St George Church, Charity",
    phone: "918848772371",
    theme: "elegant-christian",
    images: [],
    ogImage: "/sia_img/desktop-sia.png",
  },
  {
    slug: "ajay-aparna-wedding-digital-invitation",
    couple: "Ajay & Aparna",
    date: "August 20, 2026",
    venue: "Pulpally, Kerala",
    phone: "918848772371",
    theme: "ajay-aparna",
    images: [],
    ogImage: "/couple_traditional.jpg",
    ogDescription: "👋 Hello!\n\n❤️ You're warmly invited to celebrate our special day.\n\nTap the link below to view our digital invitation.\n\n⬇️",
  },
];
