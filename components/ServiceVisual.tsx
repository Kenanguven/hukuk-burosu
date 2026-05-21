import Image from "next/image";
import type { Service } from "@/lib/services";

export function ServiceVisual({
  service,
  index,
  variant = "card",
}: {
  service: Service;
  index: number;
  variant?: "card" | "wide";
}) {
  const Icon = service.icon;
  const tall = variant === "wide";

  return (
    <div
      className={`relative isolate overflow-hidden bg-onyx ${
        tall ? "min-h-[16rem] rounded-[1.6rem]" : "aspect-[16/10] rounded-t-[1.65rem]"
      }`}
    >
      <Image
        src={service.image.src}
        alt={service.image.alt}
        fill
        sizes={
          tall
            ? "(min-width: 768px) 38vw, 100vw"
            : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-onyx/0 via-onyx/10 to-onyx/58"
      />
      <div
        aria-hidden
        className="absolute inset-0 ring-1 ring-inset ring-cream/18"
      />

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cream/35 bg-onyx/38 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="max-w-[68%] truncate rounded-full border border-cream/30 bg-onyx/36 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cream-soft backdrop-blur-md">
          {service.title}
        </span>
      </div>

      <span className="absolute bottom-5 left-5 grid h-11 w-11 place-items-center rounded-[1rem] border border-cream/32 bg-onyx/42 text-cream shadow-[0_18px_40px_-24px_rgba(0,0,0,0.75)] backdrop-blur-md">
        <Icon className="h-5 w-5" strokeWidth={1.7} />
      </span>
    </div>
  );
}
