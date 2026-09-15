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
  {
    slug: "sreejith-sukanya-wedding-digital-invitation",
    couple: "Sukanya & Sreejith",
    date: "August 30, 2026",
    venue: "Sree Krishna Temple, Guruvayoor",
    phone: "9447951485",
    theme: "sreejith-sukanya",
    images: [
      "/sukanya_sreejith_couple_1.jpg",
      "/sukanya_sreejith_bride.jpg",
      "/sukanya_sreejith_couple_bw.jpg"
    ],
    ogImage: "/sukanya_sreejith_couple_1.jpg",
    ogDescription: "👋 Hello!\n\n❤️ You're warmly invited to celebrate our special day.\n\nTap the link below to view our digital invitation.\n\n⬇️",
  },
  {
    slug: "vishnu-athulya-wedding-digital-invitation",
    couple: "Vishnu & Athulya",
    date: "August 20, 2026",
    venue: "Seethadhevi Temple, Pulpally",
    phone: "918281361003",
    theme: "vishnu-athulya",
    images: [
      "/vishnu_athulya/couple_close.jpg",
      "/vishnu_athulya/couple_full.jpg",
      "/vishnu_athulya/couple_cart.jpg",
      "/vishnu_athulya/couple_casual.jpg"
    ],
    ogImage: "/vishnu_athulya/couple_close.jpg",
    ogDescription: "Together with our families, we cordially invite you to celebrate our special day on 20 August 2026. Tap to view the invitation and details.",
  },
  {
    slug: "aswanth-geethanjali-wedding-digital-invitation",
    couple: "Aswanth & Geethanjali",
    date: "Wednesday, 11th November 2026",
    venue: "The Hill District Club, Kolagapara",
    phone: "917356558475",
    theme: "ashwageetham",
    images: [
      "/ashwageetham/theme_card.jpg"
    ],
    ogImage: "/ashwageetham/theme_card.jpg",
    ogDescription: "Mr. Sivarajan M.M. & Mrs. Rohini Sivarajan cordially invite you with family to the wedding of Aswanth & Geethanjali on Wednesday, 11th November 2026 at The Hill District Club, Kolagapara.",
  },
];

