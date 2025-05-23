import React from "react";

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
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500">{date}</p>
        </div>

        <div className="mt-2">
          <p className="text-gray-600">{description}</p>
        </div>

        <div className="mt-4 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Added by {addedBy} on {addedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
