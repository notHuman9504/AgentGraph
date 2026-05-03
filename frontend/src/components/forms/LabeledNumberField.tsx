export default function LabeledNumberField({
  id,
  label,
  name,
  number,
  placeholder = "",
  value,
  onChange,
  defaultValue,
  min,
  max,
  step = 1,
  disabled = false,
  className = "",
}) {
  const isControlled = value !== undefined;
 
  return (
    <div className={`flex items-start gap-5 ${className}`}>
      {/* Index badge */}
      {number && (
        <span className="w-10 text-right text-xs text-gray-300 pt-0.5 shrink-0 tabular-nums">
          {number}
        </span>
      )}
 
      {/* Label + Input */}
      <div className="flex-1">
        <label
          htmlFor={id}
          className="block text-xs font-medium tracking-wide text-gray-500 mb-1.5 cursor-pointer"
        >
          {label}
        </label>
 
        <div
          className={`
            rounded-lg border bg-white px-3.5 py-2.5
            transition-colors duration-150
            ${disabled
              ? "border-gray-100 bg-gray-50 cursor-not-allowed"
              : "border-gray-200 hover:border-gray-300 focus-within:border-gray-400"
            }
          `}
        >
          <input
            type="number"
            id={id}
            name={name}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            disabled={disabled}
            {...(isControlled
              ? { value, onChange }
              : { defaultValue }
            )}
            className={`
              w-full bg-transparent text-sm font-light text-gray-800
              placeholder:text-gray-300 outline-none
              [appearance:textfield]
              [&::-webkit-outer-spin-button]:appearance-none
              [&::-webkit-inner-spin-button]:appearance-none
              ${disabled ? "cursor-not-allowed text-gray-400" : ""}
            `}
          />
        </div>
 
        {/* Min / Max hint */}
        {(min !== undefined || max !== undefined) && (
          <p className="mt-1.5 text-xs text-gray-300 font-light">
            {min !== undefined && max !== undefined
              ? `${min} – ${max}`
              : min !== undefined
              ? `Min ${min}`
              : `Max ${max}`}
          </p>
        )}
      </div>
    </div>
  );
}