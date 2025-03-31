import {Button} from "./ui/button"

function IconButton({icon: Icon, disabled, ...props}) {
    return (
        <Button
            variant="outline"
            size="icon"
            disabled={disabled}
            className={`border-2 border-yellow-400 rounded-lg p-2 hover:bg-yellow-100
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            {...props}
        >
            <Icon className="size-6 text-gray-600"/>
        </Button>
    );
}

export {IconButton};