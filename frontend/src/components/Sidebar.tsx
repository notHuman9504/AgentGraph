import React from 'react';
import { useDnD } from '../hooks/DnDContext';

export default ({nodeKeys}) => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';

    const ghost = event.currentTarget.cloneNode(true) as HTMLElement;
    ghost.style.backgroundColor = '#e2e8f0';
    ghost.style.borderRadius = '8px';
    ghost.style.opacity = '1';
    ghost.style.position = 'absolute';
    ghost.style.top = '-1000px';
    ghost.style.width = `${event.currentTarget.offsetWidth}px`;
    document.body.appendChild(ghost);

    event.dataTransfer.setDragImage(ghost, ghost.offsetWidth / 2, ghost.offsetHeight / 2);

    event.currentTarget.addEventListener('dragend', () => {
      document.body.removeChild(ghost);
    }, { once: true });
  };

  return (
    <div draggable={false} className="py-4 px-2">
      {nodeKeys.map((key) => (
        <div
          key={key}
          className="p-1 rounded-lg hover:bg-slate-200 my-1"
          onDragStart={(event) => onDragStart(event, key)}
          draggable
        >
          {key || "Invalid Type"}
        </div>
      ))}
    </div>
  );
};