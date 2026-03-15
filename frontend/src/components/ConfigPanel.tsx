import { BLOCK_REGISTRY } from "./blocks/blockRegistry";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useBlock } from "./PipelineProvider";

const ConfigPanel = ({ node, closePanel, onSave }) => {
  const { blockId } = useBlock();
  const [visible, setVisible] = useState(false);
  const ConfigComponent = BLOCK_REGISTRY[node.type].configComponent;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(closePanel, 250);
  };

  return (
    <div
      style={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        transform: visible ? "translateX(0)" : "translateX(calc(100% + 1.5rem))",
        transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="fixed right-6 top-6 h-[calc(100%-90px)] rounded-lg z-50 w-100 bg-white p-4 flex flex-col"
    >
      <div>
        <button
          className="flex items-center gap-1 text-gray-500 hover:text-red-600 active:scale-90 transition-transform duration-100"
          onClick={handleClose}
        >
          <XMarkIcon className="h-4 w-4 stroke-3" />
          <span>Close</span>
        </button>
      </div>
      <div className="h-full">
        <ConfigComponent
          key={blockId}
          config={node.data.config}
          onSave={(config) => {
            onSave({ ...node, data: { ...node.data, config } });
            handleClose();
          }}
        />
      </div>
    </div>
  );
};

export default ConfigPanel;