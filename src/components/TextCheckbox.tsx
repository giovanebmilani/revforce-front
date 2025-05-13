import { Checkbox } from "./ui/checkbox";

interface LabelCheckboxProps {
  label: string;
  props?: React.ComponentProps<typeof Checkbox>;
}

const LabelCheckbox: React.FC<LabelCheckboxProps> = ({ label, props }) => {
  return (
    <label className="flex items-center gap-2">
      <Checkbox {...props} />
      {label}
    </label>
  );
};

export default LabelCheckbox;
