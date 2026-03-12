import PrimaryButton from "../../PrimaryButton";

const TextOutputConfigPanel = ({config}) => {
  return (
    <>
      <div className="h-full">
        <form className="h-full">
          <div className="flex flex-col h-full justify-between py-8">
            <div>
            <input
            defaultValue={config.value}
              name="textValue"
              type="text"
              placeholder="Enter your text input"
            />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextOutputConfigPanel;
