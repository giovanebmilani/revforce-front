import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectBox({ items, title, instruction }: { items: string[], title : string, instruction : string }) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] hover:cursor-pointer" >
        <SelectValue placeholder={instruction}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>

          {items.map((item) => (
            <SelectItem value="apple hover:cursor-pointer">{item}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
