import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      className="trust-sheen premium-card group relative block overflow-hidden rounded-[1.65rem] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-coffee/25 hover:shadow-[var(--shadow-warm-lg)] md:p-8"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, #c5a572, #6b4423, #c5a572, transparent)",
        }}
      />

      <p className="mb-7 font-mono text-xs tracking-wider text-ink-mute">
        {String(index + 1).padStart(2, "0")}
      </p>

      <span className="grid h-14 w-14 place-items-center rounded-[1.2rem] bg-cream-warm/70 text-coffee-dark ring-1 ring-coffee/10 transition-colors duration-300 group-hover:bg-champagne/70">
        <Icon className="w-6 h-6" strokeWidth={1.6} />
      </span>

      <h3 className="mt-6 font-serif text-xl text-coffee-deep transition-colors duration-300 group-hover:text-coffee">
        {service.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        {service.short}
      </p>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-coffee-deep">
        Detay
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
