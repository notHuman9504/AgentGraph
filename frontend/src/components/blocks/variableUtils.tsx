/* ── Variable interpolation helpers ── */

export interface VariableRef {
  blockName: string;
  field: string;
  raw: string;
}

const VAR_REGEX = /\{\{([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\}\}/g;

/** Extract all {{block.field}} references from a string */
export function extractVariables(text: string): VariableRef[] {
  const refs: VariableRef[] = [];
  const seen = new Set<string>();
  let m: RegExpExecArray | null;
  // Reset lastIndex in case the same regex is reused
  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    const key = `${m[1]}.${m[2]}`;
    if (!seen.has(key)) {
      seen.add(key);
      refs.push({ blockName: m[1], field: m[2], raw: m[0] });
    }
  }
  return refs;
}

/** Render text with {{block.field}} shown as blue spans without braces */
export function renderVariableText(text: string): (string | JSX.Element)[] {
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  VAR_REGEX.lastIndex = 0;

  while ((match = VAR_REGEX.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before) parts.push(before);
    parts.push(
      <span key={`${match.index}-${match[1]}-${match[2]}`} className="text-blue-500 font-medium">
        {match[1]}.{match[2]}
      </span>
    );
    lastIndex = match.index + match[0].length;
  }

  const after = text.slice(lastIndex);
  if (after) parts.push(after);

  return parts.length ? parts : [text || ""];
}

/** Append `{{blockName.field}}` to the end of text */
export function appendVariable(text: string, blockName: string, field: string): string {
  const varStr = `{{${blockName}.${field}}}`;
  if (!text) return varStr;
  const trimmed = text.trimEnd();
  return trimmed + (trimmed.endsWith(" ") ? "" : " ") + varStr;
}
