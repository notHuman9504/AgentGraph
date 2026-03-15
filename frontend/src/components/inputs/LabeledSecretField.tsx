import { useState } from "react";

export default function LabeledSecretInput({
  id,
  label,
  name,
  number,
  placeholder = "secret-••••••••••••••••••••••",
  value,
  onChange,
  defaultValue,
  disabled = false,
  className = "",
}) {
  const [visible, setVisible] = useState(false);
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
            flex items-center gap-2
            rounded-lg border bg-white px-3.5 py-2.5
            transition-colors duration-150
            ${disabled
              ? "border-gray-100 bg-gray-50 cursor-not-allowed"
              : "border-gray-200 hover:border-gray-300 focus-within:border-gray-400"
            }
          `}
        >
          <input
            type={visible ? "text" : "password"}
            id={id}
            name={name}
            placeholder={placeholder}
            disabled={disabled}
            autoComplete="off"
            spellCheck={false}
            {...(isControlled
              ? { value, onChange }
              : { defaultValue }
            )}
            className={`
              flex-1 min-w-0 bg-transparent text-sm font-light text-gray-800
              placeholder:text-gray-300 outline-none
              tracking-widest placeholder:tracking-normal
              ${disabled ? "cursor-not-allowed text-gray-400" : ""}
            `}
          />
 
          {/* Toggle visibility button */}
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            disabled={disabled}
            className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors duration-150 disabled:pointer-events-none outline-none"
            aria-label={visible ? "Hide value" : "Show value"}
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
 
 
/* ── inline SVG icons (no extra dependency) ── */
 
function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
 
function EyeOffIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}