"use client";

import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { site } from "@/lib/site";
import type { Member } from "@/lib/team";

const gradients = [
  "linear-gradient(140deg, #ece0cc 0%, #c5a572 100%)",
  "linear-gradient(140deg, #d9bf94 0%, #8b6f47 100%)",
  "linear-gradient(140deg, #f5ede0 0%, #a88968 100%)",
  "linear-gradient(140deg, #c5a572 0%, #6b4423 100%)",
];

export function TeamCard({ member, index = 0 }: { member: Member; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative rounded-3xl bg-cream-soft overflow-hidden border border-coffee/10 hover:border-coffee/20 hover:shadow-[0_20px_40px_-20px_rgba(107,68,35,0.25)] transition-all duration-500 hover:-translate-y-2"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ background: gradients[index % gradients.length] }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
        <motion.span
          className="absolute inset-0 grid place-items-center font-serif text-7xl text-cream/95 tracking-wide"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
        >
          {member.initials}
        </motion.span>
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-coffee-deep/50 to-transparent" />

        <motion.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -8 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href={`mailto:${site.email}?subject=${encodeURIComponent(member.name)} hakkında`}
            className="grid place-items-center w-10 h-10 rounded-full bg-cream/90 backdrop-blur text-coffee-deep hover:bg-cream border border-cream shadow-lg"
            aria-label={`${member.name} ile e-posta`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className="w-4.5 h-4.5" strokeWidth={1.8} />
          </motion.a>
          {site.social.linkedin && (
            <motion.a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="grid place-items-center w-10 h-10 rounded-full bg-cream/90 backdrop-blur text-coffee-deep hover:bg-cream border border-cream shadow-lg"
              aria-label={`${member.name} LinkedIn`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-4.5 h-4.5" strokeWidth={1.8} />
            </motion.a>
          )}
        </motion.div>
      </div>

      <div className="p-7 space-y-4">
        <div>
          <motion.h3
            className="font-serif text-2xl text-coffee-deep leading-tight"
            whileHover={{ color: "#6b4423" }}
          >
            {member.name}
          </motion.h3>
          <p className="text-xs text-coffee uppercase tracking-[0.15em] font-semibold mt-2">
            {member.title}
          </p>
        </div>
        <p className="text-sm text-ink-soft leading-relaxed">{member.bio}</p>
        {member.focus.length > 0 && (
          <motion.div
            className="flex flex-wrap gap-2 pt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {member.focus.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="text-[10px] uppercase tracking-wider font-semibold bg-coffee text-cream px-3 py-1.5 rounded-full border border-coffee/20 group-hover:border-gold/40 transition-colors"
              >
                {f}
              </motion.span>
            ))}
          </motion.div>
        )}
      </div>
    </motion.article>
  );
}
