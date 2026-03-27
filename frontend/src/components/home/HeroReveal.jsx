const HERO_MOTION_MULTIPLIER = 3;

function HeroReveal({
  as: Component = "div",
  active,
  delay = 0,
  x = 0,
  y = 36,
  scale = 0.96,
  rotate = 0,
  duration = 920,
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={`hero-reveal ${active ? "is-active" : ""} ${className}`.trim()}
      style={{
        "--hero-delay": `${delay}ms`,
        "--hero-x": `${x}px`,
        "--hero-y": `${y}px`,
        "--hero-scale": scale,
        "--hero-rotate": `${rotate}deg`,
        "--hero-duration": `${duration * HERO_MOTION_MULTIPLIER}ms`,
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default HeroReveal;
