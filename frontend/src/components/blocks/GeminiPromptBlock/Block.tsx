import { Handle, Position } from "@xyflow/react";
import BlockWrapper from "../BlockWrapper";
import geminiImage from "../../../assets/gemini.png";

const GeminiPromptBlock = ({ data, id, type }) => {
  return (
    <BlockWrapper BlockId={id} BlockData={data} BlockType={type}>
      <div className="border-white border bg-radial from-blue-500 to-blue-400 w-14 h-14 rounded-md text-[7px] shadow-blue-500/50 shadow-lg">
        <div className="relative flex items-center w-full h-full">
          <Handle type="target" position={Position.Left} />

          <div className="w-full h-full flex flex-col justify-center items-center gap-0.5 p-[2px]">
            <img
              src={geminiImage}
              alt="Gemini"
              className="flex-1 min-h-0 w-full object-contain bg-white p-1 rounded-sm"
            />
            <span className="text-white text-[7px] leading-none">Gemini</span>
          </div>

          <Handle type="source" position={Position.Right} id="generated_text" />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default GeminiPromptBlock;
