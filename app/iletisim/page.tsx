import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn } from "@/components/MotionWrapper";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim — Ankara (Bilkent) ve İstanbul (Beşiktaş) Ofisleri",
  description: `KARDAK Hukuk Bürosu Ankara (Bilkent) ve İstanbul (Beşiktaş) ofislerine ulaşın. WhatsApp Web, e-posta ve online randevu formu üzerinden ${site.owner} ve ekibine her iki şehirden de erişebilirsiniz.`,
  alternates: { canonical: `${site.url}/iletisim` },
  openGraph: {
    title: `İletişim — Ankara & İstanbul Avukat | ${site.shortName}`,
    description: "Ankara Bilkent ve İstanbul Beşiktaş ofislerimize ulaşmak için WhatsApp Web, e-posta veya online form kullanabilirsiniz.",
    url: `${site.url}/iletisim`,
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={
          <>
            Ankara ve İstanbul ofislerimiz <span className="italic text-coffee">bir konuşma</span>{" "}
            uzaktayız.
          </>
        }
        description="Bilkent (Ankara) veya Beşiktaş (İstanbul) ofislerimizden hangisi size yakınsa randevu talep edebilir, dosyanızı paylaşabilirsiniz. En geç bir iş günü içinde dönüş yapıyoruz."
      />

      <section className="pb-20">
        <div className="container-prose grid grid-cols-1 lg:grid-cols-12 gap-10">
          <FadeIn className="lg:col-span-5 space-y-6">
            <div className="space-y-5">
              {site.offices.map((office) => (
                <div
                  key={office.slug}
                  id={office.slug}
                  className="scroll-mt-24 rounded-3xl bg-cream-soft p-7 md:p-8 border border-coffee/10 space-y-4"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="font-serif text-2xl text-coffee-deep">
                      {office.city} Ofisi
                    </h2>
                    <span className="text-[0.68rem] uppercase tracking-[0.2em] text-coffee">
                      {office.barosu}
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-coffee-dark text-cream shrink-0">
                        <MapPin className="w-5 h-5" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-coffee mb-0.5">
                          Adres
                        </p>
                        <p className="text-ink-soft leading-relaxed">{office.longAddress}</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-coffee-dark text-cream shrink-0">
                        <MessageCircle className="w-5 h-5" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-widest text-coffee mb-0.5">
                          WhatsApp Web
                        </p>
                        <a
                          href={office.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ink-soft hover:text-coffee-deep transition-colors"
                        >
                          {office.whatsappPhone}
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>

            <div className="rounded-3xl bg-cream p-7 md:p-8 border border-coffee/10 space-y-4">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-coffee-dark text-cream shrink-0">
                    <Mail className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-coffee mb-0.5">
                      E-posta
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-ink-soft hover:text-coffee-deep transition-colors"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid place-items-center w-10 h-10 rounded-xl bg-coffee-dark text-cream shrink-0">
                    <Clock className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-coffee mb-0.5">
                      Çalışma Saatleri
                    </p>
                    <p className="text-ink-soft">{site.hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="prestige-shell relative overflow-hidden rounded-3xl p-7 text-cream shadow-[var(--shadow-prestige)] md:p-8">
              <div className="relative space-y-4">
                <span className="grid h-12 w-12 place-items-center rounded-2xl gold-foil text-graphite">
                  <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h2 className="font-serif text-2xl text-cream">
                  Konum bilgisi randevu sırasında paylaşılır.
                </h2>
                <p className="text-sm leading-relaxed text-cream-soft/82">
                  Bilkent (Ankara) ve Beşiktaş (İstanbul) ofislerimiz için tam adres bilgisini
                  WhatsApp Web üzerinden hızlıca paylaşıyoruz.
                </p>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-cream px-5 text-sm font-semibold text-coffee-deep transition-colors hover:bg-gold"
                >
                  WhatsApp Web
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-7">
            <div className="rounded-3xl bg-cream p-7 md:p-10 border border-coffee/10 shadow-[var(--shadow-warm)]">
              <h2 className="font-serif text-2xl text-coffee-deep mb-2">
                Mesaj Gönderin
              </h2>
              <p className="text-sm text-ink-soft mb-7">
                Dosyanız hakkında kısaca bilgi paylaşın; en uygun avukatımız size dönüş yapsın.
              </p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
