import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectBox({ items, selectLabel, placeholderText }: { items: string[], selectLabel? : string, placeholderText : string }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] hover:cursor-pointer" >
        <SelectValue placeholder={placeholderText}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{selectLabel}</SelectLabel>

          {items.map((item) => (
            <SelectItem value="hover:cursor-pointer">{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
