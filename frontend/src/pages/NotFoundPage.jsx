import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function NotFoundPage() {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);

  return (
    <section className="page-shell pt-16">
      <div className="premium-card mx-auto max-w-3xl px-8 py-16 text-center">
        <p className="hero-chip">404</p>
        <h1 className="mt-6 font-display text-5xl font-bold text-primary">
          {copy.notFound.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          {copy.notFound.description}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-midnight"
        >
          {copy.notFound.button}
        </Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
