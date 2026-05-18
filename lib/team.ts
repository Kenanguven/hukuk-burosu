export type Member = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  focus: string[];
  initials: string;
};

export const team: Member[] = [
  {
    slug: "mahmut-kardak",
    name: "Av. Mahmut KARDAK",
    title: "Kurucu Avukat",
    bio: "KARDAK Hukuk Bürosu'nun kurucusu. Dosya stratejisini sade, öngörülebilir ve müvekkille sürekli temas hâlinde ilerleyen bir çalışma anlayışıyla yönetir.",
    focus: ["Ceza Hukuku", "Aile Hukuku", "Danışmanlık"],
    initials: "MK",
  },
  {
    slug: "servet-agcakaya",
    name: "Av. Servet Ağcakaya",
    title: "Avukat",
    bio: "Ticaret ve şirketler hukuku ile gayrimenkul uyuşmazlıklarında titiz dosya hazırlığı ve net hukuki görüşle çalışır. Müvekkille sürekli iletişimi ve öngörülebilir süreç yönetimini önceler.",
    focus: ["Ticaret Hukuku", "Şirketler", "Gayrimenkul"],
    initials: "SA",
  },
  {
    slug: "berk-erdem-isik",
    name: "Av. Berk Erdem Işık",
    title: "Avukat",
    bio: "İş hukuku, icra-iflas ve idare hukuku alanlarında dosya stratejisini ölçülü ve veriye dayalı biçimde kurar. Süreç boyunca müvekkili düzenli bilgi notlarıyla bilgilendirmeyi temel prensip olarak kabul eder.",
    focus: ["İş Hukuku", "İcra & İflas", "İdare & Vergi"],
    initials: "Bİ",
  },
];
