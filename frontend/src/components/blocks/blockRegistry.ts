import GeminiPromptBlock from "./GeminiPromptBlock/Block";
import GeminiPromptBlockConfigPanel from "./GeminiPromptBlock/ConfigPanel";
import { geminiPromptBlockSchema } from "./GeminiPromptBlock/schema";
import TextInputBlock from "./TextInputBlock/Block";
import TextInputConfigPanel from "./TextInputBlock/ConfigPanel";
import { inputBlockSchema } from "./TextInputBlock/schema";
import TextOutputBlock from "./TextOutputBlock/Block";
import TextOutputConfigPanel from "./TextOutputBlock/ConfigPanel";
import { outputBlockSchema } from "./TextOutputBlock/schema";

export const BLOCK_REGISTRY = {
    textInputBlock : {
        label : "Text Input Block",
        component : TextInputBlock,
        configComponent : TextInputConfigPanel,
        defaultConfig: inputBlockSchema,
        inputs: 0,
        outputs: 1,
    },
    geminiPromptBlock : {
        label : "Gemini Prompt Block",
        component : GeminiPromptBlock,
        configComponent: GeminiPromptBlockConfigPanel,
        defaultConfig: geminiPromptBlockSchema,
        inputs: 1,
        outputs: 1,
    },
    textOutputBlock : {
        label : "Text Output Block",
        component : TextOutputBlock,
        configComponent : TextOutputConfigPanel,
        defaultConfig: outputBlockSchema,
        inputs: 0,
        outputs: 1,
    },
}

export const nodeTypes = Object.fromEntries(
  Object.entries(BLOCK_REGISTRY).map(([type, block]) => [type, block.component])
);