interface InputProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export default function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  required = false,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {/* LABEL */}
      <label
        htmlFor={name}
        className="text-sm font-medium text-(--text-primary)"
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>

      {/* INPUT */}
      <input
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
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
      />

      {/* ERROR */}
      {error && (
        <span role="alert" className="text-xs text-red-600">
          {error}
        </span>
      )}
    </div>
  );
}
