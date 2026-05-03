import { useState, useCallback, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MarkerType,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DnDProvider, useDnD } from "../contexts/DnDContext";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "../components/ui/Sidebar";
import {BLOCK_REGISTRY, defaultConfigs, nodeList, nodeTypes} from "../components/blocks/blockRegistry";
import { useBlock } from "../contexts/PipelineProvider";
import RunButton from "../components/ui/RunButton";
import { extractVariables, appendVariable } from "../components/blocks/variableUtils";
import type { BlockSchema, InputField } from "../components/blocks/SchemaBlock";

const getId = () => `${uuidv4()}`;

function FlowPlayground() {
  const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();
  const [type] = useDnD();
  const [menuOpen, setMenuOpen] = useState(true); 
  const { nodes, setNodes, edges, setEdges } = useBlock();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot: Node[]) => applyNodeChanges(changes, nodesSnapshot)),
    [setNodes],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      // Handle manual deletion of variable edges: remove {{...}} from target text
      const removeChanges = changes.filter((c) => c.type === 'remove') as { id: string; type: 'remove' }[];
      if (removeChanges.length > 0) {
        const currentEdges = getEdges();
        const currentNodes = getNodes();

        for (const change of removeChanges) {
          const edge = currentEdges.find((e) => e.id === change.id);
          if (!edge || edge.data?.type !== 'variable') continue;

          const targetNode = currentNodes.find((n) => n.id === edge.target);
          const sourceNode = currentNodes.find((n) => n.id === edge.source);
          if (!targetNode || !sourceNode) continue;

          const targetHandle = edge.targetHandle as string;
          const sourceHandle = edge.sourceHandle as string;
          const sourceName = sourceNode.data?.uniqueName as string;
          const config = targetNode.data?.config as Record<string, any> | undefined;
          if (!config || !sourceName || !targetHandle || !sourceHandle) continue;

          const currentText = config[targetHandle] || "";
          const varRegex = new RegExp(`\\s*\\{\\{${sourceName}\\.${sourceHandle}\\}\\}`, "g");
          const newText = currentText.replace(varRegex, "").trimStart();

          // Update the target node config
          setNodes((nds: Node[]) =>
            nds.map((n) => {
              if (n.id !== targetNode.id) return n;
              const nData = n.data as Record<string, any>;
              const nConfig = nData.config as Record<string, any>;
              return { ...n, data: { ...nData, config: { ...nConfig, [targetHandle]: newText } } };
            })
          );
        }
      }

      setEdges((edgesSnapshot: Edge[]) => applyEdgeChanges(changes, edgesSnapshot));
    },
    [setEdges, setNodes, getEdges, getNodes],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.target || !params.targetHandle || !params.sourceHandle) {
        setEdges((edgesSnapshot: Edge[]) => addEdge(params, edgesSnapshot));
        return;
      }

      const targetNode = nodes.find((n) => n.id === params.target);
      const sourceNode = nodes.find((n) => n.id === params.source);
      if (!targetNode || !sourceNode) {
        setEdges((edgesSnapshot: Edge[]) => addEdge(params, edgesSnapshot));
        return;
      }

      const schema = targetNode.data.schema as BlockSchema;
      const input = schema.inputs.find((i: InputField) => i.key === params.targetHandle);
      const isTextLike = input && (input.fieldType === "text" || input.fieldType === "textarea" || (!input.fieldType && input.type === "text"));

      if (isTextLike && sourceNode.data.uniqueName) {
        // Append variable to text instead of creating a raw edge
        const sourceName = sourceNode.data.uniqueName as string;
        const fieldName = params.sourceHandle as string;
        const currentText = (targetNode.data.config as Record<string, any>)[params.targetHandle] || "";
        const newText = appendVariable(currentText, sourceName, fieldName);

        setNodes((nds: Node[]) =>
          nds.map((n) => {
            if (n.id !== params.target) return n;
            const nodeData = n.data as Record<string, any>;
            const config = nodeData.config as Record<string, any>;
            return {
              ...n,
              data: {
                ...nodeData,
                config: { ...config, [params.targetHandle as string]: newText },
              },
            };
          })
        );
        // Edge will be auto-created by the useEffect below
      } else {
        setEdges((edgesSnapshot: Edge[]) => addEdge(params, edgesSnapshot));
      }
    },
    [setEdges, setNodes, nodes],
  );

  // Auto-sync edges from {{BlockName.field}} variables in text/textarea configs
  useEffect(() => {
    const variableEdges: Edge[] = [];
    const variableEdgeIds = new Set<string>();

    for (const targetNode of nodes) {
      const schema = targetNode.data.schema as BlockSchema;
      const config = targetNode.data.config as Record<string, any>;
      if (!schema || !config) continue;

      for (const input of schema.inputs) {
        const isTextLike = input.fieldType === "text" || input.fieldType === "textarea" || (!input.fieldType && input.type === "text");
        if (!isTextLike) continue;

        const text = config[input.key] || "";
        const vars = extractVariables(text);

        for (const v of vars) {
          const sourceNode = nodes.find((n) => (n.data as Record<string, any>).uniqueName === v.blockName);
          if (!sourceNode) continue;

          const edgeId = `${sourceNode.id}-${v.field}-${targetNode.id}-${input.key}`;
          variableEdgeIds.add(edgeId);
          variableEdges.push({
            id: edgeId,
            source: sourceNode.id,
            sourceHandle: v.field,
            target: targetNode.id,
            targetHandle: input.key,
            markerEnd: { type: MarkerType.ArrowClosed },
            data: { type: "variable" },
          });
        }
      }
    }

    setEdges((currentEdges: Edge[]) => {
      // Keep edges that are either non-variable or still valid variable edges
      const keptEdges = currentEdges.filter((e) => {
        if (e.data?.type !== "variable") return true;
        return variableEdgeIds.has(e.id);
      });

      // Add new variable edges that don't exist yet
      const existingIds = new Set(keptEdges.map((e) => e.id));
      const newEdges = variableEdges.filter((e) => !existingIds.has(e.id));

      return [...keptEdges, ...newEdges];
    });
  }, [nodes, setEdges]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!type) {
        return;
      }

      const schema = BLOCK_REGISTRY[type];
      const defaultConfig = { ...defaultConfigs[type] };

      // Generate unique name (alphanumeric only, no spaces)
      const getUniqueName = (baseName: string) => {
        const sanitizedBase = baseName.replace(/[^a-zA-Z0-9_]/g, "");
        const existingNames = new Set(nodes.map((n: Node) => n.data?.uniqueName));
        let counter = 0;
        while (existingNames.has(`${sanitizedBase}_${counter}`)) {
          counter++;
        }
        return `${sanitizedBase}_${counter}`;
      };
      const uniqueName = getUniqueName(schema.label);

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { uniqueName, config: defaultConfig, schema },
      };

      setNodes((nds: Node[]) => nds.concat(newNode));
    },
    [screenToFlowPosition, type, nodes],
  );

  return (<>
  <div className="fixed z-20 bottom-1 w-32 right-1">
      <RunButton/>
    </div>
  
  <div className="flex h-full p-3 bg-slate-300">
  <div className={"inline-block overflow-visible transition-all duration-300 " + (menuOpen ? "w-64" : "w-0")}>
    <div className="my-6 h-6 relative">
      <span onClick={()=>{
        setMenuOpen(prev => !prev)
      }} className={`${menuOpen ? "bg-red-400 shadow-red-400/50" : "bg-blue-400 shadow-blue-400/50"} transition-all duration-300 absolute w-66 h-12 px-4 z-10 -right-12 rounded-lg flex border-2 border-white flex justify-between items-center shadow-lg text-white`}>
<div>
    Close
</div>
<div>
<PlusIcon className={`w-6 h-6 stroke-2 transition-transform duration-300 ${menuOpen ? "rotate-45" : "rotate-0"}`}/>
</div>
      </span>
    </div>
    <Sidebar nodeList={nodeList}/>
  </div>
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        defaultEdgeOptions={{
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="rounded-lg shadow-md"
        fitView
      >
        <Background variant={BackgroundVariant.Lines} gap={24} bgColor="white" color="#cccccc2e" />
        </ReactFlow>
    </div>
    </div>
    </>
  );
}


function Playground () {
  return ( 
  <ReactFlowProvider>
    <DnDProvider>
      <FlowPlayground />
    </DnDProvider>
  </ReactFlowProvider>
);
}

export default Playground;

