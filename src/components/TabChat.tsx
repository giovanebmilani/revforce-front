import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {cn} from "@/lib/utils";
import "../index.css"

interface TabChatProps {
  onClick: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  value : string;
  classname?: string;
}

function TabChat({ onClick, onChange, children, value, onKeyDown, classname }: TabChatProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [children]);
    return (
        <div className={cn("tab-chat-container", classname)}>
            <div className="tab-chat-messages">
                {children}
                <div ref={scrollRef} />
            </div>
            <div className="flex mt-auto gap-3">
                <Input 
                placeholder="Escreva Aqui" 
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
