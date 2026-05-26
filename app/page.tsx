import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Clock3,
  Handshake,
  FileCheck2,
} from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { Process } from "@/components/Process";
import { ServiceCard } from "@/components/ServiceCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { posts } from "@/lib/posts";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

const principles = [
  {
    icon: Handshake,
    title: "Müvekkille birebir iletişim",
    text: "Başvurularınız Av. Mahmut KARDAK tarafından değerlendirilir; süreç boyunca aynı muhatapla çalışırsınız.",
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

const featuredPosts = posts.slice(0, 3);

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
              {site.shortName}; bireylere ve şirketlere ceza, aile, iş, ticaret,
              gayrimenkul, icra-iflas, miras ve idare hukuku alanlarında kapsamlı
              destek sunan, randevulu görüşme ve WhatsApp Web akışını birlikte
              kullanan bir hukuk bürosudur.
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
              Birden fazla çalışma alanında derinleşmiş bir büro yaklaşımıyla
              çalışıyoruz. Dosyanızın ihtiyaç duyduğu hukuki çerçeveyi tek çatı
              altında değerlendirirsiniz.
            </p>
          </FadeIn>

          <Stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, idx) => (
              <StaggerItem key={service.slug} className="h-full">
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

      <section className="bg-cream-soft py-20 md:py-28">
        <div className="container-prose">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end">
            <FadeIn className="md:col-span-8">
              <span className="eyebrow">Yayınlar</span>
              <h2 className="mt-4 font-serif text-3xl text-coffee-deep md:text-4xl">
                Hukuki süreçleri anlaşılır kılan kısa rehberler.
              </h2>
              <p className="mt-4 max-w-2xl text-ink-soft">
                Güncel uygulama, dava hazırlığı ve sık karşılaşılan hukuki
                sorular için hazırladığımız yazılar.
              </p>
            </FadeIn>
            <FadeIn delay={0.05} className="md:col-span-4 md:text-right">
              <Link href="/blog" className="btn-ghost">
                Tüm yayınlar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </FadeIn>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full min-h-[18rem] flex-col rounded-[1.65rem] border border-coffee/10 bg-cream p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-cream-warm/70 hover:shadow-[var(--shadow-warm)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full border border-coffee/15 bg-cream-soft px-3 py-1 text-xs uppercase tracking-widest text-coffee">
                      {post.category}
                    </span>
                    <ArrowUpRight className="h-5 w-5 -translate-x-1 text-ink-mute opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl leading-tight text-coffee-deep">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-coffee-deep">
                    Yazıyı oku
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-cream py-20 md:py-28">
        <div className="container-prose grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-5">
            <span className="eyebrow">Neden {site.shortName}?</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep leading-tight">
              Sıcak bir iletişim, soğukkanlı bir hukuk.
            </h2>
            <p className="mt-4 text-ink-soft leading-relaxed">
              Bir hukuk bürosundan beklediğiniz titizliği, özenli ve anlaşılır bir
              çalışma düzeniyle birleştiriyoruz. Süreçleri karmaşıklaştırmadan,
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
    </>
  );
}
