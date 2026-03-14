import { BLOCK_REGISTRY } from "./blocks/blockRegistry";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ConfigPanel = ({ node, closePanel, onSave }) => {
  const ConfigComponent = BLOCK_REGISTRY[node.type].configComponent;
  return (
    <>
      {/* <div className="fixed left-0 top-0 w-full h-full z-39 bg-black/30"></div> */}
      <div style={{
        boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      }} className="fixed right-6 top-6 h-[calc(100%-90px)] rounded-lg z-40 w-100 bg-white z-50 p-4">
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
