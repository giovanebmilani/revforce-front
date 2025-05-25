import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TabEventsProps {
  children: React.ReactNode;
  className?: string;
}

const TabEvents: React.FC<TabEventsProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return (
    <div className={cn("h-full max-h-full flex flex-col", className)}>
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {children}
        <div ref={scrollRef} />
      </div>
    </div>
  );
};

export default TabEvents;