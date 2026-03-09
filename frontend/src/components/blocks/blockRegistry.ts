import TextInputBlock from "./TextInputBlock/Block";

export const BLOCK_REGISTRY = {
    textInputBlock : {
        label : "Text Input",
        component : TextInputBlock,
        defaultConfig: { value: '' },
        inputs: 0,
        outputs: 1,
    }
}

export const nodeTypes = Object.fromEntries(
  Object.entries(BLOCK_REGISTRY).map(([type, block]) => [type, block.component])
);