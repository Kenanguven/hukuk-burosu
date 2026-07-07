import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { site, offices } from "@/lib/site";
import "./globals.css";

const searchBrandName = "KARDAK Hukuk & Danışmanlık";
const searchDescription =
  "Ankara'da ceza, aile, iş, ticaret, miras, gayrimenkul, icra-iflas ve idare hukuku alanlarında stratejik hukuki temsil ve danışmanlık.";

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
  applicationName: searchBrandName,
  title: {
    default: searchBrandName,
    template: `%s | ${searchBrandName}`,
  },
  description: searchDescription,
  keywords: [
    "Ankara avukat",
    "Ankara hukuk bürosu",
    "Çankaya avukat",
    "Mustafa Kemal avukat",
    "Maidan avukat",
    "Ankara boşanma avukatı",
    "Ankara ceza avukatı",
    "Ankara iş avukatı",
    "Ankara miras avukatı",
    "Ankara ticaret avukatı",
    "Ankara gayrimenkul avukatı",
    "Ankara icra avukatı",
    "boşanma davası Ankara",
    "miras davası Ankara",
    "işe iade davası Ankara",
    "kira uyarlama Ankara",
    "şirket kurulumu Ankara",
    "tapu iptal davası Ankara",
    "KARDAK Hukuk & Danışmanlık",
    "KARDAK Hukuk Bürosu",
    "Mahmut KARDAK avukat",
  ],
  alternates: {
    canonical: site.url,
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: searchBrandName,
    description: searchDescription,
    url: site.url,
    siteName: searchBrandName,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: searchBrandName,
    description: searchDescription,
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
  name: `${site.name} — ${office.city} Randevu Noktası`,
  alternateName: `${site.shortName} ${office.city}`,
  description: `${office.city} (${office.locality} / ${office.district}) randevu akışıyla ${site.name}; ceza, aile, iş, ticaret, gayrimenkul, miras, icra-iflas ve idare hukuku alanlarında bireylere ve şirketlere stratejik hukuki temsil sunar.`,
  url: `${site.url}/iletisim#${office.slug}`,
  email: site.email,
  telephone: office.whatsappRaw,
  parentOrganization: { "@id": `${site.url}#organization` },
  address: {
    "@type": "PostalAddress",
    streetAddress: office.streetAddress,
    addressLocality: office.locality,
    addressRegion: office.city,
    postalCode: office.postalCode,
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
  name: searchBrandName,
  alternateName: [site.name, site.shortName],
  url: site.url,
  logo: `${site.url}/kardak-hukuk.svg`,
  description: searchDescription,
  founder: {
    "@type": "Person",
    name: `Av. ${site.owner}`,
    jobTitle: site.ownerTitle,
  },
  location: offices.map((office) => ({
    "@type": "Place",
    "@id": `${site.url}#office-${office.slug}`,
    name: `${site.name} — ${office.city} Randevu Noktası`,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.locality,
      addressRegion: office.city,
      postalCode: office.postalCode,
      addressCountry: "TR",
    },
  })),
  areaServed: [
    { "@type": "City", name: "Ankara" },
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
  name: searchBrandName,
  alternateName: [site.name, site.shortName],
  description: searchDescription,
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
