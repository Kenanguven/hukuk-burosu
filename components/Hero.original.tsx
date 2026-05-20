"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(60% 60% at 80% 0%, rgba(197,165,114,0.22), transparent 60%), radial-gradient(50% 50% at 0% 100%, rgba(139,111,71,0.16), transparent 60%), var(--color-cream)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.045] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="absolute top-24 -right-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-50 -z-10"
        style={{ background: "radial-gradient(circle, #d9bf94 0%, transparent 70%)" }}
      />

      <div className="container-prose pt-20 pb-28 md:pt-28 md:pb-36 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 bg-cream-soft/80 backdrop-blur border border-coffee/15 rounded-full pl-1.5 pr-5 py-1.5 text-sm"
          >
            <span className="grid place-items-center w-7 h-7 rounded-full bg-coffee-dark text-cream">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
            <span className="text-coffee-deep font-medium">
              {site.owner} · Randevulu görüşme
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-4xl md:text-6xl lg:text-[4.25rem] leading-[1.04] text-coffee-deep"
          >
            Hukuki sürecinizde{" "}
            <span className="italic text-coffee">sakin</span>,{" "}
            <span className="italic text-coffee">yakın</span> ve{" "}
            <span className="relative inline-block">
              <span className="relative z-10 italic text-coffee">titiz</span>
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[0.4em] bg-gold/40 -z-0 rounded-sm"
              />
            </span>{" "}
            bir yoldaşlık.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-lg text-ink-soft max-w-xl leading-relaxed"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <Link href="/iletisim" className="btn-primary group">
              Ön Görüşme Formu
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a href={`tel:${site.phoneRaw}`} className="btn-ghost group">
              <Phone className="w-4 h-4 transition-transform group-hover:-rotate-12" />
              {site.phone}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-5 pt-4"
          >
            <div className="flex -space-x-2">
              {["AM", "MA", "EY", "CD"].map((i, idx) => (
                <span
                  key={i}
                  className="w-9 h-9 rounded-full grid place-items-center text-xs font-medium text-cream border-2 border-cream"
                  style={{
                    background: [
                      "linear-gradient(140deg, #c5a572, #6b4423)",
                      "linear-gradient(140deg, #a88968, #4e2f15)",
                      "linear-gradient(140deg, #d9bf94, #8b6f47)",
                      "linear-gradient(140deg, #8b6f47, #3e2723)",
                    ][idx],
                  }}
                >
                  {i}
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-ink-soft mt-0.5">
                Düzenli bilgilendirme ve yazılı süreç takibi
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-30px_rgba(78,47,21,0.5)]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, #ece0cc 0%, #d9bf94 35%, #a88968 65%, #6b4423 100%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 grid place-items-center"
            >
              <svg
                viewBox="0 0 200 200"
                className="w-3/5 h-3/5 text-cream/95"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="100" y1="22" x2="100" y2="170" />
                <circle cx="100" cy="20" r="4.5" fill="currentColor" />
                <line x1="40" y1="70" x2="160" y2="70" />
                <line x1="60" y1="70" x2="40" y2="120" />
                <line x1="140" y1="70" x2="160" y2="120" />
                <path d="M22 120 Q50 134 78 120" />
                <path d="M122 120 Q150 134 178 120" />
                <rect x="76" y="170" width="48" height="6" rx="2" />
                <rect x="66" y="176" width="68" height="6" rx="2" />
              </svg>
            </motion.div>

            <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-coffee-deep/55 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-cream">
              <p className="font-serif text-2xl leading-snug">&quot;{site.tagline}&quot;</p>
              <p className="text-xs uppercase tracking-[0.18em] text-gold-soft mt-3">
                — {site.shortName}
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute -bottom-6 -left-8 bg-cream rounded-2xl shadow-[var(--shadow-warm-lg)] px-5 py-4 hidden md:block border border-coffee/10"
          >
            <p className="text-3xl font-serif text-coffee-deep">KVKK</p>
            <p className="text-xs uppercase tracking-widest text-ink-soft mt-1">
              gizlilik hassasiyeti
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10, rotate: 6 }}
            animate={{ opacity: 1, y: 0, rotate: 6 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -top-6 -right-4 bg-coffee-deep text-cream rounded-2xl shadow-[var(--shadow-warm-lg)] px-5 py-4 hidden md:block"
          >
            <div className="flex items-center gap-1 text-gold mb-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-current" />
              ))}
            </div>
            <p className="text-xs text-cream-soft/85">&quot;İlk günden son güne yanımdaydılar.&quot;</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
