"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, FileCheck2, MessagesSquare, ShieldCheck } from "lucide-react";

const assurances = [
  {
    icon: ClipboardCheck,
    title: "Dosya stratejisi",
    text: "İlk değerlendirmeden sonra uygulanabilir bir yol haritası çıkarılır.",
  },
  {
    icon: FileCheck2,
    title: "Yazılı süreç",
    text: "Ücret, kapsam ve çalışma düzeni yazılı sözleşmeyle netleşir.",
  },
  {
    icon: MessagesSquare,
    title: "Düzenli bilgilendirme",
    text: "Önemli gelişmeler sade bir dille ve zamanında paylaşılır.",
  },
  {
    icon: ShieldCheck,
    title: "Gizlilik hassasiyeti",
    text: "Müvekkil bilgileri sır saklama yükümlülüğü ve KVKK kapsamında korunur.",
  },
];

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-12 py-12 md:py-16">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="authority-panel rounded-[2rem] p-5 md:p-7"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {assurances.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="authority-tile trust-sheen flex h-full min-h-[9.5rem] flex-col rounded-[1.35rem] px-4 py-5 transition-colors duration-300"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[1rem] border border-gold-soft/25 bg-cream-soft/8 text-gold-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <h2 className="mt-4 font-serif text-xl leading-tight text-cream-soft">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-cream-soft/72">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
