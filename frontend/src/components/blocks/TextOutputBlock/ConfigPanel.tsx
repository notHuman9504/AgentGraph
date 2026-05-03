import LabeledTextArea from "../../forms/LabeledTextArea";

const TextOutputConfigPanel = ({config}) => {
  return (
    <>
      <div className="h-full">
        <form className="h-full">
          <div className="flex flex-col h-full justify-between pt-8">
            <div>
              <LabeledTextArea
                name={"textValue"}
                label={"Text Value"}
                defaultValue={config.value || ""}
                placeholder="No Value"
                disabled={true}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextOutputConfigPanel;