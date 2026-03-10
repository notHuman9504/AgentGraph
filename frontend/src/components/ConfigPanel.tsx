import { BLOCK_REGISTRY } from "./blocks/blockRegistry";
import { useBlock } from "./PipelineProvider";

const ConfigPanel = ({ node, closePanel, onSave }) => {
  const ConfigComponent = BLOCK_REGISTRY[node.type].configComponent;
  return (
    <>
      <div className="fixed left-0 top-0 w-full h-full z-39 bg-black/30"></div>
      <div className="fixed right-0 top-0 h-full z-40 w-80 bg-white z-50 shadow-lg p-4">
        <div>
          <button
            onClick={() => {
              closePanel();
            }}
          >
            Close
          </button>
        </div>
        <div>
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
