import type { Metadata } from "next";
import { Calculator, CheckCircle2 } from "lucide-react";
import { LegalCalculators } from "@/components/calculators/LegalCalculators";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hesaplama Araçları — İşe İade, Dava Harcı, Kıdem, İhbar ve Kira Artışı",
  description:
    "İşe iade hesaplama, dava harcı hesaplama, kıdem ve ihbar tazminatı, işçilik alacakları, net brüt maaş, işsizlik ödeneği, infaz ve kira artış hesaplama araçları.",
  alternates: { canonical: `${site.url}/hesaplama-araclari` },
  keywords: [
    "işe iade hesaplama",
    "dava harcı hesaplama",
    "işçilik alacakları hesaplama",
    "net brüt maaş hesaplama",
    "kıdem tazminatı hesaplama",
    "ihbar tazminatı hesaplama",
    "işsizlik ödeneği hesaplama",
    "infaz hesaplama",
    "kira artış hesaplama",
    "araç değer kaybı hesaplama",
    "KARDAK Hukuk hesaplama araçları",
  ],
  openGraph: {
    title: "Hesaplama Araçları | KARDAK Hukuk & Danışmanlık",
    description:
      "İşe iade, dava harcı, kıdem, ihbar, işçilik alacakları, işsizlik ödeneği, infaz, kira artışı ve araç değer kaybı için genel bilgilendirme amaçlı hesaplama araçları.",
    url: `${site.url}/hesaplama-araclari`,
    type: "website",
  },
};

const toolHighlights = [
  "İşe iade ve boşta geçen süre dökümü",
  "İşçilik alacakları ve net-brüt maaş hesabı",
  "Dava harcı, kira artışı ve infaz tahmini",
  "Araç değer kaybı Genel Şartlar formülü",
];

export default function CalculationToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hesaplama Araçları",
    url: `${site.url}/hesaplama-araclari`,
    description:
      "İşe iade hesaplama, dava harcı hesaplama, işçilik alacakları, net brüt maaş, işsizlik ödeneği, infaz, kira artışı ve araç değer kaybı hesaplama araçları.",
    isPartOf: {
      "@type": "WebSite",
      name: "KARDAK Hukuk & Danışmanlık",
      url: site.url,
    },
    publisher: {
      "@type": "LegalService",
      name: "KARDAK Hukuk Bürosu",
      telephone: site.phone,
      url: site.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="pt-14 pb-12 md:pt-20 md:pb-16">
        <div className="container-prose">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-coffee/10 bg-cream-soft px-4 py-2 text-sm font-semibold text-coffee-deep shadow-warm">
                <Calculator className="h-4 w-4 text-gold" />
                KARDAK Hukuk · Genel bilgilendirme araçları
              </div>
              <h1 className="mt-7 max-w-full break-words font-serif text-4xl leading-[1.02] text-coffee-deep sm:text-5xl md:text-7xl">
                Hesaplama <span className="block italic text-coffee sm:inline">Araçları</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft md:text-xl">
                İşe iade, dava harcı, işçilik alacakları, net-brüt maaş, işsizlik ödeneği, infaz, kira artışı ve araç değer kaybı için pratik, mobil uyumlu ve kalem kalem döküm veren hesaplama araçları.
              </p>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-[1.75rem] border border-coffee/10 bg-cream-soft/80 p-5 shadow-warm backdrop-blur-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-coffee">Sayfa kapsamı</p>
                <ul className="mt-4 space-y-3">
                  {toolHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LegalCalculators />
    </>
  );
}
