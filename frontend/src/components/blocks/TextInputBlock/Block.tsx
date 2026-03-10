import { Handle, Position } from "@xyflow/react";
import BlockWrapper from "../BlockWrapper";

const TextInputBlock = ({ data, id, type }) => {
  return (
    <BlockWrapper BlockId={id} BlockData={data} BlockType={type}>
      <div className="p-1 py-2 rounded-sm bg-sky-200 w-24 text-[7px]">
        <div className="relative flex items-center mt-1">
          <div className="w-full">
            Text Value:
            <div>
              <p className="overflow-hidden border-[0.5px] rounded-xs p-[2px] text-[6px]">
                {data?.config?.value || "Empty.."}
              </p>
            </div>
          </div>

          <Handle
            type="source"
            position={Position.Right}
            id="text-output"
            style={{
              position: "relative",
              transform: "none",
              right: -7,
              top: 4,
            }}
          />
        </div>
      </div>
    </BlockWrapper>
  );
};

export default TextInputBlock;
