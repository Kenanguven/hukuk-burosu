"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { BriefcaseBusiness, Calculator, Car, MessageCircle, Scale, ShieldCheck } from "lucide-react";
import { CALCULATOR_CONFIG, LEGAL_WARNING } from "@/components/calculators/calculator-config";
import {
  formatNumber,
  formatPercent,
  formatTRY,
  getDamageSize,
  getMileageCoefficient,
  getNoticeWeeks,
  getServiceBreakdown,
  parseMoney,
} from "@/components/calculators/calculator-utils";
import { site } from "@/lib/site";

type ToolId = "severance" | "notice" | "vehicle" | "reemployment";

type Row = {
  label: string;
  value: string;
  note?: string;
};

const tools: Array<{
  id: ToolId;
  title: string;
  short: string;
  icon: typeof Calculator;
}> = [
  {
    id: "severance",
    title: "Kıdem Tazminatı",
    short: "Brüt/net kıdem ve tavan kontrolü",
    icon: BriefcaseBusiness,
  },
  {
    id: "notice",
    title: "İhbar Tazminatı",
    short: "Bildirim süresi ve kesinti dökümü",
    icon: ShieldCheck,
  },
  {
    id: "vehicle",
    title: "Araç Değer Kaybı",
    short: "Genel Şartlar formülüyle tahmin",
    icon: Car,
  },
  {
    id: "reemployment",
    title: "İşe Başlatmama",
    short: "4-8 aylık aralık ve kötüniyet",
    icon: Scale,
  },
];

function MoneyInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-coffee-deep">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={() => {
          const parsed = parseMoney(value);
          if (parsed > 0) onChange(formatNumber(parsed));
        }}
        inputMode="decimal"
        placeholder={placeholder ?? "0,00"}
        className="min-h-12 w-full rounded-2xl border border-coffee/15 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
      />
      {hint && <p className="text-xs leading-relaxed text-ink-mute">{hint}</p>}
    </div>
  );
}

function DateInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-coffee-deep">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-12 w-full rounded-2xl border border-coffee/15 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
      />
    </div>
  );
}

function ResultPanel({
  title,
  rows,
  warning,
}: {
  title: string;
  rows: Row[];
  warning?: string;
}) {
  return (
    <section aria-live="polite" className="rounded-[1.5rem] border border-coffee/10 bg-cream-soft p-5 md:p-6">
      <h3 className="font-serif text-2xl text-coffee-deep">{title}</h3>
      {warning && (
        <p className="mt-3 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm font-medium leading-relaxed text-coffee-deep">
          {warning}
        </p>
      )}
      <dl className="mt-5 divide-y divide-coffee/10">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[1fr_auto] sm:items-start">
            <dt className="text-sm text-ink-soft">{row.label}</dt>
            <dd className="text-base font-semibold text-coffee-deep sm:text-right">
              {row.value}
              {row.note && <span className="block text-xs font-normal leading-relaxed text-ink-mute">{row.note}</span>}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-ink-mute">{LEGAL_WARNING}</p>
    </section>
  );
}

function CalculatorShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="sticky top-28 rounded-[1.6rem] border border-coffee/10 bg-cream-warm/40 p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coffee">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-coffee-deep md:text-4xl">{title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{description}</p>
        </div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

function SeveranceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grossWage, setGrossWage] = useState("");
  const [benefits, setBenefits] = useState("");

  const result = useMemo(() => {
    const service = getServiceBreakdown(startDate, endDate);
    const gross = parseMoney(grossWage);
    const benefitTotal = parseMoney(benefits);
    const dressedGross = gross + benefitTotal;
    const cappedGross = Math.min(dressedGross, CALCULATOR_CONFIG.severance.capMonthlyGross);
    const grossCompensation = service ? (cappedGross * service.totalDays) / 365 : 0;
    const stampTax = grossCompensation * CALCULATOR_CONFIG.severance.stampTaxRate;
    const netCompensation = Math.max(0, grossCompensation - stampTax);

    return {
      service,
      gross,
      benefitTotal,
      dressedGross,
      cappedGross,
      capApplied: dressedGross > CALCULATOR_CONFIG.severance.capMonthlyGross,
      grossCompensation,
      stampTax,
      netCompensation,
    };
  }, [benefits, endDate, grossWage, startDate]);

  const rows: Row[] = [
    {
      label: "Toplam kıdem",
      value: result.service
        ? `${result.service.years} yıl ${result.service.months} ay ${result.service.days} gün`
        : "Tarih bekleniyor",
      note: result.service ? `${result.service.totalDays} gün üzerinden oransal hesaplandı.` : undefined,
    },
    { label: "Giydirilmiş brüt ücret", value: formatTRY(result.dressedGross) },
    {
      label: "Uygulanan aylık tavan / matrah",
      value: formatTRY(result.cappedGross),
      note: result.capApplied
        ? `Giydirilmiş ücret ${formatTRY(CALCULATOR_CONFIG.severance.capMonthlyGross)} tavanını aştığı için tavan uygulandı.`
        : "Tavan aşılmadı.",
    },
    { label: "Brüt kıdem tazminatı", value: formatTRY(result.grossCompensation) },
    { label: "Damga vergisi", value: `-${formatTRY(result.stampTax)}`, note: "Binde 7,59. Gelir vergisi ve SGK kesintisi uygulanmaz." },
    { label: "Net kıdem tazminatı", value: formatTRY(result.netCompensation) },
  ];

  const warning =
    result.service && result.service.totalDays < 365
      ? "1 yıldan az kıdemde genel kural olarak kıdem tazminatına hak kazanılamaz."
      : undefined;

  return (
    <CalculatorShell
      eyebrow="İş hukuku"
      title="Kıdem tazminatı hesaplama"
      description="İşe giriş ve çıkış tarihlerine göre kıdem süresi bulunur; brüt ücret ile düzenli yan haklar toplanarak giydirilmiş brüt ücret hesaplanır. 2026 ikinci dönem kıdem tavanı kontrol edilir ve yalnızca damga vergisi düşülerek net sonuç gösterilir."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-coffee/10 bg-cream-soft/80 p-5 md:grid-cols-2 md:p-6">
          <DateInput id="severance-start" label="İşe giriş tarihi" value={startDate} onChange={setStartDate} />
          <DateInput id="severance-end" label="İşten çıkış tarihi" value={endDate} onChange={setEndDate} />
          <MoneyInput id="severance-gross" label="Son brüt ücret" value={grossWage} onChange={setGrossWage} placeholder="45.000,00" />
          <MoneyInput
            id="severance-benefits"
            label="Düzenli yan haklar"
            value={benefits}
            onChange={setBenefits}
            placeholder="5.000,00"
            hint="Yol, yemek, düzenli prim/ikramiye gibi aylık brüt toplam."
          />
        </div>
        <ResultPanel title="Kıdem tazminatı dökümü" rows={rows} warning={warning} />
      </div>
    </CalculatorShell>
  );
}

function NoticeCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dressedGross, setDressedGross] = useState("");

  const result = useMemo(() => {
    const service = getServiceBreakdown(startDate, endDate);
    const gross = parseMoney(dressedGross);
    const weeks = service ? getNoticeWeeks(service.totalDays) : 0;
    const grossNotice = (gross / 30) * (weeks * 7);
    const incomeTax = grossNotice * CALCULATOR_CONFIG.notice.assumedIncomeTaxRate;
    const stampTax = grossNotice * CALCULATOR_CONFIG.notice.stampTaxRate;
    const netNotice = Math.max(0, grossNotice - incomeTax - stampTax);

    return { service, gross, weeks, grossNotice, incomeTax, stampTax, netNotice };
  }, [dressedGross, endDate, startDate]);

  const rows: Row[] = [
    {
      label: "Toplam kıdem",
      value: result.service
        ? `${result.service.years} yıl ${result.service.months} ay ${result.service.days} gün`
        : "Tarih bekleniyor",
    },
    { label: "İhbar süresi", value: result.weeks ? `${result.weeks} hafta` : "Tarih bekleniyor" },
    { label: "Brüt ihbar tazminatı", value: formatTRY(result.grossNotice) },
    { label: "Gelir vergisi", value: `-${formatTRY(result.incomeTax)}`, note: "Basitleştirilmiş %15 varsayımıdır; kümülatif vergi matrahına göre değişebilir." },
    { label: "Damga vergisi", value: `-${formatTRY(result.stampTax)}`, note: "Binde 7,59." },
    { label: "Net ihbar tazminatı", value: formatTRY(result.netNotice) },
  ];

  return (
    <CalculatorShell
      eyebrow="İş hukuku"
      title="İhbar tazminatı hesaplama"
      description="İhbar süresi işçinin kıdemine göre 2, 4, 6 veya 8 hafta olarak belirlenir. Bu araç brüt ihbar tutarını, damga vergisini ve basitleştirilmiş %15 gelir vergisi varsayımıyla net sonucu ayrı ayrı gösterir."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-coffee/10 bg-cream-soft/80 p-5 md:grid-cols-2 md:p-6">
          <DateInput id="notice-start" label="İşe giriş tarihi" value={startDate} onChange={setStartDate} />
          <DateInput id="notice-end" label="İşten çıkış tarihi" value={endDate} onChange={setEndDate} />
          <div className="md:col-span-2">
            <MoneyInput
              id="notice-gross"
              label="Giydirilmiş brüt ücret"
              value={dressedGross}
              onChange={setDressedGross}
              placeholder="50.000,00"
            />
          </div>
        </div>
        <ResultPanel title="İhbar tazminatı dökümü" rows={rows} />
      </div>
    </CalculatorShell>
  );
}

function VehicleCalculator() {
  const [marketValue, setMarketValue] = useState("");
  const [kilometers, setKilometers] = useState("");
  const [repairCost, setRepairCost] = useState("");

  const result = useMemo(() => {
    const market = parseMoney(marketValue);
    const km = parseMoney(kilometers);
    const repair = parseMoney(repairCost);
    const baseLoss = market * CALCULATOR_CONFIG.vehicleValueLoss.baseRate;
    const damage = getDamageSize(market, repair);
    const mileage = getMileageCoefficient(km);
    const totalLoss = baseLoss * damage.coefficient * mileage.coefficient;

    return { market, km, repair, baseLoss, damage, mileage, totalLoss };
  }, [kilometers, marketValue, repairCost]);

  const rows: Row[] = [
    { label: "Araç rayiç değeri", value: formatTRY(result.market) },
    { label: "Hasar tutarı / rayiç oranı", value: `%${formatPercent(result.damage.ratio)}`, note: `${formatTRY(result.repair)} hasar tutarı esas alındı.` },
    { label: "Baz değer kaybı", value: formatTRY(result.baseLoss), note: "Rayiç değer x %19." },
    { label: "Hasar boyutu katsayısı", value: `${result.damage.code} · ${result.damage.label} · ${result.damage.coefficient}` },
    { label: "Kilometre katsayısı", value: `${result.mileage.label} · ${result.mileage.coefficient}` },
    { label: "Tahmini toplam değer kaybı", value: formatTRY(result.totalLoss) },
  ];

  return (
    <CalculatorShell
      eyebrow="Sigorta ve tazminat"
      title="Araç değer kaybı hesaplama"
      description="Kaza tarihindeki rayiç değer, kilometre ve onarım bedeli kullanılarak Genel Şartlar ekindeki baz değer kaybı, hasar boyutu ve kilometre katsayısı formülüyle tahmini tutar hesaplanır. Kesin tutar eksper incelemesi, sigorta tahkim veya mahkeme sürecindeki delillere göre değişebilir."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-coffee/10 bg-cream-soft/80 p-5 md:grid-cols-3 md:p-6">
          <MoneyInput id="vehicle-market" label="Kaza tarihindeki rayiç değer" value={marketValue} onChange={setMarketValue} placeholder="1.250.000,00" />
          <MoneyInput id="vehicle-km" label="Araç kilometresi" value={kilometers} onChange={setKilometers} placeholder="42.000" />
          <MoneyInput id="vehicle-repair" label="Hasar / onarım bedeli" value={repairCost} onChange={setRepairCost} placeholder="85.000,00" hint="KDV dahil hasar tutarıyla oran belirlenir." />
        </div>
        <ResultPanel
          title="Araç değer kaybı dökümü"
          rows={rows}
          warning="Bu hesaplama SEDDK Genel Şartları'na göre tahminidir; kesin tutar sigorta tahkim/mahkeme sürecinde eksper raporuyla belirlenir."
        />
      </div>
    </CalculatorShell>
  );
}

function ReemploymentCalculator() {
  const [grossWage, setGrossWage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const result = useMemo(() => {
    const gross = parseMoney(grossWage);
    const service = getServiceBreakdown(startDate, endDate);
    const noticeWeeks = service ? getNoticeWeeks(service.totalDays) : 0;
    const minReemployment = gross * CALCULATOR_CONFIG.reemployment.minMonths;
    const maxReemployment = gross * CALCULATOR_CONFIG.reemployment.maxMonths;
    const noticeGross = (gross / 30) * (noticeWeeks * 7);
    const badFaithGross = noticeGross * CALCULATOR_CONFIG.reemployment.badFaithMultiplier;

    return { gross, service, noticeWeeks, minReemployment, maxReemployment, noticeGross, badFaithGross };
  }, [endDate, grossWage, startDate]);

  const rows: Row[] = [
    { label: "Aylık brüt ücret", value: formatTRY(result.gross) },
    { label: "İşe başlatmama tazminatı alt sınır", value: formatTRY(result.minReemployment), note: "4 aylık brüt ücret." },
    { label: "İşe başlatmama tazminatı üst sınır", value: formatTRY(result.maxReemployment), note: "8 aylık brüt ücret." },
    { label: "Kötüniyet hesabı için ihbar süresi", value: result.noticeWeeks ? `${result.noticeWeeks} hafta` : "Tarih bekleniyor" },
    { label: "Tahmini kötüniyet tazminatı", value: formatTRY(result.badFaithGross), note: "Basit gösterim: ihbar süresine ait brüt ücretin 3 katı." },
  ];

  return (
    <CalculatorShell
      eyebrow="İş hukuku"
      title="İşe başlatmama ve kötüniyet tazminatı"
      description="İşe iade sürecinde işe başlatmama tazminatı çoğunlukla 4 ila 8 aylık brüt ücret aralığında değerlendirilir. Kötüniyet tazminatı ise iş güvencesi kapsamı dışında kalan bazı fesihlerde bildirim süresine ait ücretin üç katı olarak gündeme gelebilir."
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 rounded-[1.5rem] border border-coffee/10 bg-cream-soft/80 p-5 md:grid-cols-2 md:p-6">
          <div className="md:col-span-2">
            <MoneyInput id="reemployment-gross" label="Aylık brüt ücret" value={grossWage} onChange={setGrossWage} placeholder="50.000,00" />
          </div>
          <DateInput id="reemployment-start" label="İşe giriş tarihi" value={startDate} onChange={setStartDate} />
          <DateInput id="reemployment-end" label="İşten çıkış tarihi" value={endDate} onChange={setEndDate} />
        </div>
        <ResultPanel title="Tazminat aralığı dökümü" rows={rows} />
      </div>
    </CalculatorShell>
  );
}

export function LegalCalculators() {
  const [activeTool, setActiveTool] = useState<ToolId>("severance");
  const ActiveIcon = tools.find((tool) => tool.id === activeTool)?.icon ?? Calculator;

  return (
    <section className="pb-20">
      <div className="container-prose">
        <div className="rounded-[2rem] border border-coffee/10 bg-cream-soft/70 p-3 shadow-warm backdrop-blur-xl md:p-4">
          <div
            role="tablist"
            aria-label="Hesaplama aracı seçimi"
            className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-4"
          >
            {tools.map((tool) => {
              const Icon = tool.icon;
              const selected = tool.id === activeTool;

              return (
                <button
                  key={tool.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${tool.id}-panel`}
                  onClick={() => setActiveTool(tool.id)}
                  className={`min-h-24 cursor-pointer rounded-[1.4rem] border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-gold/25 ${
                    selected
                      ? "border-coffee-dark bg-coffee-deep text-cream-soft shadow-warm"
                      : "border-coffee/10 bg-cream-soft text-coffee-deep hover:border-gold/45 hover:bg-cream"
                  }`}
                >
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${
                      selected ? "bg-gold/20 text-gold-soft" : "bg-gold/15 text-coffee"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="mt-3 block text-sm font-semibold">{tool.title}</span>
                  <span className={`mt-1 block text-xs leading-relaxed ${selected ? "text-cream-soft/72" : "text-ink-mute"}`}>
                    {tool.short}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8" id={`${activeTool}-panel`} role="tabpanel" aria-label={tools.find((tool) => tool.id === activeTool)?.title}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-coffee/10 bg-cream-soft px-4 py-2 text-sm font-semibold text-coffee-deep">
            <ActiveIcon className="h-4 w-4 text-gold" />
            Client-side hesaplama · veri kaydedilmez
          </div>
          {activeTool === "severance" && <SeveranceCalculator />}
          {activeTool === "notice" && <NoticeCalculator />}
          {activeTool === "vehicle" && <VehicleCalculator />}
          {activeTool === "reemployment" && <ReemploymentCalculator />}
        </div>

        <div className="mt-12 rounded-[2rem] bg-coffee-deep p-7 text-cream md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Kesin hesaplama için</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-cream">Dosyanıza özel hukuki değerlendirme alın.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-soft/78">
              Hesaplama araçları ön fikir verir; fesih nedeni, kusur oranı, belge durumu, kümülatif vergi matrahı ve eksper raporu sonucu değiştirebilir.
            </p>
          </div>
          <a href={site.whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-soft mt-6 md:mt-0">
            WhatsApp Web
            <MessageCircle className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
