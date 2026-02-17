import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, Sparkles, Activity, BookOpen, Globe, ScrollText, FileUp, Play } from "lucide-react";
import ChatInterface from "../components/ChatInterface";

export default function Home() {
    const [molecule, setMolecule] = useState("");
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleRunResearch = (e) => {
        e.preventDefault();
        if (!molecule) return;
        navigate("/results?molecule=" + molecule);
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center overflow-hidden p-6 font-sans">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center space-y-10 animate-fade-in-up">

                {/* 1. Top Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-md shadow-lg shadow-blue-500/5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-blue-300 text-xs font-semibold tracking-wide uppercase">AI-Powered Research Agent</span>
                </div>

                {/* 2. Main Heading & Subtitle */}
                <div className="space-y-4 max-w-3xl">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                        AI-Driven <span className="text-white">Molecule</span> Analysis Platform
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed opacity-90">
                        Accelerate therapeutic discovery using real-time clinical trials, scientific literature, and intelligent agent-based analysis.
                    </p>
                </div>

                {/* 3. Primary Interaction Card */}
                <div
                    className={`w-full max-w-xl relative group transition-all duration-500 ${isHovered ? 'scale-[1.01]' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Glow Effect behind card */}
                    <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`} />

                    <div className="relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl ring-1 ring-white/5">
                        <form onSubmit={handleRunResearch} className="space-y-6">

                            {/* Input Field Area */}
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-slate-300 ml-1">Molecule Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-11 pr-4 py-4 bg-slate-950/50 border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-lg shadow-inner"
                                        placeholder="Enter molecule name (e.g., Metformin)"
                                        value={molecule}
                                        onChange={(e) => setMolecule(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Primary CTA Button */}
                            <button
                                type="submit"
                                disabled={!molecule}
                                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg
                                    ${molecule
                                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-blue-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5'
                                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                            >
                                <Play className="w-5 h-5 fill-current" />
                                Run AI Research
                            </button>

                            {/* Secondary Hint */}
                            <div className="text-xs text-slate-500 font-medium pt-2 border-t border-white/5">
                                Powered by multi-agent AI • Public real-time data • Auto-generated insights
                            </div>
                        </form>
                    </div>
                </div>

                {/* 4. Capability Indicators */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl opacity-90">
                    <CapabilityChip icon={Activity} label="Clinical Trials" status="Live" color="text-green-400" />
                    <CapabilityChip icon={BookOpen} label="Scientific Literature" status="Live" color="text-blue-400" />
                    <CapabilityChip icon={Globe} label="Web Intelligence" status="Live" color="text-cyan-400" />
                    <CapabilityChip icon={ScrollText} label="Patent Landscape" status="Simulated" color="text-purple-400" />
                    <CapabilityChip icon={FileUp} label="Internal Documents" status="PDF Upload" color="text-orange-400" />
                </div>

                {/* 5. Footer Preview */}
                <div className="pt-12 text-slate-600 text-sm font-medium tracking-wide">
                    Built for Research • Innovation • Strategic Insights
                </div>

            </div>

            {/* Chatbot Button */}
            <button
                onClick={() => window.open("/chat", "_blank")}
                className="fixed top-6 right-6 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-all z-50 flex items-center gap-2"
            >
                <span>🤖</span>
                <span>AI Chatbot</span>
            </button>
        </div>
    );
}

function CapabilityChip({ icon: Icon, label, status, color }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/40 border border-white/5 backdrop-blur-sm shadow-sm transition-all hover:bg-slate-800/60 hover:border-white/10">
            <Icon className={`w-3.5 h-3.5 ${color}`} />
            <span className="text-slate-300 text-xs font-medium">{label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 ${color} bg-opacity-10 border border-white/5`}>
                {status}
            </span>
        </div>
    );
}
