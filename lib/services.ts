import {
  Gavel,
  Heart,
  Briefcase,
  Building2,
  Home,
  Landmark,
  ScrollText,
  Scale,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
  };
  short: string;
  long: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "ceza",
    title: "Ceza Hukuku",
    icon: Gavel,
    image: {
      src: "/service-images/ceza-hukuku.webp",
      alt: "Ceza hukuku dosyaları için tokmak, kelepçe ve hukuk kitabı bulunan gerçekçi hukuk ofisi fotoğrafı",
    },
    short:
      "Soruşturma aşamasından temyize kadar, müvekkilimizin yanında olan titiz bir savunma.",
    long: "Şüpheli, sanık ve mağdur sıfatıyla yürütülen tüm ceza dosyalarında soruşturma ve kovuşturma süreçlerinin her aşamasında stratejik, delile dayalı bir savunma sunuyoruz.",
    bullets: [
      "Soruşturma ve kovuşturma savunması",
      "Tutuklama, adli kontrol ve itiraz işlemleri",
      "Mağdur ve katılan vekilliği",
      "İstinaf ve temyiz başvuruları",
    ],
  },
  {
    slug: "aile",
    title: "Aile Hukuku",
    icon: Heart,
    image: {
      src: "/service-images/aile-hukuku.webp",
      alt: "Aile hukuku süreçlerini temsil eden ev, aile figürleri ve hukuk dosyası bulunan gerçekçi masa fotoğrafı",
    },
    short:
      "Boşanma, velayet ve mal paylaşımında insan onurunu gözeten, sakin bir yaklaşım.",
    long: "Aile içi uyuşmazlıkların hassasiyetini gözeterek; anlaşmalı veya çekişmeli boşanma, velayet, nafaka ve mal rejimi davalarında müvekkillerimizin haklarını korumayı esas alıyoruz.",
    bullets: [
      "Anlaşmalı / çekişmeli boşanma",
      "Velayet, kişisel ilişki ve nafaka",
      "Mal rejimi tasfiyesi",
      "Tanıma ve tenfiz davaları",
    ],
  },
  {
    slug: "is",
    title: "İş Hukuku",
    icon: Briefcase,
    image: {
      src: "/service-images/is-hukuku.webp",
      alt: "İş hukuku için sözleşme, evrak çantası ve ofis masası detaylarından oluşan gerçekçi katalog fotoğrafı",
    },
    short:
      "İşçi ve işveren arasında dengeli, mevzuata uygun çözümler üretiyoruz.",
    long: "Bireysel ve toplu iş hukukunda, fesih süreçlerinden işçilik alacaklarına, iş kazaları ve mobbing iddialarına kadar geniş yelpazede danışmanlık ve dava hizmeti sunuyoruz.",
    bullets: [
      "İşe iade ve fesih davaları",
      "Kıdem, ihbar, fazla mesai alacakları",
      "İş kazası ve meslek hastalığı",
      "İş sözleşmeleri ve uyum danışmanlığı",
    ],
  },
  {
    slug: "ticaret",
    title: "Ticaret & Şirketler Hukuku",
    icon: Building2,
    image: {
      src: "/service-images/ticaret-sirketler-hukuku.webp",
      alt: "Ticaret ve şirketler hukuku için toplantı masasında sözleşme dosyaları ve kalem bulunan gerçekçi fotoğraf",
    },
    short:
      "Şirket kuruluşundan birleşme ve devirlere, ticari ilişkilerin her aşamasında yanınızdayız.",
    long: "Şirket kuruluşu, ana sözleşme değişiklikleri, ortaklık uyuşmazlıkları, ticari sözleşmeler ve birleşme-devralma süreçlerinde stratejik destek veriyoruz.",
    bullets: [
      "Şirket kuruluşu ve esas sözleşme",
      "Ticari sözleşme hazırlık ve müzakeresi",
      "Ortaklık ve haksız rekabet davaları",
      "Birleşme, devralma ve due diligence",
    ],
  },
  {
    slug: "gayrimenkul",
    title: "Gayrimenkul Hukuku",
    icon: Home,
    image: {
      src: "/service-images/gayrimenkul-hukuku.webp",
      alt: "Gayrimenkul hukuku için mimari plan, anahtarlar ve maket ev bulunan gerçekçi hukuk ofisi fotoğrafı",
    },
    short:
      "Tapu, kira ve imar süreçlerinizi güvenli adımlarla yönetiyoruz.",
    long: "Gayrimenkul alım-satımı, kira ilişkileri, kat mülkiyeti, ipotek ve tapu iptal-tescil davalarında müvekkillerimizin mülkiyet haklarını koruyoruz.",
    bullets: [
      "Tapu iptal ve tescil davaları",
      "Kira tespit, tahliye ve uyarlama",
      "Kat mülkiyeti uyuşmazlıkları",
      "Gayrimenkul sözleşmeleri",
    ],
  },
  {
    slug: "icra",
    title: "İcra & İflas Hukuku",
    icon: ScrollText,
    image: {
      src: "/service-images/icra-iflas-hukuku.webp",
      alt: "İcra ve iflas hukuku için mühür, hesap makinesi ve dosyalar bulunan gerçekçi masa fotoğrafı",
    },
    short:
      "Alacaklarınızı hızlı ve etkili bir takiple tahsil ediyoruz.",
    long: "İlamlı ve ilamsız icra takipleri, iflas, konkordato ve yapılandırma süreçlerinde hem alacaklı hem borçlu tarafına stratejik danışmanlık sağlıyoruz.",
    bullets: [
      "İcra takibi başlatma ve sonuçlandırma",
      "İtirazın kaldırılması ve iptali",
      "Konkordato ve iflas süreçleri",
      "Borca itiraz ve menfi tespit",
    ],
  },
  {
    slug: "idare",
    title: "İdare & Vergi Hukuku",
    icon: Landmark,
    image: {
      src: "/service-images/idare-vergi-hukuku.webp",
      alt: "İdare ve vergi hukuku için vergi dosyaları, hesap makinesi ve resmi evraklardan oluşan gerçekçi fotoğraf",
    },
    short:
      "İdari işlemlere karşı, mevzuata hakim ve titiz bir hak arayışı.",
    long: "İdari işlemlerin iptali, tam yargı davaları, kamu ihaleleri ve vergi uyuşmazlıklarında müvekkillerimizi temsil ediyoruz.",
    bullets: [
      "İptal ve tam yargı davaları",
      "Kamu ihale uyuşmazlıkları",
      "Vergi tarhiyatı itirazları",
      "İmar ve ruhsat uyuşmazlıkları",
    ],
  },
  {
    slug: "danismanlik",
    title: "Sürekli Hukuki Danışmanlık",
    icon: Scale,
    image: {
      src: "/service-images/surekli-hukuki-danismanlik.webp",
      alt: "Sürekli hukuki danışmanlık için modern hukuk ofisi masasında sözleşme dosyaları ve laptop bulunan gerçekçi fotoğraf",
    },
    short:
      "Şirket ve bireylere uzun soluklu, öngörülebilir hukuki destek.",
    long: "Aylık abonelik modeliyle sözleşme incelemeleri, görüş yazıları ve günlük operasyonel hukuki sorularınızı tek bir muhatap üzerinden çözüyoruz.",
    bullets: [
      "Aylık abonelikli danışmanlık",
      "Sözleşme inceleme ve hazırlık",
      "KVKK uyum süreçleri",
      "Yazılı hukuki görüş raporları",
    ],
  },
];
