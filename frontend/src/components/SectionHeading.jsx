function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <span className="hero-chip mb-4 inline-flex">{eyebrow}</span>
      ) : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="section-copy mt-4">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
