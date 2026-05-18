import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { FadeIn, Stagger, StaggerItem } from "@/components/MotionWrapper";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hukuk Blog — Ankara & İstanbul Avukat Makaleleri",
  description:
    "Ankara ve İstanbul ofisleriyle KARDAK Hukuk Bürosu avukatlarından boşanma, miras, iş, ticaret, gayrimenkul ve ceza hukukuna dair güncel rehberler ve uygulamadan pratik bilgiler.",
  alternates: { canonical: `${site.url}/blog` },
  openGraph: {
    title: `Hukuk Blog — Ankara & İstanbul Avukat | ${site.shortName}`,
    description:
      "Ankara ve İstanbul'da hukuki süreçlere dair güncel makaleler, dava rehberleri ve avukat görüşleri.",
    url: `${site.url}/blog`,
    type: "website",
  },
};

const formatter = new Intl.DateTimeFormat("tr-TR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Hukuku <span className="italic text-coffee">anlaşılır</span> bir dille.
          </>
        }
        description="Avukatlarımızın güncel mevzuat değişikliklerini ve uygulamadan örnekleri sade bir dille aktardığı yazılar."
      />

      <section className="pb-20">
        <div className="container-prose">
          <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-3xl bg-cream-soft border border-coffee/10 p-7 md:p-8 h-full hover:bg-cream-warm/70 hover:-translate-y-1 hover:shadow-[var(--shadow-warm)] transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-widest text-coffee bg-cream px-3 py-1 rounded-full border border-coffee/15">
                      {post.category}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-ink-mute opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </div>
                  <h2 className="mt-5 font-serif text-2xl text-coffee-deep leading-tight">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-ink-soft leading-relaxed">{post.excerpt}</p>
                  <div className="mt-6 flex items-center gap-4 text-xs text-ink-mute">
                    <span>{formatter.format(new Date(post.date))}</span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="w-3.5 h-3.5" /> {post.readMinutes} dk okuma
                    </span>
                    <span>· {post.author}</span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1} className="mt-12 rounded-3xl bg-cream-soft p-8 md:p-10 border border-coffee/10 text-center">
            <p className="font-serif text-xl text-coffee-deep">
              Blogumuzda görmek istediğiniz bir konu var mı?
            </p>
            <p className="mt-2 text-ink-soft">
              Önerilerinizi{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-coffee-deep underline underline-offset-4"
              >
                {site.email}
              </a>{" "}
              adresine yazabilirsiniz.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
