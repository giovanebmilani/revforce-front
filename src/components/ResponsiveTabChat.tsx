import React, { JSX } from "react";
import TabChat from "./TabChat";

interface ResponsiveTabChatProps {
    onSend: (text: string) => void;
    bubbles?: JSX.Element[];
}

export function ResponsiveTabChat({ onSend, bubbles }: ResponsiveTabChatProps) {
    const [currentText, setCurrentText] = React.useState("");

    return (
        <TabChat
            onClick={() => {
                if (currentText === "") return;

                onSend(currentText)
                setCurrentText("");

                // TODO: o texto do input precisa se apagado aqui
            }}
            onChange={(e) => (
                console.log(e.target.value),
                setCurrentText(e.target.value.trimStart())
            )}
            children={bubbles}
            value={currentText}
        />
    )
}