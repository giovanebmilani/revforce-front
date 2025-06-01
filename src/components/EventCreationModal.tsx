import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: {
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
  }) => void;
}

export function EventCreationModal({
  isOpen,
  onClose,
  onCreate,
}: EventCreationModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 6, 1),
    to: new Date(2024, 6, 31),
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleCreate = () => {
    if (!name || !date?.from || !date?.to) return;

    onCreate({
      name,
      description,
      startDate: date.from,
      endDate: date.to,
    });

    setName("");
    setDescription("");
    setDate(undefined);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create new event</DialogTitle>
        </DialogHeader>
        <div className="pl-2 space-y-6 py-4">
          <div className="space-y-1">
            <h2 className="font-semibold">Name</h2>
            <Input
              placeholder="Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold">Description</h2>
            <Textarea
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[200px] justify-start font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      format(date.from, "MMM d") +
                      " - " +
                      format(date.to, "MMM d, y")
                    ) : (
                      format(date.from, "MMM d, y")
                    )
                  ) : (
                    <div className="flex items-center">
                      <span>Pick a date</span>
                      <ChevronDown className="ml-16 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">
                      {format(date?.from || new Date(), "MMMM, yyyy")}
                    </span>
                  </div>
                </div>
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                  className="border-0"
                  classNames={{
                    head_cell: "text-xs font-normal text-gray-500 w-8 h-8",
                    cell: "text-sm w-8 h-8",
                    day: "w-8 h-8",
                    nav_button: "h-6 w-6 bg-transparent hover:bg-transparent",
                  }}
                />
                <div className="flex justify-end gap-2 p-3 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDate(undefined)}
                    className="h-8 px-3"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 px-3"
                    disabled={!date?.from || !date?.to}
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
