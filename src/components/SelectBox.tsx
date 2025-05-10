import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Items {
  value: any;
  label: string;
}

interface SelectBoxProps{
  items: Items[];
  selectLabel?: string;
  placeholderText: string;
  onChange?: (value: any) => void;
  className?: string;
  value?: string;
}

export function SelectBox({ items, selectLabel, placeholderText, onChange, className, value}: SelectBoxProps) {
  return (
    <div className={className}>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full hover:cursor-pointer" >
        <SelectValue placeholder={placeholderText}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>

          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} className="hover:cursor-pointer">{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}
