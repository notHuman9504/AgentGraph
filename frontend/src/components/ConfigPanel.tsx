import { BLOCK_REGISTRY } from "./blocks/blockRegistry";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ConfigPanel = ({ node, closePanel, onSave }) => {
  const ConfigComponent = BLOCK_REGISTRY[node.type].configComponent;
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full z-39 bg-black/30"></div>
      <div className="fixed right-0 top-0 h-full z-40 w-2/5 bg-white z-50 shadow-lg p-4">
        <div>
          <button
            className="flex items-center gap-1 text-gray-500 hover:text-red-600 active:scale-90 transition-transform duration-100"
            onClick={closePanel}
          >
            <XMarkIcon className="h-4 w-4 stroke-3"/>
            <span>Close</span>
          </button>
        </div>
        <div className="h-full">
          <ConfigComponent
            config={node.data.config}
            onSave={(config) => {
              onSave({
                ...node,
                data: { ...node.data, config },
              });
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ConfigPanel;
