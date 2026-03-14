import { Handle, Position } from "@xyflow/react";
import BlockWrapper from "../BlockWrapper";

const TextInputBlock = ({ data, id, type }) => {
  return (
    <BlockWrapper BlockId={id} BlockData={data} BlockType={type}>
      <div className="border-white border bg-radial from-gray-500 to-gray-400 w-14 h-6 rounded-md text-[7px] shadow-gray-500/50 shadow-lg">
        <div className="relative flex items-center w-full h-full">
          <div className="w-full h-full flex justify-center text-white items-center">
            Text Input
          </div>

          <Handle
            type="source"
            position={Position.Right}
            id="text_value"
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextInputBlock;
