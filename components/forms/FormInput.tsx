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
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
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
          rounded-lg border
          bg-white dark:bg-gray-900
          px-3 py-2.5 text-sm
          text-gray-800 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          transition-all duration-200
          focus:outline-none focus:ring-2
          disabled:opacity-60 disabled:cursor-not-allowed
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
          }
        `}
      />

      {/* ERROR */}
      {error && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}
