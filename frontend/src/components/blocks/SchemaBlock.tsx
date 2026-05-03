import { useCallback, useMemo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import SchemaForm from "./SchemaForm";

export type PortType = "text" | "file" | "number" | "boolean" | "image" | "audio" | "video";

export interface InputField {
  key: string;
  type: PortType;
  label: string;
  placeholder?: string;
  default?: string | number;
  fieldType?: "text" | "textarea" | "number" | "secret" | "file" | "dropdown"; // form rendering type, defaults based on port type
  options?: { value: string; label: string }[]; // for dropdown fieldType
  accept?: string;
}

export interface OutputField {
  key: string;
  type: PortType;
  label: string;
}

export interface BlockSchema {
  type: string;
  label: string;
  icon: string;
  inputs: InputField[];
  outputs: OutputField[];
}

interface SchemaBlockProps {
  id: string;
  data: {
    uniqueName: string;
    config: Record<string, any>;
    schema: BlockSchema;
  };
  selected?: boolean;
}

export default function SchemaBlock({ id, data, selected }: SchemaBlockProps) {
  const { schema, config } = data;
  const { setNodes, setEdges, getEdges } = useReactFlow();

  // Compute which input handles are connected (exclude auto-generated variable edges)
  const connectedInputs = useMemo(() => {
    const edges = getEdges();
    const connected = new Set<string>();
    for (const edge of edges) {
      if (edge.target === id && edge.targetHandle && edge.data?.type !== "variable") {
        connected.add(edge.targetHandle);
      }
    }
    return connected;
  }, [getEdges, id]);

  const handleDelete = useCallback(() => {
    setNodes((nodes) => nodes.filter((n) => n.id !== id));
    setEdges((edges) =>
      edges.filter((e) => e.source !== id && e.target !== id)
    );
  }, [id, setNodes, setEdges]);

  const handleSave = useCallback(
    (newUniqueName: string, newConfig: Record<string, any>) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, uniqueName: newUniqueName, config: newConfig } } : n
        )
      );
    },
    [id, setNodes]
  );

  return (
    <div
      className={`
        rounded-lg border-2 transition-all duration-200 border-[1px]
        ${selected ? "border-blue-400 shadow-lg shadow-blue-100" : "border-gray-300 shadow-md"}
        bg-white min-w-[140px] w-[220px]
      `}
    >
      <div className="relative p-2 select-none">
        {/* Delete button */}
        <button
          className="nodrag nopan absolute -top-2 -right-2 z-10 bg-white rounded-full p-0.5 border border-gray-300 hover:border-red-300 hover:text-red-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <TrashIcon className="w-3 h-3" />
        </button>

        <div className="flex items-center gap-2">
          {/* Icon */}
          <div
            className="shrink-0 w-6 h-6 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: schema.icon }}
          />
          {/* Display Label (schema label) */}
          <span className="text-[11px] font-medium text-gray-700 leading-tight truncate">
            {schema.label}
          </span>
        </div>

        {/* Input handles - left side (exclude dropdown/number/secret/config-only fields) */}
        {schema.inputs
          .filter((input) => {
            if (!input.fieldType) return true; // No fieldType means show handle (default)
            return !["dropdown", "number", "secret"].includes(input.fieldType);
          })
          .map((input, i) => (
            <Handle
              key={`in-${input.key}`}
              id={input.key}
              type="target"
              position={Position.Left}
              style={{ top: `${20 + i * 16}px` }}
              className="!w-2 !h-2 !bg-gray-400"
            />
          ))}

        {/* Output handles - right side */}
        {schema.outputs.map((output, i) => (
          <Handle
            key={`out-${output.key}`}
            id={output.key}
            type="source"
            position={Position.Right}
            style={{ top: `${20 + i * 16}px` }}
            className="!w-2 !h-2 !bg-gray-400"
          />
        ))}
      </div>

      <div className="nodrag nopan border-t border-gray-100">
        <SchemaForm
          id={id}
          uniqueName={data.uniqueName}
          inputs={schema.inputs}
          outputs={schema.outputs}
          values={config}
          connectedInputs={connectedInputs}
          onSubmit={handleSave}
        />
      </div>
    </div>
  );
}
