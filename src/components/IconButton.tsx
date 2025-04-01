import {Button} from "./ui/button"
import {LucideIcon} from "lucide-react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon;
    disabled?: boolean;
}

function IconButton({icon: Icon, disabled, ...props}: IconButtonProps) {
    return (
        <Button
            variant="outline"
            size="icon"
            disabled={disabled}
            className={`border-1 border-primary rounded-lg p-2 hover:bg-slate-50
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            {...props}
        >
            <Icon className="size-6 text-gray-400"/>
        </Button>
    );
}

export default IconButton;