import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TabChatProps {
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
  value : string;
}

function TabChat({ onClick, onChange, children, value }: TabChatProps) {
    return (
        <div className="flex flex-col w-full h-full p-3 border-1 rounded-lg">
            <div className="flex flex-col gap-2 h-full overflow-y-scroll">
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
