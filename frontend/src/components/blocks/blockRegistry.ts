import TextInputBlock from "./TextInputBlock/Block";
import TextInputConfigPanel from "./TextInputBlock/ConfigPanel";
import { inputBlockSchema } from "./TextInputBlock/schema";

export const BLOCK_REGISTRY = {
    textInputBlock : {
        label : "Text Input",
        component : TextInputBlock,
        configComponent : TextInputConfigPanel,
        defaultConfig: inputBlockSchema,
        inputs: 0,
        outputs: 1,
    }
}

export const nodeTypes = Object.fromEntries(
  Object.entries(BLOCK_REGISTRY).map(([type, block]) => [type, block.component])
);