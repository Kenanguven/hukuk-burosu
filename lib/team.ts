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
];
