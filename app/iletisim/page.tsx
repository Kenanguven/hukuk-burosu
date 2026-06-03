import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "İletişim — Randevu ve WhatsApp Web",
  description: `KARDAK Hukuk Bürosu'na WhatsApp Web, e-posta ve online randevu formu üzerinden ulaşın. ${site.owner} dosyanız için en uygun dönüş kanalını belirlesin.`,
  alternates: { canonical: `${site.url}/iletisim` },
  openGraph: {
    title: `İletişim — Randevu ve WhatsApp Web | ${site.shortName}`,
    description: "Randevu talebi, WhatsApp Web ve e-posta üzerinden KARDAK Hukuk Bürosu'na ulaşabilirsiniz.",
    url: `${site.url}/iletisim`,
    type: "website",
  },
};

const primaryOffice = site.offices[0];
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  primaryOffice.mapQuery
)}&output=embed`;
const mapLink = primaryOffice.mapUrl;

const contactCards = [
  {
    icon: MessageCircle,
    title: "WhatsApp Web",
    value: primaryOffice.whatsappPhone,
    href: primaryOffice.whatsappUrl,
    external: true,
  },
  {
    icon: Mail,
    title: "Bize Yazın",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: MapPin,
    title: "Randevu Konumu",
    value: primaryOffice.shortAddress,
    href: primaryOffice.mapUrl,
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="İletişim"
        title={
          <>
            Randevu ve iletişim için <span className="italic text-coffee">bir mesaj</span>{" "}
            uzağınızdayız.
          </>
        }
        description="Dosyanız hakkında kısa bilgi paylaşabilir, WhatsApp Web ya da form üzerinden randevu talep edebilirsiniz. Randevu konumu Google Haritalar ve WhatsApp Web üzerinden netleştirilir."
      />

      <section className="pb-10">
        <div className="container-prose">
          <FadeIn className="overflow-hidden rounded-[2rem] border border-coffee/10 bg-cream-soft shadow-[var(--shadow-warm)]">
            <div className="relative h-[24rem] md:h-[31rem]">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,253,249,0.96), rgba(235,228,216,0.88)), linear-gradient(28deg, transparent 0 38%, rgba(128,105,78,0.24) 38% 40%, transparent 40% 100%), linear-gradient(152deg, transparent 0 44%, rgba(128,105,78,0.18) 44% 46%, transparent 46% 100%)",
                }}
              />
              <iframe
                title={`${site.shortName} randevu konumu haritası`}
                src={mapSrc}
                className="absolute inset-0 h-full w-full border-0 opacity-80 grayscale-[0.18] saturate-[0.82]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cream-soft/25 via-transparent to-graphite/10"
              />
              <div aria-hidden className="pointer-events-none absolute inset-0 opacity-70">
                <span className="absolute -left-16 top-[55%] h-7 w-[120%] -rotate-6 rounded-full bg-cream-soft/70 shadow-[inset_0_0_0_1px_rgba(128,105,78,0.16)]" />
                <span className="absolute left-[18%] -top-12 h-[120%] w-5 rotate-[18deg] rounded-full bg-cream-soft/60 shadow-[inset_0_0_0_1px_rgba(128,105,78,0.12)]" />
                <span className="absolute left-[54%] -top-20 h-[135%] w-4 -rotate-[28deg] rounded-full bg-cream-soft/50 shadow-[inset_0_0_0_1px_rgba(128,105,78,0.12)]" />
                <span className="absolute right-[18%] top-[22%] grid h-14 w-14 place-items-center rounded-full bg-coffee-dark text-cream shadow-[var(--shadow-warm)]">
                  <MapPin className="h-7 w-7" strokeWidth={1.6} />
                </span>
              </div>
              <div className="absolute left-4 right-4 top-4 z-10 rounded-[1.35rem] border border-coffee/10 bg-cream-soft/92 p-5 shadow-[var(--shadow-warm)] backdrop-blur-md md:left-6 md:right-auto md:top-6 md:max-w-sm md:p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-coffee-dark text-cream">
                    <Navigation className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-coffee">
                      Randevu Konumu
                    </p>
                    <h2 className="mt-1 font-serif text-xl leading-tight text-coffee-deep">
                      {primaryOffice.shortAddress}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      Görüşme saati ve dosya akışı WhatsApp Web üzerinden netleştirilir.
                    </p>
                    <a
                      href={mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-coffee/20 px-4 text-sm font-semibold text-coffee-deep transition-colors hover:bg-cream-warm"
                    >
                      Google Haritalar&apos;da Aç
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <Stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const content = (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-coffee-dark text-cream">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-coffee-deep">
                      {card.title}
                    </span>
                    <span className="mt-2 block break-words font-serif text-xl leading-tight text-ink">
                      {card.value}
                    </span>
                  </span>
                </>
              );

              return (
                <StaggerItem key={card.title} className="h-full">
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
                    className="flex h-full min-h-[9rem] flex-col gap-4 rounded-[1.45rem] border border-coffee/10 bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:border-coffee/20 hover:shadow-[var(--shadow-warm)]"
                  >
                    {content}
                  </a>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-prose grid grid-cols-1 gap-10 lg:grid-cols-12">
          <FadeIn className="lg:col-span-5">
            <div
              id="randevu-konumlari"
              className="scroll-mt-24 rounded-3xl border border-coffee/10 bg-cream-soft p-7 md:p-8"
            >
              <span className="eyebrow">Randevu Noktası</span>
              <h2 className="mt-4 font-serif text-2xl text-coffee-deep">
                Görüşme akışı dosyanıza göre planlanır.
              </h2>
              <div className="mt-6 space-y-4">
                {site.offices.map((office) => (
                  <div
                    key={office.slug}
                    id={office.slug}
                    className="rounded-2xl border border-coffee/10 bg-cream p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-serif text-xl text-coffee-deep">
                          {office.city} Randevu Noktası
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          {office.longAddress}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-cream-warm px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-coffee">
                        {office.barosu}
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <a
                        href={office.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-coffee/20 px-4 text-sm font-semibold text-coffee-deep transition-colors hover:bg-cream-warm"
                      >
                        WhatsApp Web
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-coffee/20 px-4 text-sm font-semibold text-coffee-deep transition-colors hover:bg-cream-warm"
                      >
                        Haritada Aç
                        <Navigation className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex gap-4 rounded-2xl border border-coffee/10 bg-cream p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coffee-dark text-cream">
                  <Clock className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-coffee">
                    Çalışma Saatleri
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{site.hours}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05} className="lg:col-span-7">
            <div className="rounded-3xl border border-coffee/10 bg-cream p-7 shadow-[var(--shadow-warm)] md:p-10">
              <h2 className="mb-2 font-serif text-2xl text-coffee-deep">
                Mesaj Gönderin
              </h2>
              <p className="mb-7 text-sm text-ink-soft">
                Dosyanız hakkında kısaca bilgi paylaşın; Av. Mahmut KARDAK size dönüş yapsın.
              </p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
