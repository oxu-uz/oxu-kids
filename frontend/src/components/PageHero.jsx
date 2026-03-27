import crestLogo from "../assets/oxu-kids-crest.png";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function PageHero({ title, description, badge, shellClassName = "" }) {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);

  return (
    <section className={`page-shell pt-10 ${shellClassName}`.trim()}>
      <div className="premium-card ornament-frame relative overflow-hidden px-6 py-12 sm:px-10">
        <div className="absolute inset-0 bg-hero-radial opacity-80" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            {badge ? <span className="hero-chip mb-5 inline-flex">{badge}</span> : null}
            <h1 className="font-display text-4xl font-bold text-primary md:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
          </div>

          <div className="hidden lg:flex">
            <div className="rounded-[30px] border border-secondary/30 bg-white/90 p-4 shadow-glow">
              <img
                src={crestLogo}
                alt={copy.common.crestAlt}
                className="brand-crest h-40 w-40 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHero;
