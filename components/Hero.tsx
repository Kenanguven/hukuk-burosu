"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  FileCheck2,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { PrestigeScene } from "@/components/PrestigeScene";
import { site } from "@/lib/site";

const trustBadges = [
  { icon: FileCheck2, label: "Yazılı sözleşme" },
  { icon: ShieldCheck, label: "KVKK süreçleri" },
  { icon: Clock3, label: "Hızlı dönüş" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 72% 18%, rgba(214,179,106,0.24), transparent 32rem), linear-gradient(180deg, rgba(255,253,249,0.97) 0%, rgba(246,241,232,0.92) 45%, rgba(226,215,197,0.76) 100%)",
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
        className="absolute top-12 right-0 h-[38rem] w-[38rem] rounded-[45%] blur-3xl opacity-35 -z-10"
        style={{ background: "linear-gradient(135deg, rgba(214,179,106,0.72), rgba(138,97,54,0.2), transparent)" }}
      />

      <div className="absolute inset-y-0 left-0 w-px bg-coffee/10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 180 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="absolute top-12 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </div>
      <div className="absolute inset-y-0 right-0 w-px bg-coffee/10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 180 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="absolute bottom-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        />
      </div>

      <div className="container-prose grid grid-cols-1 items-center gap-12 pb-28 pt-20 md:grid-cols-12 md:pb-36 md:pt-28">
        <div className="min-w-0 space-y-7 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="trust-sheen premium-glass inline-flex max-w-full items-center gap-3 rounded-[1.35rem] py-1.5 pl-1.5 pr-4 text-sm sm:rounded-full sm:pr-5"
          >
            <span className="trust-pulse grid place-items-center w-7 h-7 rounded-full bg-coffee-dark text-cream">
              <ShieldCheck className="w-3.5 h-3.5" strokeWidth={2} />
            </span>
            <span className="min-w-0 text-coffee-deep font-medium leading-snug">
              {site.owner} · Randevulu görüşme ve WhatsApp Web
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, filter: "blur(10px)", y: 18 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl font-serif text-5xl leading-[0.95] text-coffee-deep md:text-7xl lg:text-[5.35rem]"
          >
            {site.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="max-w-2xl font-serif text-2xl italic leading-snug text-coffee md:text-3xl"
          >
            {site.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="max-w-2xl text-lg leading-relaxed text-ink-soft md:text-xl"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.25 }}
            className="flex flex-wrap gap-2.5"
          >
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <span
                  key={badge.label}
                  className="trust-sheen premium-card inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-coffee-deep"
                >
                  <Icon className="w-3.5 h-3.5 text-coffee" strokeWidth={1.8} />
                  {badge.label}
                </span>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.38 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary group"
              >
                WhatsApp Web
                <MessageCircle className="w-4 h-4 transition-transform group-hover:rotate-6" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/iletisim" className="btn-ghost group">
                Ön Görüşme Formu
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>

        </div>

        <div className="min-w-0 md:col-span-5">
          <PrestigeScene />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-coffee/10">
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 220 }}
          transition={{ duration: 0.9, delay: 0.75 }}
          className="absolute left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </div>
    </section>
  );
}
