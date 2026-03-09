import React from 'react';
import { useDnD } from '../hooks/DnDContext';

export default ({nodeKeys}) => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div draggable={false} className="p-4">
        {nodeKeys.map((key)=>{
            return <div onDragStart={(event) => onDragStart(event, key)} draggable>
                {key || "Invalid Type"}
            </div>
        })}
    </div>
  );
};
