import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Label } from "recharts";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Create new event</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            placeholder="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">
            Description
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 mt-1"
            />
          </Label>
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="text-right">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="col-span-3 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={1}
              />
              <div className="flex justify-end gap-2 p-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDate(undefined)}
                >
                  Cancel
                </Button>
                <Button size="sm">Apply</Button>
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
      </DialogContent>
    </Dialog>
  );
}
