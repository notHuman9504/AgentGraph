import { useState, useCallback, useMemo, type ChangeEvent } from "react";
import { useReactFlow } from "@xyflow/react";
import type { InputField, OutputField } from "./SchemaBlock";
import VariableChipsEditor from "./VariableChipsEditor";

/* ── Types ── */
export type FieldType = "text" | "textarea" | "number" | "secret" | "file" | "boolean" | "image" | "audio" | "video" | "dropdown";

export interface SchemaField {
  key: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  default?: string | number;
  accept?: string;
}

interface SchemaFormProps {
  id: string;
  uniqueName: string;
  inputs: InputField[];
  outputs: OutputField[];
  values: Record<string, any>;
  connectedInputs: Set<string>;
  onSubmit: (uniqueName: string, values: Record<string, any>) => void;
  readOnly?: boolean;
}

/* ── Inline SVG icons ── */
function EyeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

/* ── Helpers ── */
function getFieldType(input: InputField): FieldType {
  if (input.fieldType) return input.fieldType;
  switch (input.type) {
    case "text": return "textarea";
    case "number": return "number";
    case "file":
    case "image":
    case "audio":
    case "video": return "file";
    case "boolean": return "text";
    default: return "text";
  }
}

/* ── Individual field renderers ── */
function TextField({ field, value, onChange, disabled, validVariables }: { field: InputField; value: string; onChange: (v: string) => void; disabled?: boolean; validVariables?: Set<string> }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      <VariableChipsEditor value={value || ""} onChange={onChange} placeholder={field.placeholder} rows={1} disabled={disabled} validVariables={validVariables} />
    </div>
  );
}

function TextareaField({ field, value, onChange, disabled, validVariables }: { field: InputField; value: string; onChange: (v: string) => void; disabled?: boolean; validVariables?: Set<string> }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      <VariableChipsEditor value={value || ""} onChange={onChange} placeholder={field.placeholder} rows={3} disabled={disabled} validVariables={validVariables} />
    </div>
  );
}

function NumberField({ field, value, onChange, disabled }: { field: InputField; value: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      <input
        type="number"
        value={value ?? ""}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder={field.placeholder}
        step="0.1"
        disabled={disabled}
        readOnly={disabled}
        className={`w-full bg-gray-50 border rounded px-2 py-1 text-xs text-gray-700 focus:outline-none ${disabled ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-200 focus:border-blue-400"}`}
      />
    </div>
  );
}

function SecretField({ field, value, onChange, disabled }: { field: InputField; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      <div className={`flex items-center bg-gray-50 border rounded px-2 py-1 ${disabled ? "border-gray-100 bg-gray-100" : "border-gray-200 focus-within:border-blue-400"}`}>
        <input
          type={visible ? "text" : "password"}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder || "••••••••"}
          disabled={disabled}
          readOnly={disabled}
          className={`flex-1 bg-transparent text-xs text-gray-700 focus:outline-none ${disabled ? "text-gray-400 cursor-not-allowed" : ""}`}
        />
        {!disabled && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="text-gray-400 hover:text-gray-600 ml-1 shrink-0"
          >
            {visible ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}

function FileField({ field, value, onChange, disabled }: { field: InputField; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsText(file);
  }, [onChange]);

  if (disabled) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
        <div className="w-full bg-gray-100 border border-gray-100 rounded px-2 py-1 text-xs text-gray-400 cursor-not-allowed">
          File input disabled
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      {value ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600 truncate flex-1">File loaded</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept={field.accept}
          onChange={handleFileChange}
          className="w-full text-xs text-gray-600 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
        />
      )}
    </div>
  );
}

function DropdownField({ field, value, onChange, disabled }: { field: InputField; value: string; onChange: (v: string) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{field.label}</label>
      <select
        value={value || field.default || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full bg-gray-50 border rounded px-2 py-1 text-xs text-gray-700 focus:outline-none ${disabled ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed" : "border-gray-200 focus:border-blue-400"}`}
      >
        {field.options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Main SchemaForm component ── */
export default function SchemaForm({ id, uniqueName, inputs, outputs, values, connectedInputs, onSubmit, readOnly }: SchemaFormProps) {
  const { getNodes } = useReactFlow();
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftUniqueName, setDraftUniqueName] = useState(uniqueName);
  const [draft, setDraft] = useState<Record<string, any>>({ ...values });
  const [nameError, setNameError] = useState<string | null>(null);

  // Sync draft with prop values when not editing name
  if (!isEditingName && (draftUniqueName !== uniqueName || JSON.stringify(draft) !== JSON.stringify(values))) {
    setDraftUniqueName(uniqueName);
    setDraft({ ...values });
  }

  const updateField = (key: string, value: any) => {
    if (connectedInputs.has(key)) return;
    const newDraft = { ...draft, [key]: value };
    setDraft(newDraft);
    onSubmit(draftUniqueName, newDraft);
  };

  const isNameUnique = (newName: string): boolean => {
    const nodes = getNodes();
    return !nodes.some((n) => n.id !== id && n.data?.uniqueName === newName);
  };

  // Compute all valid output variable references from all nodes on canvas
  const validVariables = useMemo(() => {
    const nodes = getNodes();
    const set = new Set<string>();
    for (const node of nodes) {
      const uniqueName = node.data?.uniqueName as string | undefined;
      const schema = node.data?.schema as { outputs: OutputField[] } | undefined;
      if (!uniqueName || !schema?.outputs) continue;
      for (const output of schema.outputs) {
        set.add(`${uniqueName}.${output.key}`);
      }
    }
    return set;
  }, [getNodes]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters, no spaces or newlines
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9_]/g, "");
    setDraftUniqueName(sanitized);
    if (sanitized && !isNameUnique(sanitized)) {
      setNameError("Name must be unique");
    } else {
      setNameError(null);
    }
  };

  const handleNameSave = () => {
    if (!draftUniqueName || !isNameUnique(draftUniqueName)) {
      setNameError("Name must be unique");
      return;
    }
    onSubmit(draftUniqueName, draft);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setDraftUniqueName(uniqueName);
    setNameError(null);
    setIsEditingName(false);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {/* Unique Name Field with edit mode */}
      <div className="flex flex-col gap-1 pb-2 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Block Name</label>
          {!readOnly && (
            <div className="flex items-center gap-1">
              {isEditingName ? (
                <>
                  <button
                    type="button"
                    onClick={handleNameCancel}
                    className="px-1 h-5 text-[9px] text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleNameSave}
                    className="px-2 h-5 text-[9px] font-medium text-white rounded bg-blue-400 hover:bg-blue-500 shadow-sm transition-colors"
                  >
                    Save
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="px-2 h-5 text-[9px] font-medium text-blue-500 rounded bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  Edit
                </button>
              )}
            </div>
          )}
        </div>
        <input
          type="text"
          value={draftUniqueName}
          onChange={handleNameChange}
          disabled={readOnly || !isEditingName}
          readOnly={readOnly || !isEditingName}
          placeholder="Enter block name..."
          className={`w-full bg-gray-50 border rounded px-2 py-1 text-xs text-gray-700 focus:outline-none font-medium ${
            readOnly || !isEditingName ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed" : nameError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-blue-400"
          }`}
        />
        {nameError && (
          <span className="text-[10px] text-red-500">{nameError}</span>
        )}
      </div>

      {inputs.map((input) => {
        const v = draft[input.key];
        const disabled = readOnly || connectedInputs.has(input.key);
        switch (getFieldType(input)) {
          case "text":
            return <TextField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} validVariables={validVariables} />;
          case "textarea":
            return <TextareaField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} validVariables={validVariables} />;
          case "number":
            return <NumberField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} />;
          case "secret":
            return <SecretField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} />;
          case "file":
            return <FileField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} />;
          case "dropdown":
            return <DropdownField key={input.key} field={input} value={v} onChange={(val) => updateField(input.key, val)} disabled={disabled} />;
          default:
            return null;
        }
      })}

      {/* Output ports info */}
      {outputs.length > 0 && (
        <div className="flex flex-col gap-1 pt-2 border-t border-gray-100">
          <label className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Outputs</label>
          {outputs.map((output) => (
            <div key={output.key} className="flex items-center gap-1 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-gray-300" />
              {output.label}
              <span className="text-[9px] text-gray-400 ml-1">({output.type})</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
