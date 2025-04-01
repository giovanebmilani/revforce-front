import {Button} from "./ui/button"
import {LucideIcon} from "lucide-react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon;
    disabled?: boolean;
}

function IconButton({icon: Icon, disabled, ...props}: IconButtonProps) {
    return (
        <Button
            variant="outlinePointer"
            size="icon"
            disabled={disabled}
            className='size-11 border-2 border-primary rounded-lg p-2 hover:bg-slate-50'
            {...props}
        >
            <Icon className="size-7 text-gray-400"/>
        </Button>
    );
}

export default IconButton;