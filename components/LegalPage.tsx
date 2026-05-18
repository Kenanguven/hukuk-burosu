import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/MotionWrapper";

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={intro} />
      <section className="pb-20">
        <div className="container-prose max-w-3xl space-y-10">
          {sections.map((s, idx) => (
            <FadeIn key={s.heading} delay={idx * 0.04}>
              <h2 className="font-serif text-2xl text-coffee-deep mb-3">
                {s.heading}
              </h2>
              <div className="text-ink-soft leading-relaxed space-y-3">
                {s.body}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
