import type { Metadata } from "next";
import Link from "next/link";
import { Compass, BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { TeamCard } from "@/components/TeamCard";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { team } from "@/lib/team";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hakkımızda — KARDAK Hukuk Bürosu",
  description: `${site.name}: kurucu avukat ${site.owner} liderliğinde değerlerimiz, çalışma anlayışımız ve hukuki hizmet yaklaşımımız hakkında detaylı bilgi.`,
  alternates: { canonical: `${site.url}/hakkimizda` },
  openGraph: {
    title: `Hakkımızda | ${site.name}`,
    description: `${site.owner} liderliğinde çalışan KARDAK Hukuk Bürosu'nun değerleri, çalışma anlayışı ve hukuki hizmet yaklaşımı.`,
    url: `${site.url}/hakkimizda`,
    type: "website",
  },
};

const values = [
  {
    icon: Compass,
    title: "Yön gösterici",
    text: "Mevzuatın karmaşıklığında müvekkillerimize sade ve uygulanabilir yol haritaları sunmak.",
  },
  {
    icon: BookOpen,
    title: "Sürekli öğrenen",
    text: "Mevzuat ve içtihat değişikliklerini düzenli olarak takip eden, kendini geliştiren bir büro kültürü.",
  },
  {
    icon: Sparkles,
    title: "İnsan odaklı",
    text: "Her dosyanın arkasında bir insan hikâyesi olduğunu unutmadan, empatiyle çalışmak.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Hakkımızda"
        title={
          <>
            <span className="italic text-coffee">{site.shortName}</span>: birikim,
            empati ve özen üzerine kurulmuş bir hukuk pratiği.
          </>
        }
        description={`${site.owner} liderliğindeki büromuz, her büyüklükten gerçek kişi ve şirkete kapsamlı hukuki destek sunmaktadır. Bizi farklı kılan; her dosyaya gösterdiğimiz stratejik özen.`}
      />

      <section className="py-16 md:py-24 bg-cream-soft">
        <div className="container-prose grid grid-cols-1 md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-5">
            <span className="eyebrow">Hikâyemiz</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep leading-tight">
              Küçük bir büroda büyük bir vaatle başladık.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-7 space-y-5 text-ink-soft leading-relaxed">
            <p>
              {site.shortName}, kurucu avukatımız Av. {site.owner}{" "}tarafından,
              &quot;müvekkille yan yana çalışan bir hukuk bürosu&quot; anlayışıyla
              yapılandırıldı. Dosya stratejisinden iletişim ritmine kadar her
              adımda sade, ölçülü ve öngörülebilir bir çalışma düzeni hedeflenir.
            </p>
            <p>
              Bugün randevulu görüşme, çevrimiçi danışmanlık ve WhatsApp Web
              iletişimini aynı çalışma düzeni içinde kullanıyoruz. Türkiye
              genelindeki dosyaları, hangi adliyede olursa olsun aynı titizlikle
              takip edebiliyoruz.
            </p>
            <p>
              Her dosyayı kendine has bir hikâye olarak okuyor;
              karşılıklı güven, açık iletişim ve titiz dosya hazırlığını
              uygulamamızın temeli olarak kabul ediyor.
            </p>
            <p>
              Her başvuruda güven ilişkisini en baştan kurmaya özen gösteriyoruz.
              Açık iletişim, doğru beklenti yönetimi ve düzenli bilgilendirme bu
              yaklaşımın merkezinde yer alıyor.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream">
        <div className="container-prose">
          <FadeIn className="max-w-2xl">
            <span className="eyebrow">Değerlerimiz</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep">
              Her dosyada koruduğumuz üç temel.
            </h2>
          </FadeIn>

          <Stagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <StaggerItem
                  key={v.title}
                  className="rounded-2xl bg-cream-soft p-7 border border-coffee/10"
                >
                  <span className="grid place-items-center w-12 h-12 rounded-xl bg-coffee-dark text-cream">
                    <Icon className="w-6 h-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-coffee-deep">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {v.text}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-cream-soft">
        <div className="container-prose">
          <FadeIn className="max-w-2xl">
            <span className="eyebrow">Avukatımız</span>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep">
              Dosyanızı doğrudan takip eden kurucu avukat.
            </h2>
            <p className="mt-4 text-ink-soft">
              Şimdilik görünür avukat kadrosunda yalnızca Av. {site.owner} yer
              alıyor. Başvurular doğrudan kurucu avukat yaklaşımıyla
              değerlendiriliyor.
            </p>
          </FadeIn>

          <Stagger className="mt-12 grid max-w-md grid-cols-1 gap-5">
            {team.map((m, idx) => (
              <StaggerItem key={m.slug}>
                <TeamCard member={m} index={idx} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-prose">
          <FadeIn className="rounded-3xl bg-coffee-deep text-cream p-10 md:p-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight max-w-2xl mx-auto">
              Sizi de bir gün eski müvekkillerimizden biri olarak anmak isteriz.
            </h2>
            <Link href="/iletisim" className="btn-soft group mt-8">
              İletişime Geç
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
