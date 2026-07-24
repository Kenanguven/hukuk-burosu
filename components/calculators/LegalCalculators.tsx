"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeftRight,
  BriefcaseBusiness,
  Calculator,
  Car,
  CircleDollarSign,
  ClipboardCheck,
  FileText,
  Home,
  Hourglass,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { CALCULATOR_CONFIG, LEGAL_WARNING } from "@/components/calculators/calculator-config";
import {
  addDays,
  daysToSentence,
  formatInteger,
  formatNumber,
  formatPercent,
  formatTRY,
  getDamageSize,
  getMileageCoefficient,
  getNoticeWeeks,
  getServiceBreakdown,
  getUnemploymentDuration,
  parseMoney,
  sentenceToDays,
} from "@/components/calculators/calculator-utils";
import { site } from "@/lib/site";

type ToolId =
  | "all"
  | "labor"
  | "netGross"
  | "reemployment"
  | "unemployment"
  | "execution"
  | "courtFee"
  | "rent"
  | "vehicle";

type Row = {
  label: string;
  value: string;
  note?: string;
  emphasis?: boolean;
};

const tools: Array<{
  id: ToolId;
  title: string;
  short: string;
  icon: typeof Calculator;
}> = [
  { id: "all", title: "Tüm Araçlar", short: "Hesaplama merkezi", icon: Calculator },
  { id: "labor", title: "İşçilik Alacakları", short: "Kıdem, ihbar, izin ve fazla mesai", icon: BriefcaseBusiness },
  { id: "netGross", title: "Net ↔ Brüt Çevirici", short: "Maaş kesinti dökümü", icon: ArrowLeftRight },
  { id: "reemployment", title: "İşe İade Hesaplama", short: "İşe başlatmama ve boşta geçen süre", icon: ClipboardCheck },
  { id: "unemployment", title: "İşsizlik Ödeneği", short: "Süre ve aylık ödeme tahmini", icon: ShieldCheck },
  { id: "execution", title: "İnfaz Hesaplama", short: "Koşullu salıverme tahmini", icon: Hourglass },
  { id: "courtFee", title: "Dava Harcı Hesaplama", short: "Başvuru, peşin ve masraf avansı", icon: FileText },
  { id: "rent", title: "Kira Artış Hesaplama", short: "TÜFE tavanlı yeni kira", icon: Home },
  { id: "vehicle", title: "Araç Değer Kaybı", short: "Genel Şartlar formülü", icon: Car },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function MoneyInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-coffee-deep">
        {label} {required && <span className="text-bronze">*</span>}
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
        className="min-h-14 w-full rounded-2xl border border-coffee/12 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
      />
      {hint && <p className="text-xs leading-relaxed text-ink-mute">{hint}</p>}
    </div>
  );
}

function NumberInput({
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
        onChange={(event) => onChange(event.target.value.replace(/[^\d]/g, ""))}
        inputMode="numeric"
        placeholder={placeholder ?? "0"}
        className="min-h-14 w-full rounded-2xl border border-coffee/12 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
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
        className="min-h-14 w-full rounded-2xl border border-coffee/12 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
      />
    </div>
  );
}

function SelectInput({
  id,
  label,
  value,
  onChange,
  children,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-coffee-deep">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full cursor-pointer rounded-2xl border border-coffee/12 bg-cream-soft px-4 text-base text-ink outline-none transition focus:border-gold focus:ring-4 focus:ring-gold/20"
      >
        {children}
      </select>
      {hint && <p className="text-xs leading-relaxed text-ink-mute">{hint}</p>}
    </div>
  );
}

function ResultPanel({
  title,
  rows,
  note,
}: {
  title: string;
  rows: Row[];
  note?: string;
}) {
  return (
    <section
      aria-live="polite"
      className="overflow-hidden rounded-[1.6rem] border border-gold/45 bg-cream-soft shadow-warm"
    >
      <div className="flex items-center gap-3 bg-[#101a2d] px-5 py-4 text-cream-soft">
        <CircleDollarSign className="h-5 w-5 text-gold" />
        <h3 className="font-serif text-xl !text-cream-soft md:text-2xl">{title}</h3>
      </div>

      <div className="p-5 md:p-6">
        {note && (
          <p className="mb-5 rounded-2xl border border-gold/25 bg-gold/10 px-4 py-3 text-sm font-medium leading-relaxed text-coffee-deep">
            {note}
          </p>
        )}
        <dl className="divide-y divide-coffee/10">
          {rows.map((row) => (
            <div key={row.label} className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[1fr_auto] sm:items-start">
              <dt className={`${row.emphasis ? "font-semibold text-coffee-deep" : "text-ink-soft"}`}>
                {row.label}
              </dt>
              <dd
                className={`text-base font-semibold sm:text-right ${
                  row.emphasis ? "text-gold" : "text-coffee-deep"
                }`}
              >
                {row.value}
                {row.note && <span className="block text-xs font-normal leading-relaxed text-ink-mute">{row.note}</span>}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 border-t border-coffee/10 pt-4 text-xs leading-relaxed text-ink-mute">
          {LEGAL_WARNING}
        </p>
      </div>
    </section>
  );
}

function ToolLayout({
  eyebrow,
  title,
  description,
  form,
  result,
}: {
  eyebrow: string;
  title: string;
  description: string;
  form: ReactNode;
  result: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:items-start">
      <div className="lg:col-span-5">
        <div className="overflow-hidden rounded-[1.6rem] border border-coffee/10 bg-cream-soft shadow-warm">
          <div className="border-b border-coffee/10 p-5 md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-coffee-deep md:text-4xl">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{description}</p>
          </div>
          <div className="space-y-4 p-5 md:p-6">{form}</div>
        </div>
      </div>
      <div className="lg:col-span-7">{result}</div>
    </div>
  );
}

function LaborReceivablesCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grossWage, setGrossWage] = useState("");
  const [benefits, setBenefits] = useState("");
  const [annualLeaveDays, setAnnualLeaveDays] = useState("");
  const [overtimeHours, setOvertimeHours] = useState("");

  const result = useMemo(() => {
    const service = getServiceBreakdown(startDate, endDate);
    const gross = parseMoney(grossWage);
    const benefitTotal = parseMoney(benefits);
    const dressedGross = gross + benefitTotal;
    const cappedGross = Math.min(dressedGross, CALCULATOR_CONFIG.severance.capMonthlyGross);
    const totalDays = service?.totalDays ?? 0;
    const severanceGross = totalDays >= 365 ? (cappedGross * totalDays) / 365 : 0;
    const severanceStamp = severanceGross * CALCULATOR_CONFIG.severance.stampTaxRate;
    const noticeWeeks = totalDays > 0 ? getNoticeWeeks(totalDays) : 0;
    const noticeGross = (dressedGross / 30) * (noticeWeeks * 7);
    const noticeIncome = noticeGross * CALCULATOR_CONFIG.notice.assumedIncomeTaxRate;
    const noticeStamp = noticeGross * CALCULATOR_CONFIG.notice.stampTaxRate;
    const leaveGross = (gross / 30) * Number(annualLeaveDays || 0);
    const overtimeGross = (gross / 225) * 1.5 * Number(overtimeHours || 0);
    const wageTaxBase = leaveGross + overtimeGross;
    const wageSgk = wageTaxBase * CALCULATOR_CONFIG.wage.employeeSgkRate;
    const wageUnemployment = wageTaxBase * CALCULATOR_CONFIG.wage.employeeUnemploymentRate;
    const wageIncome = Math.max(0, wageTaxBase - wageSgk - wageUnemployment) * CALCULATOR_CONFIG.wage.assumedIncomeTaxRate;
    const wageStamp = wageTaxBase * CALCULATOR_CONFIG.wage.stampTaxRate;
    const grossTotal = severanceGross + noticeGross + leaveGross + overtimeGross;
    const deductions = severanceStamp + noticeIncome + noticeStamp + wageSgk + wageUnemployment + wageIncome + wageStamp;

    return {
      service,
      dressedGross,
      cappedGross,
      capApplied: dressedGross > CALCULATOR_CONFIG.severance.capMonthlyGross,
      severanceGross,
      severanceStamp,
      noticeWeeks,
      noticeGross,
      noticeIncome,
      noticeStamp,
      leaveGross,
      overtimeGross,
      wageSgk,
      wageUnemployment,
      wageIncome,
      wageStamp,
      grossTotal,
      deductions,
      netTotal: Math.max(0, grossTotal - deductions),
    };
  }, [annualLeaveDays, benefits, endDate, grossWage, overtimeHours, startDate]);

  const rows: Row[] = [
    {
      label: "Toplam çalışma süresi",
      value: result.service
        ? `${result.service.years} yıl ${result.service.months} ay ${result.service.days} gün`
        : "Tarih bekleniyor",
    },
    { label: "Giydirilmiş brüt ücret", value: formatTRY(result.dressedGross) },
    { label: "Kıdem tazminatı brüt", value: formatTRY(result.severanceGross), note: result.capApplied ? `Tavan uygulandı: ${formatTRY(result.cappedGross)}` : "Tavan aşılmadı." },
    { label: "İhbar tazminatı brüt", value: formatTRY(result.noticeGross), note: `${result.noticeWeeks || 0} hafta üzerinden.` },
    { label: "Yıllık izin ücreti brüt", value: formatTRY(result.leaveGross) },
    { label: "Fazla mesai ücreti brüt", value: formatTRY(result.overtimeGross), note: "Basit hesap: saatlik brüt ücret x 1,5." },
    { label: "Toplam brüt alacak", value: formatTRY(result.grossTotal), emphasis: true },
    { label: "Toplam tahmini kesinti", value: `-${formatTRY(result.deductions)}` },
    { label: "Tahmini net toplam", value: formatTRY(result.netTotal), emphasis: true },
  ];

  return (
    <ToolLayout
      eyebrow="İşçilik alacakları"
      title="Kıdem, ihbar, izin ve fazla mesai"
      description="İşten ayrılış sonrası sık görülen işçilik alacaklarını tek ekranda toplar. Kıdemde tavan ve damga vergisi, ihbarda basit gelir vergisi, izin ve fazla mesaide SGK/işsizlik/gelir vergisi varsayımlarıyla döküm verir."
      form={
        <>
          <DateInput id="labor-start" label="İşe giriş tarihi" value={startDate} onChange={setStartDate} />
          <DateInput id="labor-end" label="İşten çıkış tarihi" value={endDate} onChange={setEndDate} />
          <MoneyInput id="labor-gross" label="Aylık brüt ücret" value={grossWage} onChange={setGrossWage} placeholder="50.000,00" required />
          <MoneyInput id="labor-benefits" label="Düzenli yan haklar" value={benefits} onChange={setBenefits} placeholder="5.000,00" hint="Yol, yemek, düzenli prim/ikramiye aylık brüt toplam." />
          <NumberInput id="labor-leave" label="Kullanılmayan yıllık izin günü" value={annualLeaveDays} onChange={setAnnualLeaveDays} placeholder="14" />
          <NumberInput id="labor-overtime" label="Fazla mesai saati" value={overtimeHours} onChange={setOvertimeHours} placeholder="40" />
        </>
      }
      result={
        <ResultPanel
          title="İşçilik Alacakları Dökümü"
          rows={rows}
          note={result.service && result.service.totalDays < 365 ? "1 yıldan az kıdemde genel kural olarak kıdem tazminatına hak kazanılamaz; bu araç kıdem kalemini 0 gösterir." : undefined}
        />
      }
    />
  );
}

function NetGrossCalculator() {
  const [mode, setMode] = useState("grossToNet");
  const [amount, setAmount] = useState("");

  const result = useMemo(() => {
    const raw = parseMoney(amount);
    const totalRate =
      CALCULATOR_CONFIG.wage.employeeSgkRate +
      CALCULATOR_CONFIG.wage.employeeUnemploymentRate +
      CALCULATOR_CONFIG.wage.assumedIncomeTaxRate * (1 - CALCULATOR_CONFIG.wage.employeeSgkRate - CALCULATOR_CONFIG.wage.employeeUnemploymentRate) +
      CALCULATOR_CONFIG.wage.stampTaxRate;
    const gross = mode === "grossToNet" ? raw : raw / Math.max(0.01, 1 - totalRate);
    const sgk = gross * CALCULATOR_CONFIG.wage.employeeSgkRate;
    const unemployment = gross * CALCULATOR_CONFIG.wage.employeeUnemploymentRate;
    const income = Math.max(0, gross - sgk - unemployment) * CALCULATOR_CONFIG.wage.assumedIncomeTaxRate;
    const stamp = gross * CALCULATOR_CONFIG.wage.stampTaxRate;
    const net = Math.max(0, gross - sgk - unemployment - income - stamp);

    return { gross, sgk, unemployment, income, stamp, net };
  }, [amount, mode]);

  return (
    <ToolLayout
      eyebrow="Maaş hesabı"
      title="Net ↔ brüt çevirici"
      description="Maaş teklifleri, bordro kontrolü ve dava hazırlığında brüt/net ayrımını hızlıca görmek için basitleştirilmiş bir hesaplama sunar. Gelir vergisi %15 varsayımıyla hesaplandığı için kümülatif matrah fark yaratabilir."
      form={
        <>
          <SelectInput id="netgross-mode" label="Hesap yönü" value={mode} onChange={setMode}>
            <option value="grossToNet">Brütten nete çevir</option>
            <option value="netToGross">Netten brüte tahmin et</option>
          </SelectInput>
          <MoneyInput id="netgross-amount" label={mode === "grossToNet" ? "Brüt ücret" : "Net ücret"} value={amount} onChange={setAmount} placeholder="50.000,00" required />
        </>
      }
      result={
        <ResultPanel
          title="Net / Brüt Hesap Dökümü"
          rows={[
            { label: "Brüt ücret", value: formatTRY(result.gross), emphasis: true },
            { label: "SGK işçi payı (%14)", value: `-${formatTRY(result.sgk)}` },
            { label: "İşsizlik sigortası (%1)", value: `-${formatTRY(result.unemployment)}` },
            { label: "Gelir vergisi (%15 varsayım)", value: `-${formatTRY(result.income)}` },
            { label: "Damga vergisi (%0,759)", value: `-${formatTRY(result.stamp)}` },
            { label: "Tahmini net ücret", value: formatTRY(result.net), emphasis: true },
          ]}
        />
      }
    />
  );
}

function ReemploymentCalculator() {
  const [grossWage, setGrossWage] = useState("130.000");
  const [reemploymentMonths, setReemploymentMonths] = useState("4");
  const [idleMonths, setIdleMonths] = useState("4");

  const result = useMemo(() => {
    const gross = parseMoney(grossWage);
    const months = clamp(Number(reemploymentMonths || 4), 4, 8);
    const idle = clamp(Number(idleMonths || 4), 0, CALCULATOR_CONFIG.reemployment.idleTimeMaxMonths);
    const reemploymentGross = gross * months;
    const reemploymentStamp = reemploymentGross * CALCULATOR_CONFIG.severance.stampTaxRate;
    const idleGross = gross * idle;
    const idleSgk = idleGross * CALCULATOR_CONFIG.wage.employeeSgkRate;
    const idleUnemployment = idleGross * CALCULATOR_CONFIG.wage.employeeUnemploymentRate;
    const idleIncome = Math.max(0, idleGross - idleSgk - idleUnemployment) * CALCULATOR_CONFIG.wage.assumedIncomeTaxRate;
    const idleStamp = idleGross * CALCULATOR_CONFIG.wage.stampTaxRate;

    return {
      gross,
      months,
      idle,
      reemploymentGross,
      reemploymentStamp,
      reemploymentNet: Math.max(0, reemploymentGross - reemploymentStamp),
      idleGross,
      idleSgk,
      idleUnemployment,
      idleIncome,
      idleStamp,
      idleNet: Math.max(0, idleGross - idleSgk - idleUnemployment - idleIncome - idleStamp),
    };
  }, [grossWage, idleMonths, reemploymentMonths]);

  return (
    <ToolLayout
      eyebrow="İşe iade"
      title="İşe iade hesaplama"
      description="İşe başlatmama tazminatı ve boşta geçen süre ücretini örnekteki gibi ayrı başlıklarla hesaplar. İşe başlatmama tazminatı 4-8 aylık ücret aralığında, boşta geçen süre ücreti en çok 4 ay üzerinden değerlendirilir."
      form={
        <>
          <MoneyInput id="reemployment-gross" label="Dava tarihindeki aylık brüt ücret (TL)" value={grossWage} onChange={setGrossWage} placeholder="130.000" required />
          <SelectInput id="reemployment-months" label="Çalışma süresi / işe başlatmama ayı" value={reemploymentMonths} onChange={setReemploymentMonths} hint="Mahkeme kararı dosyanın özelliklerine göre 4-8 ay aralığında belirlenir.">
            <option value="4">6 ay - 3 yıl - 4 aylık</option>
            <option value="5">3 - 6 yıl - 5 aylık</option>
            <option value="6">6 - 15 yıl - 6 aylık</option>
            <option value="8">15 yıl üzeri veya ağır fesih - 8 aylık</option>
          </SelectInput>
          <NumberInput id="idle-months" label="Boşta geçen süre (ay, en fazla 4)" value={idleMonths} onChange={setIdleMonths} placeholder="4" />
        </>
      }
      result={
        <ResultPanel
          title="İşe İade Hesap Dökümü"
          rows={[
            { label: "Aylık brüt ücret", value: formatTRY(result.gross), emphasis: true },
            { label: `İşe başlatmama tazminatı (${result.months} aylık)`, value: formatTRY(result.reemploymentGross), note: `${formatTRY(result.gross)} x ${result.months} ay` },
            { label: "Damga vergisi (%0,759)", value: `-${formatTRY(result.reemploymentStamp)}` },
            { label: "Net işe başlatmama tazminatı", value: formatTRY(result.reemploymentNet), note: "Gelir vergisinden muaf, SGK primi kesilmez.", emphasis: true },
            { label: `Boşta geçen süre ücreti (${result.idle} aylık)`, value: formatTRY(result.idleGross), note: `${formatTRY(result.gross)} x ${result.idle} ay` },
            { label: "SGK işçi payı (%14)", value: `-${formatTRY(result.idleSgk)}` },
            { label: "İşsizlik sigortası (%1)", value: `-${formatTRY(result.idleUnemployment)}` },
            { label: "Gelir vergisi (%15)", value: `-${formatTRY(result.idleIncome)}` },
            { label: "Damga vergisi (%0,759)", value: `-${formatTRY(result.idleStamp)}` },
            { label: "Net boşta geçen süre ücreti", value: formatTRY(result.idleNet), emphasis: true },
          ]}
        />
      }
    />
  );
}

function UnemploymentCalculator() {
  const [averageGross, setAverageGross] = useState("");
  const [premiumDays, setPremiumDays] = useState("");
  const [continuousDays, setContinuousDays] = useState("120");

  const result = useMemo(() => {
    const gross = parseMoney(averageGross);
    const duration = getUnemploymentDuration(Number(premiumDays || 0), Number(continuousDays || 0));
    const monthlyRaw = gross * CALCULATOR_CONFIG.unemployment.benefitRate;
    const cap = CALCULATOR_CONFIG.unemployment.grossMinimumWageMonthly * CALCULATOR_CONFIG.unemployment.capRateOfMinimumWage;
    const monthlyGrossBenefit = Math.min(monthlyRaw, cap);
    const stamp = monthlyGrossBenefit * CALCULATOR_CONFIG.unemployment.stampTaxRate;
    const monthlyNet = Math.max(0, monthlyGrossBenefit - stamp);

    return { duration, monthlyRaw, cap, monthlyGrossBenefit, stamp, monthlyNet, total: monthlyNet * (duration.days / 30) };
  }, [averageGross, continuousDays, premiumDays]);

  return (
    <ToolLayout
      eyebrow="İşsizlik ödeneği"
      title="İşsizlik maaşı hesaplama"
      description="Son 4 aylık ortalama brüt kazanç, prim gün sayısı ve son 120 gün hizmet akdi koşuluna göre tahmini işsizlik ödeneği süresini ve aylık net ödemeyi hesaplar."
      form={
        <>
          <MoneyInput id="unemployment-average" label="Son 4 aylık ortalama brüt ücret" value={averageGross} onChange={setAverageGross} placeholder="45.000,00" required />
          <NumberInput id="unemployment-premium" label="Son 3 yıldaki prim gün sayısı" value={premiumDays} onChange={setPremiumDays} placeholder="900" />
          <NumberInput id="unemployment-continuous" label="Fesih öncesi kesintisiz gün" value={continuousDays} onChange={setContinuousDays} placeholder="120" />
        </>
      }
      result={
        <ResultPanel
          title="İşsizlik Ödeneği Dökümü"
          rows={[
            { label: "Ödenek süresi", value: result.duration.days ? `${result.duration.days} gün` : "Hak kazanılamaz", note: result.duration.label },
            { label: "Brüt kazancın %40'ı", value: formatTRY(result.monthlyRaw) },
            { label: "Aylık üst sınır", value: formatTRY(result.cap), note: "Brüt asgari ücretin %80'i." },
            { label: "Aylık brüt ödenek", value: formatTRY(result.monthlyGrossBenefit) },
            { label: "Damga vergisi", value: `-${formatTRY(result.stamp)}` },
            { label: "Tahmini aylık net ödenek", value: formatTRY(result.monthlyNet), emphasis: true },
            { label: "Tahmini toplam net ödeme", value: formatTRY(result.total), emphasis: true },
          ]}
        />
      }
    />
  );
}

function ExecutionCalculator() {
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [detentionDays, setDetentionDays] = useState("");
  const [ratio, setRatio] = useState("oneHalf");
  const [startDate, setStartDate] = useState("");

  const selectedRatio =
    CALCULATOR_CONFIG.execution.conditionalReleaseRatios.find((item) => item.id === ratio) ??
    CALCULATOR_CONFIG.execution.conditionalReleaseRatios[0];

  const result = useMemo(() => {
    const sentenceDays = sentenceToDays(Number(years || 0), Number(months || 0), Number(days || 0));
    const servedBeforeRelease = Math.ceil((sentenceDays * selectedRatio.numerator) / selectedRatio.denominator);
    const remaining = Math.max(0, servedBeforeRelease - Number(detentionDays || 0));
    const totalSentence = daysToSentence(sentenceDays);
    const conditional = daysToSentence(servedBeforeRelease);
    const remainingSentence = daysToSentence(remaining);

    return { sentenceDays, servedBeforeRelease, remaining, totalSentence, conditional, remainingSentence };
  }, [days, detentionDays, months, selectedRatio.denominator, selectedRatio.numerator, years]);

  return (
    <ToolLayout
      eyebrow="Ceza hukuku"
      title="İnfaz hesaplama"
      description="Hapis cezası süresi, tutukluluk/mahsup günü ve koşullu salıverme oranına göre yaklaşık infaz süresini gösterir. Suç tipi, mükerrirlik, denetimli serbestlik ve özel infaz hükümleri sonucu ciddi şekilde değiştirebilir."
      form={
        <>
          <div className="grid grid-cols-3 gap-3">
            <NumberInput id="execution-years" label="Yıl" value={years} onChange={setYears} />
            <NumberInput id="execution-months" label="Ay" value={months} onChange={setMonths} />
            <NumberInput id="execution-days" label="Gün" value={days} onChange={setDays} />
          </div>
          <NumberInput id="execution-detention" label="Mahsup / tutukluluk günü" value={detentionDays} onChange={setDetentionDays} placeholder="0" />
          <SelectInput id="execution-ratio" label="Koşullu salıverme oranı" value={ratio} onChange={setRatio}>
            {CALCULATOR_CONFIG.execution.conditionalReleaseRatios.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
          <DateInput id="execution-start" label="İnfaza başlama tarihi" value={startDate} onChange={setStartDate} />
        </>
      }
      result={
        <ResultPanel
          title="İnfaz Hesap Dökümü"
          note="Bu infaz aracı yalnızca kaba tahmindir; suç vasfı, tekerrür, örgüt, terör, denetimli serbestlik ve lehe kanun uygulaması ayrıca incelenmelidir."
          rows={[
            { label: "Toplam ceza", value: `${result.totalSentence.years} yıl ${result.totalSentence.months} ay ${result.totalSentence.days} gün`, note: `${formatInteger(result.sentenceDays)} gün.` },
            { label: "Seçilen oran", value: selectedRatio.label },
            { label: "Koşullu salıverme için gereken süre", value: `${result.conditional.years} yıl ${result.conditional.months} ay ${result.conditional.days} gün`, note: `${formatInteger(result.servedBeforeRelease)} gün.` },
            { label: "Mahsup sonrası kalan süre", value: `${result.remainingSentence.years} yıl ${result.remainingSentence.months} ay ${result.remainingSentence.days} gün`, emphasis: true },
            { label: "Tahmini koşullu salıverme tarihi", value: addDays(startDate, result.remaining), emphasis: true },
          ]}
        />
      }
    />
  );
}

function CourtFeeCalculator() {
  const [caseType, setCaseType] = useState("relative");
  const [claimAmount, setClaimAmount] = useState("");
  const [expenseAdvance, setExpenseAdvance] = useState(formatNumber(CALCULATOR_CONFIG.courtFee.estimatedExpenseAdvanceDefault));

  const result = useMemo(() => {
    const amount = parseMoney(claimAmount);
    const advance = parseMoney(expenseAdvance);
    const application = CALCULATOR_CONFIG.courtFee.applicationFeeCivil;
    const decision = caseType === "relative" ? amount * CALCULATOR_CONFIG.courtFee.relativeDecisionRate : CALCULATOR_CONFIG.courtFee.fixedDecisionFee;
    const upfront = caseType === "relative" ? decision * CALCULATOR_CONFIG.courtFee.advanceRelativeQuarter : decision;
    const total = application + upfront + advance;

    return { amount, advance, application, decision, upfront, total };
  }, [caseType, claimAmount, expenseAdvance]);

  return (
    <ToolLayout
      eyebrow="Dava masrafı"
      title="Dava harcı hesaplama"
      description="Alacak, tazminat ve benzeri nispi harca tabi dosyalarda dava değeri üzerinden karar ve ilam harcı ile peşin harç tahmini yapılır. Maktu harca tabi işlerde sabit harç ve masraf avansı ayrı gösterilir."
      form={
        <>
          <SelectInput id="court-type" label="Dava türü" value={caseType} onChange={setCaseType}>
            <option value="relative">Nispi harca tabi alacak / tazminat</option>
            <option value="fixed">Maktu harca tabi dava</option>
          </SelectInput>
          <MoneyInput id="court-amount" label="Dava değeri / talep tutarı" value={claimAmount} onChange={setClaimAmount} placeholder="250.000,00" hint="Maktu harçta bilgi amaçlı kalabilir." />
          <MoneyInput id="court-expense" label="Tahmini gider avansı" value={expenseAdvance} onChange={setExpenseAdvance} placeholder="3.500,00" />
        </>
      }
      result={
        <ResultPanel
          title="Dava Harcı Hesap Dökümü"
          rows={[
            { label: "Dava değeri", value: formatTRY(result.amount) },
            { label: "Başvurma harcı", value: formatTRY(result.application) },
            { label: caseType === "relative" ? "Nispi karar ve ilam harcı" : "Maktu karar ve ilam harcı", value: formatTRY(result.decision), note: caseType === "relative" ? "Dava değerinin binde 68,31'i." : "2026 maktu harç varsayımı." },
            { label: "Peşin alınacak harç", value: formatTRY(result.upfront), note: caseType === "relative" ? "Nispi harcın 1/4'ü." : "Maktu harcın tamamı." },
            { label: "Gider avansı", value: formatTRY(result.advance) },
            { label: "Tahmini dava açılış masrafı", value: formatTRY(result.total), emphasis: true },
          ]}
          note="Harçlar dava türüne, mahkemeye, talep sonucuna ve yıl içinde güncellenen tarifelere göre değişebilir."
        />
      }
    />
  );
}

function RentCalculator() {
  const [currentRent, setCurrentRent] = useState("");
  const [customRate, setCustomRate] = useState(formatNumber(CALCULATOR_CONFIG.rent.currentTufeCapRate * 100));

  const result = useMemo(() => {
    const rent = parseMoney(currentRent);
    const rate = parseMoney(customRate) / 100;
    const increase = rent * rate;
    return { rent, rate, increase, newRent: rent + increase };
  }, [currentRent, customRate]);

  return (
    <ToolLayout
      eyebrow="Kira hukuku"
      title="Kira artış hesaplama"
      description="Konut ve işyeri kira yenilemelerinde TÜFE 12 aylık ortalama oranına göre artış tutarını hesaplar. Sözleşme, beş yıl sonrası uyarlama ve rayiç kira davaları ayrıca değerlendirilmelidir."
      form={
        <>
          <MoneyInput id="rent-current" label="Mevcut aylık kira" value={currentRent} onChange={setCurrentRent} placeholder="25.000,00" required />
          <MoneyInput id="rent-rate" label="Artış oranı (%)" value={customRate} onChange={setCustomRate} placeholder="32,03" hint="Temmuz 2026 için TÜFE 12 aylık ortalama tavan oranı varsayılan girildi." />
        </>
      }
      result={
        <ResultPanel
          title="Kira Artış Dökümü"
          rows={[
            { label: "Mevcut kira", value: formatTRY(result.rent) },
            { label: "Uygulanan oran", value: `%${formatPercent(result.rate * 100)}` },
            { label: "Artış tutarı", value: formatTRY(result.increase) },
            { label: "Yeni aylık kira", value: formatTRY(result.newRent), emphasis: true },
          ]}
        />
      }
    />
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

  return (
    <ToolLayout
      eyebrow="Sigorta ve tazminat"
      title="Araç değer kaybı hesaplama"
      description="Kaza tarihindeki rayiç değer, kilometre ve onarım bedeli kullanılarak Genel Şartlar formülüyle tahmini değer kaybı hesaplanır. Kesin tutar eksper raporu, tahkim veya mahkeme dosyasındaki delillere göre değişebilir."
      form={
        <>
          <MoneyInput id="vehicle-market" label="Kaza tarihindeki rayiç değer" value={marketValue} onChange={setMarketValue} placeholder="1.250.000,00" required />
          <MoneyInput id="vehicle-km" label="Araç kilometresi" value={kilometers} onChange={setKilometers} placeholder="42.000" />
          <MoneyInput id="vehicle-repair" label="Hasar / onarım bedeli" value={repairCost} onChange={setRepairCost} placeholder="85.000,00" />
        </>
      }
      result={
        <ResultPanel
          title="Araç Değer Kaybı Dökümü"
          note="Bu hesaplama SEDDK Genel Şartları'na göre tahminidir; kesin tutar sigorta tahkim/mahkeme sürecinde eksper raporuyla belirlenir."
          rows={[
            { label: "Araç rayiç değeri", value: formatTRY(result.market) },
            { label: "Hasar tutarı / rayiç oranı", value: `%${formatPercent(result.damage.ratio)}`, note: `${formatTRY(result.repair)} hasar tutarı esas alındı.` },
            { label: "Baz değer kaybı", value: formatTRY(result.baseLoss), note: "Rayiç değer x %19." },
            { label: "Hasar boyutu katsayısı", value: `${result.damage.code} · ${result.damage.label} · ${result.damage.coefficient}` },
            { label: "Kilometre katsayısı", value: `${result.mileage.label} · ${result.mileage.coefficient}` },
            { label: "Tahmini toplam değer kaybı", value: formatTRY(result.totalLoss), emphasis: true },
          ]}
        />
      }
    />
  );
}

function ToolsOverview({ onSelect }: { onSelect: (id: ToolId) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tools.filter((tool) => tool.id !== "all").map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.id}
            type="button"
            onClick={() => onSelect(tool.id)}
            className="group flex min-h-36 cursor-pointer flex-col rounded-[1.5rem] border border-coffee/10 bg-cream-soft p-5 text-left shadow-warm transition hover:-translate-y-0.5 hover:border-gold/45 hover:bg-porcelain focus:outline-none focus:ring-4 focus:ring-gold/20"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold/12 text-coffee transition group-hover:bg-coffee-deep group-hover:text-cream-soft">
              <Icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <span className="mt-5 block font-serif text-2xl text-coffee-deep">{tool.title}</span>
            <span className="mt-2 block text-sm leading-relaxed text-ink-soft">{tool.short}</span>
          </button>
        );
      })}
    </div>
  );
}

function ActiveTool({ activeTool, onSelect }: { activeTool: ToolId; onSelect: (id: ToolId) => void }) {
  if (activeTool === "all") return <ToolsOverview onSelect={onSelect} />;
  if (activeTool === "labor") return <LaborReceivablesCalculator />;
  if (activeTool === "netGross") return <NetGrossCalculator />;
  if (activeTool === "reemployment") return <ReemploymentCalculator />;
  if (activeTool === "unemployment") return <UnemploymentCalculator />;
  if (activeTool === "execution") return <ExecutionCalculator />;
  if (activeTool === "courtFee") return <CourtFeeCalculator />;
  if (activeTool === "rent") return <RentCalculator />;
  return <VehicleCalculator />;
}

export function LegalCalculators() {
  const [activeTool, setActiveTool] = useState<ToolId>("all");
  const selectedTool = tools.find((tool) => tool.id === activeTool) ?? tools[0];
  const ActiveIcon = selectedTool.icon;

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (tools.some((tool) => tool.id === hash)) {
        setActiveTool(hash as ToolId);
      }
    };

    const timer = window.setTimeout(syncFromHash, 0);
    window.addEventListener("hashchange", syncFromHash);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, []);

  const selectTool = (id: ToolId) => {
    setActiveTool(id);
    window.history.replaceState(null, "", id === "all" ? "/hesaplama-araclari" : `/hesaplama-araclari#${id}`);
  };

  return (
    <section className="pb-20">
      <div className="container-prose">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[19rem_1fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.35rem] border border-gold/25 bg-[#101a2d] shadow-warm">
              <div className="border-b border-cream-soft/10 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Araçlar</p>
              </div>
              <div className="grid gap-1 p-2">
                {tools.map((tool) => {
                  const Icon = tool.icon;
                  const selected = tool.id === activeTool;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => selectTool(tool.id)}
                      className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                        selected
                          ? "bg-cream-soft text-coffee-deep"
                          : "text-cream-soft/78 hover:bg-cream-soft/8 hover:text-cream-soft"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${selected ? "text-gold" : "text-gold-soft"}`} />
                      <span>
                        <span className="block text-sm font-semibold">{tool.title}</span>
                        <span className={`block text-xs ${selected ? "text-ink-mute" : "text-cream-soft/48"}`}>{tool.short}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-coffee/10 bg-cream-soft px-4 py-2 text-sm font-semibold text-coffee-deep">
                <ActiveIcon className="h-4 w-4 text-gold" />
                {selectedTool.title}
              </span>
              <span className="rounded-full border border-coffee/10 bg-cream-soft/70 px-4 py-2 text-xs font-medium text-ink-soft">
                Client-side hesaplama · veri kaydedilmez
              </span>
            </div>

            <ActiveTool activeTool={activeTool} onSelect={selectTool} />
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] bg-coffee-deep p-7 text-cream md:flex md:items-center md:justify-between md:gap-8 md:p-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Kesin hesaplama için</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-cream">Dosyanıza özel hukuki değerlendirme alın.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream-soft/78">
              Araçlar hızlı ön fikir verir; fesih nedeni, dava türü, suç vasfı, belge durumu, kümülatif vergi matrahı ve güncel mevzuat sonucu değiştirebilir.
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
