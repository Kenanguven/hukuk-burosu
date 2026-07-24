export const CALCULATOR_CONFIG = {
  severance: {
    // Kaynak: T.C. Calisma ve Sosyal Guvenlik Bakanligi kidem tazminati tavan sayfasi ve 2026 ikinci donem sirkulerleri; 2026-07-24'te kontrol edildi.
    // Her Ocak ve Temmuz'da guncellenmeli.
    capMonthlyGross: 73729.87,
    stampTaxRate: 0.00759, // Kaynak: Damga Vergisi Kanunu eki tablo; ucret/maas odemeleri icin binde 7,59.
  },
  notice: {
    stampTaxRate: 0.00759, // Kaynak: Damga Vergisi Kanunu eki tablo; ucret/maas odemeleri icin binde 7,59.
    assumedIncomeTaxRate: 0.15, // Basitlestirilmis varsayim: kümülatif gelir vergisi dilimi %15 kabul edilir.
  },
  vehicleValueLoss: {
    baseRate: 0.19, // Kaynak: Karayollari Motorlu Araclar ZMSS Genel Sartlari Ek-1.
    damageSizeCoefficients: [
      { code: "A1", label: "Büyük hasar", coefficient: 0.9 },
      { code: "A2", label: "Orta hasar", coefficient: 0.75 },
      { code: "A3", label: "Küçük hasar", coefficient: 0.5 },
      { code: "A4", label: "Basit hasar", coefficient: 0.25 },
    ],
    // Kaynak: Karayollari Motorlu Araclar ZMSS Genel Sartlari Ek-1, hasar buyuklugu tanimlari.
    damageRatioTable: [
      {
        minMarket: 0,
        maxMarket: 75000,
        a1MinExclusive: 25,
        a2MinExclusive: 15,
        a3MinExclusive: 5,
      },
      {
        minMarket: 75000.01,
        maxMarket: 150000,
        a1MinExclusive: 20,
        a2MinExclusive: 12,
        a3MinExclusive: 4,
      },
      {
        minMarket: 150000.01,
        maxMarket: 300000,
        a1MinExclusive: 20,
        a2MinExclusive: 10,
        a3MinExclusive: 3,
      },
      {
        minMarket: 300000.01,
        maxMarket: Number.POSITIVE_INFINITY,
        a1MinExclusive: 20,
        a2MinExclusive: 8,
        a3MinExclusive: 2,
      },
    ],
    // Kaynak: Karayollari Motorlu Araclar ZMSS Genel Sartlari Ek-1, Kullanilmislik Duzeyi (Km) Katsayisi.
    mileageCoefficients: [
      { min: 0, max: 14999, coefficient: 0.9, label: "0 - 14.999 km" },
      { min: 15000, max: 29999, coefficient: 0.8, label: "15.000 - 29.999 km" },
      { min: 30000, max: 44999, coefficient: 0.6, label: "30.000 - 44.999 km" },
      { min: 45000, max: 59999, coefficient: 0.4, label: "45.000 - 59.999 km" },
      { min: 60000, max: 74999, coefficient: 0.3, label: "60.000 - 74.999 km" },
      { min: 75000, max: 149999, coefficient: 0.2, label: "75.000 - 149.999 km" },
      { min: 150000, max: Number.POSITIVE_INFINITY, coefficient: 0.1, label: "150.000 km ve üzeri" },
    ],
  },
  reemployment: {
    minMonths: 4,
    maxMonths: 8,
    badFaithMultiplier: 3, // Kaynak: kotuniyet tazminati, bildirim suresine ait ucretin uc kati olarak hesaplanir.
    idleTimeMaxMonths: 4, // Kaynak: Is Kanunu m.21; bosta gecen sure ucreti en cok 4 aya kadar.
  },
  wage: {
    employeeSgkRate: 0.14, // Kaynak: 5510 sayili Kanun uygulamasi; isci primi genel oran.
    employeeUnemploymentRate: 0.01, // Kaynak: Issizlik sigortasi isci payi.
    assumedIncomeTaxRate: 0.15, // Basitlestirilmis varsayim: kümülatif gelir vergisi dilimi %15 kabul edilir.
    stampTaxRate: 0.00759,
  },
  unemployment: {
    // Kaynak: ISKUR; gunluk odenek son 4 aylik ortalama brut kazancin %40'i, aylik brut asgari ucretin %80'ini gecemez.
    // Asgari ucret degisirse guncellenmeli.
    grossMinimumWageMonthly: 33030,
    benefitRate: 0.4,
    capRateOfMinimumWage: 0.8,
    stampTaxRate: 0.00759,
    durations: [
      { minPremiumDays: 600, minContinuousDays: 120, days: 180, label: "600 gun prim: 180 gun" },
      { minPremiumDays: 900, minContinuousDays: 120, days: 240, label: "900 gun prim: 240 gun" },
      { minPremiumDays: 1080, minContinuousDays: 120, days: 300, label: "1080 gun prim: 300 gun" },
    ],
  },
  courtFee: {
    // Kaynak: 2026 yili Harclar Kanunu tarifeleri ve Adalet Bakanligi/RAYP yargi harclari duyurulari; 2026-07-24'te kontrol edildi.
    applicationFeeCivil: 732,
    applicationFeeEnforcement: 732,
    fixedDecisionFee: 732,
    relativeDecisionRate: 0.06831,
    advanceRelativeQuarter: 0.25,
    estimatedExpenseAdvanceDefault: 3_500,
  },
  rent: {
    // Kaynak: TUIK Haziran 2026 TUFE 12 aylik ortalama; Temmuz 2026 yenilemeleri icin yasal tavan %32,03 olarak kontrol edildi.
    // Her ay TUIK verisi aciklandiginda guncellenmeli.
    currentTufeCapRate: 0.3203,
  },
  execution: {
    conditionalReleaseRatios: [
      { id: "oneHalf", label: "1/2 kosullu saliverme", denominator: 2, numerator: 1 },
      { id: "twoThirds", label: "2/3 kosullu saliverme", denominator: 3, numerator: 2 },
      { id: "threeFourths", label: "3/4 kosullu saliverme", denominator: 4, numerator: 3 },
    ],
  },
} as const;

export const LEGAL_WARNING =
  "Bu araç yalnızca genel bilgilendirme amaçlıdır, hukuki danışmanlık niteliği taşımaz. Kesin hesaplama için avukatınıza danışınız.";
