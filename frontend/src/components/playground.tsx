import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DnDProvider, useDnD } from "../hooks/DnDContext";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import {nodeTypes} from "./blocks/blockRegistry";

const initialNodes = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "input",
  },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" } },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

const getId = () => `dndnode_${uuidv4()}`;

function FlowPlayground() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onDragOver = useCallback((event) => {
    console.log("Drag over event:", event);
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
        console.log("Drop event:", event);
      event.preventDefault();

      // check if the dropped element is valid
      if (!type) {
        return;
      }

      console.log("Creating node of type:", type);

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, type],
  );

  const onDragStart = (event, nodeType) => {
    console.log("Drag started with type:", nodeType);
    setType(nodeType);
    event.dataTransfer.setData('text/plain', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (<div className="flex h-full">
  <div className="inline-block w-64 border-r overflow-auto">
    <div className="sticky top-0">
        <button className="bg-blue-500 text-white px-4 py-2 m-4 rounded">
            Run
        </button>
    </div>
    <Sidebar nodeKeys={Object.keys(nodeTypes)}/>
  </div>
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        fitView
      />
    </div>
    </div>
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

