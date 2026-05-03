import SchemaBlock from "./SchemaBlock";
import type { BlockSchema } from "./SchemaBlock";

const INPUT_ICON = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>input</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M8,9.7a2,2,0,0,1,.6-1.4A21.6,21.6,0,0,1,24,2a22,22,0,0,1,0,44A21.6,21.6,0,0,1,8.6,39.7a2,2,0,1,1,2.8-2.8,18,18,0,1,0,0-25.8,1.9,1.9,0,0,1-2.8,0A2,2,0,0,1,8,9.7Z"></path> <path d="M33.4,22.6l-7.9-8a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L27.2,22H4a2,2,0,0,0-2,2H2a2,2,0,0,0,2,2H27.2l-4.6,4.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l7.9-8A1.9,1.9,0,0,0,33.4,22.6Z"></path> </g> </g> </g></svg>`;

const OUTPUT_ICON = `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>output</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="Layer_6" data-name="Layer 6"> <g> <path d="M45.4,22.6l-7.9-8a2.1,2.1,0,0,0-2.7-.2,1.9,1.9,0,0,0-.2,3L39.2,22H16a2,2,0,0,0,0,4H39.2l-4.6,4.6a1.9,1.9,0,0,0,.2,3,2.1,2.1,0,0,0,2.7-.2l7.9-8A1.9,1.9,0,0,0,45.4,22.6Z"></path> <path d="M28,42H24A18,18,0,0,1,24,6h4a2,2,0,0,0,1.4-.6A2,2,0,0,0,30,4a2.4,2.4,0,0,0-.2-.9A2,2,0,0,0,28,2H23.8a22,22,0,0,0,.1,44H28a2,2,0,0,0,1.4-.6l.4-.5A2.4,2.4,0,0,0,30,44,2,2,0,0,0,28,42Z"></path> </g> </g> </g> </g></svg>`;

const GEMINI_ICON = `<svg viewBox="0 0 296 298" fill="none"><mask id="gemini__a" width="296" height="298" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#3186FF" d="M141.201 4.886c2.282-6.17 11.042-6.071 13.184.148l5.985 17.37a184.004 184.004 0 0 0 111.257 113.049l19.304 6.997c6.143 2.227 6.156 10.91.02 13.155l-19.35 7.082a184.001 184.001 0 0 0-109.495 109.385l-7.573 20.629c-2.241 6.105-10.869 6.121-13.133.025l-7.908-21.296a184 184 0 0 0-109.02-108.658l-19.698-7.239c-6.102-2.243-6.118-10.867-.025-13.132l20.083-7.467A183.998 183.998 0 0 0 133.291 26.28l7.91-21.394Z"/></mask><g mask="url(#gemini__a)"><g filter="url(#gemini__b)"><ellipse cx="163" cy="149" fill="#3689FF" rx="196" ry="159"/></g><g filter="url(#gemini__c)"><ellipse cx="33.5" cy="142.5" fill="#F6C013" rx="68.5" ry="72.5"/></g><g filter="url(#gemini__d)"><ellipse cx="19.5" cy="148.5" fill="#F6C013" rx="68.5" ry="72.5"/></g><g filter="url(#gemini__e)"><path fill="#FA4340" d="M194 10.5C172 82.5 65.5 134.333 22.5 135L144-66l50 76.5Z"/></g><g filter="url(#gemini__f)"><path fill="#FA4340" d="M190.5-12.5C168.5 59.5 62 111.333 19 112L140.5-89l50 76.5Z"/></g><g filter="url(#gemini__g)"><path fill="#14BB69" d="M194.5 279.5C172.5 207.5 66 155.667 23 155l121.5 201 50-76.5Z"/></g><g filter="url(#gemini__h)"><path fill="#14BB69" d="M196.5 320.5C174.5 248.5 68 196.667 25 196l121.5 201 50-76.5Z"/></g></g><defs><filter id="gemini__b" width="464" height="390" x="-69" y="-46" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="18"/></filter><filter id="gemini__c" width="265" height="273" x="-99" y="6" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="gemini__d" width="265" height="273" x="-113" y="12" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="gemini__e" width="299.5" height="329" x="-41.5" y="-130" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="gemini__f" width="299.5" height="329" x="-45" y="-153" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="gemini__g" width="299.5" height="329" x="-41" y="91" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter><filter id="gemini__h" width="299.5" height="329" x="-39" y="132" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_69_17998" stdDeviation="32"/></filter></defs></svg>`;

export const BLOCK_REGISTRY: Record<string, BlockSchema> = {
  textInputBlock: {
    type: "textInputBlock",
    label: "Text Input",
    icon: INPUT_ICON,
    inputs: [
      {
        key: "text",
        type: "text",
        label: "Text Value",
        placeholder: "Enter text value...",
        default: "",
        fieldType: "textarea",
      },
    ],
    outputs: [
      {
        key: "text",
        type: "text",
        label: "Text Output",
      },
    ],
  },
  geminiPromptBlock: {
    type: "geminiPromptBlock",
    label: "Gemini Prompt",
    icon: GEMINI_ICON,
    inputs: [
      {
        key: "model",
        type: "text",
        label: "Model",
        default: "gemini-1.5-flash",
        fieldType: "dropdown",
        options: [
          { value: "gemini-1.5-flash", label: "Gemini 1.5 Flash" },
          { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro" },
          { value: "gemini-1.5-flash-8b", label: "Gemini 1.5 Flash 8B" },
          { value: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
          { value: "gemini-2.0-flash-lite", label: "Gemini 2.0 Flash Lite" },
          { value: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
        ],
      },
      {
        key: "apiKey",
        type: "text",
        label: "API Key",
        placeholder: "Enter Gemini API key...",
        default: "",
        fieldType: "secret",
      },
      {
        key: "prompt",
        type: "text",
        label: "System Prompt",
        placeholder: "Enter system prompt...",
        default: "",
        fieldType: "textarea",
      },
      {
        key: "temperature",
        type: "number",
        label: "Temperature",
        placeholder: "0.0 - 2.0",
        default: 0.7,
        fieldType: "number",
      },
    ],
    outputs: [
      {
        key: "response",
        type: "text",
        label: "LLM Response",
      },
    ],
  },
  textOutputBlock: {
    type: "textOutputBlock",
    label: "Text Output",
    icon: OUTPUT_ICON,
    inputs: [
      {
        key: "text",
        type: "text",
        label: "Output Text",
        placeholder: "Output will appear here...",
        default: "",
        fieldType: "textarea",
      },
    ],
    outputs: [],
  },
};

/* default configs keyed by block type */
export const defaultConfigs: Record<string, Record<string, any>> = {};
for (const [type, schema] of Object.entries(BLOCK_REGISTRY)) {
  defaultConfigs[type] = Object.fromEntries(
    schema.inputs.map((f) => [f.key, f.default ?? ""])
  );
}

/* ReactFlow nodeTypes map — every type uses the generic SchemaBlock */
export const nodeTypes = Object.fromEntries(
  Object.keys(BLOCK_REGISTRY).map((type) => [type, SchemaBlock])
);

/* Sidebar node list */
export const nodeList = Object.values(BLOCK_REGISTRY).map((schema) => ({
  type: schema.type,
  label: schema.label,
  icon: schema.icon,
}));

export type { BlockSchema };
export default BLOCK_REGISTRY;