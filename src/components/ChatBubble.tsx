export function ChatBubble({ text, isUser = false }: { text: string, isUser?: boolean }) {
    return (
        <div className={`flex ${!isUser ? "justify-start" : "justify-end"}`}>
            <div className={"rounded-lg " + (!isUser ? "bg-gray-100" : "bg-yellow-300") + " p-2 m-1 text-sm text-gray-800 break-normal max-w-50 animate-in duration-500 fade-in break-words"}>
                {text}
            </div>
        </div>
    )
}
