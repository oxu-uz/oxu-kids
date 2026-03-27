import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  TreePine,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProgramCard from "../components/ProgramCard";
import SectionHeading from "../components/SectionHeading";
import HeroSection from "../components/home/HeroSection";
import { homeHeroImages, homeStoryImages } from "../data/gallery";
import { useGalleryContent } from "../hooks/useGalleryContent";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";
import { apiFetch } from "../lib/api";

function HomePage() {
  const [programs, setPrograms] = useState([]);
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const { galleryItems } = useGalleryContent(locale);

  useEffect(() => {
    apiFetch("/programs")
      .then((data) => setPrograms(data.slice(0, 3)))
      .catch(() => setPrograms([]));
  }, []);

  const valueIcons = [HeartHandshake, ShieldCheck, TreePine];
  const featureIcons = [Sparkles, BookOpen, TreePine];

  return (
    <>
      <HeroSection copy={copy} heroImages={homeHeroImages} valueIcons={valueIcons} />

      <section className="page-shell-fluid mt-16">
        <div className="grid gap-6 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="premium-card p-6 sm:p-8">
            <SectionHeading
              eyebrow={copy.home.daySection.eyebrow}
              title={copy.home.daySection.title}
              description={copy.home.daySection.description}
            />

            <div className="mt-8 space-y-4">
              {copy.home.daySection.items.map((item, index) => {
                const Icon = featureIcons[index];

                return (
                  <div
                    key={item.title}
                    data-scroll-reveal
                    className="rounded-[24px] border border-secondary/20 bg-white/90 p-5"
                  >
                    <Icon className="text-secondary" size={22} />
                    <h3 className="mt-4 text-xl font-semibold text-primary">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div
              data-scroll-reveal
              className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft md:col-span-2"
            >
              <img
                src={homeStoryImages.classroom}
                alt={copy.home.imageAlts.classroom}
                className="h-[320px] w-full max-w-full object-cover"
              />
            </div>
            <div
              data-scroll-reveal
              className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft"
            >
              <img
                src={homeStoryImages.reading}
                alt={copy.home.imageAlts.reading}
                className="h-[240px] w-full max-w-full object-cover"
              />
            </div>
            <div
              data-scroll-reveal
              className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft"
            >
              <img
                src={homeStoryImages.garden}
                alt={copy.home.imageAlts.garden}
                className="h-[240px] w-full max-w-full object-cover"
              />
            </div>
            <div
              data-scroll-reveal
              className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft"
            >
              <img
                src={homeStoryImages.watering}
                alt={copy.home.imageAlts.watering}
                className="h-[260px] w-full max-w-full object-cover"
              />
            </div>
            <div
              data-scroll-reveal
              className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft"
            >
              <img
                src={homeStoryImages.harvest}
                alt={copy.home.imageAlts.harvest}
                className="h-[260px] w-full max-w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={copy.home.programsSection.eyebrow}
            title={copy.home.programsSection.title}
            description={copy.home.programsSection.description}
          />
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 self-start rounded-full border border-secondary/35 bg-white px-5 py-3 text-sm font-semibold text-primary transition hover:shadow-glow"
          >
            {copy.home.programsSection.button} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} compact />
          ))}
        </div>
      </section>

      <section className="page-shell-fluid mt-20">
        <div className="premium-card overflow-hidden p-4 sm:p-6">
          <div className="grid gap-6 xl:grid-cols-[0.78fr,1.22fr]">
            <div
              data-scroll-reveal
              className="rounded-[30px] bg-primary px-6 py-8 text-white sm:px-8"
            >
              <span className="hero-chip bg-white/10 text-white">
                {copy.home.gallerySection.eyebrow}
              </span>
              <h2 className="mt-6 font-display text-4xl font-bold">
                {copy.home.gallerySection.title}
              </h2>
              <p className="mt-5 text-base leading-8 text-white/80">
                {copy.home.gallerySection.description}
              </p>
              <Link
                to="/gallery"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-primary transition hover:shadow-glow"
              >
                {copy.home.gallerySection.button} <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {galleryItems.slice(0, 6).map((item, index) => (
                <article
                  key={item.id}
                  data-scroll-reveal
                  className={`overflow-hidden rounded-[28px] border border-secondary/20 shadow-soft ${
                    index === 0 ? "md:col-span-2 xl:col-span-2" : ""
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`w-full max-w-full object-cover ${index === 0 ? "h-64" : "h-56"}`}
                  />
                  <div className="bg-white/95 p-5">
                    <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                      {item.category}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-primary">{item.title}</h3>
                    {item.description ? (
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell-fluid mt-20 pb-8">
        <div
          data-scroll-reveal
          className="relative overflow-hidden rounded-[36px] border border-secondary/25 shadow-glow"
        >
          <img
            src={homeStoryImages.harvest}
            alt={copy.home.imageAlts.harvest}
            className="h-[360px] w-full max-w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/88 via-primary/58 to-transparent" />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-3xl items-center px-6 sm:px-10">
            <div className="text-white">
              <span className="hero-chip border-white/20 bg-white/10 text-white">
                {copy.home.ctaSection.badge}
              </span>
              <h2 className="mt-5 font-display text-4xl font-bold sm:text-5xl">
                {copy.home.ctaSection.title}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                {copy.home.ctaSection.description}
              </p>
              <Link
                to="/register"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-sm font-semibold text-primary transition hover:shadow-glow"
              >
                {copy.home.ctaSection.button} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
