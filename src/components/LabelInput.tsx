import { Input } from "./ui/input";

interface LabelInputProps {
  inputTitle: string;
  props?: React.ComponentProps<"input">;
}

function LabelInput({ inputTitle, props }: LabelInputProps) {
  return (
    <div>
      <h3 className="font-medium">{inputTitle}</h3>
      <Input {...props} />
    </div>
  );
}

export default LabelInput;
