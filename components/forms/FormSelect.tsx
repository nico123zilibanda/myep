interface Option {
  value: string | number;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
  error?: string;
}

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
}: FormSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`
          w-full rounded-xl
          border border-(--border)
          bg-(--card)
          px-4 py-2.5 text-sm
          text-(--foreground)
          placeholder:opacity-50
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-(--btn-focus)
          disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : ""}
        `}
      >
        <option value="" className="bg-white dark:bg-gray-900">
          Chagua
        </option>

        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white dark:bg-gray-900"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">{error}</span>
      )}
    </div>
  );
}
