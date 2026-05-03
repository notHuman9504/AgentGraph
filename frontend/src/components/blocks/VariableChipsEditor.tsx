import { useRef, useEffect, useCallback, useState } from "react";

const VAR_REGEX = /\{\{([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)\}\}/g;

interface Segment {
  type: "text" | "variable";
  text: string;
  blockName?: string;
  field?: string;
}

function parseSegments(text: string, validVariables?: Set<string>): Segment[] {
  const segments: Segment[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;

  VAR_REGEX.lastIndex = 0;
  while ((m = VAR_REGEX.exec(text)) !== null) {
    const isValid = !validVariables || validVariables.has(`${m[1]}.${m[2]}`);
    if (m.index > lastIndex) {
      segments.push({ type: "text", text: text.slice(lastIndex, m.index) });
    }
    if (isValid) {
      segments.push({ type: "variable", text: m[0], blockName: m[1], field: m[2] });
    } else {
      segments.push({ type: "text", text: m[0] });
    }
    lastIndex = m.index + m[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", text: text.slice(lastIndex) });
  }

  return segments.length ? segments : text ? [{ type: "text", text }] : [];
}

function buildDOM(div: HTMLDivElement, segments: Segment[], placeholder?: string) {
  div.innerHTML = "";

  if (segments.length === 0 && placeholder) {
    const span = document.createElement("span");
    span.className = "text-gray-400";
    span.textContent = placeholder;
    div.appendChild(span);
    return;
  }

  for (const seg of segments) {
    if (seg.type === "text") {
      const lines = seg.text.split("\n");
      lines.forEach((line, i) => {
        if (i > 0) div.appendChild(document.createElement("br"));
        div.appendChild(document.createTextNode(line));
      });
    } else {
      const chip = document.createElement("span");
      chip.className =
        "inline-flex items-center gap-1 mx-0.5 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium select-none";
      chip.contentEditable = "false";
      chip.dataset.var = seg.text;

      const label = document.createElement("span");
      label.textContent = `${seg.blockName}.${seg.field}`;
      chip.appendChild(label);

      const xBtn = document.createElement("span");
      xBtn.textContent = "×";
      xBtn.className = "cursor-pointer hover:text-red-500 ml-0.5";
      xBtn.title = "Remove variable";
      chip.appendChild(xBtn);

      div.appendChild(chip);
    }
  }
}

function readDOM(div: HTMLDivElement): string {
  let result = "";

  function walk(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent || "";
      return;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.var) {
        result += el.dataset.var;
        return;
      }
      if (el.tagName === "BR") {
        result += "\n";
        return;
      }
      for (const child of el.childNodes) {
        walk(child);
      }
    }
  }

  for (const child of div.childNodes) {
    walk(child);
  }

  return result;
}

/** Check if any text node in the DOM contains raw {{...}} that isn't a chip yet */
function domHasUnrenderedVariables(div: HTMLDivElement, validVariables?: Set<string>): boolean {
  function walk(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      VAR_REGEX.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = VAR_REGEX.exec(text)) !== null) {
        const isValid = !validVariables || validVariables.has(`${m[1]}.${m[2]}`);
        if (isValid) return true;
      }
      return false;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.var) return false; // Already a chip
      if (el.tagName === "BR") return false;
      for (const child of el.childNodes) {
        if (walk(child)) return true;
      }
    }
    return false;
  }
  for (const child of div.childNodes) {
    if (walk(child)) return true;
  }
  return false;
}

/** Get current cursor position as a flat text offset */
function getCursorOffset(div: HTMLDivElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return -1;
  const range = sel.getRangeAt(0);

  let offset = 0;
  function walk(node: Node) {
    if (node === range.startContainer) {
      offset += range.startOffset;
      return true;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      offset += node.textContent?.length || 0;
      return false;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.var) {
        offset += (el.dataset.var || "").length;
        return false;
      }
      if (el.tagName === "BR") {
        offset += 1;
        return false;
      }
      for (const child of el.childNodes) {
        if (walk(child)) return true;
      }
    }
    return false;
  }

  walk(div);
  return offset;
}

/** Set cursor to a flat text offset */
function setCursorOffset(div: HTMLDivElement, targetOffset: number) {
  let current = 0;
  function walk(node: Node): boolean {
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length || 0;
      if (current + len >= targetOffset) {
        const range = document.createRange();
        range.setStart(node, targetOffset - current);
        range.collapse(true);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
        return true;
      }
      current += len;
      return false;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as HTMLElement;
      if (el.dataset.var) {
        const len = (el.dataset.var || "").length;
        if (current + len >= targetOffset) {
          // Place cursor after the chip
          const range = document.createRange();
          range.setStartAfter(el);
          range.collapse(true);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          return true;
        }
        current += len;
        return false;
      }
      if (el.tagName === "BR") {
        if (current + 1 >= targetOffset) {
          const range = document.createRange();
          range.setStartAfter(el);
          range.collapse(true);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
          return true;
        }
        current += 1;
        return false;
      }
      for (const child of el.childNodes) {
        if (walk(child)) return true;
      }
    }
    return false;
  }

  walk(div);
}

interface VariableChipsEditorProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  validVariables?: Set<string>;
}

export default function VariableChipsEditor({
  value,
  onChange,
  placeholder,
  rows = 1,
  disabled,
  validVariables,
}: VariableChipsEditorProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(false);

  // Rebuild DOM when value changes externally or validVariables changes
  useEffect(() => {
    if (!divRef.current) return;
    const currentText = readDOM(divRef.current);
    if (currentText !== value) {
      const segs = parseSegments(value, validVariables);
      buildDOM(divRef.current, segs, placeholder);
    }
  }, [value, placeholder, validVariables]);

  const handleInput = useCallback(() => {
    if (!divRef.current || disabled) return;
    const div = divRef.current;

    // Check if any raw {{...}} exists that should be chipped
    if (domHasUnrenderedVariables(div, validVariables)) {
      const text = readDOM(div);
      const cursor = getCursorOffset(div);

      // Rebuild with chips
      const segs = parseSegments(text, validVariables);
      buildDOM(div, segs, placeholder);

      // Restore cursor
      if (cursor >= 0) {
        setCursorOffset(div, cursor);
      }
    } else {
      // Normal typing - just read text and fire onChange
      const text = readDOM(div);
      onChange(text);
    }
  }, [onChange, disabled, placeholder, validVariables]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;
      const target = e.target as HTMLElement;
      const chip = target.closest("[data-var]") as HTMLElement | null;
      if (chip && target.textContent === "×") {
        e.preventDefault();
        e.stopPropagation();

        const div = divRef.current;
        if (!div) return;

        // Remove only this chip from the DOM
        chip.remove();

        // Read the new text and rebuild
        const text = readDOM(div);
        onChange(text);

        const segs = parseSegments(text, validVariables);
        buildDOM(div, segs, placeholder);
      }
    },
    [onChange, disabled, placeholder, validVariables]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (rows === 1 && e.key === "Enter") {
        e.preventDefault();
      }
    },
    [disabled, rows]
  );

  return (
    <div
      ref={divRef}
      contentEditable={!disabled}
      suppressContentEditableWarning
      onInput={handleInput}
      onClick={handleClick}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
      className={`w-full bg-gray-50 border rounded px-2 py-1 text-xs text-gray-700 focus:outline-none whitespace-pre-wrap ${
        disabled
          ? "border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed"
          : focused
          ? "border-blue-400"
          : "border-gray-200"
      }`}
      style={{
        minHeight: rows === 1 ? "28px" : `${rows * 20 + 4}px`,
        maxHeight: rows === 1 ? "28px" : undefined,
        overflow: rows === 1 ? "hidden" : undefined,
        lineHeight: "20px",
      }}
      data-placeholder={placeholder}
    />
  );
}
