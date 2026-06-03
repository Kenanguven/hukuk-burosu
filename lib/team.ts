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
    bio: "KARDAK Hukuk Bürosu'nun kurucusu. Başvuruları dosyanın niteliğine göre değerlendirir; strateji, iletişim ve takip planını sade ve öngörülebilir bir çalışma düzeniyle kurar.",
    focus: [],
    initials: "MK",
  },
];
