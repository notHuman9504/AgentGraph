import LabeledNumberField from "../../forms/LabeledNumberField";
import LabeledSecretInput from "../../forms/LabeledSecretField";
import PrimaryButton from "../../ui/PrimaryButton";

const defaultTemperature = 0.7;

const GeminiPromptBlockConfigPanel = ({config, onSave}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("apiKey")
    const temperature = formData.get("temperature")
    config.apiKey = apiKey;
    config.temperature = temperature;
    onSave(config);
  };
  return (
    <>
      <div className="h-full">
        <form className="h-full" onSubmit={handleSubmit}>
          <div className="flex flex-col h-full justify-between pt-8">
            <div className="flex flex-col gap-4">
              <LabeledSecretInput
              name={"apiKey"}
              label={"API Key"}
              defaultValue={config.apiKey || ""}
              placeholder="Enter your API key here..."
              />
              <LabeledNumberField
              name={"temperature"}
              label={"Temperature"}
              defaultValue={config.temperature || defaultTemperature}
              />
            </div>
            <PrimaryButton/>
          </div>
        </form>
      </div>
    </>
  );
};

export default GeminiPromptBlockConfigPanel;