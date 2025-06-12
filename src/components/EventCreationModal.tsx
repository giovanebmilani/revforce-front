import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Calendar } from "./ui/calendar";

interface EventCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: { name: string; description: string; date: Date; color: string }) => void;
  onUpdate?: (event: { id: string; name: string; description: string; date: Date; color: string }) => void;
  initialData?: {
    id: string;
    name: string;
    description: string;
    date: Date;
    color: string;
  };
}

const cores = [
  "#FFFFFF",
  "#EF4444",
  "#F59E0B",
  "#FFFF00",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
];

export function EventCreationModal({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  initialData,
}: EventCreationModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(2024, 6, 1));
  const [selectedColor, setSelectedColor] = useState(cores[0]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !initialData) {
      setName("");
      setDescription("");
      setSelectedDate(undefined);
      setSelectedColor(cores[0]);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setSelectedDate(new Date(initialData.date));
      setSelectedColor(initialData.color);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name || !selectedDate) return;

    if (initialData && onUpdate) {
      onUpdate({
        id: initialData.id,
        name,
        description,
        date: selectedDate,
        color: selectedColor,
      });
    } else {
      onCreate({
        name,
        description,
        date: selectedDate,
        color: selectedColor,
      });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Editar evento" : "Criar um evento"}
          </DialogTitle>
        </DialogHeader>
        <div className="pl-2 space-y-6 py-4">
          <div className="space-y-1">
            <h2 className="font-semibold">Nome</h2>
            <Input
              placeholder="Nome"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <h2 className="font-semibold">Descrição</h2>
            <Textarea
              id="description"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="flex flex-col items-center space-y-2">
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outlinePointer"}
                  className="w-[200px] justify-start font-normal"
                >
                  <CalendarIcon className="mr-3 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "MMM d, y")
                  ) : (
                    <div className="flex items-center">
                      <span>Data</span>
                      <ChevronDown className="ml-20 h-4 w-4" />
                    </div>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  defaultMonth={selectedDate}
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  numberOfMonths={1}
                  className="border-0"
                  classNames={{
                    head_cell: "text-xs font-normal text-gray-500 w-8 h-8",
                    cell: "text-sm w-8 h-8 py-1",
                    day: "w-8 h-8  p-2 rounded-none",
                    caption_label: "ml-8 text-xl font-medium",
                    nav: "h-1",
                  }}
                />
                <div className="flex justify-center gap-2 p-3">
                  <Button
                    variant="outlinePointer"
                    size="sm"
                    onClick={() => {
                      setSelectedDate(undefined);
                      setIsPopoverOpen(false);
                    }}
                    className="h-8 px-3"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="pointer"
                    size="sm"
                    className="h-8 px-3"
                    disabled={!selectedDate}
                    onClick={() => setIsPopoverOpen(false)}
                  >
                    Confirmar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-1">
            <h2 className="font-semibold text-center">Cor</h2>
            <div className="flex justify-center gap-2">
              {cores.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${isSelected ? "ring-2 ring-offset-2 ring-black" : "border-gray-300" 
                      }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <Button variant="outlinePointer" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="pointer" onClick={handleSubmit}>
              {initialData ? "Salvar" : "Criar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
