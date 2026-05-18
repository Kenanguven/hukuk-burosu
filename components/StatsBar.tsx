"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Briefcase, Users, Award, Clock3 } from "lucide-react";
import { site } from "@/lib/site";

const years = new Date().getFullYear() - site.founded;

const stats = [
  { icon: Clock3, value: years, suffix: "+", label: "Yıllık deneyim" },
  { icon: Briefcase, value: 1200, suffix: "+", label: "Sonuçlandırılan dosya" },
  { icon: Users, value: 500, suffix: "+", label: "Mutlu müvekkil" },
  { icon: Award, value: 8, suffix: "", label: "Uzmanlık alanı" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString("tr-TR"));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [inView, count, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-12 py-12 md:py-16">
      <div className="container-prose">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="premium-card rounded-[2rem] p-5 md:p-8"
        >
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {stats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="trust-sheen flex items-center gap-4 rounded-[1.35rem] px-3 py-5 transition-colors duration-300 hover:bg-cream-soft/70 md:gap-5 md:px-5 md:py-5"
                >
                  <motion.span
                    className="trust-pulse grid h-14 w-14 shrink-0 place-items-center rounded-[1.1rem] bg-graphite text-cream transition-transform duration-300 group-hover:scale-110"
                    whileHover={{ rotate: 8 }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </motion.span>
                  <div className="min-w-0">
                    <p className="font-serif text-3xl leading-none text-coffee-deep md:text-4xl">
                      <Counter to={s.value} />
                      {s.suffix}
                    </p>
                    <p className="mt-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink-mute">
                      {s.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
