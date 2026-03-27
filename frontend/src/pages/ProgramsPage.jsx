import { CheckCircle2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import PageHero from "../components/PageHero";
import ProgramCard from "../components/ProgramCard";
import SectionHeading from "../components/SectionHeading";
import { getDailyActivities } from "../data/activities";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { apiFetch } from "../lib/api";

function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const dailyActivities = useMemo(() => getDailyActivities(locale), [locale]);

  useEffect(() => {
    apiFetch("/programs")
      .then(setPrograms)
      .catch(() => setPrograms([]));
  }, []);

  return (
    <>
      <PageHero
        badge={copy.programs.hero.badge}
        title={copy.programs.hero.title}
        description={copy.programs.hero.description}
      />

      <section className="page-shell mt-16">
        <SectionHeading
          eyebrow={copy.programs.groups.eyebrow}
          title={copy.programs.groups.title}
          description={copy.programs.groups.description}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="premium-card p-8">
            <SectionHeading
              eyebrow={copy.programs.routine.eyebrow}
              title={copy.programs.routine.title}
              description={copy.programs.routine.description}
            />

            <div className="mt-8 space-y-4">
              {copy.programs.routine.bullets.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 text-secondary" size={18} />
                  <p className="text-sm leading-7 text-slate-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {dailyActivities.map(({ title, time, description, Icon }) => (
              <div key={title} className="premium-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon size={22} />
                  </div>
                  <span className="rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">
                    {time}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="premium-card flex flex-col gap-6 px-8 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="hero-chip">{copy.programs.methodology.badge}</span>
            <h2 className="mt-5 font-display text-4xl font-bold text-primary">
              {copy.programs.methodology.title}
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              {copy.programs.methodology.description}
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-[28px] bg-primary px-6 py-5 text-white shadow-soft">
            <Sparkles className="text-secondary" size={22} />
            <span className="max-w-xs text-sm leading-7">
              {copy.programs.methodology.highlight}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgramsPage;
