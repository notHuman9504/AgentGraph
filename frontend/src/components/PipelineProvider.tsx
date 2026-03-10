import { createContext, useState, useContext } from 'react';

const BlockContext = createContext();

export const PipelineProvider = ({ children }) => {
const [blockId, setBlockId] = useState(null);

return (
<BlockContext.Provider value={{ blockId, setBlockId }}>
{children}
</BlockContext.Provider>
);
};

export const useBlock = () => useContext(BlockContext);

export default BlockContext;