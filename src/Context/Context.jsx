import { createContext, useState } from "react";
import runChat from "../Config/Gemni";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    // 🔥 ChatGPT-style formatter
    const formatResponse = (text) => {
        return text
            // Headings
            .replace(/^### (.*$)/gim, "<h3>$1</h3>")
            .replace(/^## (.*$)/gim, "<h2>$1</h2>")
            .replace(/^# (.*$)/gim, "<h1>$1</h1>")

            // Bold text
            .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")

            // Bullet points
            .replace(/^\- (.*)/gim, "<li>$1</li>")

            // Line breaks
            .replace(/\n\n/g, "<br/><br/>")
            .replace(/\n/g, "<br/>");
    };

    // 🆕 New chat
    const newChat = () => {
        setShowResult(false);
        setResultData("");
        setRecentPrompt("");
        setLoading(false);
    };

    // 🚀 Send prompt
    const onSent = async (prompt) => {
        if (loading) return;

        setLoading(true);
        setShowResult(true);
        setResultData("");

        const userPrompt = prompt ?? input;
        if (!userPrompt.trim()) {
            setLoading(false);
            return;
        }

        // Save prompt history only for fresh inputs
        if (!prompt) {
            setPrevPrompt(prev => [...prev, input]);
        }

        setRecentPrompt(userPrompt);

        try {
            const response = await runChat(userPrompt);
            const formatted = formatResponse(response);
            setResultData(formatted);
        } catch (error) {
            setResultData("⚠️ Something went wrong. Please try again later.");
            console.error(error);
        }

        setLoading(false);
        setInput("");
    };

    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompt,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
