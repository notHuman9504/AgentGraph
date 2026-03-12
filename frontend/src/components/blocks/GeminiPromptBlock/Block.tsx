import { Handle, Position } from "@xyflow/react";
import BlockWrapper from "../BlockWrapper";

const GeminiPromptBlock = ({ data, id, type }) => {
  return (
    <BlockWrapper BlockId={id} BlockData={data} BlockType={type}>
      <div className="border-white border-2 bg-radial from-blue-500 to-blue-400 w-14 h-14 rounded-xl text-[7px] shadow-blue-500/50 shadow-lg">
        <div className="relative flex items-center w-full h-full">
             <Handle
            type="target"
            position={Position.Left}
          />

          <div className="w-full h-full flex justify-center text-white items-center">
            Gemini
          </div>

          <Handle
            type="source"
            position={Position.Right}
            id="generated_text"
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default GeminiPromptBlock;
