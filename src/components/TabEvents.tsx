import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface TabEventsProps {
  children: React.ReactNode;
  className?: string;
}

const TabEvents: React.FC<TabEventsProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        "min-h-[max(300px,calc(100vh-600px))]",
        "max-h-[calc(100vh-600px)]",
        className
      )}
    >
      <div className="flex justify-center mb -4">
        <Button variant="pointer">Novo Evento</Button>
      </div>
      <div className="flex-1 overflow-x-auto overflow-y-auto pr-2">
        {children}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default TabEvents;