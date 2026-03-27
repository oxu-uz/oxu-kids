import HeroReveal from "./HeroReveal";

function AnimatedHeroMedia({ active, copy, crestLogo, heroImages }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
      <HeroReveal
        active={active}
        delay={280}
        x={156}
        y={20}
        scale={0.82}
        rotate={1.8}
        duration={1140}
        className="relative overflow-hidden rounded-[34px] border border-secondary/25 shadow-glow lg:row-span-2"
      >
        <img
          src={heroImages.primary}
          alt={copy.home.imageAlts.primary}
          className="h-full min-h-[420px] w-full max-w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/85 via-primary/35 to-transparent p-6 text-white sm:p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">
            {copy.home.dominantPhoto.eyebrow}
          </p>
          <p className="mt-3 max-w-md font-display text-3xl font-semibold">
            {copy.home.dominantPhoto.title}
          </p>
        </div>
      </HeroReveal>

      <HeroReveal
        active={active}
        delay={460}
        x={118}
        y={-118}
        scale={0.8}
        rotate={3}
        duration={1020}
        className="overflow-hidden rounded-[30px] border border-secondary/25 shadow-soft"
      >
        <img
          src={heroImages.secondaryTop}
          alt={copy.home.imageAlts.secondaryTop}
          className="h-[260px] w-full max-w-full object-cover"
        />
      </HeroReveal>

      <HeroReveal
        active={active}
        delay={620}
        x={132}
        y={36}
        scale={0.76}
        rotate={-2.5}
        duration={960}
        className="crest-surface rounded-[30px] border border-secondary/30 p-5 text-white shadow-glow"
      >
        <div className="flex items-center gap-4">
          <img
            src={crestLogo}
            alt={copy.common.crestAlt}
            className="brand-crest h-20 w-20 shrink-0 object-contain"
          />
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-secondary">
              {copy.home.featureSpotlight.eyebrow}
            </p>
            <p className="mt-2 text-sm leading-7 text-white/80">
              {copy.home.featureSpotlight.description}
            </p>
          </div>
        </div>
      </HeroReveal>

      <HeroReveal
        active={active}
        delay={760}
        x={126}
        y={124}
        scale={0.84}
        rotate={1.5}
        duration={1040}
        className="overflow-hidden rounded-[30px] border border-secondary/25 shadow-soft lg:col-span-2"
      >
        <img
          src={heroImages.secondaryBottom}
          alt={copy.home.imageAlts.secondaryBottom}
          className="h-[240px] w-full max-w-full object-cover"
        />
      </HeroReveal>
    </div>
  );
}

export default AnimatedHeroMedia;
