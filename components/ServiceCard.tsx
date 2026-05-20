import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceVisual } from "@/components/ServiceVisual";
import type { Service } from "@/lib/services";

export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  return (
    <Link
      href={`/hizmetler#${service.slug}`}
      className="premium-card group relative flex h-full min-h-[29rem] flex-col overflow-hidden rounded-[1.65rem] transition-all duration-300 hover:-translate-y-1 hover:border-coffee/25 hover:shadow-[var(--shadow-warm-lg)]"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{
          background:
            "linear-gradient(to right, transparent, #c5a572, #6b4423, #c5a572, transparent)",
        }}
      />

      <ServiceVisual service={service} index={index} />

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <h3 className="font-serif text-xl text-coffee-deep transition-colors duration-300 group-hover:text-coffee">
          {service.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {service.short}
        </p>

        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-coffee-deep">
          Detay
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
