import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Clock3,
  Handshake,
  FileCheck2,
  MessageCircle,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Process } from "@/components/Process";
import { Testimonials } from "@/components/Testimonials";
import { ServiceCard } from "@/components/ServiceCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const principles = [
  {
    icon: Handshake,
    title: "Müvekkille birebir iletişim",
    text: "Her dosya için size özel bir avukat atanır; süreç boyunca aynı muhatapla çalışırsınız.",
  },
  {
    icon: ShieldCheck,
    title: "Sır saklama yükümlülüğü",
    text: "Avukatlık Kanunu ve KVKK çerçevesinde tüm bilgileriniz şeffaf ve güvende kalır.",
  },
  {
    icon: Clock3,
    title: "Zaman değerlidir",
    text: "Mesajlarınıza aynı gün içinde dönüş yapıyor, dosyanızda düzenli bilgi notu paylaşıyoruz.",
  },
  {
    icon: FileCheck2,
    title: "Şeffaf ücretlendirme",
    text: "Yazılı avukatlık sözleşmesiyle çalışıyoruz; sürpriz ek ücret talep etmiyoruz.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-prose grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-5">
            <span className="eyebrow">Büro</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep leading-tight">
              {site.owner} liderliğinde, her dosyayı{" "}
              <span className="italic text-coffee">stratejik bir yol haritası</span> olarak ele alıyoruz.
            </h2>
          </FadeIn>

          <FadeIn delay={0.1} className="md:col-span-7 space-y-5 text-ink-soft leading-relaxed">
            <p>
              {site.shortName}; Ankara (Bilkent) ve İstanbul (Beşiktaş) ofisleriyle
              bireylere ve şirketlere ceza, aile, iş, ticaret, gayrimenkul,
              icra-iflas, miras ve idare hukuku alanlarında kapsamlı destek sunan
              bir hukuk bürosudur.
            </p>
            <p>
              İnsanların hukuki sürece dair en çok sorduğu soru &quot;şimdi ne olacak?&quot;
              sorusudur. Çalışma anlayışımızı bu sorunun cevabını net, anlaşılır ve
              zamanında verebilmek üzerine kurguladık. Sizi hukuk diline boğmadan,
              dosyanızın gerçekten bulunduğu yerden anlatıyoruz.
            </p>
            <Link
              href="/hakkimizda"
              className="inline-flex items-center gap-2 mt-2 text-coffee-deep font-medium hover:text-coffee transition-colors"
            >
              Büromuzu tanıyın
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream-soft py-20 md:py-28">
        <div className="container-prose">
          <FadeIn className="max-w-2xl">
            <span className="eyebrow">Uzmanlık Alanlarımız</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep">
              Hayatın her kavşağında, doğru hukuki adım.
            </h2>
            <p className="mt-4 text-ink-soft">
              Birden fazla disiplinde derinleşmiş bir ekiple çalışıyoruz. Dosyanızın
              ihtiyaç duyduğu uzmanlığı tek çatı altında bulursunuz.
            </p>
          </FadeIn>

          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <StaggerItem key={service.slug}>
                <ServiceCard service={service} index={idx} />
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1} className="mt-12 text-center">
            <Link href="/hizmetler" className="btn-ghost">
              Tüm hizmetleri incele
              <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      <Process />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-prose grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-5">
            <span className="eyebrow">Neden {site.shortName}?</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep leading-tight">
              Sıcak bir iletişim, soğukkanlı bir hukuk.
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Bir hukuk bürosundan beklediğiniz titizliği, premium bir danışmanlık
              deneyiminin netliğiyle birleştiriyoruz. Süreçleri karmaşıklaştırmadan,
              dosyanızın gerçek risklerini görünür hâle getiriyoruz.
            </p>
          </FadeIn>

          <Stagger className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <StaggerItem
                  key={p.title}
                  className="trust-sheen premium-card rounded-[1.65rem] p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-[1rem] bg-graphite text-cream">
                    <Icon className="w-5 h-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg text-coffee-deep">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {p.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 md:py-24">
        <div className="container-prose">
          <FadeIn className="relative overflow-hidden rounded-[2rem] bg-graphite text-cream p-10 shadow-[0_36px_90px_-54px_rgba(24,23,22,0.76)] md:p-16">
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-80 w-80 rounded-[45%] blur-3xl opacity-30"
              style={{ background: "linear-gradient(135deg, #c5a572 0%, transparent 70%)" }}
            />
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <span className="text-gold uppercase tracking-[0.18em] text-xs font-semibold">
                  Ücretsiz Ön Görüşme
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight">
                  Dosyanızı paylaşın, size en uygun yolu birlikte çizelim.
                </h2>
                <p className="text-cream-soft/80 max-w-xl">
                  20 dakikalık ücretsiz ön değerlendirme görüşmesinde sürecinizi,
                  beklenen süreyi ve tahmini maliyeti net bir biçimde konuşalım.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <Link
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-soft group"
                >
                  WhatsApp Web
                  <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-6" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
