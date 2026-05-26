"use client";

import type { PointerEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
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
        className="scene-preserve-3d relative aspect-[0.92] min-h-[24rem] w-full overflow-hidden rounded-[2.4rem] prestige-shell md:aspect-[0.86] md:min-h-[31rem]"
      >
        <motion.div
          aria-hidden
          animate={reduceMotion ? undefined : { rotate: [0, 4, -3, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="prestige-orbit depth-back absolute left-1/2 top-[17%] h-[19rem] w-[19rem] -translate-x-1/2 rounded-full"
        />

        <div className="depth-md-12 absolute inset-x-4 top-5 flex items-center justify-between gap-2 md:inset-x-7 md:top-7">
          <div className="premium-glass rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-coffee-deep md:px-3.5 md:text-xs">
            Randevulu Görüşme
          </div>
          <div className="premium-glass hidden rounded-full px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-coffee-deep md:block md:px-3.5 md:text-xs">
            <span className="md:hidden">Kurucu</span>
            <span className="hidden md:inline">{site.ownerTitle}</span>
          </div>
        </div>

        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="depth-md-44 absolute inset-x-5 top-[18%] rounded-[2rem] border border-cream-soft/24 bg-graphite/36 p-5 text-cream shadow-[0_38px_90px_-54px_rgba(17,16,15,0.85)] backdrop-blur-xl md:inset-x-8 md:top-[20%] md:p-8"
        >
          <div className="mx-auto grid h-28 w-28 place-items-center rounded-[1.75rem] bg-cream-soft/95 p-2 shadow-[0_28px_80px_-44px_rgba(255,244,207,0.8)] ring-1 ring-cream-soft/60 md:h-36 md:w-36 md:rounded-[2rem]">
            <Logo variant="gold" size={96} className="rounded-[1.55rem] md:h-[104px] md:w-[104px]" />
          </div>
          <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-cream-soft/78 md:mt-6">
            KARDAK Hukuk Bürosu
          </p>
        </motion.div>

        <div className="absolute inset-x-5 bottom-6 grid grid-cols-2 gap-2 md:inset-x-6">
          <Link
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream-soft/60 bg-gradient-to-b from-cream to-champagne/80 text-sm font-semibold text-coffee-deep shadow-[0_14px_30px_-18px_rgba(36,25,21,0.55)] ring-1 ring-inset ring-cream-soft/40 transition-[transform,box-shadow] duration-200 hover:shadow-[0_22px_40px_-22px_rgba(36,25,21,0.7)]"
          >
            <MessageCircle className="h-4 w-4 transition-transform group-hover:rotate-6" />
            WhatsApp
          </Link>
          <Link
            href="/iletisim"
            className="group inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-cream/42 bg-onyx/38 px-2 text-[0.82rem] font-semibold text-cream-soft shadow-[0_14px_30px_-18px_rgba(17,16,15,0.72)] backdrop-blur-md transition-colors duration-200 hover:border-aurum/60 hover:bg-onyx/52 sm:text-sm"
          >
            Randevu Formu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div
          aria-hidden
          className="absolute -bottom-24 left-1/2 h-52 w-[28rem] -translate-x-1/2 rounded-full bg-onyx/58 blur-3xl"
        />
      </motion.div>

      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-aurum/12 blur-3xl" />
    </motion.div>
  );
}
