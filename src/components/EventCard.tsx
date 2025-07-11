import React from "react";
import { Bell, Pencil, Trash } from "lucide-react";
import { EventType } from "@/api/events";


type EventCardProps = EventType & {
  onDelete: (eventId: string) => void;
  onEdit: (event: EventType) => void;
};

const EventCard: React.FC<EventCardProps> = ({
  id,
  name,
  date,
  description,
  color,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="min-w-[300px] max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-h-2xl m-1">
      <div className="p-3">
        <div className="flex gap-2">
          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg text-gray-700"
            style={{
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: color,
            }}>
            <Bell className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <h2 className="text-xl font-bold text-gray-900">{name}</h2>
              <div className="flex items-center gap-2">
                <p className="text-s text-gray-900">
                  {new Date(date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </p>
                <button
                  onClick={() => onEdit({ id, name, date, description, color })}
                  className="p-1 text-gray-600 hover:text-black"
                  title="Editar"
                >
                  <Pencil className="h-4 w-4 cursor-pointer" />
                </button>
                <button
                  onClick={() => onDelete(id)}
                  className="p-1 text-gray-600 hover:text-black"
                  title="Excluir"
                >
                  <Trash className="h-4 w-4 cursor-pointer" />
                </button>
              </div>
            </div>

            <div className="ml-4 pt-2">
              <p className="text-gray-900">• {description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;