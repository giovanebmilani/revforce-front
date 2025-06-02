import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import "../index.css";

interface TabChatProps {
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  value: string;
  classname?: string;
}

function TabChat({
  onClick,
  onChange,
  children,
  value,
  onKeyDown,
  classname,
}: TabChatProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [children]);

  return (
    <div
      className={cn(
        "flex flex-col h-full", 
        "min-h-[max(300px,calc(100vh-600px))]", 
        "max-h-[calc(100vh-600px)]",  
        classname
      )}
    >
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {children}
        <div ref={scrollRef} />
      </div>
      <div className="flex gap-3 pt-4 mt-auto">
        <Input
          placeholder="Escreva aqui"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <Button onClick={onClick}>Send</Button>
      </div>
    </div>
  );
}

export default TabChat;