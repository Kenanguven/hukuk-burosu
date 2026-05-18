"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Boşanma sürecinin en zor günlerinde hem hukuki hem insani açıdan yanımızda durdular. Her sorumu sabırla yanıtladılar; süreç bittiğinde sadece davayı değil, huzurumu da kazanmıştım.",
    initials: "A.K.",
    label: "Müvekkil · Aile Hukuku",
    gradient: "linear-gradient(140deg, #c5a572, #6b4423)",
  },
  {
    quote:
      "Şirketimizin uzun süreli danışmanlığı için tercih ettiğimiz büro. Sözleşmelerimizi inceleme hızları ve verdikleri yazılı görüşlerin netliği güven verici. Önerilerini eyleme dökerken karşılıksız kalmadık.",
    initials: "M.Y.",
    label: "Genel Müdür · Ticaret Hukuku",
    gradient: "linear-gradient(140deg, #a88968, #3e2723)",
  },
  {
    quote:
      "Haksız feshe karşı açtığımız davada her aşamada düzenli bilgi notu alarak süreci içeride yaşar gibi takip ettim. İşe iade kararı çıktığında bana ilk arayan onlar oldu.",
    initials: "E.D.",
    label: "Müvekkil · İş Hukuku",
    gradient: "linear-gradient(140deg, #d9bf94, #8b6f47)",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-cream-soft">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Müvekkillerimiz</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep">
            Yan yana yürüdüğümüz dosyalardan kalanlar.
          </h2>
          <p className="mt-4 text-ink-soft">
            Müvekkillerimizin önemli bir kısmı bize başka müvekkillerimizin
            tavsiyesiyle ulaşıyor. Onaylarıyla paylaşabildiğimiz birkaç söz.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.figure
              key={idx}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: idx * 0.1,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="relative rounded-3xl bg-cream p-8 md:p-9 border border-coffee/10 hover:border-coffee/15 hover:shadow-[0_20px_40px_-20px_rgba(107,68,35,0.2)] transition-all duration-500"
            >
              <Quote
                className="absolute top-6 right-6 w-9 h-9 text-gold/35"
                strokeWidth={1.2}
              />
              <div className="flex items-center gap-0.5 text-gold mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="font-serif text-lg text-coffee-deep leading-relaxed">
                <span className="text-gold/60 text-3xl leading-none">✦</span>
                <span className="mt-1 block">&quot;{t.quote}&quot;</span>
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-coffee/15 flex items-center gap-3.5">
                <motion.span
                  className="grid place-items-center w-12 h-12 rounded-full text-cream font-serif font-semibold text-base shrink-0"
                  style={{ background: t.gradient }}
                  whileHover={{ scale: 1.1 }}
                >
                  {t.initials}
                </motion.span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-coffee-deep">{t.initials}</p>
                  <p className="text-xs text-ink-mute uppercase tracking-wider font-medium">
                    {t.label}
                  </p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
