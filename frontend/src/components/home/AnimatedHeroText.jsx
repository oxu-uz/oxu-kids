import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedFeatureCards from "./AnimatedFeatureCards";
import HeroReveal from "./HeroReveal";

function AnimatedHeroText({ active, copy, valueIcons }) {
  return (
    <div className="rounded-[32px] border border-secondary/20 bg-white/90 p-6 shadow-soft sm:p-8 lg:p-10">
      <HeroReveal active={active} delay={120} y={-72} scale={0.92}>
        <span className="hero-chip">{copy.home.heroChip}</span>
      </HeroReveal>

      <HeroReveal active={active} delay={260} x={-140} y={24} scale={0.9} duration={1120}>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-tight text-primary sm:text-6xl">
          {copy.home.title}
        </h1>
      </HeroReveal>

      <HeroReveal active={active} delay={430} x={-88} y={78} scale={0.94} duration={1040}>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          {copy.home.description}
        </p>
      </HeroReveal>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <HeroReveal active={active} delay={610} y={96} scale={0.88} duration={980}>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-white transition hover:bg-midnight"
          >
            {copy.home.primaryCta} <ArrowRight size={18} />
          </Link>
        </HeroReveal>

        <HeroReveal active={active} delay={710} y={96} scale={0.88} duration={980}>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/40 bg-white/90 px-7 py-4 text-sm font-semibold text-primary transition hover:shadow-glow"
          >
            {copy.home.secondaryCta} <BookOpen size={18} />
          </Link>
        </HeroReveal>
      </div>

      <AnimatedFeatureCards active={active} values={copy.home.values} icons={valueIcons} />
    </div>
  );
}

export default AnimatedHeroText;
