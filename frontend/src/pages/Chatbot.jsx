import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Loader2, Sparkles, Mic, Paperclip, Languages, FileText } from "lucide-react";

export default function Chatbot() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your AI Research Assistant. You can upload documents, speak to me, or ask questions in multiple languages.' }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [language, setLanguage] = useState("en");
    const [isListening, setIsListening] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileContext, setFileContext] = useState("");

    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleVoiceInput = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Voice input is not supported in this browser.");
            return;
        }

        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : language === 'fr' ? 'fr-FR' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error("Voice Error:", event.error);
            setIsListening(false);
            if (event.error === 'not-allowed') {
                alert("Microphone access denied. Please click the lock icon in the address bar and allow microphone access.");
            } else if (event.error === 'network') {
                alert("Voice input failed. Please check your internet connection or try a different browser (Chrome/Edge recommended).");
            } else {
                alert("Voice input error: " + event.error);
            }
        };
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev + " " + transcript);
        };

        recognition.start();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadedFile(file);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            setFileContext(data.extracted_text);
            setMessages(prev => [...prev, { role: 'assistant', content: `📄 System: Processed "${file.name}". I can now answer questions about its content.` }]);
        } catch (err) {
            console.error(err);
            alert("Failed to upload file.");
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    molecule: "General Context",
                    question: userMessage,
                    language: language,
                    file_context: fileContext
                })
            });

            if (!response.ok) throw new Error("Failed to get response");

            const data = await response.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Error: Unable to connect to the research agent." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">

            {/* Header */}
            <div className="px-6 py-4 bg-slate-900/50 border-b border-white/5 backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white flex items-center gap-2">
                            AI Molecule Research Chatbot
                            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] uppercase tracking-wider border border-blue-500/20">Agentic</span>
                        </h1>
                        <p className="text-xs text-slate-400">Powered by Groq • Clinical • Literature • Web</p>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Languages className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-slate-900 border border-white/10 rounded-lg py-1.5 pl-9 pr-8 text-sm text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer appearance-none"
                        >
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="ta">Tamil</option>
                            <option value="fr">French</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>

                            {/* Avatar (Left for Assistant) */}
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                            )}

                            {/* Bubble */}
                            <div className={`px-6 py-4 rounded-2xl max-w-[85%] md:max-w-[75%] lg:max-w-[65%] text-base leading-relaxed shadow-lg
                                ${msg.role === 'user'
                                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-none'
                                    : 'bg-slate-900 border border-white/5 text-slate-300 rounded-bl-none'}`}>
                                {msg.content.split('\n').map((line, i) => (
                                    <p key={i} className={`min-h-[1.2em] ${i > 0 ? "mt-2" : ""}`}>{line}</p>
                                ))}
                            </div>

                            {/* Avatar (Right for User) */}
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 mt-1 border border-white/10">
                                    <User className="w-4 h-4 text-slate-400" />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex gap-4 justify-start animate-fade-in">
                            <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1 border border-blue-500/20">
                                <Sparkles className="w-4 h-4 text-blue-400" />
                            </div>
                            <div className="px-6 py-4 rounded-2xl bg-slate-900 border border-white/5 rounded-bl-none flex items-center gap-3 shadow-lg">
                                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                                <span className="text-sm text-slate-400">Analyzing research data...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900/50 border-t border-white/5 backdrop-blur-md">
                <div className="max-w-3xl mx-auto">
                    {uploadedFile && (
                        <div className="flex items-center gap-2 mb-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg w-fit">
                            <FileText className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-blue-300">{uploadedFile.name} (Context Added)</span>
                            <button onClick={() => { setUploadedFile(null); setFileContext(""); }} className="text-slate-400 hover:text-white ml-2">×</button>
                        </div>
                    )}
                    <form onSubmit={handleSend} className="relative group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.txt,.doc,.docx"
                                onChange={handleFileUpload}
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-blue-400 transition-colors"
                                title="Upload Document"
                            >
                                <Paperclip className="w-5 h-5" />
                            </button>
                            <button
                                type="button"
                                onClick={handleVoiceInput}
                                className={`p-2 rounded-lg hover:bg-white/5 transition-colors ${isListening ? 'text-red-400 animate-pulse' : 'text-slate-400 hover:text-blue-400'}`}
                                title="Voice Input"
                            >
                                <Mic className="w-5 h-5" />
                            </button>
                        </div>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Ask about a molecule, mechanism, or clinical trial..."}
                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-24 pr-14 text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-inner"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                    <p className="text-center text-xs text-slate-600 mt-3">
                        AI can make mistakes. Please verify important information.
                    </p>
                </div>
            </div>
        </div>
    );
}
