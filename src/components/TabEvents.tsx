import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { EventCreationModal } from "./EventCreationModal";
import { usePostNewEvent } from "@/api/events";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";

interface TabEventsProps {
  children: React.ReactNode;
  className?: string;
  chartId: string;
}

const TabEvents: React.FC<TabEventsProps> = ({ children, className, chartId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const { mutateAsync: postNewEvent } = usePostNewEvent(chartId);

  const handleCreateEvent = (event: { name: string; description: string; date: Date; color: string }) => {
    postNewEvent({
      chart_id: chartId,
      name: event.name,
      description: event.description,
      date: event.date.toISOString(),
      color: event.color,
    }).catch(() => {
      toast.error("Erro ao criar o evento!");
    });
    toast.success("Evento criado com sucesso!");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        "min-h-[max(300px,calc(100vh-600px))]",
        "max-h-[calc(100vh-600px)]",
        className
      )}
    >
      <EventCreationModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onCreate={handleCreateEvent}
      />

      <div className="flex justify-center mb -4">
        <Button variant="pointer" onClick={
          () => {
            setIsEventModalOpen(true);
          }
        }>Novo Evento</Button>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto pr-2">
        {children}
        <div ref={scrollRef} />
      </div>
      <Toaster />
    </div>
  );
};

export default TabEvents;