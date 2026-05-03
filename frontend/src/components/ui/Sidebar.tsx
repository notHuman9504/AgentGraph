import React from "react";
import { useDnD } from "../../contexts/DnDContext";

type Node = {
  label: string;
  type: string;
  icon: string;
}

type SidebarProps = {
  nodeList: Node[];
}

export default ({ nodeList }: SidebarProps) => {
  const [_, setType] = useDnD();

  const onDragStart = (
    event: React.DragEvent<HTMLElement>,
    nodeType: string,
  ) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";

    const ghost = event.currentTarget.cloneNode(true) as HTMLElement;
    ghost.style.backgroundColor = "#e2e8f0";
    ghost.style.borderRadius = "6px";
    ghost.style.opacity = "1";
    ghost.style.position = "absolute";
    ghost.style.top = "-1000px";
    ghost.style.width = `${event.currentTarget.offsetWidth}px`;
    document.body.appendChild(ghost);

    event.dataTransfer.setDragImage(
      ghost,
      ghost.offsetWidth / 2,
      ghost.offsetHeight / 2,
    );

    event.currentTarget.addEventListener(
      "dragend",
      () => {
        document.body.removeChild(ghost);
      },
      { once: true },
    );
  };

  return (
    <div draggable={false} className="py-4 px-2">
      {nodeList.map((node) => (
        <div
  key={node.type}
  className="p-2 rounded-md shadow-sm bg-slate-50 hover:bg-slate-100 my-2 cursor-grab"
  onDragStart={(event) => onDragStart(event, node.type)}
  draggable
>
  <div className="flex items-center gap-2 min-w-0">
    <div
      className="shrink-0 w-8 h-8"
      dangerouslySetInnerHTML={{ __html: node.icon }}
    />
    <span className="truncate text-sm">
      {node.label || "Invalid Type"}
    </span>
  </div>
</div>
      ))}
    </div>
  );
};
