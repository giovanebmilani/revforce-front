import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { EventCreationModal } from "./EventCreationModal";
import { useDeleteEvent, useListEvents, usePostNewEvent } from "@/api/events";
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import EventCard from "./EventCard";
import { EventType } from "@/api/events";

interface TabEventsProps {
  className?: string;
  chartId: string;
}

const TabEvents: React.FC<TabEventsProps> = ({ className, chartId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const { data: events, isLoading } = useListEvents(chartId);
  const { mutateAsync: postNewEvent } = usePostNewEvent(chartId);
  const { mutate: deleteEvent } = useDeleteEvent(chartId);

  const handleCreateEvent = (event: { name: string; description: string; date: Date; color: string }) => {
    postNewEvent({
      chart_id: chartId,
      name: event.name,
      description: event.description,
      date: event.date.toISOString(),
      color: event.color,
    }).then(() => {
      toast.success("Evento criado com sucesso!");
    }).catch((err) => {
      console.error("Erro ao criar evento:", err);
      toast.error("Erro ao criar o evento!");
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    deleteEvent(eventId, {
      onSuccess: () => toast.success("Evento deletado com sucesso!"),
      onError: () => toast.error("Erro ao deletar o evento!"),
    });
  };

  const sortedEvents = events?.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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

      <div className="flex justify-center mb-4">
        <Button
          variant="pointer"
          onClick={() => setIsEventModalOpen(true)}
        >
          Novo Evento
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto pr-2">
        {isLoading && <p className="text-center text-gray-500">Carregando eventos...</p>}

        {!isLoading && sortedEvents?.length === 0 && (
          <p className="text-center text-gray-500">Nenhum evento cadastrado.</p>
        )}

        {sortedEvents?.map((event: EventType) => (
          <EventCard key={event.id} {...event} onDelete={handleDeleteEvent} />
        ))}

        <div ref={scrollRef} />
      </div>

      <Toaster />
    </div>
  );
};

export default TabEvents;
