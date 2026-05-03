import { createContext, useContext, useState } from 'react';
import React from 'react';

type DnDProps = {
  children : React.ReactNode
}

type DnDContextType = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>
];

const DnDContext = createContext<DnDContextType>([null, (_) => {}]);

export const DnDProvider = ({ children } : DnDProps) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DnDContext.Provider value={[type, setType]}>
      {children}
    </DnDContext.Provider>
  );
}

export default DnDContext;

export const useDnD = () => {
  return useContext(DnDContext);
}