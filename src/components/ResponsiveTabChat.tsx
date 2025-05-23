import React, { JSX } from "react";
import TabChat from "./TabChat";

interface ResponsiveTabChatProps {
    onSend: (text: string) => void;
    bubbles?: JSX.Element[];
    classname?: string;
}

export function ResponsiveTabChat({ onSend, bubbles, classname }: ResponsiveTabChatProps) {
    const [currentText, setCurrentText] = React.useState("");

    return (
        <TabChat
    onClick={() => {
        if (currentText === "") return;
        onSend(currentText);
        setCurrentText("");
    }}
    onChange={(e) => {
        console.log(e.target.value);
        setCurrentText(e.target.value.trimStart());
    }}
    onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            if (currentText.trim() !== "") {
                onSend(currentText.trim());
                setCurrentText("");
            }
        }
    }}
    children={bubbles}
    value={currentText}
    classname={classname}
/>
    )
}