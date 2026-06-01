export type Office = {
  slug: "ankara";
  city: "Ankara";
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
];

export const site = {
  name: "KARDAK Hukuk Bürosu",
  shortName: "KARDAK Hukuk",
  owner: "Mahmut KARDAK",
  ownerTitle: "Kurucu Avukat",
  tagline: "Stratejik, sakin ve güçlü hukuki temsil.",
  description:
    "KARDAK Hukuk Bürosu; kurucu avukat Mahmut KARDAK liderliğinde ceza, aile, iş, ticaret, gayrimenkul, miras, icra-iflas ve idare hukuku alanlarında bireylere ve şirketlere stratejik hukuki temsil ve danışmanlık sunar.",
  url: "https://kardakhukuk.com",
  cities: ["Ankara"] as const,
  city: "Ankara",
  address:
    "Randevulu görüşmeler için tam konum bilgisi WhatsApp Web üzerinden paylaşılır.",
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
  { href: "/hizmetler", label: "Çalışma Alanları" },
  { href: "/blog", label: "Yayınlar" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
] as const;
