export type Office = {
  slug: "ankara" | "istanbul";
  city: "Ankara" | "İstanbul";
  district: string;
  regionLabel: string;
  shortAddress: string;
  longAddress: string;
  barosu: string;
  whatsappPhone: string;
  whatsappRaw: string;
  whatsappUrl: string;
  mapEmbed?: string;
};

export const offices: Office[] = [
  {
    slug: "ankara",
    city: "Ankara",
    district: "Bilkent",
    regionLabel: "Bilkent · Çankaya · Ankara",
    shortAddress: "Bilkent, Çankaya · Ankara",
    longAddress:
      "Bilkent, Çankaya / Ankara — randevulu görüşme için tam konum bilgisi WhatsApp Web üzerinden paylaşılır.",
    barosu: "Ankara Barosu",
    whatsappPhone: "0553 612 24 56",
    whatsappRaw: "+905536122456",
    whatsappUrl: "https://wa.me/905536122456",
  },
  {
    slug: "istanbul",
    city: "İstanbul",
    district: "Beşiktaş",
    regionLabel: "Beşiktaş · İstanbul",
    shortAddress: "Beşiktaş · İstanbul",
    longAddress:
      "Beşiktaş / İstanbul — randevulu görüşme için tam konum bilgisi WhatsApp Web üzerinden paylaşılır.",
    barosu: "İstanbul Barosu",
    whatsappPhone: "0545 724 42 88",
    whatsappRaw: "+905457244288",
    whatsappUrl: "https://wa.me/905457244288",
  },
];

export const site = {
  name: "KARDAK Hukuk Bürosu",
  shortName: "KARDAK Hukuk",
  owner: "Mahmut KARDAK",
  ownerTitle: "Kurucu Avukat",
  tagline: "Stratejik, sakin ve güçlü hukuki temsil.",
  description:
    "Ankara (Bilkent) ve İstanbul (Beşiktaş) ofisleriyle KARDAK Hukuk Bürosu; kurucu avukat Mahmut KARDAK liderliğinde ceza, aile, iş, ticaret, gayrimenkul, miras, icra-iflas ve idare hukuku alanlarında bireylere ve şirketlere stratejik hukuki temsil ve danışmanlık sunar.",
  url: "https://kardakhukuk.com",
  founded: 2012,
  cities: ["Ankara", "İstanbul"] as const,
  city: "Ankara",
  address:
    "Ankara (Bilkent) ve İstanbul (Beşiktaş) ofislerimiz için tam konum bilgisi randevu sırasında WhatsApp üzerinden paylaşılır.",
  phone: "0553 612 24 56",
  phoneRaw: "+905536122456",
  whatsapp: "+905536122456",
  whatsappUrl: "https://wa.me/905536122456",
  email: "info@kardakhukuk.com",
  hours: "Pazartesi – Cuma · 09:00 – 18:30",
  social: {
    linkedin: "",
    instagram: "",
  },
  mapEmbed: "",
  offices,
} as const;

export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/blog", label: "Blog" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
] as const;
