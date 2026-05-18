"use client";

import type { PointerEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Logo } from "@/components/Logo";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export function PrestigeScene() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, [-1, 1], [-9, 9]), {
    stiffness: 110,
    damping: 22,
  });
  const rotateX = useSpring(useTransform(pointerY, [-1, 1], [7, -7]), {
    stiffness: 110,
    damping: 22,
  });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.45, ease }}
      className="scene-perspective relative mx-auto w-full max-w-[20.75rem] sm:max-w-[24rem] md:max-w-[34rem]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={reduceMotion ? undefined : { rotateX, rotateY }}
        className="scene-preserve-3d relative aspect-[0.86] min-h-[31rem] overflow-hidden rounded-[2.4rem] prestige-shell"
      >
        <motion.div
          aria-hidden
          animate={reduceMotion ? undefined : { rotate: [0, 4, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="prestige-orbit depth-back absolute left-1/2 top-[17%] h-[19rem] w-[19rem] -translate-x-1/2 rounded-full"
        />

        <div className="depth-12 absolute inset-x-4 top-5 flex items-center justify-between gap-2 md:inset-x-7 md:top-7">
          <div className="premium-glass rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-coffee-deep md:px-3.5 md:text-xs">
            Ankara · İstanbul
          </div>
          <div className="premium-glass hidden rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-coffee-deep md:block md:px-3.5 md:text-xs">
            <span className="md:hidden">Kurucu</span>
            <span className="hidden md:inline">{site.ownerTitle}</span>
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="depth-44 absolute inset-x-5 top-[20%] rounded-[2rem] border border-cream-soft/24 bg-graphite/36 p-6 text-cream shadow-[0_38px_90px_-54px_rgba(17,16,15,0.85)] backdrop-blur-xl md:inset-x-8 md:p-8"
        >
          <div className="mx-auto grid h-40 w-40 place-items-center rounded-[2rem] bg-cream-soft/95 p-2 shadow-[0_28px_80px_-44px_rgba(255,244,207,0.8)] ring-1 ring-cream-soft/60 md:h-44 md:w-44">
            <Logo mode="lockup" size={160} className="rounded-[1.55rem]" />
          </div>
          <p className="mt-6 text-center text-xs font-semibold uppercase tracking-[0.22em] text-cream-soft/78">
            Kardak Hukuk Bürosu
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16, rotate: 7 }}
          animate={{ opacity: 1, x: 0, rotate: 7 }}
          transition={{ duration: 0.65, delay: 1.05, ease }}
          className="depth-28 absolute bottom-10 right-5 hidden rounded-[1.45rem] bg-onyx/88 px-4 py-3 text-cream shadow-[0_28px_80px_-48px_rgba(17,16,15,0.82)] backdrop-blur-xl md:block"
        >
          <div className="flex items-center gap-1.5 text-aurum">
            <Sparkles className="h-4 w-4" strokeWidth={1.6} />
            <span className="text-xs font-semibold uppercase tracking-[0.16em]">
              Premium
            </span>
          </div>
          <p className="mt-2 text-sm text-cream-soft/82">{site.owner}</p>
        </motion.div>

        <div className="depth-44 absolute inset-x-5 bottom-6 grid grid-cols-2 gap-2 md:inset-x-6">
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream-soft/60 bg-gradient-to-b from-cream to-champagne/80 text-sm font-semibold text-coffee-deep shadow-[0_14px_30px_-18px_rgba(36,25,21,0.55)] ring-1 ring-inset ring-cream-soft/40 transition-[transform,box-shadow] duration-200 hover:shadow-[0_22px_40px_-22px_rgba(36,25,21,0.7)]"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-6" />
            WhatsApp
          </Link>
          <a
            href={`tel:${site.phoneRaw}`}
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/25 bg-cream/10 text-sm font-semibold text-cream backdrop-blur-md transition-colors duration-200 hover:border-aurum/55 hover:bg-cream/18"
          >
            <Phone className="h-4 w-4 transition-transform group-hover:-rotate-12" />
            Ara
          </a>
        </div>

        <div
          aria-hidden
          className="absolute -bottom-24 left-1/2 h-52 w-[28rem] -translate-x-1/2 rounded-full bg-onyx/58 blur-3xl"
        />
      </motion.div>

      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-aurum/12 blur-3xl" />

      <Link
        href="/iletisim"
        className="premium-glass absolute -bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-coffee-deep transition-transform hover:-translate-y-1 md:inline-flex"
      >
        Randevu Akışına Geç
        <ArrowRight className="h-4 w-4" />
      </Link>
    </motion.div>
  );
}
