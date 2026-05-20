import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FadeIn } from "@/components/MotionWrapper";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular — KARDAK Hukuk Bürosu",
  description:
    "KARDAK Hukuk Bürosu'nda ücretlendirme, dava süreleri, vekaletname, çevrimiçi görüşme, randevu planlama ve gizlilik hakkında sık sorulan sorular.",
  alternates: { canonical: `${site.url}/sss` },
  openGraph: {
    title: `Sık Sorulan Sorular | ${site.shortName}`,
    description:
      "Avukatlık hizmetleri, ücretlendirme, dava süreleri ve çalışma anlayışımız hakkında en sık sorulan sorular ve cevaplar.",
    url: `${site.url}/sss`,
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <PageHero
        eyebrow="Sık Sorulan Sorular"
        title={
          <>
            Sık duyduğumuz <span className="italic text-coffee">soruları</span> bir araya getirdik.
          </>
        }
        description="Bir avukata ulaşmadan önce kafanızdaki temel soruların cevaplarını burada bulabilirsiniz. Aradığınızı bulamazsanız bize yazın; aynı gün dönüş yapıyoruz."
      />

      <section className="pb-20">
        <div className="container-prose max-w-4xl">
          <FadeIn>
            <FaqAccordion items={faqs} />
          </FadeIn>

          <FadeIn delay={0.1} className="mt-12 rounded-3xl bg-cream-soft p-10 text-center border border-coffee/10">
            <h2 className="font-serif text-2xl md:text-3xl text-coffee-deep">
              Sorunuzun cevabı burada yok mu?
            </h2>
            <p className="mt-3 text-ink-soft max-w-xl mx-auto">
              Bize yazın, en geç aynı gün içinde dönüş yapalım.
            </p>
            <Link
              href="/iletisim"
              className="btn-primary mt-7 justify-center"
            >
              Sorunuzu İletin
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
