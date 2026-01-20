export default function SelectField({
  label,
  placeholder = "Select option",
  id,
  name,
  options = [],
  value,
  onSelect = () => {},
  disabled = false,
  required = false,
  className = "",
}) {
  return (
    <section role="dropdown" className={className}>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        required={required}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">{placeholder}</option>

        {options.map((val) => (
          <option key={val} value={val}>
            {val}
          </option>
        ))}
      </select>
    </section>
  );
}
