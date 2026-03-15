import LabeledTextArea from "../../inputs/LabeledTextArea"
import PrimaryButton from "../../PrimaryButton";

const TextInputConfigPanel = ({config, onSave}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const textValue = formData.get("textValue")

    config.value = textValue;
    onSave(config);
  };
  return (
    <>
      <div className="h-full">
        <form className="h-full" onSubmit={handleSubmit}>
          <div className="flex flex-col h-full justify-between pt-8">
            <div>
              <LabeledTextArea
                name={"textValue"}
                label={"Text Value"}
                defaultValue={config.value || ""}
                placeholder="Enter your text value here..."
              />
            </div>
            <PrimaryButton/>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextInputConfigPanel;