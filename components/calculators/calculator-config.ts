export const CALCULATOR_CONFIG = {
  severance: {
    // Kaynak: Hazine ve Maliye Bakanligi mali/sosyal haklar genelgesi; tutar Verginet ve CSGB tavan sayfasi uzerinden 2026-07-20'de kontrol edildi.
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
  },
} as const;

export const LEGAL_WARNING =
  "Bu araç yalnızca genel bilgilendirme amaçlıdır, hukuki danışmanlık niteliği taşımaz. Kesin hesaplama için avukatınıza danışınız.";
