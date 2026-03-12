import { createContext, useState, useContext } from 'react';

const BlockContext = createContext();

export const PipelineProvider = ({ children }) => {
const [blockId, setBlockId] = useState(null);
const [nodes, setNodes] = useState([]);
const [edges, setEdges] = useState([]);

return (
<BlockContext.Provider value={{ blockId, setBlockId, nodes, setNodes, edges, setEdges}}>
{children}
</BlockContext.Provider>
);
};

export const useBlock = () => useContext(BlockContext);

export default BlockContext;