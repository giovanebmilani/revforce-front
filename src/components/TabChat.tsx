import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {cn} from "@/lib/utils";

interface TabChatProps {
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  value : string;
  classname?: string;
}

function TabChat({ onClick, onChange, children, value, classname }: TabChatProps) {
    return (
        <div className={cn("flex flex-col w-full h-full p-3 border-1 rounded-lg", classname)}>
            <div className="flex flex-col gap-2 max-h-[1vh] sm:max-h-[1vh] md:max-h-[40vh] h-full overflow-y-scroll">
                {children}
            </div>
            <div className="flex mt-auto gap-3">
                <Input placeholder="Write here" value={value} onChange={onChange}></Input>
                <Button onClick={onClick}>Send</Button>
            </div>
        </div>
    );
}

export default TabChat;
