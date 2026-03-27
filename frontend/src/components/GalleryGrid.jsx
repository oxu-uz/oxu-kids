function GalleryGrid({ items }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-12">
      {items.map((item) => (
        <article
          key={item.id}
          className={`premium-card group overflow-hidden ${item.cardClassName || ''}`}
        >
          <div className={`overflow-hidden ${item.imageClassName || 'aspect-[4/3]'}`}>
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full max-w-full object-cover transition duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-5 sm:p-6">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {item.category}
            </span>
            <h3 className="mt-4 text-xl font-semibold text-primary">{item.title}</h3>
            {item.description ? (
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
}

export default GalleryGrid;
