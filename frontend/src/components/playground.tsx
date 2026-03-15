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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { DnDProvider, useDnD } from "../hooks/DnDContext";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./Sidebar";
import {BLOCK_REGISTRY, nodeList, nodeTypes} from "./blocks/blockRegistry";
import { useBlock } from "./PipelineProvider";
import ConfigPanel from "./ConfigPanel";
import RunButton from "./RunButton";

const getId = () => `${uuidv4()}`;

function FlowPlayground() {
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  const [menuOpen, setMenuOpen] = useState(false); 
  const { blockId, setBlockId, nodes, setNodes, edges, setEdges } = useBlock();

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

      const defaultConfig = {...BLOCK_REGISTRY[type].defaultConfig};

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { config : defaultConfig },
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

  return (<>
  <div className="fixed z-20 bottom-1 w-32 right-1">
      <RunButton/>
    </div>
  
  <div className="flex h-full p-3 bg-slate-300">
  <div className={"inline-block overflow-visible transition-all duration-300 " + (menuOpen ? "w-64" : "w-0")}>
    { 
        blockId && <ConfigPanel node = {nodes.find(node => {
            return node.id === blockId
        })} 
        onSave={(node)=>{
          let updatedNodes = nodes.map(ele => {
            if(ele.id == blockId)return node;
            return ele;
          })

          setNodes(updatedNodes)
        }}
        closePanel={()=>{
            setBlockId(null);
        }
      } />
    }
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
        onDragStart={onDragStart}
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

