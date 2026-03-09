import { createContext, useState } from 'react';
import { BLOCK_REGISTRY } from '../blocks/blockRegistry.tsx';

const PipelineContext = createContext();

export const PipelineProvider = ({ children }) => {
  const [blockConfigs, setBlockConfigs] = useState({});

  const addBlockConfig = (blockId, blockType) => {
    const defaultConfig = BLOCK_REGISTRY[blockType].defaultConfig;
    setBlockConfigs(prev => ({
      ...prev,
      [blockId]: defaultConfig
    }));
  };

  const removeBlockConfig = (blockId) => {
    setBlockConfigs(prev => {
      const updated = { ...prev };
      delete updated[blockId];
      return updated;
    });
  };

  const updateBlockConfig = (blockId, newConfig) => {
    setBlockConfigs(prev => ({
      ...prev,
      [blockId]: newConfig
    }));
  };

  const getBlockConfig = (blockId) => {
    return blockConfigs[blockId];
  };

  return (
    <PipelineContext.Provider value={{
      blockConfigs,
      addBlockConfig,
      removeBlockConfig,
      updateBlockConfig,
      getBlockConfig
    }}>
      {children}
    </PipelineContext.Provider>
  );
};

export default PipelineContext;