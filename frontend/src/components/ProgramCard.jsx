import { ArrowRight, BookOpenText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { formatAgeGroup, localizeProgram } from "../lib/programLocalization";

function ProgramCard({ program, compact = false }) {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const localizedProgram = localizeProgram(program, locale);

  return (
    <article className="premium-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      {program.imageUrl ? (
        <div className="overflow-hidden">
          <img
            src={program.imageUrl}
            alt={localizedProgram.title}
            className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
              compact ? "h-48" : "h-56"
            }`}
          />
        </div>
      ) : (
        <div
          className={`bg-gradient-to-br from-primary via-midnight to-primary/80 ${
            compact ? "h-40" : "h-48"
          }`}
        />
      )}

      <div className="flex flex-1 flex-col p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            {formatAgeGroup(localizedProgram.ageGroup, locale)}
          </span>
          <h3 className="mt-4 text-2xl font-semibold text-primary">
            {localizedProgram.title}
          </h3>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          {compact ? <Sparkles size={24} /> : <BookOpenText size={24} />}
        </div>
      </div>

      <p className="flex-1 text-sm leading-7 text-slate-600">
        {localizedProgram.description}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-primary/10 pt-5">
        <span className="text-sm font-medium text-slate-500">
          {copy.programCard.enrollments(program.enrollmentCount ?? 0)}
        </span>
        <Link
          to="/register"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3"
        >
          {copy.programCard.cta} <ArrowRight size={16} />
        </Link>
      </div>
      </div>
    </article>
  );
}

export default ProgramCard;
