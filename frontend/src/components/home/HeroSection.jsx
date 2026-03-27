import { useEffect, useState } from "react";
import crestLogo from "../../assets/oxu-kids-crest.png";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import AnimatedHeroMedia from "./AnimatedHeroMedia";
import AnimatedHeroText from "./AnimatedHeroText";

function HeroSection({ copy, heroImages, valueIcons }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [introActive, setIntroActive] = useState(false);

  useEffect(() => {
    setIntroActive(false);
    const timer = window.setTimeout(() => setIntroActive(true), prefersReducedMotion ? 40 : 140);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <section className="page-shell-fluid pt-8">
      <div
        className={`premium-card ornament-frame hero-cinematic-root relative overflow-hidden px-5 py-5 sm:px-7 sm:py-6 lg:px-10 lg:py-7 xl:px-12 xl:py-8 ${
          introActive ? "is-active" : ""
        }`}
      >
        <div className="absolute inset-0 bg-hero-radial opacity-90" />
        <div className="hero-intro-veil absolute inset-0" />
        <div
          className={`hero-cinematic-shell relative grid gap-6 xl:grid-cols-[0.92fr,1.08fr] ${
            introActive ? "is-active" : ""
          }`}
        >
          <AnimatedHeroText active={introActive} copy={copy} valueIcons={valueIcons} />
          <AnimatedHeroMedia
            active={introActive}
            copy={copy}
            crestLogo={crestLogo}
            heroImages={heroImages}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
