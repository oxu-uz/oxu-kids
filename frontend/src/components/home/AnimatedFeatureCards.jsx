import HeroReveal from "./HeroReveal";

function AnimatedFeatureCards({ active, values, icons }) {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {values.map((item, index) => {
        const Icon = icons[index];

        return (
          <HeroReveal
            key={item.title}
            active={active}
            delay={860 + index * 140}
            x={index === 1 ? 0 : index === 0 ? -34 : 34}
            y={118}
            scale={0.82}
            rotate={index === 1 ? 0 : index === 0 ? -2.5 : 2.5}
            duration={980}
            className="rounded-[24px] border border-secondary/20 bg-white/90 p-4 shadow-sm"
          >
            <Icon className="text-secondary" size={24} />
            <p className="mt-3 text-2xl font-semibold text-primary">{item.title}</p>
            <p className="mt-1 text-sm text-slate-600">{item.description}</p>
          </HeroReveal>
        );
      })}
    </div>
  );
}

export default AnimatedFeatureCards;
