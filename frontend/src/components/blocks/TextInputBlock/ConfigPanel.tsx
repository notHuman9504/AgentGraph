const TextInputConfigPanel = ({config, onSave}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const textValue = formData.get("textValue")
    console.log(textValue)

    config.value = textValue;
    onSave(config);
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <input
            defaultValue={config.value}
              name="textValue"
              type="text"
              placeholder="Enter your text input"
            />
            <button type="submit" className=" border bg-cyan-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TextInputConfigPanel;
