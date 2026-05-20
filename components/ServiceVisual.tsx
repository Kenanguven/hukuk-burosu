import type { Service } from "@/lib/services";

type VisualConfig = {
  label: string;
  background: string;
  glow: string;
};

const visualConfigs: Record<string, VisualConfig> = {
  ceza: {
    label: "Soruşturma ve savunma dosyaları",
    background:
      "radial-gradient(circle at 72% 24%, rgba(255,253,249,0.42), transparent 17rem), linear-gradient(135deg, #221815 0%, #6f4524 46%, #d1ad72 100%)",
    glow: "rgba(197,165,114,0.42)",
  },
  aile: {
    label: "Aile, velayet ve mal rejimi süreçleri",
    background:
      "radial-gradient(circle at 24% 28%, rgba(255,253,249,0.58), transparent 16rem), linear-gradient(135deg, #3c2722 0%, #9a7355 48%, #ead7b6 100%)",
    glow: "rgba(234,215,182,0.5)",
  },
  is: {
    label: "İş ilişkileri ve sözleşme süreçleri",
    background:
      "radial-gradient(circle at 76% 18%, rgba(255,253,249,0.46), transparent 15rem), linear-gradient(135deg, #171717 0%, #5d5348 45%, #c7b08b 100%)",
    glow: "rgba(199,176,139,0.44)",
  },
  ticaret: {
    label: "Şirket ve ticari sözleşme süreçleri",
    background:
      "radial-gradient(circle at 26% 22%, rgba(255,253,249,0.5), transparent 15rem), linear-gradient(135deg, #161414 0%, #614526 42%, #c5a572 100%)",
    glow: "rgba(197,165,114,0.46)",
  },
  gayrimenkul: {
    label: "Tapu, kira ve taşınmaz süreçleri",
    background:
      "radial-gradient(circle at 70% 28%, rgba(255,253,249,0.52), transparent 16rem), linear-gradient(135deg, #1d211c 0%, #5c6a53 45%, #d8c49b 100%)",
    glow: "rgba(216,196,155,0.44)",
  },
  icra: {
    label: "İcra takibi ve alacak yönetimi",
    background:
      "radial-gradient(circle at 26% 24%, rgba(255,253,249,0.5), transparent 15rem), linear-gradient(135deg, #211714 0%, #76503a 48%, #dac195 100%)",
    glow: "rgba(218,193,149,0.45)",
  },
  idare: {
    label: "İdare ve vergi uyuşmazlıkları",
    background:
      "radial-gradient(circle at 74% 20%, rgba(255,253,249,0.5), transparent 15rem), linear-gradient(135deg, #181b1c 0%, #4f6060 46%, #cbb991 100%)",
    glow: "rgba(203,185,145,0.42)",
  },
  danismanlik: {
    label: "Sürekli hukuki danışmanlık",
    background:
      "radial-gradient(circle at 28% 20%, rgba(255,253,249,0.52), transparent 16rem), linear-gradient(135deg, #171312 0%, #70543b 46%, #e5c990 100%)",
    glow: "rgba(229,201,144,0.45)",
  },
};

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
  const config = visualConfigs[service.slug] ?? visualConfigs.danismanlik;
  const tall = variant === "wide";

  return (
    <div
      role="img"
      aria-label={`${service.title}: ${config.label}`}
      className={`relative overflow-hidden ${
        tall ? "min-h-[16rem] rounded-[1.6rem]" : "aspect-[16/10] rounded-t-[1.65rem]"
      }`}
      style={{ background: config.background }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 240 180' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div
        aria-hidden
        className="absolute -right-16 -top-12 h-44 w-44 rounded-full blur-3xl"
        style={{ backgroundColor: config.glow }}
      />
      <div
        aria-hidden
        className="absolute left-6 top-6 h-28 w-20 rounded-[1.2rem] border border-cream/30 bg-cream/12 backdrop-blur-sm"
      />
      <div
        aria-hidden
        className="absolute left-11 top-12 h-28 w-20 rounded-[1.2rem] border border-cream/30 bg-cream/16 backdrop-blur-sm"
      />
      <div aria-hidden className="absolute inset-x-10 bottom-10 h-px bg-cream/28" />
      <div aria-hidden className="absolute inset-x-16 bottom-16 h-px bg-cream/18" />

      <div className="absolute inset-0 flex items-center justify-center">
        <span className="grid h-20 w-20 place-items-center rounded-[1.45rem] border border-cream/36 bg-cream/20 text-cream shadow-[0_28px_70px_-46px_rgba(17,16,15,0.86)] backdrop-blur-md">
          <Icon className="h-10 w-10" strokeWidth={1.25} />
        </span>
      </div>

      <div className="absolute left-5 right-5 top-5 flex items-center justify-between gap-3">
        <span className="rounded-full border border-cream/30 bg-cream/18 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-cream backdrop-blur-md">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="truncate rounded-full border border-cream/24 bg-onyx/20 px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-cream-soft backdrop-blur-md">
          {service.title}
        </span>
      </div>
    </div>
  );
}
