import { Input } from "./ui/input";

function LabelInput ( { inputTitle, props}: { inputTitle: string, props: React.ComponentProps<"input"> }) {
    return (
        <div>
            <h3 className="font-medium">{inputTitle}</h3>
            <Input {...props} />
        </div>
    )
}

export default LabelInput;