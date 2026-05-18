import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { site, offices } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Ankara & İstanbul Avukat · ${site.shortName} — Ceza, Aile, İş ve Ticaret Hukuku`,
    template: `%s · Ankara & İstanbul Avukat | ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "Ankara avukat",
    "İstanbul avukat",
    "Ankara hukuk bürosu",
    "İstanbul hukuk bürosu",
    "Bilkent avukat",
    "Beşiktaş avukat",
    "Ankara boşanma avukatı",
    "İstanbul boşanma avukatı",
    "Ankara ceza avukatı",
    "İstanbul ceza avukatı",
    "Ankara iş avukatı",
    "İstanbul iş avukatı",
    "Ankara miras avukatı",
    "İstanbul miras avukatı",
    "Ankara ticaret avukatı",
    "İstanbul ticaret avukatı",
    "Ankara gayrimenkul avukatı",
    "İstanbul gayrimenkul avukatı",
    "Ankara icra avukatı",
    "İstanbul icra avukatı",
    "boşanma davası Ankara",
    "boşanma davası İstanbul",
    "miras davası Ankara",
    "miras davası İstanbul",
    "işe iade davası Ankara",
    "işe iade davası İstanbul",
    "kira uyarlama Ankara",
    "kira uyarlama İstanbul",
    "şirket kurulumu Ankara",
    "şirket kurulumu İstanbul",
    "tapu iptal davası Ankara",
    "tapu iptal davası İstanbul",
    "KARDAK Hukuk Bürosu",
    "Mahmut KARDAK avukat",
  ],
  alternates: {
    canonical: site.url,
  },
  openGraph: {
    title: `${site.name} — Ankara & İstanbul Avukat`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Ankara & İstanbul Avukat`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "law",
};

const serviceTypes = [
  "Ceza Hukuku",
  "Aile Hukuku",
  "İş Hukuku",
  "Ticaret ve Şirketler Hukuku",
  "Gayrimenkul Hukuku",
  "İcra ve İflas Hukuku",
  "İdare ve Vergi Hukuku",
  "Miras Hukuku",
  "Sürekli Hukuki Danışmanlık",
];

const knowsAbout = [
  "Boşanma Davası",
  "Velayet ve Nafaka",
  "İşe İade Davası",
  "Kira Uyarlama Davası",
  "Şirket Kuruluşu",
  "Ticari Sözleşmeler",
  "Tapu İptal ve Tescil Davası",
  "İcra Takibi",
  "Miras Paylaşımı ve Veraset İlamı",
  "Ceza Soruşturma ve Kovuşturma",
];

const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:30",
  },
];

const officeJsonLd = offices.map((office) => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${site.url}#office-${office.slug}`,
  name: `${site.name} — ${office.city} Ofisi`,
  alternateName: `${site.shortName} ${office.city}`,
  description: `${office.city} (${office.district}) ofisinde ${site.name}; ceza, aile, iş, ticaret, gayrimenkul, miras, icra-iflas ve idare hukuku alanlarında bireylere ve şirketlere stratejik hukuki temsil sunar.`,
  url: `${site.url}/iletisim#${office.slug}`,
  email: site.email,
  telephone: office.whatsappRaw,
  parentOrganization: { "@id": `${site.url}#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: office.district,
    addressLocality: office.district,
    addressRegion: office.city,
    addressCountry: "TR",
  },
  openingHoursSpecification: openingHours,
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: office.city },
    { "@type": "Country", name: "Türkiye" },
  ],
  serviceType: serviceTypes,
  knowsAbout,
}));

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}#organization`,
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/kardak-hukuk.svg`,
  description: site.description,
  foundingDate: String(site.founded),
  founder: {
    "@type": "Person",
    name: `Av. ${site.owner}`,
    jobTitle: site.ownerTitle,
  },
  location: offices.map((office) => ({
    "@type": "Place",
    "@id": `${site.url}#office-${office.slug}`,
    name: `${site.name} — ${office.city} Ofisi`,
    address: {
      "@type": "PostalAddress",
      addressLocality: office.district,
      addressRegion: office.city,
      addressCountry: "TR",
    },
  })),
  areaServed: [
    { "@type": "City", name: "Ankara" },
    { "@type": "City", name: "İstanbul" },
    { "@type": "Country", name: "Türkiye" },
  ],
  contactPoint: offices.map((office) => ({
    "@type": "ContactPoint",
    telephone: office.whatsappRaw,
    contactType: `${office.city} WhatsApp Web`,
    availableLanguage: ["Turkish"],
    areaServed: ["TR"],
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "tr-TR",
  publisher: { "@id": `${site.url}#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${playfair.variable} h-full overflow-x-hidden antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col overflow-x-hidden bg-cream text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {officeJsonLd.map((schema) => (
          <script
            key={schema["@id"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
