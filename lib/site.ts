export type Office = {
  slug: "ankara";
  city: "Ankara";
  district: string;
  locality: string;
  regionLabel: string;
  shortAddress: string;
  streetAddress: string;
  postalCode: string;
  longAddress: string;
  barosu: string;
  whatsappPhone: string;
  whatsappRaw: string;
  whatsappUrl: string;
  mapQuery: string;
  mapUrl: string;
  mapEmbed?: string;
};

export const offices: Office[] = [
  {
    slug: "ankara",
    city: "Ankara",
    district: "Mustafa Kemal",
    locality: "Çankaya",
    regionLabel: "Maidan · Mustafa Kemal · Çankaya · Ankara",
    shortAddress: "Maidan, Çankaya · Ankara",
    streetAddress: "Maidan, Mustafa Kemal, 2118. Cd.",
    postalCode: "06510",
    longAddress:
      "Maidan, Mustafa Kemal, 2118. Cd., 06510 Çankaya / Ankara — randevu akışı WhatsApp Web üzerinden netleştirilir.",
    barosu: "Ankara Barosu",
    whatsappPhone: "+90 533 612 24 56",
    whatsappRaw: "+905336122456",
    whatsappUrl: "https://wa.me/905336122456",
    mapQuery: "Maidan, Mustafa Kemal, 2118. Cd., 06510 Çankaya/Ankara",
    mapUrl: "https://maps.app.goo.gl/fe9STM5cYKWmhUCi6?g_st=iw",
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
    "Maidan, Mustafa Kemal, 2118. Cd., 06510 Çankaya / Ankara",
  phone: "+90 533 612 24 56",
  phoneRaw: "+905336122456",
  whatsapp: "+905336122456",
  whatsappUrl: "https://wa.me/905336122456",
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
  { href: "/iletisim", label: "İletişim" },
] as const;
