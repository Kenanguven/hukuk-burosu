import { CALCULATOR_CONFIG } from "@/components/calculators/calculator-config";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export type ServiceBreakdown = {
  totalDays: number;
  years: number;
  months: number;
  days: number;
};

export function parseMoney(value: string): number {
  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatTRY(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatPercent(value: number): string {
  return new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function getServiceBreakdown(startValue: string, endValue: string): ServiceBreakdown | null {
  if (!startValue || !endValue) return null;

  const start = new Date(`${startValue}T00:00:00`);
  const end = new Date(`${endValue}T00:00:00`);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
    return null;
  }

  const totalDays = Math.floor((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate() + 1;

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { totalDays, years: Math.max(0, years), months: Math.max(0, months), days: Math.max(0, days) };
}

export function getNoticeWeeks(totalDays: number): number {
  const months = totalDays / 30.4375;

  if (months < 6) return 2;
  if (months < 18) return 4;
  if (months < 36) return 6;
  return 8;
}

export function getDamageSize(marketValue: number, repairCost: number) {
  const ratio = marketValue > 0 ? (repairCost / marketValue) * 100 : 0;
  const table =
    CALCULATOR_CONFIG.vehicleValueLoss.damageRatioTable.find(
      (row) => marketValue >= row.minMarket && marketValue <= row.maxMarket,
    ) ?? CALCULATOR_CONFIG.vehicleValueLoss.damageRatioTable.at(-1)!;

  if (ratio > table.a1MinExclusive) {
    return { code: "A1", label: "Büyük hasar", coefficient: 0.9, ratio };
  }

  if (ratio > table.a2MinExclusive) {
    return { code: "A2", label: "Orta hasar", coefficient: 0.75, ratio };
  }

  if (ratio > table.a3MinExclusive) {
    return { code: "A3", label: "Küçük hasar", coefficient: 0.5, ratio };
  }

  return { code: "A4", label: "Basit hasar", coefficient: 0.25, ratio };
}

export function getMileageCoefficient(kilometers: number) {
  return (
    CALCULATOR_CONFIG.vehicleValueLoss.mileageCoefficients.find(
      (row) => kilometers >= row.min && kilometers <= row.max,
    ) ?? CALCULATOR_CONFIG.vehicleValueLoss.mileageCoefficients.at(-1)!
  );
}
