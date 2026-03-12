import PrimaryButton from "../../PrimaryButton";

const GeminiPromptBlockConfigPanel = ({config, onSave}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const textValue = formData.get("textValue")

    // config.value = textValue;
    // onSave(config);
  };
  return (
    <>
      <div className="h-full">
        <form className="h-full" onSubmit={handleSubmit}>
          <div className="flex flex-col h-full justify-between py-8">
            <div>
            <input
            defaultValue={config.value}
              name="textValue"
              type="text"
              placeholder="Enter your text input"
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
