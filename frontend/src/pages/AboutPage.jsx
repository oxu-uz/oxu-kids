import { GraduationCap, HeartHandshake, ShieldCheck, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import TeacherCard from "../components/TeacherCard";
import { getTeachers } from "../data/teachers";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function AboutPage() {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const teachers = getTeachers(locale);
  const icons = [HeartHandshake, GraduationCap, ShieldCheck, Sparkles];

  return (
    <>
      <PageHero
        badge={copy.about.hero.badge}
        title={copy.about.hero.title}
        description={copy.about.hero.description}
      />

      <section className="page-shell mt-16">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.95fr]">
          <div className="premium-card p-8">
            <SectionHeading
              eyebrow={copy.about.story.eyebrow}
              title={copy.about.story.title}
              description={copy.about.story.description}
            />
            <div className="mt-8 space-y-5 text-sm leading-8 text-slate-600">
              {copy.about.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {copy.about.values.map((item, index) => {
              const Icon = icons[index];

              return (
                <div key={item.title} className="premium-card p-6">
                  <div className="inline-flex rounded-2xl bg-secondary/15 p-3 text-secondary">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <SectionHeading
          eyebrow={copy.about.teachers.eyebrow}
          title={copy.about.teachers.title}
          description={copy.about.teachers.description}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {teachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      </section>
    </>
  );
}

export default AboutPage;
