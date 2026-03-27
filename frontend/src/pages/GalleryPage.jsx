import { ArrowRight, Camera, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import GalleryGrid from "../components/GalleryGrid";
import SectionHeading from "../components/SectionHeading";
import { homeHeroImages, homeStoryImages } from "../data/gallery";
import { useGalleryContent } from "../hooks/useGalleryContent";
import { useLanguage } from "../hooks/useLanguage";
import { getUiTranslations } from "../i18n/ui";

function GalleryPage() {
  const { locale } = useLanguage();
  const copy = getUiTranslations(locale);
  const { galleryItems } = useGalleryContent(locale);

  return (
    <>
      <section className="page-shell-fluid pt-8">
        <div className="premium-card ornament-frame relative overflow-hidden p-4 sm:p-6">
          <div className="absolute inset-0 bg-hero-radial opacity-90" />
          <div className="relative grid gap-6 xl:grid-cols-[0.84fr,1.16fr]">
            <div className="rounded-[30px] bg-white/90 p-6 sm:p-8">
              <span className="hero-chip">{copy.gallery.badge}</span>
              <h1 className="mt-6 font-display text-4xl font-bold text-primary sm:text-5xl">
                {copy.gallery.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                {copy.gallery.description}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.gallery.featureCards.map((item, index) => {
                  const Icon = index === 0 ? Camera : Sparkles;

                  return (
                    <div key={item.title} className="rounded-[24px] border border-secondary/20 bg-white p-5">
                      <Icon className="text-secondary" size={22} />
                      <p className="mt-4 text-xl font-semibold text-primary">{item.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                    </div>
                  );
                })}
              </div>

              <Link
                to="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-midnight"
              >
                {copy.gallery.cta} <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft md:col-span-2">
                <img
                  src={homeHeroImages.primary}
                  alt={copy.gallery.imageAlts.hero}
                  className="h-[280px] w-full max-w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft">
                <img
                  src={homeStoryImages.reading}
                  alt={copy.gallery.imageAlts.reading}
                  className="h-[250px] w-full max-w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-[30px] border border-secondary/20 shadow-soft">
                <img
                  src={homeStoryImages.garden}
                  alt={copy.gallery.imageAlts.garden}
                  className="h-[250px] w-full max-w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell-fluid mt-16">
        <SectionHeading
          eyebrow={copy.gallery.stories.eyebrow}
          title={copy.gallery.stories.title}
          description={copy.gallery.stories.description}
        />

        <div className="mt-10">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  );
}

export default GalleryPage;
