import React from "react";
import { Bell } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  addedBy: string;
  addedDate: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  description,
  addedBy,
  addedDate,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <div className="p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 flex items-start justify-center h-10 w-10 rounded-lg bg-amber-50 text-gray-600">
            <Bell className="h-5 w-5 mt-2.5" />
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-baseline">
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
              <p className="text-sm text-gray-500">{date}</p>
            </div>

            <div className="mt-2">
              <p className="text-gray-800">• {description}</p>
            </div>

            <div className="pt-4 border-gray-200">
              <p className="text-xs text-gray-500">
                Added by {addedBy} on {addedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
