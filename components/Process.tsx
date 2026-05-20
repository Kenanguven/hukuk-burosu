"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, Compass, Trophy } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "Tanışma",
    text: "İlk görüşmede dosyanızı dinler, en uygun çalışma yolunu birlikte belirleriz.",
  },
  {
    icon: Search,
    title: "Değerlendirme",
    text: "Belgeleri inceler, riski ve olası yolları yazılı bir bilgi notuyla paylaşırız.",
  },
  {
    icon: Compass,
    title: "Strateji",
    text: "Avukatlık sözleşmesini imzalar, takvim ve aksiyon planını birlikte belirleriz.",
  },
  {
    icon: Trophy,
    title: "Sonuç",
    text: "Süreci sizinle birlikte yürütür; her aşamada düzenli geri bildirim veririz.",
  },
];

export function Process() {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #c5a572 0%, transparent 70%)" }}
      />

      <div className="container-prose relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <span className="eyebrow">Çalışma Şeklimiz</span>
          <h2 className="mt-4 font-serif text-3xl md:text-4xl text-coffee-deep">
            İlk telefondan karara kadar, dört kısa adım.
          </h2>
          <p className="mt-4 text-ink-soft">
            Süreç boyunca aynı muhatabınız vardır. Hiçbir aşamada sürpriz bir
            ücret veya iletişim kopukluğu yaşamazsınız.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          <div
            aria-hidden
            className="absolute top-7 left-7 right-7 h-px hidden md:block"
            style={{
              backgroundImage:
                "linear-gradient(to right, transparent, rgba(139,111,71,0.35) 20%, rgba(139,111,71,0.35) 80%, transparent)",
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: idx * 0.1,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className="relative group"
                >
                  <div className="relative mb-6">
                    <motion.span
                      className="grid place-items-center w-16 h-16 rounded-2xl bg-cream-soft border border-coffee/15 text-coffee-deep relative z-10 group-hover:bg-cream group-hover:border-coffee/30 transition-all duration-300"
                      whileHover={{ scale: 1.08 }}
                    >
                      <Icon className="w-7 h-7" strokeWidth={1.5} />
                    </motion.span>
                    <span className="absolute -top-2 -right-3 text-xs font-mono font-semibold bg-coffee-deep text-cream rounded-full w-7 h-7 grid place-items-center z-20 group-hover:bg-coffee transition-colors">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-coffee-deep group-hover:text-coffee transition-colors duration-300">{step.title}</h3>
                  <p className="mt-2.5 text-sm text-ink-soft leading-relaxed">{step.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
