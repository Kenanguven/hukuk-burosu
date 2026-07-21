import type { Metadata } from "next";
import { Calculator, CheckCircle2 } from "lucide-react";
import { LegalCalculators } from "@/components/calculators/LegalCalculators";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hesaplama Araçları — Kıdem, İhbar ve Araç Değer Kaybı",
  description:
    "Kıdem tazminatı hesaplama, ihbar tazminatı hesaplama, araç değer kaybı hesaplama İstanbul ve Ankara için genel bilgilendirme amaçlı hukuki hesaplama araçları.",
  alternates: { canonical: `${site.url}/hesaplama-araclari` },
  keywords: [
    "kıdem tazminatı hesaplama",
    "ihbar tazminatı hesaplama",
    "araç değer kaybı hesaplama",
    "araç değer kaybı hesaplama İstanbul",
    "işe başlatmama tazminatı hesaplama",
    "kötüniyet tazminatı hesaplama",
    "KARDAK Hukuk hesaplama araçları",
  ],
  openGraph: {
    title: "Hesaplama Araçları | KARDAK Hukuk & Danışmanlık",
    description:
      "Kıdem, ihbar, araç değer kaybı, işe başlatmama ve kötüniyet tazminatı için genel bilgilendirme amaçlı hesaplama araçları.",
    url: `${site.url}/hesaplama-araclari`,
    type: "website",
  },
};

const toolHighlights = [
  "Kıdem tazminatı brüt/net döküm",
  "İhbar süresi ve kesinti hesabı",
  "Araç değer kaybı Genel Şartlar formülü",
  "İşe başlatmama ve kötüniyet aralığı",
];

export default function CalculationToolsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Hesaplama Araçları",
    url: `${site.url}/hesaplama-araclari`,
    description:
      "Kıdem tazminatı hesaplama, ihbar tazminatı hesaplama, araç değer kaybı hesaplama ve işe başlatmama tazminatı hesaplama araçları.",
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
              <h1 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] text-coffee-deep md:text-7xl">
                Hesaplama <span className="italic text-coffee">Araçları</span>
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-soft md:text-xl">
                Kıdem tazminatı, ihbar tazminatı, araç değer kaybı ve işe başlatmama tazminatı için pratik, mobil uyumlu ve kalem kalem döküm veren hesaplama araçları.
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
