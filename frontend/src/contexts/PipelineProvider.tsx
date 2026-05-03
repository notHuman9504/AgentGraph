import { createContext, useState, useContext } from 'react';
import React from 'react';
import type { Node, Edge } from "@xyflow/react";

type PipelineProviderProps = {
    children : React.ReactNode,
}

interface BlockContextValue {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

const BlockContext = createContext<BlockContextValue>({
  nodes: [],
  setNodes: () => {},
  edges: [],
  setEdges: () => {},
});

export const PipelineProvider = ({ children } : PipelineProviderProps) => {
const [nodes, setNodes] = useState<Node[]>([]);
const [edges, setEdges] = useState<Edge[]>([]);

return (
<BlockContext.Provider value={{ nodes, setNodes, edges, setEdges}}>
{children}
</BlockContext.Provider>
);
};

export const useBlock = () => useContext(BlockContext);

export default BlockContext;