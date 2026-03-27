function TeacherCard({ teacher }) {
  return (
    <article className="premium-card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-glow">
      <div className="aspect-[4/4.6] overflow-hidden">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-secondary">
          {teacher.role}
        </p>
        <h3 className="mt-3 text-2xl font-semibold text-primary">{teacher.name}</h3>
        <p className="mt-4 text-sm leading-7 text-slate-600">{teacher.description}</p>
      </div>
    </article>
  );
}

export default TeacherCard;
