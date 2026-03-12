import { Handle, Position } from "@xyflow/react";
import BlockWrapper from "../BlockWrapper";

const TextOutputBlock = ({ data, id, type }) => {
  return (
    <BlockWrapper BlockId={id} BlockData={data} BlockType={type}>
      <div className="border-white border-2 bg-radial from-emerald-500 to-teal-400 w-14 h-6 rounded-full text-[7px] shadow-emerald-500/50 shadow-lg">
        <div className="relative flex items-center w-full h-full">
          <Handle
            type="target"
            position={Position.Left}
          />
          <div className="w-full h-full flex justify-center text-white items-center">
            Text Output
          </div>
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextOutputBlock;
