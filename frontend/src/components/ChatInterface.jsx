import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

export default function ChatInterface() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! This is the legacy chat interface.' }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput("");
        // Placeholder response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: "This is a restored placeholder. Please use the full-page Chatbot." }]);
        }, 500);
    };

    return (
        <div className="w-full h-[600px] flex flex-col bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'assistant' ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-300'}`}>
                            {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`p-3 rounded-lg max-w-[80%] text-sm ${msg.role === 'assistant' ? 'bg-slate-800 text-slate-300' : 'bg-blue-600 text-white'}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-slate-800 bg-slate-900/50">
                <div className="flex gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
                    />
                    <button type="submit" className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        <Send size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
}
