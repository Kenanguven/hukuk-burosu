import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { ServiceVisual } from "@/components/ServiceVisual";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çalışma Alanları — Hukuk Hizmetleri",
  description:
    "KARDAK Hukuk Bürosu; ceza, aile, iş, ticaret, gayrimenkul, icra-iflas, idare-vergi hukuku ve sürekli hukuki danışmanlık alanlarında bireylere ve şirketlere stratejik hukuki temsil sunar.",
  alternates: { canonical: `${site.url}/hizmetler` },
  openGraph: {
    title: "Çalışma Alanları | KARDAK Hukuk Bürosu",
    description:
      "Hukuk hizmetlerimiz: ceza, aile, iş, ticaret, gayrimenkul, icra-iflas, idare-vergi ve sürekli danışmanlık.",
    url: `${site.url}/hizmetler`,
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Uzmanlık Alanlarımız"
        title={
          <>
            Hayatın her kavşağında <span className="italic text-coffee">doğru hukuki adım</span>.
          </>
        }
        description="Bireylere ve şirketlere; ceza, aile, iş, ticaret, gayrimenkul, icra-iflas ve idare hukuku alanlarında uçtan uca destek sunuyoruz."
      />

      <section className="pb-12">
        <div className="container-prose">
          <FadeIn className="rounded-[1.75rem] border border-coffee/8 bg-cream-soft/55 p-6 md:p-8 backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-ink-mute">
                Kategoriler
              </span>
              <span aria-hidden className="h-px flex-1 bg-coffee/10" />
              <span className="text-[0.68rem] tabular-nums tracking-[0.18em] text-ink-mute">
                {String(services.length).padStart(2, "0")}
              </span>
            </div>
            <Stagger className="mt-5 flex flex-wrap gap-1.5">
              {services.map((s) => {
                const Icon = s.icon;
                return (
                  <StaggerItem key={s.slug}>
                    <a href={`#${s.slug}`} className="chip-premium">
                      <span className="chip-dot">
                        <Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </span>
                      {s.title}
                    </a>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </FadeIn>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose space-y-4">
          {services.map((s, idx) => {
            const Icon = s.icon;
            const reverse = idx % 2 === 1;
            return (
              <FadeIn
                key={s.slug}
                delay={0.05}
                className="scroll-mt-24"
              >
                <article
                  id={s.slug}
                  className={`grid grid-cols-1 items-start gap-8 rounded-3xl p-8 md:grid-cols-12 md:p-12 ${
                    idx % 2 === 0 ? "bg-cream-soft" : "bg-cream-warm/70"
                  } border border-coffee/10`}
                >
                  <div className={`md:col-span-7 space-y-5 ${reverse ? "md:order-2" : ""}`}>
                    <span className="grid place-items-center w-14 h-14 rounded-2xl bg-coffee-dark text-cream">
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-coffee-deep">
                      {s.title}
                    </h2>
                    <p className="text-ink-soft leading-relaxed">{s.long}</p>
                  </div>

                  <div className={`md:col-span-5 ${reverse ? "md:order-1" : ""}`}>
                    <ServiceVisual service={s} index={idx} variant="wide" />
                    <Stagger className="mt-4 grid grid-cols-1 gap-2.5">
                      {s.bullets.map((b) => (
                        <StaggerItem
                          key={b}
                          className="flex items-start gap-3 rounded-xl border border-coffee/10 bg-cream px-4 py-3.5"
                        >
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/30 text-coffee-deep">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                          <span className="text-sm leading-snug text-ink-soft">{b}</span>
                        </StaggerItem>
                      ))}
                    </Stagger>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose">
          <FadeIn className="rounded-3xl bg-coffee-deep text-cream p-10 md:p-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
                Aradığınız alanı listede göremediniz mi?
              </h2>
              <p className="text-cream-soft/80 max-w-xl">
                Listemizde olmayan bir dosyanız varsa lütfen yine bizimle iletişime
                geçin. Doğru avukata ulaşmanız için sizi yönlendirebiliriz.
              </p>
            </div>
            <div className="md:col-span-4 md:justify-self-end">
              <Link href="/iletisim" className="btn-soft group">
                Bize Ulaşın
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
