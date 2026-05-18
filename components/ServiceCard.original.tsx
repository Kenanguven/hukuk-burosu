import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = service.icon;
  return (
    <Link
      href={`/hizmetler#${service.slug}`}
      className="group relative block rounded-2xl bg-cream-soft p-7 transition-all duration-300 hover:bg-cream hover:-translate-y-1.5 hover:shadow-[var(--shadow-warm)] border border-coffee/10 hover:border-coffee/25 overflow-hidden"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, #c5a572, #6b4423, transparent)",
        }}
      />

      <div className="flex items-start justify-between gap-4 relative">
        <span className="relative grid place-items-center w-12 h-12 rounded-xl bg-cream text-coffee-dark group-hover:bg-coffee-dark group-hover:text-cream transition-colors duration-300 border border-coffee/10">
          <Icon className="w-6 h-6" strokeWidth={1.6} />
        </span>
        <span className="font-mono text-xs text-ink-mute group-hover:text-coffee transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-serif text-coffee-deep">
        {service.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {service.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-coffee-deep">
        <span className="relative">
          Detay
          <span
            aria-hidden
            className="absolute left-0 -bottom-0.5 right-0 h-px bg-coffee origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
          />
        </span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
