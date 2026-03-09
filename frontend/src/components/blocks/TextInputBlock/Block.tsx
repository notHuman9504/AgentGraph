import BlockWrapper from "../BlockWrapper"

const TextInputBlock = ({ data }) => {
    return (
    <BlockWrapper>
        <div className="border-1 rounded-sm text-xs">
            Text Value:
            <p className="overflow-hidden">
                {data?.config?.value || "Empty.."}
            </p>
        </div>
    </BlockWrapper>
    )
}

export default TextInputBlock