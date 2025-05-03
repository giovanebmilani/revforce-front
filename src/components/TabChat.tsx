import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface TabChatProps {
    onClick: () => void;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children: React.ReactNode
}

    function TabChat({onClick, value, onChange, children}: TabChatProps) {
    return (
        <div className="flex flex-col w-full h-50 p-3 border-1 rounded-lg">
            <div className="flex flex-col gap-2 h-full overflow-scroll">
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