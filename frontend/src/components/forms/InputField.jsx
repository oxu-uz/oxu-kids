function InputField({
  as = 'input',
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  options = [],
  min,
  max,
  rows = 4,
}) {
  const baseClassName =
    'mt-2 w-full rounded-2xl border border-primary/15 bg-white/90 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-secondary focus:ring-2 focus:ring-secondary/20';

  return (
    <label className="block">
      <span className="text-sm font-semibold text-primary">{label}</span>
      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={baseClassName}
        />
      ) : null}

      {as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={baseClassName}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {as === 'input' ? (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          max={max}
          className={baseClassName}
        />
      ) : null}

      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}

export default InputField;
