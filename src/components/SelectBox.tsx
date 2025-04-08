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

export function SelectBox({ items, selectLabel, placeholderText }: { items: Items[], selectLabel? : string, placeholderText : string }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] hover:cursor-pointer" >
        <SelectValue placeholder={placeholderText}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>

          {items.map((item) => (
            <SelectItem value={item.value} className="hover:cursor-pointer">{item.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
